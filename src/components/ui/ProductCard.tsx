"use client";

import React from "react";
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
      className={`product-card bg-white rounded-2xl shadow-card overflow-hidden cursor-pointer group relative ${className}`}
      role="link"
      tabIndex={0}
      aria-label={`${name}, $${price}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {badge && <Badge variant={badge}>{badge}</Badge>}
        </div>
        
        {/* Discount Badge - Top Right */}
        {discount && (
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${
              isDeal ? "bg-red-500 text-white" : "bg-primary-500 text-white"
            }`}>
              -{discount}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          className={`absolute top-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white ${discount ? "right-14" : "right-2"}`}
          aria-label="Add to wishlist"
        >
          <HeartIcon className="w-4 h-4 text-slate-600 hover:text-red-500" />
        </button>

        {/* Quick Add Button - Shows on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
          <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-1 transition-colors">
            <PlusIcon className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-medium text-slate-900 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] group-hover:text-primary-500 transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">({reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className={`text-lg sm:text-xl font-bold ${isDeal ? "text-red-500" : "text-slate-900"}`}>
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          {discount && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              Save ${(originalPrice! - price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Delivery Info */}
        <div className="mt-2 flex flex-wrap gap-2">
          {freeDelivery && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
              <TruckIcon className="w-3 h-3" />
              Free Delivery
            </span>
          )}
          {expressDelivery && (
            <span className="inline-flex items-center gap-1 text-xs text-primary-500 font-medium bg-primary-50 px-2 py-1 rounded-full">
              <BoltIcon className="w-3 h-3" />
              Express
            </span>
          )}
        </div>

        {/* Mobile Add to Cart Button */}
        <button className="mt-3 w-full bg-slate-100 hover:bg-primary-500 hover:text-white text-slate-700 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1 transition-colors md:hidden">
          <PlusIcon className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
