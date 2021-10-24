import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "store";
import MomentUtils from "@date-io/moment";
import firebase from "firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { BrowserRouter } from "react-router-dom";
import { createFirestoreInstance } from "redux-firestore";
import App from "App";
import ErrorContainer from "components/ErrorContainer";
import { theme } from "./theme";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const AllTheProviders: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ReactReduxFirebaseProvider
            firebase={firebase}
            config={{}}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}>
            <SnackbarProvider>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <LocalizationProvider dateAdapter={MomentUtils}>
                    <ErrorContainer>
                      <App />
                    </ErrorContainer>
                  </LocalizationProvider>
                </ThemeProvider>
              </StyledEngineProvider>
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
