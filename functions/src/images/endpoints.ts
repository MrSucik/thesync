import { corsHandler } from "../utils/corsHandler";
import { handleError } from "../utils/error";
import { cutImageToSlicesInternal, downloadWithMetadata } from "./utils";
import * as functions from "firebase-functions";

export const cutImageToSlices = functions
  .region("europe-west3")
  .runWith({ memory: "4GB", timeoutSeconds: 120 })
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      try {
        const file = request.query["file"] as string;
        const files = await cutImageToSlicesInternal(file);
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
        const metadata = await downloadWithMetadata(requestedFile);
        response.send(metadata);
      } catch (error) {
        handleError(error, "getImageSize", response);
      }
    });
  });
