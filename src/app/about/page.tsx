import { profile, skillGroups } from "@/data/portfolio-data";

export const metadata = {
  title: "À propos",
  description:
    "Parcours professionnel, formation et activités de Lucas Troteseil — Chef de projet Data / IA & Développeur Web basé à Bordeaux.",
  openGraph: {
    title: "À propos — Lucas Troteseil",
    description:
      "Parcours professionnel, formation et activités actuelles — Chef de projet Data / IA & Développeur Web basé à Bordeaux.",
  },
};

const experiences = [
  {
    period: "2023 — Aujourd'hui",
    role: "Chef de projet Data / IA & Développeur Web",
    company: "Groupe NOVI",
    location: "Bordeaux, France",
    type: "CDI",
    current: true,
    description:
      "Pilotage transverse des projets web et Data au sein d'un groupe multi-entités. Développement d'outils internes (Next.js, WordPress), intégration de solutions basées sur l'IA et la donnée, coordination entre équipes techniques et opérationnelles.",
    missions: [
      "Développement et maintenance des sites WordPress du groupe",
      "Intégration et déploiement d'outils IA pour automatiser des tâches métier",
      "Optimisation SEO et Core Web Vitals des propriétés web",
      "Rédaction de cahiers des charges et spécifications fonctionnelles",
      "Gestion de prestataires externes et coordination de livraisons",
    ],
    tags: ["Next.js", "WordPress", "SEO", "Data", "IA", "Gestion de projet", "WooCommerce"],
  },
];

const education = [
  {
    period: "2021 — 2023",
    degree: "BTS SIO — option SLAM",
    school: "Solutions Logicielles et Applications Métiers",
    description:
      "Formation technique orientée développement web et logiciel. Conception d'applications, bases de données relationnelles, API REST, conduite de projets en méthode Agile.",
    tags: ["PHP", "JavaScript", "MySQL", "Java", "Réseaux", "Gestion de projet Agile"],
  },
  {
    period: "2019 — 2021",
    degree: "Baccalauréat Général",
    school: "Spécialités Mathématiques & NSI (Numérique et Sciences Informatiques)",
    description:
      "Introduction à l'algorithmique, la programmation Python, les structures de données et les réseaux. Mention obtenue.",
    tags: ["Python", "Algorithmique", "Mathématiques", "Réseaux"],
  },
];

const certifications = [
  { label: "Google Analytics 4", issuer: "Google", year: "2024" },
  { label: "SEO technique & Core Web Vitals", issuer: "Autoformation", year: "2023" },
  { label: "Intégration IA en contexte métier", issuer: "Autoformation", year: "2024" },
];

const currentActivities = [
  {
    icon: "🏗️",
    title: "Plugin WooCommerce Stories",
    description:
      "Développement en cours d'un plugin WordPress qui intègre une expérience vidéo type Stories directement dans les pages produits WooCommerce. Navigation swipe, lecture YouTube optimisée, zéro dépendance JS externe.",
  },
  {
    icon: "🤖",
    title: "IA & automatisation",
    description:
      "Exploration et intégration des LLMs (Claude, GPT-4) pour automatiser des workflows métier au sein de Groupe NOVI. Prompt engineering, orchestration et création d'outils internes.",
  },
  {
    icon: "🗾",
    title: "Apprentissage du japonais",
    description:
      "Étude de la langue japonaise (hiragana, katakana, kanji N5) en autodidacte. Défi personnel d'apprentissage à long terme.",
  },
  {
    icon: "📱",
    title: "Swift & développement iOS",
    description:
      "Découverte de l'écosystème Apple avec Swift et SwiftUI. Objectif : comprendre le cycle de développement mobile pour élargir le scope des projets.",
  },
];

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
          <strong className="text-zinc-900 dark:text-zinc-100">{profile.title}</strong>, basé à{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">Bordeaux</strong>.
        </p>
        <p>
          Chez <strong className="text-zinc-900 dark:text-zinc-100">Groupe NOVI</strong>, je pilote des projets web
          et Data au quotidien — du développement de plugins WordPress sur-mesure à l&apos;intégration de solutions IA,
          en passant par l&apos;optimisation SEO et la coordination de prestataires. Mon profil hybride me permet de
          faire le lien entre les besoins métier et l&apos;exécution technique.
        </p>
        <p>
          En dehors de mon poste, je développe en parallèle des projets open-source (plugin WooCommerce Stories),
          j&apos;explore le développement iOS avec Swift et je continue à me former sur l&apos;IA appliquée.
        </p>
      </div>

      {/* Activités actuelles */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Activités en cours
        </h2>
        <p className="mt-2 text-sm text-zinc-500">Ce sur quoi je travaille en ce moment</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {currentActivities.map((activity) => (
            <div
              key={activity.title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{activity.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{activity.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-zinc-600 dark:text-zinc-400">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expériences */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Expérience professionnelle
        </h2>
        <div className="mt-6 space-y-8">
          {experiences.map((exp) => (
            <div key={exp.role} className="relative border-l-2 border-zinc-200 pl-6 dark:border-zinc-800">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                    {exp.current && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Poste actuel
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className="text-xs text-zinc-500">{exp.period}</span>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {exp.type}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{exp.description}</p>
              <ul className="mt-3 space-y-1">
                {exp.missions.map((mission) => (
                  <li key={mission} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-500">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    {mission}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 px-3 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Formation */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Formation</h2>
        <div className="mt-6 space-y-6">
          {education.map((edu) => (
            <div key={edu.degree} className="relative border-l-2 border-zinc-200 pl-6 dark:border-zinc-800">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{edu.degree}</h3>
                  <p className="text-sm text-zinc-500">{edu.school}</p>
                </div>
                <span className="text-xs text-zinc-500">{edu.period}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{edu.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {edu.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 px-3 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Certifications & veille
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{cert.label}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-zinc-500">{cert.issuer}</p>
                <p className="text-xs text-zinc-400">{cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stack personnelle */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
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
                    className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perso */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          En dehors du travail
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-2xl">🏄</p>
            <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100">Surf</p>
            <p className="mt-1 text-xs leading-5">Dans l&apos;océan dès que possible. La côte atlantique est juste là.</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-2xl">🧗</p>
            <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100">Escalade</p>
            <p className="mt-1 text-xs leading-5">Bloc en salle et en extérieur. Un bon exutoire après une semaine chargée.</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-2xl">🗾</p>
            <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100">Japonais</p>
            <p className="mt-1 text-xs leading-5">Apprentissage autodidacte en cours. Hiragana, katakana et kanji N5.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
