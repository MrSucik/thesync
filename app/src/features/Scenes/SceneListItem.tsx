import { Box, withStyles } from "@material-ui/core";
import React from "react";
import MuiListItem from "../../components/ListItem";
import { ListItemText } from "../../components/ListItemText";
import { Scene } from "../../definitions";
import SceneDevices from "./SceneDevices";
import SceneDuration from "./SceneDuration";
import StackedMedia from "./StackedMedia";

const ListItem = withStyles({
  root: {
    justifyContent: "space-between",
    gap: 32,
    cursor: "pointer",
    margin: "0 4px",
    width: "auto",
  },
})(MuiListItem);
const ListItemContent = withStyles({
  root: { alignSelf: "stretch", display: "flex", flexDirection: "column" },
})(Box);

const SceneListItem: React.FC<{
  scene: Scene;
  selected: boolean;
  onClick: () => void;
}> = ({ scene: { devicesList, mediaList, name }, selected, onClick }) => (
  <ListItem
    style={{ boxShadow: selected ? "0 0 0 3px #fff" : null }}
    onClick={onClick}
  >
    <ListItemContent>
      <ListItemText
        primary={name}
        secondary={<SceneDuration mediaList={mediaList} />}
        secondaryTypographyProps={{ component: "span" }}
      />
      <SceneDevices devices={devicesList} />
    </ListItemContent>
    <StackedMedia mediaList={mediaList} />
  </ListItem>
);

export default SceneListItem;
