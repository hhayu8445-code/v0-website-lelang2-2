import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Car, CreditCard, FileCheck, TrendingUp, CheckCircle } from "lucide-react"
import { formatRupiah } from "@/lib/utils/format"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

async function checkAdminAccess() {
  const supabase = await getSupabaseServerClient()
  
  if (!supabase) {
    redirect("/login")
  }

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("users")
    .select("is_admin, role")
    .eq("id", user.id)
    .single()

  const isAdmin = profile?.is_admin === true || profile?.role === "admin"

  if (!isAdmin) {
    redirect("/dashboard")
  }

  return { user, profile }
}

async function getAdminStats() {
  const supabase = await getSupabaseServerClient()

  if (!supabase) {
    return {
      totalUsers: 0,
      pendingKyc: 0,
      verifiedUsers: 0,
      totalVehicles: 0,
      liveAuctions: 0,
      pendingTransactions: 0,
      recentTransactions: [],
      recentKyc: [],
    }
  }

  const [
    { count: totalUsers },
    { count: pendingKyc },
    { count: verifiedUsers },
    { count: totalVehicles },
    { count: liveAuctions },
    { count: pendingTransactions },
    { data: recentTransactions },
    { data: recentKyc },
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("kyc_verifications").select("*", { count: "exact", head: true }).eq("verification_status", "pending"),
    supabase.from("users").select("*", { count: "exact", head: true }).eq("kyc_status", "verified"),
    supabase.from("vehicles").select("*", { count: "exact", head: true }),
    supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("auction_status", "live"),
    supabase.from("transactions").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("transactions").select("*, users(full_name)").order("created_at", { ascending: false }).limit(5),
    supabase
      .from("kyc_verifications")
      .select("*, users(full_name, email)")
      .eq("verification_status", "pending")
      .order("created_at", { ascending: false })
      .limit(5),
  ])

  return {
    totalUsers: totalUsers || 0,
    pendingKyc: pendingKyc || 0,
    verifiedUsers: verifiedUsers || 0,
    totalVehicles: totalVehicles || 0,
    liveAuctions: liveAuctions || 0,
    pendingTransactions: pendingTransactions || 0,
    recentTransactions: recentTransactions || [],
    recentKyc: recentKyc || [],
  }
}

export default async function AdminDashboard() {
  // Check admin access first
  await checkAdminAccess()
  
  const stats = await getAdminStats()

  const statCards = [
    {
      title: "Total Pengguna",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "KYC Pending",
      value: stats.pendingKyc,
      icon: FileCheck,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      href: "/admin/kyc",
    },
    {
      title: "User Terverifikasi",
      value: stats.verifiedUsers,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Kendaraan",
      value: stats.totalVehicles,
      icon: Car,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Lelang Aktif",
      value: stats.liveAuctions,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Transaksi Pending",
      value: stats.pendingTransactions,
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      href: "/admin/transaksi",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p className="text-muted-foreground">Selamat datang di panel admin LELANGMOBIL.COM</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className={stat.href ? "cursor-pointer hover:shadow-md transition-shadow" : ""}>
            {stat.href ? (
              <Link href={stat.href}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Link>
            ) : (
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending KYC */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">KYC Menunggu Verifikasi</CardTitle>
            <Link href="/admin/kyc">
              <Button variant="outline" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentKyc.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                <p>Tidak ada KYC yang menunggu</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentKyc.map((kyc: any) => (
                  <div key={kyc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{kyc.users?.full_name || "User"}</p>
                      <p className="text-sm text-muted-foreground">{kyc.users?.email}</p>
                    </div>
                    <Link href={`/admin/kyc/${kyc.id}`}>
                      <Button size="sm">Review</Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Transaksi Terbaru</CardTitle>
            <Link href="/admin/transaksi">
              <Button variant="outline" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {stats.recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-3" />
                <p>Belum ada transaksi</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentTransactions.map((tx: any) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{tx.users?.full_name || "User"}</p>
                      <p className="text-sm text-muted-foreground capitalize">{tx.type}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${tx.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                        {tx.type === "deposit" ? "+" : "-"}
                        {formatRupiah(tx.amount)}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          tx.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : tx.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
