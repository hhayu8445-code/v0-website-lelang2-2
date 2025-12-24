# 🗄️ DATABASE SETUP - STEP BY STEP

## ✅ SQL YANG BENAR & LENGKAP

File: **`scripts/COMPLETE_DATABASE_SETUP_CORRECT.sql`**

---

## 🚀 CARA INSTALL (5 MENIT):

### Step 1: Buka Supabase Dashboard
```
1. Login ke https://supabase.com
2. Pilih project Anda
3. Klik "SQL Editor" di sidebar kiri
```

### Step 2: Jalankan SQL Script
```
1. Klik "New Query"
2. Copy SEMUA isi file: scripts/COMPLETE_DATABASE_SETUP_CORRECT.sql
3. Paste ke SQL Editor
4. Klik "Run" atau tekan Ctrl+Enter
5. Tunggu sampai selesai (±30 detik)
```

### Step 3: Refresh Schema Cache
```
1. Klik "Settings" (kiri bawah)
2. Klik "API"
3. Scroll ke bawah
4. Klik "Refresh Schema Cache"
```

### Step 4: Setup Storage Buckets
```
1. Klik "Storage" di sidebar
2. Create bucket: "vehicle-images" (Public)
3. Create bucket: "kyc-documents" (Private)
4. Create bucket: "testimonial-images" (Public)
```

### Step 5: Verify Installation
```sql
-- Jalankan query ini untuk verify:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Harus muncul 12 tables:
-- 1. bank_accounts
-- 2. banners
-- 3. bids
-- 4. error_logs
-- 5. kyc_verifications
-- 6. notifications
-- 7. seo_metadata
-- 8. site_settings
-- 9. testimonials
-- 10. transactions
-- 11. users
-- 12. vehicles
```

---

## 📊 STRUKTUR DATABASE:

### 12 Tables:

1. **users** - User profiles (extended from auth.users)
2. **vehicles** - Kendaraan lelang
3. **bids** - Riwayat bidding
4. **transactions** - Transaksi wallet
5. **kyc_verifications** - Verifikasi KYC
6. **testimonials** - Testimoni customer
7. **notifications** - Notifikasi user
8. **bank_accounts** - Rekening bank user
9. **site_settings** - Pengaturan website
10. **banners** - Banner CMS
11. **seo_metadata** - SEO data
12. **error_logs** - Error monitoring

---

## 🔑 FITUR YANG SUDAH INCLUDE:

### ✅ Row Level Security (RLS)
- Users hanya bisa lihat data sendiri
- Admin bisa lihat semua data
- Public bisa lihat data yang aktif

### ✅ Indexes
- Optimasi query untuk performa
- Index pada kolom yang sering di-query

### ✅ Triggers
- Auto update `updated_at` timestamp
- Auto create user profile saat signup

### ✅ Realtime
- Vehicles updates
- Bids updates
- Notifications
- Transactions

### ✅ Validations
- Check constraints untuk data integrity
- Foreign keys untuk relasi
- Default values

---

## 🔧 SETELAH INSTALL:

### 1. Create Admin User
```sql
-- Ganti email dengan email Anda
UPDATE public.users 
SET role = 'admin', is_admin = true 
WHERE email = 'your-email@example.com';
```

### 2. Test Query
```sql
-- Test vehicles table
SELECT * FROM public.vehicles LIMIT 5;

-- Test users table
SELECT id, email, role, kyc_status FROM public.users;

-- Check images column
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'vehicles';
```

### 3. Insert Sample Data (Optional)
```sql
-- Insert sample vehicle
INSERT INTO public.vehicles (
  brand, model, year, mileage, transmission, fuel_type,
  color, starting_price, condition, location, auction_status,
  images, auction_start_time, auction_end_time
) VALUES (
  'Toyota', 'Avanza', 2020, 50000, 'Manual', 'Bensin',
  'Putih', 150000000, 'Good', 'Jakarta', 'live',
  ARRAY['https://example.com/image1.jpg'],
  NOW(), NOW() + INTERVAL '7 days'
);
```

---

## ⚠️ TROUBLESHOOTING:

### Error: "relation already exists"
```sql
-- Hapus table yang error, lalu run ulang
DROP TABLE IF EXISTS table_name CASCADE;
```

### Error: "permission denied"
```
- Pastikan Anda login sebagai owner project
- Check di Settings → Database → Connection pooling
```

### Error: "images column not found"
```sql
-- Add column manually
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS images TEXT[];

-- Refresh schema cache
-- Settings → API → Refresh Schema Cache
```

---

## 📝 VERIFICATION CHECKLIST:

- [ ] 12 tables created
- [ ] All indexes created
- [ ] RLS policies active
- [ ] Triggers working
- [ ] Storage buckets created
- [ ] Realtime enabled
- [ ] Admin user created
- [ ] Sample data inserted (optional)

---

## 🎯 NEXT STEPS:

1. ✅ Database setup complete
2. ⏭️ Set environment variables
3. ⏭️ Test website locally
4. ⏭️ Deploy to production

---

**File SQL:** `scripts/COMPLETE_DATABASE_SETUP_CORRECT.sql`
**Status:** READY TO USE ✅
**Tested:** YES ✅
**Production Ready:** YES ✅
