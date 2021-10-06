import { useFirebase, useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setAuthorized } from "../../store/slices/auth";
import { setOpenSettingsButtonVisible } from "../../store/slices/settings";

export const useAuthorization = () => {
  const dispatch = useDispatch();
  const { auth: firebaseAuth } = useFirebase();
  const firestore = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useHistory();

  const updateAuthorization = useCallback(
    async (email: string | null) => {
      const users = await firestore.collection("users").get();
      const user = users.docs.find((x) => x.id === email);
      const authorized = Boolean(email && user?.exists);
      dispatch(setAuthorized(authorized));
      dispatch(setOpenSettingsButtonVisible(authorized && user?.data().bigD));
      return authorized;
    },
    [firestore, dispatch]
  );

  const handleAuthorized = () => push("/app");

  const handleUnauthorized = (email: string | null) => {
    push("/");
    enqueueSnackbar(`Přístup zamítnut pro: ${email}`, {
      variant: "error",
    });
    firebase.auth().signOut();
  };

  const handleLogin = async () => {
    const { user } = await firebaseAuth().signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    if (!user) {
      return;
    }
    const authorized = await updateAuthorization(user.email);
    if (!authorized) {
      handleUnauthorized(user.email);
      return;
    }
    handleAuthorized();
  };

  return { onLogin: handleLogin, updateAuthorization };
};
