import { corsHandler } from "../utils/corsHandler";
import { handleError } from "../utils/error";
import * as functions from "firebase-functions";
import ImageSlicer from "./ImageSlicer";
import OnlineImage from "./OnlineImage";

export const cutImageToSlices = functions
  .region("europe-west3")
  .runWith({ memory: "4GB", timeoutSeconds: 120 })
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      try {
        const file = request.query["file"] as string;
        const imageSlicer = new ImageSlicer(file);
        const files = await imageSlicer.createSlices();
        response.send(files);
      } catch (error) {
        handleError(error, "cutImageToSlices", response);
      }
    });
  });

export const getImageSize = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      try {
        const requestedFile = request.query.file as string;
        const image = new OnlineImage(requestedFile);
        await image.downloadFile();
        response.send(image.metadata);
      } catch (error) {
        handleError(error, "getImageSize", response);
      }
    });
  });
