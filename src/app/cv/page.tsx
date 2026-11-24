import type { Metadata } from "next";
import { Download, Mail, Globe, Linkedin, Github, MapPin, Car } from "lucide-react";
import { profile, skillGroups } from "@/data/portfolio-data";
import {
  noviRoles,
  otherExperiences,
  education,
  certifications,
  languages,
  strengths,
  interests,
} from "@/data/career-data";
import { PrintButton } from "@/components/cv/print-button";
import { BASE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "CV",
  description:
    "CV de Lucas Troteseil — Chef de projet Data / IA & Développeur Web à Bordeaux. Disponible pour des projets, poste recherché à partir de septembre 2027.",
  alternates: { canonical: `${BASE_URL}/cv` },
  openGraph: {
    title: "CV — Lucas Troteseil",
    description: "Chef de projet Data / IA & Développeur Web · Bordeaux",
    url: `${BASE_URL}/cv`,
  },
};

/* Projets retenus pour le CV : courts, orientés résultat */
const cvProjects = [
  {
    title: "Navi — Hub d'engagement e-commerce",
    stack: "WordPress · PrestaShop · PHP · JS",
    text: "Plugin et module regroupant cookies (Consent Mode V2), accessibilité, panier sticky et bulles vidéo derrière un seul bouton.",
  },
  {
    title: "Kaizen Formations",
    stack: "Next.js 16 · TypeScript · Tailwind",
    text: "Site vitrine d'un organisme de formation : catalogue filtrable, pages détaillées, données structurées JSON-LD.",
  },
  {
    title: "Automatisation interne Groupe NOVI",
    stack: "Python · Pandas · Google Sheets",
    text: "Bots de publication d'avis clients et monitoring du tunnel de commande pour fiabiliser des tâches répétitives.",
  },
];

/** Nombre de missions affichées par poste NOVI (pour tenir sur une page A4) */
const missionsShown = [4, 3];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
      {children}
      <span className="h-px flex-1 bg-zinc-200" aria-hidden="true" />
    </h2>
  );
}

function SideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-1.5 text-[9.5px] font-bold uppercase tracking-[0.2em] text-emerald-400">{children}</h2>
  );
}

export default function CvPage() {
  const contactLines = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Globe, label: BASE_URL.replace("https://", ""), href: BASE_URL },
    { icon: Linkedin, label: "linkedin.com/in/lucas-tsl", href: profile.linkedin },
    { icon: Github, label: "github.com/Lucas-tsl", href: profile.github },
    { icon: MapPin, label: "Bordeaux · hybride ou à distance" },
    { icon: Car, label: "Permis B" },
  ];

  return (
    <div className="bg-zinc-100 py-10 dark:bg-zinc-900 print:bg-white print:py-0">
      {/* Barre d'actions — masquée à l'impression */}
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-end justify-between gap-3 px-4 print:hidden">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">Curriculum vitæ</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Mon CV</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/cv.pdf"
            download="CV_Lucas_Troteseil.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <Download size={15} aria-hidden="true" />
            Télécharger le PDF
          </a>
          <PrintButton />
        </div>
      </div>

      {/* Feuille A4 — toujours en clair, y compris en thème sombre */}
      <div className="overflow-x-auto px-4 print:overflow-visible print:px-0">
        <article
          id="cv-sheet"
          aria-label="CV de Lucas Troteseil"
          className="mx-auto grid h-[297mm] w-[210mm] grid-cols-[64mm_1fr] overflow-hidden bg-white text-zinc-800 shadow-xl ring-1 ring-zinc-200 print:shadow-none print:ring-0"
        >
          {/* ── Colonne latérale ───────────────────────────── */}
          <aside className="flex flex-col gap-4 bg-zinc-950 px-6 py-8 text-zinc-300">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-lg font-extrabold text-zinc-950" aria-hidden="true">
                LT
              </div>
              <p className="mt-3 text-[10.5px] leading-snug text-zinc-400">
                Disponible dès maintenant pour des projets.
                <span className="mt-1 block font-semibold text-emerald-400">
                  Poste recherché à partir de septembre 2027.
                </span>
              </p>
            </div>

            <section>
              <SideTitle>Contact</SideTitle>
              <ul className="space-y-1.5 text-[10px]">
                {contactLines.map(({ icon: Icon, label, href }) => (
                  <li key={label} className="flex items-center gap-2">
                    <Icon size={11} className="shrink-0 text-emerald-400" aria-hidden="true" />
                    {href ? (
                      <a href={href} className="break-all text-zinc-200 hover:text-white">{label}</a>
                    ) : (
                      <span>{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SideTitle>Compétences</SideTitle>
              <ul className="space-y-2">
                {skillGroups.map((g) => (
                  <li key={g.id}>
                    <p className="text-[10px] font-semibold text-white">{g.name}</p>
                    <p className="text-[9.5px] leading-snug text-zinc-400">{g.items.slice(0, 6).join(" · ")}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SideTitle>Langues</SideTitle>
              <ul className="space-y-1 text-[10px]">
                {languages.map((l) => (
                  <li key={l.label}>
                    <span className="font-semibold text-white">{l.label}</span>
                    <span className="text-zinc-400"> — {l.level}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SideTitle>Atouts</SideTitle>
              <p className="text-[10px] leading-relaxed">{strengths.join(" · ")}</p>
            </section>

            <section>
              <SideTitle>Centres d&apos;intérêt</SideTitle>
              <ul className="space-y-0.5 text-[10px]">
                {interests.map((i) => (
                  <li key={i.label}>
                    <span className="font-semibold text-white">{i.label} :</span> {i.detail}
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* ── Colonne principale ─────────────────────────── */}
          <div className="flex flex-col gap-5 px-8 pb-7 pt-8">
            <header>
              <p className="text-[10.25px] font-semibold uppercase tracking-[0.25em] text-amber-700">
                Portfolio · {BASE_URL.replace("https://", "")}
              </p>
              <p className="mt-1 text-[30px] font-extrabold leading-none tracking-tight text-zinc-950">{profile.name}</p>
              <p className="mt-1.5 text-[13px] font-semibold text-emerald-700">{profile.title}</p>
              <p className="mt-2 text-[11.25px] leading-relaxed text-zinc-600">{profile.tagline}</p>
            </header>

            <section>
              <SectionTitle>Expérience professionnelle</SectionTitle>
              <div className="space-y-2.5">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[12.5px] font-bold text-zinc-950">Groupe NOVI · Bordeaux</p>
                    <p className="shrink-0 text-[10.25px] font-medium text-zinc-500">Alternance depuis sept. 2024</p>
                  </div>
                  <div className="mt-1 space-y-2 border-l-2 border-emerald-500 pl-3">
                    {noviRoles.map((r, idx) => (
                      <div key={r.role}>
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-[11.25px] font-semibold text-zinc-900">{r.role}</p>
                          <p className="shrink-0 text-[10.25px] text-zinc-500">{r.period}</p>
                        </div>
                        <ul className="mt-0.5 list-disc space-y-0.5 pl-3.5 text-[10.25px] leading-snug text-zinc-600 marker:text-emerald-500">
                          {r.missions.slice(0, missionsShown[idx] ?? 2).map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {otherExperiences.map((e) => (
                  <div key={e.company}>
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[11.25px] font-semibold text-zinc-900">
                        {e.role} <span className="font-normal text-zinc-500">· {e.company}, {e.location} · {e.type}</span>
                      </p>
                      <p className="shrink-0 text-[10.25px] text-zinc-500">{e.period}</p>
                    </div>
                    <p className="text-[10.25px] leading-snug text-zinc-600">{e.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>Formation</SectionTitle>
              <ul className="space-y-2">
                {education.map((ed) => (
                  <li key={ed.degree} className="flex items-baseline justify-between gap-2">
                    <p className="text-[11.25px] font-semibold text-zinc-900">
                      {ed.degree} <span className="font-normal text-zinc-500">· {ed.school}</span>
                    </p>
                    <p className="shrink-0 text-[10.25px] text-zinc-500">{ed.period}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionTitle>Projets sélectionnés</SectionTitle>
              <ul className="space-y-2">
                {cvProjects.map((p) => (
                  <li key={p.title}>
                    <p className="text-[11.25px] font-semibold text-zinc-900">
                      {p.title} <span className="font-normal text-emerald-700">· {p.stack}</span>
                    </p>
                    <p className="text-[10.25px] leading-snug text-zinc-600">{p.text}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionTitle>Certifications</SectionTitle>
              <p className="text-[10.25px] leading-relaxed text-zinc-600">
                {certifications.map((c) => `${c.label} (${c.issuer}, ${c.year})`).join(" · ")}
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
