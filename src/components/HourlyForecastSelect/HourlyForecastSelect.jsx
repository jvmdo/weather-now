import * as Select from "@radix-ui/react-select";
import chevronDown from "/icons/dropdown.svg";
import styles from "./HourlyForecastSelect.module.css";

function HourlyForecastSelect({ day, setDay, daysOfWeek }) {
  return (
    <Select.Root value={day} onValueChange={setDay}>
      <Select.Trigger className={styles.trigger}>
        <Select.Value>{day}</Select.Value>
        <Select.Icon>
          <img src={chevronDown} alt="chevron down" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.content}>
          <Select.Viewport>
            {daysOfWeek.map((d) => (
              <Select.Item key={d} value={d} className={styles.item}>
                <Select.ItemText>{d}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export default HourlyForecastSelect;
