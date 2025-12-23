-- ============================================
-- CHECK & FIX ALL DATABASE TABLES
-- ============================================

-- 1. CHECK USERS TABLE
SELECT 'USERS TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. CHECK VEHICLES TABLE
SELECT 'VEHICLES TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'vehicles' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. CHECK BIDS TABLE
SELECT 'BIDS TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'bids' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. CHECK TRANSACTIONS TABLE
SELECT 'TRANSACTIONS TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'transactions' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. CHECK KYC_VERIFICATIONS TABLE
SELECT 'KYC_VERIFICATIONS TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'kyc_verifications' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 6. CHECK NOTIFICATIONS TABLE
SELECT 'NOTIFICATIONS TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'notifications' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 7. CHECK TESTIMONIALS TABLE
SELECT 'TESTIMONIALS TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'testimonials' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 8. CHECK SITE_BANNERS TABLE
SELECT 'SITE_BANNERS TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'site_banners' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 9. CHECK SITE_SETTINGS TABLE
SELECT 'SITE_SETTINGS TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'site_settings' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 10. CHECK SEO_METADATA TABLE
SELECT 'SEO_METADATA TABLE' as check_name;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'seo_metadata' AND table_schema = 'public'
ORDER BY ordinal_position;

-- SUMMARY
SELECT 
  'SUMMARY' as report,
  (SELECT COUNT(*) FROM users) as users,
  (SELECT COUNT(*) FROM vehicles) as vehicles,
  (SELECT COUNT(*) FROM bids) as bids,
  (SELECT COUNT(*) FROM transactions) as transactions,
  (SELECT COUNT(*) FROM kyc_verifications) as kyc,
  (SELECT COUNT(*) FROM notifications) as notifications,
  (SELECT COUNT(*) FROM testimonials) as testimonials,
  (SELECT COUNT(*) FROM site_banners) as banners,
  (SELECT COUNT(*) FROM site_settings) as settings,
  (SELECT COUNT(*) FROM seo_metadata) as seo;
