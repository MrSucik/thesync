import {
  Avatar,
  FormGroup,
  FormLabel,
  ListItemAvatar,
  withStyles,
} from "@material-ui/core";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { List } from "../../../components/List";
import ListItem from "../../../components/ListItem";
import { ListItemText } from "../../../components/ListItemText";
import { MediaModel } from "../../../definitions";
import { useDownloadURL } from "../../../hooks/useDownloadURL";
import { useSelector } from "../../../store";
import { setActiveStep, setUpdatingMedia } from "../contentSlice";
import NextBackButtons from "../NextBackButtons";

const Container = withStyles({
  root: { padding: "0 32px" },
})(FormGroup);

const ListIt: React.FC<{
  media: MediaModel;
  onClick: () => void;
}> = ({ media, onClick }) => {
  const url = useDownloadURL(media.file);
  return (
    <ListItem onClick={onClick} button>
      <ListItemAvatar>
        <Avatar src={url} />
      </ListItemAvatar>
      <ListItemText primary={media.name} />
    </ListItem>
  );
};

const ChooseExistingStage = () => {
  const media = useSelector<MediaModel[]>(
    (state) => state.firestore.ordered.media
  );
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const createClickHandler = (id: string) => async () => {
    const selected = media.find((x) => x.id === id);
    const copy = {
      ...selected,
      name: selected?.name + " - kopie",
    };
    delete copy.id;
    delete copy.created;
    const newDoc = await firestore.add("media", {
      ...selected,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(setUpdatingMedia({ ...copy, id: newDoc.id }));
    dispatch(setActiveStep(2));
  };
  return (
    <>
      <Container>
        <FormLabel component="legend">Kopírovat položku</FormLabel>
        <List>
          {media.map((med) => (
            <ListIt
              key={med.id}
              media={med}
              onClick={createClickHandler(med.id)}
            />
          ))}
        </List>
      </Container>
      <NextBackButtons nextHidden />
    </>
  );
};

export default ChooseExistingStage;
