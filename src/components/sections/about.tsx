"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { profile } from "@/data/portfolio-data";
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
            {profile.about}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <Link
              href="/about"
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Mon parcours complet
            </Link>
            <Link
              href="/docs"
              className="rounded-full border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
            >
              Documentations
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
            >
              Blog
            </Link>
            <Link
              href="/technologies"
              className="rounded-full border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
            >
              Technologies
            </Link>
          </div>
        </motion.div>
      </section>
      <WordpressProfile />
    </>
  );
}
