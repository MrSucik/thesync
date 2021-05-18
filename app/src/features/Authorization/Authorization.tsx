import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import Container from "./Container";
import LoginButton from "./LoginButton";

const useStyles = makeStyles(() => ({
  buttonContainer: {
    transform: "translate(-50%, -50%)",
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));

const Authorization: React.FC = () => {
  const classes = useStyles();
  return (
    <Container>
      <Box className={classes.buttonContainer}>
        <LoginButton />
      </Box>
    </Container>
  );
};

export default Authorization;
