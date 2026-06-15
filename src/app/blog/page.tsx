import path from "node:path";
import { BlogBrowser } from "@/components/sections/blog-browser";
import { readContentDirectory } from "@/lib/content";

export const metadata = {
  title: "Blog | Lucas Troteseil",
  description:
    "Espace blog pour partager retours d'expérience, méthodes de travail et bonnes pratiques web.",
};

export default function BlogPage() {
  const blogDirectory = path.join(process.cwd(), "content/blog");
  const posts = readContentDirectory(blogDirectory).map((post) => ({
    slug: post.slug,
    title: String(post.frontmatter.title || post.slug),
    summary: String(post.frontmatter.summary || ""),
    category: String(post.frontmatter.category || ""),
    status: String(post.frontmatter.status || ""),
    tags: Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : [],
    publishedAt: String(post.frontmatter.publishedAt || ""),
  }));

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-300">
        Journal technique
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
        Articles et retours d&apos;experience
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Un espace pour publier des articles de fond: plugin WordPress, SEO, IA,
        productivité, et idées utiles pour l&apos;équipe ou les visiteurs du portfolio.
      </p>

      <BlogBrowser posts={posts} />
    </main>
  );
}
