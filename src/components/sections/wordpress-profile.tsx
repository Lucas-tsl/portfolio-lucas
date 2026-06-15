import { profile } from "@/data/portfolio-data";
import { ExternalLink } from "lucide-react";

export function WordpressProfile() {
  if (!profile.wordpress) return null;
  
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-14">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-6 md:flex-row text-center md:text-left">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0073AA] shrink-0">
              <svg viewBox="0 0 122.52 122.523" xmlns="http://www.w3.org/2000/svg" className="h-11 w-11" aria-hidden="true">
                <g fill="#fff">
                  <path d="M8.708 61.26c0 20.802 12.089 38.779 29.619 47.298L13.258 39.872a52.354 52.354 0 0 0-4.55 21.388z"/>
                  <path d="M96.74 58.608c0-6.495-2.333-10.993-4.334-14.494-2.664-4.329-5.161-7.995-5.161-12.324 0-4.831 3.664-9.328 8.825-9.328.233 0 .454.029.681.042-9.35-8.566-21.807-13.796-35.489-13.796-18.36 0-34.513 9.42-43.91 23.688 1.233.037 2.395.063 3.382.063 5.497 0 14.006-.667 14.006-.667 2.833-.166 3.167 3.994.337 4.329 0 0-2.847.335-6.015.501L48.2 93.547l11.501-34.493-8.188-22.434c-2.83-.166-5.511-.501-5.511-.501-2.832-.166-2.5-4.496.332-4.329 0 0 8.679.667 13.843.667 5.496 0 14.006-.667 14.006-.667 2.835-.166 3.168 3.994.337 4.329 0 0-2.853.335-6.015.501l18.992 56.494 5.242-17.517c2.272-7.269 4.001-12.49 4.001-16.989z"/>
                  <path d="M62.184 65.857l-15.768 45.819a52.628 52.628 0 0 0 14.846 2.142 52.5 52.5 0 0 0 17.247-2.902 4.685 4.685 0 0 1-.364-.706z"/>
                  <path d="M107.376 36.046a41.67 41.67 0 0 1 .38 5.163c0 5.096-.954 10.827-3.832 17.988l-15.386 44.501c14.984-8.729 25.076-24.902 25.076-43.437a52.547 52.547 0 0 0-6.238-24.215z"/>
                </g>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Profil WordPress.org</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Contributeur actif de l'écosystème open-source.</p>
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                 <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">Plugin Developer</span>
                 <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">Theme Developer</span>
              </div>
            </div>
          </div>
          <a href={profile.wordpress} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-[#0073AA] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#005177] shrink-0">
            Voir le profil <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
