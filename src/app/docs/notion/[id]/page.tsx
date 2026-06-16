import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { fetchNotionDocs } from "@/lib/notion";
import { renderNotionBlocks } from "@/lib/notion-renderer";

const SPLITBEE_API = "https://notion-api.splitbee.io/v1/page";
const NOTION_BASE_URL = "https://few-volleyball-409.notion.site";

export async function generateStaticParams() {
  const docs = await fetchNotionDocs();
  return docs.map((doc) => ({ id: doc.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const res = await fetch(`${SPLITBEE_API}/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { title: "Documentation | Lucas Troteseil" };
    const data = await res.json() as Parameters<typeof renderNotionBlocks>[0];
    const { title } = renderNotionBlocks(data, id);
    return { title: `${title} | Groupe NOVI — Lucas Troteseil` };
  } catch {
    return { title: "Documentation | Lucas Troteseil" };
  }
}

export default async function NotionDocPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`${SPLITBEE_API}/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) notFound();

  const data = await res.json() as Record<string, unknown>;
  const { title, html } = renderNotionBlocks(data as Parameters<typeof renderNotionBlocks>[0], id);

  const notionUrl = `${NOTION_BASE_URL}/${id.replace(/-/g, "")}`;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/docs" className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          <ArrowLeft size={14} aria-hidden="true" />
          Documentations
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-amber-600 dark:text-amber-400">Groupe NOVI</span>
      </nav>

      {/* Header */}
      <div className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400">
          Groupe NOVI
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          {title}
        </h1>
        <a
          href={notionUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          <ExternalLink size={12} aria-hidden="true" />
          Voir dans Notion
        </a>
      </div>

      {/* Content */}
      <article
        className="notion-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
