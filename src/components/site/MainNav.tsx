"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/storeData";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden border-b border-slate-200/80 bg-white/95 md:block">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-3 py-3 sm:px-6">
        {mainNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-gradient-to-r from-[#0B1F3B] to-[#173760] text-white shadow-[0_8px_16px_rgba(11,31,59,0.2)]"
                  : "text-[#0B1F3B] ring-1 ring-transparent hover:bg-slate-100 hover:ring-slate-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
