"use client"

import { useEffect, useState, useRef } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import type { Vehicle } from "@/lib/types"

export function useRealtimeVehicle(vehicleId: string, initialVehicle: Vehicle) {
  const [vehicle, setVehicle] = useState<Vehicle>(initialVehicle)
  const supabaseRef = useRef<ReturnType<typeof createBrowserClient> | null>(null)
  const channelRef = useRef<any>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    supabaseRef.current = createBrowserClient()
    const supabase = supabaseRef.current

    const channel = supabase
      .channel(`vehicle:${vehicleId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "vehicles",
          filter: `id=eq.${vehicleId}`,
        },
        (payload: any) => {
          if (!isMountedRef.current) return
          setVehicle((prev) => ({ ...prev, ...(payload.new as Vehicle) }))
        },
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      isMountedRef.current = false
      if (channelRef.current && supabaseRef.current) {
        supabaseRef.current.removeChannel(channelRef.current)
      }
    }
  }, [vehicleId])

  return vehicle
}
