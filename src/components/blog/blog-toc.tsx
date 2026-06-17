"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog-utils";

export function BlogToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (obs) => {
        const visible = obs.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    entries.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table des matières" className="sticky top-24 hidden xl:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        Sommaire
      </p>
      <ul className="space-y-1.5 border-l border-zinc-200 dark:border-zinc-800">
        {entries.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={[
                "block py-0.5 text-sm leading-snug transition-colors",
                level === 2 ? "pl-4" : "pl-7",
                activeId === id
                  ? "border-l-2 -ml-px border-emerald-500 font-medium text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
              ].join(" ")}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
