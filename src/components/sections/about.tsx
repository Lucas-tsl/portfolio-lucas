"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { WordpressProfile } from "./wordpress-profile";

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  return (
    <>
      <section id="about" aria-labelledby="about-heading" className="mx-auto w-full max-w-6xl px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease }}
        >
          <h2 id="about-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">
            À propos
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Chef de projet Data&nbsp;/&nbsp;IA en alternance chez Groupe NOVI à Bordeaux, où je travaille pour des marques comme{" "}
            {(["Les Senteurs Gourmandes", "Jozz Beauty", "Physiomins", "Pure Eden"] as const).map((name, i, arr) => {
              const urls: Record<string, string> = {
                "Les Senteurs Gourmandes": "https://www.lessenteursgourmandes.com",
                "Jozz Beauty":             "https://www.jozzbeauty.fr",
                "Physiomins":              "https://www.physiomins.fr",
                "Pure Eden":               "https://www.pure-eden.fr",
              };
              return (
                <span key={name}>
                  <a
                    href={urls[name]}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline decoration-dotted decoration-zinc-300 underline-offset-2 transition-colors hover:decoration-zinc-500 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
                  >
                    {name}
                  </a>
                  {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
                </span>
              );
            })}.{" "}
            SEO technique, Core Web Vitals, écosystème Google et intégration de LLMs dans les processus métier. En parallèle, je poursuis un Master Data&nbsp;&amp;&nbsp;IA à Nexa Digital School. Dehors&nbsp;: surf sur l&apos;Atlantique, escalade, et japonais en autodidacte.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <Link
              href="/about"
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Mon parcours complet
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
            >
              Projets
            </Link>
          </div>
        </motion.div>
      </section>
      <WordpressProfile />
    </>
  );
}
