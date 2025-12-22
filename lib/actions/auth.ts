"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { sanitizeString, sanitizeEmail, isValidEmail, isValidPhone, isValidPassword } from "@/lib/utils/validation"
import { rateLimit } from "@/lib/utils/rate-limit"
import { headers } from "next/headers"

export async function signUp(formData: FormData) {
  // Rate limiting
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for") || "unknown"
  const rateLimitResult = rateLimit(`signup:${ip}`, 5, 300000)

  if (!rateLimitResult.success) {
    return { error: "Terlalu banyak percobaan. Silakan tunggu beberapa menit." }
  }
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return { error: "Koneksi database tidak tersedia. Silakan coba lagi nanti." }
  }

  const email = sanitizeEmail(formData.get("email") as string)
  const password = formData.get("password") as string
  const fullName = sanitizeString(formData.get("fullName") as string)
  const phone = sanitizeString(formData.get("phone") as string)

  if (!email || !password || !fullName) {
    return { error: "Mohon lengkapi semua data yang diperlukan." }
  }

  if (!isValidEmail(email)) {
    return { error: "Format email tidak valid." }
  }

  if (!isValidPassword(password)) {
    return { error: "Password harus minimal 8 karakter." }
  }

  if (phone && !isValidPhone(phone)) {
    return { error: "Format nomor telepon tidak valid." }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const redirectUrl = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${siteUrl}/auth/callback`

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    })

    if (authError) {
      console.error("Auth signup error:", authError.message)

      if (authError.message.includes("already registered") || authError.message.includes("already exists")) {
        return { error: "Email sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda." }
      }
      if (authError.message.includes("password")) {
        return { error: "Password harus minimal 8 karakter dan mengandung kombinasi huruf dan angka." }
      }
      if (authError.message.includes("email")) {
        return { error: `Format email tidak valid: ${authError.message}` }
      }
      return { error: `Gagal mendaftar: ${authError.message}` }
    }

    revalidatePath("/", "layout")
    return {
      success: true,
      message: "Registrasi berhasil! Silakan cek email untuk verifikasi.",
      needsEmailVerification: true,
    }
  } catch (error) {
    console.error("Unexpected signup error:", error)
    return { error: "Terjadi kesalahan sistem. Silakan coba lagi nanti." }
  }
}

export async function signIn(formData: FormData) {
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for") || "unknown"
  const rateLimitResult = rateLimit(`signin:${ip}`, 10, 300000)

  if (!rateLimitResult.success) {
    return { error: "Terlalu banyak percobaan login. Silakan tunggu beberapa menit." }
  }

  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return { error: "Koneksi database tidak tersedia. Silakan coba lagi nanti." }
  }

  const email = sanitizeEmail(formData.get("email") as string)
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Mohon masukkan email dan password." }
  }

  if (!isValidEmail(email)) {
    return { error: "Format email tidak valid." }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("[SERVER] Auth signin error:", error.message)

      if (error.message.includes("Redirect")) {
        console.error("[SERVER] Redirect configuration error - check SITE_URL and redirect URLs in Supabase dashboard")
        return { error: "Konfigurasi redirect tidak valid. Hubungi administrator." }
      }
      if (error.message.includes("Invalid login credentials")) {
        return { error: "Email atau password salah. Silakan coba lagi." }
      }
      if (error.message.includes("Email not confirmed")) {
        return { error: "Email belum diverifikasi. Silakan cek inbox email Anda." }
      }
      if (error.message.includes("Too many requests")) {
        return { error: "Terlalu banyak percobaan login. Silakan tunggu beberapa menit." }
      }
      return { error: `Gagal masuk: ${error.message}` }
    }

    revalidatePath("/", "layout")
    redirect("/dashboard")
  } catch (error: any) {
    if (error?.digest?.includes("NEXT_REDIRECT")) {
      throw error
    }

    console.error("[SERVER] Unexpected signin error:", error?.message || error)

    if (error?.message?.includes("Redirect") || error?.name === "AuthError") {
      return { error: "Terjadi kesalahan autentikasi. Periksa konfigurasi sistem." }
    }

    return { error: "Terjadi kesalahan sistem. Silakan coba lagi nanti." }
  }
}

export async function signOut() {
  const supabase = await getSupabaseServerClient()

  if (supabase) {
    await supabase.auth.signOut()
  }

  const cookieStore = await cookies()
  cookieStore.getAll().forEach((cookie) => {
    if (cookie.name.startsWith("sb-")) {
      cookieStore.delete(cookie.name)
    }
  })

  revalidatePath("/", "layout")
  redirect("/")
}

export async function getCurrentUser() {
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return null
  }

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return null
    }

    const defaultUser = {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
      phone: user.user_metadata?.phone || null,
      kyc_status: "pending",
      wallet_balance: 0,
      bonus_balance: 0,
      auction_participation_count: 0,
      is_admin: false,
      role: "user",
    }

    try {
      const { data: profile, error: profileError } = await supabase.from("users").select("*").eq("id", user.id).single()

      if (profileError) {
        if (profileError.code === "PGRST116" || profileError.code === "PGRST205" || profileError.code === "42P01") {
          console.log("Users table not ready, returning default user info")
          return defaultUser
        }
        console.error("Error fetching user profile:", profileError.message)
        return defaultUser
      }

      return {
        ...profile,
        is_admin: profile.role === "admin" || profile.is_admin === true,
      }
    } catch (dbError) {
      console.error("Database error in getCurrentUser:", dbError)
      return defaultUser
    }
  } catch (error) {
    console.error("Error in getCurrentUser:", error)
    return null
  }
}

export async function resetPassword(email: string) {
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return { error: "Koneksi database tidak tersedia." }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const redirectUrl = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${siteUrl}/auth/reset-password`

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  })

  if (error) {
    return { error: "Gagal mengirim email reset password. Silakan coba lagi." }
  }

  return { success: true, message: "Email reset password telah dikirim." }
}
