import React from "react";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import useDaysOfWeek from "@/components/ForecastDashboard/useDaysOfWeek";
import HourlyForecastSelect from "../HourlyForecastSelect";
import { buildHourlyWeather } from "@/helpers";
import styles from "./HourlyForecast.module.css";

function HourlyForecast({ data, isLoading }) {
  const daysOfWeek = useDaysOfWeek();
  const [day, setDay] = React.useState(daysOfWeek[0]);

  const hourlyData = buildHourlyWeather(data);

  return (
    <section className={styles.wrapper}>
      <header>
        <h3>Hourly forecast</h3>
        <HourlyForecastSelect
          day={day}
          setDay={setDay}
          daysOfWeek={daysOfWeek}
          isLoading={isLoading}
        />
      </header>
      <ScrollArea.Root className={styles.root}>
        <ScrollArea.Viewport className={styles.viewport}>
          {hourlyData[day]?.map((weather) => (
            <div key={weather.id} className={styles.card}>
              {!isLoading && (
                <>
                  <img
                    src={`/icons/${weather.icon}.webp`}
                    alt={`weather condition: ${weather.icon}`}
                  />
                  <span>{weather.hour}</span>
                  <span>{weather.temperature}&deg;</span>
                </>
              )}
            </div>
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className={styles.scrollbar}
        >
          <ScrollArea.Thumb className={styles.thumb} />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </section>
  );
}

export default HourlyForecast;
