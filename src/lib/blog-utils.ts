export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

const HEADING_RE = /^(#{2,3})\s+(.+)$/gm;
const WORDS_PER_MINUTE = 200;

export function getReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function extractToc(body: string): TocEntry[] {
  const entries: TocEntry[] = [];
  let match: RegExpExecArray | null;
  HEADING_RE.lastIndex = 0;
  while ((match = HEADING_RE.exec(body)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`~]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    entries.push({ id, text, level });
  }
  return entries;
}
