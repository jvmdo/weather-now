import React from "react";

import { Command, useCommandState } from "cmdk";
import loadingIcon from "/icons/loading.svg";
import styles from "./SearchInput.module.css";

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
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    const inputNode = inputRef?.current;
    const expandList = () => setIsExpanded(true);
    const collapseList = () => setTimeout(() => setIsExpanded(false), 100);

    inputNode.addEventListener("focus", expandList);
    inputNode.addEventListener("blur", collapseList);
    inputNode.addEventListener("keydown", expandList);
    return () => {
      inputNode.removeEventListener("onfocus", expandList);
      inputNode.removeEventListener("blur", collapseList);
      inputNode.removeEventListener("keydown", expandList);
    };
  }, []);

  const incrementPagination = () => {
    setPage((currentPage) => currentPage + 10);
  };

  // ! Select restores scroll position to start
  return (
    <Command shouldFilter={false} className={styles.command}>
      <Command.Input
        ref={inputRef}
        className={styles.input}
        placeholder="New York, Idaho, United States"
        title="Search cities. For finer, include state and country separated by a comma."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />

      {isExpanded && (
        <Command.List>
          {isLoading && (
            <Command.Loading>
              <img src={loadingIcon} alt="" />
              Search in progress
            </Command.Loading>
          )}

          {isEmpty && <Command.Empty>No search result found.</Command.Empty>}

          {items.slice(0, page).map(({ item: city }) => (
            <Command.Item
              key={city.id}
              value={String(city.id)}
              onSelect={() => {
                onSelect(city);
                setIsExpanded(false);
              }}
            >
              {`${city.name}, ${city.admin1 ?? "-"}, ${city.country}`}
            </Command.Item>
          ))}
          <PaginationButton
            itemsLength={items.length}
            incrementPagination={incrementPagination}
          />
        </Command.List>
      )}
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
