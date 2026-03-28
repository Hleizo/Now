"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { useStore } from "@/components/providers/StoreProvider";
import { formatPrice, getProductById, products } from "@/data/storeData";

const highlightsBySubcategory: Record<string, string[]> = {
  "chargers-cables": [
    "Smart power output for phones, tablets, and laptops.",
    "Heat-safe design for daily charging at home or office.",
    "Compact build for travel and university bags.",
  ],
  headphones: [
    "Balanced sound profile for calls, study, and music.",
    "Comfortable wear for long sessions.",
    "Reliable battery life for daily use.",
  ],
  "keyboards-mouse": [
    "Quiet typing and smooth pointer control.",
    "Plug-and-play setup for workstations and study desks.",
    "Optimized for productivity and focused study time.",
  ],
  "phone-accessories": [
    "Daily-use protection and utility for smartphones.",
    "Designed for reliable grip, carry, and convenience.",
    "Compatible with modern device form factors.",
  ],
  notebooks: [
    "Clean paper quality for notes and exam prep.",
    "Durable covers for daily school and university use.",
    "Designed for clear writing and organization.",
  ],
  pens: [
    "Smooth ink flow for fast and neat writing.",
    "Comfortable grip for long lectures and revision sessions.",
    "Practical pack sizes for students and offices.",
  ],
  calculators: [
    "Exam-friendly layout and readable display.",
    "Reliable performance for math and engineering courses.",
    "Built for daily classroom and university use.",
  ],
  "school-bags": [
    "Comfort-focused straps for daily commuting.",
    "Storage compartments for books, laptop, and accessories.",
    "Durable materials for school-year reliability.",
  ],
  "laptop-accessories": [
    "Protective build for safer everyday carry.",
    "Sized for practical student and office workflows.",
    "Lightweight form for easy transport.",
  ],
};

const defaultHighlights = [
  "Verified product listing from trusted suppliers.",
  "Jordan-focused support and local delivery options.",
  "Quality-checked for daily reliability.",
];

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  if (!product) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-3xl px-3 py-10 pb-24 text-center sm:px-6 md:pb-10">
          <h1 className="text-2xl font-black text-[#0B1F3B]">Product not found</h1>
          <Link href="/category/all" className="mt-5 inline-block rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white">
            Back to Products
          </Link>
        </main>
      </SiteShell>
    );
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const bundleItems = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const highlights = highlightsBySubcategory[product.subcategory] ?? defaultHighlights;

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-3 py-6 pb-24 sm:px-6 sm:py-8 md:pb-10">
        <nav className="mb-4 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#2563EB]">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${product.category}`} className="hover:text-[#2563EB]">
            {product.category === "electronics" ? "Electronics" : "School Supplies"}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-[#111827]">{product.title}</span>
        </nav>

        <section className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-8 sm:p-6 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F8FAFC]">
            <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            {product.discount && (
              <span className="absolute left-3 top-3 rounded-lg bg-[#F59E0B] px-2.5 py-1 text-xs font-bold text-[#0B1F3B]">
                -{product.discount}%
              </span>
            )}
          </div>

          <div>
            <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#2563EB]">
              Verified Jordan Listing
            </p>
            <h1 className="text-2xl font-black text-[#0B1F3B] sm:text-3xl">{product.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>

            <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-amber-50 px-2 py-1 font-semibold text-amber-700">
                ⭐ {product.rating.toFixed(1)} ({product.reviews})
              </span>
              <span className={product.inStock ? "text-emerald-600" : "text-red-600"}>
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
              <span>{product.fastDelivery ? "Fast local delivery" : "Standard delivery"}</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-3xl font-black text-[#111827]">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
            {product.oldPrice && (
              <p className="mt-1 text-sm font-semibold text-emerald-700">
                You save {formatPrice(savings)} on this item today.
              </p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                onClick={() => addToCart(product.id)}
                className="rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                  isWishlisted(product.id)
                    ? "border-[#F59E0B] bg-amber-50 text-amber-700"
                    : "border-slate-300 text-slate-700"
                }`}
              >
                {isWishlisted(product.id) ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
              <h2 className="text-sm font-black uppercase tracking-wide text-[#0B1F3B]">Product Highlights</h2>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {highlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 sm:grid-cols-3">
              <p>Cash on delivery available in most areas.</p>
              <p>{product.fastDelivery ? "Order before 3 PM for same-day delivery in Amman." : "Standard local delivery across Jordan."}</p>
              <p>7-day return on eligible items.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-black text-[#0B1F3B]">Delivery & Service</h2>
            <p className="mt-2 text-sm text-slate-600">Same-day in Amman for qualifying orders, next-day delivery to major Jordan cities.</p>
            <p className="mt-2 text-sm text-slate-600">Need help? Contact support on +962 6 500 9900.</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-black text-[#0B1F3B]">Quality Promise</h2>
            <p className="mt-2 text-sm text-slate-600">This listing is reviewed by the Now team for realistic specs and pricing.</p>
            <p className="mt-2 text-sm text-slate-600">All marketplace products include post-purchase support.</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-black text-[#0B1F3B]">Checkout Confidence</h2>
            <p className="mt-2 text-sm text-slate-600">Secure checkout flow, card and cash-on-delivery options.</p>
            <p className="mt-2 text-sm text-slate-600">Transparent final pricing before order confirmation.</p>
          </article>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-black text-[#0B1F3B]">Complete Your Setup</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
            {bundleItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-black text-[#0B1F3B]">Related Products</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
