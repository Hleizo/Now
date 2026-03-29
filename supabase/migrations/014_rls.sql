-- =============================================
-- NOW MARKETPLACE - ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE cluster_delivery_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_operating_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_payout_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PROFILES POLICIES
-- =============================================

-- Users can view their own profile
CREATE POLICY "Users view own profile" ON profiles
  FOR SELECT USING (id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users update own profile" ON profiles
  FOR UPDATE USING (id = auth.uid());

-- Admin can view all profiles
CREATE POLICY "Admin view all profiles" ON profiles
  FOR SELECT USING (has_any_role(ARRAY['admin', 'super_admin']));

-- Admin can update all profiles
CREATE POLICY "Admin update all profiles" ON profiles
  FOR UPDATE USING (has_any_role(ARRAY['admin', 'super_admin']));

-- =============================================
-- USER ADDRESSES POLICIES
-- =============================================

CREATE POLICY "Users manage own addresses" ON user_addresses
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admin view all addresses" ON user_addresses
  FOR SELECT USING (has_any_role(ARRAY['admin', 'super_admin']));

-- =============================================
-- CLUSTERS POLICIES
-- =============================================

-- Everyone can view active clusters
CREATE POLICY "Public view active clusters" ON clusters
  FOR SELECT USING (is_active = true AND is_visible = true);

-- Admin can manage clusters
CREATE POLICY "Admin manage clusters" ON clusters
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

CREATE POLICY "Public view cluster config" ON cluster_delivery_config
  FOR SELECT USING (
    cluster_id IN (SELECT id FROM clusters WHERE is_active = true)
  );

CREATE POLICY "Admin manage cluster config" ON cluster_delivery_config
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

-- =============================================
-- STORES POLICIES
-- =============================================

-- Public can view approved active stores
CREATE POLICY "Public view approved stores" ON stores
  FOR SELECT USING (status = 'approved' AND is_active = true);

-- Vendors can view their own store
CREATE POLICY "Vendors view own store" ON stores
  FOR SELECT USING (owner_id = auth.uid());

-- Vendors can update their own store
CREATE POLICY "Vendors update own store" ON stores
  FOR UPDATE USING (owner_id = auth.uid());

-- Vendors can insert store (apply)
CREATE POLICY "Vendors create store" ON stores
  FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Admin can manage all stores
CREATE POLICY "Admin manage stores" ON stores
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

-- Store operating hours
CREATE POLICY "Public view store hours" ON store_operating_hours
  FOR SELECT USING (
    store_id IN (SELECT id FROM stores WHERE status = 'approved' AND is_active = true)
  );

CREATE POLICY "Vendors manage own hours" ON store_operating_hours
  FOR ALL USING (
    store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid())
  );

-- Store documents - vendors only
CREATE POLICY "Vendors manage own documents" ON store_documents
  FOR ALL USING (
    store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid())
  );

CREATE POLICY "Admin view store documents" ON store_documents
  FOR SELECT USING (has_any_role(ARRAY['admin', 'super_admin']));

-- Store payout - vendors only
CREATE POLICY "Vendors manage payout config" ON store_payout_config
  FOR ALL USING (
    store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid())
  );

CREATE POLICY "Admin view payout config" ON store_payout_config
  FOR SELECT USING (has_any_role(ARRAY['admin', 'super_admin']));

-- =============================================
-- CATEGORIES & BRANDS POLICIES
-- =============================================

-- Public can view active categories
CREATE POLICY "Public view active categories" ON categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin manage categories" ON categories
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

CREATE POLICY "Public view active brands" ON brands
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin manage brands" ON brands
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

-- =============================================
-- PRODUCTS POLICIES
-- =============================================

-- Public can view approved active products
CREATE POLICY "Public view approved products" ON products
  FOR SELECT USING (
    status = 'approved' 
    AND is_active = true
    AND deleted_at IS NULL
    AND store_id IN (
      SELECT id FROM stores WHERE status = 'approved' AND is_active = true
    )
  );

-- Vendors can view their own products
CREATE POLICY "Vendors view own products" ON products
  FOR SELECT USING (
    store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid())
  );

-- Vendors can insert products
CREATE POLICY "Vendors create products" ON products
  FOR INSERT WITH CHECK (
    store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid())
  );

-- Vendors can update their own products
CREATE POLICY "Vendors update own products" ON products
  FOR UPDATE USING (
    store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid())
  );

-- Admin can manage all products
CREATE POLICY "Admin manage products" ON products
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

-- Product images follow product permissions
CREATE POLICY "Public view product images" ON product_images
  FOR SELECT USING (
    product_id IN (
      SELECT id FROM products 
      WHERE status = 'approved' AND is_active = true AND deleted_at IS NULL
    )
  );

CREATE POLICY "Vendors manage own product images" ON product_images
  FOR ALL USING (
    product_id IN (
      SELECT p.id FROM products p
      JOIN stores s ON p.store_id = s.id
      WHERE s.owner_id = auth.uid()
    )
  );

-- =============================================
-- CART & WISHLIST POLICIES
-- =============================================

-- Users can manage their own cart
CREATE POLICY "Users manage own cart" ON carts
  FOR ALL USING (user_id = auth.uid() OR session_id IS NOT NULL);

CREATE POLICY "Users manage own cart items" ON cart_items
  FOR ALL USING (
    cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid())
  );

-- Guest carts by session
CREATE POLICY "Guest carts by session" ON cart_items
  FOR ALL USING (
    cart_id IN (SELECT id FROM carts WHERE session_id IS NOT NULL)
  );

CREATE POLICY "Users manage own wishlist" ON wishlists
  FOR ALL USING (user_id = auth.uid());

-- =============================================
-- ORDERS POLICIES
-- =============================================

-- Customers can view their own orders
CREATE POLICY "Customers view own orders" ON orders
  FOR SELECT USING (user_id = auth.uid());

-- Customers can create orders
CREATE POLICY "Customers create orders" ON orders
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Vendors can view orders containing their products
CREATE POLICY "Vendors view related orders" ON orders
  FOR SELECT USING (
    id IN (
      SELECT DISTINCT order_id FROM order_items
      WHERE store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid())
    )
  );

-- Admin can manage all orders
CREATE POLICY "Admin manage orders" ON orders
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

-- Order items follow order permissions
CREATE POLICY "Customers view own order items" ON order_items
  FOR SELECT USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  );

CREATE POLICY "Vendors view own order items" ON order_items
  FOR SELECT USING (
    store_id IN (SELECT id FROM stores WHERE owner_id = auth.uid())
  );

CREATE POLICY "Admin manage order items" ON order_items
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

-- =============================================
-- CMS POLICIES
-- =============================================

-- Public can view active sections
CREATE POLICY "Public view active sections" ON homepage_sections
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin manage sections" ON homepage_sections
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

CREATE POLICY "Public view active banners" ON homepage_banners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin manage banners" ON homepage_banners
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

CREATE POLICY "Public view published pages" ON pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admin manage pages" ON pages
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

-- =============================================
-- SETTINGS POLICIES
-- =============================================

-- Public can view public settings
CREATE POLICY "Public view public settings" ON app_settings
  FOR SELECT USING (is_public = true);

-- Admin can manage all settings
CREATE POLICY "Admin manage settings" ON app_settings
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));

-- =============================================
-- NOTIFICATIONS POLICIES
-- =============================================

CREATE POLICY "Users view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- =============================================
-- REVIEWS POLICIES
-- =============================================

-- Public can view approved reviews
CREATE POLICY "Public view approved reviews" ON reviews
  FOR SELECT USING (is_approved = true);

-- Users can create reviews for products they ordered
CREATE POLICY "Users create reviews" ON reviews
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
    AND order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  );

-- Users can update their own reviews
CREATE POLICY "Users update own reviews" ON reviews
  FOR UPDATE USING (user_id = auth.uid());

-- Vendors can respond to reviews on their products
CREATE POLICY "Vendors respond to reviews" ON reviews
  FOR UPDATE USING (
    product_id IN (
      SELECT p.id FROM products p
      JOIN stores s ON p.store_id = s.id
      WHERE s.owner_id = auth.uid()
    )
  );

CREATE POLICY "Admin manage reviews" ON reviews
  FOR ALL USING (has_any_role(ARRAY['admin', 'super_admin']));
