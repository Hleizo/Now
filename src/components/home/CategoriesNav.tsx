"use client";

import React, { useRef } from "react";
import { TagIcon } from "@/components/icons/Icons";

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
    <nav className="bg-white border-b border-border" aria-label="Categories navigation">
      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-1 py-2 px-4">
          {navCategories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                cat.highlight
                  ? "bg-deal-500 text-text-primary hover:bg-deal-600 font-bold"
                  : "text-text-primary hover:bg-surface hover:text-action-500"
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
                  ? "bg-deal-500 text-text-primary active:bg-deal-600 font-bold"
                  : "bg-surface text-text-primary active:bg-gray-200"
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
