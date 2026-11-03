import { AlertCircle, Inbox } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingCards({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="جاري التحميل">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
      <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
      <p className="mt-3 font-bold">حصلت مشكلة في التحميل</p>
      {message && <p className="mt-1 text-sm text-muted-foreground">{message}</p>}
      {onRetry && (
        <button onClick={onRetry} className="mt-4 rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground">
          حاول تاني
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-dashed p-8 text-center">
      <Inbox className="mx-auto h-10 w-10 text-muted-foreground" />
      <p className="mt-3 font-bold">{title}</p>
      {hint && <p className="mt-1 text-muted-foreground">{hint}</p>}
    </div>
  );
}
