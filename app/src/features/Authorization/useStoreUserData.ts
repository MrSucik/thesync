import { useEffect } from "react";
import { useFirebase, useFirestore } from "react-redux-firebase";

export const useStoreUserData = () => {
  const firestore = useFirestore();
  const firebase = useFirebase();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && !window.location.pathname.startsWith("/preview")) {
        firestore.doc(`users/${user.email}`).update({
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    });
    return () => unsubscribe();
  }, [firebase, firestore]);
};
