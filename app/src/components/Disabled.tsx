import React from "react";
import { Box } from "@mui/material";

const Disabled: React.FC = () => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(10, 10, 10, 0.5)",
      zIndex: 10,
    }}
  />
);

export default Disabled;
