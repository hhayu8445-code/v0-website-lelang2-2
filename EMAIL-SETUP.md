# Email Configuration Guide

## 📧 Email Templates Setup

### Templates Created:
1. ✅ `verify-email.html` - Email verification
2. ✅ `reset-password.html` - Password reset
3. ✅ `welcome.html` - Welcome after verification

## 🔧 Supabase Configuration

### Step 1: Access Supabase Dashboard
1. Go to your Supabase project
2. Navigate to **Authentication** → **Email Templates**

### Step 2: Configure Email Templates

#### A. Confirm Signup (Email Verification)
\`\`\`
Subject: Verifikasi Email Anda - LELANGMOBIL.COM
\`\`\`
Copy content from `emails/verify-email.html`

**Variables available:**
- `{{ .ConfirmationURL }}` - Verification link
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's email

#### B. Reset Password
\`\`\`
Subject: Reset Password Anda - LELANGMOBIL.COM
\`\`\`
Copy content from `emails/reset-password.html`

**Variables available:**
- `{{ .ConfirmationURL }}` - Reset password link
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's email

#### C. Magic Link (Optional)
\`\`\`
Subject: Login ke LELANGMOBIL.COM
\`\`\`

### Step 3: Configure Redirect URLs

Add to `.env.local`:
\`\`\`env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
\`\`\`

For production:
\`\`\`env
NEXT_PUBLIC_SITE_URL=https://lelangmobil.com
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=https://lelangmobil.com/auth/callback
\`\`\`

### Step 4: Update Supabase Settings

In Supabase Dashboard → **Authentication** → **URL Configuration**:

**Site URL:**
- Development: `http://localhost:3000`
- Production: `https://lelangmobil.com`

**Redirect URLs (Add these):**
- `http://localhost:3000/auth/callback`
- `http://localhost:3000/dashboard`
- `https://lelangmobil.com/auth/callback`
- `https://lelangmobil.com/dashboard`

## 📱 Email Template Features

### Design Features:
- ✅ Responsive design (mobile-friendly)
- ✅ Brand colors (Red gradient)
- ✅ Professional layout
- ✅ Clear call-to-action buttons
- ✅ Security notices
- ✅ Footer with links

### Content Features:
- ✅ Bonus information (Rp 2.500.000)
- ✅ Step-by-step instructions
- ✅ Security tips
- ✅ Support contact info
- ✅ Company branding

## 🔐 Security Settings

### Email Rate Limiting
Already configured in `lib/actions/auth.ts`:
- Signup: 5 attempts per 5 minutes
- Signin: 10 attempts per 5 minutes

### Email Validation
Already configured in `lib/utils/validation.ts`:
- Email format validation
- Domain validation
- Length validation (max 254 chars)

## 🧪 Testing

### Test Email Verification:
1. Register new account
2. Check email inbox
3. Click verification link
4. Should redirect to dashboard

### Test Password Reset:
1. Go to forgot password page
2. Enter email
3. Check email inbox
4. Click reset link
5. Enter new password

## 📊 Email Analytics

Track in Supabase Dashboard:
- **Authentication** → **Users** → Check email_confirmed_at
- Monitor bounce rates
- Check delivery status

## 🎨 Customization

To customize templates:
1. Edit HTML files in `emails/` folder
2. Update Supabase email templates
3. Test with real email addresses
4. Deploy changes

### Brand Colors:
- Primary: `#dc2626` (Red)
- Secondary: `#991b1b` (Dark Red)
- Accent: `#f59e0b` (Amber)
- Background: `#f5f5f5` (Light Gray)

## 🚨 Troubleshooting

### Email not received?
- Check spam folder
- Verify email address is correct
- Check Supabase logs
- Verify SMTP settings

### Link not working?
- Check redirect URLs in Supabase
- Verify environment variables
- Check browser console for errors

### Template not updating?
- Clear Supabase cache
- Wait 5 minutes for propagation
- Test with incognito mode

## 📞 Support

For email issues:
- Email: support@lelangmobil.com
- Check Supabase documentation
- Review authentication logs
