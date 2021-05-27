import React from "react";
import { createStyles, Icon, IconButton, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { nextMedia, previousMedia } from "../../store/slices/preview";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      color: "white",
      zIndex: 99,
    },
  })
);

interface Props {
  type: "next" | "previous";
}

const PlayNextPrevious: React.FC<Props> = ({ type }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch(type === "next" ? nextMedia() : previousMedia());
  return (
    <IconButton
      className={classes.icon}
      style={{
        right: type === "next" ? 0 : undefined,
        left: type === "previous" ? 0 : undefined,
      }}
      onClick={handleClick}
    >
      <Icon>{type === "next" ? "chevron_right" : "chevron_left"}</Icon>
    </IconButton>
  );
};

export default PlayNextPrevious;
