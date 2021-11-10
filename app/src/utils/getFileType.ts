export const getFileType = (type: string) => {
  switch (type) {
    case "image/jpeg":
    case "image/gif":
    case "image/png":
      return "image";
    case "video/mp4":
    case "video/x-matroska":
      return "video";
    default:
      return undefined;
  }
};
