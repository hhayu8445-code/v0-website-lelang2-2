# ✅ SETUP EMAIL VERIFICATION - WAJIB VERIFIKASI

## 🎯 TUJUAN:
- User WAJIB verifikasi email sebelum bisa login
- Email notifikasi otomatis terkirim
- Menggunakan Supabase built-in email (gratis)

---

## 🚀 LANGKAH 1: JALANKAN SQL SCRIPT (1 MENIT)

### **Buka Supabase SQL Editor:**
```
https://supabase.com/dashboard
→ Pilih project
→ SQL Editor
→ + New Query
```

### **Copy Paste Script Ini:**
```sql
-- ENABLE EMAIL VERIFICATION
DROP TRIGGER IF EXISTS on_auth_user_created_auto_confirm ON auth.users;
DROP FUNCTION IF EXISTS public.auto_confirm_user();

UPDATE auth.config
SET 
  mailer_autoconfirm = false,
  mailer_secure_email_change_enabled = true
WHERE true;

-- VERIFY
SELECT 
  mailer_autoconfirm as auto_confirm_disabled,
  mailer_secure_email_change_enabled as secure_email_enabled
FROM auth.config;
```

### **Klik "Run"**

**Expected Result:**
```
auto_confirm_disabled: false
secure_email_enabled: true
```

---

## 🚀 LANGKAH 2: SETUP EMAIL TEMPLATE (2 MENIT)

### **A. Buka Email Templates:**
```
Supabase Dashboard
→ Authentication
→ Email Templates
→ Pilih "Confirm signup"
```

### **B. Edit Template:**

**Subject:**
```
Verifikasi Email Anda - LELANGMOBIL.COM
```

**Body (HTML):**
```html
<h2>Selamat Datang di LELANGMOBIL.COM!</h2>

<p>Terima kasih telah mendaftar. Klik tombol di bawah untuk verifikasi email Anda:</p>

<a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #dc2626; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
  Verifikasi Email
</a>

<p>Atau copy paste link ini ke browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>Link ini berlaku selama 24 jam.</p>

<hr>

<p style="color: #666; font-size: 12px;">
  Jika Anda tidak mendaftar di LELANGMOBIL.COM, abaikan email ini.
</p>
```

### **C. Save Template**

---

## 🚀 LANGKAH 3: SETUP REDIRECT URL (1 MENIT)

### **A. Buka URL Configuration:**
```
Supabase Dashboard
→ Authentication
→ URL Configuration
```

### **B. Tambahkan Redirect URLs:**
```
https://v0-website-lelang2-2.vercel.app/auth/callback
https://v0-website-lelang2-2.vercel.app/**
http://localhost:3000/auth/callback
http://localhost:3000/**
```

### **C. Site URL:**
```
https://v0-website-lelang2-2.vercel.app
```

### **D. Save**

---

## 🚀 LANGKAH 4: TEST EMAIL VERIFICATION (2 MENIT)

### **A. Test Send Email:**
```
Authentication → Email Templates
→ Klik "Send test email"
→ Masukkan email Anda
→ Klik "Send"
```

### **B. Check Inbox:**
- ✅ Email masuk dalam 1-2 menit
- ✅ Subject: "Verifikasi Email Anda - LELANGMOBIL.COM"
- ✅ Ada tombol "Verifikasi Email"
- ✅ Link bisa diklik

### **C. Test Registration:**
```
1. Go to: https://v0-website-lelang2-2.vercel.app/register
2. Daftar dengan email baru
3. Check inbox untuk email verifikasi
4. Klik link verifikasi
5. Redirect ke login
6. Login dengan email yang sudah diverifikasi
```

---

## ✅ VERIFICATION CHECKLIST:

```
[ ] SQL script berhasil dijalankan
[ ] Email template sudah diedit
[ ] Redirect URLs sudah ditambahkan
[ ] Test email berhasil terkirim
[ ] Test registration berhasil
[ ] Email verifikasi masuk ke inbox
[ ] Link verifikasi berfungsi
[ ] User bisa login setelah verifikasi
```

---

## 🎯 CARA KERJA:

```
1. User register → Email terkirim OTOMATIS
2. User cek inbox → Klik link verifikasi
3. Email terverifikasi → Redirect ke login
4. User login → Masuk ke dashboard
```

---

## 📧 JIKA EMAIL TIDAK MASUK:

### **Check Spam Folder:**
- Email mungkin masuk ke spam
- Tandai sebagai "Not Spam"

### **Check Email Logs:**
```
Supabase Dashboard
→ Authentication
→ Logs
→ Filter: "email"
```

### **Resend Email:**
```sql
-- Di SQL Editor
SELECT auth.send_confirmation_email('user@example.com');
```

---

## 🔧 TROUBLESHOOTING:

### **Error: "Email not sent"**
**Solusi:**
1. Check Supabase email quota (50 emails/hour gratis)
2. Tunggu 1 jam jika quota habis
3. Atau upgrade plan

### **Error: "Invalid redirect URL"**
**Solusi:**
1. Check URL Configuration di Supabase
2. Pastikan redirect URL sudah ditambahkan
3. Format: `https://domain.com/auth/callback`

### **Email masuk tapi link tidak berfungsi**
**Solusi:**
1. Check Site URL di Supabase
2. Pastikan sama dengan production URL
3. Redeploy website

---

## 🎉 HASIL AKHIR:

- ✅ Email verification WAJIB
- ✅ Notifikasi email otomatis
- ✅ User tidak bisa login tanpa verifikasi
- ✅ Security meningkat
- ✅ Production ready

---

## 📞 QUICK LINKS:

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Email Templates:** Authentication > Email Templates
- **URL Configuration:** Authentication > URL Configuration
- **Email Logs:** Authentication > Logs

---

## 🚀 DONE!

Setelah setup:
- ✅ Email verification aktif
- ✅ Notifikasi email berfungsi
- ✅ Website production ready
- ✅ Security optimal

**Test sekarang:** https://v0-website-lelang2-2.vercel.app/register

