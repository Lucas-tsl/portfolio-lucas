﻿import { profile } from "@/data/portfolio-data";
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
                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zM2.15 12c0 3.518 1.914 6.574 4.793 8.083l2.585-7.447c-.504-1.127-.79-2.383-.79-3.738 0-1.25.59-1.688.59-1.688.354-.325.27-.417.208-.456-.145-.084-.52-.21-.1.114-.21-.58 0-.913.106-1.07.16-.05.018-.088.062-.09.117l-.006.188c-.005.144-.007.288-.007.43 0 2.115.918 4.095 1.84 5.916L4.14 14.86c1.223-1.07 2.1-2.56 2.39-4.24.127-.714.192-1.447.192-2.202 0-3.414-1.85-6.38-4.55-7.857-.02.047-.047.092-.076.138-.366.592-.984 1.518-1.575 2.513C2.86 5.568 2.15 8.653 2.15 12zm19.7 0c0-5.1-3.923-9.288-8.918-9.673l3.52 9.673 2.106-5.845A9.697 9.697 0 0121.85 12zM12.446 14.244l2.912 6.012 1.99-5.54z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
