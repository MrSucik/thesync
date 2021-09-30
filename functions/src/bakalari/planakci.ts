import * as puppeteer from "puppeteer";
import { getMonday } from "../date";
import { executeFunctionOnUrl, takeScreenshot } from "../puppeteer";
import { removeNewLines } from "../string";
import { getDateInUrlFormat } from "./bakalari";
import { bakaPlanRoute, bakaSuffix } from "./constants";

export const scrapePlan = async (page: puppeteer.Page, date: moment.Moment) => {
  const url = getPlanUrl(date);
  let html = await executeFunctionOnUrl(page, url, scrapePlanInternal);
  html = applyPlanPostProcess(html);
  return await takeScreenshot(page, html, "bakalari-plan-akci.png");
};

const scrapePlanInternal = () => {
  const table = document.querySelector("table");
  return table
    ? Promise.resolve(table.outerHTML)
    : Promise.reject("Failed to parse the page or page not found.");
};

const applyPlanPostProcess = (html: string) => {
  const EVIL =
    /<tr>    <td class="td_div_1" width="100%" colspan="4" &nbsp;<="" td="">  <\/td><\/tr>/g;
  return removeNewLines(html).replace(EVIL, "");
};

const getPlanUrl = (date: moment.Moment) =>
  bakaPlanRoute + getDateInUrlFormat(getMonday(date)) + bakaSuffix;
