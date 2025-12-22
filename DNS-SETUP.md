# DNS Configuration - Quick Setup Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Add SPF Record
\`\`\`
Type: TXT
Name: @
Value: v=spf1 include:_spf.supabase.co ~all
TTL: 3600
\`\`\`

### Step 2: Add DKIM Record
Get from Supabase Dashboard → Project Settings → Custom SMTP

\`\`\`
Type: TXT
Name: default._domainkey
Value: [Copy from Supabase]
TTL: 3600
\`\`\`

### Step 3: Add DMARC Record
\`\`\`
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@lelangmobil.com
TTL: 3600
\`\`\`

### Step 4: Verify Setup
1. Wait 5-10 minutes for DNS propagation
2. Check at: https://mxtoolbox.com/SuperTool.aspx
3. Test email at: https://www.mail-tester.com

## 📋 DNS Records Summary

| Type | Name | Value | Priority |
|------|------|-------|----------|
| TXT | @ | v=spf1 include:_spf.supabase.co ~all | - |
| TXT | default._domainkey | [From Supabase] | - |
| TXT | _dmarc | v=DMARC1; p=quarantine; rua=mailto:dmarc@lelangmobil.com | - |
| MX | @ | [Your mail server] | 10 |

## ✅ Verification Checklist

- [ ] SPF record added and verified
- [ ] DKIM record added and verified
- [ ] DMARC record added and verified
- [ ] DNS propagation complete (check dnschecker.org)
- [ ] Test email sent successfully
- [ ] Email not in spam folder
- [ ] Mail-tester.com score 10/10

## 🔧 Provider-Specific Guides

### Cloudflare
1. Dashboard → DNS → Add Record
2. Type: TXT
3. Name: @ (or subdomain)
4. Content: [SPF/DKIM/DMARC value]
5. Proxy status: DNS only (gray cloud)

### Namecheap
1. Domain List → Manage → Advanced DNS
2. Add New Record → TXT Record
3. Host: @ (or subdomain)
4. Value: [SPF/DKIM/DMARC value]
5. TTL: Automatic

### GoDaddy
1. My Products → DNS → Manage Zones
2. Add → TXT
3. Name: @ (or subdomain)
4. Value: [SPF/DKIM/DMARC value]
5. TTL: 1 Hour

## 🚨 Common Issues

### Issue: DNS not propagating
**Solution:** Wait 24-48 hours, check dnschecker.org

### Issue: SPF record conflict
**Solution:** Merge multiple SPF records into one

### Issue: DKIM not verifying
**Solution:** Check for typos, ensure no extra spaces

## 📞 Need Help?

- DNS Checker: https://dnschecker.org
- MX Toolbox: https://mxtoolbox.com
- Mail Tester: https://www.mail-tester.com
- Supabase Docs: https://supabase.com/docs/guides/auth/auth-smtp
