import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("blog listing shows articles", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const articles = page.locator("article, [data-testid='blog-card'], a[href^='/blog/']");
    await expect(articles.first()).toBeVisible();
  });

  test("blog article page shows reading time and share buttons", async ({ page }) => {
    await page.goto("/blog/ai-productivity-web");
    // Reading time
    await expect(page.getByText(/min de lecture/i)).toBeVisible();
    // Share buttons (rendered twice on the page — top and bottom of the article)
    await expect(page.getByRole("link", { name: /partager sur x/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /partager sur linkedin/i }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /copier le lien/i }).first()).toBeVisible();
  });

  test("blog article TOC is present on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/blog/ai-productivity-web");
    await expect(page.getByRole("navigation", { name: /table des matières/i })).toBeVisible();
  });

  test("unknown blog slug returns 404", async ({ page }) => {
    const response = await page.goto("/blog/article-qui-nexiste-pas");
    expect(response?.status()).toBe(404);
  });
});
