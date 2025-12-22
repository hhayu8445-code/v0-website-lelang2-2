"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createDepositRequest(data: {
  amount: number
  payment_method: string
  payment_proof_url: string
  bank_account_name: string
  bank_account_number: string
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

  const referenceNumber = `DEP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    type: "deposit",
    amount: data.amount,
    status: "pending",
    payment_method: data.payment_method,
    payment_proof_url: data.payment_proof_url,
    bank_account_name: data.bank_account_name,
    bank_account_number: data.bank_account_number,
    reference_number: referenceNumber,
    notes: `Deposit via ${data.payment_method}`,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/wallet")

  return {
    success: true,
    message: "Permintaan deposit berhasil dikirim. Mohon tunggu konfirmasi admin.",
    referenceNumber,
  }
}

export async function createWithdrawalRequest(data: {
  amount: number
  bank_name: string
  bank_account_name: string
  bank_account_number: string
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

  // Get user balance
  const { data: profile } = await supabase
    .from("users")
    .select("wallet_balance, bonus_balance")
    .eq("id", user.id)
    .single()

  if (!profile) {
    return { success: false, error: "User not found" }
  }

  const totalBalance = profile.wallet_balance + profile.bonus_balance

  if (totalBalance < data.amount) {
    return { success: false, error: "Saldo tidak mencukupi" }
  }

  const referenceNumber = `WD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    type: "withdrawal",
    amount: data.amount,
    status: "pending",
    payment_method: data.bank_name,
    bank_account_name: data.bank_account_name,
    bank_account_number: data.bank_account_number,
    reference_number: referenceNumber,
    notes: `Withdrawal to ${data.bank_name} - ${data.bank_account_number}`,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/wallet")

  return {
    success: true,
    message: "Permintaan penarikan berhasil dikirim. Mohon tunggu konfirmasi admin.",
    referenceNumber,
  }
}
