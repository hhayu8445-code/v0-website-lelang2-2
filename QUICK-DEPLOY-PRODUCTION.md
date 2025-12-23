# ⚡ QUICK DEPLOY - lelangmobil.com

## 🎯 5 LANGKAH CEPAT (10 MENIT):

### **1. ADD DOMAIN DI VERCEL (2 menit)**
```
https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/domains

Add: lelangmobil.com
Add: www.lelangmobil.com
```

### **2. CONFIGURE DNS (3 menit)**
Di DNS provider Anda, tambahkan:

```
A Record:
@ → 76.76.21.21

CNAME Record:
www → cname.vercel-dns.com
```

### **3. UPDATE ENV VAR (1 menit)**
```
https://vercel.com/hah-cc4988b5/v0-website-lelang2-2/settings/environment-variables

NEXT_PUBLIC_SITE_URL = https://www.lelangmobil.com
```

### **4. UPDATE SUPABASE (2 menit)**
```
https://supabase.com/dashboard/project/gfghpfrinfhtogzmyddh/auth/url-configuration

Site URL: https://www.lelangmobil.com

Redirect URLs:
- https://www.lelangmobil.com/auth/callback
- https://www.lelangmobil.com/**
- https://lelangmobil.com/auth/callback
- https://lelangmobil.com/**
```

### **5. REDEPLOY (2 menit)**
```bash
git commit --allow-empty -m "Deploy to lelangmobil.com"
git push origin main
```

---

## ✅ DONE!

Website live di: **https://www.lelangmobil.com** 🚀

