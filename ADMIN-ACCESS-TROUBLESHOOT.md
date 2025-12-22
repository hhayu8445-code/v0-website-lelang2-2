# 🔧 TROUBLESHOOTING ADMIN ACCESS

## ❌ MASALAH: Admin Panel Tidak Bisa Dibuka

### Penyebab Umum:
1. User belum di-set sebagai admin di database
2. Email belum verified
3. Browser cache/cookies issue
4. Database connection error

---

## ✅ SOLUSI LENGKAP

### Step 1: Verifikasi Database
Jalankan di Supabase SQL Editor:

```sql
-- Check admin status
SELECT 
  u.email,
  u.email_confirmed_at,
  p.role,
  p.is_admin
FROM auth.users u
LEFT JOIN public.users p ON u.id = p.id
WHERE u.email = 'brothermcc@gmail.com';
```

**Expected Result:**
- email_confirmed_at: NOT NULL ✅
- role: admin ✅
- is_admin: true ✅

### Step 2: Fix Admin Status
Jika hasilnya tidak sesuai, jalankan:

```sql
-- Force update admin
UPDATE public.users 
SET role = 'admin', is_admin = true, kyc_status = 'verified'
WHERE email = 'brothermcc@gmail.com';

UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'brothermcc@gmail.com';
```

### Step 3: Clear Browser Cache
1. Buka browser DevTools (F12)
2. Application > Storage > Clear site data
3. Atau gunakan Incognito/Private mode

### Step 4: Login Ulang
1. Logout dari akun
2. Clear cookies
3. Login kembali dengan:
   - Email: brothermcc@gmail.com
   - Password: anand123

### Step 5: Test Admin Access
1. Setelah login, buka: https://www.lelangmobil.com/admin
2. Atau klik tombol "Admin Dashboard" di sidebar

---

## 🔍 DEBUG MODE

### Check Console Logs
Buka browser console (F12) dan lihat log:

```
✅ "Checking admin status for user: [user-id]"
✅ "Profile data: {is_admin: true, role: 'admin'}"
✅ "Admin access granted"
```

### Jika Muncul Error:
```
❌ "User not authenticated" → Login ulang
❌ "Profile fetch error" → Check database
❌ "User is not admin" → Run SQL fix script
❌ "Users table not ready" → Database belum setup
```

---

## 🚀 QUICK FIX SCRIPT

Jalankan script ini di Supabase:

```sql
-- File: scripts/025_verify_admin_access.sql
-- (Copy seluruh isi file)
```

---

## 📊 VERIFICATION CHECKLIST

### Database:
- [ ] auth.users table exists
- [ ] public.users table exists
- [ ] brothermcc@gmail.com exists in auth.users
- [ ] brothermcc@gmail.com exists in public.users
- [ ] email_confirmed_at is NOT NULL
- [ ] role = 'admin'
- [ ] is_admin = true

### Application:
- [ ] Logged in successfully
- [ ] No console errors
- [ ] Admin layout loads
- [ ] Sidebar shows admin menu

### Access:
- [ ] Can access /admin
- [ ] Can access /admin/users
- [ ] Can access /admin/lelang
- [ ] Can access /admin/transaksi

---

## 🆘 MASIH TIDAK BISA?

### Option 1: Manual Database Check
```sql
-- Get user ID
SELECT id FROM auth.users WHERE email = 'brothermcc@gmail.com';

-- Check profile with ID
SELECT * FROM public.users WHERE id = '[paste-id-here]';
```

### Option 2: Recreate Admin User
```sql
-- Delete existing
DELETE FROM public.users WHERE email = 'brothermcc@gmail.com';
DELETE FROM auth.users WHERE email = 'brothermcc@gmail.com';

-- Run auto-verified admin script
-- File: scripts/023_auto_verified_admin.sql
```

### Option 3: Check RLS Policies
```sql
-- Disable RLS temporarily for testing
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Test access, then re-enable
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

---

## 📞 SUPPORT

Jika masih bermasalah:
1. Check Supabase logs
2. Check browser console
3. Verify environment variables
4. Check network tab for API errors

---

**STATUS**: 🟢 FIXED WITH DETAILED LOGGING
**NEXT**: Run SQL script + Clear cache + Login ulang
