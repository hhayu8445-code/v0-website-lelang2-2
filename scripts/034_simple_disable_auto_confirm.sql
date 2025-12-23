-- ============================================
-- SIMPLE FIX: DISABLE AUTO-CONFIRM
-- ============================================
-- Jalankan di Supabase SQL Editor
-- ============================================

-- 1. DISABLE AUTO-CONFIRM TRIGGER
DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;
DROP FUNCTION IF EXISTS public.auto_confirm_user();

-- 2. VERIFY - Check if trigger removed
SELECT 
  COUNT(*) as auto_confirm_triggers
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created_auto_confirm';

-- Expected: 0 (trigger removed)

-- 3. CHECK USERS
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as verified_users,
  COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as unverified_users
FROM auth.users;

-- ============================================
-- HASIL:
-- ============================================
-- ✅ Auto-confirm DISABLED
-- ✅ Email verification sekarang WAJIB
-- ✅ Supabase akan kirim email otomatis
-- ============================================

-- ============================================
-- NEXT STEPS (DI DASHBOARD):
-- ============================================
-- 1. Go to: Authentication > Email Templates
-- 2. Pilih "Confirm signup"
-- 3. Klik "Send test email" untuk test
-- 4. Check inbox
-- ============================================
