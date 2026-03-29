-- =============================================
-- NOW MARKETPLACE - HOMEPAGE CMS
-- =============================================

-- Homepage sections container
CREATE TABLE homepage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Section type
  section_type section_type NOT NULL,
  
  -- Header
  title TEXT,
  title_ar TEXT,
  subtitle TEXT,
  subtitle_ar TEXT,
  
  -- Display
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  -- Scheduling
  publish_at TIMESTAMPTZ,
  unpublish_at TIMESTAMPTZ,
  
  -- Cluster targeting (NULL = all clusters)
  cluster_ids UUID[],
  
  -- Flexible configuration (layout, colors, etc.)
  config JSONB DEFAULT '{}',
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Homepage banners (hero, promo, etc.)
CREATE TABLE homepage_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Link to section (optional - can be standalone)
  section_id UUID REFERENCES homepage_sections(id) ON DELETE CASCADE,
  
  -- Content
  title TEXT,
  title_ar TEXT,
  subtitle TEXT,
  subtitle_ar TEXT,
  
  -- Media
  image_url TEXT NOT NULL,
  image_url_mobile TEXT,
  alt_text TEXT,
  alt_text_ar TEXT,
  
  -- Call to action
  cta_text TEXT,
  cta_text_ar TEXT,
  cta_link TEXT,
  
  -- Styling
  text_color TEXT DEFAULT '#FFFFFF',
  text_position TEXT DEFAULT 'center', -- left, center, right
  overlay_color TEXT DEFAULT '#000000',
  overlay_opacity DECIMAL(3, 2) DEFAULT 0.30,
  
  -- Display
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  -- Scheduling
  publish_at TIMESTAMPTZ,
  unpublish_at TIMESTAMPTZ,
  
  -- Targeting
  cluster_ids UUID[],
  
  -- Analytics
  click_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homepage product collections
CREATE TABLE homepage_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Link to section (optional)
  section_id UUID REFERENCES homepage_sections(id) ON DELETE CASCADE,
  
  -- Basic info
  name TEXT NOT NULL,
  name_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  
  -- Collection type
  collection_type TEXT DEFAULT 'manual' CHECK (collection_type IN (
    'manual',      -- Specific product IDs
    'category',    -- All from category
    'bestsellers', -- Top selling
    'new_arrivals', -- Recently added
    'deals',       -- Products with is_deal=true
    'featured'     -- Products with is_featured=true
  )),
  
  -- For manual collections: specific products
  product_ids UUID[],
  
  -- For automatic collections: filters
  category_id UUID REFERENCES categories(id),
  brand_id UUID REFERENCES brands(id),
  max_products INTEGER DEFAULT 12,
  
  -- Display
  is_active BOOLEAN DEFAULT true,
  show_view_all BOOLEAN DEFAULT true,
  view_all_link TEXT,
  
  -- Layout
  layout TEXT DEFAULT 'grid' CHECK (layout IN ('grid', 'carousel', 'list')),
  columns INTEGER DEFAULT 4,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quick category buttons
CREATE TABLE homepage_quick_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Link to actual category (optional)
  category_id UUID REFERENCES categories(id),
  
  -- Display
  label TEXT NOT NULL,
  label_ar TEXT,
  icon_url TEXT,
  image_url TEXT,
  link TEXT,
  
  -- Style
  bg_color TEXT,
  text_color TEXT,
  
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  -- Targeting
  cluster_ids UUID[],
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcement bar (top of page)
CREATE TABLE announcement_bars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Content
  message TEXT NOT NULL,
  message_ar TEXT,
  
  -- Link (optional)
  link TEXT,
  link_text TEXT,
  link_text_ar TEXT,
  
  -- Styling
  bg_color TEXT DEFAULT '#FBBF24',
  text_color TEXT DEFAULT '#000000',
  
  -- Display
  is_active BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_dismissible BOOLEAN DEFAULT true,
  
  -- Scheduling
  publish_at TIMESTAMPTZ,
  unpublish_at TIMESTAMPTZ,
  
  -- Targeting
  cluster_ids UUID[],
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trust badges (delivery promise, security, etc.)
CREATE TABLE trust_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  title TEXT NOT NULL,
  title_ar TEXT,
  description TEXT,
  description_ar TEXT,
  
  icon_url TEXT,
  icon_name TEXT, -- For icon libraries
  
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_homepage_sections_active ON homepage_sections(is_active, sort_order);
CREATE INDEX idx_homepage_sections_type ON homepage_sections(section_type);
CREATE INDEX idx_homepage_banners_section ON homepage_banners(section_id);
CREATE INDEX idx_homepage_banners_active ON homepage_banners(is_active, sort_order);
CREATE INDEX idx_homepage_collections_section ON homepage_collections(section_id);
CREATE INDEX idx_homepage_collections_slug ON homepage_collections(slug);
CREATE INDEX idx_quick_categories_active ON homepage_quick_categories(is_active, sort_order);
CREATE INDEX idx_announcement_active ON announcement_bars(is_active);
CREATE INDEX idx_trust_badges_active ON trust_badges(is_active, sort_order);
