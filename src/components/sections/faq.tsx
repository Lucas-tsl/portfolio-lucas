"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Tu es disponible pour de nouvelles missions ?",
    answer:
      "Oui, je suis actuellement disponible pour des missions freelance en développement web (Next.js, WordPress) et en pilotage de projets Data / IA. N'hésite pas à me contacter via le formulaire ci-dessous pour qu'on échange.",
  },
  {
    question: "Tu travailles en remote ou en présentiel ?",
    answer:
      "Je travaille principalement en remote depuis Bordeaux, ce qui me permet d'intervenir sur des projets partout en France. Des déplacements ponctuels sont possibles selon les besoins du projet.",
  },
  {
    question: "Quels types de projets acceptes-tu ?",
    answer:
      "Refonte de sites WordPress, développement d'applications web avec Next.js, intégration de pipelines de données, automatisation IA, ou encore conseil SEO technique. Je suis particulièrement à l'aise sur des projets qui mêlent développement et stratégie digitale.",
  },
  {
    question: "Comment se déroule une collaboration ?",
    answer:
      "On commence par un échange pour cerner le besoin, je propose une estimation et un cadrage. Ensuite on travaille en itérations courtes avec des points réguliers. Tu as accès à l'avancement en continu et on ajuste ensemble selon les retours.",
  },
  {
    question: "Tu proposes de la maintenance après livraison ?",
    answer:
      "Oui, je propose des contrats de maintenance pour les projets livrés : mises à jour, corrections, évolutions mineures et monitoring de performance. Les conditions sont définies selon le périmètre du projet.",
  },
  {
    question: "Quels sont tes délais habituels ?",
    answer:
      "Ça dépend de la complexité du projet. Un site WordPress sur-mesure se livre généralement en 3 à 6 semaines, une application Next.js en 4 à 10 semaines. Je fournis toujours une estimation détaillée avant de démarrer.",
  },
];

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
