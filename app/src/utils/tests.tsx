import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "../store";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import firebase from "firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { BrowserRouter } from "react-router-dom";
import { createFirestoreInstance } from "redux-firestore";
import App from "../App";
import ErrorContainer from "../components/ErrorContainer";
import { theme } from "./theme";

const AllTheProviders: React.FC = ({ children }) => {
  return (
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
    </React.StrictMode>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
