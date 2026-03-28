"use client";

import React, { useRef, useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/Icons";
import type { QuickCategory } from "@/types";

interface CategoryScrollerProps {
  categories: QuickCategory[];
  title?: string;
  showArrows?: boolean;
  className?: string;
}

export function CategoryScroller({
  categories,
  title,
  showArrows = true,
  className = "",
}: CategoryScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const handleImageLoad = useCallback((id: string) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  }, []);

  return (
    <section className={`py-4 sm:py-6 lg:py-8 bg-white animate-fade-in ${className}`} aria-label="Category shortcuts">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || showArrows) && (
          <div className="px-3 sm:px-6 mb-3 sm:mb-4 flex items-center justify-between">
            {title && (
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-navy-500">
                {title}
              </h2>
            )}
            {showArrows && (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="w-9 h-9 bg-surface hover:bg-gray-200 rounded-full flex items-center justify-center transition-all border border-border btn-press hover:shadow-md"
                  aria-label="Scroll categories left"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-text-secondary" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-9 h-9 bg-surface hover:bg-gray-200 rounded-full flex items-center justify-center transition-all border border-border btn-press hover:shadow-md"
                  aria-label="Scroll categories right"
                >
                  <ChevronRightIcon className="w-5 h-5 text-text-secondary" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 lg:gap-6 px-3 sm:px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 smooth-scroll"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={category.href}
              className="flex-shrink-0 snap-start flex flex-col items-center gap-1.5 sm:gap-2 group tap-feedback animate-scale-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Circular Image */}
              <div
                className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden 
                  ring-2 ring-border group-hover:ring-action-500 group-hover:ring-4 
                  transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-105 
                  ${!imageLoaded[category.id] ? "skeleton" : ""}`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className={`object-cover transition-all duration-300 ${
                    imageLoaded[category.id] ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  onLoad={() => handleImageLoad(category.id)}
                  loading="lazy"
                />
              </div>
              {/* Label */}
              <span className="text-[11px] sm:text-xs lg:text-sm font-medium text-text-primary group-hover:text-action-500 transition-colors duration-200 text-center whitespace-nowrap">
                {category.name}
              </span>
            </a>
          ))}
          {/* End padding for smooth scroll */}
          <div className="w-3 flex-shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
