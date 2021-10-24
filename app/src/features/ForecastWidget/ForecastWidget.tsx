import { Box } from "@mui/system";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "store/useSelector";
import { useWeather } from "./useWeather";

const ForecastWidget: React.FC = () => {
  const { currentTemperature, icon, hourlyForecast } = useSelector(
    state => state.weather
  );
  useWeather();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        background: "#3098ed",
      }}>
      <img src={icon} alt="weather" style={{ height: 64 }} />
      <span>{currentTemperature}</span>
      <span>Ostrava - Poruba</span>
      <ReactApexChart
        options={{
          chart: {
            foreColor: "#fff",
            background: "blue",
            fontFamily: "Roboto",
            selection: { enabled: false },
            zoom: { enabled: false },
            toolbar: { show: false },
            sparkline: { enabled: true },
          },
          tooltip: { enabled: false },
          dataLabels: {
            enabled: true,
            distributed: true,
            background: { enabled: false, dropShadow: { enabled: false } },
            offsetY: 16,
          },
          states: { hover: { filter: { type: "none" } } },
          stroke: { colors: ["#fff"], curve: "smooth" },
          grid: { show: false },
          yaxis: {
            show: false,
            max:
              Math.max.apply(
                null,
                hourlyForecast.map(x => x.temp)
              ) + 2,
            min:
              Math.min.apply(
                null,
                hourlyForecast.map(x => x.temp)
              ) - 2,
          },
          xaxis: {
            labels: { offsetX: 100 },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
        }}
        series={[{ name: "series", data: hourlyForecast.map(x => x.temp) }]}
        type="line"
        height={420}
        width={800}
      />
    </Box>
  );
};
export default ForecastWidget;
