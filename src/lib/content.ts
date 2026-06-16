import fs from "node:fs";
import path from "node:path";
import type { ContentDocument, ContentFrontmatter } from "@/types/content.types";

export type { ContentDocument, ContentFrontmatter };

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
  if (!match) return { frontmatter: { title: "" }, body: raw.trim() };

  const [, frontmatterBlock, body] = match;
  const frontmatter: ContentFrontmatter = { title: "" };

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

export function readContentDirectory<T extends ContentFrontmatter = ContentFrontmatter>(
  directoryPath: string
): ContentDocument<T>[] {
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
        frontmatter: frontmatter as T,
        body,
      };
    });
}

export function readContentDocument<T extends ContentFrontmatter = ContentFrontmatter>(
  directoryPath: string,
  slug: string
): ContentDocument<T> | null {
  const filePath = path.join(directoryPath, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(raw);
  return { slug, frontmatter: frontmatter as T, body };
}
