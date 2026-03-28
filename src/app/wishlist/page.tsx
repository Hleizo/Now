"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { useStore } from "@/components/providers/StoreProvider";
import { getProductById } from "@/data/storeData";

export default function WishlistPage() {
  const { wishlistIds, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = wishlistIds
    .map((id) => getProductById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-3 py-6 pb-24 sm:px-6 sm:py-8 md:pb-10">
        <h1 className="text-2xl font-black text-[#0B1F3B] sm:text-3xl">Your Wishlist</h1>
        <p className="mt-2 text-sm text-slate-600">Saved products you might want to buy later.</p>

        {wishlistProducts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">No wishlist items yet.</p>
            <Link href="/category/all" className="mt-4 inline-block rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="space-y-2">
                <ProductCard product={product} />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </SiteShell>
  );
}
