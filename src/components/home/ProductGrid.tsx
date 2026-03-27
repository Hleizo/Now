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
    <section className="py-4 sm:py-6 lg:py-8" aria-label={title}>
      {/* Header - Compact on mobile */}
      <div className="px-3 sm:px-6 mb-3 sm:mb-4 lg:mb-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          {isDeal && (
            <span className="bg-deal-500 text-text-primary text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg animate-pulse-deal">
              🔥 SALE
            </span>
          )}
          <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-navy-500">{title}</h2>
        </div>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-semibold text-action-500 hover:text-action-600 transition-colors tap-feedback px-1 py-1"
          >
            View All
            <ChevronRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        )}
      </div>

      {/* Grid - Optimized for mobile */}
      <div className="px-3 sm:px-6 max-w-7xl mx-auto">
        {columns === "scrollable" ? (
          <div className="flex gap-2.5 sm:gap-3 lg:gap-4 overflow-x-auto scrollbar-hide snap-x pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 smooth-scroll">
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[42%] sm:w-48 lg:w-56 snap-start">
                <ProductCard product={product} variant={variant} />
              </div>
            ))}
            {/* End padding for smooth scroll */}
            <div className="w-3 flex-shrink-0 sm:hidden" aria-hidden="true" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} variant={variant} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
