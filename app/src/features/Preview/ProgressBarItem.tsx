import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import Tooltip from "components/Tooltip";
import { MediaModel } from "definitions";
import { useSelector } from "store/useSelector";
import { setActiveMediaIndex } from "store/slices/preview";
import Progress from "./Progress";

interface Props {
  media: MediaModel;
  index: number;
}

const ProgressBarItem: React.FC<Props> = ({ index, media }) => {
  const activeMediaIndex = useSelector(state => state.preview.activeMediaIndex);
  const currentMediaIndex = useSelector(state =>
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
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(255, 255, 255, 0.1)",
        }}
      />
      <Typography
        style={{
          cursor: "pointer",
          fontFamily: "Roboto",
          textAlign: "center",
          fontWeight: 500,
          padding: 4,
          fontSize: 21,
          color: "white",
          overflow: "hidden",
        }}>
        {media.name.length > 32 ? (
          <Tooltip title={media.name}>
            <span>{media.name.substr(0, 32)}...</span>
          </Tooltip>
        ) : (
          <span>{media.name}</span>
        )}
      </Typography>
    </Box>
  );
};

export default ProgressBarItem;
