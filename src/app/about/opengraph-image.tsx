import { createOGPage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "À propos — Lucas Troteseil";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOGPage({
    label: "À propos",
    title: "Chef de projet\nData / IA",
    subtitle: "Développeur Web basé à Bordeaux. Next.js, WordPress, SEO technique et IA appliquée.",
  });
}
