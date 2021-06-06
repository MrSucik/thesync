import * as puppeteer from "puppeteer";
import * as moment from "moment";
import { tempFilePath } from "./utils";
import { bakaSuplRoute, bakaSuffix, bakaPlanRoute } from "./constants";
import { firestore, uploadFile } from "./fire";
import { v4 as uuid } from "uuid";

const removeNewLines = (input: string) => input.replace(/\r?\n|\r/g, "");

const defaultOptions = {
  headless: true,
  args: ["--no-sandbox"],
  defaultViewport: { width: 1080, height: 100 },
};

export const takeScreenshot = async (
  page: puppeteer.Page,
  html: string,
  name: string
) => {
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

export const initialize = async () => {
  const browser = await puppeteer.launch(defaultOptions);
  const page = await browser.newPage();
  return page;
};

export const scrapeSupl = async (page: puppeteer.Page, date: moment.Moment) => {
  const url = bakaSuplRoute + getUrl(moment(date)) + bakaSuffix;
  await page.goto(url);
  console.log(url);
  const html = await page.evaluate(() => {
    let tables = "";
    document
      .querySelectorAll("table")
      .forEach((table) => (tables += table.outerHTML));
    return tables
      ? Promise.resolve(tables)
      : Promise.reject(`Cannot find baka supl page from!`);
  });
  return await takeScreenshot(page, html, "bakalari-suplovani.png");
};

export const scrapePlan = async (page: puppeteer.Page, date: moment.Moment) => {
  const nearMonday = moment(date).startOf("isoWeek");
  const url = bakaPlanRoute + getUrl(nearMonday) + bakaSuffix;
  console.log(url);
  await page.goto(url);
  const html = await page.evaluate(() => {
    const table = document.querySelector("table");
    return table
      ? Promise.resolve(table.outerHTML)
      : Promise.reject("Cannot find baka plan page!");
  });
  const EVIL =
    /<tr>    <td class="td_div_1" width="100%" colspan="4" &nbsp;<="" td="">  <\/td><\/tr>/g;
  const parsedHtml = removeNewLines(html).replace(EVIL, "");
  return await takeScreenshot(page, parsedHtml, "bakalari-plan-akci.png");
};

export const getAvailableDates = async (page: puppeteer.Page) => {
  const dates = await page.evaluate(() => {
    const options = Array.from(document.getElementsByTagName("option"));
    return Promise.resolve(options.map((x) => x.value.substr(2, 6)));
  });
  return dates.map((date) => moment(date, "YYMMDD").format("DD-MM-YYYY"));
};

const getUrl = (date: moment.Moment) => moment(date).format("YYMMDD");

const generateName = (bakalariType: string, date: moment.Moment) =>
  bakalariType === "bakalari-suplovani"
    ? `Suplování (${date.format("DD. MM.")})`
    : `Plán Akcí (${date.startOf("isoWeek").format("DD. MM.")} - ${date
        .startOf("isoWeek")
        .add(5, "days")
        .format("DD. MM.")})`;

export const exportCurrentBakalari = async () => {
  const desiredDay = moment().add(8, "hours");
  const { docs } = await firestore
    .collection("media")
    .where("bakalariConfiguration", "==", "auto")
    .get();
  const page = await initialize();
  for (const doc of docs) {
    const type = doc.data().bakalariType as
      | "bakalari-planakci"
      | "bakalari-suplovani";
    const scrape = type === "bakalari-planakci" ? scrapePlan : scrapeSupl;
    const local = await scrape(page, desiredDay);
    const remote = await uploadFile(
      local,
      `bakalari/${type}-${uuid()}-${desiredDay.format()}.png`
    );
    await doc.ref.update({
      file: remote[0].metadata.name,
      bakalariUpdated: moment().format(),
      name: generateName(type, desiredDay),
    });
  }
};
