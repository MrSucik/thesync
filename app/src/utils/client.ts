import axios from "axios";

const secondary = "https://europe-west3-thesync.cloudfunctions.net/";

const axiosClient = axios.create({
  // baseURL: "http://localhost:5001/thesync/europe-west3/",
  baseURL: secondary,
});

const client = {
  deviceAccess: (deviceId: string) =>
    axiosClient.get<string>("generateDeviceToken", { params: { deviceId } }),
  bakalariSuplovaniDates: () =>
    axiosClient.get<string[]>("availableBakaSuplDates"),
  bakalariPlanAkciDates: () =>
    axiosClient.get<string[]>("availableBakaPlanDates"),
  bakalariProcessSupl: (date: string) =>
    axiosClient.get<string>("bakalariProcessSupl", { params: { date } }),
  bakalariProcessPlan: (date: string) =>
    axiosClient.get<string>("bakalariProcessPlan", { params: { date } }),
  weather: () =>
    axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=49.82569613880751&lon=18.16797453409319&appid=49edff20339efac809359e260fb69a33&lang=cz&units=metric`
    ),
  getImageSize: (file: string) => {
    axiosClient.post<{ height: number; width: number; type: string }>(
      "getImageSize",
      file
    );
  },
};

export default client;
