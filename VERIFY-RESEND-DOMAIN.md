# 📧 VERIFY DOMAIN RESEND - LELANGMOBIL.COM

## 🎯 LANGKAH VERIFY DOMAIN (5 MENIT)

### 1. Login Resend Dashboard
\`\`\`
https://resend.com/domains
\`\`\`

### 2. Add Domain
\`\`\`
Click "Add Domain"
Domain: lelangmobil.com
Click "Add"
\`\`\`

### 3. Copy DNS Records
Resend akan memberikan 3 DNS records:

**SPF Record:**
\`\`\`
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
\`\`\`

**DKIM Record:**
\`\`\`
Type: TXT
Name: resend._domainkey
Value: [long string dari Resend]
\`\`\`

**DMARC Record (Optional):**
\`\`\`
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none
\`\`\`

### 4. Add ke Cloudflare DNS

Login Cloudflare:
\`\`\`
https://dash.cloudflare.com
Select: lelangmobil.com
DNS → Records → Add record
\`\`\`

**Add Record 1 (SPF):**
\`\`\`
Type: TXT
Name: @
Content: v=spf1 include:_spf.resend.com ~all
TTL: Auto
Proxy: DNS only (grey cloud)
Save
\`\`\`

**Add Record 2 (DKIM):**
\`\`\`
Type: TXT
Name: resend._domainkey
Content: [paste dari Resend]
TTL: Auto
Proxy: DNS only (grey cloud)
Save
\`\`\`

**Add Record 3 (DMARC - Optional):**
\`\`\`
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=none
TTL: Auto
Proxy: DNS only (grey cloud)
Save
\`\`\`

### 5. Wait & Verify

\`\`\`
Wait: 5-10 minutes (DNS propagation)
Back to Resend Dashboard
Click: "Verify Domain"
Status: ✅ Verified
\`\`\`

### 6. Test Send Email

\`\`\`
Resend Dashboard → Emails
Click "Send Test Email"
From: noreply@lelangmobil.com
To: your-email@gmail.com
Subject: Test Email
Send

Check inbox: ✅ Email received
\`\`\`

---

## ⚡ QUICK CHECK

### Check Domain Status di Resend
\`\`\`
https://resend.com/domains

lelangmobil.com
Status: ✅ Verified (good)
Status: ⚠️ Pending (wait 5-10 min)
Status: ❌ Failed (check DNS records)
\`\`\`

### Check DNS Propagation
\`\`\`
https://dnschecker.org

Type: TXT
Hostname: resend._domainkey.lelangmobil.com
Check: Should show DKIM value
\`\`\`

---

## 🔧 TROUBLESHOOTING

### Domain Not Verified?

**Check 1: DNS Records Correct?**
\`\`\`
Cloudflare DNS → Check records
- SPF: v=spf1 include:_spf.resend.com ~all
- DKIM: resend._domainkey → [long value]
\`\`\`

**Check 2: Wait Longer**
\`\`\`
DNS propagation: 5-30 minutes
Check again after 10 minutes
\`\`\`

**Check 3: Proxy Status**
\`\`\`
Cloudflare DNS → TXT records
Proxy: Must be "DNS only" (grey cloud)
NOT "Proxied" (orange cloud)
\`\`\`

---

## ✅ AFTER DOMAIN VERIFIED

### 1. Test Email dari Resend
\`\`\`
Resend → Send Test Email
From: noreply@lelangmobil.com
Result: ✅ Email delivered
\`\`\`

### 2. Enable Email Confirmation di Supabase
\`\`\`
Supabase Dashboard
Authentication → Providers → Email
☑ Confirm email (CHECK)
Save
\`\`\`

### 3. Test Registration
\`\`\`
http://localhost:3000/register
Register new user
Check email inbox
Click verification link
Login
\`\`\`

---

## 📋 CHECKLIST

- [ ] Login Resend.com
- [ ] Add domain: lelangmobil.com
- [ ] Copy DNS records (SPF, DKIM)
- [ ] Add records ke Cloudflare DNS
- [ ] Wait 5-10 minutes
- [ ] Verify domain di Resend
- [ ] Test send email
- [ ] Enable email confirmation di Supabase
- [ ] Test full registration flow

---

## 🎯 EXPECTED RESULT

**Before Verify:**
\`\`\`
❌ Email not sent
❌ Registration fails
\`\`\`

**After Verify:**
\`\`\`
✅ Domain verified
✅ Email sent successfully
✅ User receives verification email
✅ Registration works perfectly
\`\`\`

---

**Time Required**: 5-10 minutes  
**Status**: Ready to verify  
**Next**: Add DNS records to Cloudflare
