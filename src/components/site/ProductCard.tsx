"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/components/providers/StoreProvider";
import { formatPrice } from "@/data/storeData";
import type { Product } from "@/types/store";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);
  const [imageFailed, setImageFailed] = useState(false);

  const openProduct = () => router.push(`/products/${product.id}`);

  if (layout === "list") {
    return (
      <article
        role="link"
        tabIndex={0}
        onClick={openProduct}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProduct();
          }
        }}
        className="group cursor-pointer rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/50 p-2.5 shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,23,42,0.13)] sm:p-3"
        aria-label={`Open ${product.title}`}
      >
        <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 sm:grid-cols-[104px_minmax(0,1fr)] md:grid-cols-[104px_minmax(0,1fr)_220px] md:items-stretch md:gap-4">
          <div className="relative h-[88px] w-[88px] overflow-hidden rounded-xl border border-slate-200/80 bg-[#F8FAFC] sm:h-[104px] sm:w-[104px]">
            {imageFailed ? (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 px-2 text-center text-[10px] font-medium text-slate-500 sm:text-xs">
                Image unavailable
              </div>
            ) : (
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="112px"
                className="object-cover transition duration-300 group-hover:scale-105"
                onError={() => setImageFailed(true)}
              />
            )}
            {product.discount && (
              <span className="absolute left-1.5 top-1.5 rounded-md bg-gradient-to-r from-[#F59E0B] to-[#F7B733] px-1.5 py-0.5 text-[10px] font-bold text-[#0B1F3B] shadow-sm sm:text-xs">
                -{product.discount}%
              </span>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">
                ⭐ {product.rating.toFixed(1)} ({product.reviews})
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">
                {product.fastDelivery ? "Fast local delivery" : "Standard delivery"}
              </span>
            </div>

            <h3 className="line-clamp-2 text-sm font-bold text-[#111827] sm:text-base">{product.title}</h3>

            <p className="mt-1 line-clamp-2 text-xs text-slate-500 sm:text-sm">{product.description}</p>

            <div className="mt-1.5 flex items-end gap-2">
              <span className="text-xl font-black tracking-tight text-[#0B1F3B]">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-xs font-medium text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            <div className="mt-1 text-xs font-medium text-slate-500">
              {product.category === "school-supplies" ? "School Supplies" : "Electronics"} • {product.subcategory.replace(/-/g, " ")}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 md:hidden">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  addToCart(product.id);
                }}
                className="rounded-xl bg-gradient-to-r from-[#2563EB] to-[#2F74F5] px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_14px_rgba(37,99,235,0.22)] transition hover:from-blue-700 hover:to-[#2563EB]"
              >
                Add to Cart
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  wishlisted
                    ? "border-[#F59E0B] bg-amber-50 text-amber-700"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            </div>
          </div>

          <div className="hidden h-full rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3 md:flex md:flex-col md:justify-between">
            <div className="text-right">
              <p className={`text-sm font-semibold ${product.inStock ? "text-emerald-600" : "text-red-600"}`}>
                {product.inStock ? "In stock" : "Out of stock"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {product.fastDelivery ? "Fast local delivery" : "Standard delivery"}
              </p>
            </div>

            <div className="mt-3 space-y-2">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  addToCart(product.id);
                }}
                className="w-full rounded-xl bg-gradient-to-r from-[#2563EB] to-[#2F74F5] px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_14px_rgba(37,99,235,0.22)] transition hover:from-blue-700 hover:to-[#2563EB]"
              >
                Add to Cart
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`w-full rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  wishlisted
                    ? "border-[#F59E0B] bg-amber-50 text-amber-700"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {wishlisted ? "Wishlisted" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={openProduct}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProduct();
        }
      }}
      className="group flex h-full cursor-pointer flex-col rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/50 p-3 shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(15,23,42,0.13)]"
      aria-label={`Open ${product.title}`}
    >
      <div className="relative mb-3 aspect-square overflow-hidden rounded-xl border border-slate-200/80 bg-[#F8FAFC]">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 px-3 text-center text-xs font-medium text-slate-500">
            Image unavailable
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
        {product.discount && (
          <span className="absolute left-2 top-2 rounded-md bg-gradient-to-r from-[#F59E0B] to-[#F7B733] px-2 py-1 text-xs font-bold text-[#0B1F3B] shadow-sm">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-1 flex items-center justify-between gap-2 text-xs">
          <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600">
            ⭐ {product.rating.toFixed(1)} ({product.reviews})
          </span>
          <span className={`font-semibold ${product.inStock ? "text-emerald-600" : "text-red-600"}`}>
            {product.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 min-h-10 text-sm font-bold text-[#111827]">{product.title}</h3>

        <div className="mb-3 flex items-end gap-2">
          <span className="text-2xl font-black tracking-tight text-[#0B1F3B]">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs font-medium text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        <div className="mb-3 text-xs font-medium text-slate-500">
          {product.fastDelivery ? "Fast local delivery" : "Standard delivery"}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button
            onClick={(event) => {
              event.stopPropagation();
              addToCart(product.id);
            }}
            className="rounded-xl bg-gradient-to-r from-[#2563EB] to-[#2F74F5] px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_14px_rgba(37,99,235,0.22)] transition hover:from-blue-700 hover:to-[#2563EB]"
          >
            Add to Cart
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              wishlisted
                ? "border-[#F59E0B] bg-amber-50 text-amber-700"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {wishlisted ? "Wishlisted" : "Wishlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
