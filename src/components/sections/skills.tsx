"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio-data";

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="mx-auto w-full max-w-6xl px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="skills-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
          Compétences
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
          Stack technique et domaines d&apos;expertise
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, idx) => (
          <motion.article
            key={group.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: idx * 0.07 }}
            aria-labelledby={`skill-${group.id}`}
            className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {group.category}
            </p>
            <h3 id={`skill-${group.id}`} className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {group.name}
            </h3>
            <p className="mt-1.5 text-xs leading-5 text-zinc-500 dark:text-zinc-500">{group.focus}</p>
            <div className="mt-3 flex flex-wrap gap-1.5" role="list" aria-label={`Technologies — ${group.name}`}>
              {group.items.map((item) => (
                <span
                  key={item}
                  role="listitem"
                  className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
