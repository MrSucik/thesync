import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { WeatherResponse } from "./definitions";
interface HourlyForecast {
  temp: number;
  hour: number;
  icon: string;
}

export interface WeatherState {
  currentTemperature: string;
  maxTemperature: string;
  icon: string;
  description: string;
  hourlyForecast: HourlyForecast[];
}

const initialState: WeatherState = {
  currentTemperature: "",
  icon: "",
  maxTemperature: "",
  description: "",
  hourlyForecast: [],
};

const getIconUrl = (icon: string) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action: PayloadAction<WeatherResponse>) {
      console.log(action.payload);
      const hourly = action.payload.hourly
        .slice(0, 8)
        .map(({ weather, dt, temp }) => ({
          temp: Math.round(temp),
          hour: moment(dt * 1000).hours(),
          icon: weather[0] && getIconUrl(weather[0].icon),
        }));

      state.hourlyForecast = hourly;

      state.description = action.payload.current.weather[0].description;
      state.currentTemperature =
        Math.floor(action.payload.current.feels_like) + "°C";
      state.maxTemperature = Math.floor(action.payload.current.temp) + "°C";
      state.icon = getIconUrl(action.payload.current.weather[0].icon);
    },
  },
});

export const { setWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
