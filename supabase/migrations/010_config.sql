-- =============================================
-- NOW MARKETPLACE - CONFIGURATION & SETTINGS
-- =============================================

-- Application settings (key-value store)
CREATE TABLE app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Key identifier
  key TEXT UNIQUE NOT NULL,
  
  -- Value (stored as JSONB for flexibility)
  value JSONB NOT NULL,
  
  -- Metadata
  label TEXT,
  label_ar TEXT,
  description TEXT,
  
  -- Grouping
  category TEXT DEFAULT 'general' CHECK (category IN (
    'general', 'branding', 'delivery', 'payment', 'notifications', 
    'seo', 'social', 'contact', 'legal', 'advanced'
  )),
  
  -- Value type hint
  value_type TEXT DEFAULT 'string' CHECK (value_type IN (
    'string', 'number', 'boolean', 'json', 'image', 'color', 'array'
  )),
  
  -- Can frontend fetch this?
  is_public BOOLEAN DEFAULT false,
  
  -- Tracking
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)
);

-- Feature flags
CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Key identifier
  key TEXT UNIQUE NOT NULL,
  
  -- Status
  is_enabled BOOLEAN DEFAULT false,
  
  -- Targeting (who gets this feature)
  enabled_for_roles TEXT[], -- ['admin', 'vendor']
  enabled_for_clusters UUID[],
  enabled_for_users UUID[],
  enabled_percentage INTEGER CHECK (enabled_percentage >= 0 AND enabled_percentage <= 100),
  
  -- Info
  label TEXT,
  description TEXT,
  
  -- Tracking
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)
);

-- Delivery messages (dynamic text)
CREATE TABLE delivery_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Key identifier
  key TEXT UNIQUE NOT NULL,
  
  -- Content
  message TEXT NOT NULL,
  message_ar TEXT,
  
  -- Where to show
  location TEXT CHECK (location IN (
    'cart', 'checkout', 'product', 'order_confirmation', 
    'homepage', 'store_page', 'category_page'
  )),
  
  -- Conditions (optional JSON for complex rules)
  conditions JSONB DEFAULT '{}',
  
  -- Display
  is_active BOOLEAN DEFAULT true,
  
  -- Tracking
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)
);

-- Indexes
CREATE INDEX idx_app_settings_key ON app_settings(key);
CREATE INDEX idx_app_settings_category ON app_settings(category);
CREATE INDEX idx_app_settings_public ON app_settings(is_public) WHERE is_public = true;
CREATE INDEX idx_feature_flags_key ON feature_flags(key);
CREATE INDEX idx_feature_flags_enabled ON feature_flags(is_enabled);
CREATE INDEX idx_delivery_messages_key ON delivery_messages(key);
CREATE INDEX idx_delivery_messages_location ON delivery_messages(location);
