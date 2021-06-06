import {
  Box,
  CircularProgress,
  Icon,
  Typography,
  withStyles,
} from "@material-ui/core";
import firebase from "firebase/app";
import { useState } from "react";
import { DropEvent, useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import {
  setActiveStep,
  setDurationVisible,
  updateUpdatingMediaLmao,
} from "../contentSlice";
import { v4 as uuid } from "uuid";
import { useSnackbar } from "notistack";
import NextBackButtons from "../NextBackButtons";
import { useFirestore } from "react-redux-firebase";

const getFileType = (type: string) => {
  console.log(type);
  switch (type) {
    case "image/jpeg":
    case "image/gif":
    case "image/png":
      return "image";
    case "video/mp4":
    case "video/x-matroska":
      return "video";
    default:
      return undefined;
  }
};

const Container = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    padding: 8,
  },
})(Box);

const Dropzone = withStyles({
  root: {
    cursor: "pointer",
    minWidth: 206,
    maxWidth: 300,
    backgroundColor: "#444",
    borderRadius: 8,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    padding: "16px 32px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.13)",
    },
  },
})(Box);

const Label = withStyles({
  root: { fontSize: 14, color: "rgb(200, 200, 200)" },
})(Typography);

const FileUploadStage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const media = useSelector((state) => state.content.updatingMedia);
  const author = useSelector((state) => state.firebase.auth.email);
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const handleDropAccepted = <T extends File>(files: T[], event: DropEvent) => {
    setLoading(true);
    const file = files[0];
    const fileType = getFileType(file.type);
    const remoteFile = firebase.storage().ref(`uploads/${uuid() + file.name}`);
    const task = remoteFile.put(file);
    task.on(
      "state-changed",
      (snapshot) => {},
      (error) => {},
      async () => {
        if (fileType === "video") {
          // TODO: Determine video duration
          // const reader = new FileReader();
          // reader.onloadend = () => {
          //   const result = reader.result;
          //   const audio = new Video(result as string);
          //   audio.onloadedmetadata = () => {
          //     console.log("cmon2");
          //     dispatch(updateUpdatingMediaLmao({ duration: audio.duration }));
          //   };
          //   audio.onloadeddata = () => {
          //     console.log("cmon");
          //     dispatch(updateUpdatingMediaLmao({ duration: audio.duration }));
          //   };
          //   audio.onerror = (e) => console.log(e);
          // };
          // reader.readAsDataURL(file);
        } else if (fileType === "image") {
          dispatch(setDurationVisible(true));
        }
        const newMedia = {
          name: "Nový soubor",
          duration: 7,
          file: remoteFile.fullPath,
          fileType,
          author,
        };
        const { id } = await firestore.add("media", {
          ...newMedia,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        });
        dispatch(updateUpdatingMediaLmao({ id, ...newMedia } as any));
        enqueueSnackbar("Soubor úspěšně nahrán!");
        dispatch(setActiveStep(2));
        setLoading(false);
      }
    );
  };
  const handleDropRejected = () =>
    enqueueSnackbar(
      "Tento typ souboru bohužel není v této chvíli podporován.",
      { variant: "error" }
    );
  const { getInputProps, getRootProps } = useDropzone({
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected,
    accept: ["image/png", "image/gif", "image/jpeg"],
    multiple: false,
  });
  return (
    <>
      <Container>
        <Dropzone {...getRootProps()}>
          <input {...getInputProps()} />
          {loading ? <CircularProgress size="20px" /> : <Icon>upload</Icon>}
          <Box>
            <Typography>
              Nahrát soubor <br />
              <Typography style={{ opacity: 0.8 }} variant="caption">
                (pro optimální zobrazení použijte rozlišení - 1080x1760)
              </Typography>
            </Typography>
            {media.file && <Label>Soubor: {media.file}</Label>}
          </Box>
        </Dropzone>
      </Container>
      <NextBackButtons nextHidden />
    </>
  );
};

export default FileUploadStage;
