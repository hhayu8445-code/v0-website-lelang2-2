import { cookies } from "next/headers"
import { randomBytes } from "crypto"

const CSRF_TOKEN_NAME = "csrf_token"
const CSRF_TOKEN_LENGTH = 32

/**
 * Generate CSRF token
 */
export async function generateCSRFToken(): Promise<string> {
  const token = randomBytes(CSRF_TOKEN_LENGTH).toString("hex")
  const cookieStore = await cookies()
  
  cookieStore.set(CSRF_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
  })
  
  return token
}

/**
 * Verify CSRF token
 */
export async function verifyCSRFToken(token: string): Promise<boolean> {
  const cookieStore = await cookies()
  const storedToken = cookieStore.get(CSRF_TOKEN_NAME)?.value
  
  if (!storedToken || !token) {
    return false
  }
  
  return storedToken === token
}
