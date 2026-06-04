﻿import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio-data";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 w-full px-4 md:px-6 pb-4 transition-all duration-300">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-zinc-200/60 bg-white/70 px-5 shadow-sm shadow-zinc-200/20 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/70 dark:shadow-black/50">
        <Link href="/" className="text-base font-bold tracking-tight text-zinc-950 transition-opacity hover:opacity-80 dark:text-white">
          Lucas Troteseil
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/about" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
            À propos
          </Link>
          <Link href="/#projects" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
            Projets
          </Link>
          <Link href="/technologies" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
            Technologies
          </Link>
          <Link href="/#contact" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}