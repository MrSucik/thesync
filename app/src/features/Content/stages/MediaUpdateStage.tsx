import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import CustomColorPicker from "components/CustomColorPicker";
import { useCurrentScene } from "hooks/useCurrentScene";
import { setPreviewMediaList } from "store/slices/preview";
import { useSelector } from "store/useSelector";
import { setPreviewMediaId, updateUpdatingMediaLmao } from "../contentSlice";
import NextBackButtons from "../NextBackButtons";

const MediaUpdateStage = () => {
  const dispatch = useDispatch();
  const defaultBackground = useCurrentScene().backgroundColor;
  const type = useSelector(state => state.content.type);
  const media = useSelector(state => state.content.updatingMedia);
  const firestore = useFirestore();

  // TODO: Add error handling
  const handleNextClick = async () => {
    const mediaId = media.id as string;
    await firestore.update(`media/${mediaId}`, media);
    dispatch(setPreviewMediaId(mediaId));
    dispatch(setPreviewMediaList({ mediaList: [mediaId], type: "tab" }));
  };

  const updateMedia = (name: string, value: string) =>
    dispatch(updateUpdatingMediaLmao({ [name]: value }));

  // TODO: Verify this when jumping from custom to back default
  const transformBackgroundEvent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value =
      !event.target.value || event.target.value === defaultBackground
        ? ""
        : event.target.value;
    handleChange(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    updateMedia(event.target.name, event.target.value);

  const overflow = false; // media?.height && media.height > screenHeight;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        padding: "1rem 3rem",
      }}>
      <Box>
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
        {false && !overflow && !type?.startsWith("bakalari") && (
          <FormControl variant="filled" fullWidth>
            <InputLabel id="layout-select-label">Rozložení</InputLabel>
            <Select
              labelId="layout-select-label"
              value={media.layout}
              onChange={event =>
                updateMedia("layout", event.target.value as string)
              }>
              <MenuItem value="center">Na střed</MenuItem>
              <MenuItem value="fill-width">Vyplnit na šířku</MenuItem>
              <MenuItem value="fill-height">Vyplnit na výšku</MenuItem>
            </Select>
          </FormControl>
        )}
        <CustomColorPicker
          name="backgroundColor"
          value={media.backgroundColor || defaultBackground}
          onChange={transformBackgroundEvent}
          label="Barva pozadí"
        />
      </Box>
      <NextBackButtons backHidden onNextClick={handleNextClick} />
    </Box>
  );
};

export default MediaUpdateStage;
