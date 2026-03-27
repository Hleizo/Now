"use client";

import React, { useRef } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ui";
import { ChevronRightIcon, ChevronLeftIcon, FireIcon } from "@/components/icons/Icons";

interface ProductGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  variant?: "default" | "deal";
  columns?: "default" | "scrollable";
}

export function ProductGrid({ 
  products, 
  title, 
  subtitle,
  viewAllHref,
  variant = "default",
  columns = "default"
}: ProductGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDeal = variant === "deal";

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth || 200;
      const scrollAmount = cardWidth * 2;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={`py-5 sm:py-6 lg:py-8 ${isDeal ? "bg-gradient-to-b from-amber-50/50 to-white" : ""}`} aria-label={title}>
      {/* Header - More impactful */}
      <div className="px-3 sm:px-6 mb-4 sm:mb-5 lg:mb-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {isDeal && (
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-deal-500 to-amber-400 text-navy-900 text-xs sm:text-sm font-extrabold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl shadow-lg animate-pulse">
                <FireIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>HOT DEALS</span>
              </div>
            )}
            <div>
              <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${isDeal ? "text-amber-900" : "text-navy-500"}`}>
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Scroll arrows for scrollable on desktop */}
            {columns === "scrollable" && (
              <div className="hidden md:flex items-center gap-1.5">
                <button
                  onClick={() => scroll("left")}
                  className="w-8 h-8 lg:w-9 lg:h-9 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-md border border-gray-100 active:scale-95"
                  aria-label="Scroll left"
                >
                  <ChevronLeftIcon className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-8 h-8 lg:w-9 lg:h-9 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-all shadow-md border border-gray-100 active:scale-95"
                  aria-label="Scroll right"
                >
                  <ChevronRightIcon className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                </button>
              </div>
            )}
            
            {viewAllHref && (
              <a
                href={viewAllHref}
                className={`flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all ${
                  isDeal 
                    ? "bg-deal-500 text-navy-900 hover:bg-deal-600 shadow-sm" 
                    : "text-action-500 hover:bg-action-50"
                }`}
              >
                <span>View All</span>
                <ChevronRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Grid / Carousel */}
      <div className="max-w-7xl mx-auto">
        {columns === "scrollable" ? (
          // Horizontal scrollable carousel
          <div 
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 lg:gap-5 px-3 sm:px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 smooth-scroll"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0 w-[46%] sm:w-[220px] lg:w-[250px] snap-start"
              >
                <ProductCard product={product} variant={variant} />
              </div>
            ))}
            {/* End padding */}
            <div className="w-3 sm:w-6 flex-shrink-0" aria-hidden="true" />
          </div>
        ) : (
          // Standard grid
          <div className="px-3 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} variant={variant} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
