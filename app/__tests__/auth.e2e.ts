import { test, expect } from "@playwright/test";
import { authenticateFail, authenticateSuccess } from "./authenticate";

test.describe("Google Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");
  });
  test("Authentication using Google Account", async ({ page }) => {
    await authenticateSuccess(page);
    await page.waitForNavigation({ url: "http://localhost:3000/app" });
    const logo = await page.waitForSelector("#logo");
    expect(await logo.isVisible()).toBeTruthy();
  });

  test("Authentication using Google Account - Unauthorized account", async ({
    page,
  }) => {
    await authenticateFail(page);
    const message = await page.waitForSelector("text=Přístup zamítnut.");
    expect(await message.isVisible()).toBeTruthy();
  });
});
