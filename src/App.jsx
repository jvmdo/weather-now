import "./App.css";

import UnitMenu from "./components/UnitMenu";
// import retry from "/icons/retry.svg";
// import search from "/icons/search.svg";
// import error from "/icons/error.svg";
// import bgLarge from "/images/bg-today-large.svg";
// import bgSmall from "/images/bg-today-small.svg";
import logo from "/logo.svg";
import "@/lib/day";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherSearch from "./components/WeatherSearch";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <div className="logo">
          <img src={logo} alt="Sun made of stack overflows" />
        </div>
        <UnitMenu />
      </header>
      <WeatherSearch />
    </QueryClientProvider>
  );
}

export default App;
