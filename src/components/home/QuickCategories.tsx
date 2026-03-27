"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/Icons";

interface QuickCategory {
  id: string;
  name: string;
  image: string;
  href: string;
}

const quickCategories: QuickCategory[] = [
  {
    id: "1",
    name: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80",
    href: "/mobiles",
  },
  {
    id: "2",
    name: "Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80",
    href: "/laptops",
  },
  {
    id: "3",
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    href: "/headphones",
  },
  {
    id: "4",
    name: "Watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    href: "/watches",
  },
  {
    id: "5",
    name: "Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80",
    href: "/cameras",
  },
  {
    id: "6",
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&q=80",
    href: "/gaming",
  },
  {
    id: "7",
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
    href: "/beauty",
  },
  {
    id: "8",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&q=80",
    href: "/fashion",
  },
  {
    id: "9",
    name: "Home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80",
    href: "/home",
  },
  {
    id: "10",
    name: "Sports",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=80",
    href: "/sports",
  },
];

export function QuickCategories() {
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
    <section className="py-6 sm:py-8" aria-label="Quick category shortcuts">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 mb-4 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Shop by Category</h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 px-4 sm:px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
        >
          {quickCategories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="flex-shrink-0 snap-start flex flex-col items-center gap-2 group"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-primary-500 group-hover:ring-4 transition-all shadow-md group-active:scale-95">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-primary-500 transition-colors text-center whitespace-nowrap">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
