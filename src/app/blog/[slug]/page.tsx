import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { MarkdownReader } from "@/components/sections/markdown-reader";
import { BlogToc } from "@/components/blog/blog-toc";
import { BlogShare } from "@/components/blog/blog-share";
import { readContentDirectory, readContentDocument } from "@/lib/content";
import { extractToc, getReadingTime } from "@/lib/blog-utils";

const BASE_URL = "https://lucastroteseil.com";
const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function generateStaticParams() {
  return readContentDirectory(BLOG_DIR).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = readContentDocument(BLOG_DIR, slug);
  if (!post) return { title: "Article introuvable" };
  const title = String(post.frontmatter.title || slug);
  return {
    title: `${title} | Blog`,
    description: String(post.frontmatter.summary || "Article de blog"),
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = readContentDocument(BLOG_DIR, slug);
  if (!post) notFound();

  const title = String(post.frontmatter.title || slug);
  const summary = String(post.frontmatter.summary || "");
  const category = String(post.frontmatter.category || "");
  const publishedAt = String(post.frontmatter.publishedAt || "");
  const tags = Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags as string[] : [];

  const readingTime = getReadingTime(post.body);
  const toc = extractToc(post.body);
  const pageUrl = `${BASE_URL}/blog/${slug}`;

  const relatedPosts = readContentDirectory(BLOG_DIR)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: summary || undefined,
    url: pageUrl,
    datePublished: publishedAt || undefined,
    author: {
      "@type": "Person",
      name: "Lucas Troteseil",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Lucas Troteseil",
      url: BASE_URL,
    },
    inLanguage: "fr-FR",
    keywords: tags.join(", ") || undefined,
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <Breadcrumb items={[
          { label: "Accueil", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: title },
        ]} />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
          {category || "Blog"}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        {summary && (
          <p className="mt-4 text-lg leading-7 text-zinc-600 dark:text-zinc-400">{summary}</p>
        )}

        {/* Meta row */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            {formattedDate && <span>{formattedDate}</span>}
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {readingTime} min de lecture
            </span>
            {tags.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag size={14} aria-hidden="true" />
                {tags.slice(0, 3).join(", ")}
              </span>
            )}
          </div>
          <BlogShare title={title} url={pageUrl} />
        </div>
      </div>

      {/* Two-column layout: article + TOC */}
      <div className="mt-10 flex gap-12">
        <div className="min-w-0 flex-1">
          <MarkdownReader
            title=""
            body={post.body}
            metadata={[]}
            naked
          />
        </div>

        {/* Sticky TOC — only on xl+ */}
        {toc.length > 0 && (
          <aside className="w-56 shrink-0">
            <BlogToc entries={toc} />
          </aside>
        )}
      </div>

      {/* Bottom share */}
      <div className="mx-auto mt-12 flex max-w-3xl items-center justify-between border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">Tu as aimé cet article ?</p>
        <BlogShare title={title} url={pageUrl} />
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mx-auto mt-16 max-w-3xl" aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600"
          >
            Autres articles
          </h2>
          <ul className="space-y-3">
            {relatedPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                >
                  <span className="text-sm font-medium text-zinc-800 group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                    {String(p.frontmatter.title || p.slug)}
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
