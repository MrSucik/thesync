import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance";
import "firebase/database";
import "firebase/analytics";
import { firebaseApiKey, firebaseAppId } from "./constants";
import { MediaModel, SceneModel, UserModel } from "../definitions";

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "thesync.firebaseapp.com",
  databaseURL: "https://thesync-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "thesync",
  storageBucket: "thesync.appspot.com",
  messagingSenderId: "25996675772",
  appId: firebaseAppId,
};

export const app = firebase.initializeApp(firebaseConfig);
export const firestore = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export const performance = app.performance();
export const analytics = app.analytics();

// TODO: Add more
analytics.logEvent("Application started");

export const getDownloadURL = (path: string): Promise<string> =>
  storage.ref(path).getDownloadURL();

export const uploadFile = async (file: File) => {
  const path = `uploads/${file.name}`;
  await storage.ref().child(path).put(file);
  return path;
};

export const createNewScene = (author: UserModel) =>
  firestore.collection("scenes").add({
    name: "Nová Scéna",
    mediaList: [],
    backgroundColor: "#1a1a1a",
    created: firebase.firestore.FieldValue.serverTimestamp(),
    author: author.email,
    area: author.area,
    hideProgress: false,
    hideWeather: false,
  } as Partial<SceneModel>);

export const createNewMedia = (author: UserModel, media: Partial<MediaModel>) =>
  firestore.collection("media").add({
    name: "Nový soubor",
    duration: 7,
    author: author.email,
    area: author.area,
    ...media,
  } as Partial<SceneModel>);
