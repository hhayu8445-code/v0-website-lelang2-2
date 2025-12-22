"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Home,
  Gavel,
  Info,
  HelpCircle,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Wallet,
  Shield,
  User,
  Bell,
  LogOut,
} from "lucide-react"
import { signOut } from "@/lib/actions/auth"

interface MobileNavProps {
  isLoggedIn: boolean
  isAdmin?: boolean
}

export function MobileNav({ isLoggedIn, isAdmin }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="lg:hidden glass-button" disabled>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden glass-button">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] glass-card border-white/10 p-0">
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-left bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col p-4 gap-1">
          {/* Main Navigation */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">Navigasi</p>
            <Link href="/" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <Home className="w-5 h-5" />
                Beranda
              </Button>
            </Link>
            <Link href="/lelang" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <Gavel className="w-5 h-5" />
                Lelang Aktif
              </Button>
            </Link>
            <Link href="/tentang" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <Info className="w-5 h-5" />
                Tentang Kami
              </Button>
            </Link>
            <Link href="/faq" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <HelpCircle className="w-5 h-5" />
                FAQ
              </Button>
            </Link>
          </div>

          {/* Auth/Dashboard Section */}
          <div className="mt-4 pt-4 border-t border-white/10 space-y-1">
            {isLoggedIn ? (
              <>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                  Dashboard
                </p>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setOpen(false)}>
                    <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                      <Shield className="w-5 h-5" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard/wallet" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <Wallet className="w-5 h-5" />
                    Wallet
                  </Button>
                </Link>
                <Link href="/dashboard/kyc" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <ShieldCheck className="w-5 h-5" />
                    Verifikasi KYC
                  </Button>
                </Link>
                <Link href="/dashboard/profil" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <User className="w-5 h-5" />
                    Profil
                  </Button>
                </Link>
                <Link href="/dashboard/notifikasi" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <Bell className="w-5 h-5" />
                    Notifikasi
                  </Button>
                </Link>
                <form action={signOut} className="mt-2">
                  <Button
                    type="submit"
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="w-5 h-5" />
                    Keluar
                  </Button>
                </form>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">Akun</p>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <LogIn className="w-5 h-5" />
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-primary to-red-700">
                    <UserPlus className="w-5 h-5" />
                    Daftar Sekarang
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
