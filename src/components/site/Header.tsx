"use client";

import Link from "next/link";
import { mainNav, matchesProductSearch, products } from "@/data/storeData";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "@/components/providers/StoreProvider";

interface HeaderProps {
  initialQuery?: string;
}

export function Header({ initialQuery = "" }: HeaderProps) {
  const router = useRouter();
  const { cartCount, wishlistCount } = useStore();
  const [search, setSearch] = useState(initialQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  const cartLabel = useMemo(() => (cartCount > 99 ? "99+" : String(cartCount)), [cartCount]);
  const wishlistLabel = useMemo(
    () => (wishlistCount > 99 ? "99+" : String(wishlistCount)),
    [wishlistCount],
  );

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return [];
    }

    return products.filter((product) => matchesProductSearch(product, query)).slice(0, 6);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchWrapRef.current) {
        return;
      }

      if (!searchWrapRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) {
      params.set("q", search.trim());
    }
    setIsSearchOpen(false);
    router.push(`/category/all${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const openProductFromSearch = (productId: string) => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    router.push(`/products/${productId}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_6px_24px_rgba(11,31,59,0.08)] backdrop-blur-md">
      <div className="border-b border-slate-200/80 bg-gradient-to-r from-[#F8FAFC] via-white to-[#F8FAFC]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-1 px-3 py-2.5 text-xs font-medium text-slate-600 sm:px-6">
          <span>
            Deliver to: <span className="font-semibold text-[#0B1F3B]">Amman, Jordan</span>
          </span>
          <span className="text-[#0B1F3B]">Order before 3:00 PM for same-day local delivery</span>
          <a href="tel:+96265009900" className="font-semibold text-[#2563EB] hover:underline">+962 6 500 9900</a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-xl text-[#0B1F3B] shadow-sm md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        <Link href="/" className="flex items-center gap-2 rounded-xl px-1 py-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1F3B] to-[#173760] text-lg font-black text-white shadow-[0_8px_18px_rgba(11,31,59,0.25)]">
            N
          </span>
          <span className="text-2xl font-black tracking-tight text-[#0B1F3B]">Now</span>
        </Link>

        <div ref={searchWrapRef} className="relative flex-1">
          <form onSubmit={submitSearch} className="flex items-center gap-2">
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              type="search"
              placeholder="Search electronics and school supplies"
              className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-[#111827] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none ring-[#2563EB] transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="h-11 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#2F74F5] px-5 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(37,99,235,0.28)] transition hover:from-blue-700 hover:to-[#2563EB]"
            >
              Search
            </button>
          </form>

          {isSearchOpen && search.trim() && (
            <div className="absolute left-0 right-0 top-12 z-50 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_40px_rgba(11,31,59,0.14)]">
              {searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => openProductFromSearch(product.id)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-slate-50"
                    >
                      <span className="pr-2 text-sm font-medium text-[#111827]">{product.title}</span>
                      <span className="text-xs font-semibold text-[#0B1F3B]">{product.price.toFixed(2)} JD</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl px-3 py-2 text-sm text-slate-500">No products matched your search.</p>
              )}
            </div>
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/about" className="rounded-xl px-3 py-2 text-sm font-semibold text-[#0B1F3B] transition hover:bg-slate-100">
            My Account
          </Link>

          <Link
            href="/wishlist"
            className="relative rounded-xl px-3 py-2 text-sm font-semibold text-[#0B1F3B] transition hover:bg-slate-100"
          >
            Wishlist
            <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#F59E0B] px-1 text-xs font-bold text-[#0B1F3B]">
              {wishlistLabel}
            </span>
          </Link>

          <Link
            href="/cart"
            className="relative rounded-xl bg-[#EFF4FF] px-3 py-2 text-sm font-semibold text-[#0B1F3B] ring-1 ring-blue-100 transition hover:bg-[#E6EEFF]"
          >
            Cart
            <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#2563EB] px-1 text-xs font-bold text-white">
              {cartLabel}
            </span>
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-3 py-3 md:hidden">
          <div className="grid gap-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-[#0B1F3B] hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-semibold text-amber-700"
              >
                Wishlist ({wishlistLabel})
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl bg-blue-50 px-3 py-2 text-center text-sm font-semibold text-blue-700"
              >
                Cart ({cartLabel})
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
