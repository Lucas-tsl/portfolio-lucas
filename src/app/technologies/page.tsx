import { technologyItems, profile } from "@/data/portfolio-data";
import { TechnologyBrowser } from "@/components/sections/technology-browser";

export const metadata = {
  title: "Technologies | Lucas Troteseil",
  description:
    "Présentation des technologies utilisées sur le portfolio et dans les projets WordPress, SEO et fullstack.",
};

export default function TechnologiesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Stack et expertise
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        Technologies utilisées
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {profile.name} s&apos;appuie sur une stack orientée rapidité, clarté et maintenabilité :
        frontend moderne, backend léger, et outils de publication adaptés au contenu.
      </p>

      <TechnologyBrowser technologies={technologyItems} />
    </main>
  );
}
