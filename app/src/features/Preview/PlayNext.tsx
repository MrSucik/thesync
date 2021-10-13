import React from "react";
import { Icon, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { nextMedia, previousMedia } from "../../store/slices/preview";

interface Props {
  type: "next" | "previous";
}

const PlayNextPrevious: React.FC<Props> = ({ type }) => {
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch(type === "next" ? nextMedia() : previousMedia());
  return (
    <IconButton
      sx={{
        zIndex: 99,
        left: type === "previous" ? 0 : undefined,
        right: type === "next" ? 0 : undefined,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        color: "white",
      }}
      onClick={handleClick}
      size="large">
      <Icon>{type === "next" ? "chevron_right" : "chevron_left"}</Icon>
    </IconButton>
  );
};

export default PlayNextPrevious;
