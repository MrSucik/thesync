import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MediaModel } from "../../definitions";
import { RootState } from "../../store";
import MediaPreview from "./MediaPreview";
import {
  nextInnerMedia,
  nextMedia,
  PreviewState,
} from "../../store/slices/preview";
import TimedPreview from "./TimedPreview";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";

const MediaPreviewPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { activeMediaIndex, activeInnerMediaIndex, previewMediaList } =
    useSelector<RootState, PreviewState>(state => state.preview);
  const mediaList = useSelector<RootState, MediaModel[]>(state =>
    previewMediaList.map(id => state.firestore.data.media[id])
  );
  const handleMediaEnded = useCallback(() => dispatch(nextMedia()), [dispatch]);
  const handleInnerMediaEnded = useCallback(
    () => dispatch(nextInnerMedia()),
    [dispatch]
  );
  useEffect(() => {
    const activeMedia = mediaList[activeMediaIndex];
    let interval = 0;
    if (activeMedia.fileType === "images" && activeMedia.files?.length) {
      interval = setInterval(() => {
        if (activeInnerMediaIndex === activeMedia.files?.length) {
          clearInterval(interval);
        } else {
          handleInnerMediaEnded();
        }
      }, (activeMedia.duration / activeMedia.files.length) * 1000) as unknown as number;
    }
    return () => clearInterval(interval);
  }, [activeMediaIndex]);
  return (
    <Box
      sx={{
        minHeight: "calc(100% - 96px - 64px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
        {mediaList.map((media, index) => (
          <TimedPreview
            key={media.id}
            timeout={media.duration}
            onTimeoutEnd={index === activeMediaIndex ? handleMediaEnded : null}>
            <MediaPreview
              key={previewMediaList[index]}
              media={{
                ...media,
                file:
                  media.fileType === "images"
                    ? media.files?.[activeInnerMediaIndex] || ""
                    : media.file,
              }}
              visible={index === activeMediaIndex}
            />
          </TimedPreview>
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default MediaPreviewPlayer;
