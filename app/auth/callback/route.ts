import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") || "/dashboard"

  if (code) {
    try {
      const cookieStore = await cookies()
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) => {
                  cookieStore.set(name, value, options)
                })
              } catch (error) {
                console.error("[AUTH CALLBACK] Error setting cookies:", error)
              }
            },
          },
        },
      )

      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("[AUTH CALLBACK] Exchange code error:", error.message)

        if (error.message.includes("Redirect")) {
          return NextResponse.redirect(new URL("/login?error=redirect_error", requestUrl.origin))
        }

        return NextResponse.redirect(new URL("/login?error=auth_failed", requestUrl.origin))
      }

      if (data.session) {
        console.log("[AUTH CALLBACK] Session established successfully")
        return NextResponse.redirect(new URL(next, requestUrl.origin))
      }
    } catch (error: any) {
      console.error("[AUTH CALLBACK] Unexpected error:", error?.message || error)
      return NextResponse.redirect(new URL("/login?error=callback_failed", requestUrl.origin))
    }
  }

  console.warn("[AUTH CALLBACK] No auth code provided")
  return NextResponse.redirect(new URL("/login?error=no_code", requestUrl.origin))
}
