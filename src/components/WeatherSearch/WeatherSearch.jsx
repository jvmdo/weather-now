import React from "react";
import CitySearch from "../CitySearch";
import ForecastDashboard from "../ForecastDashboard";
import styles from "./WeatherSearch.module.css";

function WeatherSearch() {
  const [location, setLocation] = React.useState({
    place: ["", ""],
    latLng: [0, 0],
  });

  return (
    <main className={styles.container}>
      <h1>How's the sky looking today?</h1>
      <CitySearch setLocation={setLocation} />
      <ForecastDashboard place={location.place} latLng={location.latLng} />
    </main>
  );
}

export default WeatherSearch;
