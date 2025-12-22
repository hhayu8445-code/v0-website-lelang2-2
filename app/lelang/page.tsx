import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VehicleCard } from "@/components/vehicle-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CAR_BRANDS, LOCATIONS } from "@/lib/constants"
import { getVehicles } from "@/lib/actions/vehicles"
import { Search, SlidersHorizontal, Grid3X3, List, Car, Filter } from "lucide-react"

export const metadata = {
  title: "Lelang Aktif - LELANGMOBIL.COM",
  description: "Jelajahi ribuan mobil berkualitas dengan harga terbaik. Ikuti lelang sekarang!",
}

function FilterContent() {
  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div className="space-y-3">
        <Label className="font-semibold">Status Lelang</Label>
        <div className="space-y-2">
          {[
            { value: "live", label: "Sedang Berlangsung", count: 24 },
            { value: "upcoming", label: "Akan Datang", count: 12 },
            { value: "ended", label: "Sudah Berakhir", count: 156 },
          ].map((status) => (
            <div key={status.value} className="flex items-center space-x-2">
              <Checkbox id={status.value} defaultChecked={status.value === "live"} />
              <Label htmlFor={status.value} className="text-sm font-normal cursor-pointer flex-1">
                {status.label}
              </Label>
              <Badge variant="secondary" className="text-xs">
                {status.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-3">
        <Label className="font-semibold">Merek</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Semua Merek" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Merek</SelectItem>
            {CAR_BRANDS.map((brand) => (
              <SelectItem key={brand} value={brand.toLowerCase()}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location Filter */}
      <div className="space-y-3">
        <Label className="font-semibold">Lokasi</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Semua Lokasi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Lokasi</SelectItem>
            {LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc.toLowerCase()}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="font-semibold">Rentang Harga</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Min" type="number" />
          <Input placeholder="Max" type="number" />
        </div>
      </div>

      {/* Year Range */}
      <div className="space-y-3">
        <Label className="font-semibold">Tahun</Label>
        <div className="grid grid-cols-2 gap-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Dari" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sampai" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="space-y-3">
        <Label className="font-semibold">Transmisi</Label>
        <div className="space-y-2">
          {["Manual", "Automatic", "CVT"].map((trans) => (
            <div key={trans} className="flex items-center space-x-2">
              <Checkbox id={trans} />
              <Label htmlFor={trans} className="text-sm font-normal cursor-pointer">
                {trans}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="space-y-3">
        <Label className="font-semibold">Bahan Bakar</Label>
        <div className="space-y-2">
          {["Bensin", "Diesel", "Hybrid", "Electric"].map((fuel) => (
            <div key={fuel} className="flex items-center space-x-2">
              <Checkbox id={fuel} />
              <Label htmlFor={fuel} className="text-sm font-normal cursor-pointer">
                {fuel}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full">Terapkan Filter</Button>
      <Button variant="outline" className="w-full bg-transparent">
        Reset Filter
      </Button>
    </div>
  )
}

export default async function LelangPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; location?: string; status?: string; sort?: string }>
}) {
  const params = await searchParams

  const vehicles = await getVehicles({
    status: params.status || undefined,
    brand: params.brand || undefined,
    location: params.location || undefined,
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Page Header - improved mobile responsiveness */}
        <section className="bg-gradient-to-r from-primary to-red-700 text-white py-8 sm:py-12">
          <div className="container px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Lelang Mobil Aktif</h1>
            <p className="text-white/80 max-w-2xl text-sm sm:text-base">
              Temukan mobil impian Anda dengan harga terbaik. Semua kendaraan telah diverifikasi dan dijamin
              kualitasnya.
            </p>

            {/* Quick Search - improved mobile layout */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-3xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <Input
                  placeholder="Cari merek, model, atau tahun..."
                  className="pl-10 bg-white text-foreground h-11 sm:h-12 text-sm sm:text-base"
                />
              </div>
              <Button size="lg" variant="secondary" className="h-11 sm:h-12 w-full sm:w-auto">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Cari Mobil
              </Button>
            </div>
          </div>
        </section>

        <div className="container py-6 sm:py-8 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Filter className="w-4 h-4" />
                    Filter & Sortir
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5" />
                      Filter
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Filters Sidebar - Desktop only */}
            <aside className="hidden lg:block w-72 shrink-0">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterContent />
                </CardContent>
              </Card>
            </aside>

            {/* Vehicle Grid */}
            <div className="flex-1">
              {/* Sort & View Options - improved mobile layout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Menampilkan <span className="font-semibold text-foreground">{vehicles.length}</span> kendaraan
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <Select defaultValue="ending-soon">
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Urutkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ending-soon">Segera Berakhir</SelectItem>
                      <SelectItem value="newest">Terbaru</SelectItem>
                      <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                      <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                      <SelectItem value="most-bids">Bid Terbanyak</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex border rounded-lg overflow-hidden shrink-0">
                    <Button variant="ghost" size="icon" className="rounded-none border-r">
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-none">
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Vehicle Grid - improved responsiveness */}
              <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
                {vehicles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {vehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Car className="w-20 h-20 mx-auto mb-4 text-muted-foreground/30" />
                    <h3 className="text-xl font-semibold mb-2">Belum Ada Kendaraan</h3>
                    <p className="text-muted-foreground mb-4">Tidak ada kendaraan yang sesuai dengan filter Anda</p>
                    <Button variant="outline" className="bg-transparent">
                      Reset Filter
                    </Button>
                  </div>
                )}
              </Suspense>

              {/* Pagination - improved mobile layout */}
              {vehicles.length > 0 && (
                <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2">
                  <Button variant="outline" disabled className="text-sm bg-transparent">
                    Sebelumnya
                  </Button>
                  <Button variant="outline" className="bg-primary text-white text-sm">
                    1
                  </Button>
                  <Button variant="outline" className="text-sm bg-transparent">
                    2
                  </Button>
                  <Button variant="outline" className="text-sm bg-transparent">
                    3
                  </Button>
                  <Button variant="outline" className="text-sm bg-transparent">
                    Selanjutnya
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
