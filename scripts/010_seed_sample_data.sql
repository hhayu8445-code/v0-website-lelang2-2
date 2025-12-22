-- Insert sample admin user (password will be set via Supabase Auth)
INSERT INTO users (id, email, full_name, role, kyc_status, wallet_balance)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@lelangmobil.com', 'Admin LELANGMOBIL', 'admin', 'verified', 0);

-- Insert sample vehicles
INSERT INTO vehicles (
  brand, model, year, mileage, transmission, fuel_type, color,
  starting_price, current_bid, buy_now_price, condition, description, location,
  auction_status, auction_start_time, auction_end_time,
  images
) VALUES 
(
  'Toyota', 'Avanza 1.3 G MT', 2020, 45000, 'Manual', 'Bensin', 'Silver Metallic',
  145000000, 152000000, 165000000, 'Excellent',
  'Toyota Avanza 2020 kondisi istimewa, service record lengkap di Auto2000. Pajak panjang, surat-surat lengkap. Interior bersih, eksterior mulus tanpa cacat. Mesin halus, kaki-kaki empuk. Siap pakai untuk keluarga Indonesia.',
  'Jakarta Selatan',
  'live', NOW(), NOW() + INTERVAL '2 days',
  ARRAY['/placeholder.svg?height=400&width=600']
),
(
  'Honda', 'CR-V 1.5 Turbo Prestige', 2021, 28000, 'CVT', 'Bensin', 'White Pearl',
  425000000, NULL, 475000000, 'Excellent',
  'Honda CR-V 2021 Turbo Prestige, full original, km rendah. Fitur lengkap: sunroof, leather seat, Honda Sensing. Kondisi seperti baru, hanya pemakaian pribadi. BPKB, STNK, faktur lengkap.',
  'Surabaya',
  'live', NOW(), NOW() + INTERVAL '3 days',
  ARRAY['/placeholder.svg?height=400&width=600']
),
(
  'Mitsubishi', 'Xpander Ultimate AT', 2022, 15000, 'Automatic', 'Bensin', 'Graphite Gray',
  265000000, 270000000, 285000000, 'Excellent',
  'Mitsubishi Xpander Ultimate 2022, masih seperti baru! KM rendah 15rb, service rutin di Mitsubishi resmi. 7-seater nyaman untuk keluarga. Pajak panjang hingga 2025. Garansi mesin masih berlaku.',
  'Bandung',
  'live', NOW(), NOW() + INTERVAL '1 day',
  ARRAY['/placeholder.svg?height=400&width=600']
),
(
  'BMW', '320i Sport', 2019, 35000, 'Automatic', 'Bensin', 'Black Sapphire',
  485000000, 495000000, 550000000, 'Good',
  'BMW 320i Sport 2019, CBU Germany. Full service record di BMW Astra. Interior kulit asli, fitur lengkap. Performa mesin sangat responsif, handling presisi khas BMW. Perfect untuk executives.',
  'Jakarta Pusat',
  'live', NOW(), NOW() + INTERVAL '4 days',
  ARRAY['/placeholder.svg?height=400&width=600']
),
(
  'Tesla', 'Model 3 Long Range', 2023, 8000, 'Automatic', 'Electric', 'Pearl White',
  825000000, NULL, 950000000, 'Excellent',
  'Tesla Model 3 Long Range 2023, mobil listrik paling efisien! Range 500+ km, autopilot, premium interior. Biaya perawatan sangat rendah, ramah lingkungan. Sudah termasuk charger rumah.',
  'Jakarta',
  'upcoming', NOW() + INTERVAL '1 day', NOW() + INTERVAL '5 days',
  ARRAY['/placeholder.svg?height=400&width=600']
);

-- Insert sample testimonials
INSERT INTO testimonials (user_id, rating, comment, verified_purchase, is_featured)
VALUES 
(
  '00000000-0000-0000-0000-000000000001',
  5,
  'Proses lelang sangat mudah dan transparan. Berhasil dapat Toyota Avanza 2020 dengan harga jauh lebih murah dari pasaran! Tim LELANGMOBIL sangat membantu dari awal hingga proses balik nama.',
  true,
  true
),
(
  '00000000-0000-0000-0000-000000000001',
  5,
  'KYC cepat disetujui, bonusnya langsung masuk 2.5 juta! Sudah 3x ikut lelang di sini, selalu puas. Platform terpercaya dan aman.',
  true,
  true
),
(
  '00000000-0000-0000-0000-000000000001',
  5,
  'Platform terpercaya, customer service responsif 24/7. Mobil yang saya beli kondisinya sesuai dengan deskripsi, bahkan lebih bagus dari foto. Highly recommended!',
  true,
  true
);
