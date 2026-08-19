import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Lightbulb,
  Tag,
  TrendingUp,
} from "lucide-react";
import { projects } from "@/data/portfolio-data";
import type { Project, ProjectStatus } from "@/types/portfolio.types";
import { TechIcon, hasTechIcon } from "@/components/ui/tech-icon";
import { Breadcrumb } from "@/components/shared/breadcrumb";

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
    alternates: { canonical: `/projects/${slug}` },
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
  const idx = projects.findIndex((p) => p.id === slug);
  if (idx === -1) notFound();

  const project = projects[idx] as Project;
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;
  const otherProjects = projects.filter((_, i) => i !== idx).slice(0, 3);
  const hasVariants = Boolean(project.variants && project.variants.length > 0);

  const BASE_URL = "https://lucastroteseil.com";
  const softwareAppLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.liveUrl || `${BASE_URL}/projects/${slug}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Lucas Troteseil",
      url: BASE_URL,
    },
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-16" id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }}
      />
      <Breadcrumb items={[
        { label: "Accueil", href: "/" },
        { label: "Projets", href: "/projects" },
        { label: project.title },
      ]} />

      {/* Header */}
      <header className="mb-12">
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

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          {project.title}
        </h1>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{project.role}</p>

        <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
      </header>

      {/* Challenge */}
      {project.challenge && (
        <section className="mb-12" aria-labelledby="challenge-heading">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
            <h2
              id="challenge-heading"
              className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
            >
              <Lightbulb size={13} aria-hidden="true" />
              Le défi
            </h2>
            <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{project.challenge}</p>
          </div>
        </section>
      )}

      {/* Timeline */}
      {project.timeline && project.timeline.length > 0 && (
        <section className="mb-12" aria-labelledby="timeline-heading">
          <h2
            id="timeline-heading"
            className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
          >
            Déroulé du projet
          </h2>
          <ol className="relative border-l border-zinc-200 dark:border-zinc-800 space-y-0">
            {project.timeline.map((phase, i) => (
              <li key={i} className="mb-8 ml-6 last:mb-0">
                <span className="absolute -left-[9px] flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-950 dark:bg-emerald-600" aria-hidden="true" />
                <time className="mb-1 block text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {phase.date}
                </time>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{phase.label}</p>
                {phase.description && (
                  <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{phase.description}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

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

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="mb-12" aria-labelledby="gallery-heading">
          <h2
            id="gallery-heading"
            className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
          >
            Captures d&apos;écran
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.images.map((img, i) => (
              <figure key={i} className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={500}
                  className="w-full object-cover"
                />
                {img.caption && (
                  <figcaption className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-500">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Result */}
      {project.result && (
        <section className="mb-12" aria-labelledby="result-heading">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-900/10">
            <h2
              id="result-heading"
              className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-500"
            >
              <TrendingUp size={13} aria-hidden="true" />
              Résultat
            </h2>
            <p className="text-sm leading-6 text-emerald-900 dark:text-emerald-200">{project.result}</p>
          </div>
        </section>
      )}

      {/* Actions — mobile only (desktop has floating bar) */}
      {hasVariants ? (
        <div className="md:hidden flex flex-col gap-5 border-t border-zinc-100 pt-8 dark:border-zinc-800 mb-16">
          {project.variants!.map((variant) => (
            <div key={variant.label} className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                <TechIcon name={variant.label} size={13} />
                {variant.label}
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={variant.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Code source de la version ${variant.label} de ${project.title} sur GitHub`}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Github size={15} aria-hidden="true" />
                  Code source
                </a>
                {variant.liveUrl && (
                  <a
                    href={variant.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Voir la version ${variant.label} de ${project.title} en ligne`}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 dark:hover:bg-emerald-500"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    Voir en ligne
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        (project.githubUrl || project.liveUrl) && (
          <div className="md:hidden flex flex-wrap gap-3 border-t border-zinc-100 pt-8 dark:border-zinc-800 mb-16">
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
        )
      )}

      {/* Floating action bar — desktop only */}
      {hasVariants ? (
        <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-2">
          {project.variants!.map((variant) => (
            <div key={variant.label} className="flex flex-row items-center gap-2">
              <span
                title={variant.label}
                aria-label={variant.label}
                className="inline-flex items-center rounded-full bg-white/90 p-1.5 shadow backdrop-blur dark:bg-zinc-900/90"
              >
                <TechIcon name={variant.label} size={14} />
              </span>
              {variant.liveUrl && (
                <a
                  href={variant.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Voir la version ${variant.label} de ${project.title} en ligne`}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-xl dark:hover:bg-emerald-500"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Voir en ligne
                </a>
              )}
              <a
                href={variant.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Code source de la version ${variant.label} de ${project.title} sur GitHub`}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-lg backdrop-blur transition hover:bg-zinc-50 hover:-translate-y-0.5 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <Github size={14} aria-hidden="true" />
                Code source
              </a>
            </div>
          ))}
        </div>
      ) : (
        (project.githubUrl || project.liveUrl) && (
          <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-row gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Voir ${project.title} en ligne`}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-xl dark:hover:bg-emerald-500"
              >
                <ExternalLink size={14} aria-hidden="true" />
                Voir en ligne
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Code source de ${project.title} sur GitHub`}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-lg backdrop-blur transition hover:bg-zinc-50 hover:-translate-y-0.5 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <Github size={14} aria-hidden="true" />
                Code source
              </a>
            )}
          </div>
        )
      )}

      {/* Prev / Next */}
      {(prev || next) && (
        <nav
          aria-label="Navigation entre projets"
          className="grid grid-cols-2 gap-4 border-t border-zinc-100 pt-8 dark:border-zinc-800"
        >
          <div>
            {prev && (
              <Link
                href={`/projects/${prev.id}`}
                className="group flex flex-col gap-1 rounded-2xl border border-zinc-200 p-4 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600">
                  <ArrowLeft size={12} aria-hidden="true" />
                  Précédent
                </span>
                <span className="text-sm font-semibold text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="flex justify-end">
            {next && (
              <Link
                href={`/projects/${next.id}`}
                className="group flex w-full flex-col items-end gap-1 rounded-2xl border border-zinc-200 p-4 text-right transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600">
                  Suivant
                  <ArrowRight size={12} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white line-clamp-2">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <section className="mt-16 border-t border-zinc-100 pt-10 dark:border-zinc-800" aria-labelledby="other-projects-heading">
          <h2
            id="other-projects-heading"
            className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
          >
            Autres projets
          </h2>
          <ul className="space-y-3">
            {otherProjects.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/projects/${p.id}`}
                  className="group flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <div>
                    <span className="text-sm font-medium text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                      {p.title}
                    </span>
                    <span className="ml-3 text-xs text-zinc-400 dark:text-zinc-600">{p.category}</span>
                  </div>
                  <ArrowRight size={14} className="shrink-0 text-zinc-400 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
