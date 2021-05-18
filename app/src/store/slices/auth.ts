import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  authorized: boolean;
}

const initialState: AuthState = {
  authorized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthorized(state, action: PayloadAction<boolean>) {
      state.authorized = action.payload;
    },
  },
});

export const { setAuthorized } = authSlice.actions;

export default authSlice.reducer;
