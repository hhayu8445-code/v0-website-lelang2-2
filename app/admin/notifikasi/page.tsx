import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, Send } from "lucide-react"
import { formatDate } from "@/lib/utils/format"

export const dynamic = "force-dynamic"

async function getNotifications() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return []

  const { data } = await supabase
    .from("notifications")
    .select("*, users(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(50)

  return data || []
}

export default async function AdminNotifikasiPage() {
  const notifications = await getNotifications()
  const readCount = notifications.filter((n) => n.read_status).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kelola Notifikasi</h1>
          <p className="text-muted-foreground">Kirim dan kelola notifikasi pengguna</p>
        </div>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Kirim Notifikasi
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{notifications.length}</p>
              <p className="text-sm text-muted-foreground">Total Notifikasi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <Bell className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{readCount}</p>
              <p className="text-sm text-muted-foreground">Sudah Dibaca</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-100">
              <Bell className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{notifications.length - readCount}</p>
              <p className="text-sm text-muted-foreground">Belum Dibaca</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Notifikasi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Pesan</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Belum ada notifikasi
                  </TableCell>
                </TableRow>
              ) : (
                notifications.map((notif: any) => (
                  <TableRow key={notif.id}>
                    <TableCell className="font-medium">{notif.users?.full_name || "System"}</TableCell>
                    <TableCell>{notif.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{notif.message}</TableCell>
                    <TableCell><Badge variant="outline">{notif.type}</Badge></TableCell>
                    <TableCell>
                      <Badge className={notif.read_status ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                        {notif.read_status ? "Dibaca" : "Belum Dibaca"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(notif.created_at)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
