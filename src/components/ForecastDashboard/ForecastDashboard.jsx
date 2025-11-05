import React from "react";

import dayjs from "dayjs";
import HourlyForecastSelect from "../HourlyForecastSelect";
import { useQuery } from "@tanstack/react-query";
import {
  buildDailyWeather,
  buildHourlyWeather,
  getIconFromWeatherCode,
} from "@/helpers";

const fetcher = async ({ queryKey }) => {
  const [_, [latitude, longitude]] = queryKey;
  const searchParams = {
    latitude,
    longitude,
    wind_speed_unit: "mph",
    temperature_unit: "fahrenheit",
    precipitation_unit: "inch",
    current:
      "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,apparent_temperature",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    hourly: "temperature_2m,weather_code",
    timezone: "auto",
  };
  const params = new URLSearchParams(searchParams);
  const endpoint = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  const response = await fetch(endpoint);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};

function ForecastDashboard({ place, latLng }) {
  // TODO: units context

  const { data, isPending, error } = useQuery({
    queryKey: ["city-weather", latLng],
    queryFn: fetcher,
    enabled: latLng[0] + latLng[1] !== 0,
    staleTime: 5 * 60 * 1000,
  });

  const currentWeather = data?.current;
  const icon = getIconFromWeatherCode(currentWeather?.weather_code);
  const dailyWeather = buildDailyWeather(data?.daily);
  const hourlyWeather = buildHourlyWeather(data?.hourly);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className="wrapper">
      <section className="current-forecast">
        <div className="hero">
          <header>
            <h2>
              {place[0]}, {place[1]}
            </h2>
            <time dateTime={currentWeather.time}>
              {dayjs(currentWeather.time).format("dddd, MMM d, YYYY")}
            </time>
          </header>
          <img src={`/icons/${icon}.webp`} alt={`weather condition: ${icon}`} />
          <p>{currentWeather.temperature_2m}&deg;</p>
        </div>
        <div className="variables">
          <div>Feels like {currentWeather.apparent_temperature}&deg;</div>
          <div>Humidity {currentWeather.relative_humidity_2m}%</div>
          <div>Wind {currentWeather.wind_speed_10m}[unit]</div>
          <div>Precipitation {currentWeather.precipitation}[unit]</div>
        </div>
      </section>
      <section className="daily-forecast">
        <h3>Daily forecast</h3>
        {dailyWeather.map((weather) => (
          <div key={weather.id} className="daily-forecast-card">
            {weather.day}
            <img
              src={`/icons/${weather.icon}.webp`}
              alt={`weather condition: ${icon}`}
            />
            {weather.temperature_max}&deg;
            {weather.temperature_min}&deg;
          </div>
        ))}
      </section>
      <section className="hourly-forecast">
        {/* TODO: Scrollable container */}
        <header>
          <h3>Hourly forecast</h3>
          <HourlyForecastSelect />
        </header>
        {hourlyWeather["Wednesday"]?.map((weather) => (
          <div key={weather.id} className="hourly-forecast-card">
            <img
              src={`/icons/${weather.icon}.webp`}
              alt={`weather condition: ${icon}`}
            />
            {weather.hour}
            {weather.temperature}&deg;
          </div>
        ))}
      </section>
    </div>
  );
}

export default ForecastDashboard;
