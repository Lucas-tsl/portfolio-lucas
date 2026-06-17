import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <main
      className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center"
      id="main-content"
    >
      {/* Large 404 */}
      <p
        className="select-none bg-gradient-to-br from-emerald-500 to-teal-500 bg-clip-text text-[10rem] font-black leading-none tracking-tighter text-transparent sm:text-[14rem]"
        aria-hidden="true"
      >
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        Cette page n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil pour continuer votre navigation.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          <Home size={15} aria-hidden="true" />
          Accueil
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Voir les projets
        </Link>
      </div>
    </main>
  );
}
