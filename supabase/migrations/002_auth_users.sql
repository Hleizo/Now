-- =============================================
-- NOW MARKETPLACE - AUTH & USERS
-- =============================================

-- Roles definition
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  display_name_ar TEXT,
  description TEXT,
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permissions definition
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role-Permission mapping
CREATE TABLE role_permissions (
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- Extended user profiles (linked to Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic info
  email TEXT,
  phone TEXT,
  full_name TEXT,
  full_name_ar TEXT,
  avatar_url TEXT,
  
  -- Preferences
  preferred_cluster_id UUID, -- Will reference clusters table
  default_address_id UUID,   -- Will reference user_addresses table
  language TEXT DEFAULT 'ar' CHECK (language IN ('ar', 'en')),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  -- Marketing
  marketing_consent BOOLEAN DEFAULT false,
  marketing_consent_at TIMESTAMPTZ,
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  
  -- Flexible metadata
  metadata JSONB DEFAULT '{}'
);

-- User role assignments
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  
  -- Assignment tracking
  assigned_by UUID REFERENCES profiles(id),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  
  UNIQUE(user_id, role_id)
);

-- User addresses for delivery
CREATE TABLE user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Label
  label TEXT, -- Home, Work, etc.
  
  -- Contact for this address
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Address details
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL DEFAULT 'Amman',
  area TEXT,
  
  -- Cluster assignment (will reference clusters)
  cluster_id UUID,
  
  -- Coordinates for mapping
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Extra info
  delivery_instructions TEXT,
  
  -- Flags
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User sessions for analytics
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_token TEXT,
  
  -- Device info
  device_type TEXT, -- mobile, desktop, tablet
  device_os TEXT,
  browser TEXT,
  
  -- Location
  ip_address TEXT,
  cluster_id UUID,
  
  -- Timing
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_phone ON profiles(phone);
CREATE INDEX idx_profiles_cluster ON profiles(preferred_cluster_id);
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
CREATE INDEX idx_user_addresses_user ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_cluster ON user_addresses(cluster_id);
