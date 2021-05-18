import * as ffmpeg from "fluent-ffmpeg";
import { spawn } from "child-process-promise";
import * as ffmpegPath from "ffmpeg-static";
import { uploadFile } from "./fire";
import { tempFilePath } from "./utils";

export const createThumbnailFromImage = async (
  name: string,
  inputPath: string
) => {
  const thumbnailPath = tempFilePath(`thumbnail_${name}.png`);
  await spawn("convert", [
    inputPath,
    "-thumbnail",
    "40x40^",
    "-gravity",
    "center",
    "-crop",
    "40x40+0+0",
    thumbnailPath,
  ]);
  const remotePath = `thumbnails/${name}.png`;
  await uploadFile(thumbnailPath, remotePath);
  return remotePath;
};

export const createThumbnailFromVideo = (
  name: string,
  inputPath: string,
  frameIntervalInSeconds: number
) =>
  new Promise<string>(async (resolve, reject) => {
    const outputPath = tempFilePath(`thumbnail_${name}.mp4`);
    const thumbnailPath = `thumbnails/${name}.mp4`;
    const handleConversionEnd = async () => {
      await uploadFile(outputPath, thumbnailPath);
      resolve(thumbnailPath);
    };
    ffmpeg()
      .setFfmpegPath(ffmpegPath)
      .input(inputPath)
      .outputOptions([`-vf fps=1/${frameIntervalInSeconds}`])
      .output(outputPath)
      .on("end", handleConversionEnd)
      .on("error", reject)
      .run();
    return outputPath;
  });
