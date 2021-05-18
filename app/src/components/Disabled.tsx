import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(10, 10, 10, 0.5)",
    zIndex: 10,
  },
}));

const Disabled: React.FC = () => {
  const classes = useStyles();
  return <Box className={classes.container} />;
};

export default Disabled;
