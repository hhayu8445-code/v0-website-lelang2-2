"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signUp } from "@/lib/actions/auth"
import { Car, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    const password = formData.get("password") as string
    if (password.length < 8) {
      setError("Password harus minimal 8 karakter.")
      setLoading(false)
      return
    }

    try {
      const result = await signUp(formData)

      if (result?.error) {
        setError(result.error)
        setLoading(false)
      } else if (result?.success) {
        setSuccess(true)
        setLoading(false)
      }
    } catch (err) {
      console.error("Registration error:", err)
      setError("Terjadi kesalahan. Silakan coba lagi.")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <Card className="w-full max-w-md glass-card border-white/10">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-500/20 rounded-full">
                <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-emerald-500" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold">Registrasi Berhasil!</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Kami telah mengirimkan email verifikasi ke alamat email Anda. Silakan cek inbox atau folder spam.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/login">
              <Button className="w-full h-11 bg-gradient-to-r from-primary to-red-700">Kembali ke Login</Button>
            </Link>
            <p className="text-xs text-center text-muted-foreground">
              Tidak menerima email? <button className="text-primary hover:underline">Kirim ulang</button>
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md glass-card border-white/10">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-red-700 rounded-xl shadow-lg">
              <Car className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">Daftar LELANGMOBIL</CardTitle>
          <CardDescription className="text-sm">
            Daftar sekarang dan dapatkan bonus <span className="text-secondary font-bold">Rp 2.5 juta</span> setelah
            verifikasi KYC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm">
                Nama Lengkap
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Masukkan nama lengkap"
                required
                disabled={loading}
                className="h-11 bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">
                Nomor Telepon
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="08123456789"
                required
                disabled={loading}
                className="h-11 bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                required
                disabled={loading}
                className="h-11 bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  required
                  minLength={8}
                  disabled={loading}
                  className="h-11 bg-white/5 border-white/10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Password harus minimal 8 karakter</p>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-primary to-red-700 hover:from-primary/90 hover:to-red-700/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Mendaftar...
                </>
              ) : (
                "Daftar Sekarang"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Masuk di sini
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
