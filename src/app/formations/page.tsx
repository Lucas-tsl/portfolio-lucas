import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, ChevronDown, Clock, LayoutTemplate, Search, Sparkles, Users } from "lucide-react";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  FORMATIONS,
  FORMATION_FAQ,
  FORMATION_FORMATS,
  FORMATION_STEPS,
  type Formation,
} from "@/data/formations-data";
import { BASE_URL } from "@/lib/site";

// Page 100 % statique et sans JavaScript : <details> natifs pour le programme et la FAQ

const DESCRIPTION =
  "Formations WordPress & WooCommerce, SEO et IA appliquée pour indépendants, TPE et PME. À distance ou en présentiel à Bordeaux, programme adapté, sur devis.";

export const metadata: Metadata = {
  title: "Formations",
  description: DESCRIPTION,
  alternates: { canonical: "/formations" },
  openGraph: {
    title: "Formations — Lucas Troteseil",
    description: DESCRIPTION,
    url: `${BASE_URL}/formations`,
  },
};

const ICONS: Record<string, typeof Search> = {
  "wordpress-woocommerce": LayoutTemplate,
  "seo-performance": Search,
  "ia-appliquee": Sparkles,
};

function quoteHref(formation?: Formation) {
  const params = new URLSearchParams({ sujet: "formation" });
  if (formation) params.set("formation", formation.id);
  return `/?${params.toString()}#contact`;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: FORMATIONS.map((f, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: f.title,
      description: f.tagline,
      url: `${BASE_URL}/formations#${f.id}`,
      inLanguage: "fr",
      provider: { "@type": "Person", name: "Lucas Troteseil", url: BASE_URL },
    },
  })),
};

function FormationCard({ formation }: { formation: Formation }) {
  const Icon = ICONS[formation.id] ?? Sparkles;
  return (
    <article
      id={formation.id}
      aria-labelledby={`${formation.id}-title`}
      className="flex scroll-mt-24 flex-col rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
        <Icon size={22} aria-hidden="true" />
      </div>
      <h2
        id={`${formation.id}-title`}
        className="mt-4 text-lg font-bold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100"
      >
        {formation.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{formation.tagline}</p>

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="shrink-0">
            <Clock size={16} className="mt-0.5 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
            <span className="sr-only">Durée</span>
          </dt>
          <dd className="text-zinc-700 dark:text-zinc-300">{formation.duration}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0">
            <Users size={16} className="mt-0.5 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
            <span className="sr-only">Public</span>
          </dt>
          <dd className="text-zinc-700 dark:text-zinc-300">{formation.audience}</dd>
        </div>
      </dl>

      <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
        Objectifs
      </h3>
      <ul className="mt-3 space-y-2 text-sm">
        {formation.objectives.map((objective) => (
          <li key={objective} className="flex gap-2 text-zinc-700 dark:text-zinc-300">
            <Check size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            {objective}
          </li>
        ))}
      </ul>

      <details className="group mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-zinc-900 transition hover:text-emerald-700 dark:text-zinc-100 dark:hover:text-emerald-400 [&::-webkit-details-marker]:hidden">
          Voir le programme
          <ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-4 border-t border-zinc-200 px-4 py-4 dark:border-zinc-800">
          {formation.modules.map((module, i) => (
            <div key={module.title}>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {i + 1}. {module.title}
              </p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                {module.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-medium">Prérequis :</span> {formation.prerequisites}
          </p>
        </div>
      </details>

      <div className="mt-auto pt-6">
        <Link
          href={quoteHref(formation)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Demander un devis
          <span className="sr-only"> pour la formation {formation.title}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function FormationsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-6 py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Formations" }]} />

      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
          Formations
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
          Des formations concrètes pour gagner en autonomie sur le web et l&apos;IA
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Pour les indépendants, TPE et PME qui veulent maîtriser leur site, leur visibilité sur Google et les
          outils d&apos;IA, sans jargon. Des sessions pratiques, adaptées à votre activité, à distance ou en
          présentiel à Bordeaux.
        </p>
      </header>

      <section aria-label="Catalogue des formations" className="mt-12 grid gap-6 lg:grid-cols-3">
        {FORMATIONS.map((formation) => (
          <FormationCard key={formation.id} formation={formation} />
        ))}
      </section>

      <section aria-labelledby="formats-heading" className="mt-20">
        <h2 id="formats-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Des formats qui s&apos;adaptent à vous
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {FORMATION_FORMATS.map((format) => (
            <div
              key={format.title}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{format.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{format.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="mt-20">
        <h2 id="steps-heading" className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Comment ça se passe
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FORMATION_STEPS.map((step, i) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white"
              >
                {i + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="formations-faq-heading" className="mt-20 max-w-3xl">
        <h2
          id="formations-faq-heading"
          className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          Questions fréquentes
        </h2>
        <div className="mt-4">
          {FORMATION_FAQ.map((item) => (
            <details key={item.question} className="group border-b border-zinc-200 dark:border-zinc-800">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-medium text-zinc-900 transition hover:text-emerald-700 dark:text-zinc-100 dark:hover:text-emerald-400 [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  size={16}
                  className="shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl bg-zinc-950 px-6 py-12 text-center dark:bg-zinc-900 sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight text-white">Un projet de formation ?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-300">
          Décrivez votre besoin en quelques lignes : je vous réponds avec une proposition de programme et un devis.
        </p>
        <Link
          href={quoteHref()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          Me contacter
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
