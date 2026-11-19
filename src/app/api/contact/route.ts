import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactSubjects } from "@/data/portfolio-data";
import { MIN_FILL_TIME_MS, TURNSTILE_SITE_KEY } from "@/lib/turnstile";
import { isHumanCheckValid } from "@/lib/human-check";

// Escape HTML to prevent XSS in email templates
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

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

function ownerEmailHtml(name: string, email: string, subject: string, message: string): string {
  const year = new Date().getFullYear();
  const subjectData = contactSubjects.find((s) => s.value === subject);
  const subjectLabel = subjectData?.label ?? subject;
  const subjectDescription = subjectData?.description ?? "";
  const skillsBadges =
    subjectData && subjectData.skills.length > 0
      ? subjectData.skills
          .map(
            (s) =>
              `<span style="display:inline-block;background:#f4f4f5;border-radius:999px;padding:2px 10px;font-size:12px;color:#52525b;margin:2px;">${esc(s)}</span>`
          )
          .join(" ")
      : "";

  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background-color: #18181b; padding: 30px 40px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; }
    .content { padding: 40px; color: #3f3f46; line-height: 1.6; font-size: 16px; }
    .meta { background-color: #f4f4f5; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; font-size: 14px; }
    .meta p { margin: 4px 0; }
    .meta strong { color: #18181b; }
    .subject-box { background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px; }
    .subject-box .label { font-size: 13px; color: #71717a; margin-bottom: 4px; }
    .subject-box .value { font-size: 15px; font-weight: 600; color: #18181b; }
    .subject-box .desc { font-size: 13px; color: #71717a; margin-top: 4px; }
    .message-box { background-color: #f4f4f5; border-left: 4px solid #18181b; padding: 20px; border-radius: 0 8px 8px 0; font-style: italic; color: #52525b; white-space: pre-wrap; }
    .footer { padding: 24px 40px; text-align: center; border-top: 1px solid #e4e4e7; color: #71717a; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Nouveau message via Portfolio</h1></div>
    <div class="content">
      <div class="meta">
        <p><strong>Nom :</strong> ${esc(name)}</p>
        <p><strong>Email :</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      </div>
      <div class="subject-box">
        <p class="label">Sujet de la demande</p>
        <p class="value">${esc(subjectLabel)}</p>
        ${subjectDescription ? `<p class="desc">${esc(subjectDescription)}</p>` : ""}
        ${skillsBadges ? `<div style="margin-top:10px;">${skillsBadges}</div>` : ""}
      </div>
      <div class="message-box">${esc(message)}</div>
    </div>
    <div class="footer"><p>&copy; ${year} Lucas Troteseil &mdash; Portfolio Contact</p></div>
  </div>
</body>
</html>`;
}

function confirmationEmailHtml(name: string, subject: string, message: string): string {
  const year = new Date().getFullYear();
  const subjectData = contactSubjects.find((s) => s.value === subject);
  const subjectLabel = subjectData?.label ?? subject;

  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background-color: #18181b; padding: 30px 40px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
    .content { padding: 40px; color: #3f3f46; line-height: 1.6; font-size: 16px; }
    .content h2 { color: #18181b; margin-top: 0; font-size: 20px; }
    .subject-badge { display: inline-block; background-color: #18181b; color: #ffffff; border-radius: 999px; padding: 4px 14px; font-size: 13px; font-weight: 500; margin-bottom: 20px; }
    .message-box { background-color: #f4f4f5; border-left: 4px solid #18181b; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0; font-style: italic; color: #52525b; white-space: pre-wrap; }
    .footer { padding: 30px 40px; text-align: center; border-top: 1px solid #e4e4e7; color: #71717a; font-size: 14px; }
    .footer a { color: #18181b; text-decoration: none; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Lucas Troteseil</h1></div>
    <div class="content">
      <h2>Bonjour ${esc(name)},</h2>
      <p>Je vous confirme avoir bien reçu votre message depuis mon portfolio. Je vous remercie de l'intérêt que vous portez à mon profil.</p>
      <p class="subject-badge">${esc(subjectLabel)}</p>
      <div class="message-box">${esc(message)}</div>
      <p>Je prendrai le temps de lire votre demande attentivement et je reviendrai vers vous dans les plus brefs délais.</p>
      <p>Très cordialement,</p>
      <p><strong>Lucas Troteseil</strong><br>Chef de projet Data / IA &amp; Développeur Web</p>
    </div>
    <div class="footer">
      <p><a href="https://lucas-troteseil.fr">lucas-troteseil.fr</a></p>
      <p>&copy; ${year} Lucas Troteseil. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>`;
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

    // Resend ne lève pas d'exception : il renvoie { data, error } → toujours vérifier error
    const owner = await resend.emails.send({
      from: mailFrom(),
      to: contactEmail(),
      replyTo: email, // "Répondre" dans la messagerie écrit directement au visiteur
      // Préfixe fixe « [Portfolio] » : sert de critère au filtre Proton qui range ces messages
      subject: plain(`[Portfolio] ${subjectLabel} — ${name}`),
      html: ownerEmailHtml(name, email, subject, message),
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
      subject: plain(`Confirmation de réception — ${subjectLabel}`),
      html: confirmationEmailHtml(name, subject, message),
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
