import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
  });

  test("displays hero heading and name", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Lucas Troteseil" })).toBeVisible({ timeout: 10000 });
    const hero = page.getByLabel("Présentation");
    await expect(hero.getByText(/Chef de projet Data \/ IA/)).toBeVisible();
  });

  test("navbar links are present", async ({ page }) => {
    const nav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(nav.locator('a[href="/projects"]')).toBeVisible();
    await expect(nav.locator('a[href="/blog"]')).toBeVisible();
    await expect(nav.locator('a[href="/#contact"]')).toBeVisible();
  });

  test("search button opens command palette", async ({ page }) => {
    await page.getByRole("button", { name: /recherche/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder(/rechercher/i)).toBeFocused();
  });

  test("JSON-LD schema is present in <head>", async ({ page }) => {
    const schema = await page.evaluate(() => {
      const el = [...document.querySelectorAll('script[type="application/ld+json"]')][0];
      return el ? JSON.parse(el.textContent ?? "{}") : null;
    });
    expect(schema?.["@context"]).toBe("https://schema.org");
    expect(schema?.["@graph"]).toHaveLength(2);
  });
});
