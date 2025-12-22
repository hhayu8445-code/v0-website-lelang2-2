import Image from "next/image"

export function BankLogos() {
  const banks = [
    {
      id: "bca",
      name: "Bank BCA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
    },
    {
      id: "mandiri",
      name: "Bank Mandiri",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg",
    },
    {
      id: "bri",
      name: "Bank BRI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg",
    },
    {
      id: "bni",
      name: "Bank BNI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bank_Negara_Indonesia_logo_%282004%29.svg/2560px-Bank_Negara_Indonesia_logo_%282004%29.svg.png",
    },
    {
      id: "btn",
      name: "Bank BTN",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Bank_BTN_logo.svg/2560px-Bank_BTN_logo.svg.png",
    },
    {
      id: "cimb",
      name: "CIMB Niaga",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/CIMB_Niaga_logo.svg",
    },
    {
      id: "permata",
      name: "Bank Permata",
      logo: "https://wp.logos-download.com/wp-content/uploads/2022/11/Permata_Bank_Logo.png",
    },
    {
      id: "danamon",
      name: "Bank Danamon",
      logo: "https://agniakhassaarkananta.com/wp-content/uploads/2024/07/2560px-Danamon.svg.png",
    },
    {
      id: "mega",
      name: "Bank Mega",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Bank_Mega_2013.svg/2560px-Bank_Mega_2013.svg.png",
    },
    {
      id: "panin",
      name: "Bank Panin",
      logo: "https://cdn.remitly.com/images/v1/img/paninbank1x_thu_sep_20_2018.1DwH1YByNfkbUisISTpGgY.png",
    },
  ]

  const ewallets = [
    {
      id: "gopay",
      name: "GoPay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg",
    },
    {
      id: "ovo",
      name: "OVO",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg",
    },
    {
      id: "dana",
      name: "DANA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
    },
    {
      id: "shopeepay",
      name: "ShopeePay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
    },
    {
      id: "linkaja",
      name: "LinkAja",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/LinkAja.svg",
    },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="container mx-auto relative max-w-7xl">
        <h3 className="text-center text-lg font-semibold mb-10 text-muted-foreground">
          Metode Pembayaran yang Didukung
        </h3>

        {/* Banks */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          {banks.map((bank) => (
            <div
              key={bank.id}
              className="glass-card p-4 rounded-xl grayscale hover:grayscale-0 opacity-60 hover:opacity-100 hover:glow-primary transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-8 w-20">
                <Image
                  src={bank.logo || "/placeholder.svg"}
                  alt={bank.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>

        {/* E-wallets */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          {ewallets.map((wallet) => (
            <div
              key={wallet.id}
              className="glass-card p-3 rounded-xl grayscale hover:grayscale-0 opacity-60 hover:opacity-100 hover:glow-secondary transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-7 w-16">
                <Image
                  src={wallet.logo || "/placeholder.svg"}
                  alt={wallet.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
