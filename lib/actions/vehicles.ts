"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Vehicle, Bid } from "@/lib/types"
import { sanitizeString, sanitizeNumber } from "@/lib/utils/validation"
import { monitorError } from "@/lib/ai/error-monitor"

export async function getVehicles(filters?: {
  status?: string
  brand?: string
  location?: string
  minPrice?: number
  maxPrice?: number
}): Promise<Vehicle[]> {
  try {
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return []
    }

    let query = supabase.from("vehicles").select("*")

    if (filters?.status) {
      const sanitizedStatus = sanitizeString(filters.status)
      query = query.eq("auction_status", sanitizedStatus)
    }
    if (filters?.brand) {
      const sanitizedBrand = sanitizeString(filters.brand).slice(0, 50)
      query = query.ilike("brand", `%${sanitizedBrand}%`)
    }
    if (filters?.location) {
      const sanitizedLocation = sanitizeString(filters.location)
      query = query.eq("location", sanitizedLocation)
    }
    if (filters?.minPrice) {
      query = query.gte("starting_price", sanitizeNumber(filters.minPrice))
    }
    if (filters?.maxPrice) {
      query = query.lte("starting_price", sanitizeNumber(filters.maxPrice))
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      await monitorError(error, {
        function: "getVehicles",
        filters,
        query: "vehicles table query",
      })
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    return data as Vehicle[]
  } catch (error) {
    await monitorError(error as Error, {
      function: "getVehicles",
      filters,
    })
    return []
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return null
    }

    const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).single()

    if (error) {
      await monitorError(error, {
        function: "getVehicleById",
        vehicleId: id,
      })
      return null
    }

    return data as Vehicle
  } catch (error) {
    await monitorError(error as Error, {
      function: "getVehicleById",
      vehicleId: id,
    })
    return null
  }
}

export async function placeBid(vehicleId: string, amount: number) {
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return { error: "Database connection not available" }
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Anda harus login untuk memasang bid" }
    }

    const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

    if (!profile) {
      return { error: "Profil tidak ditemukan" }
    }

    if (profile.kyc_status !== "verified") {
      return { error: "Anda harus verifikasi KYC terlebih dahulu" }
    }

    const totalBalance = profile.wallet_balance + profile.bonus_balance
    if (totalBalance < amount) {
      return { error: "Saldo tidak mencukupi" }
    }

    const { data: vehicle } = await supabase.from("vehicles").select("*").eq("id", vehicleId).single()

    if (!vehicle) {
      return { error: "Kendaraan tidak ditemukan" }
    }

    if (vehicle.auction_status !== "live") {
      return { error: "Lelang tidak sedang berlangsung" }
    }

    const currentBid = vehicle.current_bid || vehicle.starting_price
    if (amount <= currentBid) {
      return { error: `Bid harus lebih dari ${currentBid}` }
    }

    const { error: bidError } = await supabase.from("bids").insert({
      vehicle_id: vehicleId,
      user_id: user.id,
      bid_amount: amount,
    })

    if (bidError) {
      await monitorError(bidError, {
        function: "placeBid",
        vehicleId,
        amount,
        userId: user.id,
      })
      return { error: bidError.message }
    }

    await supabase
      .from("vehicles")
      .update({
        current_bid: amount,
        bid_count: vehicle.bid_count + 1,
      })
      .eq("id", vehicleId)

    await supabase
      .from("bids")
      .update({ status: "outbid" })
      .eq("vehicle_id", vehicleId)
      .neq("user_id", user.id)
      .eq("status", "active")

    await supabase
      .from("users")
      .update({
        auction_participation_count: profile.auction_participation_count + 1,
      })
      .eq("id", user.id)

    revalidatePath(`/lelang/${vehicleId}`)
    return { success: true }
  } catch (error) {
    await monitorError(error as Error, {
      function: "placeBid",
      vehicleId,
      amount,
    })
    return { error: "Terjadi kesalahan saat memasang bid" }
  }
}

export async function getBidHistory(vehicleId: string) {
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from("bids")
    .select(`
      *,
      user:users(full_name)
    `)
    .eq("vehicle_id", vehicleId)
    .order("bid_time", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Error fetching bid history")
    return []
  }

  return data as (Bid & { user: { full_name: string } })[]
}
