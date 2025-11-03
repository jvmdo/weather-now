import React from "react";
import dayjs from "dayjs";

function useDaysOfWeek(startDay = dayjs().format("dddd"), daysCount = 7) {
  const daysOfWeek = React.useMemo(() => {
    return Array.from({ length: daysCount }, (_, d) =>
      dayjs().add(d, "day").format("dddd")
    );
    // [startDay] will change, but the linter is not aware of that
    // eslint-disable-next-line
  }, [startDay, daysCount]);

  return daysOfWeek;
}

export default useDaysOfWeek;
