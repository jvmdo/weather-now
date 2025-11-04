import React from "react";
import Fuse from "fuse.js";
import { useQuery } from "@tanstack/react-query";
import { useThrottledValue } from "@tanstack/react-pacer";
import SearchInput from "./SearchInput";

async function fetcher({ queryKey }) {
  // TODO: to query search
  const [_, city] = queryKey;
  const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=50&language=en&format=json`;

  const response = await fetch(endpoint);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data;
}

// TODO Mix and match those magic numbers, figure them out!
function CitySearch() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [throttledSearchTerm] = useThrottledValue(searchTerm, {
    wait: 1000,
    enabled: () => searchTerm.length > 2, // Prevent flashing empty state (why?)
  });

  const [city, admin, country] = throttledSearchTerm
    .split(",")
    .map((t) => t.trim());

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["city", city],
    queryFn: fetcher,
    enabled: city.length > 0, // Prevent fetching "" on mount
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const payload = data?.results;

  // TODO test without memo
  const fuse = React.useMemo(
    () =>
      new Fuse(payload, {
        includeScore: true,
        useExtendedSearch: true,
        keys: [
          { name: "name", weight: 10 },
          { name: "admin1" },
          { name: "admin2" },
          { name: "admin3" },
          { name: "country" },
        ],
      }),
    [payload]
  );

  const items = React.useMemo(() => {
    if (!city && !admin && !country) return [];
    return fuse.search({
      $or: [
        { name: `${city}` },
        { admin1: `${admin}` },
        { admin2: `${admin}` },
        { admin3: `${admin}` },
        { country: `${country}` },
      ],
    });
  }, [fuse, city, admin, country]);

  const isEmpty =
    searchTerm.length > 0 && items.length === 0 && !(isFetching || isPending);

  if (error) {
    return (
      <div>
        <p>Something in the way.</p>
        <button>Retry</button>
      </div>
    );
  }

  return (
    <search>
      <form>
        <SearchInput
          items={searchTerm ? items : []}
          isLoading={searchTerm.length > 0 && (isFetching || isPending)}
          isEmpty={isEmpty}
          throttledSetSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
        <button>Search</button>
      </form>
    </search>
  );
}

export default CitySearch;
