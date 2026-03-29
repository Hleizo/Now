-- =============================================
-- NOW MARKETPLACE - ENUMS
-- =============================================

-- Store status workflow
CREATE TYPE store_status AS ENUM (
  'pending',      -- Awaiting admin approval
  'approved',     -- Active and can sell
  'rejected',     -- Application rejected
  'suspended',    -- Temporarily disabled by admin
  'closed'        -- Permanently closed
);

-- Seller agreement types
CREATE TYPE agreement_type AS ENUM (
  'standard',     -- Default pricing rules
  'premium',      -- Better rates
  'enterprise',   -- Large sellers
  'custom'        -- Negotiated deal
);

-- Product lifecycle status
CREATE TYPE product_status AS ENUM (
  'draft',        -- Not submitted yet
  'pending',      -- Awaiting approval
  'approved',     -- Live and visible
  'rejected',     -- Not approved
  'archived'      -- Soft deleted
);

-- Inventory status
CREATE TYPE stock_status AS ENUM (
  'in_stock',
  'low_stock',
  'out_of_stock',
  'discontinued'
);

-- How price is calculated for this product
CREATE TYPE pricing_mode AS ENUM (
  'auto',              -- System calculates from rules
  'markup_flat',       -- Fixed markup applied
  'commission_percent', -- Percentage commission
  'custom',            -- Custom agreement
  'manual'             -- Admin set price manually
);

-- Pricing rule types
CREATE TYPE pricing_tier_type AS ENUM (
  'markup_flat',       -- Add fixed amount
  'commission_percent' -- Add percentage
);

-- Order lifecycle
CREATE TYPE order_status AS ENUM (
  'pending',           -- Just placed
  'confirmed',         -- Confirmed by system/admin
  'processing',        -- Being prepared
  'ready_for_delivery', -- Ready for pickup
  'out_for_delivery',  -- On the way
  'delivered',         -- Completed
  'cancelled',         -- Cancelled
  'refunded'           -- Money returned
);

-- Payment status
CREATE TYPE payment_status AS ENUM (
  'pending',
  'paid',
  'failed',
  'refunded',
  'partially_refunded'
);

-- Payment methods
CREATE TYPE payment_method AS ENUM (
  'cash_on_delivery',
  'card',
  'wallet'
);

-- Order fulfillment
CREATE TYPE fulfillment_status AS ENUM (
  'unfulfilled',
  'partial',
  'fulfilled'
);

-- Seller settlement
CREATE TYPE settlement_status AS ENUM (
  'pending',    -- Not calculated yet
  'calculated', -- Amount determined
  'paid'        -- Paid to seller
);

-- Homepage section types
CREATE TYPE section_type AS ENUM (
  'hero_banner',
  'promo_cards',
  'quick_categories',
  'featured_products',
  'product_collection',
  'deals',
  'trust_badges',
  'announcement',
  'brand_showcase',
  'custom_html'
);
