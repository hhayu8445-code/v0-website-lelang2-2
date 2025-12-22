import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Users, Trophy, CheckCircle, Building, Award } from "lucide-react"

export const metadata = {
  title: "Tentang Kami - LELANGMOBIL.COM",
  description:
    "Pelajari lebih lanjut tentang LELANGMOBIL.COM, platform lelang mobil bekas terpercaya di Indonesia dengan sistem KYC terverifikasi.",
}

export default function TentangPage() {
  const values = [
    {
      icon: Shield,
      title: "Keamanan Terjamin",
      description:
        "Sistem keamanan berlapis dengan enkripsi data dan verifikasi KYC untuk melindungi setiap transaksi.",
    },
    {
      icon: Users,
      title: "Komunitas Terpercaya",
      description:
        "Semua pengguna harus melalui proses verifikasi identitas untuk memastikan transaksi yang aman dan terpercaya.",
    },
    {
      icon: Trophy,
      title: "Harga Terbaik",
      description:
        "Sistem lelang yang transparan memastikan Anda mendapatkan mobil impian dengan harga paling kompetitif.",
    },
    {
      icon: CheckCircle,
      title: "Proses Mudah",
      description: "Proses lelang yang simpel dan user-friendly, dari pendaftaran hingga pembayaran.",
    },
  ]

  const stats = [
    { value: "10,000+", label: "Pengguna Terdaftar" },
    { value: "5,000+", label: "Mobil Terjual" },
    { value: "Rp 500M+", label: "Total Transaksi" },
    { value: "98%", label: "Kepuasan Pelanggan" },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang LELANGMOBIL.COM</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Platform lelang mobil bekas terpercaya di Indonesia dengan sistem KYC terverifikasi dan bonus hingga Rp
              2.500.000 untuk pengguna baru.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Misi Kami</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  LELANGMOBIL.COM hadir untuk merevolusi cara masyarakat Indonesia membeli dan menjual mobil bekas. Kami
                  berkomitmen untuk menciptakan ekosistem lelang yang aman, transparan, dan menguntungkan bagi semua
                  pihak.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Dengan teknologi terkini dan sistem verifikasi ketat, kami memastikan setiap transaksi berjalan dengan
                  lancar dan terpercaya. Bonus KYC senilai Rp 2.500.000 adalah bentuk apresiasi kami kepada pengguna
                  yang telah mempercayai platform kami.
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    <span className="text-sm">Terdaftar Resmi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-sm">Bersertifikat OJK</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <Building className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-muted-foreground">Kantor LELANGMOBIL.COM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nilai-Nilai Kami</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Legalitas & Sertifikasi</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Terdaftar OJK</h3>
                  <p className="text-sm text-muted-foreground">Terdaftar dan diawasi oleh Otoritas Jasa Keuangan</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">SSL Secured</h3>
                  <p className="text-sm text-muted-foreground">Enkripsi data 256-bit untuk keamanan transaksi</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">ISO 27001</h3>
                  <p className="text-sm text-muted-foreground">Sertifikasi keamanan informasi internasional</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
