import List from "@/modules/core/common/components/app-list/List";
import styles from "./WeatherList.module.scss";
import { useContext } from "react";
import { WeatherDataContext } from "@/modules/core/context/context";
import WeatherCard from "@/modules/core/common/components/weather-card/WeatherCard";
import { Typography } from "@mui/material";
const WeatherList = () => {
  const { state } = useContext(WeatherDataContext);
  const { favorites } = state;

  return (
    <div className={styles.listContainer}>
      {!favorites.length ? (
        <Typography>There is not data available</Typography>
      ) : (
        <List
          options={favorites ?? []}
          renderItem={(item) => (
            <WeatherCard
              key={item?.location.name}
              temperature={item?.current.temp_c ?? 0}
              description={item?.current.condition.icon ?? ""}
              condition={item?.current.condition.text ?? ""}
              humidity={item?.current.humidity ?? 0}
              windSpeed={item?.current.wind_kph ?? 0}
              name={item?.location.name ?? ""}
            />
          )}
        />
      )}
    </div>
  );
};

export default WeatherList;
