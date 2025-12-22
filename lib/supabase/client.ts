import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

let browserClientInstance: ReturnType<typeof createSupabaseBrowserClient> | null = null

export function createBrowserClient() {
  // Only run on client side
  if (typeof window === "undefined") {
    return null
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[Supabase] Missing environment variables")
    return null
  }

  // Return existing instance if available
  if (browserClientInstance) {
    return browserClientInstance
  }

  // Create new instance only once
  browserClientInstance = createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  })

  return browserClientInstance
}

export const getSupabaseBrowserClient = createBrowserClient
