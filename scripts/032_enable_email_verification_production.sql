-- ============================================
-- ENABLE EMAIL VERIFICATION - PRODUCTION MODE
-- ============================================
-- User WAJIB verifikasi email untuk bisa login
-- Email notifikasi akan dikirim otomatis
-- ============================================

-- 1. DISABLE AUTO-CONFIRM (jika ada)
DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;
DROP FUNCTION IF EXISTS public.auto_confirm_user();

-- 2. ENABLE EMAIL CONFIRMATION
-- Supabase akan otomatis kirim email verifikasi
UPDATE auth.config
SET 
  mailer_autoconfirm = false,
  mailer_secure_email_change_enabled = true
WHERE true;

-- 3. VERIFY CONFIGURATION
SELECT 
  mailer_autoconfirm as auto_confirm_disabled,
  mailer_secure_email_change_enabled as secure_email_enabled
FROM auth.config;

-- ============================================
-- EXPECTED RESULT:
-- ============================================
-- auto_confirm_disabled: false (email verification WAJIB)
-- secure_email_enabled: true (email change aman)
-- ============================================

-- ============================================
-- CARA KERJA:
-- ============================================
-- 1. User register dengan email
-- 2. Supabase kirim email verifikasi OTOMATIS
-- 3. User klik link di email
-- 4. Email terverifikasi
-- 5. User bisa login
-- ============================================

-- ============================================
-- NOTES:
-- ============================================
-- ✅ Email verification WAJIB
-- ✅ Notifikasi email otomatis terkirim
-- ✅ Menggunakan Supabase built-in email service
-- ✅ Tidak perlu setup SMTP/Resend
-- ✅ Production ready
-- ============================================
