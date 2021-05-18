import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "../../components/Tooltip";
import { MediaModel } from "../../definitions";
import { RootState } from "../../store";
import { setActiveMediaIndex } from "../../store/slices/preview";
import Progress from "./Progress";

interface Props {
  media: MediaModel;
  index: number;
}

const ProgressBarItem: React.FC<Props> = ({ index, media }) => {
  const activeMediaIndex = useSelector<RootState, number>(
    (state) => state.preview.activeMediaIndex
  );
  const currentMediaIndex = useSelector<RootState, number>((state) =>
    state.preview.previewMediaList.indexOf(media.id)
  );
  const state =
    index < activeMediaIndex
      ? "full"
      : index === activeMediaIndex
      ? "running"
      : "empty";
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setActiveMediaIndex(currentMediaIndex));
  };
  return (
    <Box onClick={handleClick}>
      <Progress duration={media.duration} state={state} />
      <Typography
        style={{
          cursor: "pointer",
          fontFamily: "Roboto",
          textAlign: "center",
          fontWeight: 500,
          padding: 4,
          fontSize: window.outerHeight > 1080 ? 24 : 14,
          color: state === "running" ? "white" : "rgba(220, 220, 220, 0.5)",
          overflow: "hidden",
        }}
      >
        {media.name.length > 32 ? (
          <Tooltip title={media.name}>
            <span>{media.name.substr(0, 24)}...</span>
          </Tooltip>
        ) : (
          <span>{media.name}</span>
        )}
      </Typography>
    </Box>
  );
};

export default ProgressBarItem;
