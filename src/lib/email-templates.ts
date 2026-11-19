// Templates des emails du formulaire de contact, aux couleurs du site.
// Contraintes des clients mail : mise en page en tables, styles INLINE (Gmail retire souvent <style>),
// 600 px max, pas d'image (souvent bloquées) : le monogramme « LT » est dessiné en HTML.
// Le bloc <style> ne sert qu'au mode sombre des clients qui le supportent (Apple Mail, Outlook macOS…).

import { contactSubjects, profile } from "@/data/portfolio-data";

const SITE = "https://lucas-troteseil.fr";
// Délai de réponse annoncé dans l'accusé de réception (à ajuster librement)
const RESPONSE_DELAY = "sous 2 jours ouvrés";

const C = {
  bg: "#f4f4f5",
  card: "#ffffff",
  ink: "#09090b",
  text: "#3f3f46",
  muted: "#71717a",
  border: "#e4e4e7",
  soft: "#fafafa",
  emerald: "#059669",
  emeraldText: "#047857",
  emeraldSoft: "#ecfdf5",
};
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

// Échappe les champs saisis par le visiteur (anti-injection HTML)
export function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Texte multi-ligne : échappé puis retours à la ligne conservés (white-space n'est pas fiable partout)
function multiline(str: string): string {
  return esc(str).replace(/\r?\n/g, "<br>");
}

function subjectInfo(subject: string) {
  const data = contactSubjects.find((s) => s.value === subject);
  return { label: data?.label ?? subject, description: data?.description ?? "" };
}

function parisDate(): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(new Date());
}

/** Squelette commun : liseré dégradé, en-tête monogramme, carte blanche, pied de page */
function layout({ preheader, body }: { preheader: string; body: string }): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Lucas Troteseil</title>
<style>
  @media (prefers-color-scheme: dark) {
    .bg { background:#09090b !important; }
    .card { background:#18181b !important; border-color:#27272a !important; }
    .ink { color:#fafafa !important; }
    .text { color:#d4d4d8 !important; }
    .muted { color:#a1a1aa !important; }
    .soft { background:#09090b !important; border-color:#27272a !important; }
    .msgbox { background:#09090b !important; border-color:#27272a !important; border-left-color:#10b981 !important; }
    .chip { background:#022c22 !important; color:#6ee7b7 !important; }
    .link { color:#34d399 !important; }
  }
  @media (max-width:620px) { .pad { padding-left:24px !important; padding-right:24px !important; } }
</style>
</head>
<body style="margin:0;padding:0;background:${C.bg};" class="bg">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};" class="bg">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${C.card};border:1px solid ${C.border};border-radius:16px;overflow:hidden;" class="card">
    <tr><td style="height:4px;line-height:4px;font-size:0;background:#10b981;background-image:linear-gradient(90deg,#059669,#10b981,#0d9488);">&nbsp;</td></tr>
    <tr><td class="pad" style="padding:28px 40px 0 40px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="width:36px;height:36px;background:#09090b;border-radius:8px;text-align:center;vertical-align:middle;font-family:${FONT};font-size:15px;font-weight:800;letter-spacing:-0.5px;line-height:36px;">
          <span style="color:#fafafa;">L</span><span style="color:#10b981;">T</span>
        </td>
        <td style="padding-left:12px;font-family:${FONT};">
          <div class="ink" style="font-size:15px;font-weight:700;color:${C.ink};line-height:1.2;">Lucas Troteseil</div>
          <div class="muted" style="font-size:12px;color:${C.muted};line-height:1.4;">${esc(profile.title)}</div>
        </td>
      </tr></table>
    </td></tr>
    <tr><td class="pad" style="padding:28px 40px 36px 40px;font-family:${FONT};font-size:15px;line-height:1.65;color:${C.text};">
      ${body}
    </td></tr>
    <tr><td class="pad soft" style="padding:20px 40px;background:${C.soft};border-top:1px solid ${C.border};font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted};">
      <a href="${SITE}" class="link" style="color:${C.emeraldText};text-decoration:none;font-weight:600;">lucas-troteseil.fr</a>
      &nbsp;·&nbsp; <a href="${SITE}/projects" class="link" style="color:${C.emeraldText};text-decoration:none;">Projets</a>
      &nbsp;·&nbsp; <a href="${SITE}/formations" class="link" style="color:${C.emeraldText};text-decoration:none;">Formations</a>
      &nbsp;·&nbsp; <a href="${profile.linkedin}" class="link" style="color:${C.emeraldText};text-decoration:none;">LinkedIn</a>
      &nbsp;·&nbsp; <a href="${profile.github}" class="link" style="color:${C.emeraldText};text-decoration:none;">GitHub</a>
      <div class="muted" style="margin-top:6px;color:${C.muted};">&copy; ${year} Lucas Troteseil · Bordeaux, France</div>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function chip(label: string): string {
  return `<span class="chip" style="display:inline-block;background:${C.emeraldSoft};color:${C.emeraldText};border-radius:999px;padding:4px 12px;font-size:12px;font-weight:600;">${esc(label)}</span>`;
}

function messageBox(message: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 0 0;">
    <tr><td class="msgbox text" style="background:${C.soft};border:1px solid ${C.border};border-left:3px solid ${C.emerald};border-radius:10px;padding:16px 18px;font-size:14px;line-height:1.65;color:${C.text};">${multiline(message)}</td></tr>
  </table>`;
}

function label(text: string): string {
  return `<div class="muted" style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};margin:0 0 6px 0;">${text}</div>`;
}

// ───────────────────────── Notification (reçue par Lucas) ─────────────────────────

export function ownerEmail(name: string, email: string, subject: string, message: string) {
  const { label: subjectLabel, description } = subjectInfo(subject);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subjectLabel}`)}`;
  const date = parisDate();

  const html = layout({
    preheader: `${name} — ${subjectLabel} : ${message.slice(0, 90)}`,
    body: `
      ${chip(subjectLabel)}
      <h1 class="ink" style="margin:14px 0 4px 0;font-size:22px;line-height:1.3;font-weight:700;color:${C.ink};">Nouveau message de ${esc(name)}</h1>
      <p class="muted" style="margin:0 0 24px 0;font-size:13px;color:${C.muted};">Reçu via le formulaire du portfolio · ${esc(date)}</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;font-size:14px;">
        <tr>
          <td class="muted" style="padding:8px 0;width:90px;color:${C.muted};border-bottom:1px solid ${C.border};">Nom</td>
          <td class="ink" style="padding:8px 0;color:${C.ink};font-weight:600;border-bottom:1px solid ${C.border};">${esc(name)}</td>
        </tr>
        <tr>
          <td class="muted" style="padding:8px 0;color:${C.muted};border-bottom:1px solid ${C.border};">Email</td>
          <td style="padding:8px 0;border-bottom:1px solid ${C.border};"><a href="mailto:${esc(email)}" class="link" style="color:${C.emeraldText};font-weight:600;text-decoration:none;">${esc(email)}</a></td>
        </tr>
        <tr>
          <td class="muted" style="padding:8px 0;color:${C.muted};vertical-align:top;">Sujet</td>
          <td class="ink" style="padding:8px 0;color:${C.ink};">${esc(subjectLabel)}${description ? `<div class="muted" style="font-size:12px;color:${C.muted};margin-top:2px;">${esc(description)}</div>` : ""}</td>
        </tr>
      </table>

      ${label("Message")}
      ${messageBox(message)}

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0 0;">
        <tr><td style="background:#047857;border-radius:999px;">
          <a href="${esc(replyHref)}" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">Répondre à ${esc(name)} &rarr;</a>
        </td></tr>
      </table>
      <p class="muted" style="margin:12px 0 0 0;font-size:12px;color:${C.muted};">Ou utilisez simplement « Répondre » : la réponse part directement vers ${esc(email)}.</p>`,
  });

  const text = [
    `Nouveau message de ${name} — ${subjectLabel}`,
    `Reçu le ${date}`,
    "",
    `Nom : ${name}`,
    `Email : ${email}`,
    `Sujet : ${subjectLabel}`,
    "",
    "Message :",
    message,
    "",
    "—",
    `Répondre : utilisez « Répondre » (la réponse part vers ${email}).`,
  ].join("\n");

  return { html, text };
}

// ───────────────────────── Accusé de réception (envoyé au visiteur) ─────────────────────────

export function confirmationEmail(name: string, subject: string, message: string) {
  const { label: subjectLabel } = subjectInfo(subject);

  const html = layout({
    preheader: `Merci ${name}, votre message est bien arrivé. Je vous réponds ${RESPONSE_DELAY}.`,
    body: `
      <h1 class="ink" style="margin:0 0 16px 0;font-size:22px;line-height:1.3;font-weight:700;color:${C.ink};">Bonjour ${esc(name)},</h1>
      <p class="text" style="margin:0 0 16px 0;color:${C.text};">Merci pour votre message : il est bien arrivé. Je le lis attentivement et je vous réponds personnellement, en général <strong class="ink" style="color:${C.ink};">${RESPONSE_DELAY}</strong>.</p>
      <p class="text" style="margin:0 0 24px 0;color:${C.text};">Pour rappel, voici votre demande :</p>

      ${label("Votre demande")}
      <div style="margin:0 0 10px 0;">${chip(subjectLabel)}</div>
      ${messageBox(message)}

      <p class="text" style="margin:28px 0 12px 0;color:${C.text};">En attendant, vous pouvez découvrir :</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px 0;font-size:14px;">
        <tr><td style="padding:4px 0;"><a href="${SITE}/projects" class="link" style="color:${C.emeraldText};font-weight:600;text-decoration:none;">&rarr; Mes projets et réalisations</a></td></tr>
        <tr><td style="padding:4px 0;"><a href="${SITE}/formations" class="link" style="color:${C.emeraldText};font-weight:600;text-decoration:none;">&rarr; Mes formations (WordPress, SEO, IA)</a></td></tr>
        <tr><td style="padding:4px 0;"><a href="${SITE}/blog" class="link" style="color:${C.emeraldText};font-weight:600;text-decoration:none;">&rarr; Mes articles de blog</a></td></tr>
      </table>

      <p class="text" style="margin:0;color:${C.text};">À très bientôt,</p>
      <p class="ink" style="margin:4px 0 0 0;color:${C.ink};font-weight:700;">Lucas Troteseil</p>
      <p class="muted" style="margin:0;font-size:13px;color:${C.muted};">${esc(profile.title)} · Bordeaux</p>
      <p class="muted" style="margin:24px 0 0 0;font-size:12px;color:${C.muted};">Vous recevez cet email car vous avez écrit via le formulaire de lucas-troteseil.fr. Pour compléter votre demande, répondez simplement à ce message.</p>`,
  });

  const text = [
    `Bonjour ${name},`,
    "",
    `Merci pour votre message : il est bien arrivé. Je le lis attentivement et je vous réponds personnellement, en général ${RESPONSE_DELAY}.`,
    "",
    `Votre demande — ${subjectLabel} :`,
    message,
    "",
    "En attendant :",
    `- Mes projets : ${SITE}/projects`,
    `- Mes formations : ${SITE}/formations`,
    `- Mon blog : ${SITE}/blog`,
    "",
    "À très bientôt,",
    "Lucas Troteseil",
    `${profile.title} · Bordeaux`,
    SITE,
  ].join("\n");

  return { html, text };
}
