import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#contact");
  });

  test("contact form fields are present", async ({ page }) => {
    await expect(page.getByLabel("Nom", { exact: false })).toBeVisible();
    await expect(page.getByLabel("Email", { exact: false })).toBeVisible();
    await expect(page.locator("#field-message")).toBeVisible();
  });

  test("submit with empty fields shows validation errors", async ({ page }) => {
    await page.getByRole("button", { name: /envoyer le message/i }).click();
    // noValidate + custom validation: errors appear as alert text
    await expect(page.getByText("Veuillez choisir un sujet.")).toBeVisible();
  });

  test("form rejects short name (< 2 chars)", async ({ page }) => {
    await page.getByLabel("Nom", { exact: false }).fill("A");
    await page.getByLabel("Email", { exact: false }).fill("test@example.com");
    await page.locator("#field-message").fill("Message de test pour la validation du formulaire.");
    await page.getByRole("button", { name: /envoyer le message/i }).click();
    await expect(page.getByText("Le nom est requis (2 caractères minimum).")).toBeVisible();
  });
});
