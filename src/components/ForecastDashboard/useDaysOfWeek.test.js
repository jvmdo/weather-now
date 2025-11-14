import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import dayjs from "dayjs";
import useDaysOfWeek from "@/components/ForecastDashboard/useDaysOfWeek";

describe("useDaysOfWeek", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the next 7 days of the week starting from today", () => {
    const { result } = renderHook(() => useDaysOfWeek());
    const expected = Array.from({ length: 7 }, (_, d) =>
      dayjs().add(d, "day").format("dddd")
    );

    expect(result.current).toEqual(expected);
  });

  it("returns the same array within the same day", () => {
    const { result, rerender } = renderHook(() => useDaysOfWeek());

    const first = result.current;
    rerender();
    const second = result.current;

    expect(first).toBe(second);
  });

  it("updates the array when the day flips", () => {
    const { result, rerender } = renderHook(() => useDaysOfWeek());
    const before = result.current;

    // simulate next day
    let today = dayjs();
    let tomorrow = today.add(1, "day");
    vi.setSystemTime(new Date(tomorrow.toDate()));
    rerender();

    const after = result.current;
    expect(before).not.toBe(after);
    expect(after[0]).toBe(dayjs().format("dddd"));
  });

  it("respects custom daysCount", () => {
    const { result } = renderHook(() => useDaysOfWeek("Thursday", 4));
    expect(result.current).toHaveLength(4);
  });
});
