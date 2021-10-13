import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { List } from "../../components/List";
import { MediaModel } from "../../definitions";
import { useCurrentScene } from "../../hooks/useCurrentScene";
import { RootState } from "../../store";
import { setOptimisticReorderUpdate } from "../../store/slices/app";
import MediaListItem from "./MediaListItem";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Box } from "@mui/material";
import { setContentOpen } from "../../features/Content/contentSlice";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Content = () => {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const scene = useCurrentScene();
  const mediaList = useSelector<RootState, MediaModel[]>(state =>
    scene?.mediaList
      ? scene.mediaList.map((m: string) => ({
          id: m,
          ...state.firestore.data.media[m],
        }))
      : []
  );
  const handleMediaDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    const reordered = reorder(
      mediaList.map(x => x.id),
      result.source.index,
      result.destination.index
    );
    dispatch(
      setOptimisticReorderUpdate({
        sceneId: scene.id,
        mediaList: reordered,
      })
    );
    await firestore.update(`scenes/${scene.id}`, { mediaList: reordered });
    dispatch(setOptimisticReorderUpdate(null));
  };
  const handleAddContentClick = () => dispatch(setContentOpen(true));
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <PrimaryButton onClick={handleAddContentClick}>
        přidat obsah
      </PrimaryButton>
      <DragDropContext onDragEnd={handleMediaDragEnd}>
        <Droppable droppableId="scene">
          {provided => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              {mediaList.map((media, index) => (
                <MediaListItem key={media.id} index={index} media={media} />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default Content;
