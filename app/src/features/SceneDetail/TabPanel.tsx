import React from "react";
import { Box } from "@mui/material";

const TabPanel: React.FC<{ index: number | string; value: number | string }> =
  ({ children, value, index, ...other }) => (
    <Box role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ overflow: "auto", padding: 1 }}>{children}</Box>
      )}
    </Box>
  );

export default TabPanel;
