import { IconButton, ListItemSecondaryAction } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import RoundedImage from "../../components/RoundedImage";
import Tooltip from "../../components/Tooltip";
import { MediaModel } from "../../definitions";
import { useCurrentScene } from "../../hooks/useCurrentScene";
import { getIconSourceSvg } from "../../utils/icons";
import {
  setActiveStep,
  setContentOpen,
  setContentType,
  setUpdatingMedia,
} from "../Content/contentSlice";

const MediaListItemActions: React.FC<{ media: MediaModel }> = ({ media }) => {
  const firestore = useFirestore();
  const scene = useCurrentScene();
  const dispatch = useDispatch();
  const handleConfigureClick = () => {
    dispatch(setContentOpen(true));
    dispatch(setContentType("existing"));
    dispatch(setActiveStep(2));
    dispatch(
      setUpdatingMedia({
        ...media,
        backgroundColor: media.backgroundColor || scene.backgroundColor,
      })
    );
  };
  const handleDeleteClick = () => {
    firestore.delete(`media/${media.id}`);
    firestore.update(`scenes/${scene.id}`, {
      mediaList: scene.mediaList.filter(m => m !== media.id),
    });
  };
  return (
    <ListItemSecondaryAction>
      <Tooltip title="Konfigurovat">
        <IconButton onClick={handleConfigureClick} size="small">
          <RoundedImage src={getIconSourceSvg("settings")} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Odstranit">
        <IconButton onClick={handleDeleteClick} size="small">
          <RoundedImage src={getIconSourceSvg("delete")} />
        </IconButton>
      </Tooltip>
    </ListItemSecondaryAction>
  );
};

export default MediaListItemActions;
