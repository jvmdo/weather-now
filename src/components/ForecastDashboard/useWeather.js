import React from "react";

import { UnitsContext } from "@/contexts";
import { useQuery } from "@tanstack/react-query";
import { buildWeatherUrl } from "@/helpers";

const getWeather = async ({ queryKey }) => {
  const [_, [latitude, longitude], unitValues] = queryKey;
  const url = buildWeatherUrl(latitude, longitude, unitValues);

  // For loading or error states to show up
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      Math.random() > 0.2 ? resolve("Saul Goodman") : reject("Fake error");
    }, 1000)
  );
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
};

export const useWeather = (latLng) => {
  const { unitValues } = React.useContext(UnitsContext);
  return useQuery({
    queryKey: ["city-weather", latLng, unitValues],
    queryFn: getWeather,
    staleTime: 5 * 60 * 1000,
    retry: false,
    throwOnError: true,
    // enabled: latLng[0] + latLng[1] !== 0,
  });
};
