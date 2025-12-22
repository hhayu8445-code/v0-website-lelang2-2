-- ============================================
-- ENABLE EMAIL VERIFICATION - PRODUCTION MODE
-- ============================================
-- Script ini akan:
-- 1. Menghapus auto-confirm trigger
-- 2. Enable email verification untuk user baru
-- 3. Email verifikasi akan dikirim via Resend
-- ============================================

-- Step 1: Drop auto-confirm trigger
DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;

-- Step 2: Drop auto-confirm function
DROP FUNCTION IF EXISTS public.auto_confirm_user();

-- ============================================
-- VERIFICATION
-- ============================================

-- Check status
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as confirmed_users,
  COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as unconfirmed_users
FROM auth.users;

-- ============================================
-- NOTES
-- ============================================
-- ✅ Email verification sekarang AKTIF
-- ✅ User baru akan menerima email verifikasi via Resend
-- ✅ User harus klik link di email untuk verifikasi
-- ✅ Production ready dengan email service
