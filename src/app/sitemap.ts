import type { MetadataRoute } from "next";
import path from "node:path";
import { readContentDirectory } from "@/lib/content";

const BASE_URL = "https://lucastroteseil.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/docs`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/technologies`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/politique-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/accessibilite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogDir = path.join(process.cwd(), "content/blog");
  const blogRoutes: MetadataRoute.Sitemap = readContentDirectory(blogDir).map((post) => {
    const dateStr = String(post.frontmatter.publishedAt || "");
    const lastModified = dateStr ? new Date(dateStr) : now;
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  const docsDir = path.join(process.cwd(), "content/docs");
  const docsRoutes: MetadataRoute.Sitemap = readContentDirectory(docsDir).map((doc) => ({
    url: `${BASE_URL}/docs/${doc.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...docsRoutes];
}
