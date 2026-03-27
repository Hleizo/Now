import { Header, MobileNav, Footer } from "@/components/layout";
import {
  HeroBanner,
  CategoriesNav,
  QuickCategories,
  ProductGrid,
  ShopByCategory,
} from "@/components/home";
import {
  banners,
  products,
  moreProducts,
} from "@/data/mockData";

// Create deal products with stronger sale emphasis
const dealProducts = products.filter(p => p.discount).map(p => ({
  ...p,
  badge: "sale" as const,
}));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Sticky Header */}
      <Header />

      {/* Categories Navigation Bar */}
      <CategoriesNav />

      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        {/* Hero Banner Carousel with Side Banners */}
        <HeroBanner banners={banners} />

        {/* Circular Category Shortcuts */}
        <QuickCategories />

        {/* Popular Products */}
        <div className="bg-white">
          <ProductGrid
            products={products}
            title="Popular Products"
            viewAllHref="/products"
          />
        </div>

        {/* Best Deals Section - Amber accent background */}
        <div className="bg-gradient-to-r from-deal-50 to-amber-50 border-y border-deal-200">
          <ProductGrid
            products={dealProducts}
            title="Best Deals"
            viewAllHref="/deals"
            variant="deal"
          />
        </div>

        {/* Shop by Category Grid */}
        <ShopByCategory />

        {/* More Products / Recommended */}
        <div className="bg-white">
          <ProductGrid
            products={moreProducts}
            title="Recommended for You"
            viewAllHref="/recommended"
            columns="scrollable"
          />
        </div>

        {/* Trust Badges Section */}
        <section className="py-8 px-4 sm:px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center text-center p-5 bg-card rounded-2xl shadow-card border border-border">
                <span className="text-4xl mb-3">🚚</span>
                <h3 className="font-bold text-sm text-navy-500">Free Delivery</h3>
                <p className="text-xs text-text-secondary mt-1">On orders over 20 JOD</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-card rounded-2xl shadow-card border border-border">
                <span className="text-4xl mb-3">↩️</span>
                <h3 className="font-bold text-sm text-navy-500">Easy Returns</h3>
                <p className="text-xs text-text-secondary mt-1">30-day return policy</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-card rounded-2xl shadow-card border border-border">
                <span className="text-4xl mb-3">🔒</span>
                <h3 className="font-bold text-sm text-navy-500">Secure Payment</h3>
                <p className="text-xs text-text-secondary mt-1">100% secure checkout</p>
              </div>
              <div className="flex flex-col items-center text-center p-5 bg-card rounded-2xl shadow-card border border-border">
                <span className="text-4xl mb-3">💬</span>
                <h3 className="font-bold text-sm text-navy-500">24/7 Support</h3>
                <p className="text-xs text-text-secondary mt-1">Here to help always</p>
              </div>
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
