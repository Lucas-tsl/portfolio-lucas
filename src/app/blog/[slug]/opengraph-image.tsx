import path from "node:path";
import { readContentDocument } from "@/lib/content";
import { createOGPage, OG_SIZE, OG_CONTENT_TYPE, OG_RUNTIME } from "@/lib/og-image";

export const runtime = OG_RUNTIME;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogDir = path.join(process.cwd(), "content/blog");
  const post = readContentDocument(blogDir, slug);

  const title = post ? String(post.frontmatter.title || slug) : slug;
  const description = post ? String(post.frontmatter.description || post.frontmatter.excerpt || "") : "";

  return createOGPage({
    label: "Blog",
    title,
    subtitle: description || undefined,
  });
}
