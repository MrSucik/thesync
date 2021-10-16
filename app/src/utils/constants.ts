export const internalDateFormat = "DD-MM-YYYY";
export const czechDateFormat = "DD. MM. YYYY";
export const czechShortDateFormat = "DD. MM.";

export const screenHeight = 1760;
export const screenWidth = 1080;

export const openWeatherApiToken = process.env.OPEN_WEATHER_API_TOKEN;
export const firebaseApiKey = process.env.FIREBASE_API_KEY;
export const firebaseAppId = process.env.FIREBASE_APP_ID;

console.log(JSON.stringify(process.env));


export const isDevelopment = process.env.NODE_ENV === "development";

export const dummyFunction = (): void => console.log("Dummy function called!");
