-- Seed sample data for testing

-- Insert sample vehicles (only if vehicles table is empty)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.vehicles LIMIT 1) THEN
    INSERT INTO public.vehicles (
      brand, model, year, mileage, transmission, fuel_type, color,
      starting_price, current_bid, condition, description, location,
      images, auction_status, auction_start_time, auction_end_time,
      view_count, bid_count
    ) VALUES
    (
      'Toyota', 'Avanza 1.3 G MT', 2020, 45000, 'Manual', 'Bensin', 'Silver',
      150000000, 152000000, 'Excellent',
      'Toyota Avanza 2020 kondisi istimewa, service record lengkap, interior bersih, no accident',
      'Jakarta', 
      ARRAY['/placeholder.svg?height=400&width=600'],
      'live',
      NOW() - INTERVAL '2 days',
      NOW() + INTERVAL '3 days',
      245, 12
    ),
    (
      'Honda', 'CR-V 1.5 Turbo Prestige', 2021, 32000, 'CVT', 'Bensin', 'Black',
      420000000, 425000000, 'Excellent',
      'Honda CR-V Turbo 2021, full original, pajak panjang, kilometer rendah',
      'Surabaya',
      ARRAY['/placeholder.svg?height=400&width=600'],
      'live',
      NOW() - INTERVAL '1 day',
      NOW() + INTERVAL '2 days',
      189, 8
    ),
    (
      'Mitsubishi', 'Xpander Ultimate AT', 2022, 25000, 'Automatic', 'Bensin', 'White',
      265000000, NULL, 'Excellent',
      'Mitsubishi Xpander Ultimate 2022, seperti baru, garansi masih berlaku',
      'Bandung',
      ARRAY['/placeholder.svg?height=400&width=600'],
      'upcoming',
      NOW() + INTERVAL '1 day',
      NOW() + INTERVAL '5 days',
      67, 0
    );
  END IF;
END $$;

-- Insert sample site settings
INSERT INTO public.site_settings (setting_key, setting_value, description) VALUES
  ('contact_email', '"admin@lelangmobil.com"', 'Contact email address'),
  ('contact_phone', '"+6281234567890"', 'Contact phone number'),
  ('kyc_bonus_amount', '50000', 'Bonus amount for KYC verification'),
  ('min_deposit_amount', '100000', 'Minimum deposit amount'),
  ('min_withdrawal_amount', '100000', 'Minimum withdrawal amount')
ON CONFLICT (setting_key) DO NOTHING;

COMMENT ON SCRIPT IS 'Sample data for initial testing and development';
