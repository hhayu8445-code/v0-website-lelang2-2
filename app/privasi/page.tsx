import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Kebijakan Privasi - LELANGMOBIL.COM",
  description: "Kebijakan privasi dan perlindungan data pengguna LELANGMOBIL.COM",
}

export default function PrivasiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Kebijakan Privasi</h1>

          <Card className="mb-6">
            <CardContent className="pt-6 prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-6">Terakhir diperbarui: 19 Desember 2025</p>

              <h2 className="text-xl font-bold mt-8 mb-4">1. Pengumpulan Data</h2>
              <p className="text-muted-foreground mb-4">
                Kami mengumpulkan data berikut untuk menyediakan layanan yang optimal:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Data identitas: nama lengkap, nomor KTP, alamat</li>
                <li>Data kontak: email, nomor telepon</li>
                <li>Data keuangan: informasi rekening bank untuk pembayaran</li>
                <li>Data dokumen: foto KTP, foto selfie untuk verifikasi KYC</li>
                <li>Data aktivitas: riwayat lelang, transaksi, dan penggunaan platform</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">2. Penggunaan Data</h2>
              <p className="text-muted-foreground mb-4">Data Anda digunakan untuk:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Verifikasi identitas (KYC)</li>
                <li>Memproses transaksi dan lelang</li>
                <li>Mengirim notifikasi terkait lelang dan akun</li>
                <li>Meningkatkan layanan dan pengalaman pengguna</li>
                <li>Kepatuhan terhadap peraturan yang berlaku</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">3. Keamanan Data</h2>
              <p className="text-muted-foreground mb-4">Kami melindungi data Anda dengan:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Enkripsi SSL 256-bit untuk semua transmisi data</li>
                <li>Penyimpanan data terenkripsi di server yang aman</li>
                <li>Akses terbatas hanya untuk personel yang berwenang</li>
                <li>Audit keamanan berkala</li>
                <li>Sertifikasi ISO 27001</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">4. Berbagi Data</h2>
              <p className="text-muted-foreground mb-4">Kami tidak menjual data Anda. Data hanya dibagikan kepada:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Mitra pembayaran untuk memproses transaksi</li>
                <li>Otoritas berwenang jika diwajibkan oleh hukum</li>
                <li>Penyedia layanan yang membantu operasional platform</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">5. Hak Anda</h2>
              <p className="text-muted-foreground mb-4">Anda memiliki hak untuk:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Mengakses data pribadi Anda yang kami simpan</li>
                <li>Meminta koreksi data yang tidak akurat</li>
                <li>Meminta penghapusan data (dengan batasan tertentu)</li>
                <li>Menarik persetujuan penggunaan data</li>
                <li>Mengajukan keluhan ke otoritas perlindungan data</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">6. Penyimpanan Data</h2>
              <p className="text-muted-foreground mb-4">
                Data disimpan selama akun aktif dan hingga 5 tahun setelah akun ditutup untuk kepatuhan hukum. Dokumen
                KYC disimpan sesuai dengan peraturan anti pencucian uang yang berlaku.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">7. Cookie</h2>
              <p className="text-muted-foreground mb-4">
                Kami menggunakan cookie untuk meningkatkan pengalaman pengguna, analitik, dan keamanan. Anda dapat
                mengelola preferensi cookie melalui pengaturan browser.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">8. Kontak</h2>
              <p className="text-muted-foreground mb-4">Untuk pertanyaan tentang privasi data, hubungi:</p>
              <ul className="list-none text-muted-foreground space-y-1 mb-4">
                <li>Data Protection Officer</li>
                <li>Email: privacy@lelangmobil.com</li>
                <li>Telepon: (021) 1234-5678</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
