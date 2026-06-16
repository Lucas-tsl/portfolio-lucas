"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/data/portfolio-data";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useCommandPalette } from "@/context/command-palette";
import { Menu, Search, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/projects", label: "Projets" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/technologies", label: "Technologies" },
  { href: "/#contact", label: "Contact" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { togglePalette } = useCommandPalette();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 rounded"
          aria-label={`${profile.name} — Retour à l'accueil`}
        >
          {profile.name}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 text-sm text-zinc-700 dark:text-zinc-300 md:flex" role="list">
          {navLinks.map((link) => {
            const active = isActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                role="listitem"
                aria-current={active ? "page" : undefined}
                className={`rounded px-1 py-0.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 ${
                  active
                    ? "font-semibold text-zinc-950 dark:text-white"
                    : "hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePalette}
            aria-label="Ouvrir la recherche (⌘K)"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600"
          >
            <Search size={13} aria-hidden="true" />
            <kbd className="font-mono text-[10px]">⌘K</kbd>
          </button>
          <ThemeToggle />
          <button
            className="md:hidden text-zinc-700 dark:text-zinc-300 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          role="navigation"
          aria-label="Menu mobile"
        >
          <div className="flex flex-col px-6 py-4 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            {navLinks.map((link) => {
              const active = isActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded px-2 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 ${
                    active
                      ? "font-semibold text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                      : "hover:text-zinc-950 hover:bg-zinc-50 dark:hover:text-white dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
