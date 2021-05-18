import React from "react";
import { useFirebase } from "react-redux-firebase";
import firebase from "firebase/app";
import { Avatar, Button } from "@material-ui/core";

const LoginButton: React.FC = () => {
  const { auth } = useFirebase();
  const handleClick = () =>
    auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={handleClick}
      startIcon={<Avatar src="./google-icon.svg" />}
    >
      Přihlásit se pomocí Účtu Google
    </Button>
  );
};

export default LoginButton;
