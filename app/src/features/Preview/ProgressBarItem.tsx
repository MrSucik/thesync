import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "../../components/Tooltip";
import { MediaModel } from "../../definitions";
import { RootState } from "../../store";
import { setActiveMediaIndex } from "../../store/slices/preview";

import styled, { keyframes, css } from "styled-components";

interface Props {
  media: MediaModel;
  index: number;
}

const scroll = keyframes`
from {
  width: 0
}
to {
  width: 100%
}
`;

const animation = (props: { duration: number; state: string }) =>
  css`
    ${scroll} ${props.duration}s linear forwards
  `;

const ProgressAnimation = styled.img`
  height: 2px;
  background: white;
  animation: ${(props: { duration: number; state: string }) =>
    props.state === "running" ? animation(props) : ""};
  width: ${(props: { duration: number; state: string }) =>
    props.state === "full" ? "100%" : ""};
  will-change: width;
`;

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
      {/* <Progress duration={media.duration} state={state} /> */}
      <ProgressAnimation state={state + ""} duration={media.duration} />
      <Typography
        style={{
          cursor: "pointer",
          fontFamily: "Roboto",
          textAlign: "center",
          fontWeight: 500,
          padding: 4,
          fontSize: window.outerHeight > 1080 ? 18 : 10,
          color: state === "running" ? "white" : "rgba(220, 220, 220, 0.5)",
          overflow: "hidden",
        }}
      >
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
