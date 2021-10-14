import { Box, CircularProgress, Icon, Typography } from "@mui/material";
import firebase from "firebase/app";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../useSelector";
import {
  setActiveStep,
  setDurationVisible,
  setLayoutVisible,
  updateUpdatingMediaLmao,
} from "../contentSlice";
import { v4 as uuid } from "uuid";
import { useSnackbar } from "notistack";
import NextBackButtons from "../NextBackButtons";
import { useFirestore } from "react-redux-firebase";
import client from "../../../utils/client";
import { useCurrentScene } from "../../../hooks/useCurrentScene";
import { dummyFunction } from "../../../utils/constants";
import { MediaModel } from "../../../definitions";

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

const FileUploadStage = () => {
  const scene = useCurrentScene();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const media = useSelector(state => state.content.updatingMedia);
  const author = useSelector(state => state.firebase.auth.email);
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const handleDropAccepted = <T extends File>(files: T[]) => {
    setLoading(true);
    const file = files[0];
    const fileType = getFileType(file.type);
    const remoteFileName = `uploads/${uuid() + file.name}`;
    const remoteFile = firebase.storage().ref(remoteFileName);
    const task = remoteFile.put(file);
    console.log(task, remoteFile, file);
    task.on("state-changed", dummyFunction, dummyFunction, async () => {
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
        dispatch(setLayoutVisible(true));
      }
      const response = await client.getImageSize(remoteFileName);
      const newMedia = {
        name: "Nový soubor",
        duration: 7,
        file: remoteFile.fullPath,
        fileType,
        author,
        width: response.data.width,
        height: response.data.height,
        backgroundColor: scene.backgroundColor,
      } as Partial<MediaModel>;
      const { id } = await firestore.add("media", {
        ...newMedia,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
      dispatch(updateUpdatingMediaLmao({ id, ...newMedia }));
      enqueueSnackbar("Soubor úspěšně nahrán!");
      dispatch(setActiveStep(2));
      setLoading(false);
    });
  };
  const handleDropRejected = () =>
    enqueueSnackbar(
      "Tento typ souboru bohužel není v této chvíli podporován.",
      { variant: "error" }
    );
  const { getInputProps, getRootProps } = useDropzone({
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected,
    accept: ["image/png", "image/gif", "image/jpeg", "video/mp4"],
    multiple: false,
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "center",
        padding: 1,
      }}>
      <Box
        sx={{
          cursor: "pointer",
          minWidth: 206,
          maxWidth: 300,
          backgroundColor: "#444",
          borderRadius: 2,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          padding: "16px 32px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.13)",
          },
        }}>
        <Box {...getRootProps()}>
          <input {...getInputProps()} />
          {loading ? <CircularProgress size="20px" /> : <Icon>upload</Icon>}
          <Box>
            <Typography>
              Nahrát soubor <br />
              <Typography style={{ opacity: 0.8 }} variant="caption">
                (pro optimální zobrazení použijte rozlišení - 1080x1760)
              </Typography>
            </Typography>
            {media.file && <span>Soubor: {media.file}</span>}
          </Box>
        </Box>
      </Box>
      <NextBackButtons nextHidden />
    </Box>
  );
};

export default FileUploadStage;
