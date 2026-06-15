import path from "node:path";
import { notFound } from "next/navigation";
import { MarkdownReader } from "@/components/sections/markdown-reader";
import { readContentDirectory, readContentDocument } from "@/lib/content";

export function generateStaticParams() {
  const blogDirectory = path.join(process.cwd(), "content/blog");
  return readContentDirectory(blogDirectory).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogDirectory = path.join(process.cwd(), "content/blog");
  const post = readContentDocument(blogDirectory, slug);

  if (!post) {
    return {
      title: "Article introuvable",
    };
  }

  return {
    title: `${String(post.frontmatter.title || slug)} | Blog`,
    description: String(post.frontmatter.summary || "Article de blog"),
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogDirectory = path.join(process.cwd(), "content/blog");
  const post = readContentDocument(blogDirectory, slug);

  if (!post) notFound();

  const title = String(post.frontmatter.title || slug);
  const summary = String(post.frontmatter.summary || "");

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Blog
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">{title}</h1>
      <MarkdownReader
        title={title}
        summary={summary}
        body={post.body}
        metadata={[
          ["Categorie", String(post.frontmatter.category || "")],
          ["Status", String(post.frontmatter.status || "")],
          ["Publication", String(post.frontmatter.publishedAt || "")],
          ["Tags", Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : undefined],
        ]}
      />
    </main>
  );
}
