# ⚡ QUICK FIX - Email Verification

## 🎯 MASALAH
Email verifikasi tidak terkirim setelah register.

## ✅ SOLUSI TERCEPAT (5 MENIT)

### Langkah 1: Login ke Supabase Dashboard
\`\`\`
https://supabase.com/dashboard/project/jbjhkpnxkxnfioppmfaq
\`\`\`

### Langkah 2: Update Site URL
1. Klik **Authentication** di sidebar kiri
2. Klik **URL Configuration**
3. Update settings:

\`\`\`
Site URL:
http://localhost:3000

Redirect URLs (Add these):
http://localhost:3000/**
http://localhost:3000/auth/callback
https://lelangmobil.com/**
https://lelangmobil.com/auth/callback
\`\`\`

4. Klik **Save**

### Langkah 3: Check Email Provider
1. Klik **Authentication** → **Providers**
2. Klik **Email**
3. Pastikan:
   - ✅ Enable Email provider: ON
   - ✅ Confirm email: ON (untuk production)
   - ⚠️ Confirm email: OFF (untuk testing cepat)

4. Klik **Save**

### Langkah 4: Test Register
1. Buka terminal
2. Run:
\`\`\`bash
npm run dev
\`\`\`

3. Buka browser: http://localhost:3000/register
4. Daftar dengan email baru
5. Check inbox email

---

## 🔍 JIKA MASIH BELUM TERKIRIM

### Option A: Check Spam Folder
Email mungkin masuk ke spam/junk folder.

### Option B: Check Supabase Logs
1. Supabase Dashboard → **Logs**
2. Pilih **Auth Logs**
3. Cari error message

### Option C: Disable Email Confirmation (Temporary)
1. Authentication → Providers → Email
2. **Uncheck** "Confirm email"
3. Save
4. User bisa langsung login tanpa verifikasi

⚠️ **WARNING**: Hanya untuk testing! Enable kembali untuk production!

---

## 📧 SETUP CUSTOM SMTP (RECOMMENDED)

### Menggunakan Resend (Free 100 emails/day)

#### 1. Daftar Resend
\`\`\`
https://resend.com/signup
\`\`\`

#### 2. Verify Domain
1. Add domain: `lelangmobil.com`
2. Add DNS records yang diberikan:
   - TXT record untuk verification
   - MX record (optional)

#### 3. Get API Key
1. Dashboard → API Keys
2. Create API Key
3. Copy key: `re_xxxxxxxxxxxxx`

#### 4. Configure di Supabase
1. Project Settings → Auth
2. Scroll ke **SMTP Settings**
3. Enable **Custom SMTP**
4. Fill in:
\`\`\`
Host: smtp.resend.com
Port: 587
Username: resend
Password: re_xxxxxxxxxxxxx (paste API key)
Sender email: noreply@lelangmobil.com
Sender name: LELANGMOBIL.COM
\`\`\`
5. Save

#### 5. Test
Register user baru dan check email.

---

## ✅ VERIFICATION CHECKLIST

- [ ] Supabase Site URL updated
- [ ] Redirect URLs added
- [ ] Email provider enabled
- [ ] Test registration completed
- [ ] Email received in inbox
- [ ] Email link works
- [ ] User can login after verification

---

## 🆘 MASIH BERMASALAH?

### Contact Support:
- Supabase Discord: https://discord.supabase.com
- Supabase Docs: https://supabase.com/docs/guides/auth/auth-email

### Check Files:
- `EMAIL-VERIFICATION-SETUP.md` - Panduan lengkap
- `ANALISIS-LENGKAP.md` - Analisis detail semua masalah

---

**Time Required**: 5-30 menit
**Difficulty**: Easy
**Priority**: HIGH
