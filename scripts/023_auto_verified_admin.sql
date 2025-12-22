-- AUTO-VERIFIED ADMIN SETUP
-- Email: brothermcc@gmail.com
-- Password: anand123
-- Run this in Supabase SQL Editor

-- 1. Auto-verify and make admin on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  is_admin_email BOOLEAN;
BEGIN
  -- Check if email is admin
  is_admin_email := NEW.email = 'brothermcc@gmail.com';
  
  -- Insert user profile
  INSERT INTO public.users (
    id,
    email,
    full_name,
    phone,
    kyc_status,
    wallet_balance,
    bonus_balance,
    auction_participation_count,
    role,
    is_admin,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 
      CASE WHEN is_admin_email THEN 'Admin' ELSE split_part(NEW.email, '@', 1) END),
    NEW.raw_user_meta_data->>'phone',
    CASE WHEN is_admin_email THEN 'verified' ELSE 'pending' END,
    0,
    CASE WHEN is_admin_email THEN 0 ELSE 2500000 END,
    0,
    CASE WHEN is_admin_email THEN 'admin' ELSE 'user' END,
    is_admin_email,
    NOW(),
    NOW()
  );
  
  -- Auto-verify admin email
  IF is_admin_email THEN
    UPDATE auth.users 
    SET 
      email_confirmed_at = NOW(),
      raw_user_meta_data = jsonb_set(
        COALESCE(raw_user_meta_data, '{}'::jsonb),
        '{is_admin}',
        'true'::jsonb
      )
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop and recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 3. If admin already exists, update to verified
UPDATE auth.users 
SET 
  email_confirmed_at = NOW(),
  raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{is_admin}',
    'true'::jsonb
  )
WHERE email = 'brothermcc@gmail.com';

UPDATE public.users 
SET 
  role = 'admin',
  is_admin = true,
  kyc_status = 'verified',
  full_name = 'Admin'
WHERE email = 'brothermcc@gmail.com';

-- 4. Create admin if not exists
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
)
SELECT 
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'brothermcc@gmail.com',
  crypt('anand123', gen_salt('bf')),
  NOW(),
  '{"full_name": "Admin", "is_admin": true}'::jsonb,
  NOW(),
  NOW(),
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'brothermcc@gmail.com'
);

-- 5. Create profile if not exists
INSERT INTO public.users (
  id,
  email,
  full_name,
  role,
  is_admin,
  kyc_status,
  wallet_balance,
  bonus_balance,
  auction_participation_count,
  created_at,
  updated_at
)
SELECT 
  id,
  'brothermcc@gmail.com',
  'Admin',
  'admin',
  true,
  'verified',
  0,
  0,
  0,
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'brothermcc@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  is_admin = true,
  kyc_status = 'verified',
  full_name = 'Admin';

-- 6. Grant all admin permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Verify admin created
SELECT 
  u.id,
  u.email,
  u.email_confirmed_at,
  p.role,
  p.is_admin,
  p.kyc_status
FROM auth.users u
LEFT JOIN public.users p ON u.id = p.id
WHERE u.email = 'brothermcc@gmail.com';
