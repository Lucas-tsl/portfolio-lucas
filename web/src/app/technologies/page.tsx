import { technologyItems, profile } from "@/data/portfolio-data";

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
        {profile.name} s'appuie sur une stack orientée rapidité, clarté et maintenabilité :
        frontend moderne, backend léger, et outils de publication adaptés au contenu.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {technologyItems.map((tech) => (
          <article key={tech.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{tech.category}</p>
            <h2 className="mt-3 text-xl font-bold text-zinc-950 dark:text-zinc-50">{tech.name}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{tech.description}</p>
            <div className="mt-5 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <span className="font-semibold">Focus: </span>
              {tech.focus}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
