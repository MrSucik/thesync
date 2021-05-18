import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./utils/theme";
import { SnackbarProvider } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { BrowserRouter } from "react-router-dom";
import ErrorContainer from "./components/ErrorContainer";
import "moment/locale/cs";
import moment from "moment";
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
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <ErrorContainer>
                  <App />
                </ErrorContainer>
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </SnackbarProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
