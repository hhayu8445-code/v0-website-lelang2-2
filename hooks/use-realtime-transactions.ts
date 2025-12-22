"use client"

import { useEffect, useState, useCallback } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import type { Transaction } from "@/lib/types"

export function useRealtimeTransactions(userId: string | undefined) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTransactions = useCallback(async () => {
    if (!userId) return

    const supabase = createBrowserClient()
    if (!supabase) return

    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50)

      if (!error && data) {
        setTransactions(data as Transaction[])
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (!userId) return

    fetchTransactions()

    const supabase = createBrowserClient()
    if (!supabase) return

    // Subscribe to realtime transaction updates
    const channel = supabase
      .channel(`transactions:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "transactions",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newTransaction = payload.new as Transaction
          setTransactions(prev => [newTransaction, ...prev])
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "transactions",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const updated = payload.new as Transaction
          setTransactions(prev =>
            prev.map(t => t.id === updated.id ? updated : t)
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, fetchTransactions])

  return { transactions, isLoading, refetch: fetchTransactions }
}
