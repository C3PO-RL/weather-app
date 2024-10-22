import { api } from "@/modules/core/api/api";

import { Action } from "@/modules/core/context/reducer";
import { WeatherForecastData } from "../types/details";

const getWeatherDetailByCity = async (
  city: string
): Promise<WeatherForecastData> => {
  try {
    const response = await api.get(`/forecast.json?q=${city}&days=3`);
    return response.data;
  } catch (error) {
    console.error("Error fetching city weather:", error);
    throw error;
  }
};

export const getDetails = async ({
  city,
  dispatch,
  navigate,
}: {
  city: string;
  dispatch: React.Dispatch<Action>;
  navigate: (path: string) => void;
}) => {
  try {
    dispatch({ type: "SET_LOADING", payload: true });
    const result = await getWeatherDetailByCity(city);
    dispatch({
      type: "SET_FORECAST",
      payload: result as WeatherForecastData,
    });
  } catch (error) {
    const errorMessage =
      (error as { response?: { data?: { error?: { message?: string } } } })
        ?.response?.data?.error?.message || "An unexpected error occurred";
    dispatch({
      type: "SET_ERROR",
      payload: errorMessage,
    });
    navigate("/error");
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
};
