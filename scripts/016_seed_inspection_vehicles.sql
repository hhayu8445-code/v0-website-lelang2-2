-- Seed vehicles from inspection JSON data
-- All vehicles are ready for auction with inspection details

-- Vehicle 1: Toyota Avanza 2015 (Grade B)
INSERT INTO vehicles (
  brand, model, year, mileage, transmission, fuel_type, color,
  starting_price, current_bid, bid_count, condition, description,
  location, auction_status, auction_start_time, auction_end_time,
  images, seller_id
) VALUES (
  'Toyota', 'Avanza 1.3 G MT', 2015, 125000, 'Manual', 'Bensin', 'Silver',
  95000000, 95000000, 0, 'Baik',
  'Bebas banjir, Bebas tabrakan, AC tidak dingin, Pajak mati, Kunci 1, Buku manual dan service TA, Mobil full cat ulang, Service radiator dibutuhkan. Grade Total: B (3.15/5). Kepemilikan: Tangan 1, STNK berlaku sampai 13 Oktober 2025.',
  'Jakarta Selatan', 'live',
  NOW() - INTERVAL '2 hours',
  NOW() + INTERVAL '5 days',
  ARRAY[
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/TABRAKAN-TABRAKANBESAR_2-IMAGE098931764750042440TABRAKAN-TABRAKANBESAR_2-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224056Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=32fe0f4782ed2f26833e088f1cc6e068931c7973c56ef7a13a06f494ad91f654',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/EXTERIOR-EXTERIOR_1-IMAGE089021764750535873EXTERIOR-EXTERIOR_1-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224056Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=e725b34835691c9a52d92512de6ab884c590664f5850d7e27c69a230ddf2253a',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/EXTERIOR-EXTERIOR_2-IMAGE099361764750541475EXTERIOR-EXTERIOR_2-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224056Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=b233466cd843940f6203f13dad287894003ae60b14970cbdfd0891959376b366',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/INTERIOR-INTERIOR_64-IMAGE029731764750812708INTERIOR-INTERIOR_64-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224056Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=dc6dadf7aee19421e91951dcc9c35ebdd6eba6a72b8b13aa5286a6e16d31d4c6',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/MESIN-MESIN_5-IMAGE012051764751139045MESIN-MESIN_5-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224056Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=a7b6ea3ccab50bfc021d44decb47d1c3f66631b299e5bf71f2da44fab9a196ef'
  ],
  (SELECT id FROM users WHERE email = 'admin@lelangmobil.com' LIMIT 1)
);

-- Vehicle 2: Honda Jazz 2018 (Grade A)
INSERT INTO vehicles (
  brand, model, year, mileage, transmission, fuel_type, color,
  starting_price, current_bid, bid_count, condition, description,
  location, auction_status, auction_start_time, auction_end_time,
  images, seller_id
) VALUES (
  'Honda', 'Jazz 1.5 RS CVT', 2018, 45000, 'Automatic', 'Bensin', 'Merah',
  185000000, 185000000, 0, 'Sangat Baik',
  'Bebas banjir, Bebas tabrakan, AC dingin, Buku manual dan service TA, STNK TA (tentative), Kunci 1, Siap pakai. Grade Total: A (5.00/5). Kepemilikan: Tangan 1, STNK berlaku sampai 18 Maret 2026.',
  'Jakarta Pusat', 'live',
  NOW() - INTERVAL '1 hour',
  NOW() + INTERVAL '6 days',
  ARRAY[
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/TABRAKAN-TABRAKANBESAR_5-IMAGE040821764218191326TABRAKAN-TABRAKANBESAR_5-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224037Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=9cceedf7c17cab3bec2fc20c8a6aabe2d5a2b55d03e5c5df406b06d17d31308c',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/EXTERIOR-EXTERIOR_1-IMAGE049151764218463249EXTERIOR-EXTERIOR_1-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224037Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=19fa593e7d7d0fcb08030fad9392f9cb57638f895f21d1e78a0eb5a16d0f49ff',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/EXTERIOR-EXTERIOR_2-IMAGE013131764218472854EXTERIOR-EXTERIOR_2-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224037Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=2b6cf80f46d72ae7aea0dca4ebc8bbcb508ee4f1a5a3e4ad260c9584a457442a',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/INTERIOR-INTERIOR_18-IMAGE036001764218633913INTERIOR-INTERIOR_18-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224037Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=5f318c6c9acf6c6223bfcf0240b1bf1520737ccb6514e61d9a269812bd16b9e4',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/MESIN-MESIN_1-IMAGE072521764218845454MESIN-MESIN_1-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224037Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8d7651734b42d264f54ee06eba3e080f7c37f6d16d4baa5f4cb27af5e2eb5e74'
  ],
  (SELECT id FROM users WHERE email = 'admin@lelangmobil.com' LIMIT 1)
);

-- Vehicle 3: Daihatsu Xenia 2020 (Grade A)
INSERT INTO vehicles (
  brand, model, year, mileage, transmission, fuel_type, color,
  starting_price, current_bid, bid_count, condition, description,
  location, auction_status, auction_start_time, auction_end_time,
  images, seller_id
) VALUES (
  'Daihatsu', 'Xenia 1.3 R MT', 2020, 35000, 'Manual', 'Bensin', 'Hitam',
  145000000, 145000000, 0, 'Sangat Baik',
  'Bebas banjir, Bebas tabrakan, AC dingin, Pajak mati, Kunci 1, Buku manual dan service lengkap, Mobil matic agak delay. Grade Total: A (4.40/5). Kepemilikan: Tangan 1, STNK berlaku sampai 16 Mei 2025.',
  'Tangerang', 'live',
  NOW() - INTERVAL '3 hours',
  NOW() + INTERVAL '4 days',
  ARRAY[
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/TABRAKAN-TABRAKANBESAR_1-IMAGE096881764838767196TABRAKAN-TABRAKANBESAR_1-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224006Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=01f20af6267ca477d6f0f9bd8738eebb08b8c7141f919e948700497f3b9b6353',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/EXTERIOR-EXTERIOR_1-IMAGE000131764839289038EXTERIOR-EXTERIOR_1-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224006Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=84045833633b2490854d440c912aa39677f3c7740574a6cee9d7816a50ddf9b6',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/EXTERIOR-EXTERIOR_2-IMAGE003551764839295669EXTERIOR-EXTERIOR_2-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224006Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c51581beb5aa3dc2edcfff3eab7e8106e3f760253ea3ac38e74d8d2372bb3d85',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/INTERIOR-INTERIOR_18-IMAGE054721764839484471INTERIOR-INTERIOR_18-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224006Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=4619f3ac91a27d9fe76b5b280b545508ac4a1c765d39b646f1eebf9469a92948',
    'https://miniov2api.djubli.com/djublee-aldy/djublee/images/InspectorImages/MESIN-MESIN_1-IMAGE005481764839777405MESIN-MESIN_1-IMAGE0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioDjublee%2F20251215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251215T224006Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=11fbb60d4c0efcdb7ea8b5347fb25b266e3c15aced5f11de060e617e9ceccc16'
  ],
  (SELECT id FROM users WHERE email = 'admin@lelangmobil.com' LIMIT 1)
);

-- Add more vehicles with upcoming auctions (scheduled)
INSERT INTO vehicles (
  brand, model, year, mileage, transmission, fuel_type, color,
  starting_price, current_bid, bid_count, condition, description,
  location, auction_status, auction_start_time, auction_end_time,
  images, seller_id
) VALUES 
-- Vehicle 4: Mitsubishi Pajero Sport 2019
(
  'Mitsubishi', 'Pajero Sport Dakar 4x2 AT', 2019, 65000, 'Automatic', 'Diesel', 'Putih',
  385000000, 385000000, 0, 'Sangat Baik',
  'SUV premium dengan fitur lengkap, bebas banjir dan tabrakan, AC dingin, service rutin, kondisi prima. Inspeksi lengkap tersedia.',
  'Jakarta Selatan', 'scheduled',
  NOW() + INTERVAL '12 hours',
  NOW() + INTERVAL '7 days',
  ARRAY[
    'https://images.carsome.id/carlist/tr:w-375,h-244,q-60,c-at_max/image/62023/mitsubishi-pajero-sport-1695624634.webp',
    'https://images.carsome.id/carlist/tr:w-375,h-244,q-60,c-at_max/image/62023/mitsubishi-pajero-sport-1695624635.webp'
  ],
  (SELECT id FROM users WHERE email = 'admin@lelangmobil.com' LIMIT 1)
),
-- Vehicle 5: Suzuki Ertiga 2021
(
  'Suzuki', 'Ertiga GX AT', 2021, 28000, 'Automatic', 'Bensin', 'Silver',
  195000000, 195000000, 0, 'Sangat Baik',
  'MPV irit dan luas, kondisi sangat terawat, service record lengkap di dealer resmi, AC dingin, siap pakai untuk keluarga.',
  'Bekasi', 'scheduled',
  NOW() + INTERVAL '18 hours',
  NOW() + INTERVAL '7 days',
  ARRAY[
    'https://images.carsome.id/carlist/tr:w-375,h-244,q-60,c-at_max/image/50695/suzuki-ertiga-1660128832.webp',
    'https://images.carsome.id/carlist/tr:w-375,h-244,q-60,c-at_max/image/50695/suzuki-ertiga-1660128833.webp'
  ],
  (SELECT id FROM users WHERE email = 'admin@lelangmobil.com' LIMIT 1)
),
-- Vehicle 6: Toyota Rush 2020
(
  'Toyota', 'Rush 1.5 S TRD Sportivo AT', 2020, 42000, 'Automatic', 'Bensin', 'Hitam',
  215000000, 215000000, 0, 'Baik',
  'SUV kompak dengan ground clearance tinggi, cocok untuk jalanan Indonesia. Full service record, bebas banjir dan tabrakan.',
  'Tangerang', 'scheduled',
  NOW() + INTERVAL '1 day',
  NOW() + INTERVAL '8 days',
  ARRAY[
    'https://images.carsome.id/carlist/tr:w-375,h-244,q-60,c-at_max/image/46698/toyota-rush-1647326442.webp',
    'https://images.carsome.id/carlist/tr:w-375,h-244,q-60,c-at_max/image/46698/toyota-rush-1647326443.webp'
  ],
  (SELECT id FROM users WHERE email = 'admin@lelangmobil.com' LIMIT 1)
),
-- Vehicle 7: Honda CR-V 2018
(
  'Honda', 'CR-V 1.5 Turbo Prestige', 2018, 58000, 'Automatic', 'Bensin', 'Abu-abu',
  365000000, 365000000, 0, 'Sangat Baik',
  'SUV premium Honda dengan turbo engine, fitur safety lengkap, interior mewah, kondisi istimewa.',
  'Jakarta Selatan', 'scheduled',
  NOW() + INTERVAL '1 day 6 hours',
  NOW() + INTERVAL '8 days',
  ARRAY[
    'https://images.carsome.id/carlist/tr:w-375,h-244,q-60,c-at_max/image/68925/honda-cr-v-1704956403.webp',
    'https://images.carsome.id/carlist/tr:w-375,h-244,q-60,c-at_max/image/68925/honda-cr-v-1704956404.webp'
  ],
  (SELECT id FROM users WHERE email = 'admin@lelangmobil.com' LIMIT 1)
);

-- Update next.config.mjs to include miniov2api.djubli.com as allowed image domain
COMMENT ON TABLE vehicles IS 'Vehicle auction data with inspection reports and images from miniov2api.djubli.com';
