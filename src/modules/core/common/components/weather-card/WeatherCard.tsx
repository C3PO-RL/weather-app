import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid2,
  CardActions,
  Button,
  Divider,
  CardHeader,
  Avatar,
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { WeatherDataContext } from "@/modules/core/context/context";
import { useNavigate } from "react-router-dom";
import { WeatherData } from "@/modules/home/types/weather";
import useSessionStorage from "@/modules/core/hooks/useSessionStorage";

type WeatherCardProps = {
  temperature: number;
  description: string;
  condition: string;
  humidity: number;
  windSpeed: number;
  name: string;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  description,
  condition,
  humidity,
  windSpeed,
  name,
}) => {
  const { state, dispatch } = useContext(WeatherDataContext);
  const { currentSearch, favorites } = state;
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/details/${name}`);
  };

  const isFavorite = favorites.some((item) => item.location.name === name);

  const [, setStoredValue] = useSessionStorage<WeatherData[]>(
    "favorites",
    favorites
  );

  const handleFavorite = () => {
    if (!isFavorite) {
      const newFavorite = currentSearch;
      dispatch({ type: "ADD_FAVORITE", payload: [newFavorite as WeatherData] });
      setStoredValue([...favorites, currentSearch as WeatherData]);
      return;
    }
    if (isFavorite) {
      dispatch({
        type: "REMOVE_FAVORITE",
        payload: name as string,
      });
      setStoredValue(favorites.filter((item) => item.location.name !== name));
      return;
    }
  };

  return (
    <>
      {!name ? (
        <Typography variant="h5">No Data to Show</Typography>
      ) : (
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="city">
                <LocationCityIcon />
              </Avatar>
            }
            title={name}
          />
          <Divider />
          <CardContent>
            <Grid2
              container
              spacing={2}
              justifyContent="center"
              alignContent="center"
            >
              <Grid2 size={{ xs: 12, md: 12 }}>
                {description ? (
                  <img src={description} alt="condition" />
                ) : (
                  "Loading..."
                )}
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Typography variant="h5">{temperature}°C</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {condition}
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2} style={{ marginTop: "10px" }}>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Typography variant="body2">
                  <OpacityIcon /> Humidity: {humidity}%
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <Typography variant="body2">
                  <AirIcon /> Wind: {windSpeed} km/h
                </Typography>
              </Grid2>
            </Grid2>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              onClick={handleFavorite}
              size="small"
              startIcon={
                <FavoriteIcon color={isFavorite ? "error" : "primary"} />
              }
            >
              {isFavorite?'Remove from favorites':'Add to favorites'}
            </Button>
            <Button size="small" onClick={handleSeeMore}>
              See More...
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default WeatherCard;
