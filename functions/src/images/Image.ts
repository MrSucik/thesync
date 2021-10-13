import sharp, { Channels, ColourspaceEnum, FormatEnum, Sharp } from "sharp";

interface Metadata {
  /** Number value of the EXIF Orientation header, if present */
  orientation?: number;
  /** Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg */
  format?: keyof FormatEnum;
  /** Total size of image in bytes, for Stream and Buffer input only */
  size?: number;
  /** Number of pixels wide (EXIF orientation is not taken into consideration) */
  width: number;
  /** Number of pixels high (EXIF orientation is not taken into consideration) */
  height: number;
  /** Name of colour space interpretation */
  space?: keyof ColourspaceEnum;
  /** Number of bands e.g. 3 for sRGB, 4 for CMYK */
  channels?: Channels;
  /** Name of pixel depth format e.g. uchar, char, ushort, float ... */
  depth?: string;
  /** Number of pixels per inch (DPI), if present */
  density?: number;
  /** String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK */
  chromaSubsampling: string;
  /** Boolean indicating whether the image is interlaced using a progressive scan */
  isProgressive?: boolean;
  /** Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP */
  pages?: number;
  /** Number of pixels high each page in a multi-page image will be. */
  pageHeight?: number;
  /** Number of times to loop an animated image, zero refers to a continuous loop. */
  loop?: number;
  /** Delay in ms between each page in an animated image, provided as an array of integers. */
  delay?: number[];
  /**  Number of the primary page in a HEIF image */
  pagePrimary?: number;
  /** Boolean indicating the presence of an embedded ICC profile */
  hasProfile?: boolean;
  /** Boolean indicating the presence of an alpha transparency channel */
  hasAlpha?: boolean;
  /** Buffer containing raw EXIF data, if present */
  exif?: Buffer;
  /** Buffer containing raw ICC profile data, if present */
  icc?: Buffer;
  /** Buffer containing raw IPTC data, if present */
  iptc?: Buffer;
  /** Buffer containing raw XMP data, if present */
  xmp?: Buffer;
  /** Buffer containing raw TIFFTAG_PHOTOSHOP data, if present */
  tifftagPhotoshop?: Buffer;
}

export default class Image {
  imagePath: string;
  image: Sharp;
  metadata: Metadata;

  constructor(imagePath: string) {
    this.imagePath = imagePath;
    this.image = sharp(imagePath);
    this.metadata = { height: 0, width: 0, chromaSubsampling: "4:4:4" };
  }

  async verifyLoaded() {
    if (!this.metadata.height) {
      const metadata = await this.image.metadata();
      this.metadata = {
        ...metadata,
        height: metadata.height || 0,
        width: metadata.width || 0,
      };
    }
  }
}
