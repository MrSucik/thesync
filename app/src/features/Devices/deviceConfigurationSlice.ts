import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DeviceConfigurationState {
  updateDevice: string | null;
}

const initialState: DeviceConfigurationState = {
  updateDevice: null,
};

const deviceConfigurationSlice = createSlice({
  name: "deviceConfiguration",
  initialState,
  reducers: {
    setConfigureDevice(state, action: PayloadAction<string | null>) {
      state.updateDevice = action.payload;
    },
  },
});

export const { setConfigureDevice } = deviceConfigurationSlice.actions;

export default deviceConfigurationSlice.reducer;
