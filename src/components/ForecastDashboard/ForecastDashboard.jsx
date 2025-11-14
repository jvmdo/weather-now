import CurrentForecast from "./CurrentForecast";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import styles from "./ForecastDashboard.module.css";
import { useWeather } from "./useWeather";

function ForecastDashboard({ place, latLng }) {
  const { data, isPending } = useWeather(latLng);

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
