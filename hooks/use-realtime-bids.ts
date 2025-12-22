"use client"

import { useEffect, useState, useRef } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import type { Bid } from "@/lib/types"

export function useRealtimeBids(vehicleId: string) {
  const [bids, setBids] = useState<Bid[]>([])
  const [currentBid, setCurrentBid] = useState<number>(0)
  const supabaseRef = useRef<ReturnType<typeof createBrowserClient> | null>(null)
  const channelRef = useRef<any>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    supabaseRef.current = createBrowserClient()
    const supabase = supabaseRef.current

    async function init() {
      try {
        const { data } = await supabase
          .from("bids")
          .select(`*, users (full_name)`)
          .eq("vehicle_id", vehicleId)
          .order("bid_time", { ascending: false })
          .limit(20)

        if (data && isMountedRef.current) {
          setBids(data)
          if (data.length > 0) {
            setCurrentBid(data[0].bid_amount)
          }
        }

        const channel = supabase
          .channel(`bids:${vehicleId}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "bids",
              filter: `vehicle_id=eq.${vehicleId}`,
            },
            async (payload: any) => {
              if (!isMountedRef.current || !supabaseRef.current) return

              try {
                const newBid = payload.new as Bid
                const { data: userData } = await supabaseRef.current
                  .from("users")
                  .select("full_name")
                  .eq("id", newBid.user_id)
                  .single()

                if (!isMountedRef.current) return

                const bidWithUser = { ...newBid, users: userData }
                setBids((prev) => [bidWithUser, ...prev.slice(0, 19)])
                setCurrentBid(newBid.bid_amount)

                if (typeof window !== "undefined") {
                  const audio = new Audio("/sounds/bid-notification.mp3")
                  audio.volume = 0.5
                  audio.play().catch(() => {})
                }
              } catch (error) {
                // Ignore errors
              }
            },
          )
          .subscribe()

        channelRef.current = channel
      } catch (error) {
        // Ignore initialization errors
      }
    }

    init()

    return () => {
      isMountedRef.current = false
      if (channelRef.current && supabaseRef.current) {
        supabaseRef.current.removeChannel(channelRef.current)
      }
    }
  }, [vehicleId])

  return { bids, currentBid }
}
