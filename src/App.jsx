import React from "react";

import "@/lib/day";
import { ErrorBoundary } from "react-error-boundary";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import WeatherSearch from "./components/WeatherSearch";
import UnitsContextProvider from "./contexts/UnitsContext";
import Header from "./components/Header";
import ErrorFallback from "./components/ErrorFallback";

const queryClient = new QueryClient();

function App() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <UnitsContextProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <WeatherSearch />
        </ErrorBoundary>
      </QueryClientProvider>
    </UnitsContextProvider>
  );
}

export default App;
