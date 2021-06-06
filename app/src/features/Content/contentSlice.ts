import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MediaModel } from "../../definitions";

export type ContentType =
  | "existing"
  | "upload"
  | "bakalari-suplovani"
  | "bakalari-planakci";

export interface ContentState {
  contentOpen: boolean;
  activeStep: number;
  updatingMedia: Partial<MediaModel>;
  type?: ContentType;
  bakalariDates: string[];
  durationVisible: boolean;
  previewMediaId: string;
  bakalariFileLoading: boolean;
  bakalariSelectedOption: "auto" | string;
}

const initialState: ContentState = {
  activeStep: 0,
  contentOpen: false,
  bakalariDates: ["2021-03-28T00:00:00", "2021-03-27T00:00:00"],
  previewMediaId: "",
  durationVisible: false,
  bakalariSelectedOption: "auto",
  bakalariFileLoading: false,
  updatingMedia: {
    duration: 7,
    name: "",
  },
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContentOpen(state, action: PayloadAction<boolean>) {
      state.contentOpen = action.payload;
      if (!state.contentOpen) {
        state.activeStep = 0;
        state.durationVisible = false;
        state.previewMediaId = "";
        state.type = undefined;
        state.updatingMedia = {
          duration: 7,
          name: "",
        };
        state.bakalariFileLoading = false;
        state.bakalariSelectedOption = "auto";
      }
    },
    setActiveStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    },
    setContentType(state, action: PayloadAction<ContentType>) {
      state.type = action.payload;
    },
    setDurationVisible(state, action: PayloadAction<boolean>) {
      state.durationVisible = action.payload;
    },
    setPreviewMediaId(state, action: PayloadAction<string>) {
      state.previewMediaId = action.payload;
    },
    setSelectedBakalariOption(state, action: PayloadAction<string | "auto">) {
      if (action.payload === "" && state.bakalariDates.length) {
        state.bakalariSelectedOption = state.bakalariDates[0];
      } else {
        state.bakalariSelectedOption = action.payload;
      }
    },
    setBakalariDates(state, action: PayloadAction<string[]>) {
      state.bakalariDates = action.payload;
    },
    setUpdatingMedia(state, action: PayloadAction<Partial<MediaModel>>) {
      state.updatingMedia = action.payload;
    },
    updateUpdatingMediaLmao(state, action: PayloadAction<Partial<MediaModel>>) {
      state.updatingMedia = { ...state.updatingMedia, ...action.payload };
    },
    setBakalariFileLoading(state, action: PayloadAction<boolean>) {
      state.bakalariFileLoading = action.payload;
    },
  },
});

export const {
  setContentOpen,
  setActiveStep,
  setContentType,
  setDurationVisible,
  setPreviewMediaId,
  setSelectedBakalariOption,
  setBakalariDates,
  setUpdatingMedia,
  updateUpdatingMediaLmao,
  setBakalariFileLoading,
} = contentSlice.actions;

export default contentSlice.reducer;
