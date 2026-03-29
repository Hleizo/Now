-- =============================================
-- NOW MARKETPLACE - STORES / VENDORS
-- =============================================

-- Main stores table
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Owner (vendor user)
  owner_id UUID NOT NULL REFERENCES profiles(id),
  
  -- Cluster assignment
  cluster_id UUID NOT NULL REFERENCES clusters(id),
  
  -- Basic info
  name TEXT NOT NULL,
  name_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  description_ar TEXT,
  
  -- Contact
  email TEXT,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  
  -- Legal / Business
  business_name TEXT,
  business_name_ar TEXT,
  business_registration_number TEXT,
  tax_number TEXT,
  
  -- Media
  logo_url TEXT,
  cover_image_url TEXT,
  
  -- Status
  status store_status DEFAULT 'pending',
  is_active BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  
  -- Approval workflow
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,
  
  -- Pricing agreement
  agreement_type agreement_type DEFAULT 'standard',
  custom_commission_rate DECIMAL(5, 2), -- For custom agreements
  
  -- Payout readiness
  payout_ready BOOLEAN DEFAULT false,
  
  -- Stats (denormalized for performance)
  total_products INTEGER DEFAULT 0,
  active_products INTEGER DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  
  -- Display
  sort_order INTEGER DEFAULT 0,
  
  -- Internal
  internal_notes TEXT,
  admin_notes TEXT,
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store operating hours
CREATE TABLE store_operating_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  opens_at TIME,
  closes_at TIME,
  is_closed BOOLEAN DEFAULT false,
  
  UNIQUE(store_id, day_of_week)
);

-- Store documents (licenses, agreements, IDs)
CREATE TABLE store_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  
  document_type TEXT NOT NULL, -- license, agreement, id_card, tax_cert
  file_url TEXT NOT NULL,
  file_name TEXT,
  
  -- Verification
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  rejection_reason TEXT,
  
  notes TEXT
);

-- Store payout configuration
CREATE TABLE store_payout_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID UNIQUE NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  
  -- Payout method
  payout_method TEXT DEFAULT 'bank_transfer' CHECK (payout_method IN ('bank_transfer', 'mobile_wallet', 'cash')),
  
  -- Bank details
  bank_name TEXT,
  bank_account_name TEXT,
  bank_account_number TEXT,
  bank_iban TEXT,
  
  -- Mobile wallet
  mobile_wallet_provider TEXT, -- Zain Cash, Orange Money, etc.
  mobile_wallet_number TEXT,
  
  -- Settings
  payout_frequency TEXT DEFAULT 'weekly' CHECK (payout_frequency IN ('daily', 'weekly', 'biweekly', 'monthly')),
  min_payout_amount DECIMAL(10, 2) DEFAULT 10.00,
  
  -- Verification
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Custom pricing agreements with sellers
CREATE TABLE seller_pricing_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  
  -- Agreement name
  agreement_name TEXT,
  
  -- Validity period
  effective_from DATE NOT NULL,
  effective_until DATE,
  
  -- Custom rates (override default rules)
  custom_markup_flat DECIMAL(10, 2),
  custom_commission_rate DECIMAL(5, 2),
  
  -- Price range this applies to (optional)
  min_price DECIMAL(10, 2),
  max_price DECIMAL(10, 2),
  
  -- Scope
  applies_to_all_products BOOLEAN DEFAULT true,
  category_ids UUID[], -- If not all products
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Approval
  created_by UUID REFERENCES profiles(id),
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_stores_owner ON stores(owner_id);
CREATE INDEX idx_stores_cluster ON stores(cluster_id);
CREATE INDEX idx_stores_status ON stores(status, is_active);
CREATE INDEX idx_stores_slug ON stores(slug);
CREATE INDEX idx_stores_featured ON stores(is_featured) WHERE is_featured = true;
CREATE INDEX idx_store_hours_store ON store_operating_hours(store_id);
CREATE INDEX idx_store_docs_store ON store_documents(store_id);
CREATE INDEX idx_seller_agreements_store ON seller_pricing_agreements(store_id);
