import { render, screen, fireEvent } from "@testing-library/react";
import {
  WeatherDataContext,
  WeatherContextProps,
} from "@/modules/core/context/context";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, vi, expect } from "vitest";
import WeatherCard from "./WeatherCard";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("WeatherCard", () => {
  const mockDispatch = vi.fn();

  const defaultContextValue: WeatherContextProps = {
    state: {
      currentSearch: {
        location: {
          name: "Test City",
          region: "",
          country: "",
          lat: 0,
          lon: 0,
          tz_id: "",
          localtime_epoch: 0,
          localtime: "",
        },
        current: {
          temp_c: 25,
          condition: {
            text: "Clear",
            icon: "",
            code: 1000,
          },
          wind_kph: 10,
          humidity: 40,
          feelslike_c: 25,
          uv: 5,
          last_updated_epoch: 0,
          last_updated: "",
          temp_f: 0,
          is_day: 0,
          wind_mph: 0,
          wind_degree: 0,
          wind_dir: "",
          pressure_mb: 0,
          pressure_in: 0,
          precip_mm: 0,
          precip_in: 0,
          cloud: 0,
          feelslike_f: 0,
          windchill_c: 0,
          windchill_f: 0,
          heatindex_c: 0,
          heatindex_f: 0,
          dewpoint_c: 0,
          dewpoint_f: 0,
          vis_km: 0,
          vis_miles: 0,
          gust_mph: 0,
          gust_kph: 0,
        },
      },
      favorites: [],
      loading: false,
      error: "",
      forecast: null,
    },
    dispatch: mockDispatch,
  };

  const renderComponent = (props = {}) =>
    render(
      <WeatherDataContext.Provider value={defaultContextValue}>
        <Router>
          <WeatherCard
            temperature={25}
            description="Clear Sky"
            condition="Clear"
            humidity={40}
            windSpeed={10}
            name="Test City"
            {...props}
          />
        </Router>
      </WeatherDataContext.Provider>
    );

  it("should display weather information", () => {
    renderComponent();

    expect(screen.getByText("25°C")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByText("Humidity: 40%")).toBeInTheDocument();
    expect(screen.getByText("Wind: 10 km/h")).toBeInTheDocument();
    expect(screen.getByText("Test City")).toBeInTheDocument();
  });

  it("should display 'No Data to Show' when name is missing", () => {
    renderComponent({ name: "" });

    expect(screen.getByText("No Data to Show")).toBeInTheDocument();
  });

  it("should call handleFavorite when 'Add to favorites' is clicked", () => {
    renderComponent();

    const button = screen.getByText("Add to favorites");
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_FAVORITE",
      payload: [
        {
          location: {
            name: "Test City",
            region: "",
            country: "",
            lat: 0,
            lon: 0,
            tz_id: "",
            localtime_epoch: 0,
            localtime: "",
          },
          current: {
            temp_c: 25,
            condition: { text: "Clear", icon: "", code: 1000 },
            wind_kph: 10,
            humidity: 40,
            feelslike_c: 25,
            uv: 5,
            last_updated_epoch: 0,
            last_updated: "",
            temp_f: 0,
            is_day: 0,
            wind_mph: 0,
            wind_degree: 0,
            wind_dir: "",
            pressure_mb: 0,
            pressure_in: 0,
            precip_mm: 0,
            precip_in: 0,
            cloud: 0,
            feelslike_f: 0,
            windchill_c: 0,
            windchill_f: 0,
            heatindex_c: 0,
            heatindex_f: 0,
            dewpoint_c: 0,
            dewpoint_f: 0,
            vis_km: 0,
            vis_miles: 0,
            gust_mph: 0,
            gust_kph: 0,
          },
        },
      ],
    });
  });

  it("should call handleFavorite when 'Remove from favorites' is clicked", () => {
    const favoriteContextValue = {
      ...defaultContextValue,
      state: {
        ...defaultContextValue.state,
        favorites: [
          {
            location: {
              name: "Test City",
              region: "",
              country: "",
              lat: 0,
              lon: 0,
              tz_id: "",
              localtime_epoch: 0,
              localtime: "",
            },
            current: {
              temp_c: 25,
              condition: { text: "Clear", icon: "", code: 1000 },
              wind_kph: 10,
              humidity: 40,
              feelslike_c: 25,
              uv: 5,
              last_updated_epoch: 0,
              last_updated: "",
              temp_f: 0,
              is_day: 0,
              wind_mph: 0,
              wind_degree: 0,
              wind_dir: "",
              pressure_mb: 0,
              pressure_in: 0,
              precip_mm: 0,
              precip_in: 0,
              cloud: 0,
              feelslike_f: 0,
              windchill_c: 0,
              windchill_f: 0,
              heatindex_c: 0,
              heatindex_f: 0,
              dewpoint_c: 0,
              dewpoint_f: 0,
              vis_km: 0,
              vis_miles: 0,
              gust_mph: 0,
              gust_kph: 0,
            },
          },
        ],
      },
    };

    render(
      <WeatherDataContext.Provider value={favoriteContextValue}>
        <Router>
          <WeatherCard
            temperature={25}
            description="Clear Sky"
            condition="Clear"
            humidity={40}
            windSpeed={10}
            name="Test City"
          />
        </Router>
      </WeatherDataContext.Provider>
    );

    const button = screen.getByText("Remove from favorites");
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_FAVORITE",
      payload: "Test City",
    });
  });

  it("should navigate to details page when 'See More' is clicked", () => {
    renderComponent();

    const button = screen.getByText("See More...");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/details/Test City");
  });
});
