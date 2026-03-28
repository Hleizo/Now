import { ProductCard } from "@/components/site/ProductCard";
import { SiteShell } from "@/components/site/SiteShell";
import { products } from "@/data/storeData";

export default function ProductsPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-3 py-6 pb-24 sm:px-6 sm:py-8 md:pb-10">
        <h1 className="text-2xl font-black text-[#0B1F3B] sm:text-3xl">All Products</h1>
        <p className="mt-2 text-sm text-slate-600">
          Curated catalog for electronics, phone and laptop accessories, and school supplies.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
