import { Avatar, Box, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { MediaModel } from "../../definitions";
import { getIconSource } from "../../utils/icons";

const Container = withStyles({
  root: { display: "flex", alignItems: "center", gap: 8 },
})(Box);
const SmallAvatar = withStyles({ root: { height: 18, width: 18 } })(Avatar);

const SceneDuration: React.FC<{ mediaList: MediaModel[] }> = ({
  mediaList,
}) => {
  const duration =
    mediaList.reduce((prev, curr) => prev + parseFloat(curr.duration + ""), 0) +
    " s";
  return (
    <Container component="span">
      <SmallAvatar src={getIconSource("clock")} />
      <Typography>{duration}</Typography>
    </Container>
  );
};

export default SceneDuration;
