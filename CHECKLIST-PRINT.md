# ✅ CHECKLIST SEDERHANA - PRINT & IKUTI

## 📋 SETUP SUPABASE (18 menit)

### Step 1: Buat Project (5 min)
```
[ ] Buka: https://supabase.com/dashboard
[ ] Login/Register
[ ] Klik "New Project"
[ ] Nama: lelangmobil
[ ] Password: _________________ (SIMPAN!)
[ ] Region: Southeast Asia
[ ] Klik "Create"
[ ] Tunggu 2-3 menit
```

### Step 2: Copy API Keys (2 min)
```
[ ] Klik Settings → API
[ ] Copy Project URL: _________________
[ ] Copy anon key: _________________
[ ] Copy service_role key: _________________
```

### Step 3: Update .env.local (1 min)
```
[ ] Buka file: .env.local
[ ] Paste 3 keys di atas
[ ] Save (Ctrl+S)
```

### Step 4: Run SQL (5 min)
```
[ ] Klik SQL Editor → New query
[ ] Buka: scripts/DATABASE_100_PERCENT_FINAL.sql
[ ] Copy all (Ctrl+A, Ctrl+C)
[ ] Paste di SQL Editor
[ ] Klik Run (Ctrl+Enter)
[ ] Tunggu selesai
[ ] Verify: Table Editor → 12 tables
```

### Step 5: Create Storage (5 min)
```
[ ] Klik Storage
[ ] Create bucket: "vehicles" (Public: YES)
[ ] Create bucket: "kyc-documents" (Public: NO)
```

---

## 🧪 TEST LOCAL (10 menit)

### Step 6: Run Dev Server (5 min)
```
[ ] Terminal: npm run dev
[ ] Buka: http://localhost:3000
[ ] Homepage muncul tanpa error
[ ] Console (F12) tidak ada error merah
```

### Step 7: Test Register & Login (5 min)
```
[ ] Klik "Daftar"
[ ] Isi form register
[ ] Email: _________________ (SIMPAN!)
[ ] Password: _________________ (SIMPAN!)
[ ] Submit
[ ] Login dengan email/password di atas
[ ] Berhasil masuk dashboard
```

### Step 8: Create Admin (2 min)
```
[ ] Buka: scripts/CREATE-ADMIN-SIMPLE.sql
[ ] Edit: Ganti email dengan email Anda
[ ] Copy all
[ ] Supabase SQL Editor → Paste → Run
[ ] Logout dari website
[ ] Login lagi
[ ] Akses: http://localhost:3000/admin
[ ] Berhasil masuk admin panel
```

---

## 🚀 DEPLOY (10 menit)

### Step 9: Setup Vercel Env (5 min)
```
[ ] Buka: https://vercel.com/dashboard
[ ] Pilih project: v0-website-lelang2-2
[ ] Settings → Environment Variables
[ ] Add 6 variables (lihat EKSEKUSI-SEKARANG.md)
```

### Step 10: Git Push (2 min)
```
[ ] Terminal: git add .
[ ] Terminal: git commit -m "Production ready"
[ ] Terminal: git push origin main
```

### Step 11: Verify Deploy (3 min)
```
[ ] Tunggu 2-3 menit
[ ] Buka production URL
[ ] Test register
[ ] Test login
[ ] Test admin access
[ ] SELESAI! 🎉
```

---

## ⏱️ TOTAL TIME: 38 MENIT

```
Supabase:  18 min ████████
Testing:   10 min █████
Deploy:    10 min █████
```

---

## 📞 HELP

Stuck? Buka: EKSEKUSI-SEKARANG.md (detail lengkap)

---

**Print checklist ini & centang satu per satu!** ✅
