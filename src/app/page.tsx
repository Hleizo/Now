"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteShell } from "@/components/site/SiteShell";
import {
  backToSchoolProducts,
  dealProducts,
  featuredProducts,
  matchesProductSearch,
  quickCategories,
} from "@/data/storeData";

export default function HomePage() {
  const [localSearch, setLocalSearch] = useState("");

  const filterProducts = (source: typeof featuredProducts) =>
    source.filter((product) => matchesProductSearch(product, localSearch));

  const visibleFeatured = useMemo(() => filterProducts(featuredProducts), [localSearch]);
  const visibleDeals = useMemo(() => filterProducts(dealProducts), [localSearch]);
  const visibleSchool = useMemo(() => filterProducts(backToSchoolProducts), [localSearch]);
  const bundleShowcase = useMemo(
    () => [...visibleFeatured, ...visibleSchool].slice(0, 4),
    [visibleFeatured, visibleSchool],
  );

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-3 pb-24 pt-6 sm:px-6 sm:pt-8 md:pb-12">
        <section className="relative overflow-hidden rounded-[1.8rem] border border-blue-100 bg-gradient-to-br from-[#0B1F3B] via-[#14325C] to-[#1A4C86] p-6 text-white shadow-[0_18px_44px_rgba(11,31,59,0.28)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-14 -top-16 h-56 w-56 rounded-full bg-[#4A8BFF]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-[#F59E0B]/15 blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
                Trusted Jordan Startup
              </p>
              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Premium electronics and school essentials for every day in Jordan
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-blue-100 sm:text-base">
                Verified products, transparent pricing, and fast local delivery backed by responsive support in Amman.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/category/deals" className="rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#2F74F5] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.35)] transition hover:from-blue-700 hover:to-[#2563EB]">
                  Shop Deals
                </Link>
                <Link href="/category/all" className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                  Explore Catalog
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <article className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-blue-100">Local Delivery</p>
                <p className="mt-1 text-lg font-bold">Same Day in Amman</p>
              </article>
              <article className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-blue-100">Quality Control</p>
                <p className="mt-1 text-lg font-bold">Verified Suppliers</p>
              </article>
              <article className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-blue-100">Support</p>
                <p className="mt-1 text-lg font-bold">Arabic + English</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.08)] sm:p-5">
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
                className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-[#F8FAFC] px-2 py-3 text-center text-xs font-semibold text-[#0B1F3B] shadow-[0_4px_10px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_20px_rgba(15,23,42,0.1)]"
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
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {visibleFeatured.map((product) => (
              <div key={product.id} className="w-[72%] min-w-[240px] max-w-[290px] snap-start sm:w-[42%] lg:w-[30%] xl:w-[24%]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Best Value</p>
              <h2 className="mt-1 text-2xl font-black text-[#0B1F3B]">Deals</h2>
            </div>
            <Link href="/category/deals" className="text-sm font-semibold text-[#2563EB] hover:text-blue-700">All deals</Link>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {visibleDeals.map((product) => (
              <div key={product.id} className="w-[72%] min-w-[240px] max-w-[290px] snap-start sm:w-[42%] lg:w-[30%] xl:w-[24%]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Smart Combos</p>
              <h2 className="mt-1 text-2xl font-black text-[#0B1F3B]">Bundle Picks</h2>
            </div>
            <Link href="/category/electronics" className="text-sm font-semibold text-[#2563EB] hover:text-blue-700">More picks</Link>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {bundleShowcase.map((product) => (
              <div key={`${product.id}-bundle`} className="w-[72%] min-w-[240px] max-w-[290px] snap-start sm:w-[42%] lg:w-[30%] xl:w-[24%]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Seasonal</p>
              <h2 className="mt-1 text-2xl font-black text-[#0B1F3B]">Back to School</h2>
            </div>
            <Link href="/category/school-supplies" className="text-sm font-semibold text-[#2563EB] hover:text-blue-700">See all</Link>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {visibleSchool.map((product) => (
              <div key={product.id} className="w-[72%] min-w-[240px] max-w-[290px] snap-start sm:w-[42%] lg:w-[30%] xl:w-[24%]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
