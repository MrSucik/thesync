import { AppState } from "./slices/app";
import { MediaState } from "./slices/media";
import { SettingsState } from "./slices/settings";
import { AuthState } from "./slices/auth";
import { PreviewState } from "./slices/preview";
import { ContentState } from "../features/Content/contentSlice";
import { DeviceConfigurationState } from "../features/Devices/deviceConfigurationSlice";
import { WeatherState } from "../features/Footer/weatherSlice";
import { NameDayState } from "../features/Footer/nameDaySlice";
import { CombinedState } from "redux";
import { FirebaseReducer, FirestoreReducer } from "react-redux-firebase";

export type RootState = CombinedState<{
  firestore: FirestoreReducer.Reducer;
  firebase: FirebaseReducer.Reducer;
  app: AppState;
  auth: AuthState;
  settings: SettingsState;
  media: MediaState;
  preview: PreviewState;
  content: ContentState;
  deviceConfiguration: DeviceConfigurationState;
  weather: WeatherState;
  nameDay: NameDayState;
}>;
