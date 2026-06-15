"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section id="top" aria-label="Présentation" className="relative overflow-hidden px-6 pb-20 pt-20 md:pt-28">
      <div className="hero-aura" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: 0 }}
            className="mb-4 inline-flex rounded-full border border-amber-300 bg-amber-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-950 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200"
          >
            Portfolio 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl md:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="mt-3 text-xl font-medium text-zinc-700 dark:text-zinc-300"
          >
            {profile.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.22 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 dark:focus-visible:outline-zinc-100"
            >
              Me contacter
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Voir mon GitHub (nouvel onglet)"
              className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
            >
              Voir mon GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-xl shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900/70 dark:shadow-zinc-950/30"
          aria-label="Points d'expertise"
        >
          <p className="text-sm uppercase tracking-widest text-zinc-500">Focus</p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <li>• Data + IA appliquées à des besoins métier concrets</li>
            <li>• Performance web et conversion (Core Web Vitals)</li>
            <li>• Exécution produit de l&apos;idée à la mise en prod</li>
          </ul>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            <span aria-label="Localisation">Base : Bordeaux</span>
            {profile.available && (
              <span className="ml-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                Disponible
              </span>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
