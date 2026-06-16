"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio-data";
import { SkillsRadarChart } from "@/components/sections/skills-radar";
import { TechIcon, hasTechIcon } from "@/components/ui/tech-icon";

const CATEGORY_BORDER: Record<string, string> = {
  "Développement Web":              "border-l-indigo-500",
  "Bases de données":               "border-l-violet-500",
  "Data & Intelligence Artificielle": "border-l-amber-500",
  "SEO & Performance":              "border-l-emerald-500",
  "CMS & E-commerce":               "border-l-rose-500",
  "Gestion de projet":              "border-l-sky-500",
};

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

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 content-start">
          {skillGroups.map((group, idx) => (
            <motion.article
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: idx * 0.07 }}
              aria-labelledby={`skill-${group.id}`}
              className={`rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 border-l-4 ${CATEGORY_BORDER[group.category] ?? "border-l-zinc-300 dark:border-l-zinc-700"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {group.category}
                  </p>
                  <h3 id={`skill-${group.id}`} className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {group.name}
                  </h3>
                </div>
                <span className="shrink-0 font-mono text-xs font-bold text-zinc-400 dark:text-zinc-600">
                  {group.level}%
                </span>
              </div>

              {/* Level bar */}
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800" aria-hidden="true">
                <motion.div
                  className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${group.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: idx * 0.07 + 0.2 }}
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-500">{group.focus}</p>

              <div className="mt-3 flex flex-wrap gap-1.5" role="list" aria-label={`Technologies — ${group.name}`}>
                {group.items.slice(0, 6).map((item) => (
                  <span
                    key={item}
                    role="listitem"
                    title={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    {hasTechIcon(item) ? (
                      <TechIcon name={item} size={12} />
                    ) : null}
                    <span>{item}</span>
                  </span>
                ))}
                {group.items.length > 6 && (
                  <span className="rounded-full border border-dashed border-zinc-200 px-2.5 py-1 text-xs text-zinc-400 dark:border-zinc-700">
                    +{group.items.length - 6}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Radar chart — sticky on large screens */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SkillsRadarChart />
        </div>
      </div>
    </section>
  );
}
