import React from "react";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useThrottledValue } from "@tanstack/react-pacer";
import { extractLocationTerms, formatLocationTerms } from "@/helpers";
import SearchAutocomplete from "./SearchAutocomplete";
import styles from "./CitySearch.module.css";

async function fetcher({ queryKey }) {
  const [_, city] = queryKey;
  const searchParams = {
    format: "json",
    language: "en",
    count: "50",
    name: city,
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

function CitySearch({ setLocation }) {
  const [searchTerms, setSearchTerms] = React.useState(
    "Xique-Xique, Bahia, Brazil"
  );
  const isFetchEnabled = searchTerms.length > 1;

  const [throttledSearchTerms] = useThrottledValue(searchTerms, {
    wait: searchTerms.includes(",") ? 0 : 1000, // No throttle for local filtering
    enabled: () => isFetchEnabled, // Prevent empty requests
  });
  const isTyping = searchTerms.trim() !== throttledSearchTerms.trim();

  const terms = extractLocationTerms(throttledSearchTerms);
  const {
    data: cities,
    isPending,
    error,
  } = useQuery({
    queryKey: ["cities", terms.name],
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
    select: (data) => {
      const results = data?.results ?? [];
      return results.map((city) => ({
        value: city,
        label: formatLocationTerms(city),
      }));
    },
  });

  const handleSelectedTerms = (city) => {
    setLocation({
      place: [city.name, city.country],
      latLng: [city.latitude, city.longitude],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <search className={styles.search}>
      <form onSubmit={handleSubmit}>
        <SearchAutocomplete
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
          onItemSelect={handleSelectedTerms}
          searchResults={cities}
          isLoading={isPending || isTyping}
          isEmpty={!isPending && cities.length === 0}
          hasErrors={Boolean(error)}
        />
        <button>Search</button>
      </form>
    </search>
  );
}

export default CitySearch;
