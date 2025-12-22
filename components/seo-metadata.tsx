import { getSEOMetadata, generateStructuredData } from "@/lib/services/seo-service"
import type { Metadata } from "next"

export async function generatePageMetadata(pagePath: string): Promise<Metadata> {
  const seoData = await getSEOMetadata(pagePath)

  if (!seoData) {
    return {
      title: "LELANGMOBIL.COM - Platform Lelang Mobil Terpercaya #1 di Indonesia",
      description: "Dapatkan mobil impian dengan harga terbaik melalui sistem lelang yang aman dan transparan",
    }
  }

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    robots: seoData.robots,
    openGraph: {
      title: seoData.ogTitle || seoData.title,
      description: seoData.ogDescription || seoData.description,
      images: seoData.ogImage ? [seoData.ogImage] : [],
    },
    twitter: {
      card: seoData.twitterCard as any,
      title: seoData.ogTitle || seoData.title,
      description: seoData.ogDescription || seoData.description,
    },
    alternates: {
      canonical: seoData.canonicalUrl,
    },
  }
}

export function StructuredDataScript({ type, data }: { type: "home" | "auction" | "vehicle"; data?: any }) {
  const structuredData = generateStructuredData(type, data)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
