"use client"

import { useEffect, useState, useCallback } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface WalletData {
  wallet_balance: number
  bonus_balance: number
  total_balance: number
}

export function useRealtimeWallet(userId: string | undefined) {
  const [wallet, setWallet] = useState<WalletData>({
    wallet_balance: 0,
    bonus_balance: 0,
    total_balance: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchWallet = useCallback(async () => {
    if (!userId) return

    const supabase = createBrowserClient()
    if (!supabase) return

    try {
      const { data, error } = await supabase
        .from("users")
        .select("wallet_balance, bonus_balance")
        .eq("id", userId)
        .single()

      if (!error && data) {
        const walletBalance = data.wallet_balance || 0
        const bonusBalance = data.bonus_balance || 0
        setWallet({
          wallet_balance: walletBalance,
          bonus_balance: bonusBalance,
          total_balance: walletBalance + bonusBalance,
        })
      }
    } catch (error) {
      console.error("Error fetching wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (!userId) return

    fetchWallet()

    const supabase = createBrowserClient()
    if (!supabase) return

    // Subscribe to realtime wallet updates
    const channel = supabase
      .channel(`wallet:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `id=eq.${userId}`,
        },
        (payload: any) => {
          const updated = payload.new as any
          const walletBalance = updated.wallet_balance || 0
          const bonusBalance = updated.bonus_balance || 0
          setWallet({
            wallet_balance: walletBalance,
            bonus_balance: bonusBalance,
            total_balance: walletBalance + bonusBalance,
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, fetchWallet])

  return { wallet, isLoading, refetch: fetchWallet }
}
