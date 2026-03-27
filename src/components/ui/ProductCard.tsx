"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Badge } from "./Badge";
import { StarIcon, TruckIcon, BoltIcon, PlusIcon, HeartIcon } from "@/components/icons/Icons";

interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: "default" | "deal";
}

export function ProductCard({ product, className = "", variant = "default" }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const {
    name,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
    badge,
    discount,
    freeDelivery,
    expressDelivery,
  } = product;

  const isDeal = variant === "deal";

  return (
    <article
      className={`product-card bg-card rounded-2xl shadow-card overflow-hidden cursor-pointer group relative border border-border ${className}`}
      role="link"
      tabIndex={0}
      aria-label={`${name}, ${price.toFixed(2)} JD`}
    >
      {/* Image Container - Fixed aspect ratio prevents layout shift */}
      <div className="relative aspect-square bg-surface overflow-hidden">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 400px) 45vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-105`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Badges - Top Left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {badge && <Badge variant={badge}>{badge}</Badge>}
        </div>
        
        {/* Discount Badge - Amber, Top Right */}
        {discount && (
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold bg-deal-500 text-text-primary animate-pulse-deal">
              -{discount}%
            </span>
          </div>
        )}

        {/* Wishlist Button - Always visible on mobile for discoverability */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute top-2 z-10 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm tap-feedback transition-all ${
            discount ? "right-12 sm:right-14" : "right-2"
          } ${!isWishlisted ? "md:opacity-0 md:group-hover:opacity-100" : ""}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          <HeartIcon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
            isWishlisted ? "text-action-500 fill-action-500" : "text-text-secondary"
          }`} />
        </button>

        {/* Quick Add Button - Shows on hover (desktop only) */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-navy-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
          <button className="w-full bg-action-500 hover:bg-action-600 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-1 transition-colors btn-press">
            <PlusIcon className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content - Optimized padding for mobile */}
      <div className="p-2.5 sm:p-3 lg:p-4">
        {/* Product Name - Minimum readable size */}
        <h3 className="text-[13px] sm:text-sm lg:text-base font-medium text-text-primary line-clamp-2 min-h-[36px] sm:min-h-[40px] lg:min-h-[48px] leading-snug group-hover:text-action-500 transition-colors">
          {name}
        </h3>

        {/* Rating - Compact on mobile */}
        <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
          <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${
                  i < Math.floor(rating) ? "text-deal-500 fill-deal-500" : "text-border fill-border"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-text-muted">({reviewCount.toLocaleString()})</span>
        </div>

        {/* Price - Strong hierarchy, readable on mobile */}
        <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
          <span className={`text-base sm:text-lg lg:text-xl font-bold ${isDeal ? "text-error" : "text-text-primary"}`}>
            {price.toFixed(2)} <span className="text-xs sm:text-sm font-semibold">JD</span>
          </span>
          {originalPrice && (
            <span className="text-[11px] sm:text-sm text-text-muted line-through">
              {originalPrice.toFixed(2)} JD
            </span>
          )}
        </div>
        
        {/* Savings badge - only on larger screens to save space */}
        {discount && originalPrice && (
          <span className="hidden sm:inline-flex text-[10px] sm:text-xs font-semibold text-success bg-green-50 px-1.5 py-0.5 rounded mt-1">
            Save {(originalPrice - price).toFixed(2)} JD
          </span>
        )}

        {/* Delivery Info - More compact on mobile */}
        <div className="mt-1.5 sm:mt-2 flex flex-wrap gap-1 sm:gap-2">
          {freeDelivery && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-success font-medium bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              <TruckIcon className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
              Free
            </span>
          )}
          {expressDelivery && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-action-500 font-medium bg-action-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              <BoltIcon className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
              Express
            </span>
          )}
        </div>

        {/* Mobile Add to Cart Button - Blue CTA, thumb-friendly height */}
        <button className="mt-2.5 sm:mt-3 w-full bg-action-500 text-white py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors btn-press md:hidden">
          <PlusIcon className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
