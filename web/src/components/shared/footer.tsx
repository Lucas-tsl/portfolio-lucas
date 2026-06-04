﻿﻿﻿import { profile } from "@/data/portfolio-data";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200/50 bg-zinc-50/50 dark:border-zinc-800/50 dark:bg-zinc-950/50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-zinc-500 dark:text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p className="font-medium">© {new Date().getFullYear()} {profile.name}. Tous droits réservés.</p>
        <div className="flex items-center gap-5">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-all hover:-translate-y-1 hover:text-zinc-900 dark:hover:text-zinc-100">
            <Github className="h-5 w-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-all hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-500">
            <Linkedin className="h-5 w-5" />
          </a>
          {profile.wordpress && (
            <a href={profile.wordpress} target="_blank" rel="noreferrer" aria-label="WordPress" className="transition-all hover:-translate-y-1 hover:text-[#21759b] dark:hover:text-[#21759b]">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
                <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.18 2.986-.51-.024-.037-.046-.078-.065-.123l-2.763-7.57zM3.008 12c0 3.56 2.07 6.634 5.068 8.092L3.788 8.34c-.496 1.11-.78 2.34-.78 3.66zm10.533-.708c.21-.4.36-.712.36-1.17 0-1.145-.586-1.578-.586-1.578-.344-.316-.27-.406-.208-.443.14-.083.504-.207 1.077-.207.568 0 .895.105 1.05.155.05.017.086.06.088.115l.006.182c.005.14.007.28.007.417 0 2.062-.898 3.992-1.8 5.766l-1.42 2.656c1.196-1.042 2.05-2.5 2.336-4.134.123-.695.187-1.41.187-2.146 0-3.328-1.805-6.22-4.44-7.66-.02.046-.046.09-.074.135-.357.577-.96 1.48-1.536 2.45-.63 1.062-1.303 2.327-1.896 3.613l2.84 5.86 1.942-5.4zM21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
