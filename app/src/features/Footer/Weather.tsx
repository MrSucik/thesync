import { Box, Typography } from "@mui/material";
import { forwardRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import CurrentDateTime from "../../components/CurrentDateTime";
import { useSelector } from "../../store";
import client from "../../utils/client";
import { setWeatherData } from "./weatherSlice";

const Weather = forwardRef((_props, ref) => {
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
  const { currentTemperature, maxTemperature, icon, description } = useSelector(
    (state) => state.weather
  );
  return !description ? null : (
    <Box
      // @ts-ignore
      ref={ref}
      style={{
        paddingLeft: 4,
        height: 64,
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: 0,
      }}
    >
      <Typography
        variant="caption"
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "right",
          textTransform: "capitalize",
          whiteSpace: "nowrap",
        }}
      >
        <CurrentDateTime />
        <br />
        {description} {currentTemperature} ({maxTemperature})
      </Typography>
      <img src={icon} alt="weather" style={{ height: 64 }} />
    </Box>
  );
});

Weather.displayName = "Weather";

export default Weather;
