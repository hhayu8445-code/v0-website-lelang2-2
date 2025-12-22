"use client"

import { useEffect, useState, useCallback } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import type { Vehicle } from "@/lib/types"

export function useRealtimeVehicles(filters?: {
  status?: string
  brand?: string
  location?: string
}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchVehicles = useCallback(async () => {
    const supabase = createBrowserClient()
    if (!supabase) return

    try {
      let query = supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false })

      if (filters?.status) {
        query = query.eq("auction_status", filters.status)
      }
      if (filters?.brand) {
        query = query.ilike("brand", `%${filters.brand}%`)
      }
      if (filters?.location) {
        query = query.eq("location", filters.location)
      }

      const { data, error } = await query.limit(100)

      if (!error && data) {
        setVehicles(data as Vehicle[])
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchVehicles()

    const supabase = createBrowserClient()
    if (!supabase) return

    // Subscribe to realtime vehicle updates
    const channel = supabase
      .channel("vehicles")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "vehicles",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newVehicle = payload.new as Vehicle
            setVehicles(prev => [newVehicle, ...prev])
          } else if (payload.eventType === "UPDATE") {
            const updated = payload.new as Vehicle
            setVehicles(prev =>
              prev.map(v => v.id === updated.id ? updated : v)
            )
          } else if (payload.eventType === "DELETE") {
            const deleted = payload.old as Vehicle
            setVehicles(prev => prev.filter(v => v.id !== deleted.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchVehicles])

  return { vehicles, isLoading, refetch: fetchVehicles }
}
