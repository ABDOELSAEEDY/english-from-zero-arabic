import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { En, SpeakButton } from "@/components/SpeakButton";
import { EmptyState, LoadingCards } from "@/components/States";

export const Route = createFileRoute("/_authenticated/dictionary")({
  head: () => ({
    meta: [
      { title: "القاموس — إنجليزي من الصفر" },
      { name: "description", content: "دوّر على أي كلمة اتعلمتها." },
      { property: "og:title", content: "القاموس — إنجليزي من الصفر" },
      { property: "og:description", content: "دوّر على أي كلمة اتعلمتها." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dictionary,
});

function Dictionary() {
  const [q, setQ] = useState("");
  const words = useQuery({
    queryKey: ["dictionary"],
    queryFn: async () => (await supabase.from("vocabulary").select("id,word,translation_ar,phonetic").order("word")).data ?? [],
  });
  const t = q.trim().toLowerCase();
  const list = (words.data ?? []).filter((w) => !t || w.word.toLowerCase().includes(t) || w.translation_ar.includes(q.trim()));
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">القاموس</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="اكتب كلمة بالإنجليزي أو بالعربي" className="h-14 w-full rounded-2xl border bg-card px-4 text-lg outline-none focus:border-primary" />
      {words.isLoading ? <LoadingCards /> : list.length === 0 ? <EmptyState title="مفيش نتايج" /> : list.map((w) => (
        <div key={w.id} className="flex items-center gap-3 rounded-2xl border bg-card p-4">
          <SpeakButton text={w.word} size="sm" />
          <div className="flex-1"><En className="block text-lg font-bold">{w.word}</En><span className="text-muted-foreground">{w.translation_ar}</span></div>
        </div>
      ))}
    </div>
  );
}
