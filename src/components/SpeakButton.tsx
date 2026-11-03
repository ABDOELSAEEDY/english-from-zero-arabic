import { useState } from "react";
import { Volume2 } from "lucide-react";
import { toast } from "sonner";
import { speak, speechSupported, stopSpeaking } from "@/lib/speech";
import { cn } from "@/lib/utils";

export function SpeakButton({ text, className, size = "md" }: { text: string; className?: string; size?: "sm" | "md" | "lg" }) {
  const [playing, setPlaying] = useState(false);
  const dims = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-14 w-14" : "h-11 w-11";
  return (
    <button
      type="button"
      aria-label="استمع للنطق"
      onClick={async (e) => {
        e.stopPropagation();
        if (!speechSupported()) {
          toast.error("المتصفح ده مش بيدعم النطق الصوتي، جرّب Chrome أو Safari.");
          return;
        }
        stopSpeaking();
        setPlaying(true);
        await speak(text);
        setPlaying(false);
      }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-teal-soft text-teal transition hover:scale-105 active:scale-95",
        playing && "animate-pulse",
        dims,
        className,
      )}
    >
      <Volume2 className={size === "lg" ? "h-7 w-7" : "h-5 w-5"} />
    </button>
  );
}

export function En({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="ltr" lang="en" className={cn("font-en", className)}>
      {children}
    </span>
  );
}
