import { profile } from "@/data/portfolio-data";

export const metadata = {
  title: "À propos | Lucas Troteseil",
  description: "Parcours professionnel et académique de Lucas Troteseil, Chef de projet Data / IA & Développeur Web basé à Bordeaux.",
};

const experiences = [
  {
    period: "2023 — Aujourd'hui",
    role: "Chef de projet Data / IA & Développeur Web",
    company: "Groupe NOVI",
    location: "Bordeaux, France",
    type: "CDI",
    description:
      "Pilotage du développement d'outils web internes et accompagnement de l'intégration de solutions Data et IA pour répondre à des besoins métier concrets. Gestion de projet transverse entre équipes techniques et opérationnelles.",
    tags: ["Next.js", "WordPress", "SEO", "Data", "IA", "Gestion de projet"],
  },
];

const education = [
  {
    period: "2021 — 2023",
    degree: "BTS SIO — option SLAM",
    school: "Développement de solutions logicielles et applications métiers",
    description:
      "Formation axée sur le développement web et logiciel, la gestion de bases de données et la conduite de projets informatiques.",
    tags: ["PHP", "JavaScript", "MySQL", "Algorithmique", "Gestion de projet"],
  },
  {
    period: "2019 — 2021",
    degree: "Baccalauréat Général",
    school: "Spécialités Mathématiques & NSI",
    description:
      "Option Numérique et Sciences Informatiques — introduction aux algorithmes, à la programmation et aux structures de données.",
    tags: ["Python", "Algorithmique", "Mathématiques"],
  },
];

const certifications = [
  { label: "Google Analytics 4", issuer: "Google" },
  { label: "SEO technique & Core Web Vitals", issuer: "Autoformation" },
  { label: "Intégration IA en contexte métier", issuer: "Autoformation" },
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

      <div className="mt-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>
          Je m&apos;appelle <strong className="text-zinc-900 dark:text-zinc-100">Lucas Troteseil</strong> et je suis{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">{profile.title}</strong>, basé à Bordeaux.
        </p>
        <p className="mt-4">
          J&apos;ai développé un profil hybride au croisement de la technique et de la stratégie.
          Chez <strong className="text-zinc-900 dark:text-zinc-100">Groupe NOVI</strong>, j&apos;accompagne le développement
          d&apos;outils web et l&apos;intégration de solutions Data / IA pour répondre à des besoins métier concrets,
          tout en assurant la liaison entre les équipes techniques et opérationnelles.
        </p>
        <p className="mt-4">
          Côté développement, je conçois des applications web modernes, rapides et maintenables, avec une
          attention particulière aux performances (Core Web Vitals), au SEO technique et à l&apos;expérience
          utilisateur — de la conception à la mise en production.
        </p>
      </div>

      {/* Expériences professionnelles */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Expériences professionnelles
        </h2>
        <div className="mt-6 space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.role}
              className="relative border-l-2 border-zinc-200 pl-6 dark:border-zinc-800"
            >
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
              <div className="mt-3 flex flex-wrap gap-2">
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
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Formation
        </h2>
        <div className="mt-6 space-y-6">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="relative border-l-2 border-zinc-200 pl-6 dark:border-zinc-800"
            >
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{edu.degree}</h3>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{edu.school}</p>
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
          Certifications & formations continues
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{cert.label}</p>
              <p className="mt-1 text-xs text-zinc-500">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Au-delà du code */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Au-delà du code
        </h2>
        <div className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            Je suis passionné d&apos;apprentissage continu. Je me forme actuellement au{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">japonais</strong> et découvre l&apos;écosystème
            mobile avec <strong className="text-zinc-900 dark:text-zinc-100">Swift</strong>.
          </p>
          <p className="mt-4">
            Quand je ne suis pas derrière un écran, vous me trouverez dans l&apos;océan avec mon{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">surf</strong>, ou en train de grimper sur des blocs
            d&apos;<strong className="text-zinc-900 dark:text-zinc-100">escalade</strong>.
          </p>
        </div>
      </section>
    </main>
  );
}
