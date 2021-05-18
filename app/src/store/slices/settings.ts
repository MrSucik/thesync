import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  openSettingsButtonVisible: boolean;
  userAdministrationOpen: boolean;
}

const initialState: SettingsState = {
  userAdministrationOpen: false,
  openSettingsButtonVisible: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUserAdministrationOpen(state, action: PayloadAction<boolean>) {
      state.userAdministrationOpen = action.payload;
    },
    setOpenSettingsButtonVisible(state, action: PayloadAction<boolean>) {
      state.openSettingsButtonVisible = action.payload;
    },
  },
});

export const {
  setUserAdministrationOpen,
  setOpenSettingsButtonVisible,
} = settingsSlice.actions;

export default settingsSlice.reducer;
