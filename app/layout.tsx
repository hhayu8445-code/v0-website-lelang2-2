import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { WhatsAppChat } from "@/components/whatsapp-chat"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://lelangmobil.com"),
  title: "LELANGMOBIL.COM - Platform Lelang Mobil Terpercaya #1 di Indonesia",
  description:
    "Dapatkan mobil impian dengan harga terbaik melalui sistem lelang yang aman, transparan, dan terdaftar resmi OJK. Bonus Rp 2.500.000 untuk pengguna baru!",
  keywords: [
    "lelang mobil",
    "jual beli mobil",
    "mobil bekas",
    "auction mobil",
    "mobil murah",
    "lelang online",
    "mobil second",
    "balai lelang mobil",
  ],
  authors: [{ name: "PT BALAI LELANG MOBIL" }],
  creator: "PT BALAI LELANG MOBIL",
  publisher: "PT BALAI LELANG MOBIL",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://lelangmobil.com",
    title: "LELANGMOBIL.COM - Platform Lelang Mobil Terpercaya #1",
    description: "Platform lelang mobil terpercaya dengan bonus Rp 2.500.000 untuk pengguna baru",
    siteName: "LELANGMOBIL.COM",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "LELANGMOBIL.COM Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LELANGMOBIL.COM - Platform Lelang Mobil Terpercaya #1",
    description: "Dapatkan mobil impian dengan harga terbaik. Bonus Rp 2.500.000!",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  alternates: {
    canonical: "https://lelangmobil.com",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PT Balai Lelang Mobil",
              alternateName: "LELANGMOBIL.COM",
              url: "https://lelangmobil.com",
              logo: "https://lelangmobil.com/logo.png",
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
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster />
        <WhatsAppChat />
      </body>
    </html>
  )
}
