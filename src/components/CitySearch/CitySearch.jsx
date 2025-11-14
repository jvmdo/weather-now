import React from "react";

import { useThrottledValue } from "@tanstack/react-pacer";
import SearchAutocomplete from "./SearchAutocomplete";
import styles from "./CitySearch.module.css";
import useCities from "./useCities";

function CitySearch({ setLocation }) {
  const [searchTerms, setSearchTerms] = React.useState("");

  const hasComma = searchTerms.includes(","); // Searching for admin or country
  const hasCityName = searchTerms.length > 1; // Min 2 characters (API rules)

  const [throttledSearchTerms] = useThrottledValue(searchTerms, {
    wait: hasComma ? 0 : 1000, // No throttle for local filtering
    enabled: () => hasCityName, // Prevent empty requests
  });

  const isTyping = searchTerms.trim() !== throttledSearchTerms.trim();
  const isFetchEnabled = hasCityName && !hasComma;

  const { cities, status, isFetching, isPlaceholderData } = useCities(
    throttledSearchTerms,
    isFetchEnabled
  );

  const handleSelectedTerms = (city) => {
    setLocation({
      place: [city.name, city.country],
      latLng: [city.latitude, city.longitude],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const isLoading = isFetching || (isTyping && isPlaceholderData);

  return (
    <search className={styles.search}>
      <form onSubmit={handleSubmit}>
        <SearchAutocomplete
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
          onItemSelect={handleSelectedTerms}
          searchResults={cities}
          status={isLoading ? "pending" : status}
          isEmpty={!isFetching && cities?.length === 0}
          shouldFilter={hasComma} // Local filter for admin and country only
        />
        <button>Search</button>
      </form>
    </search>
  );
}

export default CitySearch;
