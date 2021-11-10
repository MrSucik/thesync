import { combineReducers } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import app from "./slices/app";
import media from "./slices/media";
import settings from "./slices/settings";
import auth from "./slices/auth";
import preview from "./slices/preview";
import content from "features/Content/contentSlice";
import deviceConfiguration from "features/Devices/deviceConfigurationSlice";
import weather from "features/Footer/weatherSlice";

export const reducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  app,
  media,
  settings,
  auth,
  preview,
  content,
  deviceConfiguration,
  weather,
});
