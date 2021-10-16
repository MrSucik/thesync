import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../utils/client";

export interface NameDayState {
  initialized: boolean;
  name: string;
}

const initialState: NameDayState = {
  initialized: false,
  name: "",
};

export const fetchNameDay = createAsyncThunk("fetchNameDay", async () => {
  const response = await client.nameDay();
  return response.data[0];
});

const nameDaySlice = createSlice({
  name: "nameDay",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNameDay.fulfilled, (state, action) => {
      state.initialized = true;
      state.name = action.payload.name;
    });
  },
});

export default nameDaySlice.reducer;
