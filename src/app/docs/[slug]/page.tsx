import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
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
    alternates: { canonical: `/docs/${slug}` },
  };
}

export default async function DocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const docsDirectory = path.join(process.cwd(), "content/docs");
  const document = readContentDocument(docsDirectory, slug);

  if (!document) notFound();

  const title = String(document.frontmatter.title || slug);
  const summary = String(document.frontmatter.summary || "");
  const relatedDocs = readContentDirectory(docsDirectory)
    .filter((d) => d.slug !== slug)
    .slice(0, 3);

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

      {relatedDocs.length > 0 && (
        <section className="mt-12" aria-labelledby="related-docs-heading">
          <h2
            id="related-docs-heading"
            className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
          >
            Autres documentations
          </h2>
          <ul className="space-y-3">
            {relatedDocs.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/docs/${d.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <span className="text-sm font-medium text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                    {String(d.frontmatter.title || d.slug)}
                  </span>
                  <ArrowRight size={14} className="shrink-0 text-zinc-400 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
