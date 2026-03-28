"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { useStore } from "@/components/providers/StoreProvider";
import { formatPrice, getProductById } from "@/data/storeData";

export default function CheckoutPage() {
  const { cartItems, cartSubtotal, clearCart } = useStore();
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const items = cartItems
    .map((item) => ({ item, product: getProductById(item.productId) }))
    .filter(
      (entry): entry is { item: (typeof cartItems)[number]; product: NonNullable<ReturnType<typeof getProductById>> } =>
        Boolean(entry.product),
    );

  const shippingFee = useMemo(() => (cartSubtotal >= 35 ? 0 : 2.5), [cartSubtotal]);
  const total = cartSubtotal + shippingFee;

  const placeOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const orderId = `NOW-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlacedOrderId(orderId);
    clearCart();
  };

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-3 py-6 pb-24 sm:px-6 sm:py-8 md:pb-10">
        <h1 className="text-2xl font-black text-[#0B1F3B] sm:text-3xl">Checkout</h1>
        <p className="mt-2 text-sm text-slate-600">Complete your order with delivery details and payment method.</p>

        {placedOrderId ? (
          <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-xl font-black text-emerald-800">Order Confirmed</h2>
            <p className="mt-2 text-sm text-emerald-700">Your order {placedOrderId} has been placed successfully.</p>
            <p className="mt-1 text-sm text-emerald-700">You will receive delivery updates on your phone and email.</p>
            <Link href="/" className="mt-4 inline-block rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white">
              Continue Shopping
            </Link>
          </section>
        ) : items.length === 0 ? (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-slate-600">Your cart is empty. Add products before checkout.</p>
            <Link href="/category/all" className="mt-4 inline-block rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white">
              Browse Products
            </Link>
          </section>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-lg font-black text-[#0B1F3B]">Delivery Information</h2>
              <form className="mt-4 grid gap-3" onSubmit={placeOrder}>
                <label className="grid gap-1 text-sm font-semibold text-slate-700">
                  Full Name
                  <input required className="h-11 rounded-xl border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[#2563EB]" />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-700">
                  Mobile Number
                  <input required placeholder="+962 79 123 4567" className="h-11 rounded-xl border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[#2563EB]" />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-700">
                  City
                  <select className="h-11 rounded-xl border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[#2563EB]" defaultValue="Amman">
                    <option>Amman</option>
                    <option>Zarqa</option>
                    <option>Irbid</option>
                    <option>Salt</option>
                    <option>Aqaba</option>
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-700">
                  Address
                  <textarea required rows={3} className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#2563EB]" />
                </label>

                <h3 className="mt-2 text-base font-black text-[#0B1F3B]">Payment Method</h3>
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
                  <input type="radio" name="payment" defaultChecked /> Cash on Delivery
                </label>
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
                  <input type="radio" name="payment" /> Card Payment
                </label>

                <button type="submit" className="mt-2 rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white">
                  Place Order
                </button>
              </form>
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-lg font-black text-[#0B1F3B]">Order Summary</h2>
              <div className="mt-4 space-y-3">
                {items.map(({ item, product }) => (
                  <div key={product.id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-slate-700">{product.title} x{item.quantity}</span>
                    <span className="font-semibold text-[#111827]">{formatPrice(product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-200 pt-3 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-base font-black text-[#0B1F3B]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-[#F8FAFC] p-3 text-xs font-semibold text-slate-700">
                <p>Estimated delivery: 1 to 2 business days in Amman.</p>
                <p>Orders above 35.00 JD include free shipping.</p>
                <p>Live order support: +962 6 500 9900.</p>
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600">
                <p className="font-bold text-[#0B1F3B]">Why checkout with confidence</p>
                <ul className="mt-2 space-y-1">
                  <li>Secure payment processing</li>
                  <li>Order confirmation and tracking updates</li>
                  <li>Support team available 7 days a week</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </main>
    </SiteShell>
  );
}
