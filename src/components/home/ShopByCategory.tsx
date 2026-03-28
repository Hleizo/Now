"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@/components/icons/Icons";
import { shopCategories } from "@/data/mockData";

export function ShopByCategory() {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const handleImageLoad = useCallback((id: string) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  }, []);

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-surface animate-fade-in" aria-label="Shop by category">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <header className="mb-3 sm:mb-4 lg:mb-6 flex items-center justify-between">
          <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-navy-500">
            Shop by Category
          </h2>
          <a
            href="/categories"
            className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-semibold text-action-500 hover:text-action-600 transition-colors tap-feedback px-1 py-1"
          >
            View All
            <ChevronRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
          </a>
        </header>

        {/* Category Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-4 stagger-children"
          role="list"
        >
          {shopCategories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="group relative aspect-[4/5] sm:h-44 lg:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 tap-feedback hover-lift"
              role="listitem"
            >
              {/* Loading skeleton */}
              {!imagesLoaded[category.id] && (
                <div className="absolute inset-0 skeleton" aria-hidden="true" />
              )}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className={`object-cover transition-all duration-500 ${
                  imagesLoaded[category.id] ? "opacity-100 scale-100" : "opacity-0 scale-105"
                } group-hover:scale-110`}
                onLoad={() => handleImageLoad(category.id)}
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                aria-hidden="true"
              />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight group-hover:translate-y-[-2px] transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-white/80 text-[10px] sm:text-xs lg:text-sm group-hover:text-white transition-colors duration-300">
                  {category.tagline}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
