"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

const KYC_BONUS_AMOUNT = 2500000

export async function approveKyc(kycId: string, userId: string, notes: string) {
  const supabase = await createServerClient()

  if (!supabase) {
    return { success: false, error: "Database connection not available" }
  }

  // Get current admin
  const {
    data: { user: admin },
  } = await supabase.auth.getUser()
  if (!admin) {
    return { success: false, error: "Unauthorized" }
  }

  // Update KYC status
  const { error: kycError } = await supabase
    .from("kyc_verifications")
    .update({
      verification_status: "approved",
      admin_notes: notes,
      verified_at: new Date().toISOString(),
      verified_by: admin.id,
    })
    .eq("id", kycId)

  if (kycError) {
    return { success: false, error: kycError.message }
  }

  // Update user KYC status and add bonus
  const { error: userError } = await supabase
    .from("users")
    .update({
      kyc_status: "verified",
      bonus_balance: KYC_BONUS_AMOUNT,
    })
    .eq("id", userId)

  if (userError) {
    return { success: false, error: userError.message }
  }

  // Create bonus transaction record
  const { error: txError } = await supabase.from("transactions").insert({
    user_id: userId,
    type: "kyc_bonus",
    amount: KYC_BONUS_AMOUNT,
    status: "completed",
    reference_number: `BONUS-KYC-${Date.now()}`,
    notes: "Bonus KYC Verification",
  })

  if (txError) {
    console.error("Error creating bonus transaction:", txError)
  }

  // Create notification
  await supabase.from("notifications").insert({
    user_id: userId,
    type: "kyc_approved",
    title: "KYC Disetujui!",
    message: `Selamat! Verifikasi KYC Anda telah disetujui. Bonus Rp 2.500.000 telah ditambahkan ke saldo bonus Anda.`,
    link: "/dashboard/wallet",
  })

  revalidatePath("/admin/kyc")
  revalidatePath("/dashboard")

  return { success: true }
}

export async function rejectKyc(kycId: string, userId: string, notes: string) {
  const supabase = await createServerClient()

  if (!supabase) {
    return { success: false, error: "Database connection not available" }
  }

  const {
    data: { user: admin },
  } = await supabase.auth.getUser()
  if (!admin) {
    return { success: false, error: "Unauthorized" }
  }

  const { error: kycError } = await supabase
    .from("kyc_verifications")
    .update({
      verification_status: "rejected",
      admin_notes: notes,
      verified_at: new Date().toISOString(),
      verified_by: admin.id,
    })
    .eq("id", kycId)

  if (kycError) {
    return { success: false, error: kycError.message }
  }

  const { error: userError } = await supabase
    .from("users")
    .update({
      kyc_status: "rejected",
    })
    .eq("id", userId)

  if (userError) {
    return { success: false, error: userError.message }
  }

  // Create notification
  await supabase.from("notifications").insert({
    user_id: userId,
    type: "kyc_rejected",
    title: "KYC Ditolak",
    message: `Maaf, verifikasi KYC Anda ditolak. Alasan: ${notes}. Silakan submit ulang dengan dokumen yang valid.`,
    link: "/dashboard/kyc",
  })

  revalidatePath("/admin/kyc")

  return { success: true }
}

export async function approveTransaction(transactionId: string, userId: string, amount: number, type: string) {
  const supabase = await createServerClient()

  if (!supabase) {
    return { success: false, error: "Database connection not available" }
  }

  // Update transaction status
  const { error: txError } = await supabase
    .from("transactions")
    .update({
      status: "completed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", transactionId)

  if (txError) {
    return { success: false, error: txError.message }
  }

  // Update user balance
  if (type === "deposit") {
    const { data: user } = await supabase.from("users").select("wallet_balance").eq("id", userId).single()

    await supabase
      .from("users")
      .update({
        wallet_balance: (user?.wallet_balance || 0) + amount,
      })
      .eq("id", userId)
  }

  // Create notification
  await supabase.from("notifications").insert({
    user_id: userId,
    type: "transaction_approved",
    title: type === "deposit" ? "Deposit Berhasil" : "Withdrawal Diproses",
    message:
      type === "deposit"
        ? `Deposit sebesar Rp ${amount.toLocaleString("id-ID")} telah dikonfirmasi.`
        : `Withdrawal sebesar Rp ${amount.toLocaleString("id-ID")} sedang diproses.`,
    link: "/dashboard/wallet",
  })

  revalidatePath("/admin/transaksi")
  revalidatePath("/dashboard/wallet")

  return { success: true }
}

export async function rejectTransaction(transactionId: string, userId: string, notes: string) {
  const supabase = await createServerClient()

  if (!supabase) {
    return { success: false, error: "Database connection not available" }
  }

  const { error } = await supabase
    .from("transactions")
    .update({
      status: "failed",
      notes: notes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", transactionId)

  if (error) {
    return { success: false, error: error.message }
  }

  await supabase.from("notifications").insert({
    user_id: userId,
    type: "transaction_rejected",
    title: "Transaksi Ditolak",
    message: `Transaksi Anda ditolak. Alasan: ${notes}`,
    link: "/dashboard/wallet",
  })

  revalidatePath("/admin/transaksi")

  return { success: true }
}

export async function createVehicleAuction(data: {
  brand: string
  model: string
  year: number
  mileage: number
  transmission: string
  fuel_type: string
  color: string
  starting_price: number
  buy_now_price?: number
  condition: string
  description: string
  location: string
  images: string[]
  auction_start_time: string
  auction_end_time: string
}) {
  const supabase = await createServerClient()

  if (!supabase) {
    return { success: false, error: "Database connection not available" }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "Unauthorized" }
  }

  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .insert({
      ...data,
      seller_id: user.id,
      auction_status: new Date(data.auction_start_time) <= new Date() ? "live" : "upcoming",
      current_bid: data.starting_price,
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/lelang")
  revalidatePath("/lelang")

  return { success: true, vehicle }
}

export async function updateAuctionStatus(vehicleId: string, status: string) {
  const supabase = await createServerClient()

  if (!supabase) {
    return { success: false, error: "Database connection not available" }
  }

  const { error } = await supabase
    .from("vehicles")
    .update({
      auction_status: status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", vehicleId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/lelang")
  revalidatePath("/lelang")

  return { success: true }
}
