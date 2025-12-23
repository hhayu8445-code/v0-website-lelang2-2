-- ============================================
-- QUICK FIX: AUTO-CONFIRM EMAIL (TEMPORARY)
-- ============================================
-- Script ini akan auto-confirm semua email
-- Gunakan untuk testing, disable untuk production
-- ============================================

-- 1. CREATE AUTO-CONFIRM FUNCTION
CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-confirm email
  NEW.email_confirmed_at = NOW();
  NEW.confirmed_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. CREATE TRIGGER
DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;
CREATE TRIGGER on_auth_user_created_auto_confirm
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_confirm_user();

-- 3. VERIFY
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created_auto_confirm';

-- ============================================
-- NOTES:
-- ============================================
-- ✅ Email akan auto-confirmed (tidak perlu klik link)
-- ✅ User bisa langsung login setelah register
-- ⚠️ Untuk production, disable ini dan pakai email verification
-- 
-- Untuk disable (production):
-- DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;
-- DROP FUNCTION IF EXISTS public.auto_confirm_user();
-- ============================================
