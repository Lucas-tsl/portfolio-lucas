import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { ContactFormEmail } from "@/emails/ContactFormEmail";
import { ContactConfirmationEmail } from "@/emails/ContactConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL;

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("L'adresse email est invalide."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
});

export async function POST(request: Request) {
  if (!contactEmail || !process.env.RESEND_API_KEY) {
    console.error("Variables d'environnement RESEND_API_KEY ou CONTACT_EMAIL manquantes.");
    return NextResponse.json(
      { error: "Configuration du serveur incomplète." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    // Note: 'from' doit être un domaine vérifié sur Resend en production.
    // 'onboarding@resend.dev' est utilisé pour le développement.
    const fromAddress = "Portfolio <onboarding@resend.dev>";

    // 1. Envoyer l'email de notification au propriétaire du portfolio
    const sendToOwner = resend.emails.send({
      from: fromAddress,
      to: contactEmail,
      subject: `Nouveau message de ${name} via le portfolio`,
      react: ContactFormEmail({
        senderName: name,
        senderEmail: email,
        message: message,
      }),
    });

    // 2. Envoyer l'email de confirmation au visiteur
    const sendToVisitor = resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "Confirmation de votre prise de contact",
      react: ContactConfirmationEmail({ name }),
    });

    // Attendre que les deux envois soient initiés
    const [ownerResult, visitorResult] = await Promise.all([sendToOwner, sendToVisitor]);

    if (ownerResult.error) {
        console.error("Erreur Resend (notification propriétaire):", ownerResult.error);
        // On peut décider de quand même renvoyer un succès si la confirmation part
    }
    if (visitorResult.error) {
        console.error("Erreur Resend (confirmation visiteur):", visitorResult.error);
    }

    return NextResponse.json({ message: "Message envoyé avec succès !" }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message." },
      { status: 500 }
    );
  }
}