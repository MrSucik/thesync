import { Box } from "@mui/material";
import React from "react";
import MuiListItem from "../../components/ListItem";
import { ListItemText } from "../../components/ListItemText";
import { Scene } from "../../definitions";
import SceneDevices from "./SceneDevices";
import SceneDuration from "./SceneDuration";
import StackedMedia from "./StackedMedia";

const SceneListItem: React.FC<{
  scene: Scene;
  selected: boolean;
  onClick: () => void;
}> = ({ scene: { devicesList, mediaList, name }, selected, onClick }) => (
  <MuiListItem
    sx={{
      justifyContent: "space-between",
      gap: 4,
      cursor: "pointer",
      margin: "0 4px",
      width: "auto",
      boxShadow: selected ? "0 0 0 3px #fff" : undefined,
    }}
    onClick={onClick}
  >
    <Box
      sx={{ alignSelf: "stretch", display: "flex", flexDirection: "column" }}
    >
      <ListItemText
        primary={name}
        secondary={<SceneDuration mediaList={mediaList} />}
        secondaryTypographyProps={{ component: "span" }}
      />
      <SceneDevices devices={devicesList} />
    </Box>
    <StackedMedia mediaList={mediaList} />
  </MuiListItem>
);

export default SceneListItem;
