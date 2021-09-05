import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "../../../store";
import { setPreviewMediaList } from "../../../store/slices/preview";
import { screenHeight } from "../../../utils/constants";
import { setPreviewMediaId, updateUpdatingMediaLmao } from "../contentSlice";
import NextBackButtons from "../NextBackButtons";

const Container = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    padding: "1rem 3rem",
  },
})(Box);

const MediaUpdateStage = () => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.content.type);
  const media = useSelector((state) => state.content.updatingMedia);
  const firestore = useFirestore();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.value = "IIIIIIIIIIIIIIIIIIIIIIIIIIII";
    }
  }, []);
  const hanleNextClick = () => {
    const mediaId = media.id + "";
    firestore.update(`media/${mediaId}`, media);
    dispatch(setPreviewMediaId(mediaId));
    dispatch(setPreviewMediaList({ mediaList: [mediaId], type: "tab" }));
  };
  const updateMedia = (name: string, value: string) =>
    dispatch(updateUpdatingMediaLmao({ [name]: value }));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    updateMedia(event.target.name, event.target.value);

  const overflow = media?.height && media.height > screenHeight;
  console.log(overflow, media);

  return (
    <>
      <Container>
        <TextField
          name="name"
          label="Název"
          variant="filled"
          value={media.name}
          onChange={handleChange}
          disabled={Boolean(media.bakalariConfiguration)}
          fullWidth
        />
        {!overflow && (
          <TextField
            name="duration"
            type="number"
            label="Doba trvání (s)"
            variant="filled"
            value={media.duration}
            onChange={handleChange}
            fullWidth
          />
        )}
        {!overflow && !type?.startsWith("bakalari") && (
          <FormControl variant="filled" fullWidth>
            <InputLabel id="layout-select-label">Rozložení</InputLabel>
            <Select
              labelId="layout-select-label"
              value={media.layout}
              onChange={(event) =>
                updateMedia("layout", event.target.value as string)
              }
            >
              <MenuItem value="center">Na střed</MenuItem>
              <MenuItem value="fill-width">Vyplnit na šířku</MenuItem>
              <MenuItem value="fill-height">Vyplnit na výšku</MenuItem>
            </Select>
          </FormControl>
        )}
        <ColorPicker
          inputRef={ref}
          value={media.backgroundColor}
          onChange={(color) =>
            color && updateMedia("backgroundColor", color + "")
          }
          variant="filled"
          label="Barva pozadí"
          fullWidth
        />
      </Container>
      <NextBackButtons backHidden onNextClick={hanleNextClick} />
    </>
  );
};

export default MediaUpdateStage;
