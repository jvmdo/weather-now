import styles from "./SearchStatus.module.css";

const STATUS_CONFIG = {
  pending: {
    name: "loading",
    icon: "loading",
    text: "Searching...",
  },
  error: {
    name: "error",
    icon: "error",
    text: "Something went wrong. Please try again.",
  },
  empty: {
    name: "empty",
    icon: "search-x",
    text: "No results found.",
  },
  success: {
    name: "found",
    icon: "search-check",
    text: (n) => `${n} result${n === 1 ? "" : "s"} found.`,
  },
};

// Why not object lookup? Because statuses have priorities
function resolveSearchStatus({ status, isEmpty }) {
  if (status === "pending") return STATUS_CONFIG.pending;
  if (status === "error") return STATUS_CONFIG.error;
  if (isEmpty) return STATUS_CONFIG.empty;
  return STATUS_CONFIG.success;
}

function SearchStatus({ status, isEmpty, count = 0 }) {
  const { name, icon, text } = resolveSearchStatus({ status, isEmpty });
  const content = typeof text === "function" ? text(count) : text;

  return (
    <div className={styles.wrapper}>
      <img src={`/icons/${icon}.svg`} className={styles[name]} aria-hidden />
      {content}
    </div>
  );
}

export default SearchStatus;
