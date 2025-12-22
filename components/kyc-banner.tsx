"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { IconScene } from "./3d/icon-scene"

export function KYCBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-amber-500 to-secondary bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]" />

      <div className="container mx-auto relative py-5 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <IconScene type="gift" size="60px" color="#000000" secondaryColor="#7c2d12" />
            </div>
            <div className="text-secondary-foreground text-center md:text-left">
              <p className="font-bold text-lg">BONUS VERIFIKASI KYC Rp 2.500.000!</p>
              <p className="text-sm opacity-80">Daftar sekarang, verifikasi KYC, langsung dapat bonus di saldo Anda</p>
            </div>
          </div>
          <Link href="/register">
            <Button className="bg-background text-foreground hover:bg-background/90 shadow-lg">
              Claim Bonus Sekarang
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
