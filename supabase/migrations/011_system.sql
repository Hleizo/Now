-- =============================================
-- NOW MARKETPLACE - SYSTEM (AUDIT, NOTIFICATIONS)
-- =============================================

-- Audit logs (track all important changes)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Who made the change
  user_id UUID REFERENCES profiles(id),
  user_email TEXT,
  user_role TEXT,
  
  -- What was changed
  action TEXT NOT NULL CHECK (action IN (
    'create', 'update', 'delete', 'approve', 'reject', 
    'suspend', 'activate', 'login', 'logout', 'export'
  )),
  resource_type TEXT NOT NULL, -- product, store, order, banner, etc.
  resource_id UUID,
  resource_name TEXT, -- Human readable name
  
  -- Change details
  old_values JSONB,
  new_values JSONB,
  changed_fields TEXT[],
  
  -- Context
  ip_address TEXT,
  user_agent TEXT,
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Content
  title TEXT NOT NULL,
  title_ar TEXT,
  body TEXT,
  body_ar TEXT,
  
  -- Type
  notification_type TEXT CHECK (notification_type IN (
    'order', 'promotion', 'system', 'product', 'store', 'payment'
  )),
  
  -- Action (where to go when clicked)
  action_url TEXT,
  action_data JSONB,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  -- Delivery status
  push_sent BOOLEAN DEFAULT false,
  push_sent_at TIMESTAMPTZ,
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notification templates
CREATE TABLE notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Key identifier
  key TEXT UNIQUE NOT NULL,
  
  -- Templates (with placeholders like {{order_number}})
  title_template TEXT NOT NULL,
  title_template_ar TEXT,
  body_template TEXT,
  body_template_ar TEXT,
  
  -- Email specific
  email_subject_template TEXT,
  email_subject_template_ar TEXT,
  email_body_template TEXT, -- HTML
  email_body_template_ar TEXT,
  
  -- Channels
  send_push BOOLEAN DEFAULT true,
  send_email BOOLEAN DEFAULT false,
  send_sms BOOLEAN DEFAULT false,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Tracking
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)
);

-- Scheduled tasks (for admin reference)
CREATE TABLE scheduled_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Task info
  name TEXT NOT NULL,
  description TEXT,
  
  -- Schedule (cron format or interval)
  schedule TEXT NOT NULL,
  
  -- Execution
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  last_status TEXT, -- success, failed, running
  last_error TEXT,
  
  -- Status
  is_enabled BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_type ON notifications(notification_type);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

CREATE INDEX idx_notification_templates_key ON notification_templates(key);
