import Image from "next/image"

export function PartnershipLogos() {
  const partners = [
    {
      name: "RANS Entertainment",
      logo: "https://upload.wikimedia.org/wikipedia/en/8/8f/RANS_Entertainment_Logo.png",
      type: "Kerja Sama",
    },
    {
      name: "TikTok",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Tiktok_icon.svg",
      type: "Media Partner",
    },
    {
      name: "Telkomsel",
      logo: "https://maxsi.id/web/assets/logo-telkomsel-baru.DYhv_uL8_1T5nit.webp",
      type: "Partner Pembayaran",
    },
  ]

  const certifications = [
    {
      name: "OJK - Otoritas Jasa Keuangan",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/OJK_Logo.png",
      type: "Terdaftar & Diawasi",
    },
    {
      name: "Bank Indonesia",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/BI_Logo.png/1200px-BI_Logo.png",
      type: "Disetujui Resmi",
    },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto relative space-y-12 max-w-7xl">
        {/* Certifications Section */}
        <div className="text-center space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Terdaftar & <span className="text-primary">Disetujui Resmi</span>
            </h3>
            <p className="text-muted-foreground">Legalitas terjamin di Indonesia</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col items-center gap-3 glass-card p-6 rounded-2xl hover:glow-primary transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-16 w-32 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={cert.logo || "/placeholder.svg"}
                    alt={cert.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-primary">{cert.type}</p>
                  <p className="text-xs text-muted-foreground">{cert.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Section */}
        <div className="text-center space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Bekerja Sama <span className="text-secondary">Dengan</span>
            </h3>
            <p className="text-muted-foreground">Partner terpercaya kami</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center gap-2 glass-card p-5 rounded-xl hover:glow-secondary transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-12 w-24 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-xs text-muted-foreground">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
