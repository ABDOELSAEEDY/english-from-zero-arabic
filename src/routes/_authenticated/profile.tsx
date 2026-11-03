import { createFileRoute } from "@tanstack/react-router";
import { useMe, useStats } from "@/lib/api";
import { useSignOut } from "@/components/AppShell";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "حسابي — إنجليزي من الصفر" },
      { name: "description", content: "بيانات حسابك ونقاطك." },
      { property: "og:title", content: "حسابي — إنجليزي من الصفر" },
      { property: "og:description", content: "بيانات حسابك ونقاطك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => {
    const me = useMe();
    const s = useStats();
    const signOut = useSignOut();
    return (
      <div className="space-y-4 rounded-3xl border bg-card p-6">
        <h1 className="text-2xl font-extrabold">حسابي</h1>
        <p dir="ltr" className="font-en text-end text-muted-foreground">{me.data?.email}</p>
        <p>النقاط: <b>{s.data?.xp ?? 0}</b> — السلسلة: <b>{s.data?.streak_days ?? 0}</b> يوم</p>
        <button onClick={signOut} className="h-12 w-full rounded-2xl bg-destructive/10 font-bold text-destructive">تسجيل خروج</button>
      </div>
    );
  },
});
