import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { nextReview } from "@/lib/learn";

export const reviewOptions = queryOptions({
  queryKey: ["review-words"],
  queryFn: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw new Error("لازم تسجّل دخول الأول");
    const result = await supabase.from("user_vocab_review").select("*, vocabulary(*)").eq("user_id", data.user.id).order("next_review_at");
    if (result.error) throw result.error;
    return result.data ?? [];
  },
});
export type ReviewWord = Awaited<ReturnType<NonNullable<typeof reviewOptions.queryFn>>>[number];

export async function saveReview(row: ReviewWord, known: boolean) {
  const next = nextReview(row.box, known);
  const result = await supabase.from("user_vocab_review").update({
    box: next.box, next_review_at: next.due.toISOString(),
    correct_count: row.correct_count + (known ? 1 : 0),
    wrong_count: row.wrong_count + (known ? 0 : 1),
  }).eq("user_id", row.user_id).eq("vocab_id", row.vocab_id).select("vocab_id").single();
  if (result.error) throw result.error;
}