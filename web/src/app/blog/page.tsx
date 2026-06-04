export const metadata = {
  title: "Blog | Lucas Troteseil",
  description: "Articles, réflexions et partages sur le développement et la data.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
        Blog
      </h1>
      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        Cette section est en cours de construction. Retrouvez bientôt mes articles ici !
      </p>
    </main>
  );
}