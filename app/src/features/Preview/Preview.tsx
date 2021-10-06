import { Box } from "@mui/material";
import { styled } from "@material-ui/core/styles";
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
    <Box
      sx={{
        width: 1080,
        height: 1920,
        transformOrigin: "left top",
        transform:
          window.innerHeight < 1500
            ? `scale(${(window.innerHeight - 200) / 1920})`
            : undefined,
        margin: "auto",
        boxSizing: "border-box",
        color: "#e6e6e6",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: media.backgroundColor || selectedScene.backgroundColor,
        transition: "all 300ms ease-in-out",
      }}
    >
      {!selectedScene.hideProgress && <ProgressBar />}
      {!disableControls && previewMediaList.length !== 1 && (
        <>
          <PlayNextPrevious type="previous" />
          <PlayNextPrevious type="next" />
        </>
      )}
      <MediaPreviewPlayer />
    </Box>
  );
};

export default Preview;
