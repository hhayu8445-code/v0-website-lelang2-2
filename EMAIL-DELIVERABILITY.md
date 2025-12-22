# Email Deliverability Guide - Mencegah Email Masuk Spam

## 🎯 Checklist Anti-Spam

### ✅ 1. SPF (Sender Policy Framework)
Tambahkan DNS TXT record di domain Anda:

\`\`\`
Type: TXT
Name: @
Value: v=spf1 include:_spf.supabase.co ~all
\`\`\`

**Untuk custom domain:**
\`\`\`
v=spf1 include:_spf.supabase.co include:_spf.google.com ~all
\`\`\`

### ✅ 2. DKIM (DomainKeys Identified Mail)
Di Supabase Dashboard → Project Settings → Custom SMTP:

1. Enable DKIM signing
2. Add DKIM DNS records provided by Supabase
3. Verify DKIM setup

**DNS Record Example:**
\`\`\`
Type: TXT
Name: default._domainkey
Value: [Provided by Supabase]
\`\`\`

### ✅ 3. DMARC (Domain-based Message Authentication)
Tambahkan DNS TXT record:

\`\`\`
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@lelangmobil.com
\`\`\`

**Recommended DMARC Policy:**
\`\`\`
v=DMARC1; p=quarantine; rua=mailto:dmarc@lelangmobil.com; ruf=mailto:dmarc@lelangmobil.com; fo=1; adkim=s; aspf=s; pct=100
\`\`\`

### ✅ 4. Custom SMTP (Recommended for Production)

#### Option A: SendGrid
\`\`\`env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
SMTP_FROM=noreply@lelangmobil.com
\`\`\`

#### Option B: AWS SES
\`\`\`env
SMTP_HOST=email-smtp.ap-southeast-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your_aws_access_key
SMTP_PASS=your_aws_secret_key
SMTP_FROM=noreply@lelangmobil.com
\`\`\`

#### Option C: Mailgun
\`\`\`env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@mg.lelangmobil.com
SMTP_PASS=your_mailgun_password
SMTP_FROM=noreply@lelangmobil.com
\`\`\`

### ✅ 5. Email Content Best Practices

**Already Implemented in Templates:**
- ✅ Plain text alternative (for spam filters)
- ✅ Proper HTML structure
- ✅ No excessive images
- ✅ Clear unsubscribe option
- ✅ Valid sender address
- ✅ Proper subject lines
- ✅ No spam trigger words
- ✅ Balanced text-to-image ratio

### ✅ 6. Sender Reputation

**Domain Setup:**
\`\`\`
From: LELANGMOBIL.COM <noreply@lelangmobil.com>
Reply-To: support@lelangmobil.com
\`\`\`

**Email Headers (Auto-configured):**
- List-Unsubscribe header
- Precedence: bulk
- X-Mailer: LELANGMOBIL.COM

### ✅ 7. Warm-up Strategy

**Week 1:** Send 50 emails/day
**Week 2:** Send 100 emails/day
**Week 3:** Send 500 emails/day
**Week 4+:** Full volume

### ✅ 8. Monitor & Maintain

**Tools to Check:**
- [Mail-Tester.com](https://www.mail-tester.com) - Score 10/10
- [MXToolbox](https://mxtoolbox.com/SuperTool.aspx) - Check DNS
- [Google Postmaster](https://postmaster.google.com) - Gmail delivery

**Metrics to Track:**
- Open rate > 20%
- Bounce rate < 2%
- Spam complaint < 0.1%
- Unsubscribe rate < 0.5%

## 🔧 Supabase Configuration

### Step 1: Custom SMTP Setup
1. Go to Supabase Dashboard
2. Project Settings → Custom SMTP
3. Enable custom SMTP
4. Enter SMTP credentials

### Step 2: Email Settings
\`\`\`
From Email: noreply@lelangmobil.com
From Name: LELANGMOBIL.COM
Reply-To: support@lelangmobil.com
\`\`\`

### Step 3: Rate Limiting
\`\`\`
Max emails per hour: 100 (start low)
Max emails per day: 1000
\`\`\`

## 📝 Email Template Improvements

### Add Plain Text Version
Create `emails/verify-email.txt`:
\`\`\`
LELANGMOBIL.COM - Verifikasi Email Anda

Terima kasih telah mendaftar di LELANGMOBIL.COM!

Untuk melanjutkan, silakan verifikasi alamat email Anda dengan mengklik link berikut:
{{ .ConfirmationURL }}

Bonus Selamat Datang:
Setelah verifikasi email dan KYC, Anda akan mendapatkan bonus Rp 2.500.000!

Jika Anda tidak mendaftar di LELANGMOBIL.COM, abaikan email ini.

---
PT Balai Lelang Mobil
Website: https://lelangmobil.com
Support: support@lelangmobil.com
\`\`\`

## 🚨 Common Issues & Solutions

### Issue 1: Email goes to spam
**Solution:**
- Verify SPF, DKIM, DMARC records
- Check sender reputation
- Reduce sending volume
- Improve email content

### Issue 2: High bounce rate
**Solution:**
- Validate email addresses before sending
- Remove invalid emails from list
- Use double opt-in

### Issue 3: Low open rate
**Solution:**
- Improve subject lines
- Send at optimal times
- Segment your audience
- A/B test content

## 📊 Testing Checklist

Before going live:
- [ ] Test email with mail-tester.com (score 10/10)
- [ ] Verify SPF record
- [ ] Verify DKIM signature
- [ ] Verify DMARC policy
- [ ] Test on Gmail, Outlook, Yahoo
- [ ] Check mobile rendering
- [ ] Verify all links work
- [ ] Test unsubscribe link
- [ ] Check spam score

## 🎯 Production Checklist

- [ ] Custom domain configured
- [ ] SPF record added
- [ ] DKIM enabled
- [ ] DMARC policy set
- [ ] Custom SMTP configured
- [ ] Sender reputation established
- [ ] Email templates tested
- [ ] Monitoring tools setup
- [ ] Bounce handling configured
- [ ] Complaint handling setup

## 📞 Support

For email deliverability issues:
- Supabase Support: support@supabase.io
- Email Provider Support
- Check DNS propagation: dnschecker.org
