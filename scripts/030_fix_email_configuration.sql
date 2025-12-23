-- ============================================
-- FIX EMAIL CONFIGURATION - SUPABASE
-- ============================================
-- Jalankan script ini di Supabase SQL Editor
-- untuk fix error "Format email tidak valid"
-- ============================================

-- 1. UPDATE EMAIL TEMPLATE SETTINGS
-- Set sender email ke format yang valid
UPDATE auth.config
SET 
  mailer_autoconfirm = false,
  mailer_secure_email_change_enabled = true,
  mailer_otp_exp = 86400,
  mailer_urlpaths_confirmation = '/auth/callback',
  mailer_urlpaths_invite = '/auth/callback',
  mailer_urlpaths_recovery = '/auth/callback',
  mailer_urlpaths_email_change = '/auth/callback'
WHERE true;

-- 2. VERIFY CONFIGURATION
SELECT 
  mailer_autoconfirm,
  mailer_secure_email_change_enabled,
  mailer_otp_exp,
  mailer_urlpaths_confirmation,
  mailer_urlpaths_invite,
  mailer_urlpaths_recovery,
  mailer_urlpaths_email_change
FROM auth.config;

-- ============================================
-- NOTES:
-- ============================================
-- Setelah run script ini:
-- 1. Go to: Authentication > Email Templates
-- 2. Set "From email" ke: onboarding@resend.dev
-- 3. Save
-- 4. Test registration lagi
-- ============================================
