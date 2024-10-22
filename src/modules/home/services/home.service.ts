import { api } from "@/modules/core/api/api";
import { WeatherData } from "../types/weather";
import { Action } from "@/modules/core/context/reducer";

const getCityWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await api.get(`/current.json?q=${city}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching city weather:", error);
    throw error;
  }
};

export const onSearch = async ({
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
    const result = await getCityWeather(city);
    dispatch({ type: "SET_CURRENT_SEARCH", payload: result as WeatherData });
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
