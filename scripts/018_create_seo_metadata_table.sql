-- Create SEO metadata table for automatic SEO optimization
CREATE TABLE IF NOT EXISTS seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[],
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  canonical_url TEXT,
  robots TEXT DEFAULT 'index,follow',
  structured_data JSONB,
  semrush_data JSONB,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_seo_page_path ON seo_metadata(page_path);

-- Insert default SEO metadata
INSERT INTO seo_metadata (page_path, title, description, keywords, og_title, og_description)
VALUES 
  ('/', 'Lelang Mobil Bekas Terpercaya #1 di Indonesia | LELANGMOBIL.COM', 
   'Platform lelang mobil bekas terpercaya di Indonesia. Dapatkan mobil impian dengan harga terbaik, bonus KYC Rp 2.500.000, proses aman & transparan, terdaftar OJK.',
   ARRAY['lelang mobil', 'mobil bekas', 'jual beli mobil', 'auction mobil', 'mobil murah', 'balai lelang mobil'],
   'Lelang Mobil Bekas Terpercaya | Bonus KYC 2.5 Juta',
   'Dapatkan mobil impian dengan harga terbaik. Terdaftar OJK, 100% aman, 15.000+ mobil terjual.'),
   
  ('/lelang', 'Daftar Lelang Mobil Aktif | LELANGMOBIL.COM',
   'Lihat daftar lelang mobil aktif hari ini. Sedan, SUV, MPV dengan harga terbaik. Proses transparan dan aman.',
   ARRAY['lelang aktif', 'mobil lelang', 'daftar lelang', 'mobil murah'],
   'Daftar Lelang Mobil Aktif Hari Ini',
   'Lelang mobil sedan, SUV, MPV dengan harga terbaik. Proses transparan dan aman.'),
   
  ('/register', 'Daftar & Dapatkan Bonus Rp 2.500.000 | LELANGMOBIL.COM',
   'Daftar sekarang dan dapatkan bonus KYC Rp 2.500.000. Proses mudah, cepat, dan gratis.',
   ARRAY['daftar lelang mobil', 'bonus kyc', 'registrasi', 'member baru'],
   'Bonus Rp 2,5 Juta Untuk Member Baru',
   'Daftar gratis dan dapatkan bonus KYC Rp 2.500.000 untuk ikut lelang mobil.')
ON CONFLICT (page_path) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can view SEO metadata" ON seo_metadata
  FOR SELECT USING (true);

-- Only admins can modify
CREATE POLICY "Admins can modify SEO metadata" ON seo_metadata
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );
