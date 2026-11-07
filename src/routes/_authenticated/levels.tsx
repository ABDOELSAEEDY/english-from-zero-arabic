import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { toast } from "sonner";
import { useCurriculum, useProgress, useStats } from "@/lib/api";
import { computeUnitStatuses, startIndexFor } from "@/lib/progress";
import { ErrorState, LoadingCards } from "@/components/States";
import { En } from "@/components/SpeakButton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/levels")({
  head: () => ({
    meta: [
      { title: "المستويات — إنجليزي من الصفر" },
      { name: "description", content: "خريطة المستويات من A1 لـ C1 والوحدات بتاعة كل مستوى." },
      { property: "og:title", content: "المستويات — إنجليزي من الصفر" },
      { property: "og:description", content: "خريطة المستويات والوحدات." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LevelsPage,
});

function LevelsPage() {
  const cur = useCurriculum();
  const prog = useProgress();
  const stats = useStats();
  const navigate = useNavigate();
  if (cur.isLoading || prog.isLoading || stats.isLoading) return <LoadingCards count={5} />;
  if (cur.error || prog.error || stats.error) return <ErrorState message={(cur.error ?? prog.error ?? stats.error)?.message} onRetry={() => { cur.refetch(); prog.refetch(); stats.refetch(); }} />;

  if (!cur.data) return null;
  const { levels, units } = cur.data;
  const status = computeUnitStatuses(units.map((u) => u.id), prog.data ?? [], startIndexFor(units, stats.data?.current_level_id));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-extrabold">المستويات</h1>
      {levels.map((level) => {
        const lu = units.filter((u) => u.level_id === level.id);
        return (
          <section key={level.id} className="rounded-3xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft font-en text-lg font-extrabold text-primary">{level.code}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">{level.title_ar}</h2>
                  {lu.length === 0 && <span className="rounded-full bg-warning/20 px-3 py-0.5 text-xs font-bold text-foreground">قريباً</span>}
                </div>
                <p className="text-sm text-muted-foreground">{level.description_ar}</p>
              </div>
            </div>

            {lu.length > 0 && (
              <ol className="relative mt-6 space-y-6 before:absolute before:inset-y-4 before:start-7 before:w-1 before:rounded-full before:bg-border">
                {lu.map((u) => {
                  const st = status[u.id];
                  return (
                    <li key={u.id} className="relative">
                      <button
                        onClick={() => {
                          if (st === "locked") toast("الوحدة دي مقفولة 🔒", { description: "لازم تنجح في اختبار الوحدة اللي قبلها بـ ٦٠٪ على الأقل." });
                          else navigate({ to: "/unit/$unitId", params: { unitId: u.id } });
                        }}
                        className={cn("flex w-full items-center gap-4 rounded-2xl p-2 text-start transition", st !== "locked" && "hover:bg-muted")}
                      >
                        <span
                          className={cn(
                            "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-card text-2xl",
                            st === "completed" && "bg-success text-success-foreground",
                            st === "unlocked" && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                            st === "locked" && "bg-muted text-muted-foreground",
                          )}
                        >
                          {st === "completed" ? <Check className="h-7 w-7" /> : st === "locked" ? <Lock className="h-6 w-6" /> : u.icon}
                        </span>
                        <span className={cn("flex-1", st === "locked" && "opacity-60")}>
                          <span className="block font-bold">{u.title_ar}</span>
                          <En className="block text-sm text-muted-foreground">{u.title_en}</En>
                        </span>
                        {st === "unlocked" && <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">ابدأ</span>}
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        );
      })}
    </div>
  );
}
