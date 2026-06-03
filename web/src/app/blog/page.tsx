import { articleIdeas } from "@/data/portfolio-data";

export const metadata = {
  title: "Blog | Lucas Troteseil",
  description:
    "Espace blog pour partager retours d'experience, methodes de travail et bonnes pratiques web.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Journal technique
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        Articles et retours d'experience
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Un espace pour publier des articles de fond: plugin WordPress, SEO, IA,
        productivité, et idées utiles pour l'équipe ou les visiteurs du portfolio.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {articleIdeas.map((article) => (
          <article key={article.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{article.category}</p>
            <h2 className="mt-3 text-xl font-bold text-zinc-950 dark:text-zinc-50">{article.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{article.summary}</p>
            <span className="mt-5 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {article.status}
            </span>
          </article>
        ))}
      </div>
    </main>
  );
}
