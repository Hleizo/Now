"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { StarIcon, TruckIcon, PlusIcon, HeartIcon } from "@/components/icons/Icons";

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
    discount,
    freeDelivery,
    expressDelivery,
  } = product;

  const isDeal = variant === "deal";
  const savings = originalPrice ? (originalPrice - price).toFixed(2) : null;

  return (
    <article
      className={`group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isDeal 
          ? "ring-2 ring-deal-500/30 shadow-[0_4px_20px_rgba(245,158,11,0.15)]" 
          : "shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
      } hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 active:scale-[0.98] ${className}`}
      role="link"
      tabIndex={0}
      aria-label={`${name}, ${price.toFixed(2)} JD`}
    >
      {/* Image Container */}
      <div className="relative bg-gradient-to-b from-slate-50 to-white p-3 sm:p-4">
        {/* Aspect ratio container */}
        <div className="relative aspect-square">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 animate-pulse" />
          )}
          
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 400px) 45vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-contain p-2 transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } group-hover:scale-110`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Discount Badge - Top Left - Eye-catching */}
        {discount && (
          <div className="absolute top-2 left-2 z-10">
            <div className="relative">
              <div className="bg-gradient-to-r from-deal-500 to-amber-400 text-navy-900 text-[10px] sm:text-xs font-extrabold px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg shadow-lg">
                <span className="drop-shadow-sm">-{discount}%</span>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-lg animate-pulse" />
            </div>
          </div>
        )}

        {/* Wishlist Button - Top Right - Always visible */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute top-2 right-2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
            isWishlisted 
              ? "bg-red-50 scale-110" 
              : "bg-white/95 backdrop-blur-sm hover:bg-white hover:scale-110"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          <HeartIcon 
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 ${
              isWishlisted 
                ? "text-red-500 fill-red-500 scale-110" 
                : "text-gray-400 group-hover:text-red-400"
            }`} 
          />
        </button>

        {/* Express/Fast Delivery Badge */}
        {(expressDelivery || freeDelivery) && (
          <div className="absolute bottom-2 left-2 z-10">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm ${
              expressDelivery 
                ? "bg-action-500 text-white" 
                : "bg-emerald-500 text-white"
            }`}>
              <TruckIcon className="w-3 h-3" />
              <span>{expressDelivery ? "Fast" : "Free"}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 pt-2 sm:pt-3">
        {/* Rating Row */}
        <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
          <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded" aria-label={`Rating: ${rating} out of 5`}>
            <StarIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[11px] sm:text-xs font-bold text-amber-700">{rating.toFixed(1)}</span>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-400">({reviewCount.toLocaleString()} reviews)</span>
        </div>

        {/* Product Name - 2 lines max */}
        <h3 className="text-[13px] sm:text-sm lg:text-base font-semibold text-gray-800 line-clamp-2 min-h-[36px] sm:min-h-[40px] lg:min-h-[48px] leading-snug mb-2 sm:mb-3 group-hover:text-action-600 transition-colors">
          {name}
        </h3>

        {/* Price Section - Strong Visual Hierarchy */}
        <div className="space-y-1 mb-3 sm:mb-4">
          {/* Current Price - Big and Bold */}
          <div className="flex items-baseline gap-1">
            <span className={`text-xl sm:text-2xl lg:text-[26px] font-extrabold tracking-tight ${
              isDeal ? "text-red-600" : "text-gray-900"
            }`}>
              {price.toFixed(2)}
            </span>
            <span className="text-sm sm:text-base font-semibold text-gray-500">JD</span>
          </div>
          
          {/* Old Price & Savings Row */}
          {originalPrice && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm text-gray-400 line-through decoration-gray-300">
                {originalPrice.toFixed(2)} JD
              </span>
              {savings && (
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Save {savings} JD
                </span>
              )}
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">
          <TruckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
          <span>{expressDelivery ? "Tomorrow delivery" : freeDelivery ? "Free delivery" : "Fast delivery"}</span>
        </div>

        {/* Add to Cart Button - Strong CTA */}
        <button 
          className={`w-full py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 shadow-sm ${
            isDeal
              ? "bg-gradient-to-r from-deal-500 to-amber-400 text-navy-900 hover:from-deal-600 hover:to-amber-500 shadow-amber-200"
              : "bg-gradient-to-r from-action-500 to-action-600 text-white hover:from-action-600 hover:to-action-700 shadow-action-200"
          } active:scale-[0.97] hover:shadow-md`}
          aria-label={`Add ${name} to cart`}
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Hover Overlay Glow Effect - Desktop only */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
        <div className={`absolute inset-0 rounded-2xl ${
          isDeal 
            ? "ring-2 ring-deal-500/50" 
            : "ring-2 ring-action-500/30"
        }`} />
      </div>
    </article>
  );
}
