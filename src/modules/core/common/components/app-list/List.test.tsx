import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import List from "./List";
import { WeatherData } from "@/modules/home/types/weather";

const mockData: WeatherData[] = [
  {
    location: {
      name: "London",
      region: "City of London, Greater London",
      country: "United Kingdom",
      lat: 51.5171,
      lon: -0.1062,
      tz_id: "Europe/London",
      localtime_epoch: 1729604449,
      localtime: "2024-10-22 14:40",
    },
    current: {
      last_updated_epoch: 1729603800,
      last_updated: "2024-10-22 14:30",
      temp_c: 16.2,
      temp_f: 61.2,
      is_day: 1,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        code: 1003,
      },
      wind_mph: 8.3,
      wind_kph: 13.3,
      wind_degree: 229,
      wind_dir: "SW",
      pressure_mb: 1028,
      pressure_in: 30.36,
      precip_mm: 0.04,
      precip_in: 0,
      humidity: 68,
      cloud: 75,
      feelslike_c: 16.2,
      feelslike_f: 61.2,
      windchill_c: 14,
      windchill_f: 57.2,
      heatindex_c: 14.8,
      heatindex_f: 58.7,
      dewpoint_c: 10.2,
      dewpoint_f: 50.3,
      vis_km: 10,
      vis_miles: 6,
      uv: 1.4,
      gust_mph: 11.1,
      gust_kph: 17.8,
    },
  },
];

describe("List Component", () => {
  it("renders without crashing", () => {
    render(
      <List
        options={mockData}
        renderItem={(item) => (
          <div key={item.location.name}>{item.location.name}</div>
        )}
      />
    );
    expect(screen.getByText("London")).toBeInTheDocument();
  });

  it("renders the title when provided", () => {
    render(
      <List
        options={mockData}
        renderItem={(item) => (
          <div key={item.location.name}>{item.location.name}</div>
        )}
        title="Weather List"
      />
    );
    expect(screen.getByText("Weather List")).toBeInTheDocument();
  });

  it("renders all items in the list", () => {
    render(
      <List
        options={mockData}
        renderItem={(item) => (
          <div key={item.location.name}>{item.location.name}</div>
        )}
      />
    );
    mockData.forEach((data) => {
      expect(screen.getByText(data.location.name)).toBeInTheDocument();
    });
  });

  it("renders custom content for each item", () => {
    render(
      <List
        options={mockData}
        renderItem={(item) => (
          <div key={item.location.name}>
            <h2>{item.location.name}</h2>
            <p>{item.current.condition.text}</p>
          </div>
        )}
      />
    );
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
  });
});
