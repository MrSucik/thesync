import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#fff" },
    secondary: { main: "rgb(170, 68, 68, 0.73)" },
    background: { paper: "#282828", default: "#333" },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0.4em",
          borderRadius: 4,
          backgroundColor: "grey",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.5)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          outline: "1px solid slategrey",
        },
      },
    },
  },
});
