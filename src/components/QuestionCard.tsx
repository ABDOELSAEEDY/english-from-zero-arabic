import { useEffect, useMemo, useState } from "react";
import { Check, Lightbulb, RotateCcw, Volume2, X } from "lucide-react";
import { En } from "@/components/SpeakButton";
import { speak, stopSpeaking } from "@/lib/speech";
import { isCorrect } from "@/lib/learn";
import { cn } from "@/lib/utils";

export type Exercise = {
  id: string;
  type: string;
  question: string;
  options: unknown;
  correct_answer: string;
  explanation_ar: string | null;
};

export function optionsOf(e: Exercise): string[] {
  return Array.isArray(e.options) ? e.options.map(String) : [];
}

const PROMPT: Record<string, string> = {
  multiple_choice: "اختار الإجابة الصح",
  fill_blank: "كمّل الفراغ",
  translate_choice: "اختار الترجمة الصح",
  word_order: "دوس على الكلمات بالترتيب",
  listening: "اسمع واختار اللي سمعته",
};

const hasLatin = (s: string) => /[A-Za-z]/.test(s);

function Txt({ children, className }: { children: string; className?: string | undefined }) {
  return hasLatin(children) && !/[\u0600-\u06FF]/.test(children) ? <En className={className}>{children}</En> : <span className={className}>{children}</span>;
}

/** One question. Calls onAnswer(correct, given) once; parent decides what's next. */
export function QuestionCard({ ex, showFeedback, onAnswer }: { ex: Exercise; showFeedback: boolean; onAnswer: (correct: boolean, given: string) => void }) {
  const opts = useMemo(() => optionsOf(ex), [ex]);
  const [picked, setPicked] = useState<string | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const answered = picked !== null;

  useEffect(() => {
    if (ex.type === "listening") void speak(ex.correct_answer);
    return () => stopSpeaking();
  }, [ex]);

  const submit = (given: string) => {
    if (answered) return;
    setPicked(given);
    onAnswer(isCorrect(given, ex.correct_answer), given);
  };
  const ok = answered && isCorrect(picked, ex.correct_answer);

  return (
    <div className="space-y-4">
      <p className="text-sm font-bold text-muted-foreground">{PROMPT[ex.type] ?? "جاوب"}</p>
      {ex.type === "listening" ? (
        <button type="button" aria-label="اسمع تاني" onClick={() => void speak(ex.correct_answer)} className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-teal-soft text-teal transition hover:scale-105 active:scale-95">
          <Volume2 className="h-12 w-12" />
        </button>
      ) : (
        <h2 className="text-2xl font-extrabold leading-relaxed"><Txt>{ex.question}</Txt></h2>
      )}

      {ex.type === "word_order" ? (
        <div className="space-y-4">
          <div dir="ltr" className={cn("flex min-h-16 flex-wrap gap-2 rounded-2xl border-2 border-dashed p-3", answered && (showFeedback ? (ok ? "border-success" : "border-destructive") : "border-primary"))}>
            {order.map((k, j) => (
              <button key={j} disabled={answered} onClick={() => setOrder(order.filter((_, x) => x !== j))} className="h-11 rounded-xl bg-primary px-4 font-en font-bold text-primary-foreground">{opts[k]}</button>
            ))}
          </div>
          <div dir="ltr" className="flex flex-wrap gap-2">
            {opts.map((w, k) => (
              <button key={k} disabled={answered || order.includes(k)} onClick={() => setOrder([...order, k])} className="h-11 rounded-xl border bg-card px-4 font-en font-bold transition disabled:opacity-30">{w}</button>
            ))}
          </div>
          {!answered && (
            <div className="flex gap-2">
              <button onClick={() => setOrder([])} aria-label="امسح" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary"><RotateCcw className="h-5 w-5" /></button>
              <button disabled={!order.length} onClick={() => submit(order.map((k) => opts[k]).join(" "))} className="h-14 flex-1 rounded-2xl bg-primary text-lg font-bold text-primary-foreground disabled:opacity-50">تأكيد</button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {opts.map((o) => {
            const right = isCorrect(o, ex.correct_answer);
            const state = !answered ? "idle" : showFeedback ? (right ? "right" : o === picked ? "wrong" : "idle") : o === picked ? "picked" : "idle";
            return (
              <button key={o} disabled={answered} onClick={() => submit(o)} className={cn(
                "flex min-h-14 items-center justify-between gap-2 rounded-2xl border-2 bg-card px-4 py-3 text-start text-lg font-semibold transition active:scale-[0.98]",
                state === "right" && "border-success bg-success/10",
                state === "wrong" && "border-destructive bg-destructive/10",
                state === "picked" && "border-primary bg-primary-soft",
              )}>
                <Txt>{o}</Txt>
                {state === "right" && <Check className="h-5 w-5 text-success" />}
                {state === "wrong" && <X className="h-5 w-5 text-destructive" />}
              </button>
            );
          })}
        </div>
      )}

      {answered && showFeedback && (
        <div className={cn("animate-in fade-in slide-in-from-bottom-2 rounded-2xl p-4", ok ? "bg-success/10" : "bg-destructive/10")}>
          <p className="font-extrabold">{ok ? "برافو! إجابة صح 🎉" : "مش مظبوطة 😅"}</p>
          {!ok && <p className="mt-1">الإجابة الصح: <Txt className="font-bold">{ex.correct_answer}</Txt></p>}
          {ex.explanation_ar && <p className="mt-2 flex items-start gap-1 text-sm"><Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{ex.explanation_ar}</p>}
        </div>
      )}
    </div>
  );
}

export function Celebration() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="confetti" style={{ insetInlineStart: `${(i * 37) % 100}%`, animationDelay: `${(i % 6) * 0.12}s`, background: ["var(--primary)", "var(--teal)", "var(--success)", "var(--warning)"][i % 4] }} />
      ))}
    </div>
  );
}
