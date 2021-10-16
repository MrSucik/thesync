import { firestore } from "./fire";
import firebase from "firebase/app";
import { SnackbarMessage, OptionsObject, SnackbarKey } from "notistack";

export const handleError = (error: Error, payload?: unknown) => {
  console.error(error, payload);
  firestore.collection("logs").add({
    payload,
    error: JSON.stringify({ error }),
    location: window.location.pathname,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

type EnqueueSnackbarHandler = (
  message: SnackbarMessage,
  options?: OptionsObject | undefined
) => SnackbarKey;

export default {
  onFileUploadProcessError:
    (enqueueSnackbar: EnqueueSnackbarHandler) => (error: unknown) => {
      const userMessage = "Nepodařilo se nahrát tento soubor.";
      const func = "User file upload";
      handleError(error as Error, { userMessage, function: func });
      enqueueSnackbar(userMessage, { variant: "error" });
    },
  onFileUploadImagePostProcessError:
    (enqueueSnackbar: EnqueueSnackbarHandler) => (error: unknown) => {
      const userMessage = "Nepodařilo se zpracovat tento soubor.";
      const func = "User file upload - image post process error";
      handleError(error as Error, { userMessage, function: func });
      enqueueSnackbar(userMessage, { variant: "error" });
    },
  onFileUploadError:
    (enqueueSnackbar: EnqueueSnackbarHandler) =>
    (error: firebase.storage.FirebaseStorageError) => {
      const userMessage = "Nepodařilo se nahrát tento soubor.";
      const func = "User file upload upload to Cloud Storage";
      handleError(error, { userMessage, function: func });
      enqueueSnackbar(userMessage, { variant: "error" });
    },
  onFileUploadUnsupportedFileType:
    (enqueueSnackbar: EnqueueSnackbarHandler) => (error: unknown) => {
      const userMessage =
        "Tento typ souboru bohužel není v této chvíli podporován.";
      const func = "User file upload - wrong file type";
      handleError(error as Error, { userMessage, function: func });
      enqueueSnackbar(userMessage, { variant: "error" });
    },
};
