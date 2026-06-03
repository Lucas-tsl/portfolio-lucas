import fs from "node:fs";
import path from "node:path";

export type ContentFrontmatter = Record<string, string | string[]>;

export type ContentDocument = {
  slug: string;
  frontmatter: ContentFrontmatter;
  body: string;
};

function parseArrayValue(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return [];
  return trimmed
    .slice(1, -1)
    .split(",")
    .map((item) => item.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, ""))
    .filter(Boolean);
}

function parseFrontmatter(raw: string): { frontmatter: ContentFrontmatter; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: raw.trim() };
  }

  const [, frontmatterBlock, body] = match;
  const frontmatter: ContentFrontmatter = {};

  frontmatterBlock
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) return;
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();

      if (value.startsWith("[") && value.endsWith("]")) {
        frontmatter[key] = parseArrayValue(value);
        return;
      }

      frontmatter[key] = value.replace(/^"|"$/g, "").replace(/^'|'$/g, "");
    });

  return { frontmatter, body: body.trim() };
}

export function readContentDirectory(directoryPath: string): ContentDocument[] {
  if (!fs.existsSync(directoryPath)) return [];

  return fs
    .readdirSync(directoryPath)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(directoryPath, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      const { frontmatter, body } = parseFrontmatter(raw);
      return {
        slug: fileName.replace(/\.md$/, ""),
        frontmatter,
        body,
      };
    });
}

export function readContentDocument(directoryPath: string, slug: string): ContentDocument | null {
  const filePath = path.join(directoryPath, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(raw);
  return {
    slug,
    frontmatter,
    body,
  };
}
