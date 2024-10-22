import { WeatherData } from "@/modules/home/types/weather";
import { WeatherState } from "./context";
import { WeatherForecastData } from "@/modules/details/types/details";

export type Action =
  | { type: "SET_CURRENT_SEARCH"; payload: WeatherData }
  | { type: "ADD_FAVORITE"; payload: WeatherData[] }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_FORECAST"; payload: WeatherForecastData };

export const weatherReducer = (
  state: WeatherState,
  action: Action
): WeatherState => {
  switch (action.type) {
    case "SET_CURRENT_SEARCH":
      return {
        ...state,
        currentSearch: action.payload,
      };
    case "SET_FORECAST":
      return {
        ...state,
        forecast: action.payload,
      };
    case "ADD_FAVORITE":
      if (
        state.favorites.some((fav) =>
          action.payload.some(
            (data) => data.location.name === fav.location.name
          )
        )
      ) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, ...action.payload],
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.location.name !== action.payload
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
