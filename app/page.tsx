import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VehicleCard } from "@/components/vehicle-card"
import dynamic from "next/dynamic"
import { getVehicles } from "@/lib/actions/vehicles"
import { getTestimonials } from "@/lib/actions/testimonials"
import { Search, ArrowRight, CheckCircle2, Car, MessageCircle } from "lucide-react"
import Image from "next/image"
import { DynamicBanner } from "@/components/dynamic-banner"

const Hero3D = dynamic(() => import("@/components/hero-3d").then((mod) => ({ default: mod.Hero3D })), {
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />,
})

const TestimonialSlider = dynamic(
  () => import("@/components/testimonial-slider").then((mod) => ({ default: mod.TestimonialSlider })),
  { loading: () => <div className="h-64 bg-muted/50 rounded-lg" /> },
)

const BannerCarousel = dynamic(
  () => import("@/components/banner-carousel").then((mod) => ({ default: mod.BannerCarousel })),
  { loading: () => <div className="h-32 bg-muted/50 rounded-lg" /> },
)

import { CategoryCard } from "@/components/category-card"
import { BrandFilter } from "@/components/brand-filter"
import { StatsSection } from "@/components/stats-section"
import { TrustBadges } from "@/components/trust-badges"
import { CTASection } from "@/components/cta-section"
import { BankLogos } from "@/components/bank-logos"
import { ClientLogosSlider } from "@/components/client-logos-slider"
import { PressMediaSlider } from "@/components/press-media-slider"
import { PartnershipLogos } from "@/components/partnership-logos"
import { VehicleBrands } from "@/components/vehicle-brands"
import { KYCBanner } from "@/components/kyc-banner"
import { CompanyProfile } from "@/components/company-profile"
import { HowItWorks } from "@/components/how-it-works"

export default async function HomePage() {
  let allVehicles: any[] = []
  let dbTestimonials: any[] = []

  try {
    allVehicles = await getVehicles({ status: "live" })
  } catch (error) {
    allVehicles = []
  }

  const liveVehicles = allVehicles.slice(0, 4)

  try {
    dbTestimonials = await getTestimonials()
  } catch (error) {
    dbTestimonials = []
  }

  const testimonials = dbTestimonials

  const categories = [
    {
      name: "Hatchback",
      type: "hatchback" as const,
      count: 156,
      color: "#22c55e",
      imageUrl:
        "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=150/Consumer/Body_Type_Hatchback_8368c20910.png",
    },
    {
      name: "MPV",
      type: "mpv" as const,
      count: 312,
      color: "#3b82f6",
      imageUrl:
        "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=150/Consumer/Body_Type_MPV_38a2dca136.png",
    },
    {
      name: "SUV",
      type: "suv" as const,
      count: 189,
      color: "#f59e0b",
      imageUrl:
        "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=150/Consumer/Body_Type_SUV_bb5694042b.png",
    },
    {
      name: "Sedan",
      type: "sedan" as const,
      count: 245,
      color: "#ef4444",
      imageUrl:
        "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=150/Consumer/Body_Type_Sedan_d3399450f4.png",
    },
    {
      name: "Wagon",
      type: "wagon" as const,
      count: 98,
      color: "#8b5cf6",
      imageUrl:
        "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=150/Consumer/Body_Type_Wagon_e86bee566a.png",
    },
    {
      name: "Coupe",
      type: "coupe" as const,
      count: 42,
      color: "#ec4899",
      imageUrl:
        "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=150/Consumer/Body_Type_Coupe_0c2fe09ac9.png",
    },
    {
      name: "Van",
      type: "van" as const,
      count: 67,
      color: "#06b6d4",
      imageUrl:
        "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=150/Consumer/Body_Type_Van_6631405eed.png",
    },
    {
      name: "Pickup",
      type: "pickup" as const,
      count: 89,
      color: "#84cc16",
      imageUrl:
        "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=50,width=150/Consumer/Body_Type_Pickup_14a9e45bd1.png",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section with 3D Car */}
        <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 gradient-animated" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 noise-overlay" />

          {/* Glow orbs */}
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/10 rounded-full blur-[120px]" />

          {/* 3D Car Scene - Desktop only */}
          <div className="absolute inset-0 hidden lg:block">
            <Hero3D />
          </div>

          <div className="container mx-auto relative z-10 py-12 sm:py-20 px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
              <div className="space-y-6 sm:space-y-8 max-w-2xl lg:max-w-none">
                {/* Badge */}
                <Badge className="bg-gradient-to-r from-secondary to-amber-400 text-secondary-foreground px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold border-0 shadow-lg">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                  Bonus KYC Rp 2.500.000
                </Badge>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                  Platform Lelang Mobil{" "}
                  <span className="bg-gradient-to-r from-primary via-red-400 to-secondary bg-clip-text text-transparent text-glow">
                    Terpercaya #1
                  </span>{" "}
                  di Indonesia
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Dapatkan mobil impian Anda dengan harga terbaik melalui sistem lelang yang aman, transparan, dan
                  terdaftar resmi. Bonus Rp 2.500.000 untuk pengguna baru!
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link href="/lelang" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-primary to-red-700 hover:from-primary/90 hover:to-red-700/90 shadow-lg glow-primary text-sm sm:text-base px-6 h-11 sm:h-12"
                    >
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Lihat Lelang Aktif
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto glass-button border-white/20 hover:border-white/40 text-sm sm:text-base px-6 bg-transparent h-11 sm:h-12"
                    >
                      Daftar & Dapat Bonus
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                  {[
                    { label: "Terdaftar OJK", color: "text-emerald-400" },
                    { label: "100% Aman", color: "text-emerald-400" },
                    { label: "15.000+ Mobil Terjual", color: "text-emerald-400" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile placeholder - improved design */}
              <div className="lg:hidden aspect-video relative rounded-2xl overflow-hidden glass-card mt-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-red-700 rounded-2xl flex items-center justify-center shadow-2xl">
                      <Car className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <p className="text-sm text-muted-foreground">Platform Lelang Mobil #1 Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Carousel Section */}
        <section className="py-8 sm:py-12 relative">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <BannerCarousel />
          </div>
        </section>

        {/* Dealership Banner Section */}
        <section className="relative py-8 sm:py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

          <div className="container mx-auto relative px-4 sm:px-6 max-w-7xl">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-card border-primary/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent z-10" />

              <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=1200"
                  alt="Lelang Mobil Indonesia - Showroom"
                  fill
                  className="object-cover"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              </div>

              <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-8 md:px-16">
                <div className="max-w-2xl space-y-3 sm:space-y-4">
                  <Badge className="bg-gradient-to-r from-primary to-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold border-0 shadow-lg w-fit">
                    Showroom Resmi Terdaftar
                  </Badge>
                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl">
                    LELANG MOBIL INDONESIA
                  </h2>
                  <p className="text-sm sm:text-lg md:text-xl text-white/90 drop-shadow-lg">
                    Showroom modern dengan koleksi mobil lelang terlengkap di Indonesia
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-white drop-shadow-lg text-xs sm:text-base">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                      <span className="font-semibold">1500+ Unit Tersedia</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-white drop-shadow-lg text-xs sm:text-base">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                      <span className="font-semibold">Terdaftar OJK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Banners from CMS */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <DynamicBanner position="home" />
          </div>
        </section>

        {/* Client Logos Slider */}
        <ClientLogosSlider />

        {/* Press Media Slider */}
        <PressMediaSlider />

        {/* Promotional Event Banner Section - December 2025 */}
        <section className="relative py-8 sm:py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-yellow-600/5" />

          <div className="container mx-auto relative px-4 sm:px-6 max-w-7xl">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500">
              <div className="relative w-full h-auto">
                <Image
                  src="/images/promo-december-2025.png"
                  alt="Promo Desember 2025 - Bonus Saldo 2.5 Juta"
                  width={1600}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                />
              </div>

              {/* CTA Buttons Overlay */}
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-3 w-full px-4 sm:w-auto">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold shadow-2xl h-12 sm:h-14 text-sm sm:text-base"
                  asChild
                >
                  <a href="/register">Daftar Sekarang & Dapatkan Bonus!</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-[#25D366] hover:bg-[#20BA5A] border-0 text-white font-bold shadow-2xl h-12 sm:h-14 text-sm sm:text-base flex items-center gap-2"
                  asChild
                >
                  <a
                    href="https://api.whatsapp.com/send/?phone=62882022783493&text=Halo%2C+saya+ingin+bertanya+tentang+promo+Desember+2025.&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp: +62 882-0227-83493
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership and Certification Logos Section */}
        <PartnershipLogos />

        {/* Vehicle Brands scrolling section after partnerships */}
        <VehicleBrands />

        {/* KYC Bonus Banner */}
        <KYCBanner />

        {/* Company Profile Section with About Us */}
        <CompanyProfile />

        {/* How It Works */}
        <HowItWorks />

        {/* Featured Auctions */}
        <section className="py-12 sm:py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

          <div className="container mx-auto relative px-4 sm:px-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-balance">
                  Lelang <span className="text-primary text-glow">Aktif</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Mobil-mobil terbaik dengan harga kompetitif
                </p>
              </div>
              <Link href="/lelang">
                <Button
                  variant="outline"
                  className="glass-button border-white/10 hover:border-primary bg-transparent text-sm"
                >
                  Lihat Semua
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {liveVehicles.length > 0 ? (
                liveVehicles.map((vehicle, index) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index < 2} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Car className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Belum ada lelang aktif saat ini</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Cek kembali nanti untuk lelang terbaru</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Categories with Icons */}
        <section className="py-12 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <div className="container mx-auto relative px-4 sm:px-6 max-w-7xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance">
                Kategori <span className="text-primary text-glow">Kendaraan</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Temukan mobil sesuai kebutuhan Anda
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  type={category.type}
                  count={category.count}
                  color={category.color}
                  imageUrl={category.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Filter */}
        <BrandFilter />

        {/* Stats Section */}
        <StatsSection />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Testimonials */}
        <section className="py-12 sm:py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

          <div className="container mx-auto relative px-4 sm:px-6 max-w-7xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance">
                Apa Kata <span className="text-secondary">Mereka</span>?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                120+ testimoni nyata dari pelanggan yang telah bertransaksi di LELANGMOBIL.COM
              </p>
            </div>

            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />

        {/* Bank Logos */}
        <BankLogos />
      </main>

      <Footer />
    </div>
  )
}
