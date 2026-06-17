import { createOGPage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
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
