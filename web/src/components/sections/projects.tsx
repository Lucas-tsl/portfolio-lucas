"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio-data";

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-14">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">Projets phares</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="group rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold">Role:</span> {project.role}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
