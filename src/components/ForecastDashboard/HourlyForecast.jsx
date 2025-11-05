import React from "react";

import useDaysOfWeek from "@/hooks/useDaysOfWeek";
import HourlyForecastSelect from "../HourlyForecastSelect";
import { buildHourlyWeather } from "@/helpers";

function HourlyForecast({ data }) {
  const daysOfWeek = useDaysOfWeek();
  const [day, setDay] = React.useState(daysOfWeek[0]);

  const hourlyData = buildHourlyWeather(data);

  // TODO: Scrollable container
  return (
    <section className="hourly-forecast">
      <header>
        <h3>Hourly forecast</h3>
        <HourlyForecastSelect
          day={day}
          setDay={setDay}
          daysOfWeek={daysOfWeek}
        />
      </header>
      {hourlyData[day]?.map((weather) => (
        <div key={weather.id} className="hourly-forecast-card">
          <img
            src={`/icons/${weather.icon}.webp`}
            alt={`weather condition: ${weather.icon}`}
          />
          {weather.hour}
          {weather.temperature}&deg;
        </div>
      ))}
    </section>
  );
}

export default HourlyForecast;
