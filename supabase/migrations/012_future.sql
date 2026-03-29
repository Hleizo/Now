-- =============================================
-- NOW MARKETPLACE - FUTURE-READY TABLES
-- =============================================

-- Coupons / Promo codes
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Code
  code TEXT UNIQUE NOT NULL,
  
  -- Info
  name TEXT,
  description TEXT,
  
  -- Discount type
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10, 2) NOT NULL,
  max_discount DECIMAL(10, 2), -- Cap for percentage discounts
  
  -- Conditions
  min_order_amount DECIMAL(10, 2),
  max_uses INTEGER, -- Total uses allowed
  max_uses_per_user INTEGER DEFAULT 1,
  
  -- Scope
  applies_to TEXT DEFAULT 'all' CHECK (applies_to IN ('all', 'categories', 'products', 'stores')),
  applicable_ids UUID[], -- Category/Product/Store IDs if scoped
  
  -- Targeting
  cluster_ids UUID[], -- NULL = all clusters
  new_users_only BOOLEAN DEFAULT false,
  
  -- Validity
  is_active BOOLEAN DEFAULT false,
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  
  -- Stats
  times_used INTEGER DEFAULT 0,
  total_discount_given DECIMAL(10, 2) DEFAULT 0,
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Coupon usage tracking
CREATE TABLE coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  coupon_id UUID NOT NULL REFERENCES coupons(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  order_id UUID REFERENCES orders(id),
  
  discount_applied DECIMAL(10, 2),
  
  used_at TIMESTAMPTZ DEFAULT NOW()
);

-- Delivery agents (for future)
CREATE TABLE delivery_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES profiles(id),
  cluster_id UUID NOT NULL REFERENCES clusters(id),
  
  -- Info
  full_name TEXT,
  phone TEXT,
  
  -- Vehicle
  vehicle_type TEXT CHECK (vehicle_type IN ('walking', 'bike', 'motorcycle', 'car')),
  vehicle_number TEXT,
  
  -- Status
  is_active BOOLEAN DEFAULT false,
  is_online BOOLEAN DEFAULT false,
  is_busy BOOLEAN DEFAULT false,
  
  -- Location (for tracking)
  current_lat DECIMAL(10, 8),
  current_lng DECIMAL(11, 8),
  last_location_at TIMESTAMPTZ,
  
  -- Stats
  total_deliveries INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2),
  total_reviews INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id),
  order_id UUID REFERENCES orders(id),
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  
  -- Pros/Cons (optional)
  pros TEXT[],
  cons TEXT[],
  
  -- Media
  image_urls TEXT[],
  
  -- Moderation
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_verified_purchase BOOLEAN DEFAULT false,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,
  
  -- Seller response
  seller_response TEXT,
  seller_responded_at TIMESTAMPTZ,
  
  -- Helpfulness
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One review per user per product (can be updated after each order)
  UNIQUE(product_id, user_id)
);

-- Review helpfulness votes
CREATE TABLE review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  is_helpful BOOLEAN NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(review_id, user_id)
);

-- Abandoned carts tracking
CREATE TABLE abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  cart_id UUID REFERENCES carts(id),
  user_id UUID REFERENCES profiles(id),
  email TEXT,
  
  -- Cart snapshot
  cart_data JSONB NOT NULL,
  subtotal DECIMAL(10, 2),
  item_count INTEGER,
  
  -- Recovery attempts
  recovery_emails_sent INTEGER DEFAULT 0,
  last_email_sent_at TIMESTAMPTZ,
  
  -- Status
  is_recovered BOOLEAN DEFAULT false,
  recovered_at TIMESTAMPTZ,
  recovered_order_id UUID REFERENCES orders(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_active ON coupons(is_active, starts_at, expires_at);
CREATE INDEX idx_coupon_usage_coupon ON coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_user ON coupon_usage(user_id);

CREATE INDEX idx_delivery_agents_user ON delivery_agents(user_id);
CREATE INDEX idx_delivery_agents_cluster ON delivery_agents(cluster_id);
CREATE INDEX idx_delivery_agents_online ON delivery_agents(is_online, is_busy);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_review_votes_review ON review_votes(review_id);

CREATE INDEX idx_abandoned_carts_user ON abandoned_carts(user_id);
CREATE INDEX idx_abandoned_carts_recovered ON abandoned_carts(is_recovered);
