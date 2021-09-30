import * as path from "path";
import * as sharp from "sharp";
import { tempFilePath } from "../utils/os";
import { downloadFile, uploadFile } from "../firebase/storage";
import { maxHeight } from "../constants";

export const cutImageToSlicesInternal = async (file: string) => {
  const { destination, height, width } = await downloadWithMetadata(file);
  const image = sharp(destination);
  const neededSlices = Math.ceil(height / maxHeight);
  const sliceHeight = Math.floor(height / neededSlices);
  const files: string[] = [];
  for (let index = 0; index < neededSlices; index++) {
    const sliceFileName = `cropped_${index}_${path.basename(file)}`;
    const localFile = tempFilePath(sliceFileName);
    await image
      .extract({
        width,
        height: sliceHeight,
        left: 0,
        top: index * sliceHeight,
      })
      .toFile(localFile);
    const remoteFile = `cropped/${sliceFileName}`;
    await uploadFile(localFile, remoteFile);
    files.push(remoteFile);
  }
  return files;
};

export const getImageMetadata = async (localFile: string) => {
  const { width, height } = await sharp(localFile).metadata();
  return { width: width || 0, height: height || 0, destination: localFile };
};

export const downloadWithMetadata = async (requestedFile: string) => {
  const destination = await downloadFile(requestedFile);
  return await getImageMetadata(destination);
};

// const processLocalImage = async (
//   tempPath: string,
//   onProgress: (progress: number) => void
// ): Promise<ConversionResult> => {
//   const tempProcessedPath = tempFilePath(
//     `converted_${path.basename(tempPath)}`
//   );
//   const resizedImage = await sharp(tempPath)
//     .resize({ fit: "contain", width: 1080 })
//     .toFile(tempProcessedPath);
//   if (resizedImage.height <= 1920) {
//     const processedPath = `processed/${path.basename(tempPath)}`;
//     await uploadFile(tempProcessedPath, processedPath);
//     return {
//       type: "image",
//       source: processedPath,
//     };
//   } else {
//     return {
//       type: "video",
//       source: await processScrollingVideo(
//         tempProcessedPath,
//         resizedImage.height,
//         onProgress
//       ),
//     };
//   }
// };

// const processMedia = async (
//   name: string,
//   inputPath: string,
//   onProgress: (progress: number) => void
// ): Promise<{ source: string; type: string; thumbnail: string }> => {
//   const tempPath = tempFilePath(path.basename(inputPath));
//   await bucket.file(inputPath).download({ destination: tempPath });
//   // TODO: Create proper validation
//   if (inputPath.endsWith("mp4")) {
//     return {
//       type: "video",
//       source: inputPath,
//       thumbnail: await createThumbnailFromVideo(name, tempPath, 10),
//     };
//   }
//   return {
//     thumbnail: await createThumbnailFromImage(name, tempPath),
//     ...(await processLocalImage(tempPath, onProgress)),
//   };
// };

// const processScrollingVideo = (
//   inputPath: string,
//   inputHeight: number,
//   onProgress: (progress: number) => void
// ) =>
//   new Promise<string>((resolve, reject) => {
//     const tempPath = tempFilePath(
//       `processed_${path.parse(inputPath).name}.mp4`
//     );
//     const outputPath = `processed/${path
//       .parse(inputPath)
//       .name.replace(/converted_/gi, "")}.mp4`;
//     const handleConversionEnd = async () => {
//       await uploadFile(tempPath, outputPath);
//       resolve(outputPath);
//     };
//     ffmpeg()
//       .setFfmpegPath(ffmpegPath)
//       .input(inputPath)
//       .inputOption("-loop 1")
//       .videoFilter("crop=1080:1920:0:n")
//       .frames(inputHeight - 1920)
//       .on("error", reject)
//       .on("progress", (progress) =>
//         onProgress((progress.frames / (inputHeight - 1920)) * 100)
//       )
//       .on("end", handleConversionEnd)
//       .save(tempPath);
//   });
