"use server"

import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

interface ErrorContext {
  error: Error | string
  file?: string
  line?: number
  component?: string
  context?: Record<string, any>
}

interface FixSuggestion {
  diagnosis: string
  fix: string
  confidence: number
  preventiveMeasures?: string[]
}

/**
 * AI-powered error detection and automatic fix system using Grok
 * Analyzes errors and provides intelligent solutions
 */
export async function analyzeAndFixError(errorContext: ErrorContext): Promise<FixSuggestion> {
  try {
    const errorMessage = typeof errorContext.error === "string" ? errorContext.error : errorContext.error.message

    const prompt = `You are an expert Next.js and TypeScript developer debugging an error in a car auction platform.

ERROR DETAILS:
- Error: ${errorMessage}
${errorContext.file ? `- File: ${errorContext.file}` : ""}
${errorContext.line ? `- Line: ${errorContext.line}` : ""}
${errorContext.component ? `- Component: ${errorContext.component}` : ""}
${errorContext.context ? `- Context: ${JSON.stringify(errorContext.context, null, 2)}` : ""}

ANALYZE AND FIX:
1. Diagnose the root cause of this error
2. Provide the exact fix needed (code solution)
3. Rate your confidence (0-100)
4. Suggest preventive measures

Respond in JSON format:
{
  "diagnosis": "Root cause explanation",
  "fix": "Exact code or solution",
  "confidence": 95,
  "preventiveMeasures": ["measure1", "measure2"]
}`

    const { text } = await generateText({
      model: xai("grok-2-1212"),
      prompt,
      temperature: 0.3,
      maxOutputTokens: 1000,
    })

    // Parse the AI response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response")
    }

    const suggestion: FixSuggestion = JSON.parse(jsonMatch[0])

    console.log("[v0] AI Auto-Fix Analysis:", {
      error: errorMessage,
      confidence: suggestion.confidence,
      fix: suggestion.fix.substring(0, 100) + "...",
    })

    return suggestion
  } catch (error) {
    console.error("[v0] AI Auto-Fix Error:", error)
    return {
      diagnosis: "Failed to analyze error with AI",
      fix: "Please check the error manually",
      confidence: 0,
    }
  }
}

/**
 * Monitor and auto-fix common database errors
 */
export async function autoFixDatabaseError(
  error: Error,
  query: string,
): Promise<{ fixed: boolean; suggestion: string }> {
  const errorAnalysis = await analyzeAndFixError({
    error,
    context: { query, database: "Supabase PostgreSQL" },
  })

  if (errorAnalysis.confidence > 80) {
    console.log("[v0] High confidence fix available:", errorAnalysis.fix)
    return {
      fixed: true,
      suggestion: errorAnalysis.fix,
    }
  }

  return {
    fixed: false,
    suggestion: errorAnalysis.diagnosis,
  }
}

/**
 * Auto-fix build errors during deployment
 */
export async function autoFixBuildError(error: string, buildLogs?: string): Promise<FixSuggestion> {
  return analyzeAndFixError({
    error,
    context: {
      environment: "Vercel Build",
      logs: buildLogs?.substring(0, 500),
    },
  })
}

/**
 * Monitor and suggest fixes for runtime errors in components
 */
export async function autoFixComponentError(
  error: Error,
  componentName: string,
  props?: Record<string, any>,
): Promise<FixSuggestion> {
  return analyzeAndFixError({
    error,
    component: componentName,
    context: { props },
  })
}
