import "./App.css";

// import retry from "/icons/retry.svg";
// import search from "/icons/search.svg";
// import error from "/icons/error.svg";
// import bgLarge from "/images/bg-today-large.svg";
// import bgSmall from "/images/bg-today-small.svg";
import "@/lib/day";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherSearch from "./components/WeatherSearch";
import UnitsContextProvider from "./contexts/UnitsContext";
import Header from "./components/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <UnitsContextProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <WeatherSearch />
      </QueryClientProvider>
    </UnitsContextProvider>
  );
}

export default App;
