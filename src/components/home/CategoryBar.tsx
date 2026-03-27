"use client";

import React, { useRef } from "react";
import { Category } from "@/types";
import { CategoryCard } from "@/components/ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/Icons";

interface CategoryBarProps {
  categories: Category[];
}

export function CategoryBar({ categories }: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-4 sm:py-6" aria-label="Shop by category">
      <div className="px-4 sm:px-6 mb-3 flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">Shop by Category</h2>
        <a
          href="/categories"
          className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
        >
          See All
        </a>
      </div>

      <div className="relative">
        {/* Scroll Buttons - Desktop */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-slate-50 transition-colors"
          aria-label="Scroll categories left"
        >
          <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-slate-50 transition-colors"
          aria-label="Scroll categories right"
        >
          <ChevronRightIcon className="w-5 h-5 text-slate-600" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 px-4 sm:px-6 overflow-x-auto scrollbar-hide snap-x"
          role="list"
        >
          {categories.map((category) => (
            <div key={category.id} className="snap-start flex-shrink-0" role="listitem">
              <CategoryCard category={category} className="w-20 sm:w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
