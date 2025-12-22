"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  read_status: boolean
  link?: string
  created_at: string
}

export function useNotifications(userId: string | null) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const supabaseRef = useRef<ReturnType<typeof createBrowserClient> | null>(null)
  const channelRef = useRef<any>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    if (!userId) return

    isMountedRef.current = true
    if (!supabaseRef.current) {
      supabaseRef.current = createBrowserClient()
    }
    const supabase = supabaseRef.current

    async function init() {
      try {
        const { data } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(20)

        if (data && isMountedRef.current) {
          setNotifications(data)
          setUnreadCount(data.filter((n: Notification) => !n.read_status).length)
        }

        const channel = supabase
          .channel(`notifications:${userId}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "notifications",
              filter: `user_id=eq.${userId}`,
            },
            (payload: any) => {
              if (!isMountedRef.current) return

              const newNotification = payload.new as Notification
              setNotifications((prev) => [newNotification, ...prev.slice(0, 19)])
              setUnreadCount((prev) => prev + 1)

              if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
                // Sanitize notification content to prevent XSS
                const sanitizedTitle = String(newNotification.title).replace(/[<>"']/g, "")
                const sanitizedMessage = String(newNotification.message).replace(/[<>"']/g, "")
                new Notification(sanitizedTitle, {
                  body: sanitizedMessage,
                  icon: "/placeholder-logo.png",
                })
              }
            },
          )
          .subscribe()

        channelRef.current = channel
      } catch (error) {
        // Ignore errors
      }
    }

    init()

    return () => {
      isMountedRef.current = false
      if (channelRef.current && supabaseRef.current) {
        supabaseRef.current.removeChannel(channelRef.current)
      }
    }
  }, [userId])

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const supabase = supabaseRef.current || createBrowserClient()
      await supabase.from("notifications").update({ read_status: true }).eq("id", notificationId)
      setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read_status: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (error) {
      // Ignore
    }
  }, [])

  const markAllAsRead = useCallback(async () => {
    if (!userId) return

    try {
      const supabase = supabaseRef.current || createBrowserClient()
      await supabase.from("notifications").update({ read_status: true }).eq("user_id", userId).eq("read_status", false)
      setNotifications((prev) => prev.map((n) => ({ ...n, read_status: true })))
      setUnreadCount(0)
    } catch (error) {
      // Ignore
    }
  }, [userId])

  return { notifications, unreadCount, markAsRead, markAllAsRead }
}
