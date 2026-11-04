import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Play, RotateCcw, Star, GraduationCap } from "lucide-react";
import { useCurriculum, useDueCount, useMe, useProgress, useStats } from "@/lib/api";
import { firstIncompleteUnit } from "@/lib/progress";
import { ErrorState, LoadingCards } from "@/components/States";
import { En } from "@/components/SpeakButton";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({
    meta: [
      { title: "الرئيسية — إنجليزي من الصفر" },
      { name: "description", content: "تابع تقدمك ونقاطك وكمّل التعلم." },
      { property: "og:title", content: "الرئيسية — إنجليزي من الصفر" },
      { property: "og:description", content: "تابع تقدمك ونقاطك وكمّل التعلم." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "صباح الخير" : "مساء الخير";
}

function HomePage() {
  const me = useMe();
  const stats = useStats();
  const cur = useCurriculum();
  const prog = useProgress();
  const due = useDueCount();

  if (cur.isLoading || prog.isLoading || stats.isLoading) return <LoadingCards count={4} />;
  if (cur.error || prog.error || stats.error)
    return <ErrorState message={(cur.error ?? prog.error ?? stats.error)?.message} onRetry={() => { cur.refetch(); prog.refetch(); stats.refetch(); }} />;

  const { levels, units } = cur.data!;
  const nextId = firstIncompleteUnit(units.map((u) => u.id), prog.data ?? []);
  const nextUnit = units.find((u) => u.id === nextId);
  const s = stats.data;
  const level = levels.find((l) => l.id === s?.current_level_id) ?? (nextUnit ? levels.find((l) => l.id === nextUnit.level_id) : levels[0]);
  const name = (me.data?.user_metadata?.["name"] as string | undefined) || me.data?.email?.split("@")[0] || "";

  return (
    <div className="space-y-5">
      <div>
        <p className="text-muted-foreground">{greeting()} ☀️</p>
        <h1 className="text-2xl font-extrabold md:text-3xl">أهلاً يا {name}</h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat icon={<Star className="h-6 w-6 text-warning" />} value={s?.xp ?? 0} label="نقطة XP" />
        <Stat icon={<Flame className="h-6 w-6 text-destructive" />} value={s?.streak_days ?? 0} label="يوم متتالي" />
        <Stat icon={<GraduationCap className="h-6 w-6 text-primary" />} value={<En>{level?.code ?? "A1"}</En>} label="مستواك" />
      </div>

      <div className="bg-hero rounded-3xl p-6 text-primary-foreground shadow-soft">
        {nextUnit ? (
          <>
            <p className="opacity-90">الوحدة اللي عليها الدور</p>
            <h2 className="mt-1 text-2xl font-extrabold">{nextUnit.icon} {nextUnit.title_ar}</h2>
            <En className="block opacity-90">{nextUnit.title_en}</En>
            <Link to="/unit/$unitId" params={{ unitId: nextUnit.id }} className="mt-5 flex h-14 items-center justify-center gap-2 rounded-2xl bg-card text-lg font-bold text-primary transition hover:scale-[1.01]">
              <Play className="h-5 w-5" /> كمّل التعلم
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold">برافو! 🎉 خلصت كل الوحدات المتاحة</h2>
            <p className="mt-1 opacity-90">وحدات جديدة جاية قريب. راجع كلماتك لحد ما تنزل.</p>
          </>
        )}
      </div>

      <Link to="/review" className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition hover:border-primary">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-soft text-teal"><RotateCcw className="h-6 w-6" /></span>
        <div className="flex-1">
          <p className="font-bold">كلمات محتاجة مراجعة</p>
          <p className="text-muted-foreground">{due.isLoading ? "…" : due.data ? `${due.data} كلمة مستنياك` : "مفيش كلمات عليها الدور دلوقتي 👌"}</p>
        </div>
        <span className="text-2xl font-extrabold text-teal">{due.data ?? 0}</span>
      </Link>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl border bg-card p-4 text-center">
      <div className="flex justify-center">{icon}</div>
      <div className="mt-2 text-2xl font-extrabold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
