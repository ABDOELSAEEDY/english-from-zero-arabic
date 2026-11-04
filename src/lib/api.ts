import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Level = Tables<"levels">;
export type Unit = Tables<"units">;

async function uid() {
  const { data } = await supabase.auth.getSession();
  const id = data.session?.user.id;
  if (!id) throw new Error("لازم تسجّل دخول الأول");
  return id;
}

function check<T>(r: { data: T | null; error: { message: string } | null }): T {
  if (r.error) throw new Error(r.error.message);
  return r.data as T;
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
  });
}

export function useCurriculum() {
  return useQuery({
    queryKey: ["curriculum"],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const [levels, units] = await Promise.all([
        supabase.from("levels").select("*").order("order_index"),
        supabase.from("units").select("*").order("order_index"),
      ]);
      const ls = check(levels);
      const us = check(units);
      const levelOrder = new Map(ls.map((l) => [l.id, l.order_index]));
      const ordered = [...us].sort(
        (a, b) => (levelOrder.get(a.level_id)! - levelOrder.get(b.level_id)!) || a.order_index - b.order_index,
      );
      return { levels: ls, units: ordered };
    },
  });
}

export function useProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => check(await supabase.from("user_progress").select("unit_id,section,completed,score").eq("user_id", await uid())),
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async (): Promise<Tables<"user_stats"> | null> => {
      const r = await supabase.from("user_stats").select("*").eq("user_id", await uid()).maybeSingle();
      if (r.error) throw new Error(r.error.message);
      return r.data;
    },
  });
}

export function useDueCount() {
  return useQuery({
    queryKey: ["due-count"],
    queryFn: async () => {
      const r = await supabase
        .from("user_vocab_review")
        .select("vocab_id", { count: "exact", head: true })
        .eq("user_id", await uid())
        .lte("next_review_at", new Date().toISOString());
      if (r.error) throw new Error(r.error.message);
      return r.count ?? 0;
    },
  });
}

export function useUnitContent(unitId: string) {
  return useQuery({
    queryKey: ["unit", unitId],
    queryFn: async () => {
      const [unit, vocab, sentences, grammar, story] = await Promise.all([
        supabase.from("units").select("*").eq("id", unitId).maybeSingle(),
        supabase.from("vocabulary").select("*").eq("unit_id", unitId).order("order_index"),
        supabase.from("sentences").select("*").eq("unit_id", unitId).order("order_index"),
        supabase.from("grammar_lessons").select("*").eq("unit_id", unitId),
        supabase.from("stories").select("*").eq("unit_id", unitId),
      ]);
      return {
        unit: check(unit),
        vocab: check(vocab),
        sentences: check(sentences),
        grammar: check(grammar),
        story: check(story)[0] ?? null,
      };
    },
  });
}

export async function markSection(unitId: string, section: string, score = 100) {
  const user_id = await uid();
  check(
    await supabase
      .from("user_progress")
      .upsert({ user_id, unit_id: unitId, section, completed: true, score, updated_at: new Date().toISOString() }, { onConflict: "user_id,unit_id,section" }),
  );
}

export async function reviewWord(vocabId: string, known: boolean) {
  const user_id = await uid();
  const next = new Date();
  if (known) next.setDate(next.getDate() + 2);
  check(
    await supabase.from("user_vocab_review").upsert(
      { user_id, vocab_id: vocabId, box: known ? 2 : 1, next_review_at: next.toISOString() },
      { onConflict: "user_id,vocab_id" },
    ),
  );
}

export async function ensureStats(userId: string) {
  await supabase.from("user_stats").upsert({ user_id: userId }, { onConflict: "user_id", ignoreDuplicates: true });
}
