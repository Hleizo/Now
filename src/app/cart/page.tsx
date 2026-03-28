"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { useStore } from "@/components/providers/StoreProvider";
import { formatPrice, getProductById, products } from "@/data/storeData";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal, clearCart } = useStore();

  const items = cartItems
    .map((item) => ({ item, product: getProductById(item.productId) }))
    .filter((entry): entry is { item: (typeof cartItems)[number]; product: NonNullable<ReturnType<typeof getProductById>> } => Boolean(entry.product));

  const recommendationProducts = products
    .filter((product) => !cartItems.some((item) => item.productId === product.id))
    .slice(0, 4);

  return (
    <SiteShell>
      <main className="mx-auto max-w-5xl px-3 py-6 pb-24 sm:px-6 sm:py-8 md:pb-10">
        <h1 className="text-2xl font-black text-[#0B1F3B] sm:text-3xl">Your Cart</h1>
        <p className="mt-2 text-sm text-slate-600">Review your order before checkout.</p>

        <section className="mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-3">
          <p className="rounded-xl bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-slate-700">Same-day in Amman for eligible orders before 3 PM.</p>
          <p className="rounded-xl bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-slate-700">Secure checkout with card and cash on delivery.</p>
          <p className="rounded-xl bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-slate-700">7-day return window on eligible products.</p>
        </section>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">Your cart is currently empty.</p>
            <Link href="/category/all" className="mt-4 inline-block rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {items.map(({ item, product }) => (
              <article key={product.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-[#111827]">{product.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{formatPrice(product.price)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-sm font-semibold text-red-600"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(product.id, item.quantity - 1)}
                    className="h-8 w-8 rounded-lg border border-slate-300"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, item.quantity + 1)}
                    className="h-8 w-8 rounded-lg border border-slate-300"
                  >
                    +
                  </button>
                  <span className="ml-auto text-sm font-semibold text-[#0B1F3B]">
                    {formatPrice(product.price * item.quantity)}
                  </span>
                </div>
              </article>
            ))}

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="text-lg font-black text-[#111827]">{formatPrice(cartSubtotal)}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-4 block w-full rounded-xl bg-[#2563EB] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={clearCart}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Clear Cart
              </button>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-black text-[#0B1F3B]">Need Anything Else?</h2>
              <p className="mt-1 text-sm text-slate-600">Complete your order with frequently added essentials.</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {recommendationProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </SiteShell>
  );
}
