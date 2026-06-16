import { profile, skillGroups } from "@/data/portfolio-data";
import { TechIcon, hasTechIcon, getTechAbbrev } from "@/components/ui/tech-icon";

export const metadata = {
  title: "À propos",
  description:
    "Parcours professionnel et académique de Lucas Troteseil — Chef de projet Data / IA en alternance chez Groupe NOVI, étudiant en Master Data & IA à Nexa Digital School.",
  openGraph: {
    title: "À propos — Lucas Troteseil",
    description:
      "Parcours professionnel et académique — Chef de projet Data / IA en alternance, Master Data & IA, Bordeaux.",
  },
};

/* ─── Données ─────────────────────────────────────────────── */

const noviRoles = [
  {
    period: "Oct. 2025 — Aujourd'hui",
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
    icon: "🏗️",
    title: "Plugin WooCommerce Stories",
    description:
      "Développement d'un plugin WordPress qui intègre une expérience vidéo type Stories dans les pages produits WooCommerce. Navigation swipe, lecture YouTube optimisée, zéro dépendance JS externe.",
  },
  {
    icon: "🤖",
    title: "IA & automatisation métier",
    description:
      "Intégration de LLMs (ChatGPT, Claude) et GitHub Copilot pour automatiser les workflows de développement et les processus métier au sein du groupe.",
  },
  {
    icon: "🗾",
    title: "Apprentissage du japonais",
    description:
      "Étude autodidacte de la langue japonaise — hiragana, katakana et premiers kanji. Défi personnel sur le long terme.",
  },
];

/* ─── Composants internes ──────────────────────────────────── */

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
          title={t}
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

/* ─── Page ─────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
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
          <em className="text-zinc-700 dark:text-zinc-300">Les Senteurs Gourmandes, Jozz Beauty, Physiomins</em> et{" "}
          <em className="text-zinc-700 dark:text-zinc-300">Pure Eden</em> dans le développement et le positionnement
          stratégique de leurs plateformes digitales — SEO technique, Core Web Vitals, écosystème Google et intégration IA.
        </p>
        <p>
          En parallèle, je poursuis un{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Master Data & IA à Nexa Digital School</strong> et je
          développe des projets open-source comme le plugin WooCommerce Stories.
        </p>
      </div>

      {/* Activités actuelles */}
      <section className="mt-14" aria-labelledby="activities-heading">
        <h2 id="activities-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          En ce moment
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">Ce sur quoi je travaille actuellement</p>
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

      {/* Expérience — Groupe NOVI (multi-rôles) */}
      <section className="mt-14" aria-labelledby="exp-heading">
        <h2 id="exp-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Expérience professionnelle
        </h2>

        {/* NOVI — bloc groupé */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">Groupe NOVI</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  Contrat en alternance · Bordeaux, Nouvelle-Aquitaine · Hybride
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                1 an 10 mois
              </span>
            </div>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {noviRoles.map((role) => (
              <div key={role.role} className="px-6 py-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{role.role}</h3>
                      {role.current && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          Poste actuel
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                      {role.type} · {role.duration}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-600">{role.period}</span>
                </div>
                <p className="mt-2.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{role.description}</p>
                <ul className="mt-2 space-y-1">
                  {role.missions.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" aria-hidden="true" />
                      {m}
                    </li>
                  ))}
                </ul>
                <TagList tags={role.tags} />
              </div>
            ))}
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
      </section>

      {/* Formation */}
      <section className="mt-14" aria-labelledby="edu-heading">
        <h2 id="edu-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Formation
        </h2>
        <div className="mt-6 space-y-6">
          {education.map((edu) => (
            <div key={edu.degree} className="relative border-l-2 border-zinc-200 pl-6 dark:border-zinc-800">
              <TimelineDot color={edu.current ? "amber" : "zinc"} />
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
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
                <p className="text-xs text-zinc-500 dark:text-zinc-500">{cert.issuer}</p>
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
                    title={item}
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
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-2xl" aria-hidden="true">🏄</p>
            <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Surf</p>
            <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
              Dans l&apos;océan dès que possible. La côte atlantique est juste là.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-2xl" aria-hidden="true">🧗</p>
            <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Escalade</p>
            <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
              Bloc en salle et en extérieur. Un bon exutoire après une semaine chargée.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-2xl" aria-hidden="true">🗾</p>
            <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Japonais</p>
            <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
              Apprentissage autodidacte en cours. Hiragana, katakana et premiers kanji.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
