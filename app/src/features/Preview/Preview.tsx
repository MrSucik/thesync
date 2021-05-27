import { Box, withStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { MediaModel } from "../../definitions";
import { RootState } from "../../store";
import ProgressBar from "./ProgressBar";
import { PreviewState } from "../../store/slices/preview";
import PlayNextPrevious from "./PlayNext";
import MediaPreviewPlayer from "./MediaPreviewPlayer";
import { useCurrentScene } from "../../hooks/useCurrentScene";

interface Props {
  disableControls?: boolean;
}

const PreviewContainer = withStyles({
  root: {
    height: "100%",
    maxWidth: "100%",
    aspectRatio: "9 / 16",
    margin: "auto",
    boxSizing: "border-box",
    color: "#e6e6e6",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
})(Box);

const Preview: React.FC<Props> = ({ disableControls }) => {
  const { activeMediaIndex, previewMediaList } = useSelector<
    RootState,
    PreviewState
  >((state) => state.preview);
  const selectedScene = useCurrentScene();
  const mediaList = useSelector<RootState, MediaModel[]>((state) =>
    previewMediaList
      .filter((x) => Object.keys(state.firestore.data.media).includes(x))
      .map((id) => state.firestore.data.media[id])
  );
  const media = mediaList[activeMediaIndex];
  return !media ? null : (
    <PreviewContainer
      style={{
        backgroundColor: media.backgroundColor || selectedScene.backgroundColor,
        cursor: disableControls ? "none" : "auto",
        transition: "all 300ms ease-in-out",
      }}
    >
      <ProgressBar />
      {!disableControls && previewMediaList.length !== 1 && (
        <>
          <PlayNextPrevious type="previous" />
          <PlayNextPrevious type="next" />
        </>
      )}
      <MediaPreviewPlayer />
    </PreviewContainer>
  );
};

export default Preview;
