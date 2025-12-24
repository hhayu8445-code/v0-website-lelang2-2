# 🚀 INSTALL DATABASE - 100% LENGKAP

## ⚡ FILE SQL FINAL:
**`scripts/FINAL_COMPLETE_DATABASE.sql`**

---

## 📋 CARA INSTALL (COPY-PASTE):

### 1️⃣ Buka Supabase SQL Editor
```
1. Login: https://supabase.com
2. Pilih project Anda
3. Klik "SQL Editor" (sidebar kiri)
4. Klik "New Query"
```

### 2️⃣ Copy & Paste Script
```
1. Buka file: scripts/FINAL_COMPLETE_DATABASE.sql
2. Tekan Ctrl+A (select all)
3. Tekan Ctrl+C (copy)
4. Paste ke Supabase SQL Editor
5. Klik "Run" atau Ctrl+Enter
6. Tunggu 30-60 detik
```

### 3️⃣ Verify Success
Jika berhasil, akan muncul:
```
✅ Database setup complete!
✅ total_tables: 12
✅ List of tables: bank_accounts, banners, bids, error_logs, kyc_verifications, notifications, seo_metadata, site_settings, testimonials, transactions, users, vehicles
```

### 4️⃣ Refresh Schema Cache
```
1. Klik "Settings" (kiri bawah)
2. Klik "API"
3. Scroll ke bawah
4. Klik "Refresh Schema Cache"
```

### 5️⃣ Create Admin User
```sql
-- Ganti email dengan email Anda yang sudah register
UPDATE public.users 
SET role = 'admin', is_admin = true 
WHERE email = 'your-email@example.com';
```

---

## ✅ YANG SUDAH INCLUDE:

### 12 Tables:
1. ✅ users - User profiles
2. ✅ vehicles - Kendaraan (WITH images column!)
3. ✅ bids - Bidding history
4. ✅ transactions - Wallet transactions
5. ✅ kyc_verifications - KYC documents
6. ✅ testimonials - Customer reviews
7. ✅ notifications - User notifications
8. ✅ bank_accounts - Bank accounts
9. ✅ site_settings - Site configuration
10. ✅ banners - CMS banners
11. ✅ seo_metadata - SEO data
12. ✅ error_logs - Error monitoring

### Features:
- ✅ All indexes for performance
- ✅ RLS policies for security
- ✅ Triggers for auto-update
- ✅ Realtime enabled
- ✅ Foreign keys & constraints
- ✅ Default values
- ✅ Initial site settings

---

## 🔧 SETELAH INSTALL:

### Test Query:
```sql
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check images column
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'vehicles' 
AND column_name = 'images';

-- Should return: images | ARRAY
```

### Insert Sample Vehicle:
```sql
INSERT INTO public.vehicles (
  brand, model, year, mileage, transmission, fuel_type,
  color, starting_price, condition, location, auction_status,
  images, auction_start_time, auction_end_time
) VALUES (
  'Toyota', 'Avanza', 2020, 50000, 'Manual', 'Bensin',
  'Putih', 150000000, 'Good', 'Jakarta', 'live',
  ARRAY['https://placehold.co/800x600/png'],
  NOW(), NOW() + INTERVAL '7 days'
);
```

---

## 🎯 STORAGE BUCKETS:

### Create via Dashboard:
```
1. Klik "Storage" (sidebar)
2. Klik "New bucket"
3. Create 3 buckets:

Bucket 1:
- Name: vehicle-images
- Public: YES
- File size limit: 5MB

Bucket 2:
- Name: kyc-documents
- Public: NO
- File size limit: 5MB

Bucket 3:
- Name: testimonial-images
- Public: YES
- File size limit: 5MB
```

---

## ⚠️ TROUBLESHOOTING:

### Error: "relation already exists"
```
Itu normal! Script sudah handle dengan DROP TABLE IF EXISTS.
Jalankan ulang script dari awal.
```

### Error: "permission denied"
```
Pastikan Anda login sebagai owner project.
Check di Settings → Database
```

### Error: "function does not exist"
```
Jalankan script dari AWAL sampai AKHIR.
Jangan skip bagian manapun.
```

---

## 📊 VERIFICATION CHECKLIST:

- [ ] 12 tables created
- [ ] Images column exists in vehicles
- [ ] RLS policies active
- [ ] Indexes created
- [ ] Triggers working
- [ ] Realtime enabled
- [ ] Site settings inserted
- [ ] Admin user created
- [ ] Storage buckets created
- [ ] Sample data inserted (optional)

---

## 🎉 SELESAI!

Setelah semua checklist ✅, database Anda siap 100%!

**Next Steps:**
1. ✅ Database setup complete
2. ⏭️ Set environment variables (.env.local)
3. ⏭️ Test website: `npm run dev`
4. ⏭️ Deploy to production

---

**File:** `scripts/FINAL_COMPLETE_DATABASE.sql`
**Status:** TESTED & WORKING ✅
**Time:** 5 minutes
