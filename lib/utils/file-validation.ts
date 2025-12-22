/**
 * File upload security utilities
 */

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const ALLOWED_DOCUMENT_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "File tidak ditemukan" }
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP" }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "Ukuran file maksimal 5MB" }
  }

  return { valid: true }
}

export function validateDocumentFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "File tidak ditemukan" }
  }

  if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
    return { valid: false, error: "Format file tidak didukung. Gunakan PDF, JPG, atau PNG" }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "Ukuran file maksimal 5MB" }
  }

  return { valid: true }
}

export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_{2,}/g, "_")
    .slice(0, 100)
}
