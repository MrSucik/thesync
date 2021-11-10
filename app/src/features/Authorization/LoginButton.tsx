import React from "react";
import { Avatar, Button } from "@mui/material";
import { useAuthorization } from "./useAuthorization";

const LoginButton: React.FC = () => {
  const { onLogin } = useAuthorization();
  return (
    <Button
      id="login"
      variant="contained"
      color="primary"
      size="large"
      onClick={onLogin}
      startIcon={<Avatar src="./google-icon.svg" />}>
      Přihlásit se
    </Button>
  );
};

export default LoginButton;
