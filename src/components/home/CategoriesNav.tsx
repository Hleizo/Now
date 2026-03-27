"use client";

import React, { useRef } from "react";
import { TagIcon } from "@/components/icons/Icons";

interface CategoryNavProps {
  categories: { id: string; name: string; href: string }[];
}

const navCategories = [
  { id: "1", name: "Electronics", href: "/electronics" },
  { id: "2", name: "Stationery", href: "/stationery" },
  { id: "3", name: "Accessories", href: "/accessories" },
  { id: "4", name: "Deals", href: "/deals", highlight: true },
  { id: "5", name: "Laptops", href: "/laptops" },
  { id: "6", name: "Mobiles", href: "/mobiles" },
  { id: "7", name: "Beauty", href: "/beauty" },
  { id: "8", name: "Home", href: "/home" },
  { id: "9", name: "Fashion", href: "/fashion" },
  { id: "10", name: "Sports", href: "/sports" },
  { id: "11", name: "Toys", href: "/toys" },
  { id: "12", name: "Grocery", href: "/grocery" },
];

export function CategoriesNav() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <nav className="bg-white border-b border-slate-100" aria-label="Categories navigation">
      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-1 py-2 px-4">
          {navCategories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                cat.highlight
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "text-slate-700 hover:bg-slate-100 hover:text-primary-500"
              }`}
            >
              {cat.highlight && <TagIcon className="w-4 h-4 inline mr-1 -mt-0.5" />}
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {navCategories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href}
              className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                cat.highlight
                  ? "bg-primary-500 text-white active:bg-primary-600"
                  : "bg-slate-100 text-slate-700 active:bg-slate-200"
              }`}
            >
              {cat.highlight && <TagIcon className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />}
              {cat.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
