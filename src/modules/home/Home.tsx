import {
  CircularProgress,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Home.module.scss";
import { useContext, useState } from "react";
import { onSearch } from "./services/home.service";
import useDebounce from "../core/hooks/useDebounce";
import { WeatherDataContext } from "../core/context/context";
import WeatherCard from "../core/common/components/weather-card/WeatherCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { dispatch, state } = useContext(WeatherDataContext);
  const { currentSearch, loading } = state;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const debouncedSearch = useDebounce({ callback: onSearch, delay: 500 });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    debouncedSearch({ city: value, dispatch, navigate });
  };

  return (
    <div className={styles.homeContainer}>
      <Grid2
        container
        spacing={2}
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Grid2
          container
          alignItems="center"
          justifyContent="center"
          size={{ xs: 12, md: 12 }}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
            <OutlinedInput
              value={search}
              name="search"
              onChange={handleSearch}
              id="outlined-adornment-search"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              label="Search"
            />
          </FormControl>
        </Grid2>
        <Grid2
          container
          alignItems="center"
          justifyContent="center"
          size={{ xs: 12, md: 12 }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <WeatherCard
              temperature={currentSearch?.current.temp_c ?? 0}
              description={currentSearch?.current.condition.icon ?? ""}
              condition={currentSearch?.current.condition.text ?? ""}
              humidity={currentSearch?.current.humidity ?? 0}
              windSpeed={currentSearch?.current.wind_kph ?? 0}
              name={currentSearch?.location.name ?? ""}
            />
          )}
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Home;
