-- =============================================
-- NOW MARKETPLACE - CONTENT CMS
-- =============================================

-- Static pages (About, Contact, Terms, etc.)
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identifier
  slug TEXT UNIQUE NOT NULL,
  
  -- Content
  title TEXT NOT NULL,
  title_ar TEXT,
  content TEXT,
  content_ar TEXT,
  
  -- Status
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  
  -- SEO
  meta_title TEXT,
  meta_title_ar TEXT,
  meta_description TEXT,
  meta_description_ar TEXT,
  og_image_url TEXT,
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)
);

-- Reusable content blocks
CREATE TABLE content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identifier
  key TEXT UNIQUE NOT NULL,
  
  -- Content
  title TEXT,
  content TEXT NOT NULL,
  content_ar TEXT,
  
  -- Type hint
  block_type TEXT DEFAULT 'text' CHECK (block_type IN ('text', 'html', 'markdown', 'json')),
  
  -- Context (where this block is used)
  context TEXT, -- footer, header, checkout, etc.
  
  -- Tracking
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id)
);

-- FAQs
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Category
  category TEXT DEFAULT 'general' CHECK (category IN (
    'general', 'delivery', 'payment', 'returns', 'vendors', 'account'
  )),
  
  -- Content
  question TEXT NOT NULL,
  question_ar TEXT,
  answer TEXT NOT NULL,
  answer_ar TEXT,
  
  -- Display
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Centralized media library
CREATE TABLE media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- File info
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT CHECK (file_type IN ('image', 'document', 'video')),
  mime_type TEXT,
  file_size INTEGER, -- bytes
  
  -- Dimensions (for images)
  width INTEGER,
  height INTEGER,
  
  -- Metadata
  alt_text TEXT,
  alt_text_ar TEXT,
  caption TEXT,
  caption_ar TEXT,
  
  -- Organization
  folder TEXT DEFAULT 'general',
  tags TEXT[],
  
  -- Tracking
  uploaded_by UUID REFERENCES profiles(id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_published ON pages(is_published);
CREATE INDEX idx_content_blocks_key ON content_blocks(key);
CREATE INDEX idx_content_blocks_context ON content_blocks(context);
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_active ON faqs(is_active, sort_order);
CREATE INDEX idx_media_folder ON media_library(folder);
CREATE INDEX idx_media_type ON media_library(file_type);
CREATE INDEX idx_media_tags ON media_library USING GIN(tags);
