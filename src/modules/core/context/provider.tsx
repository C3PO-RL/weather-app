import { WeatherData } from "@/modules/home/types/weather";
import useSessionStorage from "../hooks/useSessionStorage";
import { WeatherDataContext, WeatherState } from "./context";
import { useEffect, useReducer } from "react";
import { weatherReducer } from "./reducer";

interface WeatherDataProviderProps {
  children: React.ReactNode;
}

export const WeatherDataProvider: React.FC<WeatherDataProviderProps> = ({
  children,
}) => {
  const [favoritesFromStorage] = useSessionStorage<WeatherData[]>(
    "favorites",
    []
  );

  const initialState: WeatherState = {
    currentSearch: null,
    favorites: favoritesFromStorage || [],
    loading: false,
    error: "",
    forecast: null,
  };

  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    if (favoritesFromStorage) {
      dispatch({
        type: "ADD_FAVORITE",
        payload: favoritesFromStorage as WeatherData[],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WeatherDataContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherDataContext.Provider>
  );
};
