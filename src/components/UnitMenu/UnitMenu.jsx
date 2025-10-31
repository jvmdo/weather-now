import React from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  precipitationUnits,
  temperatureUnits,
  units,
  windSpeedUnits,
} from "@/constants";
import check from "/icons/checkmark.svg";
import cog from "/icons/units.svg";
import chevronDown from "/icons/dropdown.svg";

function UnitMenu() {
  const [unit, setUnit] = React.useState(0);

  const handleFlipUnit = () => setUnit(1 - unit);

  const values = {
    temperature: temperatureUnits[unit].value,
    windSpeed: windSpeedUnits[unit].value,
    precipitation: precipitationUnits[unit].value,
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <img src={cog} alt="cog" />
          Units
          <img src={chevronDown} alt="chevron down" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content style={{ backgroundColor: "grey" }}>
          <DropdownMenu.Item>
            <button onClick={handleFlipUnit}>Switch to {units[unit]}</button>
          </DropdownMenu.Item>
          <DropdownMenu.Label>Temperature</DropdownMenu.Label>
          <DropdownMenu.RadioGroup
            value={values.temperature}
            // onValueChange={setTemperature}
          >
            {temperatureUnits.map(({ id, value, label }) => (
              <DropdownMenu.RadioItem key={id} value={value} disabled={true}>
                {label}
                <DropdownMenu.ItemIndicator>
                  <img src={check} alt="checkmark" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />

          <DropdownMenu.Label>Wind Speed</DropdownMenu.Label>
          <DropdownMenu.RadioGroup
            value={values.windSpeed}
            // onValueChange={setWindSpeed}
          >
            {windSpeedUnits.map(({ id, value, label }) => (
              <DropdownMenu.RadioItem key={id} value={value} disabled={true}>
                {label}
                <DropdownMenu.ItemIndicator>
                  <img src={check} alt="checkmark" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />

          <DropdownMenu.Label>Precipitation</DropdownMenu.Label>
          <DropdownMenu.RadioGroup
            value={values.precipitation}
            // onValueChange={setPrecipitation}
          >
            {precipitationUnits.map(({ id, value, label }) => (
              <DropdownMenu.RadioItem key={id} value={value} disabled={true}>
                {label}
                <DropdownMenu.ItemIndicator>
                  <img src={check} alt="checkmark" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default UnitMenu;
