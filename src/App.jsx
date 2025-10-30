import "./App.css";
import retry from "/icons/retry.svg";
import search from "/icons/search.svg";
import snow from "/icons/snow.webp";
import units from "/icons/units.svg";
import loading from "/icons/loading.svg";
import checkmark from "/icons/checkmark.svg";
import fog from "/icons/fog.webp";
import sunny from "/icons/sunny.webp";
import error from "/icons/error.svg";
import storm from "/icons/storm.webp";
import cloudy from "/icons/partly-cloudy.webp";
import drizzle from "/icons/drizzle.webp";
import rain from "/icons/rain.webp";
import dropdown from "/icons/dropdown.svg";
import overcast from "/icons/overcast.webp";
import bgLarge from "/images/bg-today-large.svg";
import bgSmall from "/images/bg-today-small.svg";
import logo from "/logo.svg";

function App() {
  return (
    <div>
      <img src={logo} alt="Logo" />
      <img src={retry} style={{ backgroundColor: "black" }} alt="oioi" />
      <img src={search} alt="oioi" />
      <img src={snow} alt="oioi" />
      <img src={units} alt="oioi" />
      <img src={loading} alt="oioi" />
      <img src={checkmark} alt="checkmark" />
      <img src={fog} alt="oioi" />
      <img src={sunny} alt="oioi" />
      <img src={error} alt="oioi" />
      <img src={storm} alt="oioi" />
      <img src={cloudy} alt="oioi" />
      <img src={drizzle} alt="oioi" />
      <img src={rain} alt="oioi" />
      <img src={dropdown} alt="oioi" />
      <img src={overcast} alt="oioi" />
      <img src={bgLarge} alt="oioi" />
      <img src={bgSmall} alt="oioi" />
      Units Switch to Imperial/Metric Temperature Celsius (°C) Fahrenheit (°F)
      Wind Speed km/h mph Precipitation Millimeters (mm) Inches (in) How's the
      sky looking today? Search for a city, e.g., New York Search Feels like
      {/* <!-- Insert temperature here --> */}
      Humidity
      {/* <!-- Insert humidity here --> */}
      Wind
      {/* <!-- Insert wind here -->    */}
      Precipitation
      {/* <!-- Insert precipitation here --> */}
      Daily forecast
      {/* <!-- Insert daily forecast for the next 7 days here --> */}
      Hourly forecast
      {/* <!-- Insert hourly forecast for the selected day here --> */}
    </div>
  );
}

export default App;
