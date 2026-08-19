"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

type BlogItem = {
  slug: string;
  title: string;
  summary: string;
  category?: string;
  status?: string;
  tags?: string[];
  publishedAt?: string;
};

export function BlogBrowser({ posts }: { posts: BlogItem[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = useMemo(() => {
    // Grande catégorie = premier segment avant " / " (ex. "IA / SEO" → "IA"),
    // dérivée des articles plutôt qu'une liste figée qui oublie les nouveaux sujets.
    const topics = new Set<string>();
    for (const post of posts) {
      if (!post.category) continue;
      topics.add(post.category.split(" / ")[0].trim());
    }
    return [
      { value: "all", label: "Tous les articles" },
      ...[...topics].sort().map((topic) => ({ value: topic.toLowerCase(), label: topic })),
    ];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        !normalizedQuery ||
        [post.title, post.summary, post.category, ...(post.tags || [])].filter(Boolean).join(" ").toLowerCase().includes(normalizedQuery);

      const matchesFilter =
        activeFilter === "all" || post.category?.toLowerCase().includes(activeFilter) || post.tags?.includes(activeFilter);

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, posts, query]);

  return (
    <div className="mt-10 space-y-6">
      <div className="flex items-center gap-3 rounded-3xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Chercher un article…"
          aria-label="Rechercher un article"
          className="min-w-0 flex-1 rounded-2xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-emerald-600"
        />
        <div className="relative shrink-0">
          <select
            aria-label="Filtrer par catégorie"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="appearance-none cursor-pointer rounded-xl border border-zinc-300 bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-zinc-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:focus:border-emerald-600"
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{post.category}</p>
            <h2 className="mt-3 text-xl font-bold text-zinc-950 dark:text-zinc-50">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{post.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">{post.status}</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">{post.publishedAt}</span>
            </div>
            <span className="mt-6 inline-flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Lire l&apos;article
              <span className="ml-2 transition group-hover:translate-x-1">→</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
