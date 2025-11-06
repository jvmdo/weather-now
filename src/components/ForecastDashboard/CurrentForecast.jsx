import React from "react";
import dayjs from "dayjs";
import { getIconFromWeatherCode } from "@/helpers";
import { UnitsContext } from "@/contexts";
import styles from "./CurrentForecast.module.css";

function CurrentForecast({ place, data }) {
  const { unitShorts } = React.useContext(UnitsContext);
  const icon = getIconFromWeatherCode(data.weather_code);

  return (
    <section className={styles.wrapper}>
      <div className={styles.hero}>
        <header>
          <h2>
            {place[0]}, {place[1]}
          </h2>
          <time dateTime={data.time}>
            {dayjs(data.time).format("dddd, MMM d, YYYY")}
          </time>
        </header>
        <div>
          <img src={`/icons/${icon}.webp`} alt={`weather condition: ${icon}`} />
          <strong>{Math.round(data.temperature_2m)}&deg;</strong>
        </div>
      </div>
      <div className={styles.variables}>
        <div>
          <p>Feels like</p>
          <span>{data.apparent_temperature}&deg;</span>
        </div>
        <div>
          <p>Humidity</p>
          <span>{data.relative_humidity_2m}%</span>
        </div>
        <div>
          <p>Wind</p>
          <span>
            {data.wind_speed_10m} {unitShorts.windSpeed}
          </span>
        </div>
        <div>
          <p>Precipitation</p>
          <span>
            {data.precipitation} {unitShorts.precipitation}
          </span>
        </div>
      </div>
    </section>
  );
}

export default CurrentForecast;
