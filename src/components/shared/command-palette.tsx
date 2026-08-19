"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FolderOpen, Home, Mail, Newspaper, Search, User, X } from "lucide-react";
import { projects } from "@/data/portfolio-data";
import { useCommandPalette } from "@/context/command-palette";
import { useState } from "react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  href: string;
  icon: React.ReactNode;
  group: string;
}

const NAV_COMMANDS: CommandItem[] = [
  { id: "home",     label: "Accueil",         href: "/",         icon: <Home size={15} />,      group: "Navigation" },
  { id: "about",    label: "À propos",         href: "/about",    icon: <User size={15} />,      group: "Navigation" },
  { id: "projects", label: "Projets",           href: "/projects", icon: <FolderOpen size={15} />, group: "Navigation" },
  { id: "blog",     label: "Blog",              href: "/blog",     icon: <Newspaper size={15} />, group: "Navigation" },
  { id: "contact",  label: "Contact",           href: "/#contact", icon: <Mail size={15} />,      group: "Navigation" },
];

const PROJECT_COMMANDS: CommandItem[] = projects.map((p) => ({
  id: `project-${p.id}`,
  label: p.title,
  description: p.role,
  href: `/projects/${p.id}`,
  icon: <FolderOpen size={15} />,
  group: "Projets",
}));

const BLOG_COMMANDS: CommandItem[] = [
  {
    id: "blog-ai-productivity-web",
    label: "ChatGPT et GitHub Copilot dans mon workflow",
    description: "IA / Productivité",
    href: "/blog/ai-productivity-web",
    icon: <Newspaper size={15} />,
    group: "Blog",
  },
  {
    id: "blog-core-web-vitals-guide",
    label: "Core Web Vitals e-commerce : 250 fiches produits",
    description: "SEO / Performance",
    href: "/blog/core-web-vitals-guide",
    icon: <Newspaper size={15} />,
    group: "Blog",
  },
  {
    id: "blog-product-video-story-bubble",
    label: "Plugin WooCommerce Stories — genèse et apprentissages",
    description: "WordPress / WooCommerce",
    href: "/blog/product-video-story-bubble",
    icon: <Newspaper size={15} />,
    group: "Blog",
  },
];

// Projects + Blog first, then navigation
const ALL_COMMANDS = [...PROJECT_COMMANDS, ...BLOG_COMMANDS, ...NAV_COMMANDS];
const DEFAULT_COMMANDS = [...PROJECT_COMMANDS, ...BLOG_COMMANDS, ...NAV_COMMANDS];

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-zinc-200 px-0.5 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function CommandPalette() {
  const { open, openPalette, closePalette } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const filtered = query
    ? ALL_COMMANDS.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase())
      )
    : DEFAULT_COMMANDS;

  // Preserve group order: Projets before Navigation
  const groups = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    (acc[item.group] ??= []).push(item);
    return acc;
  }, {});

  const execute = useCallback(
    (item: CommandItem) => {
      closePalette();
      setQuery("");
      if (item.href.startsWith("http")) {
        window.open(item.href, "_blank", "noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [closePalette, router]
  );

  // Global keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) { closePalette(); } else { openPalette(); }
        return;
      }
      if (!open) return;
      if (e.key === "Escape") { closePalette(); setQuery(""); }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && filtered[activeIdx]) execute(filtered[activeIdx]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, openPalette, closePalette, execute, filtered, activeIdx]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery("");
  }, [open]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    const el = listRef.current?.children[activeIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const closeAndReset = useCallback(() => { closePalette(); setQuery(""); }, [closePalette]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — desktop only (panel is full-screen on mobile) */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] hidden bg-black/40 backdrop-blur-sm sm:block"
            onClick={closeAndReset}
            aria-hidden="true"
          />

          {/* Panel — full-screen on mobile, modal on desktop */}
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Recherche"
            aria-modal="true"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex flex-col bg-white dark:bg-zinc-900 sm:inset-auto sm:left-1/2 sm:top-[14%] sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:overflow-hidden sm:rounded-xl sm:border sm:border-zinc-100 sm:shadow-2xl sm:dark:border-zinc-800"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3.5 dark:border-zinc-800">
              <Search size={16} className="shrink-0 text-zinc-400" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher un projet, une page…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                aria-autocomplete="list"
                aria-controls="command-list"
                aria-activedescendant={filtered[activeIdx] ? `cmd-${filtered[activeIdx].id}` : undefined}
              />
              {/* Close button — always on mobile, Échap hint on desktop */}
              <button
                onClick={closeAndReset}
                aria-label="Fermer la recherche"
                className="rounded-md p-1 text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200 sm:hidden"
              >
                <X size={16} aria-hidden="true" />
              </button>
              <kbd className="hidden rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 sm:block dark:border-zinc-700 dark:bg-zinc-800">
                Échap
              </kbd>
            </div>

            {/* Results */}
            {filtered.length > 0 ? (
              <ul
                ref={listRef}
                id="command-list"
                role="listbox"
                aria-label="Résultats"
                className="flex-1 overflow-y-auto py-2 sm:max-h-80"
              >
                {Object.entries(groups).map(([group, items]) => (
                  <li key={group}>
                    <p className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                      {group}
                    </p>
                    <ul>
                      {items.map((item) => {
                        const globalIdx = filtered.indexOf(item);
                        const isActive = globalIdx === activeIdx;
                        return (
                          <li
                            key={item.id}
                            id={`cmd-${item.id}`}
                            role="option"
                            aria-selected={isActive}
                            onMouseEnter={() => setActiveIdx(globalIdx)}
                            onClick={() => execute(item)}
                            className={`mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                              isActive
                                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                                : "text-zinc-700 dark:text-zinc-300"
                            }`}
                          >
                            <span className="shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden="true">
                              {item.icon}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-medium">
                                {highlight(item.label, query)}
                              </span>
                              {item.description && (
                                <span className="block truncate text-xs text-zinc-400 dark:text-zinc-500">
                                  {item.description}
                                </span>
                              )}
                            </span>
                            {isActive && (
                              <ArrowRight size={13} className="shrink-0 text-zinc-400" aria-hidden="true" />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex-1 py-10 text-center text-sm text-zinc-400 dark:text-zinc-600 sm:flex-none">
                Aucun résultat pour «&nbsp;{query}&nbsp;»
              </div>
            )}

            {/* Keyboard hints — desktop only */}
            <div className="hidden items-center gap-4 border-t border-zinc-100 px-4 py-2.5 sm:flex dark:border-zinc-800">
              {[["↑↓", "naviguer"], ["↵", "ouvrir"], ["Échap", "fermer"]].map(([key, label]) => (
                <span key={key} className="flex items-center gap-1 text-[10px] text-zinc-400">
                  <kbd className="rounded border border-zinc-200 bg-zinc-50 px-1 py-0.5 font-mono dark:border-zinc-700 dark:bg-zinc-800">
                    {key}
                  </kbd>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
