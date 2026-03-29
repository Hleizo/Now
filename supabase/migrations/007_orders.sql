-- =============================================
-- NOW MARKETPLACE - ORDERS & CART
-- =============================================

-- Shopping carts
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Owner (one of these must be set)
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_id TEXT, -- For guest carts
  
  -- Cluster lock (cart is tied to one cluster)
  cluster_id UUID REFERENCES clusters(id),
  
  -- Denormalized totals
  subtotal DECIMAL(10, 2) DEFAULT 0,
  item_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- For guest cart cleanup
  
  -- Ensure cart has an owner
  CONSTRAINT cart_owner_check CHECK (user_id IS NOT NULL OR session_id IS NOT NULL)
);

-- Cart items
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  
  -- Price snapshot at add time (for comparison)
  unit_price DECIMAL(10, 2) NOT NULL,
  
  added_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(cart_id, product_id)
);

-- Wishlists
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  
  added_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, product_id)
);

-- Main orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Human-readable order number
  order_number TEXT UNIQUE NOT NULL,
  
  -- Customer
  user_id UUID NOT NULL REFERENCES profiles(id),
  
  -- Location
  cluster_id UUID NOT NULL REFERENCES clusters(id),
  delivery_address JSONB NOT NULL, -- Snapshot of address at order time
  
  -- ========== PRICING BREAKDOWN ==========
  subtotal DECIMAL(10, 2) NOT NULL,           -- Sum of line items
  total_markup DECIMAL(10, 2) DEFAULT 0,      -- Total markup collected
  total_commission DECIMAL(10, 2) DEFAULT 0,  -- Total commission collected
  delivery_fee DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,              -- Final amount customer pays
  
  -- Platform earnings (markup + commission)
  platform_fee DECIMAL(10, 2) DEFAULT 0,
  
  -- ========== COUPON ==========
  coupon_id UUID,
  coupon_code TEXT,
  
  -- ========== STATUS ==========
  status order_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  payment_method payment_method DEFAULT 'cash_on_delivery',
  fulfillment_status fulfillment_status DEFAULT 'unfulfilled',
  
  -- ========== DELIVERY ==========
  delivery_type TEXT DEFAULT 'standard', -- standard, express, scheduled
  estimated_delivery_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  delivery_notes TEXT,
  
  -- ========== CANCELLATION ==========
  cancelled_at TIMESTAMPTZ,
  cancelled_by UUID REFERENCES profiles(id),
  cancel_reason TEXT,
  
  -- ========== REFUND ==========
  refund_amount DECIMAL(10, 2),
  refunded_at TIMESTAMPTZ,
  refund_reason TEXT,
  
  -- ========== NOTES ==========
  customer_notes TEXT,
  internal_notes TEXT,
  
  -- ========== METADATA ==========
  metadata JSONB DEFAULT '{}',
  
  -- ========== TIMESTAMPS ==========
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order line items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  
  -- ========== PRODUCT SNAPSHOT ==========
  product_name TEXT NOT NULL,
  product_name_ar TEXT,
  product_image_url TEXT,
  sku TEXT,
  
  -- ========== QUANTITY ==========
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  
  -- ========== PRICING SNAPSHOT ==========
  seller_price DECIMAL(10, 2) NOT NULL,    -- What seller charged
  sale_price DECIMAL(10, 2) NOT NULL,      -- What customer paid per unit
  markup_amount DECIMAL(10, 2) DEFAULT 0,  -- Markup per unit
  commission_amount DECIMAL(10, 2) DEFAULT 0, -- Commission per unit
  
  line_total DECIMAL(10, 2) NOT NULL,      -- quantity × sale_price
  
  -- ========== SETTLEMENT ==========
  settlement_status settlement_status DEFAULT 'pending',
  seller_payout_amount DECIMAL(10, 2),     -- What seller receives: seller_price × quantity
  settled_at TIMESTAMPTZ,
  
  -- ========== FULFILLMENT ==========
  is_fulfilled BOOLEAN DEFAULT false,
  fulfilled_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order status history timeline
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  
  status order_status NOT NULL,
  previous_status order_status,
  
  changed_by UUID REFERENCES profiles(id),
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_carts_user ON carts(user_id);
CREATE INDEX idx_carts_session ON carts(session_id);
CREATE INDEX idx_carts_cluster ON carts(cluster_id);
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product ON cart_items(product_id);
CREATE INDEX idx_wishlists_user ON wishlists(user_id);
CREATE INDEX idx_wishlists_product ON wishlists(product_id);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_cluster ON orders(cluster_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_number ON orders(order_number);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_order_items_store ON order_items(store_id);
CREATE INDEX idx_order_items_settlement ON order_items(settlement_status);

CREATE INDEX idx_order_history_order ON order_status_history(order_id);

-- =============================================
-- ORDER NUMBER GENERATION
-- =============================================

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  v_date TEXT;
  v_random TEXT;
  v_number TEXT;
  v_exists BOOLEAN;
BEGIN
  v_date := TO_CHAR(CURRENT_DATE, 'YYYYMMDD');
  
  LOOP
    -- Generate random 4-digit suffix
    v_random := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    v_number := 'NOW-' || v_date || '-' || v_random;
    
    -- Check if exists
    SELECT EXISTS(SELECT 1 FROM orders WHERE order_number = v_number) INTO v_exists;
    
    EXIT WHEN NOT v_exists;
  END LOOP;
  
  RETURN v_number;
END;
$$ LANGUAGE plpgsql;

-- Auto-generate order number on insert
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
BEFORE INSERT ON orders
FOR EACH ROW EXECUTE FUNCTION set_order_number();

-- =============================================
-- CART CLUSTER VALIDATION
-- =============================================

CREATE OR REPLACE FUNCTION check_cart_cluster()
RETURNS TRIGGER AS $$
DECLARE
  v_product_cluster UUID;
  v_cart_cluster UUID;
BEGIN
  -- Get product's cluster through its store
  SELECT s.cluster_id INTO v_product_cluster
  FROM products p
  JOIN stores s ON p.store_id = s.id
  WHERE p.id = NEW.product_id;
  
  -- Get cart's current cluster
  SELECT cluster_id INTO v_cart_cluster FROM carts WHERE id = NEW.cart_id;
  
  -- If cart has no cluster yet, set it
  IF v_cart_cluster IS NULL THEN
    UPDATE carts SET cluster_id = v_product_cluster, updated_at = NOW() 
    WHERE id = NEW.cart_id;
  -- If different cluster, reject
  ELSIF v_cart_cluster != v_product_cluster THEN
    RAISE EXCEPTION 'Cannot add products from different cluster. Please clear your cart first or remove items from the other area.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cart_cluster_check
BEFORE INSERT ON cart_items
FOR EACH ROW EXECUTE FUNCTION check_cart_cluster();

-- =============================================
-- STOCK DEDUCTION ON ORDER
-- =============================================

CREATE OR REPLACE FUNCTION deduct_stock_on_order()
RETURNS TRIGGER AS $$
BEGIN
  -- Deduct stock
  UPDATE products 
  SET stock_quantity = stock_quantity - NEW.quantity,
      order_count = order_count + 1,
      updated_at = NOW()
  WHERE id = NEW.product_id;
  
  -- Update stock status
  UPDATE products
  SET stock_status = CASE
    WHEN stock_quantity <= 0 THEN 'out_of_stock'::stock_status
    WHEN stock_quantity <= low_stock_threshold THEN 'low_stock'::stock_status
    ELSE 'in_stock'::stock_status
  END
  WHERE id = NEW.product_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_deduct_stock
AFTER INSERT ON order_items
FOR EACH ROW EXECUTE FUNCTION deduct_stock_on_order();

-- =============================================
-- ORDER STATUS HISTORY LOGGING
-- =============================================

CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO order_status_history (order_id, status, previous_status)
    VALUES (NEW.id, NEW.status, OLD.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_order_status
AFTER UPDATE OF status ON orders
FOR EACH ROW EXECUTE FUNCTION log_order_status_change();
