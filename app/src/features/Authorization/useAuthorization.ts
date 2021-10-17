import { useFirebase, useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setAuthorized } from "../../store/slices/auth";
import { setOpenSettingsButtonVisible } from "../../store/slices/settings";
import error from "../../utils/error";

export const useAuthorization = () => {
  const dispatch = useDispatch();
  const { auth: firebaseAuth } = useFirebase();
  const firestore = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useHistory();

  const updateAuthorization = useCallback(
    async (email: string | null) => {
      const users = await firestore.collection("users").get();
      const user = users.docs.find(x => x.id === email);
      const authorized = Boolean(email && user?.exists);
      dispatch(setAuthorized(authorized));
      dispatch(setOpenSettingsButtonVisible(authorized && user?.data().bigD));
      return authorized;
    },
    [firestore, dispatch]
  );

  const handleAuthorized = () => push("/app");

  const handleUnauthorized = () => {
    push("/");
    firebase.auth().signOut();
  };

  const handleLogin = async () => {
    try {
      const { user } = await firebaseAuth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      if (!user) {
        throw new Error("Failed to get user");
      }
      const authorized = await updateAuthorization(user.email);
      if (!authorized) {
        throw new Error(
          "Failed Firestore Database authorization for: " + user.email
        );
      }
      handleAuthorized();
    } catch (err) {
      error.onAuthFailed(enqueueSnackbar)(err);
      handleUnauthorized();
    }
  };

  return { onLogin: handleLogin, updateAuthorization };
};
