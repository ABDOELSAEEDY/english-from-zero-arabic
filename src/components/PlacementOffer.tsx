import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { placementSkipKey } from "@/lib/placement";

export function PlacementOffer({ userId, completed }: { userId: string; completed: boolean }) {
  const [skipped, setSkipped] = useState<boolean | null>(null);
  useEffect(() => {
    try { setSkipped(localStorage.getItem(placementSkipKey(userId)) === "true"); }
    catch { setSkipped(false); }
  }, [userId]);
  if (completed || skipped !== false) return null;
  return (
    <div className="rounded-2xl border bg-teal-soft p-5">
      <h2 className="flex items-center gap-2 text-lg font-extrabold"><GraduationCap className="h-6 w-6 text-teal" />اعمل اختبار تحديد المستوى</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button asChild className="h-12 rounded-xl px-5 font-bold"><Link to="/placement">ابدأ الاختبار</Link></Button>
        <Button variant="ghost" className="h-12 rounded-xl" onClick={() => {
          try { localStorage.setItem(placementSkipKey(userId), "true"); } catch { /* Keep the choice for this visit when storage is unavailable. */ }
          setSkipped(true);
        }}>تخطّى</Button>
      </div>
    </div>
  );
}