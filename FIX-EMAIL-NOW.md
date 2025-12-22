# ⚡ FIX: Error Sending Confirmation Email

## ❌ ERROR: "Error sending confirmation email"

**SMTP sudah dikonfigurasi tapi email tidak terkirim!**

---

## 🔍 PENYEBAB

1. ❌ Resend domain **belum verified**
2. ❌ Resend API Key **tidak valid**
3. ❌ Sender email **tidak match** dengan verified domain

---

## ✅ SOLUSI CEPAT (2 MENIT)

### OPSI 1: Disable Email Confirmation (Temporary)

\`\`\`
Supabase Dashboard:
https://supabase.com/dashboard/project/jbjhkpnxkxnfioppmfaq

Authentication → Providers → Email
☐ Confirm email (UNCHECK)
☑ Enable Email provider
Save
\`\`\`

**Result**: User bisa langsung login tanpa verifikasi email

⚠️ **Untuk testing only! Enable kembali untuk production!**

---

## ✅ SOLUSI PERMANENT (10 MENIT)

### 1. Verify Domain di Resend

\`\`\`
Login: https://resend.com/domains

Check domain: lelangmobil.com
Status harus: ✅ Verified

Jika belum verified:
1. Add domain: lelangmobil.com
2. Copy DNS records
3. Add ke Cloudflare DNS:
   - TXT record: resend._domainkey
   - Value: [dari Resend]
4. Wait 5-10 minutes
5. Click "Verify" di Resend
\`\`\`

### 2. Check API Key

\`\`\`
Resend Dashboard → API Keys
https://resend.com/api-keys

Current: re_72gxzD5q_7X7UDgvYr6Uk5LRYAoScDnRz

Status harus: ✅ Active
Permissions: Full access
\`\`\`

### 3. Update Supabase SMTP

\`\`\`
Supabase Dashboard → Project Settings → Auth → SMTP Settings

✓ Enable Custom SMTP: ON
✓ Host: smtp.resend.com
✓ Port: 587
✓ User: resend
✓ Password: re_72gxzD5q_7X7UDgvYr6Uk5LRYAoScDnRz
✓ Sender email: noreply@lelangmobil.com
✓ Sender name: LELANGMOBIL.COM

IMPORTANT: Sender email HARUS dari verified domain!
\`\`\`

### 4. Test Send Email

\`\`\`
Resend Dashboard → Emails → Send Test Email
To: your-email@gmail.com
From: noreply@lelangmobil.com

Jika berhasil: ✅ SMTP working
Jika gagal: ❌ Domain belum verified
\`\`\`

---

## 🚀 QUICK FIX (SEKARANG)

**Untuk test registration sekarang:**

\`\`\`bash
# 1. Disable email confirmation di Supabase
Authentication → Providers → Email → Uncheck "Confirm email"

# 2. Test registration
npm start
http://localhost:3000/register

# 3. Register dengan email apapun
Email: test@gmail.com
Password: password123

# 4. Login langsung (tanpa verifikasi)
http://localhost:3000/login
\`\`\`

**Result**: ✅ Registration akan berhasil, bisa langsung login!

---

## 📋 CHECKLIST

### Immediate (Testing)
- [ ] Disable email confirmation di Supabase
- [ ] Test registration
- [ ] Confirm user bisa login

### Production (Before Deploy)
- [ ] Verify domain di Resend
- [ ] Add DNS records di Cloudflare
- [ ] Test send email dari Resend
- [ ] Enable email confirmation di Supabase
- [ ] Test full registration flow

---

## 🎯 EXPECTED RESULTS

### After Disable Email Confirmation:
\`\`\`
✅ Registration: Success
✅ User created in database
✅ Can login immediately
❌ No email sent (disabled)
\`\`\`

### After Fix SMTP + Enable Confirmation:
\`\`\`
✅ Registration: Success
✅ Email sent to user
✅ User clicks verification link
✅ Can login after verification
\`\`\`

---

## 📝 COMMANDS

\`\`\`bash
# Start server
npm start

# Test registration
# Open: http://localhost:3000/register

# Check Supabase users
# Dashboard → Authentication → Users
\`\`\`

---

**Status**: ✅ Solution Ready  
**Quick Fix**: Disable email confirmation (1 min)  
**Permanent Fix**: Verify Resend domain (10 min)
