import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface Props {
  color?: "primary" | "secondary" | "inherit";
}

const Loading: React.FC<Props> = ({ color = "inherit" }) => (
  <Box
    sx={{
      position: "absolute",
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
      color: "white",
    }}>
    <CircularProgress color={color} />
  </Box>
);

export default Loading;
