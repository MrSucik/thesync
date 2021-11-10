import { test, expect } from "@playwright/test";

test("Preview page loads with title and login button", async ({ page }) => {
  await page.goto("http://localhost:3000");

  expect(await page.textContent("h1.title")).toBe(
    "Vyvíjíme novou sféru efektivity v offline distribuci informací"
  );

  const loginSelector = "#login";
  expect(await page.textContent(loginSelector)).toBe("Přihlásit se");
  await page.click(loginSelector, { trial: true });
});
