import { placementLevel } from "@/lib/learn";

export function placementStart<L extends { id: string; code: string; order_index: number }, U extends { id: string; level_id: string; order_index: number }>(pct: number, levels: L[], units: U[]) {
  const code = placementLevel(pct);
  const assessed = levels.find((level) => level.code === code);
  const ordered = [...levels].sort((a, b) => a.order_index - b.order_index);
  const level = assessed && units.some((unit) => unit.level_id === assessed.id)
    ? assessed : ordered.find((candidate) => units.some((unit) => unit.level_id === candidate.id));
  const unit = level ? [...units].filter((candidate) => candidate.level_id === level.id).sort((a, b) => a.order_index - b.order_index)[0] : undefined;
  return { code, level, unit, fallback: level?.code !== code };
}

export const placementSkipKey = (userId: string) => `placement-skipped:${userId}`;