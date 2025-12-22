import Link from "next/link"
import { createServerClient } from "@/lib/supabase/server"
import Image from "next/image"

async function getSettings() {
  const supabase = await createServerClient()
  if (!supabase) return {}

  try {
    const { data, error } = await supabase.from("site_settings").select("*")

    if (error) {
      console.warn("Site settings table not found, using defaults")
      return {}
    }

    return (data || []).reduce((acc: any, setting: any) => {
      acc[setting.key] = JSON.parse(setting.value)
      return acc
    }, {})
  } catch (error) {
    console.warn("Error fetching site settings, using defaults")
    return {}
  }
}

export async function Footer() {
  const settings = await getSettings()

  const companyName = settings.footer_company_name || "PT BALAI LELANG MOBIL"
  const description =
    settings.footer_description || "Platform lelang mobil terpercaya #1 di Indonesia. Terdaftar dan diawasi oleh OJK."
  const copyright = settings.footer_copyright || "© 2022 all right reserved."
  const email = settings.contact_email || "info@lelangmobil.com"
  const phone = settings.contact_phone || "+62 882-0227-83493"
  const whatsapp = settings.contact_whatsapp || "62882022783493"
  const instagram = settings.social_instagram || "https://instagram.com/lelangmobil"
  const facebook = settings.social_facebook || "https://facebook.com/lelangmobil"
  const twitter = settings.social_twitter || "https://twitter.com/lelangmobil"
  const youtube = settings.social_youtube || "https://youtube.com/lelangmobil"

  return (
    <footer className="w-full border-t border-white/10 bg-background/50 backdrop-blur-xl">
      <div className="container py-12 sm:py-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
              <div className="relative w-44 h-11 group-hover:scale-105 transition-transform">
                <Image src="/logo.png" alt="LELANGMOBIL" fill className="object-contain" sizes="176px" loading="lazy" />
              </div>
            </Link>
            <div>
              <p className="font-semibold text-base sm:text-lg mb-2">{companyName}</p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
            <div className="flex gap-3">
              {[
                { name: "instagram", url: instagram },
                { name: "facebook", url: facebook },
                { name: "twitter", url: twitter },
                { name: "youtube", url: youtube },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-button flex items-center justify-center hover:glow-primary transition-all"
                >
                  <span className="sr-only">{social.name}</span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-gradient-to-br from-primary/50 to-secondary/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {[
            {
              title: "Perusahaan",
              links: [
                { href: "/tentang", label: "Tentang Kami" },
                { href: "/faq", label: "FAQ" },
                { href: "/syarat", label: "Syarat & Ketentuan" },
                { href: "/privasi", label: "Kebijakan Privasi" },
              ],
            },
            {
              title: "Layanan",
              links: [
                { href: "/lelang", label: "Lelang Aktif" },
                { href: "/dashboard/jual", label: "Jual Mobil" },
                { href: "/dashboard/kyc", label: "Verifikasi KYC" },
                { href: "/dashboard/riwayat", label: "Riwayat Lelang" },
              ],
            },
            {
              title: "Kontak",
              links: [
                { href: `mailto:${email}`, label: email },
                { href: `https://wa.me/${whatsapp}`, label: phone },
                { href: "#", label: "Senin - Jumat" },
                { href: "#", label: "09:00 - 18:00 WIB" },
              ],
            },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-4 sm:mb-6 text-foreground text-sm sm:text-base">{column.title}</h4>
              <ul className="space-y-3 sm:space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={
                        link.href.includes("wa.me")
                          ? `https://api.whatsapp.com/send/?phone=${whatsapp}&text=Halo%2C+saya+ingin+bertanya+tentang+lelang+mobil.&type=phone_number&app_absent=0`
                          : link.href
                      }
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                      target={link.href.includes("http") ? "_blank" : undefined}
                      rel={link.href.includes("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            {companyName} {copyright}
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span>Terdaftar OJK</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span>SSL Secure</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
