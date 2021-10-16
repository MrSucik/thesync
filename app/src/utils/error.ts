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
  onUserFileUploadError:
    (enqueueSnackbar: EnqueueSnackbarHandler) =>
    (error: firebase.storage.FirebaseStorageError) => {
      const userMessage = "Nepodařilo se nahrát soubor.";
      handleError(error, { userMessage, function: "User file upload" });
      enqueueSnackbar(userMessage, { variant: "error" });
    },
  onFileUploadUnsupportedFileType:
    (enqueueSnackbar: EnqueueSnackbarHandler) => (error: unknown) => {
      const userMessage =
        "Tento typ souboru bohužel není v této chvíli podporován.";
      handleError(error as Error, {
        userMessage,
        function: "User file upload - wrong file type",
      });
      enqueueSnackbar(userMessage, { variant: "error" });
    },
};
