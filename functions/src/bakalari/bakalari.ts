import moment = require("moment");
import { czechShortDateFormat, maxHeight } from "../constants";
import { getMonday, getNearestWeekday } from "../utils/date";
import { bakaDateFormat, internalDateFormat } from "./constants";
import { v4 as uuid } from "uuid";
import { handleError } from "../utils/error";
import { BakalariType } from "../definitions";
import { initializePage } from "../puppeteer";
import { scrapePlan } from "./planakci";
import { scrapeSupl } from "./suplovani";
import * as puppeteer from "puppeteer";
import {
  getAllBakalariMediaDocumentsForExport,
  updateBakalariDoc,
} from "./firestore";
import { uploadFile } from "../firebase/storage";
import ImageSlicer from "../images/ImageSlicer";
import Image from "../images/Image";

export const processBakalariDate = async (
  type: BakalariType,
  date: moment.Moment
) => {
  const page = await initializePage();
  const screenshot =
    type === "bakalari-suplovani"
      ? await scrapeSupl(page, date)
      : await scrapePlan(page, date);
  const fileName = generateBakalariFileName(type);
  return await uploadFile(screenshot, fileName);
};

export const getDateInUrlFormat = (date: moment.Moment) =>
  date.format(bakaDateFormat);

export const generateBakalariName = (
  bakalariType: string,
  date: moment.Moment
) => {
  const monday = getMonday(date);
  return bakalariType === "bakalari-suplovani"
    ? `Suplování (${moment(date).format(czechShortDateFormat)})`
    : `Plán Akcí (${monday.format(czechShortDateFormat)} - ${monday
        .add(4, "days")
        .format(czechShortDateFormat)})`;
};

export const generateBakalariFileName = (type: string) =>
  `bakalari/${type}-${uuid()}.png`;

export const loadDatesFromUrl = async (url: string) => {
  const page = await initializePage();
  await page.goto(url);
  const dates = await getAvailableDatesFromPage(page);
  return dates;
};

const getAvailableDatesFromPage = async (page: puppeteer.Page) => {
  const result = await page.evaluate(() => {
    const extractDate = (htm: string) => htm.substr(2, 6);
    const options = Array.from(document.getElementsByTagName("option"));
    const formattedOptions = options.map(x => extractDate(x.value));
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
    dates: result.dates.map(date =>
      moment(date, bakaDateFormat).format(internalDateFormat)
    ),
  };
};

export const exportNearestBakalari = async () => {
  const nearestWeekday = getNearestWeekday();
  try {
    const { docs } = await getAllBakalariMediaDocumentsForExport();
    for (const doc of docs) {
      await exportBakalariMediaDocument(nearestWeekday, doc);
    }
  } catch (error) {
    handleError(error, "scheduledBakalariUpdate");
  }
};

const exportBakalariMediaDocument = async (
  date: moment.Moment,
  doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
) => {
  const type = doc.data().bakalariType as BakalariType;
  const name = generateBakalariName(type, date);
  const remote = await processBakalariDate(type, date);
  const newFile = remote[0].metadata.name;
  const image = new Image(newFile);
  await image.verifyLoaded();
  const { height, width } = image.metadata;
  const update = { name, height, width };
  if (height < maxHeight) {
    await updateBakalariDoc(doc.ref, {
      ...update,
      file: newFile,
      fileType: "image",
    });
  } else {
    const imageSlicer = new ImageSlicer(newFile);
    const files = await imageSlicer.createSlices();
    await updateBakalariDoc(doc.ref, { ...update, files, fileType: "images" });
  }
};
