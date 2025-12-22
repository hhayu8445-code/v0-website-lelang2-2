import { NextResponse } from "next/server"
import { updateSEOWithSemrush } from "@/lib/services/seo-service"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (userData?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Sync with Semrush
    const result = await updateSEOWithSemrush("lelangmobil.com")

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error syncing SEO:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Auto-sync endpoint (can be called by cron job)
export async function GET() {
  try {
    const result = await updateSEOWithSemrush("lelangmobil.com")
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error auto-syncing SEO:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
