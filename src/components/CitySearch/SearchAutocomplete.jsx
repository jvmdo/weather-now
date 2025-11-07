import * as React from "react";

import { Autocomplete } from "@base-ui-components/react/autocomplete";
import styles from "./SearchAutocomplete.module.css";

export default function SearchAutocomplete({
  searchTerms,
  setSearchTerms,
  onItemSelect,
  searchResults,
  isLoading,
  isEmpty,
  hasErrors,
}) {
  let status = (
    <React.Fragment>{searchResults?.length ?? 0} results found.</React.Fragment>
  );

  if (isLoading) {
    status = (
      <React.Fragment>
        <span className={styles.spinner} aria-hidden />
        Search in progress
      </React.Fragment>
    );
  } else if (hasErrors) {
    status = (
      <React.Fragment>
        <span className={styles.error} aria-hidden />
        Something went wrong. Please, try again.
      </React.Fragment>
    );
  } else if (isEmpty) {
    status = <React.Fragment>No search results found.</React.Fragment>;
  }

  const shouldRenderPopup = true;

  return (
    <Autocomplete.Root
      items={searchResults}
      value={searchTerms}
      onValueChange={setSearchTerms}
      filter={null}
      autoHighlight={true}
      alwaysSubmitOnEnter={true}
      required={true}
    >
      <Autocomplete.Input
        placeholder="City, State, Country"
        title="Search cities. For finer, include state and country separated by a comma."
        className={styles.input}
        autoFocus={true}
      />

      {shouldRenderPopup && (
        <Autocomplete.Portal>
          <Autocomplete.Positioner align="end" sideOffset={8}>
            <Autocomplete.Popup
              className={styles.popup}
              aria-busy={isLoading || undefined}
            >
              {status && (
                <Autocomplete.Status className={styles.status}>
                  {status}
                </Autocomplete.Status>
              )}
              <Autocomplete.List>
                {(item) => (
                  <Autocomplete.Item
                    key={item.value.id}
                    value={item}
                    className={styles.item}
                    onClick={() => onItemSelect(item.value)}
                  >
                    {item.label}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      )}
    </Autocomplete.Root>
  );
}
