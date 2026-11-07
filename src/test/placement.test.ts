import { describe, expect, it } from "vitest";
import { placementLevel } from "@/lib/learn";
import { placementStart } from "@/lib/placement";
import { computeUnitStatuses, firstIncompleteUnit, startIndexFor } from "@/lib/progress";
import { passwordErrorKind } from "@/lib/auth-errors";

describe("password rejection classification", () => {
  it("only passwords under six characters receive the short classification", () => {
    expect(passwordErrorKind("Password should be at least 6 characters", 5)).toBe("short");
    expect(passwordErrorKind("weak_password", 12)).toBe("weak");
  });
  it("common and leaked passwords are weak regardless of being long enough", () => {
    for (const message of ["Password is weak", "Password is known to be weak and easy to guess", "Password has been leaked", "Password is compromised", "Password is common"]) {
      expect(passwordErrorKind(message, 12)).toBe("weak");
    }
  });
});

describe("placement bands", () => {
  it.each([[0, "A1"], [39, "A1"], [40, "A2"], [59, "A2"], [60, "B1"], [79, "B1"], [80, "B2"], [89, "B2"], [90, "C1"], [100, "C1"]])("maps %s percent to %s", (score, code) => {
    expect(placementLevel(Number(score))).toBe(code);
  });
});

const levels = ["A1", "A2", "B1", "B2", "C1"].map((code, order_index) => ({ id: code, code, order_index }));
const units = [{ id: "a1", level_id: "A1", order_index: 1 }, { id: "a2", level_id: "A2", order_index: 1 }, { id: "b1", level_id: "B1", order_index: 1 }, { id: "b2", level_id: "B1", order_index: 2 }];
describe("placement starting unit", () => {
  it("falls back to the first available level when assessed level has no units", () => {
    const start = placementStart(95, levels, units);
    expect(start.code).toBe("C1");
    expect(start.level?.id).toBe("A1");
    expect(start.unit?.id).toBe("a1");
    expect(start.fallback).toBe(true);
  });
  it("uses added content instead of a hardcoded available-level list", () => {
    expect(placementStart(85, levels, [...units, { id: "advanced", level_id: "B2", order_index: 1 }]).unit?.id).toBe("advanced");
  });
  it("unlocks and continues from the first higher-level unit without earlier tests", () => {
    const start = placementStart(75, levels, units);
    const index = startIndexFor(units, start.level?.id);
    expect(index).toBe(2);
    expect(computeUnitStatuses(units.map((u) => u.id), [], index)["b1"]).toBe("unlocked");
    expect(computeUnitStatuses(units.map((u) => u.id), [], index)["b2"]).toBe("locked");
    expect(firstIncompleteUnit(units.map((u) => u.id), [], index)).toBe("b1");
  });
});