-- Create site_banners table for managing promotional banners
CREATE TABLE IF NOT EXISTS site_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  link_text TEXT,
  position TEXT NOT NULL DEFAULT 'home', -- 'home', 'lelang', 'dashboard'
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table for dynamic site configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT NOT NULL DEFAULT 'general', -- 'general', 'footer', 'contact', 'social', 'seo'
  description TEXT,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create promotional_banners table for additional ad banners
CREATE TABLE IF NOT EXISTS promotional_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  link_url TEXT,
  position TEXT NOT NULL, -- 'sidebar', 'header', 'footer', 'between-sections'
  page TEXT DEFAULT 'all', -- 'all', 'home', 'lelang', 'dashboard'
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default footer settings
INSERT INTO site_settings (key, value, category, description) VALUES
('footer_company_name', '"PT BALAI LELANG MOBIL"', 'footer', 'Company name displayed in footer'),
('footer_description', '"Platform lelang mobil terpercaya #1 di Indonesia. Terdaftar dan diawasi oleh OJK."', 'footer', 'Company description in footer'),
('footer_copyright', '"© 2022 all right reserved."', 'footer', 'Copyright text'),
('contact_email', '"info@lelangmobil.com"', 'contact', 'Contact email address'),
('contact_phone', '"+62 882-0227-83493"', 'contact', 'Contact phone number'),
('contact_whatsapp', '"6282022783493"', 'contact', 'WhatsApp number'),
('social_instagram', '"https://instagram.com/lelangmobil"', 'social', 'Instagram URL'),
('social_facebook', '"https://facebook.com/lelangmobil"', 'social', 'Facebook URL'),
('social_twitter', '"https://twitter.com/lelangmobil"', 'social', 'Twitter URL'),
('social_youtube', '"https://youtube.com/lelangmobil"', 'social', 'YouTube URL')
ON CONFLICT (key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_banners_active ON site_banners(is_active, position, display_order);
CREATE INDEX IF NOT EXISTS idx_promotional_banners_active ON promotional_banners(is_active, page, position);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);

-- Enable Row Level Security
ALTER TABLE site_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotional_banners ENABLE ROW LEVEL SECURITY;

-- Policies for site_banners
CREATE POLICY "Anyone can view active banners" ON site_banners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage banners" ON site_banners
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Policies for site_settings
CREATE POLICY "Anyone can view site settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage site settings" ON site_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );

-- Policies for promotional_banners
CREATE POLICY "Anyone can view active promotional banners" ON promotional_banners
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage promotional banners" ON promotional_banners
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );
