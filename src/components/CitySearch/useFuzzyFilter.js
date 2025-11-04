import React from "react";
import Fuse from "fuse.js";

export function useFuzzyFilter(data, terms) {
  const [city, admin, country] = terms;

  const fuse = React.useMemo(() => {
    const results = data?.results ?? [];
    return new Fuse(results, {
      includeScore: true,
      useExtendedSearch: true,
      keys: [
        { name: "name", weight: 10 },
        { name: "admin1" },
        { name: "admin2" },
        { name: "admin3" },
        { name: "country" },
      ],
    });
  }, [data]);

  const items = React.useMemo(() => {
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

  return items;
}
