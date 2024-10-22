import React, { createContext } from "react";
import { WeatherData } from "@/modules/home/types/weather";
import { Action } from "./reducer";
import { WeatherForecastData } from "@/modules/details/types/details";

export interface WeatherState {
  currentSearch: WeatherData | null;
  favorites: WeatherData[];
  loading: boolean;
  error: string;
  forecast: WeatherForecastData | null;
}

 export interface WeatherContextProps {
  state: WeatherState;
  dispatch: React.Dispatch<Action>;
}

export const WeatherDataContext = createContext<WeatherContextProps>({
  state: {
    currentSearch: null,
    favorites: [],
    loading: false,
    error: "",
    forecast: null,
  },
  dispatch: () => {},
});
