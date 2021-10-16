import { Box, Button, CircularProgress, Icon, Typography } from "@mui/material";
import firebase from "firebase/app";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store/useSelector";
import {
  setActiveStep,
  setDurationVisible,
  setLayoutVisible,
  updateUpdatingMediaLmao,
} from "../contentSlice";
import { useSnackbar } from "notistack";
import NextBackButtons from "../NextBackButtons";
import { useFirestore } from "react-redux-firebase";
import client from "../../../utils/client";
import { useCurrentScene } from "../../../hooks/useCurrentScene";
import { MediaFileType, MediaModel, UserModel } from "../../../definitions";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { withTimestamp, createNewMedia, uploadFile } from "../../../utils/fire";
import error from "../../../utils/error";

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
  const user = useCurrentUser() as UserModel;
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const postProcessImage = async (
    remoteFileName: string,
    fileRef: firebase.storage.Reference,
    fileType: MediaFileType
  ) => {
    try {
      dispatch(setDurationVisible(true));
      dispatch(setLayoutVisible(true));
      const response = await client.getImageSize(remoteFileName);
      const newMedia = createNewMedia(user, {
        file: fileRef.fullPath,
        fileType,
        width: response.data.width,
        height: response.data.height,
        backgroundColor: scene.backgroundColor,
      }) as Partial<MediaModel>;
      const { id } = await firestore.add("media", withTimestamp(newMedia));
      dispatch(updateUpdatingMediaLmao({ id, ...newMedia }));
      enqueueSnackbar("Soubor úspěšně nahrán!");
      dispatch(setActiveStep(2));
    } catch (err) {
      error.onFileUploadImagePostProcessError(enqueueSnackbar)(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDropAccepted = async <T extends File>(files: T[]) => {
    try {
      setLoading(true);
      const file = files[0];
      const fileType = getFileType(file.type);
      const { path, task, fileRef } = uploadFile(file);
      task.on(
        "state-changed",
        null,
        error.onFileUploadError(enqueueSnackbar),
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
            await postProcessImage(path, fileRef, fileType);
          }
        }
      );
    } catch (err) {
      error.onFileUploadProcessError(enqueueSnackbar)(err);
    }
  };

  const { getInputProps, getRootProps } = useDropzone({
    onDropAccepted: handleDropAccepted,
    onDropRejected: error.onFileUploadUnsupportedFileType(enqueueSnackbar),
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
      <Button
        sx={{
          textTransform: "none",
          minWidth: 206,
          maxWidth: 300,
          backgroundColor: "#444",
          display: "flex",
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          padding: "16px 32px",
          marginTop: 4,
          "&:hover": { backgroundColor: "#fff2" },
        }}>
        <Box {...getRootProps()}>
          <input {...getInputProps()} />
          {loading ? <CircularProgress size="20px" /> : <Icon>upload</Icon>}
          <Typography>
            Nahrát soubor <br />
            <Typography sx={{ opacity: 0.8 }} variant="caption">
              (pro optimální zobrazení použijte rozlišení - 1080x1760)
            </Typography>
          </Typography>
          {media.file && <span>Soubor: {media.file}</span>}
        </Box>
      </Button>
      <NextBackButtons nextHidden />
    </Box>
  );
};

export default FileUploadStage;
