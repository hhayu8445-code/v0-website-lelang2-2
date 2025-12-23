"use client"

import { useEffect, useState, useCallback } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import type { Notification } from "@/lib/types"

export function useRealtimeNotifications(userId: string | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchNotifications = useCallback(async () => {
    if (!userId) return

    const supabase = createBrowserClient()
    if (!supabase) return

    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50)

      if (!error && data) {
        setNotifications(data as Notification[])
        setUnreadCount(data.filter((n: Notification) => !n.read_status).length)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  const markAsRead = useCallback(async (notificationId: string) => {
    const supabase = createBrowserClient()
    if (!supabase) return

    try {
      await supabase
        .from("notifications")
        .update({ read_status: true })
        .eq("id", notificationId)

      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read_status: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }, [])

  const markAllAsRead = useCallback(async () => {
    if (!userId) return

    const supabase = createBrowserClient()
    if (!supabase) return

    try {
      await supabase
        .from("notifications")
        .update({ read_status: true })
        .eq("user_id", userId)
        .eq("read_status", false)

      setNotifications(prev =>
        prev.map(n => ({ ...n, read_status: true }))
      )
      setUnreadCount(0)
    } catch (error) {
      console.error("Error marking all as read:", error)
    }
  }, [userId])

  useEffect(() => {
    if (!userId) return

    fetchNotifications()

    const supabase = createBrowserClient()
    if (!supabase) return

    // Subscribe to realtime changes
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
          const newNotification = payload.new as Notification
          setNotifications(prev => [newNotification, ...prev])
          setUnreadCount(prev => prev + 1)

          // Show browser notification
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(newNotification.title, {
              body: newNotification.message,
              icon: "/logo.png",
            })
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload: any) => {
          const updated = payload.new as Notification
          setNotifications(prev =>
            prev.map(n => n.id === updated.id ? updated : n)
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, fetchNotifications])

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  }
}
