import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware untuk static files dan API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Check admin routes
  if (pathname.startsWith("/admin")) {
    try {
      const supabase = await getSupabaseServerClient()
      
      if (!supabase) {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from("users")
        .select("is_admin, role")
        .eq("id", user.id)
        .single()

      const isAdmin = profile?.is_admin === true || profile?.role === "admin"

      if (!isAdmin) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      console.error("Middleware error:", error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
