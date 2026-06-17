import { createOGPage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Projets — Lucas Troteseil";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOGPage({
    label: "Projets",
    title: "Réalisations\n& Case studies",
    subtitle: "Open-source, projets client et explorations personnelles. Next.js, WordPress, Python.",
  });
}
