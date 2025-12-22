"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconScene } from "./3d/icon-scene"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-animated opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />

      <div className="container mx-auto relative max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          {/* 3D Gift Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl" />
              <div className="relative glass-card rounded-full p-6">
                <IconScene type="gift" size="100px" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Siap Mendapatkan{" "}
            <span className="bg-gradient-to-r from-primary via-red-400 to-secondary bg-clip-text text-transparent">
              Mobil Impian
            </span>{" "}
            Anda?
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Daftar sekarang dan dapatkan bonus <span className="text-secondary font-semibold">Rp 2.500.000</span>{" "}
            setelah verifikasi KYC
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-red-700 hover:from-primary/90 hover:to-red-700/90 shadow-lg glow-primary text-lg px-8 py-6"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
                Daftar & Claim Bonus
              </Button>
            </Link>
            <Link href="/lelang">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto glass-button text-lg px-8 py-6 border-white/20 hover:border-white/40 bg-transparent"
              >
                Lihat Lelang Aktif
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
