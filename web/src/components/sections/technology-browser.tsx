"use client";

import { useMemo, useState } from "react";
import type { SkillCategory } from "@/data/portfolio-data";

const filters = ["all", "nextjs", "wordpress", "email", "tailwind"] as const;

export function TechnologyBrowser({ technologies }: { technologies: SkillCategory[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");

  const filteredTechnologies = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return technologies.filter((tech) => {
      const matchesQuery =
        !normalizedQuery ||
        [tech.name, tech.description, tech.focus, tech.category, ...(tech.items || [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesFilter =
        activeFilter === "all" || 
        tech.category?.toLowerCase().includes(activeFilter) || 
        tech.items?.some((item) => item.toLowerCase().replace(/[^a-z0-9]/g, "").includes(activeFilter.replace(/[^a-z0-9]/g, "")));

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query, technologies]);

  return (
    <div className="mt-10 space-y-6">
      <div className="flex flex-col gap-5 rounded-3xl border border-zinc-200/60 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/60 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex-1 grid gap-2 text-sm">
          <span className="ml-1 font-semibold text-zinc-700 dark:text-zinc-300">Recherche</span>
          <div className="relative">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Chercher une technologie..."
              className="w-full rounded-2xl border border-zinc-200 bg-white/50 px-4 py-3 text-zinc-900 shadow-inner outline-none transition-all placeholder:text-zinc-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-100 dark:focus:border-amber-500 dark:focus:bg-zinc-900"
            />
          </div>
        </label>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all duration-300 ${
                activeFilter === filter
                  ? "scale-105 bg-gradient-to-r from-zinc-800 to-zinc-950 text-white shadow-md dark:from-zinc-200 dark:to-white dark:text-zinc-900"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredTechnologies.map((tech) => (
          <article key={tech.id} className="group relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300/80 hover:shadow-xl hover:shadow-zinc-200/40 dark:border-zinc-800/60 dark:bg-zinc-900/60 dark:hover:border-zinc-700/80 dark:hover:shadow-black/40">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-zinc-800/30"></div>
            <div className="relative z-10 flex h-full flex-col">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">{tech.category}</p>
                <h2 className="mt-3 text-xl font-extrabold text-zinc-900 transition-colors group-hover:text-amber-600 dark:text-zinc-50 dark:group-hover:text-amber-400">{tech.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{tech.description}</p>
              </div>
              <div className="mt-auto pt-6">
                <div className="rounded-2xl border border-zinc-200/50 bg-zinc-50/50 p-4 text-sm text-zinc-700 shadow-inner dark:border-zinc-800/50 dark:bg-zinc-800/50 dark:text-zinc-300">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">Focus: </span>
                  {tech.focus}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
