import React from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  precipitationUnits,
  temperatureUnits,
  unitSystems,
  windSpeedUnits,
} from "@/constants";
import check from "/icons/checkmark.svg";
import cog from "/icons/units.svg";
import chevronDown from "/icons/dropdown.svg";
import { UnitsContext } from "@/contexts";

function UnitMenu() {
  const { unitSystem, flipUnitSystem, unitValues } =
    React.useContext(UnitsContext);

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
            <button onClick={flipUnitSystem}>
              Switch to {unitSystems[unitSystem]}
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Label>Temperature</DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={unitValues.temperature}>
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
          <DropdownMenu.RadioGroup value={unitValues.windSpeed}>
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
          <DropdownMenu.RadioGroup value={unitValues.precipitation}>
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
