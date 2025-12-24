# 📋 SQL QUICK REFERENCE

## 🎯 MAIN SQL FILE:
**`scripts/COMPLETE_DATABASE_SETUP_CORRECT.sql`** ← GUNAKAN INI!

---

## ⚡ QUICK COMMANDS:

### 1. Setup Database (FULL)
```sql
-- Copy & paste semua isi file:
-- scripts/COMPLETE_DATABASE_SETUP_CORRECT.sql
```

### 2. Add Images Column (If Missing)
```sql
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS images TEXT[];
```

### 3. Create Admin User
```sql
UPDATE public.users 
SET role = 'admin', is_admin = true 
WHERE email = 'your-email@example.com';
```

### 4. Check Tables
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

### 5. Check Images Column
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'vehicles' 
AND column_name = 'images';
```

### 6. View All Columns in Vehicles
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'vehicles'
ORDER BY ordinal_position;
```

### 7. Reset Table (If Error)
```sql
DROP TABLE IF EXISTS vehicles CASCADE;
-- Then run create table script again
```

### 8. Check RLS Policies
```sql
SELECT * FROM pg_policies 
WHERE tablename = 'vehicles';
```

### 9. Enable Realtime
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
```

### 10. Insert Sample Vehicle
```sql
INSERT INTO public.vehicles (
  brand, model, year, mileage, transmission, fuel_type,
  color, starting_price, condition, location, auction_status,
  images, auction_start_time, auction_end_time
) VALUES (
  'Toyota', 'Avanza', 2020, 50000, 'Manual', 'Bensin',
  'Putih', 150000000, 'Good', 'Jakarta', 'live',
  ARRAY['https://placehold.co/800x600'],
  NOW(), NOW() + INTERVAL '7 days'
);
```

---

## 🗂️ TABLE STRUCTURES:

### Users Table
```sql
id, email, phone, full_name, id_card_number, address, city, 
province, postal_code, country, kyc_status, kyc_documents, 
wallet_balance, bonus_balance, auction_participation_count, 
role, is_admin, created_at, updated_at
```

### Vehicles Table
```sql
id, brand, model, year, mileage, transmission, fuel_type, 
color, starting_price, current_bid, buy_now_price, condition, 
description, location, images, documents, auction_status, 
auction_start_time, auction_end_time, seller_id, winner_id, 
view_count, bid_count, created_at, updated_at
```

### Bids Table
```sql
id, vehicle_id, user_id, bid_amount, bid_time, is_auto_bid, 
status, created_at
```

### Transactions Table
```sql
id, user_id, type, amount, status, reference_number, 
payment_method, bank_details, notes, created_at, updated_at
```

### KYC Verifications Table
```sql
id, user_id, id_card_photo, selfie_photo, npwp_number, 
verification_status, admin_notes, verified_at, verified_by, 
created_at, updated_at
```

---

## 🔍 DIAGNOSTIC QUERIES:

### Check All Tables & Row Counts
```sql
SELECT 
  schemaname,
  tablename,
  (SELECT COUNT(*) FROM pg_class WHERE relname = tablename) as row_count
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

### Check Missing Columns
```sql
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('users', 'vehicles', 'bids', 'transactions')
ORDER BY table_name, ordinal_position;
```

### Check Indexes
```sql
SELECT
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

### Check Triggers
```sql
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table;
```

---

## 🚨 COMMON FIXES:

### Fix 1: Images Column Missing
```sql
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
UPDATE vehicles SET images = '{}' WHERE images IS NULL;
```

### Fix 2: Documents Column Missing
```sql
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS documents TEXT[] DEFAULT '{}';
```

### Fix 3: View/Bid Count Missing
```sql
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS bid_count INTEGER DEFAULT 0;
```

### Fix 4: Reset RLS
```sql
DROP POLICY IF EXISTS "Public can view active vehicles" ON vehicles;
CREATE POLICY "Public can view active vehicles" ON vehicles
  FOR SELECT USING (auction_status IN ('live', 'ended', 'sold'));
```

### Fix 5: Recreate Trigger
```sql
DROP TRIGGER IF EXISTS update_vehicles_updated_at ON vehicles;
CREATE TRIGGER update_vehicles_updated_at 
  BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 📦 STORAGE BUCKETS:

### Create Buckets (via Dashboard)
1. **vehicle-images** - Public, 5MB max
2. **kyc-documents** - Private, 5MB max
3. **testimonial-images** - Public, 5MB max

### Or via SQL:
```sql
-- Note: Storage buckets biasanya dibuat via Dashboard
-- Tapi bisa juga via API
```

---

## ✅ VERIFICATION:

### Complete Check
```sql
-- Should return 12
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should return 'images'
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'vehicles' AND column_name = 'images';

-- Should return policies
SELECT COUNT(*) FROM pg_policies WHERE tablename = 'vehicles';
```

---

**Main File:** `scripts/COMPLETE_DATABASE_SETUP_CORRECT.sql`
**Guide:** `DATABASE-SETUP-GUIDE.md`
**This File:** Quick reference untuk copy-paste
