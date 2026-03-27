"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@/components/icons/Icons";

interface ShopCategory {
  id: string;
  name: string;
  tagline: string;
  image: string;
  href: string;
  color: string;
}

const shopCategories: ShopCategory[] = [
  {
    id: "1",
    name: "Electronics",
    tagline: "Latest Gadgets",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
    href: "/electronics",
    color: "from-navy-500 to-navy-600",
  },
  {
    id: "2",
    name: "Stationery",
    tagline: "Office Essentials",
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&q=80",
    href: "/stationery",
    color: "from-action-500 to-action-600",
  },
  {
    id: "3",
    name: "Accessories",
    tagline: "Complete Your Look",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
    href: "/accessories",
    color: "from-navy-400 to-navy-500",
  },
  {
    id: "4",
    name: "Home & Living",
    tagline: "Cozy Comfort",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    href: "/home",
    color: "from-action-600 to-action-700",
  },
  {
    id: "5",
    name: "Fashion",
    tagline: "Trending Styles",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    href: "/fashion",
    color: "from-navy-500 to-action-600",
  },
  {
    id: "6",
    name: "Sports & Fitness",
    tagline: "Stay Active",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    href: "/sports",
    color: "from-navy-600 to-navy-700",
  },
];

export function ShopByCategory() {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-surface" aria-label="Shop by category">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="mb-3 sm:mb-4 lg:mb-6 flex items-center justify-between">
          <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-navy-500">Shop by Category</h2>
          <a
            href="/categories"
            className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-semibold text-action-500 hover:text-action-600 transition-colors tap-feedback px-1 py-1"
          >
            View All
            <ChevronRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-4">
          {shopCategories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="group relative aspect-[4/5] sm:h-44 lg:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-card tap-feedback"
            >
              {/* Loading skeleton */}
              {!imagesLoaded[category.id] && (
                <div className="absolute inset-0 skeleton" />
              )}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className={`object-cover transition-all duration-500 ${
                  imagesLoaded[category.id] ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-110`}
                onLoad={() => setImagesLoaded(prev => ({ ...prev, [category.id]: true }))}
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight">{category.name}</h3>
                <p className="text-white/80 text-[10px] sm:text-xs lg:text-sm">{category.tagline}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
