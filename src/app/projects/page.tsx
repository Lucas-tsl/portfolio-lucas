import type { Metadata } from "next";
import { ProjectsBrowser } from "@/components/sections/projects-browser";
import { profile } from "@/data/portfolio-data";

export const metadata: Metadata = {
  title: `Projets — ${profile.name}`,
  description:
    "Découvrez mes réalisations : plugins WordPress, applications Next.js, outils Node.js et projets open-source. Filtrez par catégorie, année ou statut.",
  openGraph: {
    title: `Projets — ${profile.name}`,
    description:
      "Découvrez mes réalisations : plugins WordPress, applications Next.js, outils Node.js et projets open-source.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-6 py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
          Projets
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Réalisations open-source, projets client et explorations personnelles. Chaque projet répond
          à un besoin concret — performance, automatisation ou expérience utilisateur.
        </p>
      </header>
      <ProjectsBrowser />
    </main>
  );
}
