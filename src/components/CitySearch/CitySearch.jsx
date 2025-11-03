import React from "react";
import { Command, useCommandState } from "cmdk";
import Fuse from "fuse.js";

function CitySearch() {
  const [searchTerm, setSearchTerm] = React.useState("new york");
  const [payload, setPayload] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(10);

  const fuse = new Fuse(payload, {
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
  const [name, admin, country] = searchTerm.split(",").map((t) => t.trim());
  const items = fuse.search({
    $or: [
      { name: `${name}` },
      { admin1: `${admin}` },
      { admin2: `${admin}` },
      { admin3: `${admin}` },
      { country: `${country}` },
    ],
  });

  React.useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await fetch("/data.json");
      const data = await response.json();
      setPayload(data.results);
      setLoading(false);
    };

    fetcher();
  }, []);

  const incrementPagination = () => {
    setPage((currentPage) => currentPage + 10);
  };

  return (
    <Command shouldFilter={false} loop={false}>
      <Command.Input
        placeholder="Miami, Florida, United States"
        value={searchTerm}
        onValueChange={setSearchTerm}
      />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        {loading && <Command.Loading>Hang on…</Command.Loading>}
        {items.slice(0, page).map(({ item: city }) => (
          <Command.Item
            key={city.id}
            onSelect={(value) => console.log("Selected", value)}
          >
            {`${city.name}, ${city.admin1}, ${city.country}`}
          </Command.Item>
        ))}
      </Command.List>
      <PaginationButton
        totalLength={items.length}
        incrementPagination={incrementPagination}
      />
    </Command>
  );
}

function PaginationButton({ totalLength, incrementPagination }) {
  const hasPagesLeft = useCommandState(({ filtered }) => {
    return filtered.count < totalLength;
  });

  if (!hasPagesLeft) {
    return null;
  }

  return (
    <button type="button" onClick={incrementPagination}>
      Show more
    </button>
  );
}

export default CitySearch;
