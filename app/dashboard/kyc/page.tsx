"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils/format"
import { ShieldCheck, Upload, Camera, FileText, CheckCircle2, Clock, Gift, Info, X, Loader2 } from "lucide-react"

const KYC_BONUS = 2500000

export default function KYCPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [ktpFile, setKtpFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [npwp, setNpwp] = useState("")
  const [kycStatus] = useState<"unverified" | "pending" | "verified" | "rejected">("unverified")

  async function handleSubmit() {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setStep(4) // Success step
  }

  if (kycStatus === "verified") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Verifikasi KYC</h1>
          <p className="text-muted-foreground">Status verifikasi identitas Anda</p>
        </div>

        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-emerald-100 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-800">KYC Terverifikasi</h3>
                <p className="text-emerald-700">Akun Anda telah terverifikasi. Anda dapat menikmati semua fitur.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (kycStatus === "pending") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Verifikasi KYC</h1>
          <p className="text-muted-foreground">Status verifikasi identitas Anda</p>
        </div>

        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-amber-100 rounded-full">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-800">Sedang Diproses</h3>
                <p className="text-amber-700">
                  Dokumen Anda sedang dalam proses verifikasi. Biasanya membutuhkan waktu maksimal 24 jam.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Verifikasi KYC</h1>
        <p className="text-muted-foreground">Lengkapi verifikasi untuk mendapatkan akses penuh</p>
      </div>

      {/* Bonus Banner */}
      <Card className="bg-gradient-to-r from-secondary to-amber-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Gift className="w-12 h-12" />
            <div>
              <h3 className="text-xl font-bold">Dapatkan Bonus {formatCurrency(KYC_BONUS)}!</h3>
              <p className="opacity-90">Selesaikan verifikasi KYC dan bonus akan langsung masuk ke saldo Anda.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
            {s < 3 && <div className={`w-16 h-1 ${step > s ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Upload KTP"}
            {step === 2 && "Selfie dengan KTP"}
            {step === 3 && "Data Tambahan"}
            {step === 4 && "Verifikasi Dikirim"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Upload foto KTP Anda yang jelas dan tidak terpotong"}
            {step === 2 && "Ambil foto selfie sambil memegang KTP di samping wajah Anda"}
            {step === 3 && "Lengkapi data tambahan (opsional)"}
            {step === 4 && "Dokumen Anda sedang dalam proses verifikasi"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <>
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => document.getElementById("ktp-upload")?.click()}
              >
                {ktpFile ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500" />
                    <p className="font-medium">{ktpFile.name}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setKtpFile(null)
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Hapus
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">Klik untuk upload atau drag & drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG atau PDF (max. 5MB)</p>
                  </>
                )}
                <input
                  id="ktp-upload"
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => setKtpFile(e.target.files?.[0] || null)}
                />
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Pastikan foto KTP jelas, tidak blur, dan semua informasi terbaca dengan baik.
                </AlertDescription>
              </Alert>

              <Button className="w-full" disabled={!ktpFile} onClick={() => setStep(2)}>
                Lanjutkan
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => document.getElementById("selfie-upload")?.click()}
              >
                {selfieFile ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500" />
                    <p className="font-medium">{selfieFile.name}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelfieFile(null)
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Hapus
                    </Button>
                  </div>
                ) : (
                  <>
                    <Camera className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">Upload foto selfie dengan KTP</p>
                    <p className="text-xs text-muted-foreground">Pegang KTP di samping wajah Anda</p>
                  </>
                )}
                <input
                  id="selfie-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setSelfieFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                  Kembali
                </Button>
                <Button className="flex-1" disabled={!selfieFile} onClick={() => setStep(3)}>
                  Lanjutkan
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="npwp">Nomor NPWP (Opsional)</Label>
                  <Input
                    id="npwp"
                    placeholder="XX.XXX.XXX.X-XXX.XXX"
                    value={npwp}
                    onChange={(e) => setNpwp(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">NPWP diperlukan untuk transaksi di atas Rp 10 juta</p>
                </div>
              </div>

              <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertDescription>
                  Data Anda aman dan terenkripsi. Kami tidak akan membagikan data Anda kepada pihak ketiga.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(2)}>
                  Kembali
                </Button>
                <Button className="flex-1" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Verifikasi"
                  )}
                </Button>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dokumen Berhasil Dikirim!</h3>
              <p className="text-muted-foreground mb-6">
                Tim kami akan memverifikasi dokumen Anda dalam waktu maksimal 24 jam. Anda akan menerima notifikasi
                setelah proses selesai.
              </p>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Estimasi: 1-24 jam
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <FileText className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold">Dokumen Diperlukan</h4>
              <p className="text-sm text-muted-foreground">KTP dan Selfie dengan KTP</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <Clock className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold">Waktu Proses</h4>
              <p className="text-sm text-muted-foreground">Maksimal 24 jam kerja</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <Gift className="w-8 h-8 text-secondary shrink-0" />
            <div>
              <h4 className="font-semibold">Bonus KYC</h4>
              <p className="text-sm text-muted-foreground">{formatCurrency(KYC_BONUS)} langsung masuk</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
