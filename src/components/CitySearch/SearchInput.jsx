import React from "react";

import { Command, useCommandState } from "cmdk";

import loadingIcon from "/icons/loading.svg";

function SearchInput({
  searchTerm,
  setSearchTerm,
  isLoading,
  isEmpty,
  items,
  onSelect,
}) {
  const inputRef = React.useRef(null);
  const [page, setPage] = React.useState(10);

  React.useEffect(() => {
    inputRef?.current.focus();
  }, []);

  const incrementPagination = () => {
    setPage((currentPage) => currentPage + 10);
  };

  // TODO: arrow nagivation not working
  return (
    <Command shouldFilter={false} loop={false}>
      <Command.Input
        ref={inputRef}
        placeholder="New York, Idaho, United States"
        title="Search cities. For finer, include state and country separated by a comma."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />

      <Command.List>
        {isLoading && (
          <Command.Loading>
            <img src={loadingIcon} alt="" />
            Search in progress
          </Command.Loading>
        )}

        {isEmpty && <Command.Empty>No results found.</Command.Empty>}

        {items.slice(0, page).map(({ item: city }) => (
          <Command.Item key={city.id} onSelect={() => onSelect(city)}>
            {`${city.name}, ${city.admin1 ?? "-"}, ${city.country}`}
          </Command.Item>
        ))}
      </Command.List>
      <PaginationButton
        itemsLength={items.length}
        incrementPagination={incrementPagination}
      />
    </Command>
  );
}

function PaginationButton({ itemsLength, incrementPagination }) {
  const hasPagesLeft = useCommandState(({ filtered }) => {
    return filtered.count < itemsLength;
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
