import { describe, expect, it } from "vitest";
import { cn, formatDate, slugify } from "./utils";

describe("cn", () => {
  it("joins truthy strings", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("returns empty string when all falsy", () => {
    expect(cn(false, null, undefined)).toBe("");
  });

  it("handles single class", () => {
    expect(cn("only")).toBe("only");
  });
});

describe("formatDate", () => {
  it("formats a ISO date string in French locale", () => {
    const result = formatDate("2024-01-15");
    expect(result).toMatch(/janvier/i);
    expect(result).toMatch(/2024/);
  });

  it("includes the day", () => {
    const result = formatDate("2024-03-05");
    expect(result).toMatch(/5/);
  });
});

describe("slugify", () => {
  it("lowercases input", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes accents", () => {
    expect(slugify("Développeur")).toBe("developpeur");
  });

  it("replaces spaces and special chars with hyphens", () => {
    expect(slugify("Next.js & TypeScript")).toBe("next-js-typescript");
  });

  it("strips leading and trailing hyphens", () => {
    expect(slugify("  hello  ")).toBe("hello");
  });

  it("collapses multiple hyphens", () => {
    expect(slugify("a   b")).toBe("a-b");
  });
});
