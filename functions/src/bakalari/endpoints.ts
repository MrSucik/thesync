import { RuntimeOptions } from "firebase-functions/v1";
import { handleError } from "../error";
import {
  exportNearestBakalari,
  loadDatesFromUrl,
  processBakalariDate,
} from "./bakalari";
import * as functions from "firebase-functions";
import { corsHandler } from "../corsHandler";
import moment = require("moment");
import { getNearestWeekday } from "../date";
import { bakaSuplDatesRoute, bakaPlanDatesRoute } from "./constants";
import { BakalariType, DateQuery } from "../definitions";

const bakalariRuntimeOptions: RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "4GB",
};

export const scheduledBakalariUpdate = functions
  .region("europe-west3")
  .runWith(bakalariRuntimeOptions)
  .pubsub.schedule("every 10 minutes")
  .onRun(exportNearestBakalari);

export const manualBakalariUpdate = functions
  .region("europe-west3")
  .runWith(bakalariRuntimeOptions)
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      try {
        await exportNearestBakalari();
        response.send(":)");
      } catch (error) {
        handleError(error, "bakatest", response);
      }
    });
  });

const createAvailableDatesHandler = (url: string) =>
  functions
    .region("europe-west3")
    .runWith({ memory: "1GB" })
    .https.onRequest(async (_request, response) => {
      corsHandler(_request, response, async () => {
        try {
          const dates = await loadDatesFromUrl(url);
          response.send(dates);
        } catch (error) {
          handleError(error, "createAvailableDatesHandler-" + url, response);
        }
      });
    });

export const availableBakaSuplDates =
  createAvailableDatesHandler(bakaSuplDatesRoute);

export const availableBakaPlanDates =
  createAvailableDatesHandler(bakaPlanDatesRoute);

const createProcessDateHandler = (type: BakalariType) =>
  functions
    .region("europe-west3")
    .runWith({ memory: "1GB" })
    .https.onRequest((request, response) => {
      corsHandler(request, response, async () => {
        try {
          const dateQuery = request.query["date"] as DateQuery;
          const date = selectDateFromQuery(dateQuery);
          const result = await processBakalariDate(type, date);
          response.send({ date, file: result[1].name });
        } catch (error) {
          handleError(error, "createProcessDateHandler-" + type, response);
        }
      });
    });

const selectDateFromQuery = (dateQuery: DateQuery) =>
  dateQuery === "auto"
    ? getNearestWeekday()
    : moment(dateQuery).add(8, "hours");

export const bakalariProcessSupl =
  createProcessDateHandler("bakalari-suplovani");

export const bakalariProcessPlan =
  createProcessDateHandler("bakalari-planakci");
