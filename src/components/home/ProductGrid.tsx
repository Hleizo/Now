import React from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ui";

interface ProductGridProps {
  products: Product[];
  title: string;
  viewAllHref?: string;
}

export function ProductGrid({ products, title, viewAllHref }: ProductGridProps) {
  return (
    <section className="py-4 sm:py-6" aria-label={title}>
      {/* Header */}
      <div className="px-4 sm:px-6 mb-4 flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
          >
            See All →
          </a>
        )}
      </div>

      {/* Grid */}
      <div className="px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
