import moment = require("moment");
import { executeFunctionOnUrl, takeScreenshot } from "../puppeteer";
import { getDateInUrlFormat } from "./bakalari";
import { bakaSuplRoute, bakaSuffix } from "./constants";
import * as puppeteer from "puppeteer";

export const scrapeSupl = async (page: puppeteer.Page, date: moment.Moment) => {
  const url = bakaSuplRoute + getDateInUrlFormat(date) + bakaSuffix;
  const html = await executeFunctionOnUrl(page, url, scrapeSuplInternal);
  return await takeScreenshot(page, html, "bakalari-suplovani.png");
};

const scrapeSuplInternal = () => {
  let tables = "";
  document
    .querySelectorAll("table")
    .forEach((table) => (tables += table.outerHTML));
  return tables
    ? Promise.resolve(tables)
    : Promise.reject("Failed to parse the page or page not found.");
};
