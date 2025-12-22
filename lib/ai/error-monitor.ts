"use server"

import { analyzeAndFixError } from "./auto-fix"

interface ErrorLog {
  timestamp: Date
  error: Error | string
  fixed: boolean
  suggestion?: string
}

// In-memory error log (in production, store in database)
const errorLogs: ErrorLog[] = []

/**
 * Global error monitoring and auto-fix system
 * Captures errors and attempts automatic fixes using AI
 */
export async function monitorError(
  error: Error | string,
  context?: Record<string, any>,
): Promise<{ logged: boolean; autoFixed: boolean; suggestion?: string }> {
  console.error("[v0] Error detected:", error)

  // Log the error
  errorLogs.push({
    timestamp: new Date(),
    error,
    fixed: false,
  })

  // Attempt auto-fix with AI
  try {
    const analysis = await analyzeAndFixError({
      error,
      context,
    })

    if (analysis.confidence > 70) {
      console.log("[v0] Auto-fix suggestion (confidence:", analysis.confidence + "):", analysis.fix)

      // Update log
      const lastLog = errorLogs[errorLogs.length - 1]
      if (lastLog) {
        lastLog.fixed = true
        lastLog.suggestion = analysis.fix
      }

      return {
        logged: true,
        autoFixed: true,
        suggestion: analysis.fix,
      }
    }

    return {
      logged: true,
      autoFixed: false,
      suggestion: analysis.diagnosis,
    }
  } catch (aiError) {
    console.error("[v0] AI monitoring failed:", aiError)
    return {
      logged: true,
      autoFixed: false,
    }
  }
}

/**
 * Get recent error logs for debugging
 */
export async function getErrorLogs(limit = 10): Promise<ErrorLog[]> {
  return errorLogs.slice(-limit).reverse()
}

/**
 * Clear error logs
 */
export async function clearErrorLogs(): Promise<void> {
  errorLogs.length = 0
}
