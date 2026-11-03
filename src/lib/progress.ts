export const SECTIONS = ["vocab", "sentences", "grammar", "story", "exercises", "test"] as const;
export type Section = (typeof SECTIONS)[number];
export const PASS_SCORE = 60;

export type ProgressRow = { unit_id: string; section: string; completed: boolean; score: number };
export type UnitStatus = "locked" | "unlocked" | "completed";

export function testPassed(progress: ProgressRow[], unitId: string): boolean {
  return progress.some((p) => p.unit_id === unitId && p.section === "test" && p.completed && p.score >= PASS_SCORE);
}

/** orderedUnitIds: all units in global learning order. First is always unlocked; next unlocks when previous test passed with 60%+. */
export function computeUnitStatuses(orderedUnitIds: string[], progress: ProgressRow[]): Record<string, UnitStatus> {
  const out: Record<string, UnitStatus> = {};
  orderedUnitIds.forEach((id, i) => {
    if (testPassed(progress, id)) out[id] = "completed";
    else if (i === 0 || testPassed(progress, orderedUnitIds[i - 1])) out[id] = "unlocked";
    else out[id] = "locked";
  });
  return out;
}

export function firstIncompleteUnit(orderedUnitIds: string[], progress: ProgressRow[]): string | null {
  return orderedUnitIds.find((id) => !testPassed(progress, id)) ?? null;
}
