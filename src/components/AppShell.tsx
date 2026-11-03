import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { BookA, Home, Layers, LogOut, RotateCcw, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { to: "/home", label: "الرئيسية", icon: Home },
  { to: "/levels", label: "المستويات", icon: Layers },
  { to: "/review", label: "المراجعة", icon: RotateCcw },
  { to: "/dictionary", label: "القاموس", icon: BookA },
  { to: "/profile", label: "حسابي", icon: User },
] as const;

export function useSignOut() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };
}

export function AppShell() {
  const signOut = useSignOut();
  return (
    <div className="min-h-screen md:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-l bg-sidebar p-4 md:flex">
        <Link to="/home" className="mb-8 px-2 text-xl font-extrabold text-primary">إنجليزي من الصفر</Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="flex h-12 items-center gap-3 rounded-2xl px-4 font-semibold text-sidebar-foreground transition hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent text-primary" }}
            >
              <n.icon className="h-5 w-5" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <button onClick={signOut} className="flex h-11 items-center gap-2 rounded-2xl px-3 text-muted-foreground hover:bg-muted">
            <LogOut className="h-4 w-4" /> خروج
          </button>
        </div>
      </aside>

      <div className="flex-1 pb-24 md:pb-8">
        <header className="flex items-center justify-between p-4 md:hidden">
          <span className="text-lg font-extrabold text-primary">إنجليزي من الصفر</span>
          <ThemeToggle />
        </header>
        <main className="mx-auto max-w-3xl px-4 md:py-8 animate-in fade-in duration-300">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {nav.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className="flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold text-muted-foreground"
            activeProps={{ className: "text-primary" }}
          >
            <n.icon className="h-6 w-6" />
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
