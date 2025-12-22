import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Shield, Award, Users, TrendingUp, Globe } from "lucide-react"

export function CompanyProfile() {
  const advantages = [
    {
      icon: Shield,
      title: "100% Transparan",
      description: "Sistem lelang yang jelas dan terverifikasi",
    },
    {
      icon: Award,
      title: "Inspeksi 150+ Titik",
      description: "Pemeriksaan menyeluruh setiap kendaraan",
    },
    {
      icon: Users,
      title: "15.000+ Mobil Terjual",
      description: "Dipercaya ribuan pelanggan",
    },
    {
      icon: TrendingUp,
      title: "Harga Kompetitif",
      description: "Dapatkan nilai terbaik untuk aset Anda",
    },
  ]

  const legalInfo = [
    { label: "Bentuk Badan Usaha", value: "Perseroan Terbatas (PT)" },
    { label: "Izin Operasional", value: "KEP-108/KM.6/2024" },
    { label: "NIB", value: "1244000567891" },
    { label: "NPWP", value: "41.355.789.2-023.000" },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto relative space-y-16 max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="bg-gradient-to-r from-primary to-red-700 text-white px-4 py-2 text-sm font-semibold border-0 shadow-lg">
            Tentang Kami
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            PT <span className="text-primary text-glow">LELANGMOBIL.COM</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Perusahaan Balai Lelang Swasta yang bergerak di bidang jasa lelang kendaraan bermotor, khususnya roda empat.
            Kami hadir sebagai solusi modern di industri otomotif Indonesia.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card border-primary/20 hover:glow-primary transition-all duration-500">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-red-500/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Visi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi platform balai lelang otomotif digital terpercaya nomor satu di Indonesia yang mengedepankan
                transparansi, kecepatan, dan harga pasar yang wajar.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-secondary/20 hover:glow-secondary transition-all duration-500">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-amber-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Misi</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Menyediakan sistem lelang yang transparan dan mudah diakses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Memberikan laporan kondisi kendaraan yang jujur dan independen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Meningkatkan nilai likuiditas aset kendaraan bagi mitra penjual</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Advantages */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Keunggulan <span className="text-primary">Kami</span>
            </h3>
            <p className="text-muted-foreground">Mengapa memilih LELANGMOBIL.COM?</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item) => (
              <Card
                key={item.title}
                className="glass-card border-white/10 hover:glow-primary transition-all duration-500 text-center"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Legal Information */}
        <div className="glass-card border-primary/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Legalitas & Perizinan</h3>
            <p className="text-muted-foreground">Terdaftar resmi dan memenuhi regulasi Pemerintah RI</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalInfo.map((item) => (
              <div key={item.label} className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 inline mr-2" />
              Domisili Kantor Pusat: Jakarta Selatan, DKI Jakarta
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
