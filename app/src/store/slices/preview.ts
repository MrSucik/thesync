import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PreviewTypes = "closed" | "modal" | "tab" | "client";

interface ChangePreviewAction {
  type: PreviewTypes;
  mediaList: string[];
}

export interface PreviewState {
  previewMediaList: string[];
  activeMediaIndex: number;
  type: PreviewTypes;
}

const initialState: PreviewState = {
  previewMediaList: [],
  activeMediaIndex: 0,
  type: "closed",
};

const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setPreviewMediaList(state, action: PayloadAction<ChangePreviewAction>) {
      state.previewMediaList = action.payload.mediaList;
      state.type = action.payload.type;
      state.activeMediaIndex = 0;
    },
    nextMedia(state, _action: PayloadAction) {
      state.activeMediaIndex =
        state.activeMediaIndex + 1 >= state.previewMediaList.length
          ? 0
          : state.activeMediaIndex + 1;
    },
    previousMedia(state, _action: PayloadAction) {
      state.activeMediaIndex =
        state.activeMediaIndex - 1 < 0
          ? state.previewMediaList.length - 1
          : state.activeMediaIndex - 1;
    },
    setActiveMediaIndex(state, action: PayloadAction<number>) {
      state.activeMediaIndex = action.payload;
    },
  },
});

export const {
  nextMedia,
  previousMedia,
  setPreviewMediaList,
  setActiveMediaIndex,
} = previewSlice.actions;

export default previewSlice.reducer;
