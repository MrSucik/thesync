import { configureStore } from "@reduxjs/toolkit";
import { reduxFirestore } from "redux-firestore";
import firebase from "firebase/app";
import { reducer } from "./reducer";
import { middleware } from "./middleware";

const store = configureStore({
  reducer,
  middleware,
  enhancers: [reduxFirestore({ default: firebase })],
});

export default store;
