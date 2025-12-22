import type React from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { formatCurrency } from "@/lib/utils/format"
import {
  Car,
  LayoutDashboard,
  Wallet,
  Gavel,
  ShieldCheck,
  User,
  Bell,
  LogOut,
  Plus,
  ChevronRight,
  Menu,
  Home,
} from "lucide-react"
import { signOut } from "@/lib/actions/auth"

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/lelang-saya", label: "Lelang Saya", icon: Gavel },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/kyc", label: "Verifikasi KYC", icon: ShieldCheck },
  { href: "/dashboard/jual", label: "Jual Mobil", icon: Plus },
  { href: "/dashboard/profil", label: "Profil", icon: User },
  { href: "/dashboard/notifikasi", label: "Notifikasi", icon: Bell },
]

function MobileSidebar({ user }: { user: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-left">Menu Dashboard</SheetTitle>
        </SheetHeader>

        <div className="p-4 space-y-4">
          {/* Balance Display Mobile */}
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Saldo</span>
              <span className="font-bold text-primary">{formatCurrency(user.wallet_balance || 0)}</span>
            </div>
            {user.bonus_balance > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bonus</span>
                <span className="font-bold text-secondary">{formatCurrency(user.bonus_balance)}</span>
              </div>
            )}
          </div>

          {/* KYC Alert */}
          {user.kyc_status !== "verified" && (
            <Link href="/dashboard/kyc">
              <div className="p-4 bg-gradient-to-r from-secondary to-amber-500 rounded-lg text-white">
                <p className="font-bold text-sm">Verifikasi KYC</p>
                <p className="text-xs opacity-90">Dapatkan bonus Rp 2.500.000!</p>
                <ChevronRight className="w-4 h-4 mt-1" />
              </div>
            </Link>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Back to Home */}
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </Button>
          </Link>

          {/* Logout */}
          <div className="pt-4 border-t">
            <form action={signOut}>
              <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700">
                <LogOut className="w-5 h-5" />
                Keluar
              </Button>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Header - improved responsiveness */}
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container flex h-14 sm:h-16 items-center justify-between gap-2 px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <MobileSidebar user={user} />

            <Link href="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl">
              <Car className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden xs:inline">
                LELANGMOBIL
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Balance Display - hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-muted rounded-lg">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Saldo</p>
                <p className="font-bold text-primary">{formatCurrency(user.wallet_balance || 0)}</p>
              </div>
              {user.bonus_balance > 0 && (
                <>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Bonus</p>
                    <p className="font-bold text-secondary">{formatCurrency(user.bonus_balance)}</p>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <Link href="/dashboard/notifikasi">
                <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{user.full_name?.charAt(0) || "U"}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium truncate max-w-[120px]">{user.full_name}</p>
                  <Badge variant={user.kyc_status === "verified" ? "default" : "secondary"} className="text-xs">
                    {user.kyc_status === "verified" ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-4 sm:py-6 px-4 sm:px-6">
        <div className="flex gap-6">
          {/* Sidebar - hidden on mobile */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-2">
              {/* KYC Alert */}
              {user.kyc_status !== "verified" && (
                <Link href="/dashboard/kyc">
                  <div className="p-4 bg-gradient-to-r from-secondary to-amber-500 rounded-lg text-white mb-4">
                    <p className="font-bold text-sm">Verifikasi KYC</p>
                    <p className="text-xs opacity-90">Dapatkan bonus Rp 2.500.000!</p>
                    <ChevronRight className="w-4 h-4 mt-1" />
                  </div>
                </Link>
              )}

              {/* Navigation Links */}
              <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>

              {/* Logout */}
              <div className="pt-4 border-t">
                <form action={signOut}>
                  <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700">
                    <LogOut className="w-5 h-5" />
                    Keluar
                  </Button>
                </form>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 safe-area-inset-bottom">
        <div className="grid grid-cols-5 gap-1 p-2">
          <Link
            href="/dashboard"
            className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/dashboard/lelang-saya"
            className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Gavel className="w-5 h-5" />
            <span>Lelang</span>
          </Link>
          <Link
            href="/dashboard/wallet"
            className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Wallet className="w-5 h-5" />
            <span>Wallet</span>
          </Link>
          <Link
            href="/dashboard/kyc"
            className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>KYC</span>
          </Link>
          <Link
            href="/dashboard/profil"
            className="flex flex-col items-center gap-1 p-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Profil</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
