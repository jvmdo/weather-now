import React from "react";

import * as Select from "@radix-ui/react-select";
import useDaysOfWeek from "@/hooks/useDaysOfWeek";
import chevronDown from "/icons/dropdown.svg";

function HourlyForecastSelect() {
  const daysOfWeek = useDaysOfWeek();

  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value defaultValue={daysOfWeek[0]} />
        <Select.Icon>
          <img src={chevronDown} alt="chevron down" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content style={{ backgroundColor: "black" }}>
          {/* <Select.ScrollUpButton /> */}
          <Select.Viewport>
            {daysOfWeek.map((day) => (
              <Select.Item key={day} value={day}>
                <Select.ItemText>{day}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}

            {/* <Select.Group>
              <Select.Label />
              <Select.Item>
                <Select.ItemText />
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group> */}

            {/* <Select.Separator /> */}
          </Select.Viewport>
          {/* <Select.ScrollDownButton /> */}
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default HourlyForecastSelect;
