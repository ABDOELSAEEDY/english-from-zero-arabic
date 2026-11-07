import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const placementQuestions = queryOptions({
  queryKey: ["placement-questions"],
  queryFn: async () => {
    const quiz = await supabase.from("quizzes").select("*").eq("kind", "placement").order("id").limit(1).maybeSingle();
    if (quiz.error) throw quiz.error;
    if (!quiz.data) return [];
    const questions = await supabase.from("exercises").select("*").eq("quiz_id", quiz.data.id).order("order_index");
    if (questions.error) throw questions.error;
    return questions.data ?? [];
  },
});

export async function savePlacement(levelId: string) {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw new Error("لازم تسجّل دخول الأول");
  const saved = await supabase.from("user_stats").upsert({ user_id: data.user.id, current_level_id: levelId, placement_done: true }, { onConflict: "user_id" }).select("current_level_id,placement_done").single();
  if (saved.error) throw saved.error;
  if (saved.data.current_level_id !== levelId || !saved.data.placement_done) throw new Error("مقدرناش نحفظ مستواك");
}