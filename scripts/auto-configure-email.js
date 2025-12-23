// ============================================
// AUTO CONFIGURE SUPABASE EMAIL VERIFICATION
// ============================================
// Run: node scripts/auto-configure-email.js
// ============================================

const https = require('https');

// Configuration
const SUPABASE_PROJECT_REF = 'gfghpfrinfhtogzmyddh';
const SUPABASE_URL = `https://${SUPABASE_PROJECT_REF}.supabase.co`;
const SITE_URL = 'https://v0-website-lelang2-2.vercel.app';

// Get Service Role Key from environment or prompt
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_ROLE_KEY_HERE';

console.log('🚀 Starting Supabase Email Configuration...\n');

// Function to make API request
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${SUPABASE_PROJECT_REF}.supabase.co`,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ statusCode: res.statusCode, body: body });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Main configuration function
async function configureEmail() {
  try {
    console.log('📧 Configuring email verification settings...');
    
    // Note: Supabase Management API untuk auth config memerlukan
    // akses ke Management API yang berbeda dari REST API biasa
    // Konfigurasi ini harus dilakukan via Dashboard UI
    
    console.log('\n⚠️  IMPORTANT:');
    console.log('Supabase email configuration harus dilakukan via Dashboard UI.');
    console.log('Management API untuk auth config tidak tersedia via REST API.\n');
    
    console.log('📋 Manual Steps Required:');
    console.log('1. Go to: https://supabase.com/dashboard/project/gfghpfrinfhtogzmyddh/auth/settings');
    console.log('2. Enable email confirmations: ON');
    console.log('3. Secure email change: ON');
    console.log('4. Save\n');
    
    console.log('5. Go to: https://supabase.com/dashboard/project/gfghpfrinfhtogzmyddh/auth/templates');
    console.log('6. Select "Confirm signup"');
    console.log('7. From email: onboarding@resend.dev');
    console.log('8. Save\n');
    
    console.log('9. Go to: https://supabase.com/dashboard/project/gfghpfrinfhtogzmyddh/auth/url-configuration');
    console.log(`10. Site URL: ${SITE_URL}`);
    console.log(`11. Redirect URLs: ${SITE_URL}/auth/callback`);
    console.log(`12. Redirect URLs: ${SITE_URL}/**`);
    console.log('13. Save\n');
    
    console.log('✅ Configuration guide displayed!');
    console.log('⏱️  Estimated time: 2 minutes\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run configuration
configureEmail();
