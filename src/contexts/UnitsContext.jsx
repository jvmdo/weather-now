import React from "react";
import {
  precipitationUnits,
  temperatureUnits,
  windSpeedUnits,
} from "@/constants";
import { UnitsContext } from ".";

export default function UnitsContextProvider({ children }) {
  const [unitSystem, setUnitSystem] = React.useState(0);

  const flipUnitSystem = () => setUnitSystem(1 - unitSystem);

  const unitValues = {
    temperature: temperatureUnits[unitSystem].value,
    windSpeed: windSpeedUnits[unitSystem].value,
    precipitation: precipitationUnits[unitSystem].value,
  };

  const unitShorts = {
    temperature: temperatureUnits[unitSystem].value,
    windSpeed: windSpeedUnits[unitSystem].label,
    precipitation: precipitationUnits[unitSystem].short,
  };

  const contextValue = {
    unitSystem,
    flipUnitSystem,
    unitValues,
    unitShorts,
  };

  return <UnitsContext value={contextValue}>{children}</UnitsContext>;
}
