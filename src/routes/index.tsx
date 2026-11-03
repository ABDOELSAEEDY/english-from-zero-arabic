import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, Headphones, Sparkles, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";
import { En } from "@/components/SpeakButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "إنجليزي من الصفر — ابدأ رحلتك في تعلم الإنجليزي" },
      { name: "description", content: "اتعلم الإنجليزي من الصفر بشرح عربي بسيط: كلمات بنطق، جمل، قواعد، قصص وتمارين." },
      { property: "og:title", content: "إنجليزي من الصفر" },
      { property: "og:description", content: "اتعلم الإنجليزي خطوة بخطوة بشرح عربي بسيط." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: BookOpen, t: "كلمات بكروت", d: "اقلب الكارت واعرف المعنى والمثال" },
  { icon: Headphones, t: "نطق صحيح", d: "اسمع كل كلمة وجملة بصوت إنجليزي" },
  { icon: Sparkles, t: "قواعد بالعربي", d: "شرح بسيط بالعامية المصرية" },
  { icon: Trophy, t: "نقاط وسلسلة", d: "اجمع XP وحافظ على أيامك" },
];

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/home", replace: true });
    });
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <span className="text-xl font-extrabold text-primary">إنجليزي من الصفر</span>
        <ThemeToggle />
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <section className="bg-hero mt-4 rounded-3xl p-8 text-primary-foreground shadow-soft md:p-14">
          <En className="text-lg opacity-90">Hello! 👋</En>
          <h1 className="mt-2 text-3xl font-extrabold leading-snug md:text-5xl">اتعلم الإنجليزي من الصفر، بالعربي وبهدوء</h1>
          <p className="mt-4 max-w-xl text-lg opacity-90">دروس قصيرة، كلمات بنطق، قصص بسيطة وتمارين — مصممة مخصوص للمتعلم المصري.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth" search={{ mode: "signup" }} className="rounded-2xl bg-card px-6 py-4 text-lg font-bold text-primary transition hover:scale-[1.02]">
              ابدأ مجاناً
            </Link>
            <Link to="/auth" search={{ mode: "login" }} className="rounded-2xl border-2 border-primary-foreground/60 px-6 py-4 text-lg font-bold">
              عندي حساب
            </Link>
          </div>
        </section>
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.t} className="rounded-2xl border bg-card p-5">
              <f.icon className="h-8 w-8 text-teal" />
              <h3 className="mt-3 text-lg font-bold">{f.t}</h3>
              <p className="mt-1 text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
