"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteShell } from "@/components/site/SiteShell";
import {
  backToSchoolProducts,
  dealProducts,
  featuredProducts,
  matchesProductSearch,
  quickCategories,
} from "@/data/storeData";

type HomeProduct = (typeof featuredProducts)[number];

function ScrollableProductRow({ products, label }: { products: HomeProduct[]; label: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const node = rowRef.current;
    if (!node) {
      return;
    }

    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setCanScrollLeft(node.scrollLeft > 4);
    setCanScrollRight(node.scrollLeft < maxScrollLeft - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState, products.length]);

  const scrollByAmount = (direction: "left" | "right") => {
    const node = rowRef.current;
    if (!node) {
      return;
    }

    const amount = Math.max(260, Math.floor(node.clientWidth * 0.6));
    node.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        No products found for {label.toLowerCase()}.
      </div>
    );
  }

  return (
    <div className="relative">
      {canScrollLeft && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r from-[#F8FAFC] to-transparent sm:block" />
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            className="absolute -left-2 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-base font-semibold text-[#0B1F3B] shadow-sm transition hover:bg-slate-50 sm:flex"
            aria-label={`Scroll ${label} left`}
          >
            ‹
          </button>
        </>
      )}

      {canScrollRight && (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#F8FAFC] to-transparent" />
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            className="absolute -right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-base font-semibold text-[#0B1F3B] shadow-sm transition hover:bg-slate-50"
            aria-label={`Scroll ${label} right`}
          >
            ›
          </button>
        </>
      )}

      <div
        ref={rowRef}
        onScroll={updateScrollState}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[72%] min-w-[240px] max-w-[290px] snap-start sm:w-[42%] lg:w-[30%] xl:w-[24%]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {canScrollRight && <p className="mt-2 text-xs text-slate-500 sm:hidden">Swipe for more</p>}
    </div>
  );
}

export default function HomePage() {
  const [localSearch, setLocalSearch] = useState("");

  const filterProducts = useCallback(
    (source: typeof featuredProducts) =>
      source.filter((product) => matchesProductSearch(product, localSearch)),
    [localSearch],
  );

  const visibleFeatured = useMemo(() => filterProducts(featuredProducts), [filterProducts]);
  const visibleDeals = useMemo(() => filterProducts(dealProducts), [filterProducts]);
  const visibleSchool = useMemo(() => filterProducts(backToSchoolProducts), [filterProducts]);
  const bundleShowcase = useMemo(
    () => [...visibleFeatured, ...visibleSchool].slice(0, 4),
    [visibleFeatured, visibleSchool],
  );

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-3 pb-24 pt-6 sm:px-6 sm:pt-8 md:pb-12">
        <section className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#1D4ED8]">
                Trusted Jordan Startup
              </p>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-[#0B1F3B] sm:text-4xl lg:text-5xl">
                Premium electronics and school essentials for every day in Jordan
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
                Verified products, transparent pricing, and fast local delivery backed by responsive support in Amman.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/category/deals" className="rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Shop Deals
                </Link>
                <Link href="/category/all" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#0B1F3B] transition hover:bg-slate-50">
                  Explore Catalog
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Local Delivery</p>
                <p className="mt-1 text-lg font-bold text-[#0B1F3B]">Same Day in Amman</p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Quality Control</p>
                <p className="mt-1 text-lg font-bold text-[#0B1F3B]">Verified Suppliers</p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Support</p>
                <p className="mt-1 text-lg font-bold text-[#0B1F3B]">Arabic + English</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_8px_18px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Browse Fast</p>
              <h2 className="mt-1 text-xl font-black text-[#0B1F3B]">Quick Categories</h2>
            </div>
            <input
              value={localSearch}
              onChange={(event) => setLocalSearch(event.target.value)}
              placeholder="Filter products on this page"
              className="h-11 rounded-2xl border border-slate-300 bg-[#F8FAFC] px-4 text-sm outline-none ring-[#2563EB] transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
            {quickCategories.map((item) => (
              <Link
                key={item.id}
                href={`/category/${item.mainCategory}?sub=${item.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white px-2 py-3 text-center text-xs font-semibold text-[#0B1F3B] transition hover:border-blue-200 hover:bg-[#FAFCFF]"
              >
                <span className="mb-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 transition group-hover:ring-blue-200">
                  {item.icon}
                </span>
                <span className="line-clamp-2 block">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Top Picks</p>
              <h2 className="mt-1 text-2xl font-black text-[#0B1F3B]">Featured Products</h2>
            </div>
            <Link href="/category/all" className="text-sm font-semibold text-[#2563EB] hover:text-blue-700">View all</Link>
          </div>
          <ScrollableProductRow products={visibleFeatured} label="Featured Products" />
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Best Value</p>
              <h2 className="mt-1 text-2xl font-black text-[#0B1F3B]">Deals</h2>
            </div>
            <Link href="/category/deals" className="text-sm font-semibold text-[#2563EB] hover:text-blue-700">All deals</Link>
          </div>
          <ScrollableProductRow products={visibleDeals} label="Deals" />
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Smart Combos</p>
              <h2 className="mt-1 text-2xl font-black text-[#0B1F3B]">Bundle Picks</h2>
            </div>
            <Link href="/category/electronics" className="text-sm font-semibold text-[#2563EB] hover:text-blue-700">More picks</Link>
          </div>
          <ScrollableProductRow products={bundleShowcase} label="Bundle Picks" />
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Seasonal</p>
              <h2 className="mt-1 text-2xl font-black text-[#0B1F3B]">Back to School</h2>
            </div>
            <Link href="/category/school-supplies" className="text-sm font-semibold text-[#2563EB] hover:text-blue-700">See all</Link>
          </div>
          <ScrollableProductRow products={visibleSchool} label="Back to School" />
        </section>
      </main>
    </SiteShell>
  );
}
