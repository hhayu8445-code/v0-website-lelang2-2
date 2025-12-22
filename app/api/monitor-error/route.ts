import { type NextRequest, NextResponse } from "next/server"
import { monitorError } from "@/lib/ai/error-monitor"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { error, stack, componentStack, context } = body

    // Monitor the error with AI auto-fix
    const result = await monitorError(error, {
      stack,
      componentStack,
      ...context,
    })

    return NextResponse.json({
      success: true,
      logged: result.logged,
      autoFixed: result.autoFixed,
      suggestion: result.suggestion,
    })
  } catch (err) {
    console.error("[v0] Error monitoring endpoint failed:", err)
    return NextResponse.json({ success: false, error: "Failed to monitor error" }, { status: 500 })
  }
}

export const runtime = "nodejs"
