-- ADD ADDRESS FIELDS TO USERS TABLE
-- Run this in Supabase SQL Editor

-- 1. Add address columns
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS province TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Indonesia';

-- 2. Update admin profile with full address
UPDATE public.users 
SET 
  full_name = 'Admin LELANGMOBIL.COM',
  phone = '+6281234567890',
  address = 'Jl. Sudirman No. 123, Kav. 45-46',
  city = 'Jakarta Selatan',
  province = 'DKI Jakarta',
  postal_code = '12190',
  country = 'Indonesia'
WHERE email = 'brothermcc@gmail.com';

-- 3. Update trigger to include address
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  is_admin_email BOOLEAN;
BEGIN
  is_admin_email := NEW.email = 'brothermcc@gmail.com';
  
  INSERT INTO public.users (
    id, email, full_name, phone,
    address, city, province, postal_code, country,
    kyc_status, wallet_balance, bonus_balance,
    auction_participation_count, role, is_admin,
    created_at, updated_at
  )
  VALUES (
    NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 
      CASE WHEN is_admin_email THEN 'Admin LELANGMOBIL.COM' 
      ELSE split_part(NEW.email, '@', 1) END),
    COALESCE(NEW.raw_user_meta_data->>'phone',
      CASE WHEN is_admin_email THEN '+6281234567890' ELSE NULL END),
    CASE WHEN is_admin_email THEN 'Jl. Sudirman No. 123, Kav. 45-46' ELSE NULL END,
    CASE WHEN is_admin_email THEN 'Jakarta Selatan' ELSE NULL END,
    CASE WHEN is_admin_email THEN 'DKI Jakarta' ELSE NULL END,
    CASE WHEN is_admin_email THEN '12190' ELSE NULL END,
    'Indonesia',
    CASE WHEN is_admin_email THEN 'verified' ELSE 'pending' END,
    0,
    CASE WHEN is_admin_email THEN 0 ELSE 2500000 END,
    0,
    CASE WHEN is_admin_email THEN 'admin' ELSE 'user' END,
    is_admin_email,
    NOW(), NOW()
  );
  
  IF is_admin_email THEN
    UPDATE auth.users 
    SET email_confirmed_at = NOW(),
        raw_user_meta_data = jsonb_set(
          COALESCE(raw_user_meta_data, '{}'::jsonb),
          '{is_admin}', 'true'::jsonb
        )
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
