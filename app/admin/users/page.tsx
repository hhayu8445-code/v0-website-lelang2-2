import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, CheckCircle, Clock, XCircle } from "lucide-react"
import { formatDate, formatRupiah } from "@/lib/utils/format"

export const dynamic = "force-dynamic"

async function getUsers() {
  const supabase = await createServerClient()

  if (!supabase) {
    return []
  }

  const { data } = await supabase.from("users").select("*").order("created_at", { ascending: false })

  return data || []
}

export default async function AdminUsersPage() {
  const users = await getUsers()

  const verifiedCount = users.filter((u) => u.kyc_status === "verified").length
  const pendingCount = users.filter((u) => u.kyc_status === "pending").length

  const kycStatusConfig = {
    pending: { label: "Pending", color: "bg-amber-100 text-amber-700", icon: Clock },
    verified: { label: "Verified", color: "bg-green-100 text-green-700", icon: CheckCircle },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kelola Pengguna</h1>
        <p className="text-muted-foreground">Lihat dan kelola semua pengguna terdaftar</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total Pengguna</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{verifiedCount}</p>
              <p className="text-sm text-muted-foreground">Terverifikasi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending KYC</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Lelang</TableHead>
                <TableHead>Status KYC</TableHead>
                <TableHead>Bergabung</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Tidak ada pengguna
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const kycStatus = kycStatusConfig[user.kyc_status as keyof typeof kycStatusConfig]
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.full_name}
                        {user.is_admin && <Badge className="ml-2 bg-purple-100 text-purple-700">Admin</Badge>}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || "-"}</TableCell>
                      <TableCell>{formatRupiah(user.wallet_balance || 0)}</TableCell>
                      <TableCell>{formatRupiah(user.bonus_balance || 0)}</TableCell>
                      <TableCell>{user.auction_participation_count || 0}x</TableCell>
                      <TableCell>
                        <Badge className={kycStatus.color}>
                          <kycStatus.icon className="h-3 w-3 mr-1" />
                          {kycStatus.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.created_at)}</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
