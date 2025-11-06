import { buildDailyWeather } from "@/helpers";
import styles from "./DailyForecast.module.css";

function DailyForecast({ data }) {
  const dailyData = buildDailyWeather(data);

  return (
    <section className={styles.wrapper}>
      <h3>Daily forecast</h3>
      <div className={styles.cards}>
        {dailyData.map((weather) => (
          <div key={weather.id} className={styles.card}>
            <span>{weather.day}</span>
            <img
              src={`/icons/${weather.icon}.webp`}
              alt={`weather condition: ${weather.icon}`}
            />
            <div className={styles.temps}>
              <span>{weather.temperature_max}&deg;</span>
              <span>{weather.temperature_min}&deg;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DailyForecast;
