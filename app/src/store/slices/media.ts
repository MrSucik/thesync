import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "./app";

export type ConfigureMediaModalState =
  | "closed"
  | "bakalari-suplovani"
  | "bakalari-plan-akci";

export interface MediaFormData {
  name: string;
  file: string;
  duration: string;
  durationEnabled: boolean;
}

export interface MediaState {
  updateMediaModalState: ModalState;
  configureMediaModalState: ConfigureMediaModalState;
  form: MediaFormData;
}

const initialState: MediaState = {
  updateMediaModalState: "closed",
  configureMediaModalState: "closed",
  form: {
    name: "",
    file: "",
    duration: "",
    durationEnabled: false,
  },
};

const mediaSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUpdateMediaModalState(state, action: PayloadAction<ModalState>) {
      state.updateMediaModalState = action.payload;
      if (action.payload === "closed") {
        state.form = {
          name: "",
          file: "",
          duration: "",
          durationEnabled: false,
        };
      }
    },
    setConfigureMediaModalOpen(
      state,
      action: PayloadAction<ConfigureMediaModalState>
    ) {
      state.configureMediaModalState = action.payload;
    },
    updateForm(
      state,
      action: PayloadAction<{
        file: string;
        durationEnabled: boolean;
        duration: string;
      }>
    ) {
      state.form.file = action.payload.file;
      state.form.durationEnabled = action.payload.durationEnabled;
      if (!action.payload.durationEnabled) {
        state.form.duration = action.payload.duration;
      }
    },
    updateName(state, action: PayloadAction<string>) {
      state.form.name = action.payload;
    },
    updateDuration(state, action: PayloadAction<string>) {
      state.form.duration = action.payload;
    },
  },
});

export const {
  setUpdateMediaModalState,
  setConfigureMediaModalOpen,
  updateForm,
  updateDuration,
  updateName,
} = mediaSlice.actions;

export default mediaSlice.reducer;
