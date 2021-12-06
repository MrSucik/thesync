import { Page } from "@playwright/test";

export const authenticate =
  (email: string, password: string) => async (page: Page) => {
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      page.click("#login"),
    ]);

    await popup.waitForLoadState();

    await popup.fill("input", email);
    await popup.click("text=Další");

    await popup.waitForNavigation();

    await popup.fill("[name=password]", password);
    await popup.click("text=Další");
  };

export const authenticateSuccess = authenticate(
  process.env.E2E_TESTS_AUTHORIZED_EMAIL,
  process.env.E2E_TESTS_AUTHORIZED_PASSWORD
);

export const authenticateFail = authenticate(
  process.env.E2E_TESTS_UNAUTHORIZED_EMAIL,
  process.env.E2E_TESTS_UNAUTHORIZED_PASSWORD
);
