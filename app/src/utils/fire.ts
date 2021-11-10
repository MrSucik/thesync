import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance";
import "firebase/database";
import "firebase/analytics";
import { firebaseApiKey, firebaseAppId } from "./constants";
import { MediaModel, SceneModel, UserModel } from "definitions";

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
import { v4 as uuid } from "uuid";

// TODO: Add more
analytics.logEvent("Application started");

export const getDownloadURL = (path: string): Promise<string> =>
  storage.ref(path).getDownloadURL();

export const uploadFile = (file: File) => {
  const path = `uploads/${uuid() + file.name}`;
  const fileRef = storage.ref().child(path);
  const task = fileRef.put(file);
  return { path, task, fileRef };
};

export const withTimestamp = <T extends Record<string, unknown>>(obj: T) => ({
  created: firebase.firestore.FieldValue.serverTimestamp(),
  ...obj,
});

export const createNewSceneInDB = (author: UserModel) =>
  firestore.collection("scenes").add(
    withTimestamp({
      name: "Nová Scéna",
      mediaList: [],
      backgroundColor: "#1a1a1a",
      author: author.email,
      area: author.area,
      hideProgress: false,
      hideWeather: false,
      hideNameDay: false,
    }) as Partial<SceneModel>
  );

export const createNewMedia = (author: UserModel, media: Partial<MediaModel>) =>
  ({
    name: "Nový soubor",
    duration: 7,
    author: author.email,
    area: author.area,
    ...media,
  } as Partial<MediaModel>);
