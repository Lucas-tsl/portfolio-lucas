import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio-data";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
          Lucas Troteseil
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/technologies" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition">
            Technologies
          </Link>
          <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </header>
  );
}