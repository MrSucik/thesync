import { useEffect } from "react";
import { useDispatch } from "react-redux";
import client from "../../utils/client";
import { setWeatherData } from "../Footer/weatherSlice";

export const useWeather = () => {
  const dispatch = useDispatch();
  const updateWeather = async () => {
    const response = await client.weather();
    dispatch(setWeatherData(response.data));
  };
  useEffect(() => {
    updateWeather();
    const interval = setInterval(updateWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
