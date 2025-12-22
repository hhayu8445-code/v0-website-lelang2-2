# 🚀 Setup Email di Spaceship (Niagahoster)

## ✅ KABAR BAIK!

Spaceship/Niagahoster sudah include **UNLIMITED email accounts** di semua paket hosting!

**Sudah Termasuk:**
- ✅ Unlimited email accounts
- ✅ Unlimited aliases/forwarders
- ✅ Webmail (Roundcube/Horde)
- ✅ IMAP/POP3/SMTP
- ✅ Spam protection
- ✅ Mobile access
- ✅ Email forwarding

**Tidak Perlu Bayar Tambahan!**

---

## 🎯 CARA MEMBUAT SEMUA EMAIL (10 Menit)

### Step 1: Login ke cPanel (1 menit)
\`\`\`
1. Login ke member.niagahoster.co.id
2. Pilih hosting Anda
3. Klik "Kelola Hosting"
4. Atau langsung ke cPanel: https://cpanel.niagahoster.co.id
\`\`\`

### Step 2: Buka Email Accounts (1 menit)
\`\`\`
1. Di cPanel, cari "Email Accounts"
2. Atau scroll ke section "EMAIL"
3. Klik "Email Accounts"
\`\`\`

### Step 3: Create Email Accounts (5 menit)
\`\`\`
Klik "Create" untuk setiap email:

Email 1:
Username: admin
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 2:
Username: support
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 3:
Username: info
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 4:
Username: kyc
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 5:
Username: finance
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 6:
Username: noreply
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 7:
Username: security
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 8:
Username: dmarc
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 9:
Username: marketing
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 10:
Username: sales
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 11:
Username: legal
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create

Email 12:
Username: billing
Domain: @lelangmobil.com
Password: [generate strong password]
Mailbox Quota: Unlimited
✅ Create
\`\`\`

### Step 4: Setup Email Forwarders/Aliases (3 menit)
\`\`\`
cPanel → Email → Forwarders → Add Forwarder

Forward 1:
help@lelangmobil.com → support@lelangmobil.com

Forward 2:
contact@lelangmobil.com → support@lelangmobil.com

Forward 3:
cs@lelangmobil.com → support@lelangmobil.com

Forward 4:
bantuan@lelangmobil.com → support@lelangmobil.com

Forward 5:
webmaster@lelangmobil.com → admin@lelangmobil.com

Forward 6:
postmaster@lelangmobil.com → admin@lelangmobil.com

Forward 7:
hello@lelangmobil.com → info@lelangmobil.com

Forward 8:
halo@lelangmobil.com → info@lelangmobil.com

Forward 9:
notifications@lelangmobil.com → noreply@lelangmobil.com

Forward 10:
newsletter@lelangmobil.com → marketing@lelangmobil.com
\`\`\`

---

## 📧 AKSES EMAIL

### Option 1: Webmail (Paling Mudah)
\`\`\`
URL: https://webmail.lelangmobil.com
atau: https://lelangmobil.com:2096

Login:
Email: admin@lelangmobil.com
Password: [password yang dibuat]

Interface: Roundcube (recommended) atau Horde
\`\`\`

### Option 2: Gmail (Recommended)
\`\`\`
Gmail → Settings → Accounts → Add another email

Incoming (IMAP):
Server: mail.lelangmobil.com
Port: 993
Security: SSL/TLS
Username: admin@lelangmobil.com
Password: [your password]

Outgoing (SMTP):
Server: mail.lelangmobil.com
Port: 465
Security: SSL/TLS
Username: admin@lelangmobil.com
Password: [your password]
\`\`\`

### Option 3: Outlook
\`\`\`
File → Add Account → Manual setup

Email: admin@lelangmobil.com
Password: [your password]

Incoming:
Server: mail.lelangmobil.com
Port: 993
Encryption: SSL/TLS

Outgoing:
Server: mail.lelangmobil.com
Port: 465
Encryption: SSL/TLS
\`\`\`

### Option 4: Mobile (iOS/Android)
\`\`\`
Settings → Mail → Add Account → Other

Email: admin@lelangmobil.com
Password: [your password]

IMAP:
Host: mail.lelangmobil.com
Port: 993
SSL: ON

SMTP:
Host: mail.lelangmobil.com
Port: 465
SSL: ON
\`\`\`

---

## 🔐 KONFIGURASI DNS (Auto-Configured)

Spaceship sudah auto-configure DNS records:

**MX Record (Sudah Ada):**
\`\`\`
Type: MX
Name: @
Value: mail.lelangmobil.com
Priority: 0
\`\`\`

**SPF Record (Tambahkan Manual):**
\`\`\`
cPanel → Zone Editor → Add Record

Type: TXT
Name: @
Value: v=spf1 a mx ip4:[IP server Anda] ~all
TTL: 14400
\`\`\`

**DKIM (Enable di cPanel):**
\`\`\`
cPanel → Email → Email Deliverability
→ Manage → Enable DKIM
\`\`\`

**DMARC Record (Tambahkan Manual):**
\`\`\`
cPanel → Zone Editor → Add Record

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@lelangmobil.com
TTL: 14400
\`\`\`

---

## ✅ HASIL AKHIR

### 12 Email Accounts Aktif:
1. ✅ admin@lelangmobil.com
2. ✅ support@lelangmobil.com
3. ✅ info@lelangmobil.com
4. ✅ kyc@lelangmobil.com
5. ✅ finance@lelangmobil.com
6. ✅ noreply@lelangmobil.com
7. ✅ security@lelangmobil.com
8. ✅ dmarc@lelangmobil.com
9. ✅ marketing@lelangmobil.com
10. ✅ sales@lelangmobil.com
11. ✅ legal@lelangmobil.com
12. ✅ billing@lelangmobil.com

### 10+ Email Forwarders:
1. ✅ help@ → support@
2. ✅ contact@ → support@
3. ✅ cs@ → support@
4. ✅ bantuan@ → support@
5. ✅ webmaster@ → admin@
6. ✅ postmaster@ → admin@
7. ✅ hello@ → info@
8. ✅ halo@ → info@
9. ✅ notifications@ → noreply@
10. ✅ newsletter@ → marketing@

**Total: 22+ email addresses**
**Biaya: Rp 0 (Sudah include di hosting)**

---

## 🔧 TIPS & TRICKS

### 1. Auto-Responder (Jam Kerja)
\`\`\`
cPanel → Email → Autoresponders
→ Add Autoresponder

Email: support@lelangmobil.com
Subject: Terima kasih telah menghubungi kami
Body: 
"Terima kasih telah menghubungi LELANGMOBIL.COM.
Tim kami akan merespons dalam 1x24 jam.

Jam Kerja: Senin-Jumat 09:00-17:00 WIB

Salam,
Tim Support LELANGMOBIL.COM"

Start/Stop: Set jam kerja
\`\`\`

### 2. Email Filters (Anti-Spam)
\`\`\`
cPanel → Email → Email Filters
→ Create Filter

Rules:
- If subject contains "viagra" → Delete
- If from contains "spam" → Delete
- If spam score > 5 → Move to Spam folder
\`\`\`

### 3. Catch-All Email
\`\`\`
cPanel → Email → Default Address
→ Set default address

Forward to: admin@lelangmobil.com

Semua email ke *@lelangmobil.com akan masuk ke admin@
\`\`\`

### 4. Email Quota Management
\`\`\`
cPanel → Email Accounts → Manage

Set quota per email:
- admin@: Unlimited
- support@: Unlimited
- info@: 5GB
- kyc@: 10GB (untuk dokumen)
- finance@: 10GB
- Others: 2GB
\`\`\`

---

## 📊 MONITORING

### Check Email Deliverability
\`\`\`
cPanel → Email → Email Deliverability
→ View Report

Check:
- ✅ Valid rDNS
- ✅ Valid SPF
- ✅ Valid DKIM
- ✅ No blacklist

Score harus: EXCELLENT
\`\`\`

### Email Usage Statistics
\`\`\`
cPanel → Metrics → Email Statistics

Monitor:
- Emails sent/received
- Storage usage
- Spam score
- Bounce rate
\`\`\`

---

## 🚨 TROUBLESHOOTING

### Email tidak terkirim?
\`\`\`
1. Check email quota (cPanel → Email Accounts)
2. Check spam score (cPanel → Email Deliverability)
3. Verify SPF/DKIM records
4. Check blacklist: mxtoolbox.com
\`\`\`

### Email masuk spam?
\`\`\`
1. Enable DKIM (cPanel → Email Deliverability)
2. Add SPF record
3. Add DMARC record
4. Warm up email (kirim bertahap)
5. Test: mail-tester.com
\`\`\`

### Tidak bisa login webmail?
\`\`\`
1. Check password
2. Clear browser cache
3. Try different browser
4. Contact Niagahoster support
\`\`\`

---

## 📞 SUPPORT

**Niagahoster Support:**
- Live Chat: 24/7 di member area
- WhatsApp: 0804-1-808-888
- Email: cs@niagahoster.co.id
- Ticket: member.niagahoster.co.id

**Tutorial Video:**
- YouTube: Niagahoster Official
- Knowledge Base: niagahoster.co.id/kb

---

## ✅ CHECKLIST FINAL

- [ ] 12 email accounts created
- [ ] 10 forwarders configured
- [ ] SPF record added
- [ ] DKIM enabled
- [ ] DMARC record added
- [ ] Webmail tested
- [ ] Gmail integration setup
- [ ] Mobile app configured
- [ ] Auto-responder set
- [ ] Email filters created
- [ ] Deliverability score: EXCELLENT
- [ ] Test email sent & received
- [ ] Not in spam folder
- [ ] Mail-tester.com score 10/10

**TOTAL WAKTU: 15-20 MENIT**
**TOTAL BIAYA: Rp 0 (Include di hosting)**

🎉 **SEMUA EMAIL SIAP DIGUNAKAN!**
