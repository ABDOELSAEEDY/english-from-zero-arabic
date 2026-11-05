import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { awardXp, markSection, useCurriculum, useUnitExercises, useUnitTest } from "@/lib/api";
import { EXERCISE_XP, TEST_PASS_XP, scorePct } from "@/lib/learn";
import { PASS_SCORE, nextUnitId } from "@/lib/progress";
import { Celebration, QuestionCard, type Exercise } from "@/components/QuestionCard";
import { EmptyState, ErrorState, LoadingCards } from "@/components/States";
import { En } from "@/components/SpeakButton";

function Bar({ value }: { value: number }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={value}>
      <div className="h-full rounded-full bg-teal transition-all duration-500" style={{ width: `${value}%` }} />
    </div>
  );
}

function useRefresh() {
  const qc = useQueryClient();
  return () => Promise.all(["progress", "stats"].map((k) => qc.invalidateQueries({ queryKey: [k] })));
}

export function ExercisesPlayer({ unitId, onGoTest }: { unitId: string; onGoTest: () => void }) {
  const q = useUnitExercises(unitId);
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  if (q.isLoading) return <LoadingCards count={2} />;
  if (q.error) return <ErrorState message={q.error.message} onRetry={() => q.refetch()} />;
  const items = q.data ?? [];
  if (!items.length) return <EmptyState title="مفيش تمارين في الوحدة دي لسه" />;
  if (!started)
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="text-5xl">✍️</p>
        <h2 className="mt-3 text-xl font-extrabold">تمارين الوحدة</h2>
        <p className="mt-1 text-muted-foreground">{items.length} سؤال — كل إجابة صح من أول مرة = {EXERCISE_XP} XP</p>
        <button onClick={() => setStarted(true)} className="mt-5 h-14 w-full rounded-2xl bg-primary text-lg font-bold text-primary-foreground">ابدأ</button>
      </div>
    );
  return <ExerciseSession key={run} unitId={unitId} items={items} onRestart={() => setRun(run + 1)} onGoTest={onGoTest} />;
}

function ExerciseSession({ unitId, items, onRestart, onGoTest }: { unitId: string; items: Exercise[]; onRestart: () => void; onGoTest: () => void }) {
  const refresh = useRefresh();
  const [queue, setQueue] = useState(items);
  const [pos, setPos] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [firstTry, setFirstTry] = useState<Set<string>>(new Set());
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const cur = queue[pos];

  const onAnswer = (ok: boolean) => {
    setAnswered(ok);
    if (!cur) return;
    if (!seen.has(cur.id)) {
      setSeen(new Set(seen).add(cur.id));
      if (ok) setFirstTry(new Set(firstTry).add(cur.id));
    }
    if (!ok) setQueue([...queue, cur]);
  };

  const next = async () => {
    setAnswered(null);
    if (pos + 1 < queue.length) return setPos(pos + 1);
    setSaving(true);
    const score = scorePct(firstTry.size, items.length);
    try {
      await markSection(unitId, "exercises", score);
      if (firstTry.size) await awardXp(firstTry.size * EXERCISE_XP, items.length, firstTry.size);
      await refresh();
    } catch {
      toast.error("مقدرناش نحفظ نتيجتك، حاول تاني.");
    }
    setSaving(false);
    setFinished(true);
  };

  if (finished) {
    const score = scorePct(firstTry.size, items.length);
    return (
      <div className="animate-in zoom-in-95 rounded-3xl border bg-card p-8 text-center">
        <Celebration />
        <p className="text-5xl">🎉</p>
        <h2 className="mt-3 text-2xl font-extrabold">خلصت التمارين!</h2>
        <p className="mt-2 text-4xl font-extrabold text-primary"><En>{score}%</En></p>
        <p className="mt-1 text-muted-foreground">{firstTry.size} من {items.length} صح من أول مرة · <En>+{firstTry.size * EXERCISE_XP} XP</En></p>
        <div className="mt-6 grid gap-3">
          <button onClick={onGoTest} className="h-14 rounded-2xl bg-primary text-lg font-bold text-primary-foreground">روح للاختبار 🏆</button>
          <button onClick={onRestart} className="h-14 rounded-2xl bg-secondary text-lg font-bold">رجوع للوحدة</button>
        </div>
      </div>
    );
  }
  if (!cur) return null;
  const isRepeat = pos >= items.length;
  return (
    <div className="space-y-4">
      <Bar value={Math.round((Math.min(pos, items.length) / items.length) * 100)} />
      <p className="text-center text-sm text-muted-foreground">{isRepeat ? "بنعيد الأسئلة اللي غلطت فيها 💪" : `سؤال ${pos + 1} من ${items.length}`}</p>
      <div key={pos} className="animate-in fade-in slide-in-from-bottom-2 rounded-3xl border bg-card p-5">
        <QuestionCard ex={cur} showFeedback onAnswer={onAnswer} />
      </div>
      {answered !== null && (
        <button disabled={saving} onClick={next} className="h-14 w-full rounded-2xl bg-primary text-lg font-bold text-primary-foreground disabled:opacity-60">التالي</button>
      )}
    </div>
  );
}

export function UnitTestPlayer({ unitId, onBack }: { unitId: string; onBack: () => void }) {
  const q = useUnitTest(unitId);
  const [run, setRun] = useState(0);
  const [started, setStarted] = useState(false);
  if (q.isLoading) return <LoadingCards count={2} />;
  if (q.error) return <ErrorState message={q.error.message} onRetry={() => q.refetch()} />;
  const items = q.data?.questions ?? [];
  if (!items.length) return <EmptyState title="الاختبار مش جاهز لسه" />;
  if (!started)
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="text-5xl">🏆</p>
        <h2 className="mt-3 text-xl font-extrabold">اختبار الوحدة</h2>
        <p className="mt-1 text-muted-foreground">{items.length} سؤال — انجح بـ {PASS_SCORE}٪ أو أكتر عشان تفتح الوحدة اللي بعدها.</p>
        <button onClick={() => setStarted(true)} className="mt-5 h-14 w-full rounded-2xl bg-primary text-lg font-bold text-primary-foreground">ابدأ الاختبار</button>
      </div>
    );
  return <TestSession key={run} unitId={unitId} items={items} onRetry={() => setRun(run + 1)} onBack={onBack} />;
}

function TestSession({ unitId, items, onRetry, onBack }: { unitId: string; items: Exercise[]; onRetry: () => void; onBack: () => void }) {
  const refresh = useRefresh();
  const cur = useCurriculum();
  const [pos, setPos] = useState(0);
  const [results, setResults] = useState<{ ex: Exercise; ok: boolean; given: string }[]>([]);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  const onAnswer = async (ok: boolean, given: string) => {
    const all = [...results, { ex: items[pos]!, ok, given }];
    setResults(all);
    await new Promise((r) => setTimeout(r, 350));
    if (pos + 1 < items.length) return setPos(pos + 1);
    const correct = all.filter((r) => r.ok).length;
    const score = scorePct(correct, items.length);
    if (score >= PASS_SCORE) {
      setSaving(true);
      try {
        await markSection(unitId, "test", score);
        await awardXp(TEST_PASS_XP, items.length, correct);
        await refresh();
      } catch {
        toast.error("مقدرناش نحفظ نتيجتك، حاول تاني.");
      }
      setSaving(false);
    }
    setDone(true);
  };

  if (!done) {
    const ex = items[pos]!;
    return (
      <div className="space-y-4">
        <Bar value={Math.round((pos / items.length) * 100)} />
        <p className="text-center text-sm text-muted-foreground">سؤال {pos + 1} من {items.length}</p>
        <div key={pos} className="animate-in fade-in slide-in-from-bottom-2 rounded-3xl border bg-card p-5">
          <QuestionCard ex={ex} showFeedback={false} onAnswer={onAnswer} />
        </div>
        {saving && <p className="text-center text-muted-foreground">بنحفظ نتيجتك...</p>}
      </div>
    );
  }

  const correct = results.filter((r) => r.ok).length;
  const score = scorePct(correct, items.length);
  const passed = score >= PASS_SCORE;
  const ids = cur.data?.units.map((u) => u.id) ?? [];
  const nextId = nextUnitId(ids, unitId);
  const wrong = results.filter((r) => !r.ok);

  return (
    <div className="space-y-4">
      <div className="animate-in zoom-in-95 rounded-3xl border bg-card p-8 text-center">
        {passed && <Celebration />}
        <p className="text-5xl">{passed ? "🏆" : "💪"}</p>
        <h2 className="mt-3 text-2xl font-extrabold">{passed ? "نجحت! برافو عليك" : "قربت! حاول تاني"}</h2>
        <p className={`mt-2 text-4xl font-extrabold ${passed ? "text-success" : "text-destructive"}`}><En>{score}%</En></p>
        <p className="mt-1 text-muted-foreground">{correct} من {items.length} صح{passed && <> · <En>+{TEST_PASS_XP} XP</En></>}</p>
        <div className="mt-6 grid gap-3">
          {passed && nextId && (
            <Link to="/unit/$unitId" params={{ unitId: nextId }} className="flex h-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">الوحدة اللي بعدها ⬅</Link>
          )}
          {passed && !nextId && <Link to="/levels" className="flex h-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">خريطة المستويات</Link>}
          {!passed && <button onClick={onRetry} className="h-14 rounded-2xl bg-primary text-lg font-bold text-primary-foreground">جرّب تاني</button>}
          <button onClick={onBack} className="h-14 rounded-2xl bg-secondary text-lg font-bold">رجوع للوحدة</button>
        </div>
      </div>
      {wrong.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-extrabold">الأسئلة اللي غلطت فيها</h3>
          {wrong.map(({ ex, given }) => (
            <div key={ex.id} className="rounded-2xl border bg-card p-4">
              <p className="font-bold">{ex.type === "listening" ? "سؤال استماع" : ex.question}</p>
              <p className="mt-1 text-sm text-destructive">إجابتك: {given}</p>
              <p className="text-sm text-success">الصح: {ex.correct_answer}</p>
              {ex.explanation_ar && <p className="mt-2 rounded-xl bg-teal-soft p-2 text-sm">{ex.explanation_ar}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
