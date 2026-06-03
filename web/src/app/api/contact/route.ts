import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("L'adresse email n'est pas valide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const { name, email, message } = validatedData;

    // 1. Email que TU reçois
    const ownerEmail = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Utiliser un domaine vérifié en production sur Resend
      to: process.env.CONTACT_EMAIL || "contact@lucastroteseil.com",
      subject: `Nouveau message de ${name} via le Portfolio`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // 2. Email de confirmation que le VISITEUR reçoit
    // Note: Nécessite que tu aies ajouté et vérifié ton propre nom de domaine sur Resend
    // Si tu utilises toujours l'adresse onboarding@resend.dev, ça ne marchera qu'avec ta propre adresse email de test.
    await resend.emails.send({
      from: "Lucas Troteseil <onboarding@resend.dev>", // Remplace par "Lucas <contact@tondomaine.com>" une fois le domaine validé
      to: email,
      subject: "Confirmation de réception de votre message",
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #09090b;">Bonjour ${name},</h2>
          <p>Je vous confirme la bonne réception de votre message depuis mon portfolio :</p>
          <blockquote style="border-left: 4px solid #e5e7eb; padding-left: 16px; margin: 20px 0; color: #4b5563; font-style: italic;">
            ${message}
          </blockquote>
          <p>Je prendrai le temps de le lire et je reviendrai vers vous dans les plus brefs délais.</p>
          <p>Cordialement,<br/><strong>Lucas Troteseil</strong></p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email envoyé avec succès !", data: ownerEmail },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Erreur interne du serveur" }, { status: 500 });
  }
}