import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#fff", dark: "white", light: "#fff" },
    secondary: { main: "rgb(170, 68, 68, 0.73)" },
    background: { paper: "#282828", default: "#333" },
  },
});
