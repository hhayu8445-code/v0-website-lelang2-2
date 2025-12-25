# ⚠️ CRITICAL: SETUP VERCEL ENVIRONMENT VARIABLES

## 🚨 WEBSITE TIDAK AKAN JALAN TANPA INI!

Vercel sudah auto-deploy, tapi **butuh environment variables** untuk connect ke database.

---

## 📋 LANGKAH CEPAT (5 MENIT)

### STEP 1: Login Vercel
```
URL: https://vercel.com/dashboard
```

### STEP 2: Pilih Project
```
Project: v0-website-lelang2-2
Klik project tersebut
```

### STEP 3: Buka Settings
```
Tab: Settings
Menu: Environment Variables
```

### STEP 4: Add 6 Variables

**⚠️ PENTING: Anda butuh Supabase keys dulu!**

Jika belum punya, ikuti: `ALL-IN-ONE-COMPLETE.md` Step 1-3

---

## 🔑 VARIABLES YANG DIBUTUHKAN:

### Variable 1: NEXT_PUBLIC_SUPABASE_URL
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co
Environment: ✅ Production
[Save]
```

### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environment: ✅ Production
[Save]
```

### Variable 3: SUPABASE_SERVICE_ROLE_KEY
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Environment: ✅ Production
[Save]
```

### Variable 4: NEXT_PUBLIC_SITE_URL
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://v0-website-lelang2-2-ecru.vercel.app
Environment: ✅ Production
[Save]
```

### Variable 5: CSRF_SECRET
```
Key: CSRF_SECRET
Value: 1trJVERmCQqeDKkXBPZnaiGNUI43Hp6c
Environment: ✅ Production
[Save]
```

### Variable 6: NEXT_PUBLIC_WHATSAPP_NUMBER
```
Key: NEXT_PUBLIC_WHATSAPP_NUMBER
Value: 62882022783493
Environment: ✅ Production
[Save]
```

---

## ✅ SETELAH SEMUA DI-ADD:

### Redeploy (Jika perlu)
```
Tab: Deployments
Klik: ... (3 dots) pada deployment terbaru
Klik: Redeploy
```

### Wait
```
Status: Building... → Ready
Time: 2-3 minutes
```

### Test
```
URL: https://v0-website-lelang2-2-ecru.vercel.app
```

---

## 🎯 CHECKLIST:

```
[  ] Login Vercel
[  ] Pilih project
[  ] Buka Settings → Environment Variables
[  ] Add NEXT_PUBLIC_SUPABASE_URL
[  ] Add NEXT_PUBLIC_SUPABASE_ANON_KEY
[  ] Add SUPABASE_SERVICE_ROLE_KEY
[  ] Add NEXT_PUBLIC_SITE_URL
[  ] Add CSRF_SECRET
[  ] Add NEXT_PUBLIC_WHATSAPP_NUMBER
[  ] Redeploy (if needed)
[  ] Test production URL
```

---

## 📞 NEED HELP?

**Full Guide:** `ALL-IN-ONE-COMPLETE.md`

**Support:** WhatsApp +62 882-0227-83493

---

**SETUP INI WAJIB UNTUK WEBSITE JALAN!** ⚠️
