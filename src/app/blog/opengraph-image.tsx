import { createOGPage, OG_SIZE, OG_CONTENT_TYPE, OG_RUNTIME } from "@/lib/og-image";

export const runtime = OG_RUNTIME;
export const alt = "Blog — Lucas Troteseil";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOGPage({
    label: "Blog",
    title: "Web, Data & IA",
    subtitle: "Articles techniques sur Next.js, SEO, performance web et intelligence artificielle appliquée.",
  });
}
