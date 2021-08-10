import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalState = "closed" | "create" | string;

interface ReorderUpdate {
  sceneId: string;
  mediaList: string[];
}

export interface AppState {
  selectedScene: string | null;
  deviceModalState: ModalState;
  deviceSceneUpdate: string | "all";
  choosingMedia: string | null;
  optimisticReorderUpdate: ReorderUpdate | null;
  deviceScheduleOpen: boolean;
}

const initialState: AppState = {
  selectedScene: null,
  deviceModalState: "closed",
  deviceSceneUpdate: "",
  choosingMedia: null,
  optimisticReorderUpdate: null,
  deviceScheduleOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedScene(state, action: PayloadAction<string | null>) {
      state.selectedScene = action.payload;
    },
    setDeviceModalState(state, action: PayloadAction<ModalState>) {
      state.deviceModalState = action.payload;
    },
    setDeviceSceneUpdate(state, action: PayloadAction<string | "all">) {
      state.deviceSceneUpdate = action.payload;
    },
    setChoosingMedia(state, action: PayloadAction<string | null>) {
      state.choosingMedia = action.payload;
    },
    setOptimisticReorderUpdate(
      state,
      action: PayloadAction<ReorderUpdate | null>
    ) {
      state.optimisticReorderUpdate = action.payload;
    },
    setDeviceScheduleOpen(state, action: PayloadAction<boolean>) {
      state.deviceScheduleOpen = action.payload;
    },
  },
});

export const {
  setSelectedScene,
  setDeviceModalState,
  setDeviceSceneUpdate,
  setChoosingMedia,
  setOptimisticReorderUpdate,
  setDeviceScheduleOpen,
} = appSlice.actions;

export default appSlice.reducer;
