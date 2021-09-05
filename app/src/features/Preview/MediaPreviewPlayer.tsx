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
import { Box, withStyles } from "@material-ui/core";
import Footer from "../Footer/Footer";

const Container = withStyles({
  root: {
    minHeight: "calc(100% - 96px - 64px)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
})(Box);

const MediaPreviewPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { activeMediaIndex, activeInnerMediaIndex, previewMediaList } =
    useSelector<RootState, PreviewState>((state) => state.preview);
  const mediaList = useSelector<RootState, MediaModel[]>((state) =>
    previewMediaList.map((id) => state.firestore.data.media[id])
  );
  const handleMediaEnded = useCallback(() => dispatch(nextMedia()), [dispatch]);
  const handleInnerMediaEnded = useCallback(
    () => dispatch(nextInnerMedia()),
    [dispatch]
  );
  useEffect(() => {
    const activeMedia = mediaList[activeMediaIndex];
    let interval: NodeJS.Timeout | null = null;
    if (activeMedia.fileType === "images") {
      interval = setInterval(() => {
        if (activeInnerMediaIndex === activeMedia.files!.length) {
          clearInterval(interval as NodeJS.Timeout);
        } else {
          handleInnerMediaEnded();
        }
      }, (activeMedia.duration / activeMedia.files!.length) * 1000);
    }
    return () => clearInterval(interval as NodeJS.Timeout);
  }, [activeMediaIndex]);
  return (
    <>
      <Container>
        {mediaList.map((media, index) => (
          <TimedPreview
            key={media.id}
            id={media.id}
            timeout={media.duration}
            onTimeoutEnd={index === activeMediaIndex ? handleMediaEnded : null}
          >
            <MediaPreview
              key={previewMediaList[index]}
              media={{
                ...media,
                file:
                  media.fileType === "images"
                    ? media.files![activeInnerMediaIndex]
                    : media.file,
              }}
              visible={index === activeMediaIndex}
            />
          </TimedPreview>
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default MediaPreviewPlayer;
