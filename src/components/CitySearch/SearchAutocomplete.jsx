import { Autocomplete } from "@base-ui-components/react/autocomplete";
import styles from "./SearchAutocomplete.module.css";
import { fuzzyFilter } from "@/helpers";
import SearchStatus from "./SearchStatus";

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

      <Autocomplete.Portal>
        <Autocomplete.Positioner align="end" sideOffset={8}>
          <Autocomplete.Popup
            className={styles.popup}
            aria-busy={isLoading || undefined}
          >
            <Autocomplete.Status className={styles.status}>
              <SearchStatus
                count={searchResults?.length}
                states={{ isLoading, isEmpty, hasErrors }}
              />
            </Autocomplete.Status>
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
    </Autocomplete.Root>
  );
}
