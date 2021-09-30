import { bucket } from "./fire";
import { tempFilePath } from "../utils/os";
import { v4 as uuid } from "uuid";

export const downloadFile = async (requestedFile: string) => {
  const destination = tempFilePath(requestedFile);
  const file = bucket.file(requestedFile);
  await file.download({ destination });
  return destination;
};

export const uploadFile = (localPath: string, remotePath: string = localPath) =>
  bucket.upload(localPath, {
    destination: remotePath,
    metadata: { metadata: { firebaseStorageDownloadTokens: uuid() } },
  });
