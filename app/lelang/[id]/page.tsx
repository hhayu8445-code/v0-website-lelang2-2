import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getVehicleById, getVehicles } from "@/lib/actions/vehicles"
import { formatCurrency, formatNumber, formatDateTime } from "@/lib/utils/format"
import { CountdownTimer } from "@/components/countdown-timer"
import { BidSection } from "@/components/bid-section"
import { BidHistory } from "@/components/bid-history"
import { VehicleCard } from "@/components/vehicle-card"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  Shield,
  Eye,
  Users,
  Heart,
  Share2,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vehicle = await getVehicleById(id)
  if (!vehicle) return { title: "Kendaraan Tidak Ditemukan" }

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} - LELANGMOBIL.COM`,
    description: `Ikuti lelang ${vehicle.brand} ${vehicle.model} ${vehicle.year}. Harga mulai ${formatCurrency(vehicle.starting_price)}. Lokasi: ${vehicle.location}`,
  }
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vehicle = await getVehicleById(id)

  if (!vehicle) {
    notFound()
  }

  const isLive = vehicle.auction_status === "live"

  const allVehicles = await getVehicles({ brand: vehicle.brand })
  const similarVehicles = allVehicles.filter((v) => v.id !== vehicle.id).slice(0, 4)

  const specs = [
    { icon: Calendar, label: "Tahun", value: vehicle.year },
    { icon: Gauge, label: "Kilometer", value: vehicle.mileage ? `${formatNumber(vehicle.mileage)} km` : "-" },
    { icon: Settings2, label: "Transmisi", value: vehicle.transmission || "-" },
    { icon: Fuel, label: "Bahan Bakar", value: vehicle.fuel_type || "-" },
    { icon: Palette, label: "Warna", value: vehicle.color || "-" },
    { icon: Shield, label: "Kondisi", value: vehicle.condition || "-" },
  ]

  const vehicleImages =
    vehicle.images && vehicle.images.length > 0 ? vehicle.images : ["/placeholder.svg?height=500&width=800"]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link href="/lelang" className="text-muted-foreground hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Lelang
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={vehicleImages[0] || "/placeholder.svg"}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {isLive && (
                      <Badge className="bg-red-600 text-white text-lg px-4 py-1">
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                        LIVE
                      </Badge>
                    )}
                    {vehicle.condition === "Excellent" && <Badge className="bg-emerald-600 text-white">Premium</Badge>}
                  </div>

                  {/* Countdown Overlay */}
                  {isLive && vehicle.auction_end_time && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                      <CountdownTimer endTime={vehicle.auction_end_time} size="lg" />
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {vehicleImages.slice(0, 5).map((img, i) => (
                    <div key={i} className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer">
                      <Image
                        src={img || `/placeholder.svg?height=64&width=96&query=car view ${i + 1}`}
                        alt={`View ${i + 1}`}
                        fill
                        className="object-cover hover:opacity-80 transition-opacity"
                        loading="lazy"
                        quality={75}
                        sizes="96px"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Vehicle Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {vehicle.brand} {vehicle.model}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {vehicle.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {formatNumber(vehicle.view_count || 0)} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {vehicle.bid_count || 0} bids
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <spec.icon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">{spec.label}</p>
                          <p className="font-semibold">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="description" className="mt-6">
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="description">Deskripsi</TabsTrigger>
                      <TabsTrigger value="condition">Laporan Kondisi</TabsTrigger>
                      <TabsTrigger value="documents">Dokumen</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-4 space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {vehicle.description ||
                          `Mobil ${vehicle.brand} ${vehicle.model} tahun ${vehicle.year} dengan kondisi ${vehicle.condition?.toLowerCase() || "baik"}. Telah menempuh perjalanan ${vehicle.mileage ? formatNumber(vehicle.mileage) : "N/A"} kilometer dengan perawatan rutin dan berkala.`}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Transmisi {vehicle.transmission} dengan bahan bakar {vehicle.fuel_type}. Warna{" "}
                        {vehicle.color?.toLowerCase() || "standar"} yang elegan dan terawat. Semua dokumen lengkap dan
                        siap untuk proses balik nama.
                      </p>

                      <div className="pt-4">
                        <h4 className="font-semibold mb-3">Fitur Utama:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "AC Digital",
                            "Power Steering",
                            "Airbag",
                            "ABS",
                            "Sensor Parkir",
                            "Kamera Mundur",
                            "Cruise Control",
                            "Keyless Entry",
                          ].map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="condition" className="mt-4">
                      <div className="space-y-4">
                        {[
                          { name: "Eksterior", score: 90, notes: "Bodi mulus, tidak ada penyok atau goresan besar" },
                          { name: "Interior", score: 85, notes: "Jok original, dashboard bersih, AC dingin" },
                          { name: "Mesin", score: 95, notes: "Mesin kering, tidak ada rembes, suara halus" },
                          { name: "Kaki-kaki", score: 88, notes: "Shock breaker empuk, ban tebal >70%" },
                        ].map((item) => (
                          <div key={item.name} className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold">{item.name}</span>
                              <Badge variant={item.score >= 90 ? "default" : "secondary"}>{item.score}/100</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.notes}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="documents" className="mt-4">
                      <div className="space-y-3">
                        {[
                          { name: "BPKB", status: "Ada", verified: true },
                          { name: "STNK", status: "Ada (Pajak hidup)", verified: true },
                          { name: "Faktur", status: "Ada", verified: true },
                          { name: "KTP Pemilik", status: "Ada", verified: true },
                          { name: "Buku Service", status: "Ada", verified: true },
                        ].map((doc) => (
                          <div key={doc.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{doc.status}</span>
                              {doc.verified && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Bid History */}
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Penawaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <BidHistory vehicleId={vehicle.id} />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Bid Section */}
            <div className="space-y-6">
              <BidSection vehicle={vehicle} />

              {/* Auction Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informasi Lelang</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={isLive ? "default" : "secondary"}>
                      {isLive ? "Sedang Berlangsung" : vehicle.auction_status}
                    </Badge>
                  </div>
                  {vehicle.auction_start_time && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Mulai</span>
                      <span className="text-sm">{formatDateTime(vehicle.auction_start_time)}</span>
                    </div>
                  )}
                  {vehicle.auction_end_time && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Berakhir</span>
                      <span className="text-sm">{formatDateTime(vehicle.auction_end_time)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Kelipatan Bid</span>
                    <span className="font-semibold">{formatCurrency(100000)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informasi Penjual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">LM</span>
                    </div>
                    <div>
                      <p className="font-semibold">LELANGMOBIL Official</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Verified Seller
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Response time: &lt; 1 jam
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Kendaraan Serupa</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarVehicles.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
