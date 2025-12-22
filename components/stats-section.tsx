"use client"

import { formatNumber } from "@/lib/utils/format"
import { IconScene } from "./3d/icon-scene"

const stats = [
  {
    icon: "car" as const,
    value: 15420,
    label: "Mobil Terjual",
    suffix: "+",
  },
  {
    icon: "users" as const,
    value: 89500,
    label: "Pengguna Terdaftar",
    suffix: "+",
  },
  {
    icon: "trophy" as const,
    value: 98.5,
    label: "Kepuasan Pelanggan",
    suffix: "%",
  },
  {
    icon: "chart" as const,
    value: 25,
    label: "Lelang Aktif Harian",
    suffix: "+",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto relative max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Dipercaya <span className="text-primary text-glow">Ribuan</span> Pelanggan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            LELANGMOBIL.COM telah menjadi platform lelang mobil online terpercaya sejak 2020
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center card-3d hover:glow-primary transition-all duration-500"
            >
              <div className="flex justify-center mb-4">
                <IconScene type={stat.icon} size="80px" />
              </div>

              <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {stat.suffix === "%" ? stat.value : formatNumber(stat.value)}
                {stat.suffix}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
