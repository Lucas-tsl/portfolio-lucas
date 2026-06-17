import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("contact form fields are present", async ({ page }) => {
    await expect(page.getByLabel(/nom/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
  });

  test("submit with empty fields shows validation errors", async ({ page }) => {
    await page.getByRole("button", { name: /envoyer/i }).click();
    // HTML5 native validation or custom error message
    const nameField = page.getByLabel(/nom/i);
    await expect(nameField).toBeFocused();
  });

  test("form rejects short name (< 2 chars)", async ({ page }) => {
    await page.getByLabel(/nom/i).fill("A");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/message/i).fill("Message de test pour la validation du formulaire.");
    await page.getByRole("button", { name: /envoyer/i }).click();
    await expect(page.getByText(/trop court/i)).toBeVisible();
  });
});
