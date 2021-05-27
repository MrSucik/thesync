import { Box, TextField, withStyles } from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "../../../store";
import { setPreviewMediaList } from "../../../store/slices/preview";
import { setPreviewMediaId, updateUpdatingMediaLmao } from "../contentSlice";
import NextBackButtons from "../NextBackButtons";

const Container = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    padding: 8,
  },
})(Box);

const MediaUpdateStage = () => {
  const dispatch = useDispatch();
  const media = useSelector((state) => state.content.updatingMedia);
  const durationVisible = media.fileType === "image";
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateUpdatingMediaLmao({ [event.target.name]: event.target.value })
    );
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
        />
        {durationVisible && (
          <TextField
            name="duration"
            type="number"
            label="Doba trvání (s)"
            variant="filled"
            value={media.duration}
            onChange={handleChange}
          />
        )}
        <ColorPicker
          inputRef={ref}
          value={media.backgroundColor}
          onChange={(color) =>
            color &&
            dispatch(updateUpdatingMediaLmao({ backgroundColor: color + "" }))
          }
          variant="filled"
          label="Barva pozadí"
        />
      </Container>
      <NextBackButtons backHidden onNextClick={hanleNextClick} />
    </>
  );
};

export default MediaUpdateStage;
