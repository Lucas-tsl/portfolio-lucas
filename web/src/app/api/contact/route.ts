import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est trop court."),
  email: z.string().email("Email invalide."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caracteres."),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Donnees invalides." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;

    if (!apiKey || !to) {
      return NextResponse.json(
        { error: "Configuration email manquante (RESEND_API_KEY ou CONTACT_EMAIL)." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = parsed.data;

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      subject: `Nouveau message portfolio - ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur pendant l'envoi." }, { status: 500 });
  }
}
