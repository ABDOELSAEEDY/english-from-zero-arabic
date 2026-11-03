import { createFileRoute } from "@tanstack/react-router";
import { useDueCount } from "@/lib/api";

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
  component: () => {
    const due = useDueCount();
    return (
      <div className="rounded-3xl border bg-card p-8 text-center">
        <h1 className="text-2xl font-extrabold">المراجعة</h1>
        <p className="mt-2 text-5xl font-extrabold text-teal">{due.data ?? 0}</p>
        <p className="text-muted-foreground">كلمة عليها الدور للمراجعة</p>
      </div>
    );
  },
});
