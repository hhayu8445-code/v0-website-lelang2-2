import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const metadata = {
  title: "FAQ - LELANGMOBIL.COM",
  description: "Pertanyaan yang sering diajukan tentang lelang mobil di LELANGMOBIL.COM",
}

const faqCategories = [
  {
    category: "Pendaftaran & Akun",
    questions: [
      {
        q: "Bagaimana cara mendaftar di LELANGMOBIL.COM?",
        a: 'Klik tombol "Daftar" di halaman utama, isi formulir dengan data diri lengkap, lalu verifikasi email Anda. Setelah itu, Anda bisa melengkapi proses KYC untuk mulai mengikuti lelang.',
      },
      {
        q: "Apa itu KYC dan mengapa saya harus melakukannya?",
        a: "KYC (Know Your Customer) adalah proses verifikasi identitas untuk memastikan keamanan transaksi. Anda perlu mengupload foto KTP dan foto selfie dengan KTP. Setelah KYC disetujui, Anda mendapat bonus Rp 2.500.000!",
      },
      {
        q: "Berapa lama proses verifikasi KYC?",
        a: "Proses verifikasi KYC biasanya memakan waktu maksimal 24 jam pada hari kerja. Kami akan mengirim notifikasi setelah proses selesai.",
      },
      {
        q: "Bagaimana jika KYC saya ditolak?",
        a: "Jika KYC ditolak, Anda akan mendapat notifikasi beserta alasannya. Anda bisa submit ulang dengan dokumen yang valid dan jelas.",
      },
    ],
  },
  {
    category: "Bonus & Saldo",
    questions: [
      {
        q: "Bagaimana cara mendapatkan bonus Rp 2.500.000?",
        a: "Bonus akan otomatis masuk ke saldo bonus Anda setelah KYC disetujui. Tidak perlu kode promo atau langkah tambahan.",
      },
      {
        q: "Apakah bonus bisa langsung ditarik?",
        a: "Bonus tidak bisa langsung ditarik. Anda harus mengikuti minimal 1 lelang terlebih dahulu. Setelah itu, sisa bonus bisa ditarik ke rekening Anda.",
      },
      {
        q: "Bagaimana cara deposit saldo?",
        a: "Buka menu Wallet di dashboard, pilih Deposit, pilih metode pembayaran (transfer bank atau e-wallet), lalu ikuti instruksi. Saldo akan masuk setelah pembayaran terkonfirmasi.",
      },
      {
        q: "Berapa minimal dan maksimal deposit?",
        a: "Minimal deposit adalah Rp 100.000 dan maksimal Rp 500.000.000 per transaksi.",
      },
    ],
  },
  {
    category: "Proses Lelang",
    questions: [
      {
        q: "Bagaimana cara mengikuti lelang?",
        a: 'Pilih mobil yang ingin Anda bid, klik tombol "Bid Sekarang", masukkan jumlah bid Anda (harus lebih tinggi dari bid tertinggi saat ini), lalu konfirmasi. Pastikan saldo cukup!',
      },
      {
        q: "Berapa kelipatan bid minimum?",
        a: "Kelipatan bid minimum adalah Rp 100.000. Anda juga bisa menggunakan tombol quick bid (+100rb, +500rb, +1jt).",
      },
      {
        q: "Apa yang terjadi jika saya menang lelang?",
        a: "Jika Anda menang, Anda akan menerima notifikasi dan email. Saldo untuk pembayaran akan otomatis dikurangi. Tim kami akan menghubungi untuk proses serah terima.",
      },
      {
        q: "Bagaimana jika bid saya terkalahkan?",
        a: "Anda akan menerima notifikasi real-time jika ada yang bid lebih tinggi. Anda bisa langsung bid lagi selama lelang masih berlangsung.",
      },
      {
        q: "Apakah bisa membatalkan bid?",
        a: "Bid yang sudah dikonfirmasi tidak bisa dibatalkan. Pastikan Anda yakin sebelum melakukan bid.",
      },
    ],
  },
  {
    category: "Pembayaran & Pengiriman",
    questions: [
      {
        q: "Metode pembayaran apa saja yang tersedia?",
        a: "Kami menerima transfer bank (BCA, Mandiri, BRI, BNI, CIMB Niaga, dll) dan e-wallet (GoPay, OVO, Dana, ShopeePay).",
      },
      {
        q: "Bagaimana proses pengiriman mobil?",
        a: "Setelah pembayaran lunas, tim kami akan koordinasi untuk pengambilan atau pengiriman. Untuk luar kota, tersedia layanan car carrier dengan biaya tambahan.",
      },
      {
        q: "Apakah ada jaminan kondisi mobil?",
        a: "Semua mobil sudah melalui inspeksi dan kondisi sesuai deskripsi. Kami menyediakan garansi 7 hari untuk klaim kondisi mesin.",
      },
    ],
  },
  {
    category: "Keamanan",
    questions: [
      {
        q: "Apakah transaksi di LELANGMOBIL.COM aman?",
        a: "Ya, kami menggunakan enkripsi SSL 256-bit, sistem verifikasi KYC, dan terdaftar di OJK. Semua transaksi terlindungi.",
      },
      {
        q: "Bagaimana jika ada masalah dengan transaksi?",
        a: "Hubungi customer service kami di support@lelangmobil.com atau WhatsApp. Tim kami siap membantu 24/7.",
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Pertanyaan yang Sering Diajukan</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Temukan jawaban untuk pertanyaan Anda tentang lelang mobil di LELANGMOBIL.COM
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Cari pertanyaan..." className="pl-10" />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {faqCategories.map((category, index) => (
              <Card key={index} className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Masih Ada Pertanyaan?</h2>
            <p className="text-muted-foreground mb-6">Tim customer service kami siap membantu Anda 24/7</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Card className="p-4">
                <p className="font-medium">Email</p>
                <p className="text-primary">support@lelangmobil.com</p>
              </Card>
              <Card className="p-4">
                <p className="font-medium">WhatsApp</p>
                <p className="text-primary">+62 812-3456-7890</p>
              </Card>
              <Card className="p-4">
                <p className="font-medium">Telepon</p>
                <p className="text-primary">(021) 1234-5678</p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
