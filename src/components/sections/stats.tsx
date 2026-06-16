"use client";

import { motion } from "framer-motion";
import { metrics } from "@/data/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

export function StatsSection() {
  return (
    <section aria-label="Chiffres clés" className="mx-auto w-full max-w-6xl px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease }}
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease, delay: i * 0.07 }}
            className="flex flex-col items-center gap-1 rounded-2xl border border-zinc-200 bg-white px-4 py-5 text-center dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="text-2xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 sm:text-3xl">
              {m.value}
            </span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {m.label}
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-600">
              {m.sublabel}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
