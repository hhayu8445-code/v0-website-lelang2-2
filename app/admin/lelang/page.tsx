import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Plus, Eye, Edit, Car, Clock, CheckCircle } from "lucide-react"
import { formatDate, formatRupiah } from "@/lib/utils/format"
import { SAMPLE_VEHICLES } from "@/lib/constants"

export const dynamic = "force-dynamic"

async function getVehicles(status?: string) {
  try {
    const supabase = await getSupabaseServerClient()

    if (!supabase) {
      return filterVehiclesByStatus(status)
    }

    let query = supabase
      .from("vehicles")
      .select(`
        *,
        users:seller_id (full_name)
      `)
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("auction_status", status)
    }

    const { data, error } = await query

    if (error || !data || data.length === 0) {
      return filterVehiclesByStatus(status)
    }

    return data
  } catch {
    return filterVehiclesByStatus(status)
  }
}

function filterVehiclesByStatus(status?: string) {
  const vehicles = SAMPLE_VEHICLES.map((v) => ({
    ...v,
    users: { full_name: "Admin" },
  }))

  if (!status) return vehicles
  return vehicles.filter((v) => v.auction_status === status)
}

export default async function AdminLelangPage() {
  const [allVehicles, liveVehicles, upcomingVehicles, endedVehicles] = await Promise.all([
    getVehicles(),
    getVehicles("live"),
    getVehicles("upcoming"),
    getVehicles("ended"),
  ])

  const statusConfig = {
    upcoming: { label: "Akan Datang", color: "bg-blue-100 text-blue-700" },
    live: { label: "Berlangsung", color: "bg-green-100 text-green-700" },
    ended: { label: "Selesai", color: "bg-gray-100 text-gray-700" },
    sold: { label: "Terjual", color: "bg-primary/10 text-primary" },
    cancelled: { label: "Dibatalkan", color: "bg-red-100 text-red-700" },
  }

  const VehicleTable = ({ data }: { data: any[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Kendaraan</TableHead>
          <TableHead>Harga Awal</TableHead>
          <TableHead>Bid Tertinggi</TableHead>
          <TableHead>Lokasi</TableHead>
          <TableHead>Waktu Lelang</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
              Tidak ada kendaraan
            </TableCell>
          </TableRow>
        ) : (
          data.map((vehicle) => {
            const status = statusConfig[vehicle.auction_status as keyof typeof statusConfig] || statusConfig.upcoming
            return (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 bg-muted rounded overflow-hidden">
                      {vehicle.images?.[0] && (
                        <img
                          src={vehicle.images[0] || "/placeholder.svg"}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.year} • {vehicle.transmission}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatRupiah(vehicle.starting_price)}</TableCell>
                <TableCell className="font-semibold text-primary">
                  {formatRupiah(vehicle.current_bid || vehicle.starting_price)}
                </TableCell>
                <TableCell>{vehicle.location}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>Selesai: {formatDate(vehicle.auction_end_time)}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={status.color}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/lelang/${vehicle.id}`}>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/lelang/${vehicle.id}/edit`}>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kelola Lelang</h1>
          <p className="text-muted-foreground">Kelola semua kendaraan dan lelang</p>
        </div>
        <Link href="/admin/lelang/tambah">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Lelang
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <Car className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{liveVehicles.length}</p>
              <p className="text-sm text-muted-foreground">Berlangsung</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{upcomingVehicles.length}</p>
              <p className="text-sm text-muted-foreground">Akan Datang</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-gray-100">
              <CheckCircle className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{endedVehicles.length}</p>
              <p className="text-sm text-muted-foreground">Selesai</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Car className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{allVehicles.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="live" className="w-full">
            <div className="border-b px-4">
              <TabsList className="h-12 bg-transparent">
                <TabsTrigger
                  value="live"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Berlangsung ({liveVehicles.length})
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Akan Datang ({upcomingVehicles.length})
                </TabsTrigger>
                <TabsTrigger
                  value="ended"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Selesai ({endedVehicles.length})
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Semua ({allVehicles.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="live" className="mt-0">
              <VehicleTable data={liveVehicles} />
            </TabsContent>
            <TabsContent value="upcoming" className="mt-0">
              <VehicleTable data={upcomingVehicles} />
            </TabsContent>
            <TabsContent value="ended" className="mt-0">
              <VehicleTable data={endedVehicles} />
            </TabsContent>
            <TabsContent value="all" className="mt-0">
              <VehicleTable data={allVehicles} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
