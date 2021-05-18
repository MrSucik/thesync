import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  "@keyframes glow": {
    from: {
      boxShadow: "0 0 20px 4px #b79797",
    },
    to: {
      boxShadow: "0 0 20px 2px #b79797",
    },
  },
  glowing: {
    position: "absolute",
    inset: 0,
    boxShadow: "0 0 20px 4px #b79797",
    animation: "$glow 1s infinite alternate",
  },
  sideMargin: {
    margin: theme.spacing(0, 1),
  },
}));

interface Props {
  sideMargin?: boolean;
}

const Glowing: React.FC<Props> = ({ sideMargin }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.glowing, sideMargin && classes.sideMargin)} />
  );
};

export default Glowing;
