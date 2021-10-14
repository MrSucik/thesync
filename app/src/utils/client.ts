import axios from "axios";
import {
  NameDayResponse,
  WeatherResponse,
} from "../features/Footer/definitions";
import { openWeatherApiToken, isDevelopment } from "./constants";

const local = "http://localhost:5001/thesync/europe-west3/";
const remote = "https://europe-west3-thesync.cloudfunctions.net/";

const axiosClient = axios.create({ baseURL: isDevelopment ? local : remote });

interface BakalariDatesResponse {
  dates: string[];
  selected: string;
}

interface BakalariProcessResponse {
  file: string;
  date: string;
}

const client = {
  deviceAccess: (deviceId: string) =>
    axiosClient.get<string>("generateDeviceToken", { params: { deviceId } }),
  bakalariSuplovaniDates: () =>
    axiosClient.get<BakalariDatesResponse>("availableBakaSuplDates"),
  bakalariPlanAkciDates: () =>
    axiosClient.get<BakalariDatesResponse>("availableBakaPlanDates"),
  bakalariProcessSupl: (date: string) =>
    axiosClient.get<BakalariProcessResponse>("bakalariProcessSupl", {
      params: { date },
    }),
  bakalariProcessPlan: (date: string) =>
    axiosClient.get<BakalariProcessResponse>("bakalariProcessPlan", {
      params: { date },
    }),
  weather: () =>
    axios.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=49.82569613880751&lon=18.16797453409319&appid=${openWeatherApiToken}&lang=cz&units=metric`
    ),
  getImageSize: (file: string) =>
    axiosClient.post<{ height: number; width: number; type: string }>(
      "getImageSize?file=" + file
    ),
  nameDay: () => axios.get<NameDayResponse>("https://svatky.adresa.info/json"),
};

export default client;
