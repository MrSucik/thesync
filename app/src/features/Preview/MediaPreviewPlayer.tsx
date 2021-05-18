import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MediaModel } from "../../definitions";
import { RootState } from "../../store";
import MediaPreview from "./MediaPreview";
import { nextMedia, PreviewState } from "../../store/slices/preview";
import TimedPreview from "./TimedPreview";
import { Box, withStyles } from "@material-ui/core";
import Footer from "../Footer/Footer";

const Container = withStyles({
  root: {
    minHeight: "calc(100% - 96px - 64px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
})(Box);

const MediaPreviewPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { activeMediaIndex, previewMediaList } = useSelector<
    RootState,
    PreviewState
  >((state) => state.preview);
  const mediaList = useSelector<RootState, MediaModel[]>((state) =>
    previewMediaList.map((id) => state.firestore.data.media[id])
  );
  const handleMediaEnded = () => dispatch(nextMedia());
  return (
    <>
      <Container>
        {mediaList.map((media, index) => (
          <TimedPreview
            key={media.id}
            id={media.id}
            timeout={media.duration}
            onTimeoutEnd={
              index === activeMediaIndex ? handleMediaEnded : () => {}
            }
          >
            <MediaPreview
              key={previewMediaList[index]}
              media={media}
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
