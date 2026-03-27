import { Header, MobileNav, Footer } from "@/components/layout";
import {
  HeroBanner,
  CategoryBar,
  FlashDeals,
  ProductGrid,
  PromoSection,
} from "@/components/home";
import {
  banners,
  categories,
  flashDeals,
  products,
  promoCards,
  moreProducts,
} from "@/data/mockData";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        {/* Hero Banner Carousel */}
        <section className="pt-4">
          <HeroBanner banners={banners} />
        </section>

        {/* Category Shortcuts - Horizontal Scroll */}
        <CategoryBar categories={categories} />

        {/* Flash Deals with Countdown */}
        <FlashDeals deals={flashDeals} />

        {/* Featured Products Grid */}
        <ProductGrid
          products={products}
          title="Featured Products"
          viewAllHref="/products"
        />

        {/* Mid-page Promotional Banners */}
        <PromoSection promos={promoCards} />

        {/* More Products */}
        <ProductGrid
          products={moreProducts}
          title="Recommended for You"
          viewAllHref="/recommended"
        />

        {/* Trust Badges Section */}
        <section className="py-6 px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-3xl mb-2">🚚</span>
              <h3 className="font-semibold text-sm text-slate-900">Free Delivery</h3>
              <p className="text-xs text-slate-500 mt-1">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-3xl mb-2">↩️</span>
              <h3 className="font-semibold text-sm text-slate-900">Easy Returns</h3>
              <p className="text-xs text-slate-500 mt-1">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-3xl mb-2">🔒</span>
              <h3 className="font-semibold text-sm text-slate-900">Secure Payment</h3>
              <p className="text-xs text-slate-500 mt-1">100% secure checkout</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-3xl mb-2">💬</span>
              <h3 className="font-semibold text-sm text-slate-900">24/7 Support</h3>
              <p className="text-xs text-slate-500 mt-1">Here to help always</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
