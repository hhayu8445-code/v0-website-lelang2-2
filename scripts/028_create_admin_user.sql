-- ============================================
-- CREATE ADMIN USER - PRODUCTION
-- ============================================
-- Script ini akan:
-- 1. Membuat admin user jika belum ada
-- 2. Set user yang sudah ada menjadi admin
-- 3. Auto-verify admin user
-- ============================================

-- OPTION 1: Set user yang sudah ada menjadi admin
-- Ganti 'admin@lelangmobil.com' dengan email Anda

UPDATE users 
SET 
  is_admin = true,
  role = 'admin',
  kyc_status = 'verified'
WHERE email = 'admin@lelangmobil.com';

-- Verify admin user di auth.users juga
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@lelangmobil.com'
AND email_confirmed_at IS NULL;

-- ============================================
-- OPTION 2: Jika belum punya user, daftar dulu
-- ============================================
-- 1. Buka website: /register
-- 2. Daftar dengan email: admin@lelangmobil.com
-- 3. Jalankan script di atas untuk set sebagai admin
-- 4. Login dengan akun tersebut
-- 5. Akses: /admin

-- ============================================
-- VERIFICATION
-- ============================================

-- Check admin users
SELECT 
  id,
  email,
  full_name,
  is_admin,
  role,
  kyc_status,
  created_at
FROM users
WHERE is_admin = true OR role = 'admin';

-- Check auth status
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'admin@lelangmobil.com';

-- ============================================
-- NOTES
-- ============================================
-- ✅ Ganti 'admin@lelangmobil.com' dengan email Anda
-- ✅ User harus sudah terdaftar terlebih dahulu
-- ✅ Setelah jadi admin, bisa akses /admin
-- ✅ Admin bisa manage semua fitur
