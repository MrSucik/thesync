import React from "react";
import { Box } from "@mui/material";
interface Props {
  height?: number;
  position?: "bottom" | "top";
}

const Overlay: React.FC<Props> = ({
  children,
  height = 64,
  position = "top",
}) => {
  return (
    <Box
      sx={{
        background: `linear-gradient(${
          position === "top" ? "0" : "180deg"
        }, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.7) 100%)`,
        height,
        display: "flex",
        alignItems: "center",
        padding: 2,
        zIndex: 99,
      }}>
      {children}
    </Box>
  );
};

export default Overlay;
