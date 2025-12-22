-- ============================================
-- DISABLE EMAIL VERIFICATION - QUICK FIX
-- ============================================
-- Script ini akan:
-- 1. Auto-confirm semua user baru
-- 2. Confirm semua user yang belum terverifikasi
-- 3. User bisa langsung login tanpa verifikasi email
-- ============================================

-- Step 1: Auto-confirm semua user yang belum terverifikasi
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Step 2: Buat function untuk auto-confirm user baru
CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-confirm email saat user baru dibuat
  UPDATE auth.users 
  SET email_confirmed_at = NOW()
  WHERE id = NEW.id 
  AND email_confirmed_at IS NULL;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Drop trigger lama jika ada
DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;

-- Step 4: Buat trigger baru untuk auto-confirm
CREATE TRIGGER on_auth_user_created_auto_confirm
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_confirm_user();

-- ============================================
-- VERIFICATION
-- ============================================

-- Check berapa user yang sudah terverifikasi
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as confirmed_users,
  COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as unconfirmed_users
FROM auth.users;

-- ============================================
-- NOTES
-- ============================================
-- ✅ User baru akan otomatis terverifikasi
-- ✅ User lama yang belum verifikasi akan di-confirm
-- ✅ User bisa langsung login tanpa klik link email
-- ✅ Tidak perlu setup SMTP untuk development
-- ⚠️  Untuk production, sebaiknya setup SMTP (lihat EMAIL-SETUP-PRODUCTION.md)
