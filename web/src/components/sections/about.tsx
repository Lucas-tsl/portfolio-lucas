import Link from "next/link";
import { profile } from "@/data/portfolio-data";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-14">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-3xl">A propos</h2>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{profile.about}</p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/docs" className="rounded-full border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
          Lire les documentations
        </Link>
        <Link href="/blog" className="rounded-full border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
          Parcourir le blog
        </Link>
        <Link href="/technologies" className="rounded-full border border-zinc-300 px-4 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
          Voir les technologies
        </Link>
      </div>
    </section>
  );
}
