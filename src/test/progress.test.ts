import { describe, expect, it } from "vitest";
import { computeUnitStatuses, firstIncompleteUnit } from "@/lib/progress";

const ids = ["u1", "u2", "u3"];

describe("unit unlocking", () => {
  it("first unit is unlocked with no progress", () => {
    expect(computeUnitStatuses(ids, [])).toEqual({ u1: "unlocked", u2: "locked", u3: "locked" });
  });
  it("passing a test with 60% unlocks the next unit", () => {
    const s = computeUnitStatuses(ids, [{ unit_id: "u1", section: "test", completed: true, score: 60 }]);
    expect(s).toEqual({ u1: "completed", u2: "unlocked", u3: "locked" });
  });
  it("a test score of 59% does not unlock the next unit", () => {
    const s = computeUnitStatuses(ids, [{ unit_id: "u1", section: "test", completed: true, score: 59 }]);
    expect(s["u2"]).toBe("locked");
  });
  it("first incomplete unit skips passed ones", () => {
    expect(firstIncompleteUnit(ids, [{ unit_id: "u1", section: "test", completed: true, score: 80 }])).toBe("u2");
  });
});
