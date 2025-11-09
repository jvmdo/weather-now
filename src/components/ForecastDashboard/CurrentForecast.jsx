import React from "react";
import dayjs from "dayjs";
import { getIconFromWeatherCode } from "@/helpers";
import { UnitsContext } from "@/contexts";
import styles from "./CurrentForecast.module.css";

function CurrentForecast({ place, data, isLoading }) {
  const { unitShorts } = React.useContext(UnitsContext);

  const icon = getIconFromWeatherCode(data?.weather_code);
  const suffixes = [
    "°",
    "%",
    ` ${unitShorts.windSpeed}`,
    ` ${unitShorts.precipitation}`,
  ];
  const variables = [
    ["Feels like", data?.apparent_temperature],
    ["Humidity", data?.relative_humidity_2m],
    ["Wind", data?.wind_speed_10m],
    ["Precipitation", data?.precipitation],
  ];

  return (
    <section className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.hero_skeleton}>
          <img src="/icons/loading.svg" alt="three dots spinning clockwise " />
          <p>Loading...</p>
        </div>
      ) : (
        <div className={styles.hero}>
          <header>
            <h2>
              {place[0]}, {place[1]}
            </h2>
            <time dateTime={data.time}>
              {dayjs(data.time).format("dddd, MMM DD, YYYY")}
            </time>
          </header>
          <div>
            <img
              src={`/icons/${icon}.webp`}
              alt={`weather condition: ${icon}`}
            />
            <strong>{Math.round(data.temperature_2m)}&deg;</strong>
          </div>
        </div>
      )}
      <div className={styles.variables}>
        {variables.map(([title, value], i) => (
          <div key={title}>
            <p>{title}</p>
            <span data-loading={isLoading}>
              {typeof value === "number" ? value + suffixes[i] : ""}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CurrentForecast;
