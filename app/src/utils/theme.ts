import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#fff", dark: "white", light: "#fff" },
    secondary: { main: "rgb(170, 68, 68, 0.73)" },
    background: { paper: "#282828", default: "#333" },
    success: { main: "#44b700", light: "#44b700", dark: "#44b700" },
  },
});
