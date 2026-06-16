"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ExternalLink, Github, Search, X } from "lucide-react";
import { projects } from "@/data/portfolio-data";
import type { Project, ProjectStatus } from "@/types/portfolio.types";
import { TechIcon, hasTechIcon, getTechAbbrev } from "@/components/ui/tech-icon";

const STATUS_COLORS: Record<ProjectStatus, string> = {
  Actif:          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Disponible:     "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  Déployé:        "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  "En production":"bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const ALL = "Tout";

/* ── Filter pill ─────────────────────────────────────────────────── */
function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? "bg-sky-600 text-white shadow-sm shadow-sky-500/20 dark:bg-sky-600"
          : "border border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ── Filter group ────────────────────────────────────────────────── */
function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-xs font-semibold text-zinc-400 dark:text-zinc-600">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Filtrer par ${label}`}>
        {options.map((opt) => (
          <Pill
            key={opt}
            label={opt}
            active={active === opt}
            onClick={() => onSelect(opt)}
          />
        ))}
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
          {project.title}
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

      <div className="mt-4 flex flex-wrap gap-3">
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
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Voir en ligne
          </a>
        )}
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

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.technologies.some((t) => t.toLowerCase().includes(q))) return false;
      if (activeCategory !== ALL && p.category !== activeCategory) return false;
      if (activeYear !== ALL && p.year !== activeYear) return false;
      if (activeStatus !== ALL && p.status !== activeStatus) return false;
      return true;
    });
  }, [search, activeCategory, activeYear, activeStatus]);

  const hasActiveFilters = search || activeCategory !== ALL || activeYear !== ALL || activeStatus !== ALL;

  function resetAll() {
    setSearch("");
    setActiveCategory(ALL);
    setActiveYear(ALL);
    setActiveStatus(ALL);
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
          className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-sky-600 dark:focus:ring-sky-950 placeholder:text-zinc-400"
          aria-label="Rechercher un projet"
        />
      </div>

      {/* Filter rows */}
      <div className="mt-5 space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
        <FilterRow
          label="Catégorie"
          options={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
        <FilterRow
          label="Année"
          options={years}
          active={activeYear}
          onSelect={setActiveYear}
        />
        <FilterRow
          label="Statut"
          options={statuses}
          active={activeStatus}
          onSelect={setActiveStatus}
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
