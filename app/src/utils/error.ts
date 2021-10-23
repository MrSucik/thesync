import firebase from "firebase/app";
import { SnackbarMessage, OptionsObject, SnackbarKey } from "notistack";
import { FileRejection } from "react-dropzone";
import { firestore, withTimestamp } from "./fire";

const serialize = (a: unknown) =>
  JSON.parse(JSON.stringify(a, Object.getOwnPropertyNames(a)));

export const handleError = (error: Error, payload?: unknown) => {
  const data = {
    payload: serialize(payload),
    error: serialize(error),
    location: window.location.pathname,
  };
  console.error(data);
  firestore.collection("logs").add(withTimestamp(data));
};

const reloadWindow = (delay = 1) =>
  setTimeout(() => window.location.reload(), delay);

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
    (enqueueSnackbar: EnqueueSnackbarHandler) =>
    (fileRejections: FileRejection[]) => {
      const userMessage =
        "Tento typ souboru bohužel není v této chvíli podporován.";
      const func = "User file upload - wrong file type";
      handleError(new Error(func), {
        userMessage,
        function: func,
        fileRejections,
      });
      enqueueSnackbar(userMessage, { variant: "error" });
    },
  onAuthFailed:
    (enqueueSnackbar: EnqueueSnackbarHandler) => (error: unknown) => {
      const userMessage = "Přístup zamítnut.";
      const func = "Failed auth";
      handleError(error as Error, { userMessage, function: func, error });
      enqueueSnackbar(userMessage, { variant: "error" });
    },
  onFirestoreFailedToLoad: (enqueueSnackbar: EnqueueSnackbarHandler) => () => {
    const userMessage = "Nepodařilo se připojit k databázi.";
    const func = "Failed Firestore load documents";
    const error = new Error(func);
    handleError(error as Error, { userMessage, function: func, error });
    enqueueSnackbar(userMessage, { variant: "error" });
    reloadWindow(3000);
  },
};
