import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FirebaseReducer,
  useFirebase,
  useFirestore,
} from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";
import { setAuthorized } from "../../store/slices/auth";
import { setOpenSettingsButtonVisible } from "../../store/slices/settings";
import { useStoreUserData } from "./useStoreUserData";

export const useAuthorization = () => {
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const auth = useSelector<RootState, FirebaseReducer.AuthState>(
    (state) => state.firebase.auth
  );
  const { push, location } = useHistory();
  useStoreUserData();
  useEffect(() => {
    if (location.pathname.startsWith("/preview")) {
      return;
    }
    if (auth.isEmpty) {
      push("/auth");
      dispatch(setAuthorized(false));
      return;
    }
    setLoading(true);
    firestore
      .collection("users")
      .get()
      .then((users) => {
        const user = users.docs.find((x) => x.id === auth.email);
        const isAuthorized = Boolean(user?.exists);
        if (isAuthorized) {
          push("/");
        } else {
          enqueueSnackbar(`Přístup zamítnut pro: ${auth.email}`, {
            variant: "error",
          });
          firebase.auth().signOut();
        }
        dispatch(
          setOpenSettingsButtonVisible(isAuthorized && user?.data().bigD)
        );
        dispatch(setAuthorized(isAuthorized));
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firestore, auth.email, auth.isEmpty, push, enqueueSnackbar, dispatch]);
  return { loading };
};
