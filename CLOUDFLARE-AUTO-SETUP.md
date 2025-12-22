# 🚀 Cloudflare Email Auto Setup - Panduan Lengkap

## ✅ Setup Otomatis via Script (5 Menit)

Script ini akan otomatis setup:
- ✅ Enable Cloudflare Email Routing
- ✅ Add destination email (Gmail Anda)
- ✅ Create 22+ email forwarding rules
- ✅ Add SPF & DMARC DNS records

---

## 📋 Prerequisites

1. **Domain di Cloudflare** (gratis)
2. **Cloudflare API Token**
3. **Node.js** installed

---

## 🔧 Step 1: Get Cloudflare API Token (2 menit)

\`\`\`
1. Login ke https://dash.cloudflare.com
2. Klik profile icon (kanan atas) → My Profile
3. Klik "API Tokens" tab
4. Klik "Create Token"
5. Use template: "Edit zone DNS"
6. Atau custom dengan permissions:
   - Zone → Email Routing Rules → Edit
   - Zone → DNS → Edit
7. Zone Resources: Include → Specific zone → lelangmobil.com
8. Klik "Continue to summary"
9. Klik "Create Token"
10. COPY token yang muncul (hanya muncul 1x!)
\`\`\`

---

## 🔧 Step 2: Get Zone ID (1 menit)

\`\`\`
1. Dashboard Cloudflare
2. Pilih domain: lelangmobil.com
3. Scroll ke bawah di sidebar kanan
4. Copy "Zone ID"
\`\`\`

---

## 🔧 Step 3: Edit Script (1 menit)

Buka file `setup-cloudflare-email.js` dan edit:

\`\`\`javascript
const CONFIG = {
  // Paste API Token Anda
  API_TOKEN: 'paste_token_disini',
  
  // Paste Zone ID Anda
  ZONE_ID: 'paste_zone_id_disini',
  
  // Domain Anda
  DOMAIN: 'lelangmobil.com',
  
  // Gmail pribadi Anda (untuk terima semua email)
  DESTINATION_EMAIL: 'youremail@gmail.com',
};
\`\`\`

---

## 🚀 Step 4: Run Script (2 menit)

\`\`\`bash
# Install Node.js jika belum (download dari nodejs.org)

# Run script
node setup-cloudflare-email.js
\`\`\`

**Output:**
\`\`\`
🚀 Cloudflare Email Routing Auto Setup

Domain: lelangmobil.com
Destination: youremail@gmail.com

🔧 Enabling Email Routing...
✅ Email Routing enabled

📧 Adding destination email: youremail@gmail.com...
✅ Destination email added. Check your email for verification!

⏳ Please verify your destination email before continuing...
Press Enter after verification...
\`\`\`

---

## 📧 Step 5: Verify Email (1 menit)

\`\`\`
1. Check inbox Gmail Anda
2. Buka email dari Cloudflare
3. Klik "Verify email address"
4. Kembali ke terminal
5. Press Enter
\`\`\`

Script akan lanjut otomatis:

\`\`\`
📬 Creating email routes...

✅ Created: admin@lelangmobil.com → youremail@gmail.com
✅ Created: support@lelangmobil.com → youremail@gmail.com
✅ Created: info@lelangmobil.com → youremail@gmail.com
✅ Created: kyc@lelangmobil.com → youremail@gmail.com
✅ Created: finance@lelangmobil.com → youremail@gmail.com
✅ Created: noreply@lelangmobil.com → youremail@gmail.com
✅ Created: security@lelangmobil.com → youremail@gmail.com
✅ Created: dmarc@lelangmobil.com → youremail@gmail.com
✅ Created: marketing@lelangmobil.com → youremail@gmail.com
✅ Created: sales@lelangmobil.com → youremail@gmail.com
✅ Created: legal@lelangmobil.com → youremail@gmail.com
✅ Created: billing@lelangmobil.com → youremail@gmail.com
✅ Created: help@lelangmobil.com → youremail@gmail.com
✅ Created: contact@lelangmobil.com → youremail@gmail.com
✅ Created: cs@lelangmobil.com → youremail@gmail.com
✅ Created: bantuan@lelangmobil.com → youremail@gmail.com
✅ Created: webmaster@lelangmobil.com → youremail@gmail.com
✅ Created: postmaster@lelangmobil.com → youremail@gmail.com
✅ Created: hello@lelangmobil.com → youremail@gmail.com
✅ Created: halo@lelangmobil.com → youremail@gmail.com
✅ Created: notifications@lelangmobil.com → youremail@gmail.com
✅ Created: newsletter@lelangmobil.com → youremail@gmail.com

🌐 Adding DNS records...
✅ SPF record added
✅ DMARC record added

✅ Setup complete!

📋 Summary:
   - 22 email routes created
   - All emails forward to: youremail@gmail.com
   - SPF and DMARC records added

🎉 Your email routing is ready!
\`\`\`

---

## ✅ Hasil Akhir

### 22 Email Addresses (Semua forward ke Gmail Anda):

**Primary:**
1. admin@lelangmobil.com
2. support@lelangmobil.com
3. info@lelangmobil.com
4. kyc@lelangmobil.com
5. finance@lelangmobil.com

**System:**
6. noreply@lelangmobil.com
7. security@lelangmobil.com
8. dmarc@lelangmobil.com

**Business:**
9. marketing@lelangmobil.com
10. sales@lelangmobil.com
11. legal@lelangmobil.com
12. billing@lelangmobil.com

**Aliases:**
13. help@lelangmobil.com
14. contact@lelangmobil.com
15. cs@lelangmobil.com
16. bantuan@lelangmobil.com
17. webmaster@lelangmobil.com
18. postmaster@lelangmobil.com
19. hello@lelangmobil.com
20. halo@lelangmobil.com
21. notifications@lelangmobil.com
22. newsletter@lelangmobil.com

**DNS Records:**
- ✅ SPF: v=spf1 include:_spf.mx.cloudflare.net ~all
- ✅ DMARC: v=DMARC1; p=quarantine; rua=mailto:dmarc@lelangmobil.com

---

## 📧 Cara Kirim Email (Gmail)

### Setup "Send mail as" di Gmail:

\`\`\`
1. Gmail → Settings → Accounts and Import
2. Send mail as → Add another email address
3. Name: LELANGMOBIL.COM
4. Email: admin@lelangmobil.com
5. Treat as alias: YES
6. Next Step
7. SMTP Server: smtp.gmail.com
8. Port: 587
9. Username: youremail@gmail.com
10. Password: [App Password - buat di Google Account]
11. Verify
\`\`\`

Ulangi untuk email lain (support@, info@, dll)

---

## 🔧 Verify Setup

### Test Email:
\`\`\`
1. Kirim email ke admin@lelangmobil.com
2. Check Gmail inbox
3. Email harus masuk dalam 1-2 menit
\`\`\`

### Check DNS:
\`\`\`
https://mxtoolbox.com/SuperTool.aspx
Enter: lelangmobil.com
Check: MX, SPF, DMARC
\`\`\`

### Check Deliverability:
\`\`\`
https://www.mail-tester.com
Kirim email dari Gmail (as admin@lelangmobil.com)
Target score: 10/10
\`\`\`

---

## 📊 Manage Email Routing

### Cloudflare Dashboard:
\`\`\`
1. Login dash.cloudflare.com
2. Select domain: lelangmobil.com
3. Email → Email Routing
4. View/Edit/Delete routes
\`\`\`

### Add More Routes:
\`\`\`
Dashboard → Email Routing → Routing rules → Create address
\`\`\`

---

## 💰 Biaya

**GRATIS SELAMANYA:**
- ✅ Unlimited email addresses
- ✅ Unlimited forwarding
- ✅ Spam protection
- ✅ No inbox (forward only)

---

## 🚨 Troubleshooting

### Script error "Invalid API Token"
\`\`\`
- Check API token masih valid
- Check permissions: Email Routing Rules (Edit)
- Regenerate token jika perlu
\`\`\`

### Email tidak masuk Gmail
\`\`\`
- Check spam folder
- Verify destination email di Cloudflare
- Wait 5-10 menit untuk DNS propagation
\`\`\`

### Cannot send email
\`\`\`
- Setup "Send mail as" di Gmail
- Use App Password (bukan password Gmail biasa)
- Enable "Less secure app access" jika perlu
\`\`\`

---

## 📞 Support

- Cloudflare Docs: https://developers.cloudflare.com/email-routing/
- Community: https://community.cloudflare.com/
- Status: https://www.cloudflarestatus.com/

---

## ✅ Checklist

- [ ] Cloudflare API Token created
- [ ] Zone ID copied
- [ ] Script edited with credentials
- [ ] Node.js installed
- [ ] Script executed successfully
- [ ] Destination email verified
- [ ] All 22 routes created
- [ ] DNS records added
- [ ] Test email sent & received
- [ ] Gmail "Send mail as" configured
- [ ] Mail-tester.com score 10/10

**TOTAL WAKTU: 5-10 MENIT**
**TOTAL BIAYA: Rp 0 (GRATIS SELAMANYA)**

🎉 **SEMUA EMAIL SIAP OTOMATIS!**
