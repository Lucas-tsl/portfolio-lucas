export const metadata = {
  title: "Documentation | Lucas Troteseil",
  description: "Documentation technique et ressources.",
};

export default function DocsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
        Documentation
      </h1>
      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        Retrouvez mes notes, snippets et check-lists techniques (SEO, Core Web Vitals, etc.). En cours de construction.
      </p>
    </main>
  );
}