import { projects } from "@/data/portfolio-data";
import { createOGPage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  return createOGPage({
    label: project?.category ?? "Projet",
    title: project?.title ?? slug,
    subtitle: project?.role ?? undefined,
  });
}
