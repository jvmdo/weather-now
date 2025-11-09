import { extractLocationTerms, formatLocationTerms } from "@/helpers";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

async function getCities({ queryKey }) {
  const [_, name] = queryKey;
  const searchParams = {
    name,
    count: "50",
    language: "en",
    format: "json",
  };
  const params = new URLSearchParams(searchParams);
  const endpoint = `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = await response.json();
  return data;
}

export default (searchTerms, isFetchEnabled) => {
  const { name } = extractLocationTerms(searchTerms);

  const { data, ...rest } = useQuery({
    queryKey: ["cities", name],
    queryFn: getCities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
    enabled: isFetchEnabled, // Fetch for cities names only
    select: (data) => {
      const results = data?.results ?? [];
      return results.map((city) => ({
        value: city,
        label: formatLocationTerms(city),
      }));
    },
  });

  return { cities: data, ...rest };
};
