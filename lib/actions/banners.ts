"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

export interface Banner {
  id: string
  title: string
  description?: string
  image_url: string
  link_url?: string
  position: string
  display_order: number
  is_active: boolean
  starts_at?: string
  ends_at?: string
}

const SAMPLE_BANNERS: Banner[] = [
  {
    id: "1",
    title: "Bonus KYC Rp 2.5 Juta",
    description: "Daftar sekarang dan verifikasi KYC untuk mendapatkan bonus!",
    image_url: "/placeholder.svg?height=400&width=1200",
    link_url: "/register",
    position: "home",
    display_order: 1,
    is_active: true,
  },
  {
    id: "2",
    title: "Lelang Spesial Akhir Tahun",
    description: "Dapatkan mobil impian dengan harga terbaik!",
    image_url: "/placeholder.svg?height=400&width=1200",
    link_url: "/lelang",
    position: "home",
    display_order: 2,
    is_active: true,
  },
]

export async function getBanners(position = "home"): Promise<Banner[]> {
  try {
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return []
    }

    const { data, error } = await supabase
      .from("site_banners")
      .select("*")
      .eq("is_active", true)
      .eq("position", position)
      .order("display_order", { ascending: true })
      .limit(5)

    if (error) {
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    return data as Banner[]
  } catch {
    return []
  }
}

const SAMPLE_SETTINGS: Record<string, string> = {
  site_name: "LELANGMOBIL.COM",
  site_tagline: "Platform Lelang Mobil Terpercaya #1 Indonesia",
  kyc_bonus_amount: "2500000",
  min_bid_increment: "100000",
  contact_email: "info@lelangmobil.com",
  contact_phone: "+62 882-0227-83493",
  contact_whatsapp: "6282022783493",
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return SAMPLE_SETTINGS
    }

    const { data, error } = await supabase.from("site_settings").select("key, value")

    if (error) {
      return SAMPLE_SETTINGS
    }

    if (!data || data.length === 0) {
      return SAMPLE_SETTINGS
    }

    const settings: Record<string, string> = {}
    data?.forEach((item) => {
      settings[item.key] = item.value
    })

    return settings
  } catch {
    return SAMPLE_SETTINGS
  }
}
