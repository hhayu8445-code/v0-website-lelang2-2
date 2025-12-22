"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { TESTIMONIALS_SAMPLE } from "@/lib/constants"
import { monitorError } from "@/lib/ai/error-monitor"

export interface Testimonial {
  id: string
  name: string
  location?: string
  rating: number
  comment: string
  vehicle?: string
  avatar?: string
  created_at?: string
}

function getSampleTestimonials(): Testimonial[] {
  return TESTIMONIALS_SAMPLE.map((t) => ({
    id: t.id,
    name: t.name,
    location: t.location,
    rating: t.rating,
    comment: t.comment,
    vehicle: t.vehicle,
    avatar: t.avatar,
  }))
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .or("is_active.eq.true,is_approved.eq.true,is_featured.eq.true")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      await monitorError(error, {
        function: "getTestimonials",
        query: "testimonials table query",
      })
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    return data as Testimonial[]
  } catch (error) {
    await monitorError(error as Error, {
      function: "getTestimonials",
    })
    return []
  }
}

export async function createTestimonial(testimonial: Omit<Testimonial, "id" | "created_at">) {
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return { error: "Database connection not available" }
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Anda harus login untuk memberikan testimoni" }
    }

    const { error } = await supabase.from("testimonials").insert({
      ...testimonial,
      user_id: user.id,
      is_active: false,
      is_approved: false,
    })

    if (error) {
      await monitorError(error, {
        function: "createTestimonial",
        userId: user.id,
      })
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    await monitorError(error as Error, {
      function: "createTestimonial",
    })
    return { error: "Terjadi kesalahan saat membuat testimoni" }
  }
}
