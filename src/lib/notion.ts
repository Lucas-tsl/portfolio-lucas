export interface NotionDoc {
  id: string;
  title: string;
  notionUrl: string;
  source: "notion";
}

const NOTION_PAGE_ID = "38129fb0a29c8014b715dd63879b0bf5";
const SPLITBEE_API = "https://notion-api.splitbee.io/v1/page";
const NOTION_BASE_URL = "https://few-volleyball-409.notion.site";

export async function fetchNotionDocs(): Promise<NotionDoc[]> {
  try {
    const res = await fetch(`${SPLITBEE_API}/${NOTION_PAGE_ID}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = (await res.json()) as Record<
      string,
      { value?: { value?: { type?: string; properties?: { title?: string[][] }; id?: string } } }
    >;

    const rootBlock = data[NOTION_PAGE_ID.replace(/-/g, "")]?.value?.value ??
      data[
        `${NOTION_PAGE_ID.slice(0, 8)}-${NOTION_PAGE_ID.slice(8, 12)}-${NOTION_PAGE_ID.slice(12, 16)}-${NOTION_PAGE_ID.slice(16, 20)}-${NOTION_PAGE_ID.slice(20)}`
      ]?.value?.value;

    const contentIds: string[] = (rootBlock as { content?: string[] } | undefined)?.content ?? [];

    const docs: NotionDoc[] = [];

    for (const id of contentIds) {
      const normalizedId = id.replace(/-/g, "");
      const block = data[normalizedId]?.value?.value ?? data[id]?.value?.value;
      if (!block) continue;

      if (block.type !== "page") continue;

      const rawTitle = block.properties?.title?.[0]?.[0] ?? "";
      const title = rawTitle.replace(/^[\p{Emoji}\s]+/u, "").trim();
      if (!title || title === "Portfolio") continue;

      const hyphenId = id.includes("-")
        ? id
        : `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;

      docs.push({
        id: hyphenId,
        title,
        notionUrl: `${NOTION_BASE_URL}/${hyphenId.replace(/-/g, "")}`,
        source: "notion",
      });
    }

    return docs;
  } catch {
    return [];
  }
}
