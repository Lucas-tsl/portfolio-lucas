"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { metrics } from "@/data/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as const;

function parseMetric(value: string) {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value };
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
}

function MetricCard({ m, i }: { m: { value: string; label: string; sublabel: string }; i: number }) {
  const { prefix, num, suffix } = parseMetric(m.value);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200 + i * 100;
          const startTime = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * num));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, i]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease, delay: i * 0.07 }}
      className="flex flex-col items-center gap-1 rounded-2xl border border-zinc-200 bg-white px-4 py-5 text-center dark:border-zinc-800 dark:bg-zinc-900"
    >
      <span
        className="text-2xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 sm:text-3xl"
        aria-label={m.value}
      >
        {prefix}{count}{suffix}
      </span>
      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{m.label}</span>
      <span className="text-xs text-zinc-400 dark:text-zinc-600">{m.sublabel}</span>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section aria-label="Chiffres clés" className="mx-auto w-full max-w-6xl px-6 py-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map((m, i) => (
          <MetricCard key={m.label} m={m} i={i} />
        ))}
      </div>
    </section>
  );
}
