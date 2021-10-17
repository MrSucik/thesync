import * as path from "path";
import { tempFilePath } from "../utils/os";
import { uploadFile } from "../firebase/storage";
import { maxHeight } from "../constants";
import Image from "./Image";

export default class ImageSlicer extends Image {
  constructor(imagePath: string) {
    super(imagePath);
  }

  async createSlices() {
    await this.load();
    const { neededSlices, sliceHeight } = this.calculateSlicesDetails();
    const files: string[] = [];
    for (let index = 0; index < neededSlices; index++) {
      const remoteFile = await this.createSlice(index, sliceHeight);
      files.push(remoteFile);
    }
    return files;
  }

  private async createSlice(index: number, sliceHeight: number) {
    const sliceFileName = this.createSliceFileName(index);
    const localFile = tempFilePath(sliceFileName);
    const cropArea = this.createCropArea(index, sliceHeight);
    await this.image?.extract(cropArea).toFile(localFile);
    const remoteFile = `cropped/${sliceFileName}`;
    await uploadFile(localFile, remoteFile);
    return remoteFile;
  }

  private calculateSlicesDetails() {
    const height = this.metadata?.height as number;
    const neededSlices = Math.ceil(height / maxHeight);
    const sliceHeight = Math.floor(height / neededSlices);
    return { neededSlices, sliceHeight };
  }

  private createCropArea(index: number, sliceHeight: number) {
    return {
      width: this.metadata?.width as number,
      height: sliceHeight,
      left: 0,
      top: index * sliceHeight,
    };
  }

  private createSliceFileName(index: number) {
    return `cropped_${index}_${path.basename(this.imagePath)}`;
  }
}
