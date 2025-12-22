# 📧 SETUP EMAIL VERIFIKASI - LELANGMOBIL.COM

## ❌ MASALAH: Email Verifikasi Tidak Terkirim

### Penyebab:
1. Supabase Email Settings belum dikonfigurasi
2. SMTP Server belum disetup
3. Email Templates belum dikonfigurasi

---

## ✅ SOLUSI LENGKAP

### OPSI 1: Gunakan Supabase Email (Gratis - Recommended untuk Testing)

#### Langkah 1: Login ke Supabase Dashboard
\`\`\`
https://supabase.com/dashboard/project/jbjhkpnxkxnfioppmfaq
\`\`\`

#### Langkah 2: Enable Email Auth
1. Pergi ke **Authentication** → **Providers**
2. Pastikan **Email** provider sudah enabled
3. Klik **Email** untuk konfigurasi

#### Langkah 3: Configure Email Settings
1. Pergi ke **Authentication** → **Email Templates**
2. Customize template untuk:
   - **Confirm signup** (Email Verifikasi)
   - **Magic Link**
   - **Change Email Address**
   - **Reset Password**

#### Langkah 4: Update Site URL
1. Pergi ke **Authentication** → **URL Configuration**
2. Set **Site URL**: `https://lelangmobil.com` (atau `http://localhost:3000` untuk dev)
3. Set **Redirect URLs**:
   \`\`\`
   http://localhost:3000/auth/callback
   https://lelangmobil.com/auth/callback
   \`\`\`

#### Langkah 5: Test Email
1. Pergi ke **Authentication** → **Users**
2. Klik **Invite User** untuk test
3. Check apakah email terkirim

---

### OPSI 2: Gunakan Custom SMTP (Production - Recommended)

#### Langkah 1: Setup SMTP Provider
Pilih salah satu:
- **Resend** (Recommended): https://resend.com
- **SendGrid**: https://sendgrid.com
- **Mailgun**: https://mailgun.com
- **AWS SES**: https://aws.amazon.com/ses/

#### Langkah 2: Get SMTP Credentials
Contoh untuk Resend:
\`\`\`
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP User: resend
SMTP Password: re_xxxxxxxxxxxxx (API Key)
\`\`\`

#### Langkah 3: Configure di Supabase
1. Pergi ke **Project Settings** → **Auth**
2. Scroll ke **SMTP Settings**
3. Enable **Enable Custom SMTP**
4. Masukkan credentials:
   \`\`\`
   Host: smtp.resend.com
   Port: 587
   Username: resend
   Password: [Your API Key]
   Sender email: noreply@lelangmobil.com
   Sender name: LELANGMOBIL.COM
   \`\`\`

#### Langkah 4: Verify Domain (Penting!)
1. Di SMTP provider (Resend/SendGrid), verify domain `lelangmobil.com`
2. Add DNS records yang diberikan:
   - SPF Record
   - DKIM Record
   - DMARC Record

---

### OPSI 3: Setup Email dengan Cloudflare Email Routing (GRATIS!)

#### Langkah 1: Enable Cloudflare Email Routing
1. Login ke Cloudflare Dashboard
2. Pilih domain `lelangmobil.com`
3. Pergi ke **Email** → **Email Routing**
4. Klik **Get Started**

#### Langkah 2: Create Email Addresses
\`\`\`
noreply@lelangmobil.com → Forward ke email pribadi Anda
support@lelangmobil.com → Forward ke email pribadi Anda
admin@lelangmobil.com → Forward ke email pribadi Anda
\`\`\`

#### Langkah 3: Setup SMTP dengan Resend (Free Tier)
1. Daftar di https://resend.com (Free: 100 emails/day)
2. Verify domain `lelangmobil.com`
3. Get API Key
4. Configure di Supabase (lihat Opsi 2)

---

## 🔧 UPDATE ENVIRONMENT VARIABLES

Tambahkan ke `.env.local`:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://jbjhkpnxkxnfioppmfaq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiamhrcG54a3huZmlvcHBtZmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyODc4MzUsImV4cCI6MjA4MTg2MzgzNX0._HgXkhSNT7c3B40qiQR9u9aLKQaUbN1K21lcWxmOgfg

# Site URL (PENTING!)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback

# SMTP Settings (Jika pakai Custom SMTP)
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASSWORD=re_xxxxxxxxxxxxx
SMTP_FROM=noreply@lelangmobil.com
SMTP_FROM_NAME=LELANGMOBIL.COM
\`\`\`

---

## 📝 CUSTOM EMAIL TEMPLATES

### Template: Confirm Signup (Email Verifikasi)

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verifikasi Email - LELANGMOBIL.COM</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #ef4444 0%, #f59e0b 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0;">LELANGMOBIL.COM</h1>
      <p style="color: white; margin: 10px 0 0 0;">Platform Lelang Mobil Terpercaya #1</p>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
      <h2 style="color: #ef4444; margin-top: 0;">Selamat Datang! 🎉</h2>
      
      <p>Terima kasih telah mendaftar di LELANGMOBIL.COM!</p>
      
      <p>Klik tombol di bawah untuk verifikasi email Anda:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ .ConfirmationURL }}" 
           style="background: linear-gradient(135deg, #ef4444 0%, #f59e0b 100%); 
                  color: white; 
                  padding: 15px 40px; 
                  text-decoration: none; 
                  border-radius: 5px; 
                  display: inline-block;
                  font-weight: bold;">
          Verifikasi Email
        </a>
      </div>
      
      <p style="color: #666; font-size: 14px;">
        Atau copy link berikut ke browser Anda:<br>
        <a href="{{ .ConfirmationURL }}" style="color: #ef4444; word-break: break-all;">{{ .ConfirmationURL }}</a>
      </p>
      
      <div style="background: #fff3cd; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #856404;">
          <strong>🎁 Bonus Spesial!</strong><br>
          Setelah verifikasi email dan lengkapi KYC, dapatkan bonus Rp 2.500.000 langsung ke wallet Anda!
        </p>
      </div>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      
      <p style="color: #666; font-size: 12px; text-align: center;">
        Email ini dikirim otomatis. Jika Anda tidak mendaftar di LELANGMOBIL.COM, abaikan email ini.<br>
        <br>
        © 2024 PT Balai Lelang Mobil. All rights reserved.<br>
        <a href="https://lelangmobil.com" style="color: #ef4444;">lelangmobil.com</a>
      </p>
    </div>
  </div>
</body>
</html>
\`\`\`

---

## 🧪 TESTING EMAIL

### Test 1: Supabase Dashboard
1. Pergi ke **Authentication** → **Users**
2. Klik **Invite User**
3. Masukkan email test
4. Check inbox

### Test 2: Aplikasi
1. Jalankan `npm run dev`
2. Buka http://localhost:3000/register
3. Daftar dengan email baru
4. Check inbox email

### Test 3: Check Logs
\`\`\`bash
# Di Supabase Dashboard
Project Settings → Logs → Auth Logs
\`\`\`

---

## 🔍 TROUBLESHOOTING

### Email Tidak Terkirim?

#### 1. Check Supabase Auth Logs
\`\`\`
Dashboard → Logs → Auth Logs
\`\`\`
Cari error message

#### 2. Check SMTP Settings
- Pastikan credentials benar
- Pastikan port 587 tidak diblock firewall
- Test SMTP connection

#### 3. Check Spam Folder
Email mungkin masuk ke spam

#### 4. Check Domain Verification
- SPF Record harus valid
- DKIM Record harus valid
- DMARC Record harus valid

#### 5. Check Rate Limits
Supabase free tier: 4 emails/hour
Upgrade jika perlu

---

## ✅ CHECKLIST SETUP EMAIL

- [ ] Supabase Email Provider enabled
- [ ] Site URL dikonfigurasi dengan benar
- [ ] Redirect URLs ditambahkan
- [ ] Email Templates dikustomisasi
- [ ] SMTP Settings dikonfigurasi (jika custom)
- [ ] Domain verified (jika custom SMTP)
- [ ] DNS Records ditambahkan (SPF, DKIM, DMARC)
- [ ] Test email berhasil terkirim
- [ ] Email tidak masuk spam

---

## 🚀 QUICK FIX (Untuk Testing Cepat)

### Gunakan Supabase Default Email (Tanpa Setup SMTP)

1. **Update .env.local**:
\`\`\`env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
\`\`\`

2. **Update Supabase Dashboard**:
   - Authentication → URL Configuration
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

3. **Disable Email Confirmation (Temporary)**:
   - Authentication → Providers → Email
   - Uncheck "Confirm email"
   - Save

4. **Test Register**:
   - User bisa langsung login tanpa verifikasi email
   - Untuk production, HARUS enable kembali!

---

## 📞 SUPPORT

Jika masih ada masalah:
1. Check Supabase Discord: https://discord.supabase.com
2. Check Supabase Docs: https://supabase.com/docs/guides/auth
3. Contact Supabase Support

---

**Status**: ⚠️ EMAIL BELUM DIKONFIGURASI
**Action Required**: Setup SMTP atau gunakan Supabase default email
**Priority**: HIGH (Untuk production)
