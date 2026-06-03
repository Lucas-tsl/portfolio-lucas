import { documentationItems } from "@/data/portfolio-data";

export const metadata = {
  title: "Documentations | Lucas Troteseil",
  description:
    "Espace de documentation pour les collaborateurs, avec guides, processus et ressources internes.",
};

export default function DocsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Espace documentaire
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        Documentations partagées
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Cet espace est pensé pour les collaborateurs de l'entreprise : processus,
        checklists, guides techniques et ressources utiles pour travailler plus vite
        et plus proprement.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documentationItems.map((item) => (
          <article key={item.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{item.category}</p>
            <h2 className="mt-3 text-xl font-bold text-zinc-950 dark:text-zinc-50">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">{item.audience}</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">{item.status}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
