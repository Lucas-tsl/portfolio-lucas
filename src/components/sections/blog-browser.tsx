"use client";

import { useMemo, useState } from "react";

type BlogItem = {
  slug: string;
  title: string;
  summary: string;
  category?: string;
  status?: string;
  tags?: string[];
  publishedAt?: string;
};

const filters = ["all", "wordpress", "ia", "seo"] as const;

export function BlogBrowser({ posts }: { posts: BlogItem[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");

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
      <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex-1 grid gap-2 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Recherche</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Chercher un article"
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
