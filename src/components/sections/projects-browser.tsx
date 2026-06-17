"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, ExternalLink, Github, Search, X } from "lucide-react";
import { projects } from "@/data/portfolio-data";
import type { Project, ProjectStatus } from "@/types/portfolio.types";
import { TechIcon, hasTechIcon, getTechAbbrev } from "@/components/ui/tech-icon";

const STATUS_COLORS: Record<ProjectStatus, string> = {
  Actif:          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Disponible:     "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Déployé:        "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  "En production":"bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const ALL = "Tout";

/* ── Select filter ───────────────────────────────────────────────── */
function SelectFilter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-xs font-semibold text-zinc-400 dark:text-zinc-600">
        {label}
      </span>
      <div className="relative">
        <select
          aria-label={`Filtrer par ${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none cursor-pointer rounded-xl border border-zinc-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-zinc-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-emerald-600 dark:focus:ring-emerald-950"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown
          size={13}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/* ── Project card ────────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      aria-labelledby={`project-${project.id}`}
      className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <h2
          id={`project-${project.id}`}
          className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <Link
            href={`/projects/${project.id}`}
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {project.title}
          </Link>
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              STATUS_COLORS[project.status] ?? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {project.status}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-600">{project.year}</span>
        </div>
      </div>

      <p className="mt-1 text-xs font-medium text-zinc-500">{project.role}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>

      {project.highlights.length > 0 && (
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

      <div className="flex-1" />

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            title={tech}
            aria-label={tech}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
          >
            {hasTechIcon(tech) && <TechIcon name={tech} size={12} />}
            <span aria-hidden="true">{getTechAbbrev(tech)}</span>
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Code source de ${project.title} sur GitHub`}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <Github size={14} aria-hidden="true" />
            Repository
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Voir ${project.title} en ligne`}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Voir en ligne
          </a>
        )}
        <Link
          href={`/projects/${project.id}`}
          aria-label={`Voir les détails de ${project.title}`}
          className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          Détails
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

/* ── Main browser ────────────────────────────────────────────────── */
export function ProjectsBrowser() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [activeYear, setActiveYear] = useState<string>(ALL);
  const [activeStatus, setActiveStatus] = useState<string>(ALL);
  const [activeTech, setActiveTech] = useState<string>(ALL);

  const categories = useMemo(() => {
    const unique = [...new Set(projects.map((p) => p.category))].sort();
    return [ALL, ...unique];
  }, []);

  const years = useMemo(() => {
    const unique = [...new Set(projects.map((p) => p.year))].sort((a, b) => Number(b) - Number(a));
    return [ALL, ...unique];
  }, []);

  const statuses = useMemo(() => {
    const unique = [...new Set(projects.map((p) => p.status))];
    return [ALL, ...unique];
  }, []);

  // Technologies sorted by frequency (most used first)
  const techs = useMemo(() => {
    const freq = new Map<string, number>();
    projects.forEach((p) => p.technologies.forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1)));
    return [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.technologies.some((t) => t.toLowerCase().includes(q))) return false;
      if (activeCategory !== ALL && p.category !== activeCategory) return false;
      if (activeYear !== ALL && p.year !== activeYear) return false;
      if (activeStatus !== ALL && p.status !== activeStatus) return false;
      if (activeTech !== ALL && !p.technologies.includes(activeTech)) return false;
      return true;
    });
  }, [search, activeCategory, activeYear, activeStatus, activeTech]);

  const hasActiveFilters = search || activeCategory !== ALL || activeYear !== ALL || activeStatus !== ALL || activeTech !== ALL;

  function resetAll() {
    setSearch("");
    setActiveCategory(ALL);
    setActiveYear(ALL);
    setActiveStatus(ALL);
    setActiveTech(ALL);
  }

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Rechercher un projet, une techno…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-emerald-600 dark:focus:ring-emerald-950 placeholder:text-zinc-400"
          aria-label="Rechercher un projet"
        />
      </div>

      {/* Tech filter chips */}
      <div
        role="group"
        aria-label="Filtrer par technologie"
        className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <button
          onClick={() => setActiveTech(ALL)}
          aria-pressed={activeTech === ALL}
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
            activeTech === ALL
              ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
          }`}
        >
          Tout
        </button>
        {techs.map((tech) => {
          const active = activeTech === tech;
          return (
            <button
              key={tech}
              onClick={() => setActiveTech(active ? ALL : tech)}
              aria-pressed={active}
              aria-label={`Filtrer par ${tech}`}
              title={tech}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                active
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
              }`}
            >
              {hasTechIcon(tech) && <TechIcon name={tech} size={12} />}
              {getTechAbbrev(tech)}
            </button>
          );
        })}
      </div>

      {/* Filter row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
        <SelectFilter
          label="Catégorie"
          options={categories}
          value={activeCategory}
          onChange={setActiveCategory}
        />
        <SelectFilter
          label="Année"
          options={years}
          value={activeYear}
          onChange={setActiveYear}
        />
        <SelectFilter
          label="Statut"
          options={statuses}
          value={activeStatus}
          onChange={setActiveStatus}
        />
      </div>

      {/* Results header */}
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {filtered.length} projet{filtered.length > 1 ? "s" : ""}
          {hasActiveFilters ? " trouvé" + (filtered.length > 1 ? "s" : "") : ""}
        </p>
        {hasActiveFilters && (
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 underline underline-offset-2 transition hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            <X size={13} aria-hidden="true" />
            Réinitialiser
          </button>
        )}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-4 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-2 rounded-2xl border border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800"
            >
              <p className="text-sm text-zinc-400 dark:text-zinc-600">
                Aucun projet ne correspond à votre recherche.
              </p>
              <button
                onClick={resetAll}
                className="mt-3 text-xs font-medium text-zinc-600 underline underline-offset-2 dark:text-zinc-400"
              >
                Voir tous les projets
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
