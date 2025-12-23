-- ============================================
-- AUTO SETUP EMAIL VERIFICATION - PRODUCTION
-- ============================================
-- Connection: postgresql://postgres.gfghpfrinfhtogzmyddh:DxJNQ6porm23BUGm@aws-1-us-east-1.pooler.supabase.com:6543/postgres
-- ============================================

-- 1. DISABLE AUTO-CONFIRM
DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;
DROP FUNCTION IF EXISTS public.auto_confirm_user();

-- 2. ENABLE EMAIL VERIFICATION (WAJIB)
-- User HARUS verifikasi email sebelum bisa login
DO $$
BEGIN
  -- Enable email confirmation
  UPDATE auth.config
  SET 
    mailer_autoconfirm = false,
    mailer_secure_email_change_enabled = true,
    mailer_otp_exp = 86400
  WHERE true;
  
  RAISE NOTICE '✅ Email verification enabled';
END $$;

-- 3. SETUP EMAIL TEMPLATES
-- Update confirmation email template
DO $$
BEGIN
  -- Set email template configuration
  UPDATE auth.config
  SET 
    mailer_urlpaths_confirmation = '/auth/callback',
    mailer_urlpaths_invite = '/auth/callback',
    mailer_urlpaths_recovery = '/auth/callback',
    mailer_urlpaths_email_change = '/auth/callback'
  WHERE true;
  
  RAISE NOTICE '✅ Email templates configured';
END $$;

-- 4. VERIFY CONFIGURATION
SELECT 
  'Email Verification Status' as setting,
  CASE 
    WHEN mailer_autoconfirm = false THEN '✅ ENABLED (WAJIB)'
    ELSE '❌ DISABLED'
  END as status
FROM auth.config
UNION ALL
SELECT 
  'Secure Email Change' as setting,
  CASE 
    WHEN mailer_secure_email_change_enabled = true THEN '✅ ENABLED'
    ELSE '❌ DISABLED'
  END as status
FROM auth.config
UNION ALL
SELECT 
  'Confirmation URL' as setting,
  mailer_urlpaths_confirmation as status
FROM auth.config;

-- 5. CHECK EXISTING USERS
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as verified_users,
  COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as unverified_users
FROM auth.users;

-- ============================================
-- HASIL:
-- ============================================
-- ✅ Email verification WAJIB
-- ✅ User harus klik link di email
-- ✅ Notifikasi email otomatis terkirim
-- ✅ Production ready
-- ============================================

-- ============================================
-- CARA KERJA:
-- ============================================
-- 1. User register → Email verifikasi terkirim
-- 2. User cek inbox → Klik link
-- 3. Email verified → Bisa login
-- ============================================
