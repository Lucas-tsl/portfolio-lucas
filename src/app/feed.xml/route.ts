import path from "node:path";
import { readContentDirectory } from "@/lib/content";

const BASE_URL = "https://lucastroteseil.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const posts = readContentDirectory(blogDir).sort((a, b) => {
    const da = new Date(String(a.frontmatter.publishedAt || "")).getTime();
    const db = new Date(String(b.frontmatter.publishedAt || "")).getTime();
    return db - da;
  });

  const items = posts
    .map((post) => {
      const title = escapeXml(String(post.frontmatter.title || post.slug));
      const summary = escapeXml(String(post.frontmatter.summary || ""));
      const pubDate = post.frontmatter.publishedAt
        ? new Date(String(post.frontmatter.publishedAt)).toUTCString()
        : new Date().toUTCString();
      const link = `${BASE_URL}/blog/${post.slug}`;
      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${summary}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — Lucas Troteseil</title>
    <link>${BASE_URL}/blog</link>
    <description>Articles sur le Web, Data et IA par Lucas Troteseil, développeur web à Bordeaux.</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
