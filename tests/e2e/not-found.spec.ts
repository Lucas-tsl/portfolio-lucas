import { test, expect } from "@playwright/test";

test.describe("404 page", () => {
  test("shows branded 404 on unknown route", async ({ page }) => {
    await page.goto("/cette-page-nexiste-vraiment-pas");
    await expect(page.getByRole("heading", { name: /page introuvable/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /accueil/i })).toBeVisible();
  });

  test("returns HTTP 404 status", async ({ page }) => {
    const response = await page.goto("/route-inexistante-xyz");
    expect(response?.status()).toBe(404);
  });
});
