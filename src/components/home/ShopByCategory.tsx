import React from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@/components/icons/Icons";

interface ShopCategory {
  id: string;
  name: string;
  tagline: string;
  image: string;
  href: string;
  color: string;
}

const shopCategories: ShopCategory[] = [
  {
    id: "1",
    name: "Electronics",
    tagline: "Latest Gadgets",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
    href: "/electronics",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "2",
    name: "Stationery",
    tagline: "Office Essentials",
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&q=80",
    href: "/stationery",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "3",
    name: "Accessories",
    tagline: "Complete Your Look",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
    href: "/accessories",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "4",
    name: "Home & Living",
    tagline: "Cozy Comfort",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    href: "/home",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    id: "5",
    name: "Fashion",
    tagline: "Trending Styles",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    href: "/fashion",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "6",
    name: "Sports & Fitness",
    tagline: "Stay Active",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    href: "/sports",
    color: "from-slate-700 to-slate-900",
  },
];

export function ShopByCategory() {
  return (
    <section className="py-6 sm:py-8 bg-slate-50" aria-label="Shop by category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Shop by Category</h2>
          <a
            href="/categories"
            className="flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors group"
          >
            View All
            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {shopCategories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="group relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-base sm:text-lg">{category.name}</h3>
                <p className="text-white/80 text-xs sm:text-sm">{category.tagline}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
