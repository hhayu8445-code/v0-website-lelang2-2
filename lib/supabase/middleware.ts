import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
    )
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
      },
    },
  })

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error && error.message !== "Auth session missing!") {
      console.error("[MIDDLEWARE] Auth error:", error.message)
    }

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && (!user || user.email !== "admin@lelangmobil.com")) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", "/admin")
      return NextResponse.redirect(loginUrl)
    }

    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", "/dashboard")
      return NextResponse.redirect(loginUrl)
    }
  } catch (error) {
    console.error("[MIDDLEWARE] Unexpected error:", error)
  }

  return supabaseResponse
}
