import { downloadFile } from "../firebase/storage";
import Image from "./Image";

export default class OnlineImage extends Image {
  downloadURL: string;
  constructor(downloadURL: string) {
    super("");
    this.downloadURL = downloadURL;
  }

  async downloadFile() {
    const destination = await downloadFile(this.downloadURL);
    this.imagePath = destination;
  }
}
