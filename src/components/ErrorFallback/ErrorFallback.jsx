import React from "react";

import styles from "./ErrorFallback.module.css";

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <main className={styles.container}>
      <img src="/icons/error.svg" alt="block" />
      <h1>Something went wrong</h1>
      <p>
        We could't connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button onClick={resetErrorBoundary}>
        <img src="/icons/retry.svg" alt="retry" />
        <span>Retry</span>
      </button>
    </main>
  );
}

export default ErrorFallback;
