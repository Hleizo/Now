"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Badge } from "./Badge";
import { StarIcon, TruckIcon, BoltIcon } from "@/components/icons/Icons";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
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

  return (
    <article
      className={`product-card bg-white rounded-2xl shadow-card overflow-hidden cursor-pointer ${className}`}
      role="link"
      tabIndex={0}
      aria-label={`${name}, $${price}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-slate-50">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          loading="lazy"
        />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-2 left-2">
            <Badge variant={badge}>{badge}</Badge>
          </div>
        )}
        
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-2 right-2">
            <Badge variant="discount">-{discount}%</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-medium text-slate-900 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-medium text-slate-700">{rating}</span>
          <span className="text-xs text-slate-500">({reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-bold text-slate-900">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Delivery Info */}
        <div className="mt-2 flex flex-wrap gap-2">
          {freeDelivery && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <TruckIcon className="w-3 h-3" />
              Free Delivery
            </span>
          )}
          {expressDelivery && (
            <span className="inline-flex items-center gap-1 text-xs text-primary-500 font-medium">
              <BoltIcon className="w-3 h-3" />
              Express
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
