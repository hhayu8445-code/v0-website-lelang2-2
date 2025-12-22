"use client"

import { Badge } from "@/components/ui/badge"
import { IconScene } from "./3d/icon-scene"

const steps = [
  {
    step: 1,
    icon: "car" as const,
    title: "Daftar Akun",
    description: "Buat akun gratis dan verifikasi KYC untuk mendapatkan bonus Rp 2.500.000",
  },
  {
    step: 2,
    icon: "search" as const,
    title: "Pilih Mobil",
    description: "Jelajahi ribuan mobil berkualitas dengan harga awal yang kompetitif",
  },
  {
    step: 3,
    icon: "zap" as const,
    title: "Ikuti Lelang",
    description: "Pasang bid Anda secara real-time dan menangkan mobil impian",
  },
  {
    step: 4,
    icon: "shield" as const,
    title: "Transaksi Aman",
    description: "Pembayaran dan pengiriman mobil dijamin aman dan terpercaya",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto relative max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Cara Kerja <span className="text-primary text-glow">LELANGMOBIL.COM</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proses lelang yang mudah, transparan, dan aman dalam 4 langkah sederhana
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}

              <div className="relative z-10 text-center">
                {/* 3D Icon with glass background */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative glass-card rounded-full w-32 h-32 mx-auto flex items-center justify-center group-hover:glow-primary transition-all">
                    <IconScene type={item.icon} size="80px" />
                  </div>
                </div>

                <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white border-0">
                  Langkah {item.step}
                </Badge>

                <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
