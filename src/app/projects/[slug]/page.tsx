import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, Github, Tag } from "lucide-react";
import { projects } from "@/data/portfolio-data";
import type { ProjectStatus } from "@/types/portfolio.types";
import { TechIcon, hasTechIcon } from "@/components/ui/tech-icon";

const STATUS_COLORS: Record<ProjectStatus, string> = {
  Actif:           "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Disponible:      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Déployé:         "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  "En production": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Lucas Troteseil`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16" id="main-content">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100 mb-12"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Retour aux projets
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            <Tag size={11} aria-hidden="true" />
            {project.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              STATUS_COLORS[project.status] ?? "bg-zinc-100 text-zinc-700"
            }`}
          >
            {project.status}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-600">{project.year}</span>
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          {project.title}
        </h1>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{project.role}</p>
      </header>

      {/* Description */}
      <p className="mb-12 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <section className="mb-12" aria-labelledby="highlights-heading">
          <h2
            id="highlights-heading"
            className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
          >
            Points clés
          </h2>
          <ul className="space-y-4">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-400"
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Stack */}
      <section className="mb-12" aria-labelledby="stack-heading">
        <h2
          id="stack-heading"
          className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
        >
          Stack technique
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
            >
              {hasTechIcon(tech) && <TechIcon name={tech} size={14} />}
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 border-t border-zinc-100 pt-8 dark:border-zinc-800">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Code source de ${project.title} sur GitHub`}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <Github size={15} aria-hidden="true" />
            Code source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Voir ${project.title} en ligne`}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 dark:hover:bg-emerald-500"
          >
            <ExternalLink size={15} aria-hidden="true" />
            Voir en ligne
          </a>
        )}
      </div>
    </main>
  );
}
