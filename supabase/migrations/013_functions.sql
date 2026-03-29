-- =============================================
-- NOW MARKETPLACE - HELPER FUNCTIONS
-- =============================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_timestamp BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clusters_timestamp BEFORE UPDATE ON clusters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stores_timestamp BEFORE UPDATE ON stores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_timestamp BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_timestamp BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brands_timestamp BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_timestamp BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_carts_timestamp BEFORE UPDATE ON carts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_timestamp BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SLUG GENERATION
-- =============================================

CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
BEGIN
  -- Convert to lowercase, replace spaces with hyphens, remove special chars
  slug := LOWER(TRIM(input_text));
  slug := REGEXP_REPLACE(slug, '[^\w\s-]', '', 'g');
  slug := REGEXP_REPLACE(slug, '[-\s]+', '-', 'g');
  slug := TRIM(BOTH '-' FROM slug);
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_unique_slug(base_slug TEXT, table_name TEXT)
RETURNS TEXT AS $$
DECLARE
  new_slug TEXT := base_slug;
  counter INTEGER := 1;
  slug_exists BOOLEAN;
BEGIN
  LOOP
    EXECUTE format('SELECT EXISTS(SELECT 1 FROM %I WHERE slug = $1)', table_name)
    INTO slug_exists
    USING new_slug;
    
    EXIT WHEN NOT slug_exists;
    
    new_slug := base_slug || '-' || counter;
    counter := counter + 1;
  END LOOP;
  
  RETURN new_slug;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- CATEGORY PATH HELPERS
-- =============================================

CREATE OR REPLACE FUNCTION update_category_path()
RETURNS TRIGGER AS $$
DECLARE
  parent_path TEXT;
BEGIN
  IF NEW.parent_id IS NULL THEN
    NEW.path := '/' || NEW.slug || '/';
    NEW.level := 0;
  ELSE
    SELECT path, level INTO parent_path, NEW.level
    FROM categories
    WHERE id = NEW.parent_id;
    
    NEW.path := parent_path || NEW.slug || '/';
    NEW.level := NEW.level + 1;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_category_path
BEFORE INSERT OR UPDATE OF parent_id, slug ON categories
FOR EACH ROW EXECUTE FUNCTION update_category_path();

-- =============================================
-- STORE STATS HELPERS
-- =============================================

CREATE OR REPLACE FUNCTION update_store_product_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update on INSERT
  IF TG_OP = 'INSERT' THEN
    UPDATE stores SET 
      total_products = total_products + 1,
      active_products = active_products + CASE WHEN NEW.is_active AND NEW.status = 'approved' THEN 1 ELSE 0 END
    WHERE id = NEW.store_id;
    
  -- Update on DELETE
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE stores SET 
      total_products = total_products - 1,
      active_products = active_products - CASE WHEN OLD.is_active AND OLD.status = 'approved' THEN 1 ELSE 0 END
    WHERE id = OLD.store_id;
    
  -- Update on status change
  ELSIF TG_OP = 'UPDATE' THEN
    IF (OLD.is_active, OLD.status) IS DISTINCT FROM (NEW.is_active, NEW.status) THEN
      UPDATE stores SET 
        active_products = active_products 
          + CASE WHEN NEW.is_active AND NEW.status = 'approved' THEN 1 ELSE 0 END
          - CASE WHEN OLD.is_active AND OLD.status = 'approved' THEN 1 ELSE 0 END
      WHERE id = NEW.store_id;
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_store_product_counts
AFTER INSERT OR UPDATE OF is_active, status OR DELETE ON products
FOR EACH ROW EXECUTE FUNCTION update_store_product_counts();

-- =============================================
-- CART TOTALS HELPERS
-- =============================================

CREATE OR REPLACE FUNCTION update_cart_totals()
RETURNS TRIGGER AS $$
BEGIN
  -- Recalculate cart totals
  IF TG_OP = 'DELETE' THEN
    UPDATE carts SET 
      subtotal = COALESCE((SELECT SUM(unit_price * quantity) FROM cart_items WHERE cart_id = OLD.cart_id), 0),
      item_count = COALESCE((SELECT SUM(quantity) FROM cart_items WHERE cart_id = OLD.cart_id), 0),
      updated_at = NOW()
    WHERE id = OLD.cart_id;
  ELSE
    UPDATE carts SET 
      subtotal = COALESCE((SELECT SUM(unit_price * quantity) FROM cart_items WHERE cart_id = NEW.cart_id), 0),
      item_count = COALESCE((SELECT SUM(quantity) FROM cart_items WHERE cart_id = NEW.cart_id), 0),
      updated_at = NOW()
    WHERE id = NEW.cart_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cart_totals
AFTER INSERT OR UPDATE OR DELETE ON cart_items
FOR EACH ROW EXECUTE FUNCTION update_cart_totals();

-- =============================================
-- ROLE CHECK HELPER
-- =============================================

CREATE OR REPLACE FUNCTION has_role(check_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid()
    AND r.name = check_role
    AND ur.is_active = true
    AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION has_any_role(check_roles TEXT[])
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid()
    AND r.name = ANY(check_roles)
    AND ur.is_active = true
    AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- PERMISSION CHECK HELPER
-- =============================================

CREATE OR REPLACE FUNCTION has_permission(resource TEXT, action TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN role_permissions rp ON ur.role_id = rp.role_id
    JOIN permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = auth.uid()
    AND p.resource = resource
    AND p.action = action
    AND ur.is_active = true
    AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- FEATURE FLAG CHECK HELPER
-- =============================================

CREATE OR REPLACE FUNCTION is_feature_enabled(feature_key TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  flag RECORD;
BEGIN
  SELECT * INTO flag FROM feature_flags WHERE key = feature_key;
  
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  IF NOT flag.is_enabled THEN
    RETURN false;
  END IF;
  
  -- Check role targeting
  IF flag.enabled_for_roles IS NOT NULL AND array_length(flag.enabled_for_roles, 1) > 0 THEN
    IF NOT has_any_role(flag.enabled_for_roles) THEN
      RETURN false;
    END IF;
  END IF;
  
  -- Check user targeting
  IF flag.enabled_for_users IS NOT NULL AND array_length(flag.enabled_for_users, 1) > 0 THEN
    IF NOT auth.uid() = ANY(flag.enabled_for_users) THEN
      RETURN false;
    END IF;
  END IF;
  
  -- TODO: Add percentage rollout logic if needed
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
