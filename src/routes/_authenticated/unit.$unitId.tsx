import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, ChevronRight, Lightbulb, Play, Square } from "lucide-react";
import { toast } from "sonner";
import { markSection, reviewWord, useProgress, useUnitContent } from "@/lib/api";
import { SECTIONS, type Section } from "@/lib/progress";
import { En, SpeakButton } from "@/components/SpeakButton";
import { EmptyState, ErrorState, LoadingCards } from "@/components/States";
import { speak, speechSupported, stopSpeaking } from "@/lib/speech";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/unit/$unitId")({
  head: () => ({
    meta: [
      { title: "الوحدة — إنجليزي من الصفر" },
      { name: "description", content: "كلمات وجمل وقواعد وقصة الوحدة." },
      { property: "og:title", content: "الوحدة — إنجليزي من الصفر" },
      { property: "og:description", content: "كلمات وجمل وقواعد وقصة الوحدة." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: UnitPage,
});

const LABELS: Record<Section, string> = { vocab: "الكلمات", sentences: "الجمل", grammar: "القواعد", story: "القصة", exercises: "التمارين", test: "الاختبار" };

function UnitPage() {
  const { unitId } = Route.useParams();
  const content = useUnitContent(unitId);
  const prog = useProgress();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Section>("vocab");

  if (content.isLoading) return <LoadingCards count={4} />;
  if (content.error) return <ErrorState message={content.error.message} onRetry={() => content.refetch()} />;
  const c = content.data!;
  if (!c.unit) return <EmptyState title="الوحدة دي مش موجودة" />;

  const done = new Set((prog.data ?? []).filter((p) => p.unit_id === unitId && p.completed).map((p) => p.section));
  const complete = async (s: Section) => {
    if (done.has(s)) return;
    try {
      await markSection(unitId, s);
      await qc.invalidateQueries({ queryKey: ["progress"] });
      toast.success(`برافو! خلصت ${LABELS[s]} ✅`);
    } catch {
      toast.error("مقدرناش نحفظ تقدمك، حاول تاني.");
    }
  };

  return (
    <div className="space-y-4">
      <Link to="/levels" className="inline-flex items-center gap-1 text-muted-foreground"><ChevronRight className="h-4 w-4" /> المستويات</Link>
      <div>
        <h1 className="text-2xl font-extrabold">{c.unit.icon} {c.unit.title_ar}</h1>
        <En className="text-muted-foreground">{c.unit.title_en}</En>
      </div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {SECTIONS.map((s) => (
          <button key={s} onClick={() => setTab(s)} className={cn("flex h-11 shrink-0 items-center gap-1 rounded-full px-4 font-bold transition", tab === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
            {done.has(s) && <Check className="h-4 w-4" />} {LABELS[s]}
          </button>
        ))}
      </div>
      <div key={tab} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {tab === "vocab" && <VocabTab items={c.vocab} onDone={() => complete("vocab")} />}
        {tab === "sentences" && <SentencesTab items={c.sentences} onDone={() => complete("sentences")} done={done.has("sentences")} />}
        {tab === "grammar" && <GrammarTab items={c.grammar} onDone={() => complete("grammar")} done={done.has("grammar")} />}
        {tab === "story" && <StoryTab story={c.story} onDone={() => complete("story")} done={done.has("story")} />}
        {(tab === "exercises" || tab === "test") && <EntryCard kind={tab} />}
      </div>
    </div>
  );
}

function DoneButton({ onClick, done }: { onClick: () => void; done: boolean }) {
  return (
    <button onClick={onClick} disabled={done} className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-teal text-lg font-bold text-teal-foreground disabled:opacity-60">
      <Check className="h-5 w-5" /> {done ? "خلصت الجزء ده" : "خلصت، علّم عليه"}
    </button>
  );
}

type Vocab = { id: string; word: string; phonetic: string | null; translation_ar: string; example_en: string | null; example_ar: string | null };
function VocabTab({ items, onDone }: { items: Vocab[]; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [busy, setBusy] = useState(false);
  if (!items.length) return <EmptyState title="مفيش كلمات في الوحدة دي" />;
  if (i >= items.length)
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <p className="text-4xl">🎉</p>
        <p className="mt-2 text-xl font-bold">خلصت كل الكلمات!</p>
        <button onClick={() => { setI(0); setFlipped(false); }} className="mt-4 rounded-2xl bg-secondary px-5 py-3 font-bold">راجعهم تاني</button>
      </div>
    );
  const w = items[i];
  const answer = async (known: boolean) => {
    setBusy(true);
    try {
      await reviewWord(w.id, known);
      setFlipped(false);
      if (i + 1 >= items.length) onDone();
      setI(i + 1);
    } catch {
      toast.error("مقدرناش نحفظ، حاول تاني.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      <p className="mb-2 text-center text-sm text-muted-foreground">{i + 1} / {items.length} — دوس على الكارت عشان تقلبه</p>
      <div className="flip h-72 cursor-pointer" onClick={() => setFlipped(!flipped)}>
        <div className={cn("flip-inner h-full", flipped && "flipped")}>
          <div className="flip-face flex flex-col items-center justify-center rounded-3xl border bg-card p-6 shadow-soft">
            <En className="text-4xl font-extrabold">{w.word}</En>
            {w.phonetic && <En className="mt-2 text-muted-foreground">{w.phonetic}</En>}
            <SpeakButton text={w.word} size="lg" className="mt-5" />
          </div>
          <div className="flip-face flip-back flex flex-col items-center justify-center rounded-3xl bg-primary-soft p-6 text-center">
            <p className="text-3xl font-extrabold text-primary">{w.translation_ar}</p>
            {w.example_en && (
              <div className="mt-5 flex items-center gap-2">
                <SpeakButton text={w.example_en} size="sm" />
                <En className="text-lg">{w.example_en}</En>
              </div>
            )}
            {w.example_ar && <p className="mt-1 text-muted-foreground">{w.example_ar}</p>}
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button disabled={busy} onClick={() => answer(false)} className="h-14 rounded-2xl bg-warning/20 text-lg font-bold">محتاج أراجعها</button>
        <button disabled={busy} onClick={() => answer(true)} className="h-14 rounded-2xl bg-success text-lg font-bold text-success-foreground">عارفها ✓</button>
      </div>
    </div>
  );
}

function TranslationToggle({ show, set }: { show: boolean; set: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between rounded-2xl bg-muted p-3 font-semibold">
      إظهار الترجمة العربي
      <Switch checked={show} onCheckedChange={set} dir="ltr" />
    </label>
  );
}

type Sentence = { id: string; text_en: string; text_ar: string; note_ar: string | null };
function SentencesTab({ items, onDone, done }: { items: Sentence[]; onDone: () => void; done: boolean }) {
  const [show, setShow] = useState(true);
  if (!items.length) return <EmptyState title="مفيش جمل في الوحدة دي" />;
  return (
    <div className="space-y-3">
      <TranslationToggle show={show} set={setShow} />
      {items.map((s) => (
        <div key={s.id} className="rounded-2xl border bg-card p-4">
          <div className="flex items-center gap-3">
            <SpeakButton text={s.text_en} />
            <En className="flex-1 text-lg font-semibold">{s.text_en}</En>
          </div>
          {show && <p className="mt-2 text-muted-foreground">{s.text_ar}</p>}
          {s.note_ar && <p className="mt-2 flex items-start gap-1 rounded-xl bg-teal-soft p-2 text-sm"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{s.note_ar}</p>}
        </div>
      ))}
      <DoneButton onClick={onDone} done={done} />
    </div>
  );
}

type Grammar = { id: string; title_ar: string; explanation_ar: string; examples: unknown };
function GrammarTab({ items, onDone, done }: { items: Grammar[]; onDone: () => void; done: boolean }) {
  if (!items.length) return <EmptyState title="مفيش قواعد في الوحدة دي" />;
  return (
    <div className="space-y-4">
      {items.map((g) => {
        const ex = (Array.isArray(g.examples) ? g.examples : []) as { en: string; ar: string }[];
        return (
          <article key={g.id} className="rounded-3xl border bg-card p-5">
            <h2 className="text-xl font-extrabold text-primary">{g.title_ar}</h2>
            <div className="md mt-2 overflow-x-auto"><ReactMarkdown remarkPlugins={[remarkGfm]}>{g.explanation_ar}</ReactMarkdown></div>
            {ex.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="font-bold">أمثلة</h3>
                {ex.map((e, k) => (
                  <div key={k} className="flex items-center gap-3 rounded-2xl bg-muted p-3">
                    <SpeakButton text={e.en} size="sm" />
                    <div className="flex-1"><En className="block font-semibold">{e.en}</En><span className="text-sm text-muted-foreground">{e.ar}</span></div>
                  </div>
                ))}
              </div>
            )}
          </article>
        );
      })}
      <DoneButton onClick={onDone} done={done} />
    </div>
  );
}

type Story = { title_en: string; title_ar: string; body_en: string; body_ar: string } | null;
function StoryTab({ story, onDone, done }: { story: Story; onDone: () => void; done: boolean }) {
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  if (!story) return <EmptyState title="مفيش قصة في الوحدة دي" />;
  const en = story.body_en.split("\n").map((l) => l.trim()).filter(Boolean);
  const ar = story.body_ar.split("\n").map((l) => l.trim()).filter(Boolean);
  const playAll = async () => {
    if (!speechSupported()) return toast.error("المتصفح ده مش بيدعم النطق الصوتي.");
    if (playing !== null) { stopSpeaking(); setPlaying(null); return; }
    for (let k = 0; k < en.length; k++) {
      setPlaying(k);
      const ok = await speak(en[k]);
      if (!ok) break;
    }
    setPlaying(null);
  };
  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-primary-soft p-5">
        <En className="block text-xl font-extrabold">{story.title_en}</En>
        <p className="text-muted-foreground">{story.title_ar}</p>
        <button onClick={playAll} className="mt-3 inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-4 font-bold text-primary-foreground">
          {playing !== null ? <><Square className="h-4 w-4" /> إيقاف</> : <><Play className="h-4 w-4" /> شغّل القصة كلها</>}
        </button>
      </div>
      <TranslationToggle show={show} set={setShow} />
      {en.map((line, k) => (
        <div key={k} className={cn("rounded-2xl border bg-card p-4 transition", playing === k && "border-primary ring-2 ring-primary/20")}>
          <div className="flex items-center gap-3">
            <SpeakButton text={line} size="sm" />
            <En className="flex-1 text-lg">{line}</En>
          </div>
          {show && ar[k] && <p className="mt-2 text-muted-foreground">{ar[k]}</p>}
        </div>
      ))}
      <DoneButton onClick={onDone} done={done} />
    </div>
  );
}

function EntryCard({ kind }: { kind: "exercises" | "test" }) {
  return (
    <div className="rounded-3xl border bg-card p-8 text-center">
      <p className="text-5xl">{kind === "test" ? "🏆" : "✍️"}</p>
      <h2 className="mt-3 text-xl font-extrabold">{kind === "test" ? "اختبار الوحدة" : "تمارين الوحدة"}</h2>
      <p className="mt-1 text-muted-foreground">{kind === "test" ? "انجح بـ ٦٠٪ أو أكتر عشان تفتح الوحدة اللي بعدها." : "اتمرن على اللي اتعلمته في الوحدة."}</p>
      <button onClick={() => toast("الجزء ده هيشتغل في الخطوة الجاية 🚧")} className="mt-5 h-14 w-full rounded-2xl bg-primary text-lg font-bold text-primary-foreground">ابدأ</button>
    </div>
  );
}
