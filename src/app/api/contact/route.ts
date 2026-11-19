import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactSubjects } from "@/data/portfolio-data";
import { MIN_FILL_TIME_MS, TURNSTILE_SITE_KEY } from "@/lib/turnstile";
import { isHumanCheckValid } from "@/lib/human-check";
import { confirmationEmail, ownerEmail, ticketRef } from "@/lib/email-templates";

// Lus à chaque requête : sur Cloudflare Workers, process.env est alimenté par requête
// Expéditeur : doit appartenir à un domaine vérifié dans Resend (lucas-troteseil.fr)
const mailFrom = () => process.env.MAIL_FROM || "Lucas Troteseil <contact@lucas-troteseil.fr>";
// Destinataire des notifications (redirection OVH contact@ → ProtonMail)
const contactEmail = () => process.env.CONTACT_EMAIL || "lucas-troteseil@protonmail.com";

// Sujet d'email : texte brut, sans retour à la ligne (pas d'échappement HTML)
function plain(str: string): string {
  return str.replace(/[\r\n]+/g, " ").trim();
}

// In-memory rate limiter: max 3 requests per IP per 10 minutes
// Note: propre à chaque isolate Cloudflare Workers → limite "souple"
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est trop court").max(100),
  email: z.string().email("L'adresse email n'est pas valide").max(254),
  subject: z.string().min(1, "Veuillez sélectionner un sujet").max(100),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères").max(5000),
  // Anti-spam
  turnstileToken: z.string().max(2048).optional(),
  humanCheckId: z.string().max(50).optional(),
  humanCheck: z.string().max(50).optional(),
  website: z.string().max(500).optional(), // pot de miel : doit rester vide
  elapsedMs: z.number().optional(),
});

// Vérifie le jeton Turnstile auprès de Cloudflare (fail-closed : tout problème = refus)
async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[contact] TURNSTILE_SECRET_KEY absente des Variables and Secrets du Worker");
    return false;
  }
  if (!token) return false;
  const form = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") form.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) console.warn("[contact] Turnstile refusé:", data["error-codes"]);
    return data.success === true;
  } catch (error) {
    console.error("[contact] Turnstile injoignable:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);
    const { name, email, subject, message, turnstileToken, humanCheckId, humanCheck, website, elapsedMs } =
      validatedData;

    // Robot probable : pot de miel rempli, envoi trop rapide ou mauvaise réponse à la question
    // (un humain est bloqué avant l'envoi côté client) → faux succès, rien n'est envoyé
    const tooFast = elapsedMs !== undefined && elapsedMs < MIN_FILL_TIME_MS;
    const humanOk = isHumanCheckValid(humanCheckId, humanCheck);
    if (website || tooFast || !humanOk) {
      console.warn(
        `[contact] Spam ignoré (pot de miel=${Boolean(website)}, délai=${elapsedMs}ms, question=${humanOk})`
      );
      return NextResponse.json({ success: true, message: "Email envoyé avec succès !" }, { status: 200 });
    }

    if (TURNSTILE_SITE_KEY && !(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json(
        { success: false, error: "La vérification anti-spam a échoué. Rechargez la page et réessayez." },
        { status: 403 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const subjectData = contactSubjects.find((s) => s.value === subject);
    const subjectLabel = subjectData?.label ?? subject;
    // Numéro de demande commun aux deux emails (objet + corps), ex. LT-1119-1646
    const ref = ticketRef();

    // Resend ne lève pas d'exception : il renvoie { data, error } → toujours vérifier error
    const owner = await resend.emails.send({
      from: mailFrom(),
      to: contactEmail(),
      replyTo: email, // "Répondre" dans la messagerie écrit directement au visiteur
      // Préfixe fixe « [Portfolio] » : sert de critère au filtre Proton qui range ces messages
      subject: plain(`[Portfolio] ${subjectLabel} — ${name} (#${ref})`),
      ...ownerEmail(name, email, subject, message, ref), // { html, text }
    });

    if (owner.error) {
      console.error("[contact] Échec envoi notification:", owner.error);
      return NextResponse.json(
        {
          success: false,
          error: "Le message n'a pas pu être envoyé. Réessayez plus tard ou écrivez à contact@lucas-troteseil.fr.",
        },
        { status: 502 }
      );
    }

    // L'accusé de réception est secondaire : un échec ne doit pas faire échouer la demande
    const confirmation = await resend.emails.send({
      from: mailFrom(),
      to: email,
      subject: plain(`Message reçu — ${subjectLabel} (#${ref})`),
      ...confirmationEmail(name, subject, message, ref), // { html, text }
    });
    if (confirmation.error) {
      console.error("[contact] Échec envoi accusé de réception:", confirmation.error);
    }

    return NextResponse.json({ success: true, message: "Email envoyé avec succès !" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    console.error("[contact] Erreur inattendue:", error);
    return NextResponse.json({ success: false, error: "Erreur interne du serveur" }, { status: 500 });
  }
}
