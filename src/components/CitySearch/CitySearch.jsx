import React from "react";
import Fuse from "fuse.js";
import { useQuery } from "@tanstack/react-query";
import { useThrottledValue } from "@tanstack/react-pacer";
import SearchInput from "./SearchInput";

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

function CitySearch() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const isFetchEnabled = searchTerm.length > 1;

  // TODO: disable for local filtering, i.e, after first comma
  const [throttledSearchTerm] = useThrottledValue(searchTerm, {
    wait: 1000,
    enabled: () => isFetchEnabled, // Prevent empty state flashing (why?)
  });
  const [city, admin, country] = throttledSearchTerm
    .split(",")
    .map((t) => t.trim());

  const { data, isPending, error } = useQuery({
    queryKey: ["city", city],
    queryFn: fetcher,
    enabled: isFetchEnabled, // Prevent fetching "" on mount
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
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isFetchEnabled && isPending} // Prevent loading state on mount
          isEmpty={!isPending && items.length === 0} // Prevent empty on mount and during isLoading
          items={isFetchEnabled ? items : []} // Clear results if input is empty
        />
        <button>Search</button>
      </form>
    </search>
  );
}

export default CitySearch;
