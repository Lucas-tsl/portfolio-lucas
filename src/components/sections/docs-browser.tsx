"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

type DocSource = "local" | "notion";

type DocItem = {
  slug?: string;
  title: string;
  summary?: string;
  audience?: string;
  status?: string;
  category?: string;
  tags?: string[];
  source: DocSource;
  notionUrl?: string;
};

type ActiveFilter = "all" | "notion" | string;

const SOURCE_LABELS: Record<DocSource, string> = {
  local: "Documentation",
  notion: "Groupe NOVI",
};

export function DocsBrowser({ docs }: { docs: DocItem[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

  const categories = useMemo(() => {
    const unique = [...new Set(docs.filter((d) => d.source === "local" && d.category).map((d) => d.category!))];
    return unique.sort();
  }, [docs]);

  const filteredDocs = useMemo(() => {
    const q = query.toLowerCase();
    return docs.filter((doc) => {
      const matchesQuery =
        !q ||
        [doc.title, doc.summary ?? "", doc.audience ?? "", doc.category ?? "", ...(doc.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "notion" && doc.source === "notion") ||
        doc.category?.toLowerCase().includes(activeFilter);

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, docs, query]);

  const hasNotion = docs.some((d) => d.source === "notion");

  return (
    <div className="mt-10 space-y-6">
      {/* Search + filters */}
      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 lg:flex-row lg:items-start lg:justify-between">
        <label className="flex-1 grid gap-2 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Recherche</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Chercher une documentation"
            className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </label>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === "all"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              Tout
            </button>

            {hasNotion && (
              <button
                type="button"
                onClick={() => setActiveFilter("notion")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === "notion"
                    ? "bg-amber-500 text-white shadow-sm shadow-amber-500/20"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:hover:bg-amber-900/40"
                }`}
              >
                Groupe NOVI
              </button>
            )}

            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat.toLowerCase())}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === cat.toLowerCase()
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-500">
        {filteredDocs.length} document{filteredDocs.length > 1 ? "s" : ""}
        {activeFilter === "notion" ? " — Groupe NOVI" : ""}
      </p>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredDocs.map((doc) => {
          const isNotion = doc.source === "notion";

          if (isNotion && doc.notionUrl) {
            return (
              <a
                key={doc.notionUrl}
                href={doc.notionUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-3xl border border-amber-200 bg-amber-50/50 p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100 dark:border-amber-900/40 dark:bg-amber-950/10"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                    {SOURCE_LABELS.notion}
                  </p>
                  <ExternalLink size={14} className="shrink-0 text-amber-500 dark:text-amber-400" aria-hidden="true" />
                </div>
                <h2 className="mt-3 text-lg font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  {doc.title}
                </h2>
                <span className="mt-auto pt-5 inline-flex items-center text-sm font-semibold text-amber-700 dark:text-amber-400">
                  Ouvrir dans Notion
                  <span className="ml-2 transition group-hover:translate-x-1">→</span>
                </span>
              </a>
            );
          }

          return (
            <a
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="group flex flex-col rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{doc.category}</p>
              <h2 className="mt-3 text-xl font-bold text-zinc-950 dark:text-zinc-50">{doc.title}</h2>
              {doc.summary && (
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{doc.summary}</p>
              )}
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {doc.audience && (
                  <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">{doc.audience}</span>
                )}
                {doc.status && (
                  <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">{doc.status}</span>
                )}
              </div>
              <span className="mt-auto pt-6 inline-flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Lire la documentation
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </span>
            </a>
          );
        })}

        {filteredDocs.length === 0 && (
          <div className="col-span-3 rounded-2xl border border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
            <p className="text-sm text-zinc-400 dark:text-zinc-600">Aucune documentation ne correspond.</p>
            <button
              onClick={() => { setQuery(""); setActiveFilter("all"); }}
              className="mt-3 text-xs font-medium text-zinc-600 underline underline-offset-2 dark:text-zinc-400"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
