import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { actionTypes as rrfActionTypes } from "react-redux-firebase";
import { constants as rfConstants } from "redux-firestore";

export const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [
      // ignore every redux-firebase and react-redux-firebase action type
      ...Object.keys(rfConstants.actionTypes).map(
        type => `${rfConstants.actionsPrefix}/${type}`
      ),
      ...Object.keys(rrfActionTypes).map(
        type => `@@reactReduxFirebase/${type}`
      ),
    ],
    ignoredPaths: ["firebase", "firestore"],
  },
});
