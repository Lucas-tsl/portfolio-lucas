import { technologyItems, profile } from "@/data/portfolio-data";
import { TechnologyBrowser } from "@/components/sections/technology-browser";

export const metadata = {
  title: "Technologies | Lucas Troteseil",
  description:
    "Présentation des technologies utilisées sur le portfolio et dans les projets WordPress, SEO et fullstack.",
};

export default function TechnologiesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <p className="mb-4 inline-block rounded-full border border-amber-200/50 bg-amber-100/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 dark:border-amber-800/30 dark:bg-amber-900/20 dark:text-amber-400">
        Stack et expertise
      </p>
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
        Technologies utilisées
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {profile.name} s&apos;appuie sur une stack orientée rapidité, clarté et maintenabilité :
        frontend moderne, backend léger, et outils de publication adaptés au contenu.
      </p>

      <TechnologyBrowser technologies={technologyItems} />
    </main>
  );
}
