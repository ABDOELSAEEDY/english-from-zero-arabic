import { describe, expect, it } from "vitest";
import { isCorrect, nextReview, placementLevel } from "@/lib/learn";
import { computeUnitStatuses, nextUnitId } from "@/lib/progress";

describe("placement mapping", () => {
  it("maps score bands", () => {
    expect(placementLevel(39)).toBe("A1");
    expect(placementLevel(40)).toBe("A2");
    expect(placementLevel(60)).toBe("B1");
    expect(placementLevel(80)).toBe("B2");
    expect(placementLevel(90)).toBe("C1");
  });
});

describe("answers", () => {
  it("fill_blank is case-insensitive and trimmed", () => {
    expect(isCorrect("  ARE ", "are")).toBe(true);
    expect(isCorrect("is", "are")).toBe(false);
  });
});

describe("spaced repetition", () => {
  const now = new Date("2026-01-01T00:00:00");
  it("صعبة resets to box 1 due tomorrow", () => {
    const r = nextReview(4, false, now);
    expect(r.box).toBe(1);
    expect(r.due.getDate()).toBe(2);
  });
  it("تمام moves up one box, capped at 5 (16 days)", () => {
    expect(nextReview(2, true, now).box).toBe(3);
    const r = nextReview(5, true, now);
    expect(r.box).toBe(5);
    expect(r.due.getDate()).toBe(17);
  });
});

describe("placement start", () => {
  it("units up to start index are unlocked", () => {
    const s = computeUnitStatuses(["a", "b", "c"], [], 1);
    expect(s).toEqual({ a: "unlocked", b: "unlocked", c: "locked" });
    expect(nextUnitId(["a", "b", "c"], "b")).toBe("c");
  });
});
