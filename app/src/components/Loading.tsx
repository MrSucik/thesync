import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

interface Props {
  color?: "primary" | "secondary" | "inherit";
}

const Loading: React.FC<Props> = ({ color = "inherit" }) => (
  <Box
    style={{
      position: "absolute",
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
      color: "white",
    }}
  >
    <CircularProgress color={color} />
  </Box>
);

export default Loading;
