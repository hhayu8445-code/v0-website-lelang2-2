# ⚡ KONFIGURASI SUPABASE SMTP - FINAL STEP

## ✅ RESEND API KEY SUDAH TERSEDIA
\`\`\`
re_72gxzD5q_7X7UDgvYr6Uk5LRYAoScDnRz
\`\`\`

---

## 🔧 LANGKAH TERAKHIR (5 MENIT)

### 1. Login Supabase Dashboard
\`\`\`
https://supabase.com/dashboard/project/jbjhkpnxkxnfioppmfaq
\`\`\`

### 2. Configure SMTP Settings

#### Navigasi
\`\`\`
Project Settings → Auth → SMTP Settings
\`\`\`

#### Enable Custom SMTP
\`\`\`
☑ Enable Custom SMTP
\`\`\`

#### Fill Configuration
\`\`\`
SMTP Host:     smtp.resend.com
SMTP Port:     587
SMTP User:     resend
SMTP Password: re_72gxzD5q_7X7UDgvYr6Uk5LRYAoScDnRz
Sender email:  noreply@lelangmobil.com
Sender name:   LELANGMOBIL.COM
\`\`\`

#### Save
\`\`\`
Click "Save" button
\`\`\`

---

### 3. Update URL Configuration

#### Navigasi
\`\`\`
Authentication → URL Configuration
\`\`\`

#### Configure URLs
\`\`\`
Site URL:
https://lelangmobil.com

Redirect URLs (Add these):
https://lelangmobil.com/auth/callback
https://lelangmobil.com/**
https://www.lelangmobil.com/auth/callback
http://localhost:3000/auth/callback
\`\`\`

#### Save
\`\`\`
Click "Save" button
\`\`\`

---

### 4. Verify Email Provider

#### Navigasi
\`\`\`
Authentication → Providers → Email
\`\`\`

#### Check Settings
\`\`\`
☑ Enable Email provider
☑ Confirm email (untuk production)
☑ Secure email change
\`\`\`

#### Save
\`\`\`
Click "Save" button
\`\`\`

---

## 🚀 DEPLOY & TEST

### Build & Start Server
\`\`\`bash
npm run build
npm start
\`\`\`

### Test Email Verification
\`\`\`
1. Buka: https://lelangmobil.com/register
2. Register dengan email baru
3. Check inbox email
4. Click verification link
5. Login ke dashboard
\`\`\`

---

## ✅ VERIFICATION CHECKLIST

- [x] Resend API Key configured
- [ ] Supabase SMTP enabled
- [ ] SMTP credentials saved
- [ ] Site URL updated
- [ ] Redirect URLs added
- [ ] Email provider enabled
- [ ] Server running
- [ ] Test registration completed
- [ ] Email received
- [ ] Verification link works

---

## 🎯 EXPECTED RESULT

Setelah konfigurasi selesai:

1. ✅ User register → Email terkirim otomatis
2. ✅ Email berisi link verifikasi
3. ✅ Click link → Redirect ke dashboard
4. ✅ User bisa login

---

## 📧 EMAIL TEMPLATE (Preview)

Subject: **Verifikasi Email - LELANGMOBIL.COM**

\`\`\`
Selamat Datang di LELANGMOBIL.COM! 🎉

Klik tombol di bawah untuk verifikasi email Anda:

[Verifikasi Email]

Bonus Spesial:
Setelah verifikasi + KYC, dapatkan Rp 2.500.000!

---
© 2024 PT Balai Lelang Mobil
lelangmobil.com
\`\`\`

---

## 🔍 TROUBLESHOOTING

### Email tidak terkirim?

**Check 1: Supabase Auth Logs**
\`\`\`
Dashboard → Logs → Auth Logs
Cari error message
\`\`\`

**Check 2: Resend Dashboard**
\`\`\`
https://resend.com/emails
Check email delivery status
\`\`\`

**Check 3: Domain Verification**
\`\`\`
Resend → Domains → lelangmobil.com
Status harus: ✅ Verified
\`\`\`

**Check 4: DNS Records**
\`\`\`
Pastikan DKIM record sudah ditambahkan di Cloudflare
\`\`\`

---

## ✅ SELESAI!

Setelah konfigurasi Supabase SMTP selesai, website Anda **100% PRODUCTION READY** dengan email verification berfungsi penuh!

**Next**: Deploy ke https://lelangmobil.com

---

**API Key**: re_72gxzD5q_7X7UDgvYr6Uk5LRYAoScDnRz
**Domain**: lelangmobil.com
**Status**: READY TO DEPLOY
