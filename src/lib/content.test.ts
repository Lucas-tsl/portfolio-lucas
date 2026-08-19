import { describe, expect, it } from "vitest";
import path from "path";
import { readContentDirectory, readContentDocument } from "./content";

const BLOG_DIR = path.resolve(process.cwd(), "content/blog");

describe("readContentDirectory", () => {
  it("returns an array (empty if dir missing)", () => {
    const result = readContentDirectory("/nonexistent/path");
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  it("returns blog posts with slug, frontmatter, and body", () => {
    const docs = readContentDirectory(BLOG_DIR);
    if (docs.length === 0) return; // no content files in test env — skip
    for (const doc of docs) {
      expect(typeof doc.slug).toBe("string");
      expect(doc.slug.endsWith(".md")).toBe(false);
      expect(typeof doc.frontmatter).toBe("object");
      expect(typeof doc.body).toBe("string");
    }
  });

  it("parses frontmatter title correctly", () => {
    const docs = readContentDirectory(BLOG_DIR);
    for (const doc of docs) {
      expect(typeof doc.frontmatter.title).toBe("string");
    }
  });

  it("parses tags as array when present", () => {
    const docs = readContentDirectory(BLOG_DIR);
    for (const doc of docs) {
      if (doc.frontmatter.tags !== undefined) {
        expect(Array.isArray(doc.frontmatter.tags)).toBe(true);
      }
    }
  });
});

describe("readContentDocument", () => {
  it("returns null for missing slug", () => {
    const result = readContentDocument(BLOG_DIR, "slug-that-does-not-exist");
    expect(result).toBeNull();
  });

  it("returns first blog doc by slug if blog dir has content", () => {
    const all = readContentDirectory(BLOG_DIR);
    if (all.length === 0) return;
    const first = all[0];
    const doc = readContentDocument(BLOG_DIR, first.slug);
    expect(doc).not.toBeNull();
    expect(doc?.slug).toBe(first.slug);
    expect(doc?.frontmatter.title).toBe(first.frontmatter.title);
  });
});
