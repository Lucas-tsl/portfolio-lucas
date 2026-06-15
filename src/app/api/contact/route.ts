import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("L'adresse email n'est pas valide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

function ownerEmailHtml(name: string, email: string, message: string): string {
  const year = new Date().getFullYear();
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
    .message-box { background-color: #f4f4f5; border-left: 4px solid #18181b; padding: 20px; border-radius: 0 8px 8px 0; font-style: italic; color: #52525b; white-space: pre-wrap; }
    .footer { padding: 24px 40px; text-align: center; border-top: 1px solid #e4e4e7; color: #71717a; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Nouveau message via Portfolio</h1></div>
    <div class="content">
      <div class="meta">
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
      </div>
      <div class="message-box">${message}</div>
    </div>
    <div class="footer"><p>&copy; ${year} Lucas Troteseil &mdash; Portfolio Contact</p></div>
  </div>
</body>
</html>`;
}

function confirmationEmailHtml(name: string, message: string): string {
  const year = new Date().getFullYear();
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
    .message-box { background-color: #f4f4f5; border-left: 4px solid #18181b; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0; font-style: italic; color: #52525b; white-space: pre-wrap; }
    .footer { padding: 30px 40px; text-align: center; border-top: 1px solid #e4e4e7; color: #71717a; font-size: 14px; }
    .footer a { color: #18181b; text-decoration: none; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Lucas Troteseil</h1></div>
    <div class="content">
      <h2>Bonjour ${name},</h2>
      <p>Je vous confirme avoir bien reçu votre message depuis mon portfolio. Je vous remercie de l'intérêt que vous portez à mon profil.</p>
      <div class="message-box">${message}</div>
      <p>Je prendrai le temps de lire votre demande attentivement et je reviendrai vers vous dans les plus brefs délais.</p>
      <p>Très cordialement,</p>
      <p><strong>Lucas Troteseil</strong><br>Chef de projet Data / IA &amp; Développeur Web</p>
    </div>
    <div class="footer">
      <p>&copy; ${year} Lucas Troteseil. Tous droits réservés.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const validatedData = contactSchema.parse(body);
    const { name, email, message } = validatedData;

    const ownerEmail = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "contact@lucastroteseil.com",
      subject: `Nouveau message de ${name} via le Portfolio`,
      html: ownerEmailHtml(name, email, message),
    });

    await resend.emails.send({
      from: "Lucas Troteseil <onboarding@resend.dev>",
      to: email,
      subject: "Confirmation de réception de votre message",
      html: confirmationEmailHtml(name, message),
    });

    return NextResponse.json({ success: true, message: "Email envoyé avec succès !", data: ownerEmail }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Erreur interne du serveur" }, { status: 500 });
  }
}
