import * as puppeteer from "puppeteer";
import * as moment from "moment";
import { tempFilePath } from "./utils";
import {
  bakaSuplRoute,
  bakaSuffix,
  bakaPlanRoute,
  internalDateFormat as internalDateFormat,
  bakaDateFormat,
  czechShortDateFormat,
} from "./constants";
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
      : Promise.reject(`Cannot find baka supl page!`);
  });
  return await takeScreenshot(page, html, "bakalari-suplovani.png");
};

export const scrapePlan = async (page: puppeteer.Page, date: moment.Moment) => {
  const url = bakaPlanRoute + getUrl(date) + bakaSuffix;
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
  const result = await page.evaluate(() => {
    const extractDate = (htm: string) => htm.substr(2, 6);
    const options = Array.from(document.getElementsByTagName("option"));
    const formattedOptions = options.map((x) => extractDate(x.value));
    const selectedValue = extractDate(
      document.getElementsByTagName("select")[0].value
    );
    return Promise.resolve({
      dates: formattedOptions,
      selected: selectedValue,
    });
  });
  return {
    selected: moment(result.selected, bakaDateFormat).format(
      internalDateFormat
    ),
    dates: result.dates.map((x) =>
      moment(x, bakaDateFormat).format(internalDateFormat)
    ),
  };
};

const getUrl = (date: moment.Moment) => moment(date).format(bakaDateFormat);

const generateName = (bakalariType: string, date: moment.Moment) =>
  bakalariType === "bakalari-suplovani"
    ? `Suplování (${date.format(czechShortDateFormat)})`
    : `Plán Akcí (${date
        .startOf("isoWeek")
        .format(czechShortDateFormat)} - ${date
        .startOf("isoWeek")
        .add(4, "days")
        .format(czechShortDateFormat)})`;
export const generateBakalariFileName = (type: string) =>
  `bakalari/${type}-${uuid()}.png`;

export const getNearestDate = () => {
  let desiredDay = moment().add(8, "hours");
  if (desiredDay.weekday() === 5) {
    desiredDay = desiredDay.add(2, "days");
  } else if (desiredDay.weekday() === 6) {
    desiredDay = desiredDay.add(1, "day");
  }
  return desiredDay;
}

export const exportCurrentBakalari = async () => {
  const desiredDay = getNearestDate();
  try {
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
      const remote = await uploadFile(local, generateBakalariFileName(type));
      await doc.ref.update({
        file: remote[0].metadata.name,
        bakalariUpdated: moment().format(),
        name: generateName(type, desiredDay),
      });
    }
  } catch (error) {
    firestore.collection("logs").add({
      ...error,
      created: moment().format(),
      endpoint: "scheduledBakalariUpdate",
    });
  }
};
