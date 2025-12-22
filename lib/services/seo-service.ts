import { createServerClient } from "@/lib/supabase/server"

export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: string
  canonicalUrl?: string
  robots?: string
  structuredData?: Record<string, any>
}

const SEMRUSH_API_KEY = process.env.SEMRUSH_API_KEY || ""
const SEMRUSH_API_BASE = "https://api.semrush.com"

export async function getSEOMetadata(pagePath: string): Promise<SEOMetadata | null> {
  try {
    const supabase = await createServerClient()
    if (!supabase) return null

    const { data, error } = await supabase.from("seo_metadata").select("*").eq("page_path", pagePath).single()

    if (error || !data) return null

    return {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      ogTitle: data.og_title,
      ogDescription: data.og_description,
      ogImage: data.og_image,
      twitterCard: data.twitter_card,
      canonicalUrl: data.canonical_url,
      robots: data.robots,
      structuredData: data.structured_data,
    }
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    return null
  }
}

export async function updateSEOWithSemrush(domain = "lelangmobil.com") {
  try {
    // Fetch domain analytics from Semrush
    const analyticsUrl = `${SEMRUSH_API_BASE}/?type=domain_ranks&key=${SEMRUSH_API_KEY}&export_columns=Db,Dn,Rk,Or,Ot,Oc,Ad&domain=${domain}&database=id`

    const response = await fetch(analyticsUrl)
    const data = await response.text()

    // Fetch organic keywords
    const keywordsUrl = `${SEMRUSH_API_BASE}/?type=domain_organic&key=${SEMRUSH_API_KEY}&export_columns=Ph,Po,Nq,Cp,Co,Tr,Tc,Nr,Td&domain=${domain}&database=id&display_limit=50`

    const keywordsResponse = await fetch(keywordsUrl)
    const keywordsData = await keywordsResponse.text()

    const supabase = await createServerClient()
    if (!supabase) return

    // Store Semrush data
    await supabase.from("seo_metadata").update({
      semrush_data: {
        domain_analytics: data,
        top_keywords: keywordsData,
        last_sync: new Date().toISOString(),
      },
      last_updated: new Date().toISOString(),
    })

    return { success: true, data: { analytics: data, keywords: keywordsData } }
  } catch (error) {
    console.error("Error updating SEO with Semrush:", error)
    return { success: false, error }
  }
}

export async function generateStructuredData(type: "home" | "auction" | "vehicle", data?: any) {
  const baseStructuredData = {
    "@context": "https://schema.org",
  }

  switch (type) {
    case "home":
      return {
        ...baseStructuredData,
        "@type": "Organization",
        name: "PT Balai Lelang Mobil",
        alternateName: "LELANGMOBIL.COM",
        url: "https://lelangmobil.com",
        logo: "https://lelangmobil.com/placeholder-logo.png",
        description: "Platform lelang mobil bekas terpercaya #1 di Indonesia",
        address: {
          "@type": "PostalAddress",
          addressCountry: "ID",
        },
        sameAs: [
          "https://www.facebook.com/lelangmobil",
          "https://www.instagram.com/lelangmobil",
          "https://twitter.com/lelangmobil",
        ],
      }

    case "vehicle":
      return {
        ...baseStructuredData,
        "@type": "Product",
        name: data?.brand + " " + data?.model + " " + data?.year,
        description: data?.description,
        image: data?.images,
        offers: {
          "@type": "Offer",
          price: data?.starting_price,
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "LELANGMOBIL.COM",
          },
        },
      }

    case "auction":
      return {
        ...baseStructuredData,
        "@type": "Event",
        name: "Lelang Mobil Aktif",
        description: "Lelang mobil bekas dengan harga terbaik",
        startDate: new Date().toISOString(),
        organizer: {
          "@type": "Organization",
          name: "LELANGMOBIL.COM",
          url: "https://lelangmobil.com",
        },
      }

    default:
      return baseStructuredData
  }
}
