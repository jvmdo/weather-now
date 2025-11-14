import { weatherCodeToIcon } from "@/constants";
import { arrayChunk, buildDaysOfWeek, stripFalsy } from "@/utils";
import dayjs from "dayjs";
import { matchSorter } from "match-sorter";

export function getIconFromWeatherCode(code) {
  const pairs = Array.from(weatherCodeToIcon);
  for (let pair of pairs) {
    const [[min, max], icon] = pair;
    if (min <= code && max >= code) {
      return icon;
    }
  }
}

export function buildDailyWeather(data) {
  if (!data) return [];

  const { time, weather_code, temperature_2m_max, temperature_2m_min } = data;

  return Array.from({ length: 7 }, (_, i) => ({
    id: crypto.randomUUID(),
    day: dayjs(time[i]).format("ddd"),
    icon: getIconFromWeatherCode(weather_code[i]),
    temperature_max: Math.ceil(temperature_2m_max[i]),
    temperature_min: Math.floor(temperature_2m_min[i]),
  }));
}

export function buildHourlyWeather(data) {
  if (!data) {
    const [today] = buildDaysOfWeek();
    return {
      [today]: Array.from({ length: 24 }, () => ({
        id: crypto.randomUUID(),
      })),
    };
  }

  const { time, weather_code, temperature_2m } = data;

  // Chunk to split the array in 7, each for a day of the week
  const dailyTime = arrayChunk(time, 7);
  const dailyWeatherCode = arrayChunk(weather_code, 7);
  const dailyMaxTemp = arrayChunk(temperature_2m, 7);

  const hourlyWeatherPerDay = Array.from({ length: 7 }, (_, i) =>
    // Assuming 24-format
    Array.from({ length: 24 }, (_, j) => ({
      id: crypto.randomUUID(),
      hour: dayjs(dailyTime[i][j]).format("h A"),
      icon: getIconFromWeatherCode(dailyWeatherCode[i][j]),
      temperature: Math.round(dailyMaxTemp[i][j]),
    }))
  );

  const daysOfWeek = buildDaysOfWeek();

  const entries = Array.from({ length: 7 }, (_, i) => [
    daysOfWeek[i],
    hourlyWeatherPerDay[i],
  ]);

  return Object.fromEntries(entries);
}

export function extractLocationTerms(termStr) {
  const terms = termStr.split(",").map((t) => t.trim());
  return {
    name: terms[0],
    admin1: terms[1],
    country: terms[2],
  };
}

export function formatLocationTerms(city) {
  return `${city?.name}, ${city?.admin1 ?? "-"}, ${city?.country}`;
}

export function fuzzyFilter(item, query) {
  if (!query) {
    return true;
  }

  const { value: city } = item;
  const terms = query.split(",").map((term) => term.trim());

  const result = terms.reduce(
    (acc, term) =>
      matchSorter(acc, term, {
        keys: ["name", "admin1", "country"],
      }),
    [city]
  );

  return result.length > 0;
}

export const buildWeatherUrl = (latitude, longitude, unitValues) => {
  const WEATHER_VARIABLES = {
    current:
      "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,apparent_temperature",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    hourly: "temperature_2m,weather_code",
    timezone: "auto",
  };

  const searchParams = stripFalsy({
    latitude,
    longitude,
    wind_speed_unit: unitValues.windSpeed,
    temperature_unit: unitValues.temperature,
    precipitation_unit: unitValues.precipitation,
    ...WEATHER_VARIABLES,
  });

  const url =
    "https://api.open-meteo.com/v1/forecast?" +
    new URLSearchParams(searchParams);

  return url;
};
