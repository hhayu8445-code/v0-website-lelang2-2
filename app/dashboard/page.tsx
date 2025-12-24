import Link from "next/link"
import { getCurrentUser } from "@/lib/actions/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils/format"
import { Wallet, Gavel, Trophy, Eye, TrendingUp, ArrowRight, ShieldCheck, Gift, Clock, AlertCircle } from "lucide-react"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  // Get real stats from database
  const { createServerClient } = await import("@/lib/supabase/server")
  const supabase = await createServerClient()
  
  let activeBids = 0
  let wonAuctions = 0
  let watchlistCount = 0
  
  if (supabase && user) {
    // Count active bids
    const { count: bidsCount } = await supabase
      .from("bids")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "active")
    activeBids = bidsCount || 0

    // Count won auctions
    const { count: wonCount } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true })
      .eq("winner_id", user.id)
    wonAuctions = wonCount || 0

    // Watchlist would need a separate table, for now use 0
    watchlistCount = 0
  }

  const stats = [
    {
      label: "Total Saldo",
      value: formatCurrency((user?.wallet_balance || 0) + (user?.bonus_balance || 0)),
      icon: Wallet,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Lelang Aktif",
      value: activeBids.toString(),
      icon: Gavel,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Dimenangkan",
      value: wonAuctions.toString(),
      icon: Trophy,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      label: "Watchlist",
      value: watchlistCount.toString(),
      icon: Eye,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-0">
      {/* Welcome Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Selamat Datang, {user?.full_name?.split(" ")[0] || "User"}!</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Kelola akun dan lelang Anda dari dashboard ini.</p>
      </div>

      {/* KYC Alert - improved mobile layout */}
      {user?.kyc_status !== "verified" && (
        <Card className="border-secondary bg-gradient-to-r from-secondary/10 to-amber-500/10">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-secondary/20 rounded-full shrink-0">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">Verifikasi KYC & Dapatkan Bonus Rp 2.500.000!</h3>
                <p className="text-sm text-muted-foreground">
                  Lengkapi verifikasi KYC untuk mendapatkan bonus langsung di saldo Anda.
                </p>
              </div>
            </div>
            <Link href="/dashboard/kyc" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                Verifikasi Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid - improved responsiveness */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.label}</p>
                  <p className={`text-lg sm:text-2xl font-bold ${stat.color} truncate`}>{stat.value}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor} shrink-0`}>
                  <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Saldo Card */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
              Saldo Anda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">Saldo Utama</p>
                <p className="text-lg sm:text-2xl font-bold text-primary">
                  {formatCurrency(user?.wallet_balance || 0)}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">Bonus KYC</p>
                <p className="text-lg sm:text-2xl font-bold text-secondary">
                  {formatCurrency(user?.bonus_balance || 0)}
                </p>
              </div>
            </div>

            {user?.bonus_balance > 0 && user?.auction_participation_count === 0 && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-medium text-amber-800 dark:text-amber-300">Bonus belum bisa ditarik</p>
                  <p className="text-amber-700 dark:text-amber-400">
                    Ikuti minimal 1 lelang untuk bisa withdraw bonus.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/dashboard/wallet" className="flex-1">
                <Button className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Isi Saldo
                </Button>
              </Link>
              <Link href="/dashboard/wallet" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Tarik Saldo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              Status Akun
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg gap-2">
                <span className="text-xs sm:text-sm shrink-0">Email</span>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs sm:text-sm font-medium truncate">{user?.email}</span>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-600 shrink-0 text-xs">
                    Verified
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-xs sm:text-sm">Verifikasi KYC</span>
                <Badge variant={user?.kyc_status === "verified" ? "default" : "secondary"} className="text-xs">
                  {user?.kyc_status === "verified"
                    ? "Verified"
                    : user?.kyc_status === "pending"
                      ? "Pending"
                      : "Unverified"}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-xs sm:text-sm">Partisipasi Lelang</span>
                <span className="font-medium text-sm">{user?.auction_participation_count || 0}x</span>
              </div>
            </div>

            {user?.kyc_status !== "verified" && (
              <Link href="/dashboard/kyc">
                <Button variant="outline" className="w-full bg-transparent">
                  Verifikasi KYC
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Bids */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-lg">Lelang Aktif Anda</CardTitle>
          <Link href="/dashboard/lelang-saya">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
              Lihat Semua
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 sm:py-8 text-muted-foreground">
            <Clock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-50" />
            <p className="text-sm sm:text-base">Anda belum memiliki lelang aktif.</p>
            <Link href="/lelang">
              <Button variant="link" className="mt-2 text-sm sm:text-base">
                Jelajahi Lelang
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
