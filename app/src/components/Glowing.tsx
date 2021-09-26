import React from "react";
import { styled } from "@mui/styles";
import { Box, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const PREFIX = "Glowing";

const classes = {
  "@keyframes glow": `${PREFIX}-undefined`,
  glowing: `${PREFIX}-glowing`,
  sideMargin: `${PREFIX}-sideMargin`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  [`& .${classes["@keyframes glow"]}`]: {
    from: {
      boxShadow: "0 0 20px 4px #b79797",
    },
    to: {
      boxShadow: "0 0 20px 2px #b79797",
    },
  },

  [`&.${classes.glowing}`]: {
    position: "absolute",
    inset: 0,
    boxShadow: "0 0 20px 4px #b79797",
    animation: "$glow 1s infinite alternate",
  },

  [`& .${classes.sideMargin}`]: {
    margin: theme.spacing(0, 1),
  },
}));

interface Props {
  sideMargin?: boolean;
}

const Glowing: React.FC<Props> = ({ sideMargin }) => {
  return (
    <StyledBox
      className={clsx(classes.glowing, sideMargin && classes.sideMargin)}
    />
  );
};

export default Glowing;
