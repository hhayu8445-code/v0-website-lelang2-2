# 📧 SETUP EMAIL CLOUDFLARE - PRODUCTION 100%

## ✅ LANGKAH SETUP (15 MENIT)

### 1. CLOUDFLARE EMAIL ROUTING (GRATIS)

#### Login Cloudflare Dashboard
\`\`\`
https://dash.cloudflare.com
\`\`\`

#### Enable Email Routing
1. Pilih domain: **lelangmobil.com**
2. Klik **Email** → **Email Routing**
3. Klik **Get Started**
4. Add destination email (email pribadi Anda)
5. Verify email destination

#### Create Email Addresses
\`\`\`
noreply@lelangmobil.com → Forward ke email Anda
support@lelangmobil.com → Forward ke email Anda
admin@lelangmobil.com → Forward ke email Anda
\`\`\`

#### DNS Records (Auto-created by Cloudflare)
\`\`\`
MX Record: route1.mx.cloudflare.net (Priority 89)
MX Record: route2.mx.cloudflare.net (Priority 17)
MX Record: route3.mx.cloudflare.net (Priority 8)
TXT Record: v=spf1 include:_spf.mx.cloudflare.net ~all
\`\`\`

---

### 2. RESEND SMTP (GRATIS - 100 emails/day)

#### Daftar Resend
\`\`\`
https://resend.com/signup
\`\`\`

#### Add Domain
1. Dashboard → **Domains** → **Add Domain**
2. Domain: **lelangmobil.com**
3. Copy DNS records yang diberikan

#### Add DNS Records di Cloudflare
\`\`\`
# DKIM Record (untuk email authentication)
Type: TXT
Name: resend._domainkey
Value: [Copy dari Resend]

# SPF Record (sudah ada dari Cloudflare Email Routing)
# Tidak perlu tambah lagi
\`\`\`

#### Verify Domain di Resend
1. Tunggu DNS propagate (5-10 menit)
2. Klik **Verify** di Resend Dashboard
3. Status harus: ✅ Verified

#### Get API Key
1. Dashboard → **API Keys**
2. Klik **Create API Key**
3. Name: `lelangmobil-production`
4. Copy API Key: `re_xxxxxxxxxxxxx`

---

### 3. CONFIGURE SUPABASE SMTP

#### Login Supabase Dashboard
\`\`\`
https://supabase.com/dashboard/project/jbjhkpnxkxnfioppmfaq
\`\`\`

#### Setup Custom SMTP
1. **Project Settings** → **Auth**
2. Scroll ke **SMTP Settings**
3. Enable **Enable Custom SMTP**
4. Configure:
\`\`\`
SMTP Host: smtp.resend.com
SMTP Port: 587
SMTP User: resend
SMTP Password: re_xxxxxxxxxxxxx (API Key dari Resend)
Sender email: noreply@lelangmobil.com
Sender name: LELANGMOBIL.COM
\`\`\`
5. **Save**

#### Update URL Configuration
1. **Authentication** → **URL Configuration**
2. **Site URL**: `https://lelangmobil.com`
3. **Redirect URLs**:
\`\`\`
https://lelangmobil.com/auth/callback
http://localhost:3000/auth/callback
\`\`\`
4. **Save**

---

### 4. UPDATE ENVIRONMENT VARIABLES

Update `.env.local`:
\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://jbjhkpnxkxnfioppmfaq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiamhrcG54a3huZmlvcHBtZmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyODc4MzUsImV4cCI6MjA4MTg2MzgzNX0._HgXkhSNT7c3B40qiQR9u9aLKQaUbN1K21lcWxmOgfg"

# Site URL - PRODUCTION
NEXT_PUBLIC_SITE_URL=https://lelangmobil.com
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=https://lelangmobil.com/auth/callback

# Resend SMTP
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email Configuration
SMTP_FROM=noreply@lelangmobil.com
SMTP_FROM_NAME=LELANGMOBIL.COM
SUPPORT_EMAIL=support@lelangmobil.com
ADMIN_EMAIL=admin@lelangmobil.com
INFO_EMAIL=info@lelangmobil.com
\`\`\`

---

### 5. TEST EMAIL

#### Test di Supabase Dashboard
1. **Authentication** → **Users**
2. Klik **Invite User**
3. Email: test@youremail.com
4. Check inbox

#### Test di Aplikasi
\`\`\`bash
npm run dev
# Buka http://localhost:3000/register
# Register dengan email baru
# Check inbox
\`\`\`

---

## ✅ CHECKLIST

- [ ] Cloudflare Email Routing enabled
- [ ] Email addresses created (noreply, support, admin)
- [ ] Resend account created
- [ ] Domain added to Resend
- [ ] DNS records added to Cloudflare
- [ ] Domain verified di Resend
- [ ] API Key generated
- [ ] Supabase SMTP configured
- [ ] Site URL updated
- [ ] Redirect URLs added
- [ ] Environment variables updated
- [ ] Test email sent successfully

---

## 🎯 QUICK COMMANDS

\`\`\`bash
# Test DNS propagation
nslookup -type=MX lelangmobil.com
nslookup -type=TXT resend._domainkey.lelangmobil.com

# Test SMTP connection
telnet smtp.resend.com 587

# Start production
npm run build
npm start
\`\`\`

---

**Status**: ⚠️ NEEDS CONFIGURATION
**Time**: 15 minutes
**Cost**: FREE (Resend: 100 emails/day, Cloudflare: Unlimited forwarding)
