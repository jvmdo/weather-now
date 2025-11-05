import dayjs from "dayjs";
import { getIconFromWeatherCode } from "@/helpers";

function CurrentForecast({ place, data }) {
  const icon = getIconFromWeatherCode(data.weather_code);

  return (
    <section className="current-forecast">
      <div className="hero">
        <header>
          <h2>
            {place[0]}, {place[1]}
          </h2>
          <time dateTime={data.time}>
            {dayjs(data.time).format("dddd, MMM d, YYYY")}
          </time>
        </header>
        <img src={`/icons/${icon}.webp`} alt={`weather condition: ${icon}`} />
        <p>{data.temperature_2m}&deg;</p>
      </div>
      <div className="variables">
        <div>Feels like {data.apparent_temperature}&deg;</div>
        <div>Humidity {data.relative_humidity_2m}%</div>
        <div>Wind {data.wind_speed_10m}[unit]</div>
        <div>Precipitation {data.precipitation}[unit]</div>
      </div>
    </section>
  );
}

export default CurrentForecast;
