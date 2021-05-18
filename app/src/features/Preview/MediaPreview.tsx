import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import { MediaModel } from "../../definitions";
import { useDownloadURL } from "../../hooks/useDownloadURL";

const useStyles = makeStyles(() =>
  createStyles({
    media: { height: "100%", width: " 100%", objectFit: "contain" },
  })
);

interface Props {
  visible: boolean;
  media: MediaModel;
}

const MediaPreview: React.FC<Props> = ({ media, visible }) => {
  const classes = useStyles();
  const downloadURL = useDownloadURL(media.file);
  return media.fileType === "image" ? (
    <img
      className={classes.media}
      style={{ display: visible ? "inline" : "none" }}
      src={downloadURL}
      alt={media.name}
    />
  ) : (
    <video
      className={classes.media}
      style={{ visibility: visible ? "visible" : "hidden" }}
      src={downloadURL}
      autoPlay
    />
  );
};

export default MediaPreview;
