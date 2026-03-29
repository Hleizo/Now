-- =============================================
-- NOW MARKETPLACE - GEOGRAPHY / CLUSTERS
-- =============================================

-- Clusters (delivery zones / neighborhoods)
CREATE TABLE clusters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic info
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,
  
  -- Location
  city TEXT NOT NULL DEFAULT 'Amman',
  areas TEXT[], -- List of neighborhood names
  
  -- Geographic center
  center_lat DECIMAL(10, 8),
  center_lng DECIMAL(11, 8),
  radius_km DECIMAL(5, 2),
  
  -- Precise boundaries (GeoJSON format)
  boundary_geojson JSONB,
  
  -- Status
  is_active BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  launch_date DATE,
  
  -- Display
  cover_image_url TEXT,
  icon_url TEXT,
  color_hex TEXT DEFAULT '#FBBF24', -- Brand yellow
  sort_order INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),
  internal_notes TEXT
);

-- Delivery configuration per cluster
CREATE TABLE cluster_delivery_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id UUID NOT NULL REFERENCES clusters(id) ON DELETE CASCADE,
  
  -- Delivery fees (in JOD)
  base_delivery_fee DECIMAL(10, 2) DEFAULT 1.50,
  free_delivery_threshold DECIMAL(10, 2) DEFAULT 15.00,
  express_delivery_fee DECIMAL(10, 2) DEFAULT 2.50,
  
  -- Time promises (in minutes)
  standard_delivery_minutes INTEGER DEFAULT 90,
  express_delivery_minutes INTEGER DEFAULT 45,
  
  -- Same-day cutoff
  same_day_cutoff_time TIME DEFAULT '18:00',
  
  -- Eligibility flags
  express_enabled BOOLEAN DEFAULT false,
  same_day_enabled BOOLEAN DEFAULT true,
  scheduled_enabled BOOLEAN DEFAULT false,
  
  -- Order limits
  min_order_amount DECIMAL(10, 2) DEFAULT 3.00,
  max_order_amount DECIMAL(10, 2),
  max_items_per_order INTEGER DEFAULT 50,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(cluster_id)
);

-- Operating schedule per cluster
CREATE TABLE cluster_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_id UUID NOT NULL REFERENCES clusters(id) ON DELETE CASCADE,
  
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday
  opens_at TIME,
  closes_at TIME,
  is_closed BOOLEAN DEFAULT false,
  
  UNIQUE(cluster_id, day_of_week)
);

-- Add foreign key from profiles to clusters
ALTER TABLE profiles 
ADD CONSTRAINT fk_profiles_cluster 
FOREIGN KEY (preferred_cluster_id) REFERENCES clusters(id);

-- Add foreign key from user_addresses to clusters
ALTER TABLE user_addresses 
ADD CONSTRAINT fk_addresses_cluster 
FOREIGN KEY (cluster_id) REFERENCES clusters(id);

-- Indexes
CREATE INDEX idx_clusters_active ON clusters(is_active, is_visible);
CREATE INDEX idx_clusters_slug ON clusters(slug);
CREATE INDEX idx_cluster_delivery_cluster ON cluster_delivery_config(cluster_id);
CREATE INDEX idx_cluster_schedule_cluster ON cluster_schedule(cluster_id);
