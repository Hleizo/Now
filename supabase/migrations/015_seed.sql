-- =============================================
-- NOW MARKETPLACE - SEED DATA
-- =============================================

-- =============================================
-- 1. ROLES
-- =============================================

INSERT INTO roles (name, display_name, display_name_ar, description, is_system) VALUES
  ('customer', 'Customer', 'عميل', 'Regular customer who can browse and buy', true),
  ('vendor', 'Vendor', 'بائع', 'Store owner who can sell products', true),
  ('admin', 'Admin', 'مسؤول', 'Administrator with management access', true),
  ('super_admin', 'Super Admin', 'مسؤول عام', 'Full system access', true),
  ('delivery', 'Delivery Agent', 'موصل', 'Delivery personnel (future)', true),
  ('support', 'Support Staff', 'دعم فني', 'Customer support (future)', true);

-- =============================================
-- 2. PERMISSIONS
-- =============================================

INSERT INTO permissions (name, resource, action, description) VALUES
  -- Products
  ('products.create', 'products', 'create', 'Create new products'),
  ('products.read', 'products', 'read', 'View products'),
  ('products.update', 'products', 'update', 'Update products'),
  ('products.delete', 'products', 'delete', 'Delete products'),
  ('products.approve', 'products', 'approve', 'Approve/reject products'),
  
  -- Stores
  ('stores.create', 'stores', 'create', 'Create stores'),
  ('stores.read', 'stores', 'read', 'View stores'),
  ('stores.update', 'stores', 'update', 'Update stores'),
  ('stores.delete', 'stores', 'delete', 'Delete stores'),
  ('stores.approve', 'stores', 'approve', 'Approve/reject stores'),
  
  -- Orders
  ('orders.read', 'orders', 'read', 'View orders'),
  ('orders.update', 'orders', 'update', 'Update order status'),
  ('orders.refund', 'orders', 'refund', 'Process refunds'),
  
  -- Categories
  ('categories.manage', 'categories', 'manage', 'Manage categories'),
  
  -- Pricing
  ('pricing.manage', 'pricing', 'manage', 'Manage pricing policies'),
  
  -- Clusters
  ('clusters.manage', 'clusters', 'manage', 'Manage clusters'),
  
  -- CMS
  ('cms.manage', 'cms', 'manage', 'Manage homepage and content'),
  
  -- Settings
  ('settings.manage', 'settings', 'manage', 'Manage app settings'),
  
  -- Users
  ('users.manage', 'users', 'manage', 'Manage users and roles');

-- =============================================
-- 3. ROLE PERMISSIONS MAPPING
-- =============================================

-- Super Admin gets everything
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p
WHERE r.name = 'super_admin';

-- Admin gets most things
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p
WHERE r.name = 'admin' AND p.name NOT IN ('users.manage', 'settings.manage');

-- Vendor permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM roles r, permissions p
WHERE r.name = 'vendor' AND p.name IN (
  'products.create', 'products.read', 'products.update',
  'stores.read', 'stores.update',
  'orders.read'
);

-- =============================================
-- 4. DEFAULT PRICING POLICY
-- =============================================

INSERT INTO pricing_policies (name, name_ar, description, is_default, is_active, priority)
VALUES ('Now Default Policy', 'سياسة ناو الافتراضية', 'Default pricing policy for Now marketplace', true, true, 100);

-- Get the policy ID
DO $$
DECLARE
  policy_id UUID;
BEGIN
  SELECT id INTO policy_id FROM pricing_policies WHERE is_default = true LIMIT 1;
  
  -- Insert pricing rules based on your pricing policy
  INSERT INTO pricing_rules (policy_id, name, name_ar, min_price, max_price, pricing_type, markup_amount, commission_rate, sort_order) VALUES
    -- Tier 1: Under 5 JOD → 0.25 JOD markup
    (policy_id, 'Low Price Items', 'منتجات السعر المنخفض', 0.00, 5.00, 'markup_flat', 0.25, NULL, 1),
    
    -- Tier 2: 5-9.99 JOD → 0.50 JOD markup
    (policy_id, 'Mid Price Items', 'منتجات السعر المتوسط', 5.00, 10.00, 'markup_flat', 0.50, NULL, 2),
    
    -- Tier 3: 10-99.99 JOD → 7% commission
    (policy_id, 'Standard Products', 'منتجات قياسية', 10.00, 100.00, 'commission_percent', NULL, 7.00, 3),
    
    -- Tier 4: 100+ JOD → 3% commission
    (policy_id, 'High Value Electronics', 'إلكترونيات عالية القيمة', 100.00, NULL, 'commission_percent', NULL, 3.00, 4);
END $$;

-- =============================================
-- 5. DEFAULT CATEGORIES
-- =============================================

-- Electronics
INSERT INTO categories (name, name_ar, slug, description, description_ar, level, sort_order, is_active) VALUES
  ('Electronics', 'إلكترونيات', 'electronics', 'Electronic devices and accessories', 'الأجهزة الإلكترونية والملحقات', 0, 1, true);

-- Electronics subcategories
INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Mobile Phones', 'الهواتف المحمولة', 'mobile-phones', 'Smartphones and basic phones', 1, 1, true
FROM categories WHERE slug = 'electronics';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Phone Accessories', 'ملحقات الهواتف', 'phone-accessories', 'Cases, chargers, cables', 1, 2, true
FROM categories WHERE slug = 'electronics';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Tablets', 'أجهزة لوحية', 'tablets', 'Tablets and iPads', 1, 3, true
FROM categories WHERE slug = 'electronics';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Laptops', 'لابتوبات', 'laptops', 'Laptop computers', 1, 4, true
FROM categories WHERE slug = 'electronics';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Computer Accessories', 'ملحقات الكمبيوتر', 'computer-accessories', 'Keyboards, mice, etc.', 1, 5, true
FROM categories WHERE slug = 'electronics';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Audio', 'سماعات وصوتيات', 'audio', 'Headphones, speakers, earbuds', 1, 6, true
FROM categories WHERE slug = 'electronics';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Gaming', 'ألعاب', 'gaming', 'Gaming consoles and accessories', 1, 7, true
FROM categories WHERE slug = 'electronics';

-- School Supplies
INSERT INTO categories (name, name_ar, slug, description, description_ar, level, sort_order, is_active) VALUES
  ('School Supplies', 'مستلزمات مدرسية', 'school-supplies', 'School and office supplies', 'مستلزمات المدرسة والمكتب', 0, 2, true);

-- School subcategories
INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Notebooks & Paper', 'دفاتر وورق', 'notebooks-paper', 'Notebooks, papers, notepads', 1, 1, true
FROM categories WHERE slug = 'school-supplies';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Writing Instruments', 'أدوات الكتابة', 'writing-instruments', 'Pens, pencils, markers', 1, 2, true
FROM categories WHERE slug = 'school-supplies';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Bags & Backpacks', 'حقائب مدرسية', 'bags-backpacks', 'School bags and backpacks', 1, 3, true
FROM categories WHERE slug = 'school-supplies';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Art Supplies', 'أدوات فنية', 'art-supplies', 'Colors, brushes, craft items', 1, 4, true
FROM categories WHERE slug = 'school-supplies';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Calculators', 'آلات حاسبة', 'calculators', 'Scientific and basic calculators', 1, 5, true
FROM categories WHERE slug = 'school-supplies';

INSERT INTO categories (parent_id, name, name_ar, slug, description, level, sort_order, is_active)
SELECT id, 'Books', 'كتب', 'books', 'Educational books and references', 1, 6, true
FROM categories WHERE slug = 'school-supplies';

-- =============================================
-- 6. APP SETTINGS
-- =============================================

INSERT INTO app_settings (key, value, label, label_ar, category, value_type, is_public) VALUES
  -- Branding
  ('brand_name', '"Now"', 'Brand Name', 'اسم العلامة', 'branding', 'string', true),
  ('brand_name_ar', '"ناو"', 'Brand Name (Arabic)', 'اسم العلامة (عربي)', 'branding', 'string', true),
  ('brand_tagline', '"Get it now, from your neighborhood"', 'Tagline', 'الشعار', 'branding', 'string', true),
  ('brand_tagline_ar', '"احصل عليه الآن، من حيّك"', 'Tagline (Arabic)', 'الشعار (عربي)', 'branding', 'string', true),
  ('brand_primary_color', '"#FBBF24"', 'Primary Color', 'اللون الرئيسي', 'branding', 'color', true),
  ('brand_secondary_color', '"#1F2937"', 'Secondary Color', 'اللون الثانوي', 'branding', 'color', true),
  
  -- Contact
  ('support_email', '"support@now.jo"', 'Support Email', 'بريد الدعم', 'contact', 'string', true),
  ('support_phone', '"+962790000000"', 'Support Phone', 'هاتف الدعم', 'contact', 'string', true),
  ('support_whatsapp', '"+962790000000"', 'WhatsApp', 'واتساب', 'contact', 'string', true),
  
  -- Social
  ('social_instagram', '"https://instagram.com/now.jo"', 'Instagram', 'انستغرام', 'social', 'string', true),
  ('social_facebook', '"https://facebook.com/now.jo"', 'Facebook', 'فيسبوك', 'social', 'string', true),
  ('social_twitter', '""', 'Twitter/X', 'تويتر', 'social', 'string', true),
  
  -- General
  ('currency_code', '"JOD"', 'Currency Code', 'رمز العملة', 'general', 'string', true),
  ('currency_symbol', '"JD"', 'Currency Symbol', 'رمز العملة المختصر', 'general', 'string', true),
  ('currency_decimals', '3', 'Currency Decimals', 'خانات العملة', 'general', 'number', true),
  ('default_language', '"ar"', 'Default Language', 'اللغة الافتراضية', 'general', 'string', true),
  ('timezone', '"Asia/Amman"', 'Timezone', 'المنطقة الزمنية', 'general', 'string', false),
  
  -- Order
  ('order_prefix', '"NOW"', 'Order Number Prefix', 'بادئة رقم الطلب', 'general', 'string', false),
  
  -- Maintenance
  ('maintenance_mode', 'false', 'Maintenance Mode', 'وضع الصيانة', 'advanced', 'boolean', true);

-- =============================================
-- 7. FEATURE FLAGS
-- =============================================

INSERT INTO feature_flags (key, is_enabled, label, description) VALUES
  ('enable_guest_checkout', false, 'Guest Checkout', 'Allow checkout without account'),
  ('enable_express_delivery', false, 'Express Delivery', 'Enable express delivery option'),
  ('enable_scheduled_delivery', false, 'Scheduled Delivery', 'Enable scheduled delivery'),
  ('enable_reviews', false, 'Product Reviews', 'Enable customer reviews'),
  ('enable_wishlist', true, 'Wishlist', 'Enable wishlist feature'),
  ('enable_coupons', false, 'Coupons', 'Enable coupon/promo codes'),
  ('enable_wallet', false, 'Wallet', 'Enable customer wallet'),
  ('enable_push_notifications', false, 'Push Notifications', 'Enable push notifications'),
  ('show_stock_count', false, 'Show Stock Count', 'Show remaining stock to customers'),
  ('enable_store_ratings', false, 'Store Ratings', 'Enable store ratings'),
  ('enable_multi_store_cart', false, 'Multi-Store Cart', 'Allow cart from multiple stores');

-- =============================================
-- 8. DELIVERY MESSAGES
-- =============================================

INSERT INTO delivery_messages (key, message, message_ar, location, is_active) VALUES
  ('free_delivery_threshold', 'Free delivery on orders over 15 JD!', 'توصيل مجاني للطلبات فوق 15 دينار!', 'cart', true),
  ('express_available', 'Express delivery available - get it in 45 mins!', 'التوصيل السريع متوفر - احصل عليه خلال 45 دقيقة!', 'checkout', true),
  ('same_day_cutoff', 'Order before 6 PM for same-day delivery', 'اطلب قبل 6 مساءً للتوصيل في نفس اليوم', 'product', true),
  ('delivery_promise', 'Usually delivered within 60-90 minutes', 'عادة يتم التوصيل خلال 60-90 دقيقة', 'product', true);

-- =============================================
-- 9. TRUST BADGES
-- =============================================

INSERT INTO trust_badges (title, title_ar, description, description_ar, icon_name, sort_order, is_active) VALUES
  ('Fast Delivery', 'توصيل سريع', 'Get your order within 60-90 minutes', 'احصل على طلبك خلال 60-90 دقيقة', 'truck', 1, true),
  ('Secure Payment', 'دفع آمن', 'Cash on delivery available', 'الدفع عند الاستلام متوفر', 'shield-check', 2, true),
  ('Local Stores', 'متاجر محلية', 'Support local businesses in your area', 'ادعم المتاجر المحلية في منطقتك', 'store', 3, true),
  ('Easy Returns', 'إرجاع سهل', 'Hassle-free return policy', 'سياسة إرجاع سهلة', 'refresh', 4, true);

-- =============================================
-- 10. STATIC PAGES
-- =============================================

INSERT INTO pages (slug, title, title_ar, content, content_ar, is_published) VALUES
  ('about', 'About Us', 'من نحن', 
   '<h1>About Now</h1><p>Now is a hyperlocal marketplace connecting you with local stores in your neighborhood.</p>',
   '<h1>عن ناو</h1><p>ناو هو سوق محلي يربطك بالمتاجر المحلية في حيّك.</p>',
   true),
  ('contact', 'Contact Us', 'اتصل بنا',
   '<h1>Contact Us</h1><p>Have questions? We''re here to help!</p>',
   '<h1>اتصل بنا</h1><p>لديك أسئلة؟ نحن هنا للمساعدة!</p>',
   true),
  ('delivery-info', 'Delivery Information', 'معلومات التوصيل',
   '<h1>Delivery Information</h1><p>We deliver within 60-90 minutes to your doorstep.</p>',
   '<h1>معلومات التوصيل</h1><p>نوصل خلال 60-90 دقيقة إلى باب منزلك.</p>',
   true),
  ('terms', 'Terms of Service', 'شروط الخدمة',
   '<h1>Terms of Service</h1><p>Please read these terms carefully before using our service.</p>',
   '<h1>شروط الخدمة</h1><p>يرجى قراءة هذه الشروط بعناية قبل استخدام خدمتنا.</p>',
   true),
  ('privacy', 'Privacy Policy', 'سياسة الخصوصية',
   '<h1>Privacy Policy</h1><p>Your privacy is important to us.</p>',
   '<h1>سياسة الخصوصية</h1><p>خصوصيتك مهمة بالنسبة لنا.</p>',
   true),
  ('returns', 'Return Policy', 'سياسة الإرجاع',
   '<h1>Return Policy</h1><p>We want you to be satisfied with your purchase.</p>',
   '<h1>سياسة الإرجاع</h1><p>نريدك أن تكون راضياً عن مشترياتك.</p>',
   true);

-- =============================================
-- 11. CONTENT BLOCKS
-- =============================================

INSERT INTO content_blocks (key, title, content, content_ar, block_type, context) VALUES
  ('footer_about', 'Footer About', 
   'Now is your neighborhood marketplace. Shop electronics and school supplies from local stores, delivered fast.',
   'ناو هو سوقك المحلي. تسوق الإلكترونيات ومستلزمات المدرسة من المتاجر المحلية، مع توصيل سريع.',
   'text', 'footer'),
  ('checkout_note', 'Checkout Note',
   'Cash on delivery available. We''ll call you to confirm your order.',
   'الدفع عند الاستلام متوفر. سنتصل بك لتأكيد طلبك.',
   'text', 'checkout'),
  ('empty_cart', 'Empty Cart Message',
   'Your cart is empty. Start shopping now!',
   'سلة التسوق فارغة. ابدأ التسوق الآن!',
   'text', 'cart');

-- =============================================
-- 12. NOTIFICATION TEMPLATES
-- =============================================

INSERT INTO notification_templates (key, title_template, title_template_ar, body_template, body_template_ar, send_push, send_email) VALUES
  ('order_confirmed', 
   'Order Confirmed', 'تم تأكيد الطلب',
   'Your order #{{order_number}} has been confirmed. We''re preparing it now!',
   'تم تأكيد طلبك رقم {{order_number}}. نحن نجهزه الآن!',
   true, true),
  ('order_out_for_delivery',
   'Order On The Way', 'الطلب في الطريق',
   'Your order #{{order_number}} is out for delivery!',
   'طلبك رقم {{order_number}} في الطريق إليك!',
   true, false),
  ('order_delivered',
   'Order Delivered', 'تم التوصيل',
   'Your order #{{order_number}} has been delivered. Enjoy!',
   'تم توصيل طلبك رقم {{order_number}}. استمتع!',
   true, true),
  ('order_cancelled',
   'Order Cancelled', 'تم إلغاء الطلب',
   'Your order #{{order_number}} has been cancelled.',
   'تم إلغاء طلبك رقم {{order_number}}.',
   true, true),
  ('store_approved',
   'Store Approved!', 'تمت الموافقة على متجرك!',
   'Congratulations! Your store {{store_name}} has been approved. You can now start selling.',
   'مبروك! تمت الموافقة على متجرك {{store_name}}. يمكنك البدء بالبيع الآن.',
   true, true),
  ('product_approved',
   'Product Approved', 'تمت الموافقة على المنتج',
   'Your product {{product_name}} has been approved and is now live.',
   'تمت الموافقة على منتجك {{product_name}} وهو متاح الآن.',
   true, false),
  ('low_stock_alert',
   'Low Stock Alert', 'تنبيه انخفاض المخزون',
   '{{product_name}} is running low on stock ({{stock_count}} remaining).',
   '{{product_name}} على وشك النفاذ (متبقي {{stock_count}}).',
   true, true);

-- Done! Seed data inserted successfully.
