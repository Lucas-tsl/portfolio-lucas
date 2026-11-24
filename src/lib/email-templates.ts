// Templates des emails du formulaire de contact — concept « ticket de demande ».
// Chaque demande reçoit un numéro (#LT-MMJJ-HHMM), les métadonnées sont présentées comme un reçu
// en police mono, le message du visiteur est imprimé sur un « coupon » entre deux lignes de découpe.
//
// Contraintes des clients mail : tables, styles INLINE (Gmail retire souvent <style>), 600 px max,
// aucune image (souvent bloquées). Le bloc <style> ne sert qu'au mode sombre (Apple Mail, Outlook macOS…).

import { contactSubjects, profile } from "@/data/portfolio-data";
import { FORMATIONS } from "@/data/formations-data";
import { BASE_URL } from "@/lib/site";

const SITE = BASE_URL;
// Délai de réponse annoncé dans l'accusé de réception (à ajuster librement)
const RESPONSE_DELAY = "2 jours ouvrés";

const C = {
  bg: "#f4f4f5",
  paper: "#ffffff",
  ink: "#09090b",
  text: "#3f3f46",
  muted: "#71717a",
  faint: "#71717a", // libellés discrets, contraste suffisant sur blanc
  rule: "#d4d4d8",
  emerald: "#059669",
  emeraldText: "#047857",
};
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "'Geist Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";

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

function parisParts(date: Date) {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: get("day"), month: get("month"), year: get("year"), hour: get("hour"), minute: get("minute") };
}

// Sans caractères ambigus (0/O, 1/I)
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Numéro de demande, calculé une fois par envoi et partagé par les deux emails : #LT-MMJJ-HHMM-XX
 *  (2 caractères aléatoires : deux messages dans la même minute ont des numéros différents) */
export function ticketRef(date = new Date()): string {
  const p = parisParts(date);
  const suffix = Array.from(crypto.getRandomValues(new Uint8Array(2)), (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
  return `LT-${p.month}${p.day}-${p.hour}${p.minute}-${suffix}`;
}

function receivedAt(date = new Date()): string {
  const p = parisParts(date);
  return `${p.day}.${p.month}.${p.year} — ${p.hour}:${p.minute}`;
}

function subjectLabelOf(subject: string): string {
  return contactSubjects.find((s) => s.value === subject)?.label ?? subject;
}

// ───────────────────────── Briques ─────────────────────────

/** Ligne de reçu : CLÉ ........ valeur */
function receiptRow(key: string, valueHtml: string): string {
  return `<tr>
    <td class="muted rule" style="padding:9px 0;font-family:${MONO};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};white-space:nowrap;vertical-align:top;border-bottom:1px dotted ${C.rule};" width="110">${key}</td>
    <td class="ink rule" style="padding:9px 0;font-family:${MONO};font-size:13px;color:${C.ink};text-align:right;border-bottom:1px dotted ${C.rule};">${valueHtml}</td>
  </tr>`;
}

/** Ligne de découpe : ✂ - - - - - - - - - - - LIBELLÉ */
function cutLine(caption: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td class="faint" style="font-family:${MONO};font-size:13px;color:${C.faint};width:18px;line-height:1;">&#9986;</td>
    <td style="border-top:1px dashed ${C.rule};font-size:0;line-height:0;" class="rule">&nbsp;</td>
    <td class="faint" style="font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C.faint};padding-left:10px;white-space:nowrap;width:1%;">${caption}</td>
  </tr></table>`;
}

/** Le message du visiteur, imprimé sur un coupon détachable */
function coupon(message: string, caption: string): string {
  return `${cutLine(caption)}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
    <tr><td class="text" style="padding:22px 0 22px 0;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.text};">${multiline(message)}</td></tr>
  </table>
  ${cutLine("fin")}`;
}

/** Grand titre court, terminé par un point émeraude */
function headline(text: string): string {
  return `<h1 class="ink" style="margin:0;font-family:${SANS};font-size:34px;line-height:1.1;font-weight:800;letter-spacing:-1px;color:${C.ink};">${text}<span style="color:${C.emerald};">.</span></h1>`;
}

/** Frise de statut type suivi de colis : étapes franchies pleines, à venir en contour */
function statusTrack(steps: { label: string; done: boolean }[]): string {
  const cells = steps
    .map((step, i) => {
      const dot = step.done
        ? `background:${C.emerald};border:2px solid ${C.emerald};color:#ffffff;`
        : `background:transparent;border:2px solid ${C.rule};color:${C.faint};`;
      const labelColor = step.done ? C.ink : C.muted;
      const line =
        i < steps.length - 1
          ? `<td style="padding:0 6px;vertical-align:middle;"><div class="rule" style="border-top:2px ${steps[i + 1].done ? "solid" : "dashed"} ${steps[i + 1].done ? C.emerald : C.rule};font-size:0;line-height:0;">&nbsp;</div></td>`
          : "";
      return `<td style="vertical-align:middle;white-space:nowrap;width:1%;">
          <span style="display:inline-block;width:18px;height:18px;line-height:18px;border-radius:50%;text-align:center;font-family:${MONO};font-size:11px;font-weight:700;vertical-align:middle;${dot}">${step.done ? "&#10003;" : i + 1}</span>
          <span class="${step.done ? "ink" : "muted"}" style="font-family:${MONO};font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${labelColor};vertical-align:middle;padding-left:6px;">${step.label}</span>
        </td>${line}`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${cells}</tr></table>`;
}

/** Squelette : bandeau mono (site / n° de ticket), feuille blanche, signature mono */
function layout({ preheader, ref, body }: { preheader: string; ref: string; body: string }): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Lucas Troteseil — #${esc(ref)}</title>
<style>
  @media (prefers-color-scheme: dark) {
    .bg { background:#09090b !important; }
    .paper { background:#18181b !important; border-color:#27272a !important; }
    .ink { color:#fafafa !important; }
    .text { color:#d4d4d8 !important; }
    .muted { color:#a1a1aa !important; }
    .faint { color:#a1a1aa !important; }
    .rule { border-color:#3f3f46 !important; }
    .link { color:#34d399 !important; }
  }
  @media (max-width:620px) {
    .pad { padding-left:22px !important; padding-right:22px !important; }
    h1 { font-size:28px !important; }
    .hide-sm { display:none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.bg};" class="bg">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};" class="bg">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
    <tr><td class="pad" style="padding:0 4px 12px 4px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td class="muted" style="font-family:${MONO};font-size:11px;letter-spacing:1px;color:${C.muted};white-space:nowrap;">
          <span class="ink" style="color:${C.ink};font-weight:700;">L<span style="color:${C.emerald};">T</span></span>&nbsp;&nbsp;lucas-troteseil.fr<span class="hide-sm"> / contact</span>
        </td>
        <td class="muted" style="font-family:${MONO};font-size:11px;letter-spacing:1px;color:${C.muted};text-align:right;white-space:nowrap;">#${esc(ref)}</td>
      </tr></table>
    </td></tr>
    <tr><td class="paper pad" style="background:${C.paper};border:1px solid #e4e4e7;border-radius:4px;padding:40px 44px 36px 44px;">
      ${body}
    </td></tr>
    <tr><td class="pad" style="padding:18px 4px 0 4px;font-family:${MONO};font-size:11px;line-height:1.8;color:${C.muted};" >
      <span class="muted" style="color:${C.muted};">— Lucas Troteseil · ${esc(profile.title)} · Bordeaux</span><br>
      <a href="${SITE}" class="link" style="color:${C.emeraldText};text-decoration:none;">site</a>
      <span class="faint" style="color:${C.faint};">/</span> <a href="${SITE}/projects" class="link" style="color:${C.emeraldText};text-decoration:none;">projets</a>
      <span class="faint" style="color:${C.faint};">/</span> <a href="${SITE}/formations" class="link" style="color:${C.emeraldText};text-decoration:none;">formations</a>
      <span class="faint" style="color:${C.faint};">/</span> <a href="${profile.linkedin}" class="link" style="color:${C.emeraldText};text-decoration:none;">linkedin</a>
      <span class="faint" style="color:${C.faint};">/</span> <a href="${profile.github}" class="link" style="color:${C.emeraldText};text-decoration:none;">github</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

// ───────────────────────── Suite à donner, selon le sujet ─────────────────────────
// `intro` : ce qui va se passer (accusé de réception) · `questions` : infos utiles pour bien répondre
// (affichées au visiteur ET reprises dans le brouillon « Demander des précisions » de la notification)

const NEXT_STEPS: Record<string, { intro: string; questions: string[] }> = {
  formation: {
    intro: "Je vous enverrai une proposition de programme et un devis adaptés à votre situation.",
    questions: [
      "Combien de personnes seraient formées ?",
      "Préférez-vous une formation à distance ou en présentiel ?",
      "Quelle période ou quelles dates envisagez-vous ?",
    ],
  },
  "dev-web": {
    intro: "Je reviendrai vers vous avec une première estimation et les points à cadrer ensemble.",
    questions: [
      "Quel est votre délai idéal ?",
      "Avez-vous un budget indicatif ?",
      "Avez-vous un exemple de site qui vous plaît ?",
    ],
  },
  "wordpress-cms": {
    intro: "Je reviendrai vers vous avec une première estimation et les points à cadrer ensemble.",
    questions: [
      "Votre site existe-t-il déjà ? Si oui, quelle est son adresse ?",
      "Quelles fonctionnalités sont prioritaires pour vous ?",
      "Quel est votre délai idéal ?",
    ],
  },
  "seo-performance": {
    intro: "Je regarderai le référencement et les performances de votre site avant de vous répondre.",
    questions: [
      "Quelle est l'adresse de votre site ?",
      "Sur quelles recherches Google aimeriez-vous apparaître ?",
      "Avez-vous accès à Google Search Console ?",
    ],
  },
  "data-ia": {
    intro: "Je reviendrai vers vous avec des pistes concrètes adaptées à votre activité.",
    questions: [
      "Quelles tâches aimeriez-vous automatiser ou accélérer ?",
      "Quels outils utilisez-vous au quotidien ?",
      "Des données sensibles ou confidentielles sont-elles concernées ?",
    ],
  },
  "gestion-projet": {
    intro: "Je reviendrai vers vous pour comprendre le contexte et vos attentes.",
    questions: [
      "Quel est le périmètre du projet ?",
      "Quelle équipe est impliquée ?",
      "Quelles sont les échéances clés ?",
    ],
  },
  collaboration: {
    intro: "Je reviendrai vers vous pour en discuter.",
    questions: ["Pouvez-vous m'en dire plus sur le projet ?", "Quel rôle imagineriez-vous pour moi ?"],
  },
};
const DEFAULT_STEPS = {
  intro: "Je reviendrai vers vous rapidement.",
  questions: ["Pouvez-vous préciser votre demande ?"],
};

function nextStepsOf(subject: string) {
  return NEXT_STEPS[subject] ?? DEFAULT_STEPS;
}

function mailtoHref(to: string, subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${encodeURIComponent(to)}?${params.join("&")}`;
}

// ───────────────────────── Notification (reçue par Lucas) ─────────────────────────

export function ownerEmail(
  name: string,
  email: string,
  subject: string,
  message: string,
  ref: string,
  formationId?: string
) {
  const subjectLabel = subjectLabelOf(subject);
  const formation = FORMATIONS.find((f) => f.id === formationId);
  const { questions } = nextStepsOf(subject);
  const replySubject = `Re: ${subjectLabel} [#${ref}]`;
  const at = receivedAt();

  // Brouillons pré-remplis : il ne reste qu'à compléter et envoyer
  const callDraft = mailtoHref(
    email,
    replySubject,
    `Bonjour ${name},\n\nMerci pour votre message concernant « ${formation?.title ?? subjectLabel} ». Le plus simple serait d'en parler de vive voix : seriez-vous disponible pour un appel de 15 minutes ? Je vous propose :\n- \n- \n\nBien à vous,\nLucas`
  );
  const detailsDraft = mailtoHref(
    email,
    replySubject,
    `Bonjour ${name},\n\nMerci pour votre message. Pour vous faire une proposition adaptée, pourriez-vous me préciser :\n${questions.map((q) => `- ${q}`).join("\n")}\n\nBien à vous,\nLucas`
  );

  const html = layout({
    preheader: `${name} · ${subjectLabel} — ${message.slice(0, 90)}`,
    ref,
    body: `
      <div class="muted" style="font-family:${MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.muted};margin:0 0 10px 0;">Ticket ouvert</div>
      ${headline("Nouvelle demande")}
      <p class="text" style="margin:12px 0 28px 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.text};">${esc(name)} vous écrit au sujet de : <strong class="ink" style="color:${C.ink};">${esc(subjectLabel)}</strong></p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px 0;">
        ${receiptRow("De", esc(name))}
        ${receiptRow("Email", `<a href="mailto:${esc(email)}" class="link" style="color:${C.emeraldText};text-decoration:none;">${esc(email)}</a>`)}
        ${receiptRow("Sujet", esc(subjectLabel))}
        ${formation ? receiptRow("Origine", `Page formations · ${esc(formation.title)}`) : ""}
        ${receiptRow("Reçu le", esc(at))}
      </table>

      ${coupon(message, "message")}

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 0 0;">
        <tr><td class="ink" style="background:${C.ink};border-radius:2px;">
          <a href="${esc(mailtoHref(email, replySubject))}" style="display:inline-block;padding:13px 22px;font-family:${MONO};font-size:13px;font-weight:700;letter-spacing:0.5px;color:#ffffff;text-decoration:none;">Répondre&nbsp;&nbsp;<span style="color:#34d399;">&rarr;</span></a>
        </td></tr>
      </table>
      <p style="margin:16px 0 0 0;font-family:${MONO};font-size:12px;line-height:2;">
        <span class="muted" style="color:${C.muted};">réponses rapides :</span><br>
        <a href="${esc(callDraft)}" class="link" style="color:${C.emeraldText};text-decoration:none;">&#8627; proposer un appel</a><br>
        <a href="${esc(detailsDraft)}" class="link" style="color:${C.emeraldText};text-decoration:none;">&#8627; demander des précisions</a>
      </p>`,
  });

  const text = [
    `NOUVELLE DEMANDE — #${ref}`,
    "",
    `De      : ${name}`,
    `Email   : ${email}`,
    `Sujet   : ${subjectLabel}`,
    ...(formation ? [`Origine : page formations · ${formation.title}`] : []),
    `Reçu le : ${at}`,
    "",
    "✂ ---------------------------- message",
    message,
    "✂ -------------------------------- fin",
    "",
    `Répondre : « Répondre » dans votre messagerie (vers ${email}).`,
  ].join("\n");

  return { html, text };
}

// ───────────────────────── Accusé de réception (envoyé au visiteur) ─────────────────────────

export function confirmationEmail(name: string, subject: string, message: string, ref: string) {
  const subjectLabel = subjectLabelOf(subject);
  const { intro, questions } = nextStepsOf(subject);
  const at = receivedAt();

  const html = layout({
    preheader: `Merci ${name} : votre demande #${ref} est bien arrivée. Réponse sous ${RESPONSE_DELAY}.`,
    ref,
    body: `
      <div class="muted" style="font-family:${MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.muted};margin:0 0 10px 0;">Demande #${esc(ref)}</div>
      ${headline("Message reçu")}
      <p class="text" style="margin:14px 0 26px 0;font-family:${SANS};font-size:16px;line-height:1.65;color:${C.text};">Merci ${esc(name)}. Votre message est bien arrivé, je le lis attentivement et je vous réponds personnellement sous <strong class="ink" style="color:${C.ink};">${RESPONSE_DELAY}</strong>.</p>

      <div style="margin:0 0 34px 0;">
        ${statusTrack([
          { label: "Reçu", done: true },
          { label: "En cours", done: false },
          { label: "Réponse", done: false },
        ])}
      </div>

      <div class="muted" style="font-family:${MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.muted};margin:0 0 8px 0;">La suite</div>
      <p class="text" style="margin:0 0 12px 0;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.text};">${esc(intro)} Pour gagner du temps, vous pouvez déjà me répondre sur ces points :</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px 0;">
        ${questions
          .map(
            (q) => `<tr>
          <td class="link" style="font-family:${MONO};font-size:13px;color:${C.emeraldText};padding:4px 10px 4px 0;vertical-align:top;">&rarr;</td>
          <td class="text" style="font-family:${SANS};font-size:15px;line-height:1.55;color:${C.text};padding:4px 0;">${esc(q)}</td>
        </tr>`
          )
          .join("")}
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px 0;">
        ${receiptRow("Sujet", esc(subjectLabel))}
        ${receiptRow("Envoyé le", esc(at))}
        ${receiptRow("Référence", `#${esc(ref)}`)}
      </table>

      ${coupon(message, "votre message")}

      <p class="text" style="margin:32px 0 10px 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.text};">Pour compléter votre demande, répondez simplement à cet email en gardant la référence dans l'objet.</p>
      <p class="text" style="margin:0;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.text};">En attendant : <a href="${SITE}/projects" class="link" style="color:${C.emeraldText};font-weight:600;text-decoration:none;">mes projets</a>, <a href="${SITE}/formations" class="link" style="color:${C.emeraldText};font-weight:600;text-decoration:none;">mes formations</a> ou <a href="${SITE}/blog" class="link" style="color:${C.emeraldText};font-weight:600;text-decoration:none;">le blog</a>.</p>

      <p class="ink" style="margin:30px 0 0 0;font-family:${SANS};font-size:15px;font-weight:700;color:${C.ink};">Lucas</p>`,
  });

  const text = [
    `MESSAGE REÇU — demande #${ref}`,
    "",
    `Merci ${name}. Votre message est bien arrivé, je le lis attentivement et je vous réponds personnellement sous ${RESPONSE_DELAY}.`,
    "",
    "[✓ Reçu] — [ En cours ] — [ Réponse ]",
    "",
    "LA SUITE",
    `${intro} Pour gagner du temps, vous pouvez déjà me répondre sur ces points :`,
    ...questions.map((q) => `→ ${q}`),
    "",
    `Sujet     : ${subjectLabel}`,
    `Envoyé le : ${at}`,
    `Référence : #${ref}`,
    "",
    "✂ ---------------------- votre message",
    message,
    "✂ -------------------------------- fin",
    "",
    "Pour compléter votre demande, répondez simplement à cet email.",
    `Projets : ${SITE}/projects · Formations : ${SITE}/formations · Blog : ${SITE}/blog`,
    "",
    "Lucas",
    `— Lucas Troteseil · ${profile.title} · Bordeaux`,
  ].join("\n");

  return { html, text };
}
