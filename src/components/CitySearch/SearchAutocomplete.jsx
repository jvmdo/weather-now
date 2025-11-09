import * as React from "react";

import { Autocomplete } from "@base-ui-components/react/autocomplete";
import styles from "./SearchAutocomplete.module.css";
import { fuzzyFilter } from "@/helpers";

export default function SearchAutocomplete({
  searchTerms,
  setSearchTerms,
  onItemSelect,
  searchResults,
  isLoading,
  isEmpty,
  hasErrors,
  shouldFilter,
}) {
  // TODO: Move to component, color grey
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

  // TODO If the next term is found in current list, do not make another request || do not filter by city
  // Problemas:
  // 4. Conflito entre filtragem local e filtragem da API: no results -> loading -> no results
  return (
    <Autocomplete.Root
      items={searchResults}
      value={searchTerms}
      onValueChange={setSearchTerms}
      filter={shouldFilter ? fuzzyFilter : null}
      autoHighlight={true}
      alwaysSubmitOnEnter={true}
      required={true}
    >
      <Autocomplete.Input
        placeholder="Xique-Xique, Bahia, Brazil"
        title="Search by city names. For finer, include state and country separated by a comma."
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
