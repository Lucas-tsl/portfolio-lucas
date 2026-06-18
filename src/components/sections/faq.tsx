"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faq-data";
import type { FaqItem } from "@/data/faq-data";

export type { FaqItem };

function FaqEntry({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${index}`;

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium text-zinc-900 transition hover:text-emerald-700 dark:text-zinc-100 dark:hover:text-emerald-400"
      >
        {item.question}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={id}
        role="region"
        aria-label={item.question}
        className={`overflow-hidden text-sm leading-7 text-zinc-600 transition-all duration-200 dark:text-zinc-400 ${
          open ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {item.answer}
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-3xl px-6 py-20"
    >
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
        FAQ
      </p>
      <h2
        id="faq-heading"
        className="mt-3 text-center text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl"
      >
        Questions fréquentes
      </h2>
      <p className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Tout ce que tu veux savoir avant de me contacter.
      </p>

      <div className="mt-10">
        {FAQ_ITEMS.map((item, i) => (
          <FaqEntry key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
