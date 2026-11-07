import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GraduationCap, Loader2 } from "lucide-react";
import { useCurriculum } from "@/lib/api";
import { scorePct } from "@/lib/learn";
import { placementStart } from "@/lib/placement";
import { placementQuestions, savePlacement } from "@/lib/placement-api";
import { QuestionCard, type Exercise } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EmptyState, ErrorState, LoadingCards } from "@/components/States";
import { En } from "@/components/SpeakButton";

export const Route = createFileRoute("/_authenticated/placement")({
  head: () => ({ meta: [
    { title: "تحديد المستوى — إنجليزي من الصفر" },
    { name: "description", content: "اختبر مستواك في الإنجليزي وابدأ من الوحدة المناسبة ليك." },
    { property: "og:title", content: "تحديد المستوى — إنجليزي من الصفر" },
    { property: "og:description", content: "اختبر مستواك وابدأ من الوحدة المناسبة ليك." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(placementQuestions),
  pendingComponent: () => <LoadingCards count={2} />,
  errorComponent: ({ error, reset }) => <ErrorState message={error.message} onRetry={reset} />,
  component: PlacementPage,
});

function PlacementPage() {
  const { data: items } = useSuspenseQuery(placementQuestions);
  const curriculum = useCurriculum();
  if (curriculum.isLoading) return <LoadingCards count={2} />;
  if (curriculum.error) return <ErrorState message={curriculum.error.message} onRetry={() => curriculum.refetch()} />;
  if (!items.length) return <EmptyState title="اختبار تحديد المستوى مش متاح دلوقتي" />;
  if (!curriculum.data) return null;
  return <PlacementSession items={items} curriculum={curriculum.data} />;
}

function PlacementSession({ items, curriculum }: { items: Exercise[]; curriculum: NonNullable<ReturnType<typeof useCurriculum>["data"]> }) {
  const qc = useQueryClient();
  const [pos, setPos] = useState(0);
  const [results, setResults] = useState<{ ex: Exercise; ok: boolean; given: string }[]>([]);
  const [answer, setAnswer] = useState<{ ok: boolean; given: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const ex = items[pos];
  const score = scorePct(results.filter((r) => r.ok).length, items.length);
  const start = placementStart(score, curriculum.levels, curriculum.units);

  async function next() {
    if (!ex || !answer || saving) return;
    const all = [...results, { ex, ...answer }];
    if (pos + 1 < items.length) {
      setResults(all); setPos(pos + 1); setAnswer(null); return;
    }
    const chosen = placementStart(scorePct(all.filter((r) => r.ok).length, items.length), curriculum.levels, curriculum.units);
    if (!chosen.level || !chosen.unit) { setError("مفيش وحدات متاحة دلوقتي. جرّب تاني بعد شوية."); return; }
    setSaving(true); setError(null);
    try {
      await savePlacement(chosen.level.id);
      await Promise.all(["stats", "progress"].map((key) => qc.invalidateQueries({ queryKey: [key] })));
      setResults(all); setDone(true);
    } catch { setError("مقدرناش نحفظ مستواك. حاول تاني، إجاباتك لسه موجودة."); }
    finally { setSaving(false); }
  }

  if (done) return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-card p-6 text-center md:p-8">
        <GraduationCap className="mx-auto h-12 w-12 text-teal" />
        <h1 className="mt-3 text-2xl font-extrabold">نتيجة تحديد المستوى</h1>
        <p className="mt-4 text-4xl font-extrabold text-primary"><En>{score}%</En></p>
        <p className="mt-3"><span className="inline-flex rounded-full bg-primary-soft px-5 py-2 font-en text-xl font-extrabold text-primary" dir="ltr">{start.code}</span></p>
        <p className="mt-3 text-muted-foreground">برافو! دي نقطة البداية المناسبة ليك في رحلة الإنجليزي.</p>
        {start.fallback && <p className="mt-4 rounded-2xl bg-teal-soft p-4">مستوى <En>{start.code}</En> لسه وحداته مش جاهزة. هنبدأ من <En>{start.level?.code}</En> لحد ما تكون متاحة.</p>}
        {start.unit && <Button asChild className="mt-6 h-14 w-full rounded-2xl text-lg font-bold"><Link to="/unit/$unitId" params={{ unitId: start.unit.id }}>ابدأ من وحدتك</Link></Button>}
      </div>
      {results.some((r) => !r.ok) && <section className="space-y-3">
        <h2 className="text-xl font-extrabold">الأسئلة اللي غلطت فيها</h2>
        {results.filter((r) => !r.ok).map(({ ex: question, given }) => <div key={question.id} className="rounded-2xl border bg-card p-4">
          <p className="font-bold">{question.type === "listening" ? "سؤال استماع" : question.question}</p>
          <p className="mt-2 text-destructive">إجابتك: <En>{given}</En></p>
          <p className="text-success">الصح: <En>{question.correct_answer}</En></p>
          {question.explanation_ar && <p className="mt-2 text-muted-foreground">{question.explanation_ar}</p>}
        </div>)}
      </section>}
    </div>
  );
  if (!ex) return null;
  return <div className="space-y-5">
    <h1 className="text-2xl font-extrabold">اختبار تحديد المستوى</h1>
    <Progress value={(pos / items.length) * 100} aria-label="تقدم الاختبار" />
    <p className="text-center text-muted-foreground">سؤال {pos + 1} من {items.length}</p>
    <div className="rounded-3xl border bg-card p-5"><QuestionCard key={ex.id} ex={ex} showFeedback={false} onAnswer={(ok, given) => setAnswer({ ok, given })} /></div>
    {error && <p role="alert" className="rounded-2xl bg-destructive/10 p-4 text-destructive">{error}</p>}
    <Button disabled={!answer || saving} onClick={() => void next()} className="h-14 w-full rounded-2xl text-lg font-bold">
      {saving && <Loader2 className="animate-spin" />}{saving ? "بنحفظ مستواك..." : pos + 1 === items.length ? "شوف النتيجة" : "التالي"}
    </Button>
  </div>;
}