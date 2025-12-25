# 🆘 TROUBLESHOOTING - SOLUSI CEPAT

## ❌ ERROR UMUM & SOLUSI

### 1. "Missing Supabase environment variables"

**Penyebab:** .env.local belum diisi atau salah

**Solusi:**
```bash
1. Buka .env.local
2. Check 3 baris ini sudah diisi:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
3. Restart dev server:
   - Ctrl+C (stop)
   - npm run dev (start lagi)
```

---

### 2. "Failed to fetch" / "Network error"

**Penyebab:** API keys salah atau Supabase project mati

**Solusi:**
```bash
1. Check Supabase dashboard
   - Project status = Active?
2. Check API keys di .env.local
   - Copy paste ulang dari Supabase
3. Check internet connection
4. Restart dev server
```

---

### 3. Admin tidak bisa akses /admin

**Penyebab:** User belum di-set sebagai admin

**Solusi:**
```bash
1. Pastikan sudah register via website
2. Buka: scripts/CREATE-ADMIN-SIMPLE.sql
3. Edit email (ganti dengan email Anda)
4. Copy all
5. Supabase SQL Editor → Paste → Run
6. Logout dari website
7. Login lagi
8. Coba akses /admin lagi
```

---

### 4. SQL execution failed

**Penyebab:** SQL script tidak lengkap atau ada error

**Solusi:**
```bash
1. Pastikan copy SEMUA isi file SQL
2. Check tidak ada karakter aneh
3. Run ulang dari awal
4. Jika masih error, hapus tables dulu:
   - Table Editor → Delete tables
   - Run SQL lagi
```

---

### 5. npm run dev error

**Penyebab:** Dependencies tidak lengkap

**Solusi:**
```bash
1. Delete node_modules:
   - rm -rf node_modules (Mac/Linux)
   - rmdir /s node_modules (Windows)
2. Delete package-lock.json
3. npm install
4. npm run dev
```

---

### 6. Build failed

**Penyebab:** Cache corrupt atau TypeScript error

**Solusi:**
```bash
1. Clear cache:
   - rm -rf .next
2. Rebuild:
   - npm run build
3. Jika masih error, check error message
```

---

### 7. Port 3000 already in use

**Penyebab:** Dev server masih jalan di background

**Solusi:**
```bash
Windows:
1. netstat -ano | findstr :3000
2. taskkill /PID [PID_NUMBER] /F

Mac/Linux:
1. lsof -ti:3000
2. kill -9 [PID]

Atau gunakan port lain:
npm run dev -- -p 3001
```

---

### 8. Images tidak muncul

**Penyebab:** Storage bucket belum dibuat atau tidak public

**Solusi:**
```bash
1. Supabase → Storage
2. Check bucket "vehicles" ada?
3. Check bucket "vehicles" = Public?
4. Jika tidak, edit bucket → Make public
```

---

### 9. Register tidak bisa

**Penyebab:** Email confirmation enabled

**Solusi:**
```bash
1. Supabase → Authentication → Providers
2. Email provider → Settings
3. Confirm email = OFF
4. Save
5. Coba register lagi
```

---

### 10. Vercel deployment failed

**Penyebab:** Environment variables tidak lengkap

**Solusi:**
```bash
1. Vercel → Settings → Environment Variables
2. Check 6 variables sudah ada:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - NEXT_PUBLIC_SITE_URL
   - CSRF_SECRET
   - NEXT_PUBLIC_WHATSAPP_NUMBER
3. Redeploy
```

---

## 🔍 DEBUG CHECKLIST

Jika masih error, check ini:

```
[ ] Supabase project status = Active
[ ] .env.local sudah diisi semua
[ ] SQL sudah di-run (12 tables ada)
[ ] Storage buckets sudah dibuat (2 buckets)
[ ] npm install sudah dijalankan
[ ] Dev server sudah restart
[ ] Console tidak ada error merah
[ ] Internet connection OK
```

---

## 📞 MASIH STUCK?

1. Screenshot error
2. WhatsApp: +62 882-0227-83493
3. Kirim screenshot + jelaskan step yang error

---

**Kebanyakan error bisa diselesaikan dengan restart dev server!**
