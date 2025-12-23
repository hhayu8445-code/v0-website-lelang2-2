-- ============================================
-- SEED MISSING DATA - PRODUCTION READY
-- ============================================
-- Run this to complete database setup
-- ============================================

-- 1. SEED BANNERS
INSERT INTO site_banners (title, subtitle, image_url, link_url, position, display_order, is_active, created_at, updated_at)
VALUES 
('Promo Desember 2025', 'Bonus Saldo Rp 2.500.000 untuk Pengguna Baru', '/images/promo-december-2025.png', '/register', 'home', 1, true, NOW(), NOW()),
('Lelang Mobil Terpercaya', 'Platform #1 di Indonesia dengan Sistem Transparan', '/placeholder.svg', '/lelang', 'home', 2, true, NOW(), NOW()),
('Bonus KYC', 'Lengkapi Verifikasi dan Dapatkan Bonus Langsung', '/placeholder.svg', '/dashboard/kyc', 'home', 3, true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 2. SEED SITE SETTINGS
INSERT INTO site_settings (key, value, description, created_at, updated_at)
VALUES 
('site_name', 'LELANGMOBIL.COM', 'Nama website', NOW(), NOW()),
('site_description', 'Platform Lelang Mobil Terpercaya #1 di Indonesia', 'Deskripsi website', NOW(), NOW()),
('site_tagline', 'Dapatkan Mobil Impian dengan Harga Terbaik', 'Tagline website', NOW(), NOW()),
('contact_email', 'noreply@lelangmobil.com', 'Email kontak', NOW(), NOW()),
('support_email', 'support@lelangmobil.com', 'Email support', NOW(), NOW()),
('contact_phone', '+62 882-0227-83493', 'Nomor telepon', NOW(), NOW()),
('whatsapp_number', '62882022783493', 'Nomor WhatsApp', NOW(), NOW()),
('company_name', 'PT Balai Lelang Mobil', 'Nama perusahaan', NOW(), NOW()),
('company_address', 'Jakarta, Indonesia', 'Alamat perusahaan', NOW(), NOW()),
('kyc_bonus_amount', '2500000', 'Bonus KYC dalam Rupiah', NOW(), NOW()),
('min_bid_increment', '100000', 'Minimum kenaikan bid', NOW(), NOW()),
('platform_fee_percentage', '2.5', 'Fee platform dalam persen', NOW(), NOW())
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = NOW();

-- 3. SEED SEO METADATA
INSERT INTO seo_metadata (page_path, title, description, keywords, og_image, created_at, updated_at)
VALUES 
('/', 
 'LELANGMOBIL.COM - Platform Lelang Mobil Terpercaya #1 di Indonesia', 
 'Dapatkan mobil impian dengan harga terbaik melalui sistem lelang yang aman, transparan, dan terdaftar resmi OJK. Bonus Rp 2.500.000 untuk pengguna baru!',
 ARRAY['lelang mobil', 'jual beli mobil', 'mobil bekas', 'auction mobil', 'mobil murah'],
 '/logo.png',
 NOW(), NOW()),

('/lelang', 
 'Lelang Aktif - LELANGMOBIL.COM', 
 'Lihat semua lelang mobil yang sedang berlangsung. Ribuan mobil berkualitas dengan harga kompetitif.',
 ARRAY['lelang mobil aktif', 'bid mobil', 'lelang online'],
 '/logo.png',
 NOW(), NOW()),

('/tentang', 
 'Tentang Kami - LELANGMOBIL.COM', 
 'PT Balai Lelang Mobil adalah platform lelang mobil terpercaya yang terdaftar resmi dan berkomitmen memberikan layanan terbaik.',
 ARRAY['tentang kami', 'profil perusahaan', 'balai lelang mobil'],
 '/logo.png',
 NOW(), NOW()),

('/faq', 
 'FAQ - Pertanyaan yang Sering Diajukan', 
 'Temukan jawaban untuk pertanyaan umum seputar lelang mobil, pembayaran, dan proses transaksi.',
 ARRAY['faq lelang mobil', 'pertanyaan lelang', 'cara lelang mobil'],
 '/logo.png',
 NOW(), NOW())
ON CONFLICT (page_path) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords,
  updated_at = NOW();

-- 4. VERIFY DATA
SELECT 'Banners' as table_name, COUNT(*) as total FROM site_banners
UNION ALL
SELECT 'Site Settings', COUNT(*) FROM site_settings
UNION ALL
SELECT 'SEO Metadata', COUNT(*) FROM seo_metadata
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Vehicles', COUNT(*) FROM vehicles
UNION ALL
SELECT 'Testimonials', COUNT(*) FROM testimonials;

-- ============================================
-- EXPECTED RESULT:
-- ============================================
-- Banners: 3+
-- Site Settings: 12+
-- SEO Metadata: 4+
-- Users: 5+
-- Vehicles: 3+
-- Testimonials: 24+
-- ============================================
