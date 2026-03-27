import React from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ui";
import { ChevronRightIcon } from "@/components/icons/Icons";

interface ProductGridProps {
  products: Product[];
  title: string;
  viewAllHref?: string;
  variant?: "default" | "deal";
  columns?: "default" | "scrollable";
}

export function ProductGrid({ 
  products, 
  title, 
  viewAllHref,
  variant = "default",
  columns = "default"
}: ProductGridProps) {
  const isDeal = variant === "deal";

  return (
    <section className="py-6 sm:py-8" aria-label={title}>
      {/* Header */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {isDeal && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg animate-pulse">
              🔥 SALE
            </span>
          )}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
        </div>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors group"
          >
            View All
            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>

      {/* Grid */}
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        {columns === "scrollable" ? (
          <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide snap-x pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-44 sm:w-56 snap-start">
                <ProductCard product={product} variant={variant} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} variant={variant} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
