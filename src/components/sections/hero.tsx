import { ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio-data";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-20 md:pt-28">
      <div className="hero-aura" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-amber-300 bg-amber-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-950 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
            Portfolio 2026
          </p>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-zinc-700 dark:text-zinc-300">{profile.title}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Me contacter
              <ArrowRight size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Voir mon GitHub
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900/70 dark:shadow-zinc-950/30">
          <p className="text-sm uppercase tracking-widest text-zinc-500">Focus</p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <li>• Data + IA appliquées à des besoins métier concrets</li>
            <li>• Performance web et conversion (Core Web Vitals)</li>
            <li>• Exécution produit de l&apos;idée à la mise en prod</li>
          </ul>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">Base: Bordeaux</p>
        </div>
      </div>
    </section>
  );
}
