import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testMatch: "*.e2e.ts",
  use: {
    browserName: "firefox",
    headless: true,
    viewport: { width: 1920, height: 1080 },
  },
};

export default config;
