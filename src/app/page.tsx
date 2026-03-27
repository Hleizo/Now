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

// Featured products for horizontal carousel
const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);

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

        {/* Best Deals Section - Prime position for conversions */}
        <ProductGrid
          products={dealProducts}
          title="Best Deals"
          subtitle="Limited time offers - grab them before they're gone!"
          viewAllHref="/deals"
          variant="deal"
          columns="scrollable"
        />

        {/* Popular Products Grid */}
        <div className="bg-white">
          <ProductGrid
            products={products}
            title="Popular Products"
            subtitle="Top picks loved by shoppers in Jordan"
            viewAllHref="/products"
          />
        </div>

        {/* Shop by Category Grid */}
        <ShopByCategory />

        {/* Featured Products Carousel */}
        <div className="bg-white">
          <ProductGrid
            products={featuredProducts}
            title="Top Rated"
            subtitle="Highest rated products this month"
            viewAllHref="/top-rated"
            columns="scrollable"
          />
        </div>

        {/* More Products / Recommended */}
        <div className="bg-gradient-to-b from-white to-slate-50">
          <ProductGrid
            products={moreProducts}
            title="Recommended for You"
            subtitle="Based on what's trending now"
            viewAllHref="/recommended"
          />
        </div>

        {/* Trust Badges Section */}
        <section className="py-6 sm:py-8 px-3 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="flex flex-col items-center text-center p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 shadow-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-action-500 rounded-2xl flex items-center justify-center mb-3 shadow-md">
                  <span className="text-2xl sm:text-3xl">🚚</span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-navy-500">Free Delivery</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">On orders over 20 JD</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 sm:p-5 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 shadow-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-3 shadow-md">
                  <span className="text-2xl sm:text-3xl">↩️</span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-navy-500">Easy Returns</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">30-day return policy</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 shadow-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-500 rounded-2xl flex items-center justify-center mb-3 shadow-md">
                  <span className="text-2xl sm:text-3xl">🔒</span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-navy-500">Secure Payment</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">100% secure checkout</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 shadow-sm">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500 rounded-2xl flex items-center justify-center mb-3 shadow-md">
                  <span className="text-2xl sm:text-3xl">💬</span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-navy-500">24/7 Support</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Here to help always</p>
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
