import { describe, it, expect } from "vitest";

function resolveSearchStatus({ status, isEmpty }) {
  if (status === "pending") return "loading";
  if (status === "error") return "error";
  if (isEmpty) return "empty";
  return "success";
}

describe("resolveSearchStatus", () => {
  it("returns pending when isFetching is true", () => {
    const result = resolveSearchStatus({
      status: "pending",
      isEmpty: false,
    });

    expect(result).toBe("loading");
  });

  it("returns error when status is error and not fetching", () => {
    const result = resolveSearchStatus({
      status: "error",
      isEmpty: false,
    });

    expect(result).toBe("error");
  });

  it("returns empty when isEmpty is true and not fetching or error", () => {
    const result = resolveSearchStatus({
      status: "success",
      isEmpty: true,
    });

    expect(result).toBe("empty");
  });

  it("returns success otherwise", () => {
    const result = resolveSearchStatus({
      status: "success",
      isEmpty: false,
    });

    expect(result).toBe("success");
  });

  it("priority: pending > error > empty > success", () => {
    const result = resolveSearchStatus({
      status: "error",
      isEmpty: true,
    });

    expect(result).toBe("error");
  });
});
