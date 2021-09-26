import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import { theme } from "./utils/theme";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import ErrorContainer from "./components/ErrorContainer";
import "moment/locale/cs";
import moment from "moment";
import StatCounter from "./components/StatCounter";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateMoment from "@mui/lab/AdapterMoment";
declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// import "./features/FPS/index";
moment.locale("cs");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={{}}
          dispatch={store.dispatch}
          createFirestoreInstance={createFirestoreInstance}
        >
          <SnackbarProvider>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDateMoment}>
                  <ErrorContainer>
                    <App />
                  </ErrorContainer>
                </LocalizationProvider>
                <StatCounter />
              </ThemeProvider>
            </StyledEngineProvider>
          </SnackbarProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
