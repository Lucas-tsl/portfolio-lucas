"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/portfolio-data";

const statusColors: Record<string, string> = {
  Actif: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Disponible: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Déployé: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  "En production": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto w-full max-w-6xl px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="projects-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
          Projets phares
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
          Réalisations open-source et projets internes marquants
        </p>
      </motion.div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
            aria-labelledby={`project-${project.id}`}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <h3 id={`project-${project.id}`} className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {project.title}
              </h3>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusColors[project.status] ??
                    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600">{project.year}</span>
              </div>
            </div>

            {/* Role */}
            <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-500">{project.role}</p>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-4 space-y-1.5" aria-label="Points clés">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2
                      size={14}
                      className="mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Technologies */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-4 flex flex-wrap gap-3">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Voir le code source de ${project.title} sur GitHub`}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Github size={14} aria-hidden="true" />
                  Repository
                </a>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Voir ${project.title} en ligne`}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Démo
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
