"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section id="top" aria-label="Présentation" className="relative overflow-hidden px-6 pb-20 pt-20 md:pt-28">
      <div className="hero-aura" aria-hidden="true" />
      <div className="hero-aura-right" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: 0 }}
            className="mb-4 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300"
          >
            Portfolio 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="gradient-text">{profile.name}</span>
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
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
          className="rounded-3xl border border-indigo-100 bg-white/90 p-6 shadow-xl shadow-indigo-500/10 dark:border-indigo-950 dark:bg-zinc-900/70"
          aria-label="Points d'expertise"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">Focus</p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />
              Data + IA appliquées à des besoins métier concrets
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden="true" />
              Performance web et conversion (Core Web Vitals)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
              Exécution produit de l&apos;idée à la mise en prod
            </li>
          </ul>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            <span aria-label="Localisation">Base : Bordeaux</span>
            {profile.available && (
              <span className="ml-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
                Disponible
              </span>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
