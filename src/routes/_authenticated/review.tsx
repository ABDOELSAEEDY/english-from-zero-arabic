import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { awardXp, useDueCount } from "@/lib/api";
import { REVIEW_XP } from "@/lib/learn";
import { reviewOptions, saveReview, type ReviewWord } from "@/lib/review";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { En, SpeakButton } from "@/components/SpeakButton";
import { ErrorState, LoadingCards } from "@/components/States";

export const Route = createFileRoute("/_authenticated/review")({
  head: () => ({
    meta: [
      { title: "المراجعة — إنجليزي من الصفر" },
      { name: "description", content: "راجع الكلمات اللي عليها الدور." },
      { property: "og:title", content: "المراجعة — إنجليزي من الصفر" },
      { property: "og:description", content: "راجع الكلمات اللي عليها الدور." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(reviewOptions),
  pendingComponent: () => <LoadingCards count={2} />,
  errorComponent: ({ error, reset }) => <ErrorState message={error instanceof Error ? error.message : "مقدرناش نحمّل الكلمات"} onRetry={reset} />,
  component: ReviewPage,
});

function ReviewPage() {
  const { data: rows } = useSuspenseQuery(reviewOptions);
  const due = useDueCount();
  const [session, setSession] = useState<ReviewWord[] | null>(null);
  const counts = [1, 2, 3, 4, 5].map((box) => rows.filter((r) => r.box === box).length);
  return <div className="space-y-5">
    <h1 className="text-2xl font-extrabold">المراجعة</h1>
    <section className="space-y-3" aria-label="توزيع الكلمات">
      <p className="font-bold">إجمالي الكلمات في المراجعة: {rows.length}</p>
      {counts.map((count, i) => <div key={i} className="flex items-center gap-3 text-sm">
        <span className="w-16 shrink-0">الصندوق {i + 1}</span>
        <Progress value={rows.length ? count / rows.length * 100 : 0} aria-label={`الصندوق ${i + 1}: ${count}`} />
        <b className="w-7 text-center">{count}</b>
      </div>)}
    </section>
    {session ? <ReviewSession items={session} onBack={() => setSession(null)} /> : due.error ? <ErrorState message={due.error.message} onRetry={() => due.refetch()} /> : due.isLoading ? <LoadingCards count={1} /> : (due.data ?? 0) > 0 ?
      <Button className="h-14 w-full rounded-2xl text-lg font-bold" onClick={() => setSession(rows.filter((r) => Date.parse(r.next_review_at) <= Date.now() && r.vocabulary))}>ابدأ المراجعة ({due.data})</Button> :
      <div className="py-8 text-center"><h2 className="text-xl font-bold">مفيش كلمات للمراجعة دلوقتي 🎉</h2><Button asChild variant="outline" className="mt-4 h-12 rounded-2xl"><Link to="/levels">روح للوحدات</Link></Button></div>}
  </div>;
}

function ReviewSession({ items, onBack }: { items: ReviewWord[]; onBack: () => void }) {
  const qc = useQueryClient();
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [easy, setEasy] = useState(0);
  const [hard, setHard] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean | null>(null);
  const row = items[pos];
  const word = row?.vocabulary;

  async function answer(known: boolean) {
    if (!row || busy) return;
    setBusy(true); setError(null);
    try {
      // If awarding XP fails, retry only the award, not the already-saved counters.
      if (saved === null) { await saveReview(row, known); setSaved(known); }
      const choice = saved ?? known;
      await awardXp(REVIEW_XP, 1, choice ? 1 : 0);
      if (choice) setEasy((n) => n + 1); else setHard((n) => n + 1);
      setPos((n) => n + 1); setFlipped(false); setSaved(null);
      await Promise.all(["review-words", "due-count", "stats"].map((key) => qc.invalidateQueries({ queryKey: [key] })));
    } catch { setError("مقدرناش نحفظ المراجعة كاملة. حاول تاني."); }
    finally { setBusy(false); }
  }

  if (!row) return <div className="rounded-3xl border bg-card p-6 text-center">
    <h2 className="text-2xl font-extrabold">خلصت المراجعة! 🎉</h2>
    <div className="mt-5 grid grid-cols-2 gap-3"><p className="rounded-2xl bg-success/10 p-4">تمام: <b>{easy}</b></p><p className="rounded-2xl bg-warning/20 p-4">صعبة: <b>{hard}</b></p></div>
    <p className="mt-4 font-bold text-primary"><En>+{(easy + hard) * REVIEW_XP} XP</En></p>
    <Button onClick={onBack} className="mt-5 h-12 w-full rounded-2xl">رجوع للمراجعة</Button>
  </div>;
  if (!word) return <ErrorState message="الكلمة دي مش متاحة" onRetry={onBack} />;
  return <div className="space-y-4">
    <p className="text-center text-sm text-muted-foreground">كلمة {pos + 1} من {items.length}</p>
    <div className="relative flex min-h-80 flex-col items-center justify-center rounded-3xl border bg-card p-6 text-center shadow-soft">
      <Button variant="ghost" aria-label="اقلب الكارت" disabled={busy} onClick={() => setFlipped(!flipped)} className="absolute inset-0 h-full w-full rounded-3xl" />
      <div className="pointer-events-none relative flex w-full flex-col items-center gap-3">
        {flipped ? <><p className="text-3xl font-extrabold text-primary">{word.translation_ar}</p>{word.example_en && <div className="flex items-center gap-2"><En className="text-lg">{word.example_en}</En><span className="pointer-events-auto"><SpeakButton text={word.example_en} /></span></div>}{word.example_ar && <p className="text-muted-foreground">{word.example_ar}</p>}</> :
          <><En className="break-words text-4xl font-extrabold">{word.word}</En>{word.phonetic && <En className="text-muted-foreground">{word.phonetic}</En>}<span className="pointer-events-auto"><SpeakButton text={word.word} size="lg" /></span></>}
      </div>
    </div>
    {error && <p role="alert" className="rounded-2xl bg-destructive/10 p-3 text-destructive">{error}</p>}
    {flipped && <div className="grid grid-cols-2 gap-3">
      <Button disabled={busy || saved === true} variant="secondary" className="h-14 rounded-2xl text-lg font-bold" onClick={() => void answer(false)}>صعبة</Button>
      <Button disabled={busy || saved === false} className="h-14 rounded-2xl text-lg font-bold" onClick={() => void answer(true)}>تمام</Button>
    </div>}
  </div>;
}
