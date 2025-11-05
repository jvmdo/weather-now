import React from "react";
import dayjs from "dayjs";
import { buildDaysOfWeek } from "@/utils";

function useDaysOfWeek(startDay = dayjs().format("dddd"), daysCount = 7) {
  const daysOfWeek = React.useMemo(() => {
    return buildDaysOfWeek();
    // [startDay] will change at midnight, but the linter is not aware
    // eslint-disable-next-line
  }, [startDay, daysCount]);

  return daysOfWeek;
}

export default useDaysOfWeek;
