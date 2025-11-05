import React from "react";
import CitySearch from "../CitySearch";
import ForecastDashboard from "../ForecastDashboard";

function WeatherSearch() {
  const [location, setLocation] = React.useState({
    place: ["", ""],
    latLng: [0, 0],
  });

  return (
    <main>
      <h1>How's the sky looking today?</h1>
      <CitySearch setLocation={setLocation} />
      <ForecastDashboard place={location.place} latLng={location.latLng} />
    </main>
  );
}

export default WeatherSearch;
