import { tempFilePath } from "../utils/os";
import { uploadFile } from "../firebase/storage";
import OnlineImage from "./OnlineImage";

export default class ResizableImage extends OnlineImage {
  constructor(imagePath: string) {
    super(imagePath);
  }
  async shrinkWidth(maxWidth = 1080) {
    await this.downloadFile();
    const newLocalFile = tempFilePath(this.imagePath, "resized-");
    await this.image
      ?.resize({
        withoutEnlargement: true,
        width: maxWidth,
        fit: "contain",
      })
      .toFile(newLocalFile);
    await uploadFile(newLocalFile, this.imagePath);
    await this.downloadFile();
    console.log(this.metadata);

  }
}
