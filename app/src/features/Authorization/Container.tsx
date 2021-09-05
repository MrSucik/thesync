import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  video: {
    zIndex: -1,
    objectFit: "cover",
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
  },
  title: {
    margin: -240,
    fontSize: "16rem",
    fontWeight: "bold",
    color: "rgba(100, 100, 100, 0.2)",
    letterSpacing: 16,
    textTransform: "uppercase",
  },
}));

const Container: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>
        the syncoli the syncoli the syncoli the syncoli the syncoli the syncoli the syncoli the syncoli
        the syncoli the syncoli the syncoli the syncoli the syncoli the syncoli the syncoli the syncoli
        the syncoli the syncoli the syncoli the syncoli
      </Typography>
      {children}
      <video className={classes.video} autoPlay loop muted>
        <source src="./authentication-background.mp4" type="video/mp4" />
      </video>
    </Box>
  );
};

export default Container;
