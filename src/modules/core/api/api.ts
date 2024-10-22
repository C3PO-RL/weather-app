import axios from "axios";

export const api = axios.create({
  baseURL: "https://weatherapi-com.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_APP_RAPIDAPI_WEATHER_KEY,
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
  },
});
