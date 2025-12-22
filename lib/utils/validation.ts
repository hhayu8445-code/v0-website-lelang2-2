/**
 * Sanitize string input to prevent XSS and injection attacks
 */
export function sanitizeString(input: string | null | undefined): string {
  if (!input) return ""
  return String(input)
    .trim()
    .replace(/[<>\"']/g, "")
    .slice(0, 1000) // Max length
}

/**
 * Sanitize email - preserve @ and .
 */
export function sanitizeEmail(input: string | null | undefined): string {
  if (!input) return ""
  return String(input)
    .trim()
    .toLowerCase()
    .slice(0, 254)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Validate phone number (Indonesian format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/
  return phoneRegex.test(phone.replace(/[\s-]/g, ""))
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8 && password.length <= 128
}

/**
 * Sanitize numeric input
 */
export function sanitizeNumber(input: any): number {
  const num = Number(input)
  return isNaN(num) ? 0 : Math.max(0, num)
}
