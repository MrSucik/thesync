import React from "react";
import { styled } from "@material-ui/core/styles";
import { Box } from "@mui/material";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

const PREFIX = "Overlay";

const classes = {
  overlay: `${PREFIX}-overlay`,
};
// TODO: add props height
const StyledBox = styled(Box)(() => ({
  [`&.${classes.overlay}`]: {
    // background: `linear-gradient(${
    //   props.position === "top" ? "0" : "180deg"
    // }, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.7) 100%)`,
    // height: props.height,
    display: "flex",
    alignItems: "center",
    padding: 16,
    zIndex: 99,
  },
}));

interface Props {
  height?: number;
  position?: "bottom" | "top";
}

const Overlay: React.FC<Props> = ({
  children,
  height = 64,
  position = "top",
}) => {
  return <StyledBox className={classes.overlay}>{children}</StyledBox>;
};

export default Overlay;
