const fps = 25;
const displayHeight = 1920;
const displayWidth = 1080;

export const needsProcessing = (url: string, type: "image" | "video") =>
  new Promise<{
    needsProcess: boolean;
    width: number;
    height: number;
    duration: string;
  }>((resolve) => {
    if (type === "image") {
      const image = new Image();
      image.addEventListener("load", () => {
        const updatedHeight =
          (displayWidth / image.naturalWidth) * image.naturalHeight;
        const needsProcess = updatedHeight > displayHeight;
        resolve({
          needsProcess,
          height: image.naturalHeight,
          width: image.naturalWidth,
          duration: needsProcess
            ? ((updatedHeight - displayHeight) / fps).toFixed()
            : "",
        });
      });
      image.src = url;
    } else {
      const video = document.createElement("video");
      video.ondurationchange = () =>
        resolve({
          needsProcess: false,
          height: video.videoHeight,
          width: video.videoWidth,
          duration: video.duration.toFixed(),
        });
      video.src = url;
    }
  });
