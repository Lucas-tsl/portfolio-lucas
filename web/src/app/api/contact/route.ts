import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("L'adresse email n'est pas valide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const { name, email, message } = validatedData;

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Utiliser un domaine vérifié en production sur Resend
      to: process.env.CONTACT_EMAIL || "contact@lucastroteseil.com",
      subject: `Nouveau message de ${name} via le Portfolio`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json(
      { success: true, message: "Email envoyé avec succès !", data },
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