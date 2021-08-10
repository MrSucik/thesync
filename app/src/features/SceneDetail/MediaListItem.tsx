import { Avatar, ListItemAvatar } from "@material-ui/core";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ListItem from "../../components/ListItem";
import { ListItemText } from "../../components/ListItemText";
import { MediaModel } from "../../definitions";
import { useDownloadURL } from "../../hooks/useDownloadURL";
import SceneDuration from "../Scenes/SceneDuration";
import MediaListItemActions from "./MediaListItemActions";

const MediaListItem: React.FC<{ media: MediaModel; index: number }> = ({
  media,
  index,
}) => {
  const url = useDownloadURL(media.file);
  return (
    <Draggable draggableId={media.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem style={{ paddingRight: 86 }}>
            <ListItemAvatar>
              <Avatar src={url} />
            </ListItemAvatar>
            <ListItemText
              primary={media.name}
              secondaryTypographyProps={{ component: "span" }}
              secondary={<SceneDuration mediaList={[media]} />}
            />
            <MediaListItemActions media={media} />
          </ListItem>
        </div>
      )}
    </Draggable>
  );
};

export default MediaListItem;
