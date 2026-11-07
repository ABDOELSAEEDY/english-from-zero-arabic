export const EXERCISE_XP = 10;
export const TEST_PASS_XP = 50;
export const REVIEW_XP = 2;

/** Review interval in days for each Leitner box (index = box). */
export const BOX_INTERVAL_DAYS = [0, 0, 1, 2, 4, 8] as const;
export const MAX_BOX = 5;

export function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[.?!،؟,]+$/g, "").replace(/\s+/g, " ").trim();
}

export function isCorrect(answer: string, correct: string): boolean {
  return normalize(answer) === normalize(correct);
}

export function scorePct(correct: number, total: number): number {
  return total ? Math.round((correct / total) * 100) : 0;
}

/** Map placement percentage to a CEFR level code. */
export function placementLevel(pct: number): "A1" | "A2" | "B1" | "B2" | "C1" {
  if (pct >= 90) return "C1";
  if (pct >= 80) return "B2";
  if (pct >= 60) return "B1";
  if (pct >= 40) return "A2";
  return "A1";
}

/** "تمام" → box+1 (max 5); "صعبة" → box 1. Returns new box and next review date. */
export function nextReview(box: number, known: boolean, now = new Date()): { box: number; due: Date } {
  const nb = known ? Math.min(MAX_BOX, Math.max(1, box) + 1) : 1;
  const due = new Date(now);
  const days = known && box >= MAX_BOX ? 16 : BOX_INTERVAL_DAYS[nb] ?? 0;
  due.setTime(due.getTime() + days * 86_400_000);
  return { box: nb, due };
}
