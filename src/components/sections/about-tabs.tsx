"use client";

import { useState, useEffect, useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { profile, skillGroups } from "@/data/portfolio-data";
import { TechIcon, hasTechIcon, getTechAbbrev } from "@/components/ui/tech-icon";

/* ─── Données ─────────────────────────────────────────────── */

/** Date de début du contrat NOVI (1ère alternance) — sert au calcul de l'ancienneté totale */
const NOVI_SINCE = "2024-09-01";

const noviRoles = [
  {
    period: "Oct. 2025 — Aujourd'hui",
    since: "2025-10-01",
    duration: "9 mois",
    role: "Chef de Projet Data & IA",
    type: "Alternance",
    current: true,
    description:
      "Je soutiens des marques comme Les Senteurs Gourmandes, Jozz Beauty, Physiomins et Pure Eden dans le développement, l'optimisation et le positionnement stratégique de leurs plateformes digitales.",
    missions: [
      "SEO technique : structure, balisage, maillage, sitemap, robots.txt, optimisation de +250 fiches produits",
      "Core Web Vitals : lazy loading, compression JS/CSS, images — conformité WCAG/ARIA",
      "Écosystème Google : Search Console, PageSpeed Insights, Merchant Center, Analytics, Tag Manager",
      "Automatisation & IA : ChatGPT & GitHub Copilot pour les workflows de développement, intégration LLMs",
    ],
    tags: ["SEO technique", "Core Web Vitals", "Google Analytics 4", "Tag Manager", "ChatGPT", "GitHub Copilot", "WCAG"],
  },
  {
    period: "Sept. 2024 — Sept. 2025",
    since: "2024-09-01",
    duration: "1 an 1 mois",
    role: "Développeur Web / Webmaster",
    type: "Alternance",
    current: false,
    description:
      "Développement et gestion des sites e-commerce du groupe sur WordPress et PrestaShop.",
    missions: [
      "Front-end (HTML, CSS, JavaScript) et back-end (PHP) des propriétés web du groupe",
      "CMS WordPress & PrestaShop : paramétrage complet (tunnel de commande, paiement, SEO, sécurité)",
      "Design et maquettes (Figma, Canva), versioning (GitHub, WinSCP), coordination (Notion)",
      "Gestion des réductions, rôles & privilèges, performances, intégrité des données",
    ],
    tags: ["WordPress", "PrestaShop", "PHP", "JavaScript", "Figma", "GitHub", "Notion"],
  },
];

const otherExperiences = [
  {
    period: "Mai 2023 — Avr. 2024",
    duration: "1 an",
    role: "Développeur Web",
    company: "ALTERNATRI 53",
    location: "Angers",
    type: "Bénévolat",
    description:
      "Développement et maintenance du site web de l'association. Démarré par un stage de 2 mois (mai–juin 2023) puis poursuite en bénévolat.",
    tags: ["WordPress", "Notion"],
  },
  {
    period: "Juil. 2023 — Août 2023",
    duration: "2 mois",
    role: "Gestion de programmes",
    company: "éolane",
    location: "Angers",
    type: "Intérimaire",
    description:
      "Création et transfert de programmes AOI (Automated Optical Inspection) de la version MV3 vers MV7.",
    tags: ["Microsoft Excel", "AOI"],
  },
  {
    period: "Juil. 2022 — Août 2022",
    duration: "2 mois",
    role: "Aide comptable",
    company: "LILIAL",
    location: "Angers",
    type: "Intérimaire",
    description: "Mission d'aide comptable : saisie et gestion des commandes.",
    tags: ["Microsoft Excel", "Gestion des commandes"],
  },
];

const education = [
  {
    period: "Oct. 2025 — Oct. 2027",
    degree: "Master 1 — Data & Intelligence Artificielle",
    school: "Nexa Digital School",
    current: true,
    description:
      "Formation en alternance spécialisée en Data Science, Machine Learning et IA appliquée aux contextes métier. En cours.",
    tags: ["Data Science", "Machine Learning", "IA appliquée", "Python", "Alternance"],
  },
  {
    period: "Sept. 2024 — Sept. 2025",
    degree: "Bachelor — Développement Web & Applications",
    school: "Nexa Digital School",
    current: false,
    description:
      "Bachelor informatique orienté développement web, gestion de projet et SEO. Obtenu en alternance chez Groupe NOVI.",
    tags: ["Développement web", "SEO", "Notion", "Gestion de projet"],
  },
  {
    period: "2023 — 2024",
    degree: "BTS — Classe préparatoire ingénieur",
    school: "ESAIP, École d'Ingénieurs",
    current: false,
    description:
      "Année de prépa intégrée à l'ESAIP pour préparer l'entrée en cycle ingénieur.",
    tags: ["Mathématiques", "Sciences", "Notion", "SEO"],
  },
  {
    period: "2022 — 2024",
    degree: "BTS SIO — Cybersécurité, Développement Web & BDD",
    school: "Lycée CHEVROLLIER, Angers",
    current: false,
    description:
      "BTS Services Informatiques aux Organisations. Spécialités : cybersécurité, développement web, gestion de bases de données, veille informatique.",
    tags: ["JavaScript", "HTML5", "CSS", "SQL", "Cybersécurité", "Réseaux", "PHP", "BDD", "Veille"],
  },
  {
    period: "2019 — 2022",
    degree: "Baccalauréat Général — SES, HGGSP, Anglais",
    school: "Lycée Joachim du Bellay, Angers",
    current: false,
    description:
      "Spécialités Sciences Économiques et Sociales, Histoire-Géographie Géopolitique et Sciences Politiques, Anglais.",
    tags: ["SES", "HGGSP", "Anglais"],
  },
];

const certifications = [
  { label: "Google Analytics 4", issuer: "Google", year: "2024" },
  { label: "Google Search Console", issuer: "Google", year: "2024" },
  { label: "SEO technique & Core Web Vitals", issuer: "Autoformation", year: "2024" },
  { label: "Intégration IA en contexte métier", issuer: "Autoformation", year: "2025" },
  { label: "GitHub Copilot", issuer: "GitHub", year: "2025" },
  { label: "WCAG / Accessibilité web", issuer: "Autoformation", year: "2025" },
];

const currentActivities = [
  {
    icon: "🎓",
    title: "Master Data & IA — Nexa",
    description:
      "En alternance depuis octobre 2025 : formation en Data Science et IA appliquée à Nexa Digital School, en parallèle de mon poste chez Groupe NOVI.",
  },
  {
    icon: "🧩",
    title: "Navi — Hub WordPress & PrestaShop",
    description:
      "Plugin/module qui regroupe cookies, accessibilité, panier sticky et bulles vidéo Stories derrière un seul bouton flottant, décliné sur WordPress et PrestaShop.",
  },
  {
    icon: "🤖",
    title: "Automatisation interne Groupe NOVI",
    description:
      "Bots et outils internes (publication d'avis clients, monitoring du tunnel de commande, extension de gestion produits) pour fiabiliser des tâches répétitives côté marques.",
  },
  {
    icon: "🗾",
    title: "Apprentissage du japonais",
    description:
      "Étude autodidacte de la langue japonaise — hiragana, katakana et premiers kanji. Défi personnel sur le long terme.",
  },
];

/* URLs des marques — à vérifier/compléter */
const BRAND_URLS: Record<string, string> = {
  "Les Senteurs Gourmandes": "https://www.lessenteursgourmandes.com",
  "Jozz Beauty":             "https://www.jozzbeauty.fr",
  "Physiomins":              "https://www.physiomins.fr",
  "Pure Eden":               "https://www.pure-eden.fr",
};

function BrandLink({ name }: { name: string }) {
  const href = BRAND_URLS[name] ?? "#";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="underline decoration-dotted decoration-zinc-300 underline-offset-2 transition-colors hover:decoration-zinc-500 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
    >
      {name}
    </a>
  );
}

/* ─── Durées dynamiques ───────────────────────────────────── */
/* Calculées à l'affichage plutôt qu'en dur, pour ne pas se désynchroniser au fil du temps. */

function monthsSince(isoStart: string, until: Date): number {
  const start = new Date(isoStart);
  let months = (until.getFullYear() - start.getFullYear()) * 12 + (until.getMonth() - start.getMonth());
  if (until.getDate() < start.getDate()) months -= 1;
  return Math.max(months, 0);
}

function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} an${years > 1 ? "s" : ""}`);
  if (rem > 0 || years === 0) parts.push(`${rem} mois`);
  return parts.join(" ");
}

/** null tant que le composant n'est pas monté côté client — évite tout écart d'hydratation avec le HTML pré-rendu */
function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  return now;
}

/* ─── Composants partagés ─────────────────────────────────── */

function TimelineDot({ color }: { color: "amber" | "zinc" | "emerald" }) {
  const cls = {
    amber: "bg-amber-400 dark:bg-amber-500",
    zinc: "bg-zinc-400 dark:bg-zinc-500",
    emerald: "bg-emerald-400 dark:bg-emerald-500",
  }[color];
  return <div className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${cls}`} />;
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          aria-label={t}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
        >
          {hasTechIcon(t) && <TechIcon name={t} size={11} />}
          <span aria-hidden="true">{getTechAbbrev(t)}</span>
        </span>
      ))}
    </div>
  );
}

/* ─── Contenu des onglets ─────────────────────────────────── */

function ExperiencePanel() {
  const now = useNow();
  const noviTotalDuration = now ? formatDuration(monthsSince(NOVI_SINCE, now)) : "1 an 11 mois";

  return (
    <>
      {/* NOVI */}
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">Groupe NOVI</p>
              <p className="text-sm text-zinc-500">
                Contrat en alternance · Bordeaux, Nouvelle-Aquitaine · Hybride
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {noviTotalDuration}
            </span>
          </div>
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {noviRoles.map((role) => {
            const duration = role.current && now ? formatDuration(monthsSince(role.since, now)) : role.duration;
            return (
            <div key={role.role} className="px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{role.role}</h3>
                    {role.current && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Poste actuel
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">{role.type} · {duration}</p>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-600">{role.period}</span>
              </div>
              <p className="mt-2.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {role.current ? (
                  <>
                    Je soutiens des marques comme{" "}
                    <BrandLink name="Les Senteurs Gourmandes" />,{" "}
                    <BrandLink name="Jozz Beauty" />,{" "}
                    <BrandLink name="Physiomins" /> et{" "}
                    <BrandLink name="Pure Eden" />{" "}
                    dans le développement, l&apos;optimisation et le positionnement stratégique de leurs plateformes digitales.
                  </>
                ) : (
                  role.description
                )}
              </p>
              <ul className="mt-2 space-y-1">
                {role.missions.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-xs text-zinc-500">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
              <TagList tags={role.tags} />
            </div>
            );
          })}
        </div>
      </div>

      {/* Autres expériences */}
      <div className="mt-6 space-y-6">
        {otherExperiences.map((exp) => (
          <div key={`${exp.company}-${exp.role}`} className="relative border-l-2 border-zinc-200 pl-6 dark:border-zinc-800">
            <TimelineDot color="zinc" />
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {exp.company} · {exp.location}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-zinc-400 dark:text-zinc-600">{exp.period}</span>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
                  {exp.type} · {exp.duration}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{exp.description}</p>
            <TagList tags={exp.tags} />
          </div>
        ))}
      </div>
    </>
  );
}

function FormationPanel() {
  return (
    <div className="mt-6 space-y-6">
      {education.map((edu) => (
        <div key={edu.degree} className="relative border-l-2 border-zinc-200 pl-6 dark:border-zinc-800">
          <TimelineDot color={edu.current ? "amber" : "zinc"} />
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{edu.degree}</h3>
                {edu.current && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    En cours
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">{edu.school}</p>
            </div>
            <span className="text-xs text-zinc-400 dark:text-zinc-600">{edu.period}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{edu.description}</p>
          <TagList tags={edu.tags} />
        </div>
      ))}
    </div>
  );
}

/* ─── Page principale ─────────────────────────────────────── */

type Tab = "experience" | "formation";

export function AboutContent() {
  const [activeTab, setActiveTab] = useState<Tab>("experience");
  const [showNav, setShowNav] = useState(false);
  const tabSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => {
      if (!tabSectionRef.current) return;
      const rect = tabSectionRef.current.getBoundingClientRect();
      // Show while section is between entering view and scrolling fully above
      setShowNav(rect.top < window.innerHeight * 0.85 && rect.bottom > 120);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 pb-28">

      {/* En-tête */}
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Mon parcours
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        À propos de moi
      </h1>

      {/* Intro */}
      <div className="mt-8 space-y-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>
          Je m&apos;appelle{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Lucas Troteseil</strong>, je suis{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">{profile.title}</strong> en alternance chez{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Groupe NOVI</strong> à Bordeaux.
        </p>
        <p>
          Je soutiens des marques comme{" "}
          <em className="text-zinc-700 dark:text-zinc-300">
            <BrandLink name="Les Senteurs Gourmandes" />, <BrandLink name="Jozz Beauty" />, <BrandLink name="Physiomins" />
          </em>{" "}
          et{" "}
          <em className="text-zinc-700 dark:text-zinc-300">
            <BrandLink name="Pure Eden" />
          </em>{" "}
          dans le développement et le positionnement stratégique de leurs plateformes digitales — SEO technique, Core Web Vitals, écosystème Google et intégration IA.
        </p>
        <p>
          En parallèle, je poursuis un{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Master Data & IA à Nexa Digital School</strong> et je
          développe des projets internes et open-source, comme le hub d&apos;engagement{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Navi</strong> (WordPress &amp; PrestaShop).
        </p>
      </div>

      {/* Activités actuelles */}
      <section className="mt-14" aria-labelledby="activities-heading">
        <h2 id="activities-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          En ce moment
        </h2>
        <p className="mt-2 text-sm text-zinc-500">Ce sur quoi je travaille actuellement</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {currentActivities.map((activity) => (
            <div
              key={activity.title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">{activity.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{activity.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 dark:text-zinc-400">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section à onglets ─────────────────────────────── */}
      <section ref={tabSectionRef} className="mt-14" aria-labelledby="tab-section-heading">
        <h2 id="tab-section-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {activeTab === "experience" ? "Expérience professionnelle" : "Formation"}
        </h2>

        {activeTab === "experience" ? <ExperiencePanel /> : <FormationPanel />}
      </section>

      {/* Certifications */}
      <section className="mt-14" aria-labelledby="certs-heading">
        <h2 id="certs-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Certifications & veille
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{cert.label}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-zinc-500">{cert.issuer}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600">{cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compétences */}
      <section className="mt-14" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Compétences clés
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {group.category}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{group.name}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    aria-label={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    {hasTechIcon(item) && <TechIcon name={item} size={11} />}
                    <span aria-hidden="true">{getTechAbbrev(item)}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perso */}
      <section className="mt-14" aria-labelledby="personal-heading">
        <h2 id="personal-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          En dehors du travail
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: "🏄", title: "Surf", desc: "Dans l'océan dès que possible. La côte atlantique est juste là." },
            { icon: "🧗", title: "Escalade", desc: "Bloc en salle et en extérieur. Un bon exutoire après une semaine chargée." },
            { icon: "🗾", title: "Japonais", desc: "Apprentissage autodidacte en cours. Hiragana, katakana et premiers kanji." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-2xl" aria-hidden="true">{icon}</p>
              <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
              <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Floating bottom nav ──────────────────────────── */}
      <div
        aria-hidden={!showNav}
        className={`fixed bottom-6 left-0 right-0 z-40 flex justify-center transition-all duration-300 ${
          showNav ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <nav
          aria-label="Switcher parcours"
          className="flex items-center gap-1 rounded-2xl border border-zinc-200/80 bg-white/90 p-1.5 shadow-xl shadow-zinc-200/60 backdrop-blur-md dark:border-zinc-700/60 dark:bg-zinc-900/90 dark:shadow-zinc-950/60"
        >
          <button
            onClick={() => { setActiveTab("experience"); tabSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            aria-pressed={activeTab === "experience"}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "experience"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Briefcase size={15} aria-hidden="true" strokeWidth={activeTab === "experience" ? 2.2 : 1.7} />
            Expérience
          </button>
          <button
            onClick={() => { setActiveTab("formation"); tabSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            aria-pressed={activeTab === "formation"}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "formation"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <GraduationCap size={15} aria-hidden="true" strokeWidth={activeTab === "formation" ? 2.2 : 1.7} />
            Formation
          </button>
        </nav>
      </div>
    </main>
  );
}
