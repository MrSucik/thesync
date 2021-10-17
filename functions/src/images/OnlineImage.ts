import { downloadFile } from "../firebase/storage";
import Image from "./Image";

export default class OnlineImage extends Image {
  localFile: string;
  constructor(imagePath: string) {
    super(imagePath);
    this.localFile = "";
  }

  async downloadFile() {
    const destination = await downloadFile(this.imagePath);
    this.localFile = destination;
    await this.load(this.localFile);
  }
}
