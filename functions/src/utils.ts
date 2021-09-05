import * as path from "path";
import * as os from "os";
import * as ffmpeg from "fluent-ffmpeg";
import * as ffmpegPath from "ffmpeg-static";
import { ConversionResult } from "./definitions";
import * as sharp from "sharp";
import { bucket, uploadFile } from "./fire";
import {
  createThumbnailFromImage,
  createThumbnailFromVideo,
} from "./thumbnails";
import { ensureDirSync } from "fs-extra";

export const tempFilePath = (name: string) => path.join(os.tmpdir(), name);

export const processLocalImage = async (
  tempPath: string,
  onProgress: (progress: number) => void
): Promise<ConversionResult> => {
  const tempProcessedPath = tempFilePath(
    `converted_${path.basename(tempPath)}`
  );
  const resizedImage = await sharp(tempPath)
    .resize({ fit: "contain", width: 1080 })
    .toFile(tempProcessedPath);
  if (resizedImage.height <= 1920) {
    const processedPath = `processed/${path.basename(tempPath)}`;
    await uploadFile(tempProcessedPath, processedPath);
    return {
      type: "image",
      source: processedPath,
    };
  } else {
    return {
      type: "video",
      source: await processScrollingVideo(
        tempProcessedPath,
        resizedImage.height,
        onProgress
      ),
    };
  }
};

export const processMedia = async (
  name: string,
  inputPath: string,
  onProgress: (progress: number) => void
): Promise<{ source: string; type: string; thumbnail: string }> => {
  const tempPath = tempFilePath(path.basename(inputPath));
  await bucket.file(inputPath).download({ destination: tempPath });
  // TODO: Create proper validation
  if (inputPath.endsWith("mp4")) {
    return {
      type: "video",
      source: inputPath,
      thumbnail: await createThumbnailFromVideo(name, tempPath, 10),
    };
  }
  return {
    thumbnail: await createThumbnailFromImage(name, tempPath),
    ...(await processLocalImage(tempPath, onProgress)),
  };
};

const processScrollingVideo = (
  inputPath: string,
  inputHeight: number,
  onProgress: (progress: number) => void
) =>
  new Promise<string>((resolve, reject) => {
    const tempPath = tempFilePath(
      `processed_${path.parse(inputPath).name}.mp4`
    );
    const outputPath = `processed/${path
      .parse(inputPath)
      .name.replace(/converted_/gi, "")}.mp4`;
    const handleConversionEnd = async () => {
      await uploadFile(tempPath, outputPath);
      resolve(outputPath);
    };
    ffmpeg()
      .setFfmpegPath(ffmpegPath)
      .input(inputPath)
      .inputOption("-loop 1")
      .videoFilter("crop=1080:1920:0:n")
      .frames(inputHeight - 1920)
      .on("error", reject)
      .on("progress", (progress) =>
        onProgress((progress.frames / (inputHeight - 1920)) * 100)
      )
      .on("end", handleConversionEnd)
      .save(tempPath);
  });

export const getImageMetadata = async (requestedFile: string) => {
  const destination = tempFilePath(requestedFile);
  const directory = path.dirname(destination)
  ensureDirSync(directory);
  const file = bucket.file(requestedFile);
  const [exists] = await file.exists();
  console.log(exists);
  const response = await file.download({ destination });
  console.log(response);

  const { width, height } = await sharp(destination).metadata();
  return { width, height, destination };
};
