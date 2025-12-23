# 🚀 DEPLOY TO PRODUCTION - lelangmobil.com

## 🎯 DOMAIN PRODUCTION:
```
https://www.lelangmobil.com
```

---

## ✅ LANGKAH 1: UPDATE VERCEL DOMAIN (2 MENIT)

### **A. Buka Vercel Dashboard:**
```
https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/domains
```

### **B. Add Custom Domain:**
```
1. Klik "Add"
2. Masukkan: lelangmobil.com
3. Klik "Add"
4. Masukkan: www.lelangmobil.com
5. Klik "Add"
```

### **C. Configure DNS:**
Vercel akan memberikan DNS records. Tambahkan ke DNS provider Anda:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## ✅ LANGKAH 2: UPDATE ENVIRONMENT VARIABLES (1 MENIT)

### **Buka:**
```
https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/environment-variables
```

### **Update Variable:**
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://www.lelangmobil.com
Environment: Production
```

Klik "Save"

---

## ✅ LANGKAH 3: UPDATE SUPABASE REDIRECT URLs (2 MENIT)

### **Buka:**
```
https://supabase.com/dashboard/project/gfghpfrinfhtogzmyddh/auth/url-configuration
```

### **Site URL:**
```
https://www.lelangmobil.com
```

### **Redirect URLs (tambahkan semua):**
```
https://www.lelangmobil.com/auth/callback
https://www.lelangmobil.com/**
https://lelangmobil.com/auth/callback
https://lelangmobil.com/**
https://v0-website-lelang2-2.vercel.app/auth/callback
https://v0-website-lelang2-2.vercel.app/**
```

Klik "Save"

---

## ✅ LANGKAH 4: REDEPLOY (1 MENIT)

### **Option A - Via Dashboard:**
```
1. Go to: https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/deployments
2. Klik "..." di deployment terakhir
3. Klik "Redeploy"
4. Tunggu build selesai
```

### **Option B - Via Git:**
```bash
git commit --allow-empty -m "Deploy to lelangmobil.com"
git push origin main
```

---

## ✅ LANGKAH 5: VERIFY SSL (AUTO)

Vercel akan otomatis provision SSL certificate untuk domain Anda.

**Check SSL:**
```
https://www.lelangmobil.com
```

Pastikan:
- ✅ HTTPS aktif
- ✅ Padlock icon muncul
- ✅ Certificate valid

---

## 🧪 TEST PRODUCTION:

### **1. Homepage:**
```
https://www.lelangmobil.com
```

### **2. Registration:**
```
https://www.lelangmobil.com/register
```

### **3. Login:**
```
https://www.lelangmobil.com/login
```

### **4. Admin Panel:**
```
https://www.lelangmobil.com/admin
```

---

## 📊 CHECKLIST:

```
[ ] Domain added to Vercel
[ ] DNS configured
[ ] Environment variables updated
[ ] Supabase redirect URLs updated
[ ] Redeployed
[ ] SSL certificate active
[ ] Homepage accessible
[ ] Registration working
[ ] Email verification working
[ ] Login working
[ ] Admin panel working
```

---

## 🎉 DONE!

Website sekarang live di:
- ✅ https://www.lelangmobil.com
- ✅ https://lelangmobil.com (redirect ke www)
- ✅ https://v0-website-lelang2-2.vercel.app (backup)

**Production ready!** 🚀

