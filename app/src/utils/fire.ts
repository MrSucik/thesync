import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance";
import "firebase/database";

export const app = firebase.initializeApp(firebaseConfig);
export const firestore = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export const performance = app.performance();

export const getDownloadURL = (path: string) =>
  storage.ref(path).getDownloadURL();

export const uploadFile = async (file: File) => {
  const path = `uploads/${file.name}`;
  await storage.ref().child(path).put(file);
  return path;
};

export const createNewScene = () =>
  firestore.collection("scenes").add({
    name: "Nová Scéna",
    mediaList: [],
    backgroundColor: "#1a1a1a",
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });
