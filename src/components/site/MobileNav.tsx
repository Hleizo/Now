"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/components/providers/StoreProvider";

const items = [
  { label: "Home", href: "/" },
  { label: "Deals", href: "/category/deals" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
  { label: "Contact", href: "/contact" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { cartCount, wishlistCount } = useStore();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-5 px-1 pb-[max(env(safe-area-inset-bottom),6px)] pt-1.5">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const badge = item.href === "/cart" ? cartCount : item.href === "/wishlist" ? wishlistCount : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex min-h-12 flex-col items-center justify-center rounded-lg text-[11px] font-semibold ${
                isActive ? "text-[#2563EB]" : "text-slate-500"
              }`}
            >
              {item.label}
              {badge > 0 && (
                <span className="absolute right-2 top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-[#F59E0B] px-1 text-[9px] font-bold text-[#0B1F3B]">
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
