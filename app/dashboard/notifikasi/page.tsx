import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Gavel, Gift, AlertCircle, Clock } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "kyc",
    title: "KYC Berhasil Diverifikasi",
    message: "Selamat! KYC Anda telah disetujui. Bonus Rp 2.500.000 telah ditambahkan ke saldo Anda.",
    time: "2 jam lalu",
    read: false,
    icon: Gift,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
  {
    id: 2,
    type: "bid",
    title: "Bid Anda Tertinggi!",
    message: "Bid Anda pada Toyota Avanza 2021 saat ini tertinggi dengan nilai Rp 168.000.000",
    time: "5 jam lalu",
    read: false,
    icon: Gavel,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-100",
  },
  {
    id: 3,
    type: "outbid",
    title: "Anda Telah Di-outbid",
    message: "Seseorang memasang bid lebih tinggi pada Honda CR-V 2020. Bid sekarang: Rp 350.000.000",
    time: "1 hari lalu",
    read: true,
    icon: AlertCircle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
  },
  {
    id: 4,
    type: "reminder",
    title: "Lelang Segera Berakhir",
    message: "Lelang Mitsubishi Xpander 2022 akan berakhir dalam 1 jam. Jangan lewatkan!",
    time: "1 hari lalu",
    read: true,
    icon: Clock,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
]

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifikasi</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Tandai Semua Dibaca
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0 divide-y">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 flex gap-4 hover:bg-muted/50 transition-colors ${!notif.read ? "bg-primary/5" : ""}`}
            >
              <div className={`p-3 rounded-full ${notif.iconBg} shrink-0`}>
                <notif.icon className={`w-5 h-5 ${notif.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`font-semibold ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                    {notif.title}
                  </h4>
                  {!notif.read && <Badge className="shrink-0">Baru</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
