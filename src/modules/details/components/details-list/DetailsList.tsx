import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetails } from "../../services/details.service";
import { WeatherDataContext } from "@/modules/core/context/context";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid2,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OpacityIcon from "@mui/icons-material/Opacity";
import { ForecastDay, Hour } from "../../types/details";

const WeatherForecast: React.FC = () => {
  const { dispatch, state } = useContext(WeatherDataContext);
  const { forecast, loading } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getDetails({ city: id ?? "", dispatch, navigate });
  }, [id, dispatch, navigate]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Weather Forecast for {forecast?.location?.name}, &nbsp;
            {forecast?.location.country}
          </Typography>

          {forecast?.forecast.forecastday.map((day: ForecastDay) => (
            <Card key={day.date} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {day.date}
                </Typography>
                <Grid2 container alignItems="center" spacing={2}>
                  <Grid2 container>
                    <img
                      src={day.day.condition.icon}
                      alt={day.day.condition.text}
                      style={{ width: 40, height: 40, marginRight: 8 }}
                    />
                  </Grid2>
                  <Grid2 container size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="body1">
                      Max Temp: {day.day.maxtemp_c}°C | Min Temp:{" "}
                      {day.day.mintemp_c}°C
                    </Typography>
                    <Typography variant="body1">
                      Condition: {day.day.condition.text}
                    </Typography>
                  </Grid2>
                </Grid2>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Hourly Data</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid2 container spacing={2}>
                      {day.hour.map((hour: Hour) => (
                        <Grid2
                          container
                          size={{ xs: 12, sm: 6, md: 4 }}
                          key={hour.time}
                        >
                          <Card sx={{ marginBottom: 1 }}>
                            <CardContent>
                              <Grid2 container alignItems="center">
                                <Grid2 container>
                                  <img
                                    src={hour.condition.icon}
                                    alt={hour.condition.text}
                                    style={{
                                      width: 30,
                                      height: 30,
                                      marginRight: 8,
                                    }}
                                  />
                                </Grid2>
                                <Grid2 container>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {hour.time}
                                  </Typography>
                                </Grid2>
                              </Grid2>
                              <Typography variant="body2">
                                Temp: {hour.temp_c}°C
                              </Typography>
                              <Grid2 container alignItems="center">
                                <WbSunnyIcon fontSize="small" />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  UV: {hour.uv}
                                </Typography>
                              </Grid2>
                              <Grid2 container alignItems="center">
                                <AirIcon fontSize="small" />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  Wind: {hour.wind_kph} kph
                                </Typography>
                              </Grid2>
                              <Grid2 container alignItems="center">
                                <WaterDropIcon fontSize="small" />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  Humidity: {hour.humidity}%
                                </Typography>
                              </Grid2>
                              <Grid2 container alignItems="center">
                                <OpacityIcon fontSize="small" />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  Precipitation: {hour.precip_mm} mm
                                </Typography>
                              </Grid2>
                            </CardContent>
                          </Card>
                        </Grid2>
                      ))}
                    </Grid2>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default WeatherForecast;
