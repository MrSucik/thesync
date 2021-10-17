import { corsHandler } from "../utils/corsHandler";
import { handleError } from "../utils/error";
import * as functions from "firebase-functions";
import ImageSlicer from "./ImageSlicer";
import OnlineImage from "./OnlineImage";
import ResizableImage from "./ResizableImage";

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

const validateFile = (file = "") => {
  if (!file) {
    return false;
  }
  return true;
};

export const getImageSize = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) =>
    corsHandler(request, response, async () => {
      const requestedFile = request.query.file + "";
      if (!validateFile(requestedFile)) {
        handleError(new Error("Bad Request"), "cutImageToSlices", response);
        return;
      }
      const resizableImage = new ResizableImage(requestedFile);
      await resizableImage.shrinkWidth();
      console.log(resizableImage.metadata);
      const image = new OnlineImage(requestedFile);
      await image.downloadFile();
      return response.send(image.metadata);
    })
  );
