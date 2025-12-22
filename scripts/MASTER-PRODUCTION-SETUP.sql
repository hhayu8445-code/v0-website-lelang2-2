-- ============================================
-- MASTER SQL SCRIPT - PRODUCTION DEPLOYMENT
-- ============================================
-- Jalankan semua script ini di Supabase SQL Editor
-- Copy paste semua, ganti email, lalu Run
-- ============================================

-- ============================================
-- STEP 1: ENABLE EMAIL VERIFICATION
-- ============================================
-- Hapus auto-confirm trigger untuk enable email verification

DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;
DROP FUNCTION IF EXISTS public.auto_confirm_user();

-- ============================================
-- STEP 2: SETUP ADMIN USER
-- ============================================
-- ⚠️ GANTI 'admin@lelangmobil.com' dengan email Anda!

-- Set user sebagai admin
UPDATE users 
SET 
  is_admin = true,
  role = 'admin',
  kyc_status = 'verified'
WHERE email = 'admin@lelangmobil.com';

-- Verify email admin
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@lelangmobil.com'
AND email_confirmed_at IS NULL;

-- ============================================
-- STEP 3: VERIFICATION
-- ============================================

-- Check admin user
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.is_admin,
  u.role,
  u.kyc_status,
  au.email_confirmed_at
FROM users u
LEFT JOIN auth.users au ON u.id = au.id
WHERE u.email = 'admin@lelangmobil.com';

-- Expected result:
-- is_admin: true
-- role: admin
-- kyc_status: verified
-- email_confirmed_at: NOT NULL

-- Check total users
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN is_admin = true THEN 1 END) as admin_users,
  COUNT(CASE WHEN kyc_status = 'verified' THEN 1 END) as verified_users
FROM users;

-- ============================================
-- NOTES
-- ============================================
-- ✅ Email verification sekarang AKTIF
-- ✅ User baru akan menerima email verifikasi
-- ✅ Admin user sudah di-set
-- ✅ Admin bisa akses /admin panel
-- 
-- NEXT STEPS:
-- 1. Enable email confirmation di Supabase Dashboard
--    (Authentication > Settings > Enable "Confirm email")
-- 2. Clear browser cache & cookies
-- 3. Login dengan email admin
-- 4. Akses: /admin
-- 5. Deploy: vercel --prod
-- ============================================
