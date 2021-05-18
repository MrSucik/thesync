import React from "react";
import { Box, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    overlay: (props: Props) => ({
      // background: `linear-gradient(${
      //   props.position === "top" ? "0" : "180deg"
      // }, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.7) 100%)`,
      height: props.height,
      display: "flex",
      alignItems: "center",
      padding: 16,
      zIndex: 99,
    }),
  })
);

interface Props {
  height?: number;
  position?: "bottom" | "top";
}

const Overlay: React.FC<Props> = ({
  children,
  height = 64,
  position = "top",
}) => {
  const classes = useStyles({ height, position });
  return <Box className={classes.overlay}>{children}</Box>;
};

export default Overlay;
