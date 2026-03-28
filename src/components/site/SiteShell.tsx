"use client";

import type { ReactNode } from "react";
import { useStore } from "@/components/providers/StoreProvider";
import { Header } from "./Header";
import { MainNav } from "./MainNav";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

interface SiteShellProps {
  children: ReactNode;
  initialQuery?: string;
}

export function SiteShell({ children, initialQuery }: SiteShellProps) {
  const { toast, dismissToast } = useStore();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(11,31,59,0.08),transparent_35%)]" />
      <Header initialQuery={initialQuery} />
      <MainNav />
      {children}

      {toast && (
        <div className="fixed inset-x-3 top-20 z-[70] mx-auto max-w-md md:top-24" aria-live="polite" aria-atomic="true">
          <div className={`flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 shadow-[0_16px_34px_rgba(11,31,59,0.2)] backdrop-blur ${
            toast.kind === "success"
              ? "border-emerald-200 bg-emerald-50/95 text-emerald-800"
              : "border-blue-200 bg-blue-50/95 text-blue-800"
          }`}>
            <p className="text-sm font-semibold">{toast.message}</p>
            <button
              type="button"
              onClick={dismissToast}
              className="text-xs font-bold uppercase tracking-wide opacity-80 hover:opacity-100"
              aria-label="Dismiss notification"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
      <MobileNav />
    </div>
  );
}
