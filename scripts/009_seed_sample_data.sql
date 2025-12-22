-- Seed sample data for testing
-- Note: Run this after all tables are created

-- Insert sample admin user
INSERT INTO users (id, email, full_name, role, kyc_status, wallet_balance)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@wmain.com', 'Admin WMAIN', 'admin', 'verified', 0),
  ('00000000-0000-0000-0000-000000000002', 'user1@example.com', 'John Doe', 'user', 'verified', 5000000),
  ('00000000-0000-0000-0000-000000000003', 'user2@example.com', 'Jane Smith', 'user', 'verified', 3000000),
  ('00000000-0000-0000-0000-000000000004', 'user3@example.com', 'Bob Wilson', 'user', 'pending', 0)
ON CONFLICT (id) DO NOTHING;

-- Insert sample vehicles
INSERT INTO vehicles (id, brand, model, year, mileage, transmission, fuel_type, color, starting_price, current_bid, condition, description, location, images, auction_status, auction_start_time, auction_end_time, seller_id)
VALUES 
  (
    '10000000-0000-0000-0000-000000000001',
    'Toyota',
    'Avanza 1.3 G MT',
    2020,
    45000,
    'Manual',
    'Bensin',
    'Silver Metalik',
    150000000,
    165000000,
    'Excellent',
    'Toyota Avanza 2020 kondisi istimewa, service rutin di Auto2000, surat lengkap, pajak hidup, siap pakai.',
    'Jakarta Selatan',
    ARRAY['/placeholder.svg?height=400&width=600'],
    'live',
    NOW() - INTERVAL '2 days',
    NOW() + INTERVAL '3 days',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'Honda',
    'Jazz RS CVT',
    2019,
    38000,
    'CVT',
    'Bensin',
    'White Pearl',
    185000000,
    195000000,
    'Excellent',
    'Honda Jazz RS 2019 full original, terawat, kilometer rendah, interior bersih.',
    'Bandung',
    ARRAY['/placeholder.svg?height=400&width=600'],
    'live',
    NOW() - INTERVAL '1 day',
    NOW() + INTERVAL '5 days',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'Mitsubishi',
    'Xpander Ultimate AT',
    2021,
    25000,
    'Automatic',
    'Bensin',
    'Graphite Grey',
    245000000,
    NULL,
    'Excellent',
    'Mitsubishi Xpander Ultimate 2021 seperti baru, masih garansi, full service record.',
    'Surabaya',
    ARRAY['/placeholder.svg?height=400&width=600'],
    'upcoming',
    NOW() + INTERVAL '2 days',
    NOW() + INTERVAL '7 days',
    '00000000-0000-0000-0000-000000000001'
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'Daihatsu',
    'Terios X MT',
    2018,
    65000,
    'Manual',
    'Bensin',
    'Dark Grey',
    145000000,
    152000000,
    'Good',
    'Daihatsu Terios 2018 kondisi bagus, mesin sehat, AC dingin, cocok untuk keluarga.',
    'Tangerang',
    ARRAY['/placeholder.svg?height=400&width=600'],
    'live',
    NOW() - INTERVAL '3 days',
    NOW() + INTERVAL '1 day',
    '00000000-0000-0000-0000-000000000001'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample bids
INSERT INTO bids (vehicle_id, user_id, bid_amount, bid_time, status)
VALUES 
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 155000000, NOW() - INTERVAL '1 day', 'outbid'),
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 160000000, NOW() - INTERVAL '12 hours', 'outbid'),
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 165000000, NOW() - INTERVAL '6 hours', 'active'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 190000000, NOW() - INTERVAL '8 hours', 'outbid'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 195000000, NOW() - INTERVAL '4 hours', 'active'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000003', 150000000, NOW() - INTERVAL '2 days', 'outbid'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 152000000, NOW() - INTERVAL '1 day', 'active');

-- Insert sample transactions
INSERT INTO transactions (user_id, type, amount, status, reference_number, payment_method, description)
VALUES 
  ('00000000-0000-0000-0000-000000000002', 'kyc_bonus', 100000, 'completed', 'BONUS-001', NULL, 'Bonus verifikasi KYC'),
  ('00000000-0000-0000-0000-000000000002', 'deposit', 5000000, 'completed', 'DEP-001', 'BCA', 'Top up saldo'),
  ('00000000-0000-0000-0000-000000000003', 'kyc_bonus', 100000, 'completed', 'BONUS-002', NULL, 'Bonus verifikasi KYC'),
  ('00000000-0000-0000-0000-000000000003', 'deposit', 3000000, 'completed', 'DEP-002', 'Mandiri', 'Top up saldo');

-- Insert sample testimonials
INSERT INTO testimonials (user_id, vehicle_id, rating, comment, verified_purchase, is_featured)
VALUES 
  ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 5, 'Proses lelang sangat mudah dan transparan. Mobilnya sesuai dengan deskripsi!', true, true),
  ('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 5, 'Pelayanan cepat, mobil berkualitas. Recommended!', true, true);

-- Insert sample bank accounts
INSERT INTO bank_accounts (user_id, bank_name, account_number, account_holder_name, verification_status, is_primary)
VALUES 
  ('00000000-0000-0000-0000-000000000002', 'BCA', '1234567890', 'John Doe', 'verified', true),
  ('00000000-0000-0000-0000-000000000003', 'Mandiri', '9876543210', 'Jane Smith', 'verified', true);

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, read_status)
VALUES 
  ('00000000-0000-0000-0000-000000000002', 'bid_outbid', 'Bid Anda Terlampaui', 'Bid Anda untuk Toyota Avanza 2020 telah terlampaui. Tingkatkan bid Anda!', false),
  ('00000000-0000-0000-0000-000000000003', 'auction_ending', 'Lelang Segera Berakhir', 'Lelang Honda Jazz RS 2019 akan berakhir dalam 24 jam!', false),
  ('00000000-0000-0000-0000-000000000002', 'kyc_approved', 'KYC Disetujui', 'Selamat! Verifikasi KYC Anda telah disetujui. Bonus Rp 100.000 telah ditambahkan.', true);
