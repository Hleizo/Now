-- =============================================
-- NOW MARKETPLACE - PRICING ENGINE
-- =============================================

-- Pricing policies (groups of rules)
CREATE TABLE pricing_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name TEXT NOT NULL,
  name_ar TEXT,
  description TEXT,
  
  -- Is this the default policy?
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  -- Priority (higher = checked first)
  priority INTEGER DEFAULT 0,
  
  -- Validity period
  effective_from DATE,
  effective_until DATE,
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Pricing rules within a policy
CREATE TABLE pricing_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID NOT NULL REFERENCES pricing_policies(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  name_ar TEXT,
  
  -- Price range this rule applies to (seller price)
  min_price DECIMAL(10, 2) NOT NULL,
  max_price DECIMAL(10, 2), -- NULL = no upper limit
  
  -- What type of pricing?
  pricing_type pricing_tier_type NOT NULL,
  
  -- Values (use one based on type)
  markup_amount DECIMAL(10, 2),    -- For markup_flat
  commission_rate DECIMAL(5, 2),   -- For commission_percent (e.g., 7.00 = 7%)
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seller-specific pricing overrides
CREATE TABLE seller_pricing_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  
  -- Override type
  pricing_type pricing_tier_type,
  markup_amount DECIMAL(10, 2),
  commission_rate DECIMAL(5, 2),
  
  -- Optional: apply only to specific price range
  min_price DECIMAL(10, 2),
  max_price DECIMAL(10, 2),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Validity
  effective_from DATE,
  effective_until DATE,
  
  -- Tracking
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Category-specific pricing overrides
CREATE TABLE category_pricing_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  
  pricing_type pricing_tier_type,
  markup_amount DECIMAL(10, 2),
  commission_rate DECIMAL(5, 2),
  
  is_active BOOLEAN DEFAULT true,
  
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_pricing_policies_default ON pricing_policies(is_default) WHERE is_default = true;
CREATE INDEX idx_pricing_policies_active ON pricing_policies(is_active);
CREATE INDEX idx_pricing_rules_policy ON pricing_rules(policy_id);
CREATE INDEX idx_pricing_rules_range ON pricing_rules(min_price, max_price);
CREATE INDEX idx_seller_overrides_store ON seller_pricing_overrides(store_id);
CREATE INDEX idx_category_overrides_category ON category_pricing_overrides(category_id);

-- =============================================
-- PRICING CALCULATION FUNCTION
-- =============================================

CREATE OR REPLACE FUNCTION calculate_product_price(
  p_seller_price DECIMAL,
  p_product_id UUID DEFAULT NULL,
  p_store_id UUID DEFAULT NULL,
  p_category_id UUID DEFAULT NULL
)
RETURNS TABLE (
  final_sale_price DECIMAL,
  final_markup_amount DECIMAL,
  final_commission_amount DECIMAL,
  final_pricing_mode pricing_mode,
  applied_rule_id UUID
) AS $$
DECLARE
  v_rule RECORD;
  v_final_price DECIMAL;
  v_markup DECIMAL := 0;
  v_commission DECIMAL := 0;
  v_mode pricing_mode;
  v_rule_id UUID;
  v_found BOOLEAN := false;
BEGIN
  -- Step 1: Check seller-specific override
  IF p_store_id IS NOT NULL THEN
    SELECT * INTO v_rule FROM seller_pricing_overrides
    WHERE store_id = p_store_id
      AND is_active = true
      AND (effective_from IS NULL OR effective_from <= CURRENT_DATE)
      AND (effective_until IS NULL OR effective_until >= CURRENT_DATE)
      AND (min_price IS NULL OR p_seller_price >= min_price)
      AND (max_price IS NULL OR p_seller_price < max_price)
    ORDER BY min_price DESC NULLS LAST
    LIMIT 1;
    
    IF FOUND THEN
      v_found := true;
      v_rule_id := v_rule.id;
      IF v_rule.pricing_type = 'markup_flat' THEN
        v_markup := COALESCE(v_rule.markup_amount, 0);
        v_final_price := p_seller_price + v_markup;
        v_mode := 'markup_flat';
      ELSE
        v_commission := ROUND(p_seller_price * (COALESCE(v_rule.commission_rate, 0) / 100), 2);
        v_final_price := p_seller_price + v_commission;
        v_mode := 'commission_percent';
      END IF;
    END IF;
  END IF;
  
  -- Step 2: Check category-specific override
  IF NOT v_found AND p_category_id IS NOT NULL THEN
    SELECT * INTO v_rule FROM category_pricing_overrides
    WHERE category_id = p_category_id AND is_active = true
    LIMIT 1;
    
    IF FOUND THEN
      v_found := true;
      v_rule_id := v_rule.id;
      IF v_rule.pricing_type = 'markup_flat' THEN
        v_markup := COALESCE(v_rule.markup_amount, 0);
        v_final_price := p_seller_price + v_markup;
        v_mode := 'markup_flat';
      ELSE
        v_commission := ROUND(p_seller_price * (COALESCE(v_rule.commission_rate, 0) / 100), 2);
        v_final_price := p_seller_price + v_commission;
        v_mode := 'commission_percent';
      END IF;
    END IF;
  END IF;
  
  -- Step 3: Apply default pricing policy rules
  IF NOT v_found THEN
    SELECT pr.* INTO v_rule 
    FROM pricing_rules pr
    JOIN pricing_policies pp ON pr.policy_id = pp.id
    WHERE pp.is_active = true
      AND pp.is_default = true
      AND pr.is_active = true
      AND p_seller_price >= pr.min_price
      AND (pr.max_price IS NULL OR p_seller_price < pr.max_price)
    ORDER BY pr.sort_order, pr.min_price DESC
    LIMIT 1;
    
    IF FOUND THEN
      v_found := true;
      v_rule_id := v_rule.id;
      IF v_rule.pricing_type = 'markup_flat' THEN
        v_markup := COALESCE(v_rule.markup_amount, 0);
        v_final_price := p_seller_price + v_markup;
        v_mode := 'markup_flat';
      ELSE
        v_commission := ROUND(p_seller_price * (COALESCE(v_rule.commission_rate, 0) / 100), 2);
        v_final_price := p_seller_price + v_commission;
        v_mode := 'commission_percent';
      END IF;
    END IF;
  END IF;
  
  -- Fallback: no markup if no rules found
  IF NOT v_found THEN
    v_final_price := p_seller_price;
    v_mode := 'auto';
    v_markup := 0;
    v_commission := 0;
  END IF;
  
  RETURN QUERY SELECT v_final_price, v_markup, v_commission, v_mode, v_rule_id;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- TRIGGER TO AUTO-CALCULATE PRICES
-- =============================================

CREATE OR REPLACE FUNCTION auto_calculate_product_price()
RETURNS TRIGGER AS $$
DECLARE
  v_result RECORD;
BEGIN
  -- Only calculate if price_locked is false
  IF NEW.price_locked = false THEN
    SELECT * INTO v_result FROM calculate_product_price(
      NEW.seller_price,
      NEW.id,
      NEW.store_id,
      NEW.category_id
    );
    
    NEW.sale_price := v_result.final_sale_price;
    NEW.markup_amount := v_result.final_markup_amount;
    NEW.commission_amount := v_result.final_commission_amount;
    NEW.pricing_mode := v_result.final_pricing_mode;
    NEW.pricing_rule_id := v_result.applied_rule_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_price_on_insert
BEFORE INSERT ON products
FOR EACH ROW EXECUTE FUNCTION auto_calculate_product_price();

CREATE TRIGGER trigger_auto_price_on_update
BEFORE UPDATE OF seller_price, category_id, price_locked ON products
FOR EACH ROW EXECUTE FUNCTION auto_calculate_product_price();
