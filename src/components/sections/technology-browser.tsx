"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TechnologyItem } from "@/data/portfolio-data";
import { TechIcon, hasTechIcon, getTechAbbrev } from "@/components/ui/tech-icon";

const FILTER_OPTIONS = [
  { value: "all",       label: "Toutes les stacks" },
  { value: "nextjs",    label: "Next.js" },
  { value: "wordpress", label: "WordPress" },
  { value: "email",     label: "Email" },
  { value: "tailwind",  label: "Tailwind CSS" },
] as const;

type FilterValue = (typeof FILTER_OPTIONS)[number]["value"];

export function TechnologyBrowser({ technologies }: { technologies: TechnologyItem[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

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

        <div className="relative">
          <select
            aria-label="Filtrer par stack"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value as FilterValue)}
            className="appearance-none cursor-pointer rounded-xl border border-zinc-300 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-zinc-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:focus:border-sky-600 dark:focus:ring-sky-950"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredTechnologies.map((tech) => (
          <article key={tech.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{tech.category}</p>
            <h2 className="mt-3 text-xl font-bold text-zinc-950 dark:text-zinc-50">{tech.name}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{tech.description}</p>
            <div className="mt-4 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800">
              <p className="mb-2 text-xs font-semibold text-zinc-500">Focus</p>
              <div className="flex flex-wrap gap-2">
                {tech.focus.split(",").map((f) => {
                  const name = f.trim();
                  return (
                    <span
                      key={name}
                      title={name}
                      aria-label={name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                    >
                      {hasTechIcon(name) && <TechIcon name={name} size={12} />}
                      <span aria-hidden="true">{getTechAbbrev(name)}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
