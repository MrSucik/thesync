import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherResponse } from "./definitions";

export interface WeatherState {
  currentTemperature: string;
  maxTemperature: string;
  icon: string;
  description: string;
}

const initialState: WeatherState = {
  currentTemperature: "",
  icon: "",
  maxTemperature: "",
  description: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action: PayloadAction<WeatherResponse>) {
      state.description = action.payload.current.weather[0].description;
      state.currentTemperature =
        Math.floor(action.payload.current.feels_like) + "°C";
      state.maxTemperature = Math.floor(action.payload.current.temp) + "°C";
      state.icon = `http://openweathermap.org/img/wn/${action.payload.current.weather[0].icon}@2x.png`;
    },
  },
});

export const { setWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
