import { buildDailyWeather } from "@/helpers";

function DailyForecast({ data }) {
  const dailyData = buildDailyWeather(data);

  return (
    <section className="daily-forecast">
      <h3>Daily forecast</h3>
      {dailyData.map((weather) => (
        <div key={weather.id} className="daily-forecast-card">
          {weather.day}
          <img
            src={`/icons/${weather.icon}.webp`}
            alt={`weather condition: ${weather.icon}`}
          />
          {weather.temperature_max}&deg;
          {weather.temperature_min}&deg;
        </div>
      ))}
    </section>
  );
}

export default DailyForecast;
