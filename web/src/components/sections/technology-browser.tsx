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
      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex-1 grid gap-2 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Recherche</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Chercher une technologie"
            className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredTechnologies.map((tech) => (
          <article key={tech.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{tech.category}</p>
            <h2 className="mt-3 text-xl font-bold text-zinc-950 dark:text-zinc-50">{tech.name}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{tech.description}</p>
            <div className="mt-5 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <span className="font-semibold">Focus: </span>
              {tech.focus}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
