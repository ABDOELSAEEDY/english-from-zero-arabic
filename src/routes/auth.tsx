import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode?: Mode | undefined } => ({
    mode: s["mode"] === "signup" ? "signup" : s["mode"] === "login" ? "login" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — إنجليزي من الصفر" },
      { name: "description", content: "سجّل دخولك أو اعمل حساب جديد وابدأ تتعلم إنجليزي." },
      { property: "og:title", content: "تسجيل الدخول — إنجليزي من الصفر" },
      { property: "og:description", content: "ادخل حسابك وكمّل رحلة تعلم الإنجليزي." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function arabicError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "الإيميل أو كلمة السر غلط. اتأكد وحاول تاني.";
  if (m.includes("already registered") || m.includes("already been registered")) return "الإيميل ده مسجّل قبل كده. جرّب تسجّل دخول.";
  if (m.includes("password") && (m.includes("6") || m.includes("short") || m.includes("weak"))) return "كلمة السر ضعيفة. خليها ٦ حروف على الأقل.";
  if (m.includes("pwned") || m.includes("leaked") || m.includes("compromised")) return "كلمة السر دي معروفة ومش آمنة. اختار كلمة سر تانية.";
  if (m.includes("email") && m.includes("invalid")) return "الإيميل مكتوب غلط.";
  if (m.includes("rate") || m.includes("too many")) return "محاولات كتير. استنى شوية وحاول تاني.";
  if (m.includes("fetch") || m.includes("network")) return "في مشكلة في الاتصال بالإنترنت.";
  return "حصلت مشكلة. حاول تاني.";
}

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(search.mode ?? "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError("كلمة السر لازم تكون ٦ حروف على الأقل.");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { name: name.trim() || undefined } },
        });
        if (error) throw error;
        if (!data.session) {
          const r = await supabase.auth.signInWithPassword({ email, password });
          if (r.error) throw r.error;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/home", replace: true });
    } catch (err) {
      setError(arabicError(err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  const input = "h-14 w-full rounded-2xl border bg-background px-4 text-lg outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-extrabold text-primary">إنجليزي من الصفر</Link>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md rounded-3xl border bg-card p-6 shadow-soft md:p-8">
          <h1 className="text-2xl font-extrabold">{mode === "login" ? "أهلاً بيك تاني 👋" : "يلا نبدأ! ✨"}</h1>
          <p className="mt-1 text-muted-foreground">{mode === "login" ? "سجّل دخولك وكمّل من مكانك." : "اعمل حساب في أقل من دقيقة."}</p>

          <div className="mt-6 grid grid-cols-2 rounded-2xl bg-muted p-1">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(null); }}
                className={cn("h-11 rounded-xl font-bold transition", mode === m ? "bg-card text-primary shadow" : "text-muted-foreground")}
              >
                {m === "login" ? "تسجيل دخول" : "حساب جديد"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <label className="block">
                <span className="mb-1 block font-semibold">اسمك (اختياري)</span>
                <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً: أحمد" />
              </label>
            )}
            <label className="block">
              <span className="mb-1 block font-semibold">الإيميل</span>
              <input className={cn(input, "font-en")} dir="ltr" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            </label>
            <label className="block">
              <span className="mb-1 block font-semibold">كلمة السر</span>
              <input className={cn(input, "font-en")} dir="ltr" type="password" required autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-destructive">{error}</p>}
            <button disabled={loading} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-lg font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60">
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {mode === "login" ? "دخول" : "إنشاء الحساب"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
