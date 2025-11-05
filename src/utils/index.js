import dayjs from "dayjs";

export function buildDaysOfWeek(daysCount = 7) {
  return Array.from({ length: daysCount }, (_, d) =>
    dayjs().add(d, "day").format("dddd")
  );
}

export function arrayChunk(arr, numberOfChunks) {
  const factor = Math.floor(arr.length / numberOfChunks);

  return arr.reduce((acc, _, index, self) => {
    return index % factor === 0
      ? [...acc, self.slice(index, index + factor)]
      : acc;
  }, []);
}

export function stripFalsy(obj = {}) {
  return Object.fromEntries(
    Array.from(Object.entries(obj)).filter(([, value]) => Boolean(value))
  );
}
