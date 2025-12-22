import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Gavel, Trophy, Eye, XCircle, Clock, ArrowRight, Search } from "lucide-react"

export default function MyAuctionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Lelang Saya</h1>
        <p className="text-muted-foreground">Pantau semua aktivitas lelang Anda</p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active" className="gap-2">
            <Gavel className="w-4 h-4" />
            Aktif
            <Badge variant="secondary" className="ml-1">
              0
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="won" className="gap-2">
            <Trophy className="w-4 h-4" />
            Menang
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="gap-2">
            <Eye className="w-4 h-4" />
            Watchlist
          </TabsTrigger>
          <TabsTrigger value="lost" className="gap-2">
            <XCircle className="w-4 h-4" />
            Kalah
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardContent className="py-16 text-center">
              <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Belum Ada Lelang Aktif</h3>
              <p className="text-muted-foreground mb-6">Anda belum memasang bid pada lelang manapun.</p>
              <Link href="/lelang">
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Jelajahi Lelang
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="won">
          <Card>
            <CardContent className="py-16 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Belum Ada Lelang Dimenangkan</h3>
              <p className="text-muted-foreground mb-6">Anda belum memenangkan lelang apapun.</p>
              <Link href="/lelang">
                <Button>
                  <Gavel className="w-4 h-4 mr-2" />
                  Ikuti Lelang Sekarang
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist">
          <Card>
            <CardContent className="py-16 text-center">
              <Eye className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Watchlist Kosong</h3>
              <p className="text-muted-foreground mb-6">
                Simpan mobil favorit Anda untuk dipantau. Klik icon hati pada halaman detail kendaraan.
              </p>
              <Link href="/lelang">
                <Button variant="outline">
                  Jelajahi Mobil
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lost">
          <Card>
            <CardContent className="py-16 text-center">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Tidak Ada Riwayat</h3>
              <p className="text-muted-foreground">Lelang yang tidak Anda menangkan akan muncul di sini.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
