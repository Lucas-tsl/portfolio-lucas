import Link from "next/link";
import { profile } from "@/data/portfolio-data";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {profile.name}
        </Link>
        <div className="hidden items-center gap-5 text-sm text-zinc-700 dark:text-zinc-300 md:flex">
          <Link href="/about" className="hover:text-zinc-950 dark:hover:text-white">À propos</Link>
          <Link href="/#projects" className="hover:text-zinc-950 dark:hover:text-white">Projets</Link>
          <Link href="/docs" className="hover:text-zinc-950 dark:hover:text-white">Docs</Link>
          <Link href="/blog" className="hover:text-zinc-950 dark:hover:text-white">Blog</Link>
          <Link href="/technologies" className="hover:text-zinc-950 dark:hover:text-white">Technologies</Link>
          <Link href="/#contact" className="hover:text-zinc-950 dark:hover:text-white">Contact</Link>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
