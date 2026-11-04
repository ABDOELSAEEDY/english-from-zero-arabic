export const SECTIONS = ["vocab", "sentences", "grammar", "story", "exercises", "test"] as const;
export type Section = (typeof SECTIONS)[number];
export const PASS_SCORE = 60;

export type ProgressRow = { unit_id: string; section: string; completed: boolean; score: number };
export type UnitStatus = "locked" | "unlocked" | "completed";

export function testPassed(progress: ProgressRow[], unitId: string): boolean {
  return progress.some((p) => p.unit_id === unitId && p.section === "test" && p.completed && p.score >= PASS_SCORE);
}

/**
 * orderedUnitIds: all units in global learning order. First is always unlocked; next unlocks when previous test passed with 60%+.
 * startIndex: index of the placement-test starting unit; it and every unit before it are unlocked.
 */
export function computeUnitStatuses(orderedUnitIds: string[], progress: ProgressRow[], startIndex = 0): Record<string, UnitStatus> {
  const out: Record<string, UnitStatus> = {};
  orderedUnitIds.forEach((id, i) => {
    if (testPassed(progress, id)) out[id] = "completed";
    else if (i <= startIndex || testPassed(progress, orderedUnitIds[i - 1] ?? "")) out[id] = "unlocked";
    else out[id] = "locked";
  });
  return out;
}

export function firstIncompleteUnit(orderedUnitIds: string[], progress: ProgressRow[], startIndex = 0): string | null {
  return orderedUnitIds.find((id, i) => i >= startIndex && !testPassed(progress, id)) ?? orderedUnitIds.find((id) => !testPassed(progress, id)) ?? null;
}

/** Index of the first unit belonging to the user's level; 0 if none (level has no units yet). */
export function startIndexFor(units: { level_id: string }[], levelId: string | null | undefined): number {
  if (!levelId) return 0;
  const i = units.findIndex((u) => u.level_id === levelId);
  return i < 0 ? 0 : i;
}

export function nextUnitId(orderedUnitIds: string[], unitId: string): string | null {
  const i = orderedUnitIds.indexOf(unitId);
  return i >= 0 ? (orderedUnitIds[i + 1] ?? null) : null;
}
