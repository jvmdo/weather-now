import React from "react";

import { Command, useCommandState } from "cmdk";

import loadingIcon from "/icons/loading.svg";

function SearchInput({
  items,
  isLoading,
  isEmpty,
  searchTerm,
  throttledSetSearchTerm,
}) {
  const [page, setPage] = React.useState(10);

  const incrementPagination = () => {
    setPage((currentPage) => currentPage + 10);
  };

  return (
    <Command shouldFilter={false} loop={false}>
      <Command.Input
        placeholder="Miami, Florida, United States"
        value={searchTerm}
        onValueChange={(value) => {
          throttledSetSearchTerm(value);
        }}
      />
      {isLoading ? (
        <Command.Loading>
          <img src={loadingIcon} alt="" />
          Search in progress
        </Command.Loading>
      ) : isEmpty ? (
        <p>No results found.</p>
      ) : (
        <Command.List>
          {items.slice(0, page).map(({ item: city }) => (
            <Command.Item
              key={city.id}
              onSelect={(value) => console.log("Selected", value)}
            >
              {`${city.name}, ${city.admin1 ?? "-"}, ${city.country}`}
            </Command.Item>
          ))}
        </Command.List>
      )}
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

export default SearchInput;
