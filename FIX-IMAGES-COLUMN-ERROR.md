# 🔧 FIX: Images Column Missing Error

## ❌ ERROR:
```
Could not find the 'images' column of 'vehicles' in the schema cache
```

## ✅ SOLUSI CEPAT (2 MENIT):

### Step 1: Buka Supabase Dashboard
```
https://supabase.com/dashboard/project/YOUR_PROJECT_ID/editor
```

### Step 2: Jalankan SQL Script
Copy-paste script ini ke SQL Editor:

```sql
-- Add images column if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'vehicles' 
        AND column_name = 'images'
    ) THEN
        ALTER TABLE vehicles ADD COLUMN images TEXT[];
        RAISE NOTICE 'Column images added successfully';
    ELSE
        RAISE NOTICE 'Column images already exists';
    END IF;
END $$;

-- Verify
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'vehicles' 
AND column_name = 'images';
```

### Step 3: Klik "Run"

### Step 4: Refresh Schema Cache
Di Supabase Dashboard:
1. Klik **Settings** (kiri bawah)
2. Klik **API**
3. Scroll ke bawah
4. Klik **Refresh Schema Cache**

---

## 🎯 ALTERNATIF: Full Table Recreation

Jika masih error, jalankan script lengkap:

```sql
-- Drop and recreate vehicles table with all columns
DROP TABLE IF EXISTS vehicles CASCADE;

CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2030),
  mileage INTEGER CHECK (mileage >= 0),
  transmission TEXT CHECK (transmission IN ('Manual', 'Automatic', 'CVT', 'DCT')),
  fuel_type TEXT CHECK (fuel_type IN ('Bensin', 'Diesel', 'Hybrid', 'Electric')),
  color TEXT,
  starting_price DECIMAL(15,2) NOT NULL CHECK (starting_price > 0),
  current_bid DECIMAL(15,2),
  buy_now_price DECIMAL(15,2),
  condition TEXT CHECK (condition IN ('Excellent', 'Good', 'Fair')),
  description TEXT,
  location TEXT,
  images TEXT[],
  documents TEXT[],
  auction_status TEXT DEFAULT 'upcoming' CHECK (auction_status IN ('upcoming', 'live', 'ended', 'sold')),
  auction_start_time TIMESTAMPTZ,
  auction_end_time TIMESTAMPTZ,
  seller_id UUID REFERENCES users(id) ON DELETE SET NULL,
  winner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_vehicles_status ON vehicles(auction_status);
CREATE INDEX idx_vehicles_brand ON vehicles(brand);
CREATE INDEX idx_vehicles_end_time ON vehicles(auction_end_time);

-- RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active vehicles" ON vehicles
  FOR SELECT USING (auction_status IN ('live', 'ended', 'sold'));

CREATE POLICY "Sellers can view own vehicles" ON vehicles
  FOR SELECT USING (auth.uid() = seller_id);

CREATE POLICY "Admins can manage vehicles" ON vehicles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## 📝 VERIFICATION

Setelah menjalankan script, verify dengan:

```sql
-- Check if images column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'vehicles'
ORDER BY ordinal_position;
```

Expected output harus include:
```
images | ARRAY | YES
```

---

## 🚀 SETELAH FIX:

1. ✅ Refresh halaman website
2. ✅ Test upload gambar di admin panel
3. ✅ Verify gambar muncul di listing

---

**File SQL:** `scripts/FIX_ADD_IMAGES_COLUMN.sql`
