import { expect, test } from "@playwright/test";
import { authenticateSuccess } from "./authenticate";

test.describe("Playlists", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await authenticateSuccess(page);
    await page.waitForNavigation({ url: "http://localhost:3000/app" });
    await page.waitForLoadState("networkidle");
  });

  test("Add, rename and delete", async ({ page }) => {
    await page.click("#add-playlist");

    // TODO: Remove the click
    await page.click("#playlists li >> nth=0");

    expect(
      await page.$eval(
        "#playlists li >> nth=0",
        e => getComputedStyle(e).boxShadow
      )
    ).toBe("rgb(255, 255, 255) 0px 0px 0px 3px");

    await page.click("text='nastavení'");
    await page.fill("[name=name]", "Test name");
    await page.click("text='uložit změny'");
    // TODO: Expect change in title and playlist list

    await page.click("text='nastavení'");
    await page.click("text='odstranit scénu'");
    // TODO: Expect
  });

  // test("Hide progress", async ({ page }) => {});

  // test("Hide weather", async ({ page }) => {});

  // test("Hide nameday", async ({ page }) => {});

  // test("Change background", async ({ page }) => {});
});
