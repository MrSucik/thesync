import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";
import CurrentDateTime from "../../components/CurrentDateTime";
import { useSelector } from "../../store/useSelector";
import { useWeather } from "../ForecastWidget/useWeather";

const Weather = forwardRef((_props, ref) => {
  useWeather();
  const { currentTemperature, maxTemperature, icon, description } = useSelector(
    state => state.weather
  );
  return !description ? null : (
    <Box
      ref={ref}
      style={{
        paddingLeft: 4,
        height: 64,
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: 0,
      }}>
      <Typography
        variant="caption"
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "right",
          textTransform: "capitalize",
          whiteSpace: "nowrap",
        }}>
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
