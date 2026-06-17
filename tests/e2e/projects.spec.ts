import { test, expect } from "@playwright/test";

test.describe("Projects", () => {
  test("projects listing page renders cards", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // At least one project card must be present
    const cards = page.locator("article");
    await expect(cards.first()).toBeVisible();
  });

  test("technology filter chips are present", async ({ page }) => {
    await page.goto("/projects");
    const filterGroup = page.getByRole("group", { name: /filtrer par technologie/i });
    await expect(filterGroup).toBeVisible();
  });

  test("project detail page renders title and stack", async ({ page }) => {
    await page.goto("/projects/woocommerce-stories");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Stack section
    await expect(page.getByText(/stack/i)).toBeVisible();
  });

  test("unknown project slug returns 404", async ({ page }) => {
    const response = await page.goto("/projects/projet-qui-nexiste-pas");
    expect(response?.status()).toBe(404);
  });
});
