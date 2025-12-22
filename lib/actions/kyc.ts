"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface KYCVerification {
  id: string
  user_id: string
  ktp_url?: string
  selfie_url?: string
  npwp_url?: string
  verification_status: string
  admin_notes?: string
  verified_at?: string
  created_at: string
}

export async function getKYCStatus(): Promise<KYCVerification | null> {
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return null
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from("kyc_verifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    // No KYC record found is not an error
    if (error.code === "PGRST116") {
      return null
    }
    console.error("Error fetching KYC status:", error.message)
    return null
  }

  return data as KYCVerification
}

export async function submitKYC(data: {
  ktp_url: string
  selfie_url: string
  npwp_url?: string
}) {
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return { error: "Database connection not available" }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  // Check if user already has pending or approved KYC
  const { data: existingKYC } = await supabase
    .from("kyc_verifications")
    .select("verification_status")
    .eq("user_id", user.id)
    .in("verification_status", ["pending", "approved"])
    .limit(1)
    .single()

  if (existingKYC) {
    if (existingKYC.verification_status === "approved") {
      return { error: "KYC Anda sudah diverifikasi" }
    }
    return { error: "Anda sudah memiliki pengajuan KYC yang sedang diproses" }
  }

  const { error } = await supabase.from("kyc_verifications").insert({
    user_id: user.id,
    ktp_url: data.ktp_url,
    selfie_url: data.selfie_url,
    npwp_url: data.npwp_url,
    verification_status: "pending",
  })

  if (error) {
    return { error: error.message }
  }

  // Update user KYC status to pending
  await supabase.from("users").update({ kyc_status: "pending" }).eq("id", user.id)

  revalidatePath("/dashboard/kyc")
  return { success: true, message: "Pengajuan KYC berhasil dikirim. Mohon tunggu verifikasi admin." }
}
