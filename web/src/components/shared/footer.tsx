import { profile } from "@/data/portfolio-data";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p>{new Date().getFullYear()} - {profile.name}</p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
