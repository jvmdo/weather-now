import styles from "./SearchStatus.module.css";

const SEARCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  EMPTY: "empty",
  FOUND: "found",
};

const STATUS_CONFIG = {
  [SEARCH_STATUS.LOADING]: {
    name: "loading",
    icon: "loading",
    text: "Searching...",
  },
  [SEARCH_STATUS.ERROR]: {
    name: "error",
    icon: "error",
    text: "Something went wrong. Please try again.",
  },
  [SEARCH_STATUS.EMPTY]: {
    name: "empty",
    icon: "search-x",
    text: "No results found.",
  },
  [SEARCH_STATUS.FOUND]: {
    name: "found",
    icon: "search-check",
    text: (n) => `${n} result${n === 1 ? "" : "s"} found.`,
  },
};

function resolveSearchStatus({ isLoading, hasError, isEmpty }) {
  if (isLoading) return STATUS_CONFIG[SEARCH_STATUS.LOADING];
  if (hasError) return STATUS_CONFIG[SEARCH_STATUS.ERROR];
  if (isEmpty) return STATUS_CONFIG[SEARCH_STATUS.EMPTY];
  return STATUS_CONFIG[SEARCH_STATUS.FOUND];
}

function SearchStatus({ states, count = 0 }) {
  const { name, text, icon } = resolveSearchStatus(states);
  const content = typeof text === "function" ? text(count) : text;

  return (
    <div className={styles.wrapper}>
      <img
        src={`/public/icons/${icon}.svg`}
        className={styles[name]}
        aria-hidden
      />
      {content}
    </div>
  );
}

export default SearchStatus;
