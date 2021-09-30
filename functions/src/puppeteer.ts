import * as puppeteer from "puppeteer";
import { screenWidth } from "./constants";
import { tempFilePath } from "./utils/os";

const defaultLaunchOptions = {
  headless: true,
  args: ["--no-sandbox"],
  // Window will expand in height as possible - this reduces redundant space around the content
  defaultViewport: { width: screenWidth, height: 100 },
};

export const initializePage = async () => {
  const browser = await puppeteer.launch(defaultLaunchOptions);
  const page = await browser.newPage();
  return page;
};

export const takeScreenshot = async (
  page: puppeteer.Page,
  html: string,
  name: string
) => {
  // TODO: Take path out of this function
  const path = tempFilePath(name);
  await page.setContent(html);
  await page.addStyleTag({
    url:
      // TODO: Move to a correct storage project
      "https://firebasestorage.googleapis.com/v0/b/wigymtv.appspot.com/o/supl.css?alt=media&token=79ba43bd-2c8b-42d7-b368-34c2ad688150",
  });
  await page.screenshot({
    fullPage: true,
    path,
  });
  return path;
};

export const executeFunctionOnUrl = async (
  page: puppeteer.Page,
  url: string,
  pageFunction: () => Promise<string>
) => {
  await page.goto(url);
  return await page.evaluate(pageFunction);
};
