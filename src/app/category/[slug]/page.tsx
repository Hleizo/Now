"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/site/ProductCard";
import { SiteShell } from "@/components/site/SiteShell";
import { categoryLabels, matchesProductSearch, products, quickCategories } from "@/data/storeData";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const slug = params.slug ?? "all";
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => (query ? "list" : "grid"));
  const sub = searchParams.get("sub") ?? "all";

  const availableSubcategories = useMemo(() => {
    const source = slug === "deals" ? products.filter((item) => item.deal) : products;
    const set = new Set(source.map((item) => item.subcategory));
    return ["all", ...Array.from(set)];
  }, [slug]);

  const filtered = useMemo(() => {
    let source = products;

    if (slug === "electronics" || slug === "school-supplies") {
      source = source.filter((item) => item.category === slug);
    }

    if (slug === "deals") {
      source = source.filter((item) => item.deal);
    }

    if (sub !== "all") {
      source = source.filter((item) => item.subcategory === sub);
    }

    if (query) {
      source = source.filter((item) => matchesProductSearch(item, query));
    }

    return source;
  }, [slug, sub, query]);

  const title = categoryLabels[slug] ?? "Category";

  return (
    <SiteShell initialQuery={query}>
      <main className="mx-auto max-w-7xl px-3 py-6 pb-24 sm:px-6 sm:py-8 md:pb-10">
        <h1 className="text-2xl font-black text-[#0B1F3B] sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {query ? `Results for "${query}"` : "Curated products for Jordan shoppers."}
        </p>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm sm:flex sm:items-center sm:justify-between sm:text-sm">
          <span>Local stock updated daily from partner suppliers in Amman.</span>
          <span className="font-semibold text-[#0B1F3B]">Secure checkout and fast delivery options available.</span>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {availableSubcategories.map((item) => {
            const selected = sub === item;
            const href = `/category/${slug}?sub=${item}${query ? `&q=${encodeURIComponent(query)}` : ""}`;
            const quickLabel = quickCategories.find((qItem) => qItem.slug === item)?.label;
            return (
              <Link
                key={item}
                href={href}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selected
                    ? "bg-[#2563EB] text-white"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {item === "all" ? "All" : quickLabel ?? item.replace(/-/g, " ")}
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
          <span>{filtered.length} products</span>
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                viewMode === "list"
                  ? "bg-[#0B1F3B] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                viewMode === "grid"
                  ? "bg-[#2563EB] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Grid
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No products matched this filter.
          </div>
        ) : (
          <div
            className={`mt-4 ${
              viewMode === "grid"
                ? "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
                : "grid grid-cols-1 gap-3"
            }`}
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout={viewMode === "list" ? "list" : "grid"}
              />
            ))}
          </div>
        )}
      </main>
    </SiteShell>
  );
}
