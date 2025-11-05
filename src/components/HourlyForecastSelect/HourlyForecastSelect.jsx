import * as Select from "@radix-ui/react-select";
import chevronDown from "/icons/dropdown.svg";

function HourlyForecastSelect({ day, setDay, daysOfWeek }) {
  return (
    <Select.Root value={day} onValueChange={setDay}>
      <Select.Trigger>
        <Select.Value>{day}</Select.Value>
        <Select.Icon>
          <img src={chevronDown} alt="chevron down" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>
          {/* <Select.ScrollUpButton /> */}
          <Select.Viewport>
            {daysOfWeek.map((d) => (
              <Select.Item key={d} value={d}>
                <Select.ItemText>{d}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
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
