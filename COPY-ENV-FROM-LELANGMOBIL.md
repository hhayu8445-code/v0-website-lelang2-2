# 🔄 COPY ENV DARI LELANGMOBIL.COM

## Langkah-langkah copy environment variables dari project lama ke baru

---

## 📋 STEP 1: Copy dari Project Lama

**Di halaman yang terbuka (lelangmobil env variables):**

1. **Copy semua environment variables:**
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - RESEND_API_KEY
   - CSRF_SECRET
   - RATE_LIMIT_SECRET
   - WHATSAPP_NUMBER
   - Dan lainnya...

2. **Klik pada setiap variable untuk melihat value-nya**

3. **Copy value-nya** (klik icon copy atau select & copy)

---

## 📋 STEP 2: Paste ke Project Baru

1. **Buka project baru:**
   ```
   https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/environment-variables
   ```

2. **Untuk setiap variable:**
   - Klik "Add New"
   - Key: (sama dengan project lama)
   - Value: (paste dari project lama)
   - Environment: Production ✅
   - Save

3. **PENTING: Update URL:**
   ```
   NEXT_PUBLIC_SITE_URL=https://v0-website-lelang2-2-ecru.vercel.app
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://v0-website-lelang2-2-ecru.vercel.app/auth/callback
   ```

---

## 📋 STEP 3: Update Supabase Redirect URLs

1. **Buka Supabase Dashboard:**
   ```
   https://supabase.com/dashboard
   ```

2. **Pilih project yang sama dengan lelangmobil.com**

3. **Authentication → URL Configuration**

4. **Tambahkan URL baru:**
   ```
   https://v0-website-lelang2-2-ecru.vercel.app/auth/callback
   https://v0-website-lelang2-2-ecru.vercel.app/**
   ```

5. **JANGAN hapus URL lama** (biar lelangmobil.com tetap jalan)

---

## 📋 STEP 4: Redeploy

1. **Buka deployments:**
   ```
   https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/deployments
   ```

2. **Klik "..." → "Redeploy"**

3. **Tunggu 2-3 menit**

4. **✅ Website live dengan database yang sama!**

---

## ✅ HASIL

Setelah selesai:
- ✅ v0-website-lelang2-2 menggunakan database yang sama dengan lelangmobil.com
- ✅ Data user, lelang, transaksi semua sama
- ✅ Admin user yang sama
- ✅ Tombol Admin Panel akan muncul
- ✅ Kedua website (lama & baru) tetap jalan

---

## 🎯 QUICK LINKS

- Project Lama (lelangmobil): https://vercel.com/hah-cc4988b5/lelangmobil/settings/environment-variables
- Project Baru (v0-website-lelang2-2): https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/environment-variables
- Supabase: https://supabase.com/dashboard

---

## ⚠️ PENTING

**Database akan SAMA untuk kedua website!**
- Perubahan di satu website akan terlihat di website lainnya
- User yang daftar di satu website bisa login di website lainnya
- Data lelang, transaksi, dll akan sama

**Ini bagus untuk testing sebelum switch domain!**
