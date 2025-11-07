import React from "react";

import { useQuery } from "@tanstack/react-query";
import { UnitsContext } from "@/contexts";
import { stripFalsy } from "@/utils";
import CurrentForecast from "./CurrentForecast";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import styles from "./ForecastDashboard.module.css";

const fetcher = async ({ queryKey }) => {
  const [_, [latitude, longitude], unitValues] = queryKey;
  const searchParams = {
    latitude,
    longitude,
    wind_speed_unit: unitValues.windSpeed,
    temperature_unit: unitValues.temperature,
    precipitation_unit: unitValues.precipitation,
    current:
      "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,apparent_temperature",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    hourly: "temperature_2m,weather_code",
    timezone: "auto",
  };
  const params = new URLSearchParams(stripFalsy(searchParams));
  const endpoint = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  // For loading or error states to show up
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      Math.random() > 0.2 ? resolve("Saul Goodman") : reject("Fake error");
    }, 1000)
  );
  const response = await fetch(endpoint);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};

function ForecastDashboard({ place, latLng }) {
  const { unitValues } = React.useContext(UnitsContext);
  const { data, isPending } = useQuery({
    queryKey: ["city-weather", latLng, unitValues],
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000,
    retry: false,
    throwOnError: true,
    // enabled: latLng[0] + latLng[1] !== 0,
  });

  return (
    <div className={styles.dashboard}>
      <CurrentForecast
        place={place}
        data={data?.current}
        isLoading={isPending}
      />
      <DailyForecast data={data?.daily} isLoading={isPending} />
      <HourlyForecast data={data?.hourly} isLoading={isPending} />
    </div>
  );
}

export default ForecastDashboard;
