import "./App.css";
import CitySearch from "./components/CitySearch";
import HourlyForecastSelect from "./components/HourlyForecastSelect";
import UnitMenu from "./components/UnitMenu";
// import retry from "/icons/retry.svg";
// import search from "/icons/search.svg";
// import snow from "/icons/snow.webp";
// import loading from "/icons/loading.svg";
// import fog from "/icons/fog.webp";
// import error from "/icons/error.svg";
// import storm from "/icons/storm.webp";
// import cloudy from "/icons/partly-cloudy.webp";
// import drizzle from "/icons/drizzle.webp";
// import rain from "/icons/rain.webp";
// import overcast from "/icons/overcast.webp";
// import bgLarge from "/images/bg-today-large.svg";
// import bgSmall from "/images/bg-today-small.svg";
import logo from "/logo.svg";
import sunny from "/icons/sunny.webp";
import "@/lib/day";

function App() {
  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="Sun made of stack overflows" />
        </div>
        <UnitMenu />
      </header>
      <main>
        <h1>How's the sky looking today?</h1>
        <search>
          <form>
            <CitySearch />
            <button>Search</button>
          </form>
        </search>
        <div className="wrapper">
          <section className="current-forecast">
            <div className="hero">
              <header>
                <h2>City, Country</h2>
                <time>Date, Month Day, Year</time>
              </header>
              <img src={sunny} alt="weather condition" />
              <p>[Degrees]</p>
            </div>
            <div className="variables">
              <div>Feels like [Value]</div>
              <div>Humidity [Value]</div>
              <div>Wind [Value]</div>
              <div>Precipitation [Value]</div>
            </div>
          </section>
          <section className="daily-forecast">
            <h3>Daily forecast</h3>
            <div className="daily-forecast-card">
              [Date] [Weather icon] [Max deg] [Min deg]
            </div>
            <div className="daily-forecast-card">
              [Date] [Weather icon] [Max deg] [Min deg]
            </div>
            <div className="daily-forecast-card">
              [Date] [Weather icon] [Max deg] [Min deg]
            </div>
            <div className="daily-forecast-card">
              [Date] [Weather icon] [Max deg] [Min deg]
            </div>
            <div className="daily-forecast-card">
              [Date] [Weather icon] [Max deg] [Min deg]
            </div>
            <div className="daily-forecast-card">
              [Date] [Weather icon] [Max deg] [Min deg]
            </div>
            <div className="daily-forecast-card">
              [Date] [Weather icon] [Max deg] [Min deg]
            </div>
          </section>
          <section className="hourly-forecast">
            <header>
              <h3>Hourly forecast</h3>
              <HourlyForecastSelect />
            </header>
            <div className="hourly-forecast-card">
              [Weather icon] [Hour] [Degrees]
            </div>
            <div className="hourly-forecast-card">
              [Weather icon] [Hour] [Degrees]
            </div>
            <div className="hourly-forecast-card">
              [Weather icon] [Hour] [Degrees]
            </div>
            <div className="hourly-forecast-card">
              [Weather icon] [Hour] [Degrees]
            </div>
            <div className="hourly-forecast-card">
              [Weather icon] [Hour] [Degrees]
            </div>
            <div className="hourly-forecast-card">
              [Weather icon] [Hour] [Degrees]
            </div>
            <div className="hourly-forecast-card">
              [Weather icon] [Hour] [Degrees]
            </div>
            {/* TODO: Scrollable container */}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
