import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { MediaModel } from "../../definitions";
import { getIconSource } from "../../utils/icons";

const SceneDuration: React.FC<{ mediaList: MediaModel[] }> = ({
  mediaList,
}) => {
  const duration =
    mediaList.reduce((prev, curr) => prev + parseFloat(curr.duration + ""), 0) +
    " s";
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar sx={{ height: 24, width: 24 }} src={getIconSource("clock")} />
      <Typography>{duration}</Typography>
    </Box>
  );
};

export default SceneDuration;
