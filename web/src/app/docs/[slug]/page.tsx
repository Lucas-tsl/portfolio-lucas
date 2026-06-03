import path from "node:path";
import { notFound } from "next/navigation";
import { MarkdownReader } from "@/components/sections/markdown-reader";
import { readContentDirectory, readContentDocument } from "@/lib/content";

export function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), "content/docs");
  return readContentDirectory(docsDirectory).map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const docsDirectory = path.join(process.cwd(), "content/docs");
  const document = readContentDocument(docsDirectory, slug);

  if (!document) {
    return {
      title: "Documentation introuvable",
    };
  }

  return {
    title: `${String(document.frontmatter.title || slug)} | Documentations`,
    description: String(document.frontmatter.summary || "Documentation partagée"),
  };
}

export default async function DocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const docsDirectory = path.join(process.cwd(), "content/docs");
  const document = readContentDocument(docsDirectory, slug);

  if (!document) notFound();

  const title = String(document.frontmatter.title || slug);
  const summary = String(document.frontmatter.summary || "");

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Documentation
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">{title}</h1>
      <MarkdownReader
        title={title}
        summary={summary}
        body={document.body}
        metadata={[
          ["Audience", String(document.frontmatter.audience || "")],
          ["Status", String(document.frontmatter.status || "")],
          ["Categorie", String(document.frontmatter.category || "")],
          ["Tags", Array.isArray(document.frontmatter.tags) ? document.frontmatter.tags : undefined],
        ]}
      />
    </main>
  );
}
