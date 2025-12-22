"use client"

import { IconScene } from "./3d/icon-scene"

const badges = [
  {
    icon: "shield" as const,
    title: "Terdaftar OJK",
    description: "Diawasi Otoritas Jasa Keuangan",
  },
  {
    icon: "lock" as const,
    title: "SSL Secure",
    description: "Transaksi 100% Terenkripsi",
  },
  {
    icon: "award" as const,
    title: "Verified Sellers",
    description: "Semua Penjual Terverifikasi",
  },
  {
    icon: "check" as const,
    title: "Garansi Uang Kembali",
    description: "Jaminan Keamanan Transaksi",
  },
]

export function TrustBadges() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />

      <div className="container mx-auto relative max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative glass-card rounded-full p-4">
                  <IconScene type={badge.icon} size="64px" />
                </div>
              </div>

              <h4 className="font-semibold text-foreground">{badge.title}</h4>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
