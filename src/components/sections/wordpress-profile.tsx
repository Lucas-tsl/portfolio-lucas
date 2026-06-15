import { profile } from "@/data/portfolio-data";
import { ExternalLink } from "lucide-react";

export function WordpressProfile() {
  if (!profile.wordpress) return null;
  
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-14">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950/50">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-6 md:flex-row text-center md:text-left">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0073AA] text-white shrink-0">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 fill-current">
                <path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.05-.18 2.986-.51-.024-.037-.046-.078-.065-.123l-2.763-7.57zM3.008 12c0 3.56 2.07 6.634 5.068 8.092L3.788 8.34c-.496 1.11-.78 2.34-.78 3.66zm10.533-.708c.21-.4.36-.712.36-1.17 0-1.145-.586-1.578-.586-1.578-.344-.316-.27-.406-.208-.443.14-.083.504-.207 1.077-.207.568 0 .895.105 1.05.155.05.017.086.06.088.115l.006.182c.005.14.007.28.007.417 0 2.062-.898 3.992-1.8 5.766l-1.42 2.656c1.196-1.042 2.05-2.5 2.336-4.134.123-.695.187-1.41.187-2.146 0-3.328-1.805-6.22-4.44-7.66-.02.046-.046.09-.074.135-.357.577-.96 1.48-1.536 2.45-.63 1.062-1.303 2.327-1.896 3.613l2.84 5.86 1.942-5.4zM21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"/>
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
