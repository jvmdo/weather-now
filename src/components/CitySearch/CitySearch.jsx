import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useThrottledValue } from "@tanstack/react-pacer";
import { useFuzzyFilter } from "./useFuzzyFilter";
import SearchInput from "./SearchInput";
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
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
}

function CitySearch({ setLocation }) {
  // TODO: handle empty strings
  const [searchTerm, setSearchTerm] = React.useState("bocoio");
  const isFetchEnabled = searchTerm.length > 1;

  const [throttledSearchTerm] = useThrottledValue(searchTerm, {
    wait: searchTerm.includes(",") ? 0 : 1000, // No throttle for local filtering
    enabled: () => isFetchEnabled, // Prevent empty state flashing (why?)
  });
  const terms = throttledSearchTerm.split(",").map((t) => t.trim());

  const [city] = terms;
  const { data, isPending, error } = useQuery({
    queryKey: ["city", city],
    queryFn: fetcher,
    enabled: isFetchEnabled, // Prevent fetching "" on mount
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSelectedTerm = (city) => {
    setLocation({
      place: [city.name, city.country],
      latLng: [city.latitude, city.longitude],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Focus on input + tooltip
  };

  const items = useFuzzyFilter(data, terms);

  if (error) {
    return (
      <div>
        <p>Something in the way.</p>
        <button>Retry</button>
      </div>
    );
  }

  return (
    <search className={styles.search}>
      <form onSubmit={handleSubmit}>
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isFetchEnabled && isPending} // Prevent loading state on mount
          isEmpty={!isPending && items.length === 0} // Prevent empty on mount and during isLoading
          items={isFetchEnabled ? items : []} // Clear results if input is empty
          onSelect={handleSelectedTerm}
        />
        <button>Search</button>
      </form>
    </search>
  );
}

export default CitySearch;
