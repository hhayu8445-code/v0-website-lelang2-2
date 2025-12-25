"use server"

interface ErrorLog {
  timestamp: Date
  error: Error | string
  fixed: boolean
  suggestion?: string
}

// In-memory error log (in production, store in database)
const errorLogs: ErrorLog[] = []

/**
 * Global error monitoring system
 * Captures errors for debugging (AI features disabled)
 */
export async function monitorError(
  error: Error | string,
  context?: Record<string, any>,
): Promise<{ logged: boolean; autoFixed: boolean; suggestion?: string }> {
  console.error("[Error Monitor]", error)
  if (context) {
    console.error("[Context]", context)
  }

  // Log the error
  errorLogs.push({
    timestamp: new Date(),
    error,
    fixed: false,
  })

  return {
    logged: true,
    autoFixed: false,
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
