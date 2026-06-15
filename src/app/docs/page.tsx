import path from "node:path";
import { DocsBrowser } from "@/components/sections/docs-browser";
import { readContentDirectory } from "@/lib/content";

export const metadata = {
  title: "Documentations | Lucas Troteseil",
  description:
    "Espace de documentation pour les collaborateurs, avec guides, processus et ressources internes.",
};

export default function DocsPage() {
  const docsDirectory = path.join(process.cwd(), "content/docs");
  const docs = readContentDirectory(docsDirectory).map((doc) => ({
    slug: doc.slug,
    title: String(doc.frontmatter.title || doc.slug),
    summary: String(doc.frontmatter.summary || ""),
    audience: String(doc.frontmatter.audience || ""),
    status: String(doc.frontmatter.status || ""),
    category: String(doc.frontmatter.category || ""),
    tags: Array.isArray(doc.frontmatter.tags) ? doc.frontmatter.tags : [],
  }));

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Espace documentaire
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        Documentations partagées
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Cet espace est pensé pour les collaborateurs de l&apos;entreprise : processus,
        checklists, guides techniques et ressources utiles pour travailler plus vite
        et plus proprement.
      </p>

      <DocsBrowser docs={docs} />
    </main>
  );
}
