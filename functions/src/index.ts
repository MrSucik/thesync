import * as functions from "firebase-functions";
import { validateDeviceId, createDeviceToken } from "./auth";
import { bucket, firestore } from "./firebase/fire";
import moment = require("moment");
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { spawn } from "child-process-promise";
import { createThumbnailFromVideo } from "./thumbnails";
import { handleError } from "./utils/error";
import { corsHandler } from "./utils/corsHandler";

export {
  manualBakalariUpdate,
  scheduledBakalariUpdate,
  availableBakaPlanDates,
  availableBakaSuplDates,
  bakalariProcessPlan,
  bakalariProcessSupl,
} from "./bakalari/endpoints";

export { cutImageToSlices, getImageSize } from "./images/endpoints";

export { scheduledNameDayUpdate } from "./nameDay/nameDay";

export const generateDeviceToken = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      try {
        const deviceId = request.query.deviceId + "";
        const isValid = await validateDeviceId(deviceId);
        if (!isValid) {
          response.status(500).send("Invalid device ID");
        } else {
          const token = await createDeviceToken(deviceId);
          response.send(token);
        }
      } catch (error) {
        handleError(error, "generateDeviceToken", response);
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
  .onFinalize(async object => {
    const filePath = object.name;
    const contentType = object.contentType;
    if (!contentType || !filePath) {
      return;
    }
    const fileName = path.basename(filePath);
    if (fileName.startsWith("thumb_")) {
      return functions.logger.log("Already a Thumbnail.");
    }

    const tempFilePath = path.join(os.tmpdir(), fileName);
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

export const echoDevice = functions
  .region("europe-west3")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        response.send({
          shutdown: moment().add(-3, "minutes"),
          startup: moment().add(3, "minutes"),
        });
      } catch (error) {
        handleError(error, "echoDevice", response);
      }
    });
  });

export const endpoint = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    try {
      const deviceDoc = firestore.doc(`devices/${request.query.deviceId}`);
      const data = (await deviceDoc.get()).data();
      if (data?.forceShutdown) {
        deviceDoc.update({ forceShutdown: false });
      } else if (data?.forceReboot) {
        deviceDoc.update({ forceReboot: false });
      }
      deviceDoc.update({ lastUpdateRequest: moment().format() });
      const schedule = await firestore
        .collection("powersettings")
        .orderBy("updated", "desc")
        .limit(1)
        .get();
      const scheduleSettings = schedule.docs[0].data();
      const time = moment(scheduleSettings.time);
      const isCorrectTime =
        moment().hours() == time.hours() &&
        moment().minutes() == time.minutes();
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
        reboot: scheduledReboot || data?.forceReboot || false,
        startup: false,
      });
    } catch (error) {
      handleError(error, "endpoint", response);
    }
  });
});

export const log = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const data = request.body;
    response.status(200).send(await firestore.collection("logs").add(data));
  });
});
