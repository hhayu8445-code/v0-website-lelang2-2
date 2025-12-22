import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Syarat & Ketentuan - LELANGMOBIL.COM",
  description: "Syarat dan ketentuan penggunaan platform lelang mobil LELANGMOBIL.COM",
}

export default function SyaratPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Syarat & Ketentuan</h1>

          <Card className="mb-6">
            <CardContent className="pt-6 prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-6">Terakhir diperbarui: 19 Desember 2025</p>

              <h2 className="text-xl font-bold mt-8 mb-4">1. Pendahuluan</h2>
              <p className="text-muted-foreground mb-4">
                Selamat datang di LELANGMOBIL.COM. Dengan mengakses dan menggunakan platform kami, Anda menyetujui untuk
                terikat oleh syarat dan ketentuan berikut. Harap baca dengan seksama sebelum menggunakan layanan kami.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">2. Definisi</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  <strong>Platform</strong>: Website LELANGMOBIL.COM dan seluruh layanan terkait
                </li>
                <li>
                  <strong>Pengguna</strong>: Setiap orang yang mengakses atau menggunakan Platform
                </li>
                <li>
                  <strong>KYC</strong>: Know Your Customer, proses verifikasi identitas pengguna
                </li>
                <li>
                  <strong>Lelang</strong>: Proses penawaran kompetitif untuk pembelian kendaraan
                </li>
                <li>
                  <strong>Bid</strong>: Penawaran harga yang diajukan dalam lelang
                </li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">3. Pendaftaran & KYC</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Pengguna wajib berusia minimal 18 tahun</li>
                <li>Data yang diberikan harus akurat dan valid</li>
                <li>Proses KYC wajib dilakukan sebelum mengikuti lelang</li>
                <li>Dokumen KYC yang diperlukan: KTP, foto selfie dengan KTP</li>
                <li>Bonus KYC sebesar Rp 2.500.000 diberikan setelah verifikasi berhasil</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">4. Ketentuan Bonus KYC</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Bonus masuk ke saldo bonus, terpisah dari saldo utama</li>
                <li>Bonus dapat digunakan untuk mengikuti lelang</li>
                <li>Bonus tidak dapat ditarik sebelum mengikuti minimal 1 lelang</li>
                <li>Setelah berpartisipasi dalam 1 lelang, sisa bonus dapat ditarik</li>
                <li>Bonus berlaku seumur hidup dan tidak kedaluwarsa</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">5. Aturan Lelang</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Kelipatan bid minimum adalah Rp 100.000</li>
                <li>Bid harus lebih tinggi dari bid tertinggi saat ini</li>
                <li>Bid yang sudah dikonfirmasi tidak dapat dibatalkan</li>
                <li>Pengguna harus memiliki saldo cukup untuk melakukan bid</li>
                <li>Pemenang lelang wajib menyelesaikan pembayaran</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">6. Pembayaran</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Pembayaran dilakukan melalui saldo di Platform</li>
                <li>Deposit dapat dilakukan via transfer bank atau e-wallet</li>
                <li>Minimal deposit Rp 100.000, maksimal Rp 500.000.000</li>
                <li>Withdrawal diproses dalam 1-3 hari kerja</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">7. Kondisi Kendaraan</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Kondisi kendaraan sesuai dengan deskripsi dan foto yang ditampilkan</li>
                <li>Pengguna disarankan untuk melakukan inspeksi langsung jika memungkinkan</li>
                <li>Garansi 7 hari untuk klaim kondisi mesin yang tidak sesuai</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">8. Larangan</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Memberikan informasi palsu atau menyesatkan</li>
                <li>Menggunakan akun orang lain</li>
                <li>Melakukan bid palsu atau bid sham</li>
                <li>Menggunakan bot atau automasi untuk bidding</li>
                <li>Melakukan tindakan yang merugikan pengguna lain</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">9. Penyelesaian Sengketa</h2>
              <p className="text-muted-foreground mb-4">
                Setiap sengketa akan diselesaikan secara musyawarah. Jika tidak tercapai kesepakatan, sengketa akan
                diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI) sesuai dengan hukum yang berlaku di
                Republik Indonesia.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">10. Perubahan Syarat & Ketentuan</h2>
              <p className="text-muted-foreground mb-4">
                LELANGMOBIL.COM berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan
                melalui email atau notifikasi di Platform. Penggunaan berkelanjutan setelah perubahan dianggap sebagai
                persetujuan terhadap syarat dan ketentuan yang baru.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">11. Kontak</h2>
              <p className="text-muted-foreground mb-4">
                Untuk pertanyaan mengenai syarat dan ketentuan ini, hubungi kami di:
              </p>
              <ul className="list-none text-muted-foreground space-y-1 mb-4">
                <li>Email: legal@lelangmobil.com</li>
                <li>Telepon: (021) 1234-5678</li>
                <li>Alamat: Jl. Sudirman No. 123, Jakarta Pusat 10220</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
