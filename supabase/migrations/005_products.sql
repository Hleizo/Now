-- =============================================
-- NOW MARKETPLACE - PRODUCTS & CATEGORIES
-- =============================================

-- Categories (hierarchical)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Hierarchy
  parent_id UUID REFERENCES categories(id),
  
  -- Basic info
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,
  
  -- Media
  image_url TEXT,
  icon_url TEXT,
  
  -- Display settings
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  show_on_homepage BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  
  -- Hierarchy helpers
  level INTEGER DEFAULT 0, -- 0=root, 1=child, 2=grandchild
  path TEXT, -- Materialized path: /electronics/phones/
  
  -- SEO
  meta_title TEXT,
  meta_title_ar TEXT,
  meta_description TEXT,
  meta_description_ar TEXT,
  
  -- Stats
  product_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brands
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name TEXT UNIQUE NOT NULL,
  name_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  
  logo_url TEXT,
  description TEXT,
  
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Main products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  store_id UUID NOT NULL REFERENCES stores(id),
  category_id UUID NOT NULL REFERENCES categories(id),
  brand_id UUID REFERENCES brands(id),
  
  -- Basic info
  name TEXT NOT NULL,
  name_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,
  short_description TEXT,
  short_description_ar TEXT,
  
  -- Identifiers
  sku TEXT,
  barcode TEXT,
  
  -- ========== PRICING ==========
  -- Seller's price (what they charge us)
  seller_price DECIMAL(10, 2) NOT NULL,
  
  -- Seller's cost (optional, for seller reference)
  cost_price DECIMAL(10, 2),
  
  -- Final customer price (calculated by system)
  sale_price DECIMAL(10, 2) NOT NULL,
  
  -- Breakdown of our fee
  markup_amount DECIMAL(10, 2) DEFAULT 0,
  commission_amount DECIMAL(10, 2) DEFAULT 0,
  
  -- How was this price calculated?
  pricing_mode pricing_mode DEFAULT 'auto',
  pricing_rule_id UUID, -- Which rule was applied
  
  -- Lock price from auto-calculation
  price_locked BOOLEAN DEFAULT false,
  
  -- Compare at price (for "was X now Y" display)
  compare_at_price DECIMAL(10, 2),
  
  -- ========== INVENTORY ==========
  stock_quantity INTEGER DEFAULT 0,
  stock_status stock_status DEFAULT 'in_stock',
  low_stock_threshold INTEGER DEFAULT 5,
  track_inventory BOOLEAN DEFAULT true,
  allow_backorder BOOLEAN DEFAULT false,
  
  -- ========== STATUS ==========
  status product_status DEFAULT 'draft',
  is_active BOOLEAN DEFAULT false,
  
  -- ========== FEATURING ==========
  is_featured BOOLEAN DEFAULT false,
  is_deal BOOLEAN DEFAULT false,
  deal_badge_text TEXT, -- "20% OFF", "Hot Deal"
  deal_badge_text_ar TEXT,
  
  -- ========== DELIVERY ==========
  is_deliverable BOOLEAN DEFAULT true,
  delivery_estimate_days INTEGER,
  weight_kg DECIMAL(8, 3),
  
  -- ========== DISPLAY ==========
  sort_order INTEGER DEFAULT 0,
  ranking_score INTEGER DEFAULT 0,
  
  -- ========== APPROVAL ==========
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,
  
  -- ========== SCHEDULING ==========
  publish_at TIMESTAMPTZ,
  unpublish_at TIMESTAMPTZ,
  
  -- ========== SEO ==========
  meta_title TEXT,
  meta_title_ar TEXT,
  meta_description TEXT,
  meta_description_ar TEXT,
  search_keywords TEXT[],
  
  -- ========== SPECIFICATIONS ==========
  specifications JSONB DEFAULT '{}',
  
  -- ========== INTERNAL ==========
  internal_notes TEXT,
  admin_notes TEXT,
  
  -- ========== STATS ==========
  view_count INTEGER DEFAULT 0,
  order_count INTEGER DEFAULT 0,
  
  -- ========== TIMESTAMPS ==========
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ -- Soft delete
);

-- Product images gallery
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT,
  alt_text_ar TEXT,
  
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product specifications (key-value pairs)
CREATE TABLE product_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  
  spec_key TEXT NOT NULL,
  spec_key_ar TEXT,
  spec_value TEXT NOT NULL,
  spec_value_ar TEXT,
  
  sort_order INTEGER DEFAULT 0
);

-- Product tags for search
CREATE TABLE product_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  tag_ar TEXT,
  
  UNIQUE(product_id, tag)
);

-- Product price history (audit trail)
CREATE TABLE product_price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  
  -- Price snapshot
  seller_price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2) NOT NULL,
  markup_amount DECIMAL(10, 2),
  commission_amount DECIMAL(10, 2),
  
  -- How it was calculated
  pricing_mode pricing_mode,
  pricing_rule_id UUID,
  
  -- Who changed it
  changed_by UUID REFERENCES profiles(id),
  change_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_homepage ON categories(show_on_homepage) WHERE show_on_homepage = true;

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_active ON brands(is_active);

CREATE INDEX idx_products_store ON products(store_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status, is_active);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_deal ON products(is_deal) WHERE is_deal = true;
CREATE INDEX idx_products_stock ON products(stock_status);
CREATE INDEX idx_products_price ON products(sale_price);
CREATE INDEX idx_products_search ON products USING GIN(search_keywords);
CREATE INDEX idx_products_not_deleted ON products(id) WHERE deleted_at IS NULL;

CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_specs_product ON product_specifications(product_id);
CREATE INDEX idx_product_tags_product ON product_tags(product_id);
CREATE INDEX idx_product_tags_tag ON product_tags(tag);
CREATE INDEX idx_price_history_product ON product_price_history(product_id);
