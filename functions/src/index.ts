import * as functions from "firebase-functions";
import { validateDeviceId, createDeviceToken } from "./auth";
import { bucket, firestore, storage, uploadFile } from "./fire";
import {
  exportCurrentBakalari,
  getAvailableDates,
  initialize,
  scrapePlan,
  scrapeSupl,
} from "./baka";
import { bakaPlanDatesRoute, bakaSuplDatesRoute } from "./constants";
import moment = require("moment");
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { spawn } from "child-process-promise";
import { createThumbnailFromVideo } from "./thumbnails";
import sharp = require("sharp");
import * as cors from "cors";
import { tempFilePath } from "./utils";

const corsHandler = cors({ origin: true });

export const scheduledBakalariUpdate = functions
  .region("europe-west3")
  .runWith({ timeoutSeconds: 300, memory: "4GB" })
  .pubsub.schedule("every 30 minutes")
  .onRun(exportCurrentBakalari);

export const generateDeviceToken = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      const deviceId = request.query.deviceId + "";
      const isValid = await validateDeviceId(deviceId);
      if (!isValid) {
        response.status(500).send("Invalid device ID");
      } else {
        const token = await createDeviceToken(deviceId);
        response.send(token);
      }
    });
  });

export const onClientStatusChanged = functions
  .region("europe-west3")
  .database.ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val();
    const userStatusFirestoreRef = firestore
      .collection("devices")
      .doc(context.params.uid);
    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();
    return status.last_changed > eventStatus.last_changed
      ? null
      : userStatusFirestoreRef.update({ status: eventStatus.state });
  });

const loadDates = async (url: string) => {
  const page = await initialize();
  await page.goto(url);
  const dates = await getAvailableDates(page);
  return dates;
};

const createAvailableDatesHandler = (url: string) =>
  functions
    .region("europe-west3")
    .runWith({ memory: "1GB" })
    .https.onRequest(async (_request, response) => {
      corsHandler(_request, response, async () => {
        const dates = await loadDates(url);
        response.send(dates);
      });
    });

export const availableBakaSuplDates =
  createAvailableDatesHandler(bakaSuplDatesRoute);

export const availableBakaPlanDates =
  createAvailableDatesHandler(bakaPlanDatesRoute);

const createProcessDateHandler = (type: "supl" | "plan") =>
  functions
    .region("europe-west3")
    .runWith({ memory: "1GB" })
    .https.onRequest(async (request, response) => {
      try {
        response.set("Access-Control-Allow-Origin", "*");
        const dateQuery = request.query["date"] as string;
        const date =
          dateQuery === "auto" ? moment() : moment(dateQuery).add(12, "hours");
        const page = await initialize();
        const screen =
          type === "supl"
            ? await scrapeSupl(page, date)
            : await scrapePlan(page, date);
        const result = await uploadFile(screen, `bakalari/${type}-${date}.png`);
        response.send(result[1].name);
      } catch (error) {
        response.send(error);
      }
    });

export const bakalariProcessSupl = createProcessDateHandler("supl");

export const bakalariProcessPlan = createProcessDateHandler("plan");

// export const onMediaFileUpdate = functions
//   .region("europe-west3")
//   .firestore.document("media/{id}")
//   .onUpdate(async (change) => {
//     const afterData = change.after.data();
//     if (change.before.data().file === afterData.file) {
//       return;
//     }
//     const localFile = tempFilePath(afterData.name);
//     await bucket.file(afterData.file).download({ destination: localFile });
//     const thumbnail = (afterData.fileType === "video"
//       ? createThumbnailFromVideo
//       : createThumbnailFromImage)(afterData.name, localFile, 10);
//     change.after.ref.update({ thumbnail });
//   });

export const onFileCreated = functions
  .region("europe-west3")
  .runWith({ memory: "1GB" })
  .storage.object()
  .onFinalize(async (object) => {
    const filePath = object.name;
    const contentType = object.contentType;
    if (!contentType || !filePath) {
      return;
    }
    const fileName = path.basename(filePath);
    if (fileName.startsWith("thumb_")) {
      return functions.logger.log("Already a Thumbnail.");
    }

    let tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = { contentType: contentType };
    await bucket.file(filePath).download({ destination: tempFilePath });
    let thumbPath = "";
    functions.logger.log("File downloaded locally to", tempFilePath);
    if (!contentType.startsWith("image/")) {
      thumbPath = await createThumbnailFromVideo(filePath, tempFilePath, 10);
    } else {
      await spawn("convert", [
        tempFilePath,
        "-thumbnail",
        "200x200>",
        tempFilePath,
      ]);
      functions.logger.log("Thumbnail created at", tempFilePath);
      const thumbFileName = `thumb_${fileName}`;
      thumbPath = path.join(path.dirname(filePath), thumbFileName);
    }
    await bucket.upload(tempFilePath, {
      destination: thumbPath,
      metadata: metadata,
    });
    return fs.unlinkSync(tempFilePath);
  });

export const getImageSize = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      const destination = tempFilePath(request.body);
      storage.bucket().file(request.body).download({ destination });
      const { width, height } = await sharp(destination).metadata();
      response.send({ width, height, destination });
    });
  });

export const echoDevice = functions
  .region("europe-west3")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      response.send({
        shutdown: moment().add(-3, "minutes"),
        startup: moment().add(3, "minutes"),
      });
    });
  });

export const endpoint = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const deviceDoc = firestore.doc(`devices/${request.query.deviceId}`);
    const data = (await deviceDoc.get()).data();
    if (data?.forceShutdown) {
      deviceDoc.update({ forceShutdown: false });
    } else if (data?.forceReboot) {
      deviceDoc.update({ forceReboot: false });
    }
    const schedule = await firestore
      .collection("powersettings")
      .orderBy("updated", "desc")
      .limit(1)
      .get();
    const scheduleSettings = schedule.docs[0].data();
    const time = moment(scheduleSettings.time);
    const isCorrectTime =
      moment().hours() == time.hours() && moment().minutes() == time.minutes();
    const scheduledShutdown =
      scheduleSettings.enabled &&
      isCorrectTime &&
      scheduleSettings.action === "shutdown";
    const scheduledReboot =
      scheduleSettings.enabled &&
      isCorrectTime &&
      scheduleSettings.action === "reboot";

    response.send({
      shutdown: scheduledShutdown || data?.forceShutdown || false,
      reboot: scheduledReboot || data?.reboot || false,
      startup: false,
    });
  });
});

export const log = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const log = request.body;
    firestore.collection("logs").add(log);
    response.status(200).send();
  });
});
