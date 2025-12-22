-- Create site banners table
CREATE TABLE IF NOT EXISTS public.site_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_banners_active ON public.site_banners(is_active);
CREATE INDEX IF NOT EXISTS idx_banners_order ON public.site_banners(display_order);

-- Update trigger
CREATE TRIGGER update_banners_updated_at
  BEFORE UPDATE ON public.site_banners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.site_banners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for banners
-- Everyone can view active banners
CREATE POLICY "Anyone can view active banners"
  ON public.site_banners
  FOR SELECT
  USING (is_active = TRUE);

-- Admins can manage banners
CREATE POLICY "Admins can manage banners"
  ON public.site_banners
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

-- Create site settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Update trigger
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for settings
-- Everyone can view settings
CREATE POLICY "Anyone can view settings"
  ON public.site_settings
  FOR SELECT
  USING (TRUE);

-- Admins can manage settings
CREATE POLICY "Admins can manage settings"
  ON public.site_settings
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND (role = 'admin' OR is_admin = TRUE)
    )
  );

COMMENT ON TABLE public.site_banners IS 'Homepage and promotional banners';
COMMENT ON TABLE public.site_settings IS 'Site-wide configuration settings';
