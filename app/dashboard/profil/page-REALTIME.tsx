"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { User, Lock, Save, Loader2, CheckCircle2, AlertCircle, MapPin, Phone, Mail, CreditCard } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import type { User as UserType } from "@/lib/types"

export default function ProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<UserType | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    id_card_number: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    country: "Indonesia",
  })

  // Password state
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  // Load user data
  useEffect(() => {
    loadUserData()
  }, [])

  async function loadUserData() {
    try {
      const supabase = createBrowserClient()
      if (!supabase) {
        setError("Database tidak tersedia")
        setIsLoading(false)
        return
      }

      // Get current user
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !authUser) {
        router.push("/login")
        return
      }

      // Get user profile
      const { data, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single()

      if (profileError) {
        setError("Gagal memuat profil")
        setIsLoading(false)
        return
      }

      setUser(data)
      setFormData({
        full_name: data.full_name || "",
        phone: data.phone || "",
        id_card_number: data.id_card_number || "",
        address: data.address || "",
        city: data.city || "",
        province: data.province || "",
        postal_code: data.postal_code || "",
        country: data.country || "Indonesia",
      })
    } catch (err) {
      setError("Terjadi kesalahan")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSaveProfile() {
    setIsSaving(true)
    setError(null)

    try {
      const supabase = createBrowserClient()
      if (!supabase || !user) return

      const { error: updateError } = await supabase
        .from("users")
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          id_card_number: formData.id_card_number,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postal_code: formData.postal_code,
          country: formData.country,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (updateError) throw updateError

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      
      // Reload data
      await loadUserData()
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan profil")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleChangePassword() {
    if (passwordData.new !== passwordData.confirm) {
      setError("Password baru tidak cocok")
      return
    }

    if (passwordData.new.length < 6) {
      setError("Password minimal 6 karakter")
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      const supabase = createBrowserClient()
      if (!supabase) return

      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.new
      })

      if (updateError) throw updateError

      setSaved(true)
      setPasswordData({ current: "", new: "", confirm: "" })
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message || "Gagal mengubah password")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Gagal memuat profil. Silakan refresh halaman.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const kycStatusConfig = {
    pending: { label: "Pending", color: "bg-amber-100 text-amber-700" },
    verified: { label: "Verified", color: "bg-green-100 text-green-700" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
  }

  const kycStatus = kycStatusConfig[user.kyc_status as keyof typeof kycStatusConfig]

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 py-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Profil Saya</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Kelola informasi pribadi Anda</p>
      </div>

      {saved && (
        <Alert className="border-emerald-200 bg-emerald-50">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800">Berhasil disimpan!</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Profile Info */}
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            Informasi Pribadi
          </CardTitle>
          <CardDescription className="text-sm">Perbarui data pribadi Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div className="space-y-2 w-full">
              <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Nama Lengkap
              </Label>
              <Input
                id="fullName"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2 w-full">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
                <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-600">
                  Verified
                </Badge>
              </Label>
              <Input id="email" type="email" value={user.email} disabled className="w-full" />
            </div>

            {/* Phone */}
            <div className="space-y-2 w-full">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Nomor HP
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="081234567890"
                className="w-full"
              />
            </div>

            {/* ID Card Number */}
            <div className="space-y-2 w-full">
              <Label htmlFor="idCard" className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                NIK (KTP)
              </Label>
              <Input
                id="idCard"
                value={formData.id_card_number}
                onChange={(e) => setFormData({ ...formData, id_card_number: e.target.value })}
                placeholder="1234567890123456"
                className="w-full"
              />
            </div>

            {/* Address */}
            <div className="space-y-2 w-full md:col-span-2">
              <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Alamat Lengkap
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Jl. Contoh No. 123"
                rows={3}
                className="w-full"
              />
            </div>

            {/* City */}
            <div className="space-y-2 w-full">
              <Label htmlFor="city" className="text-sm font-medium">
                Kota
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Jakarta"
                className="w-full"
              />
            </div>

            {/* Province */}
            <div className="space-y-2 w-full">
              <Label htmlFor="province" className="text-sm font-medium">
                Provinsi
              </Label>
              <Input
                id="province"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                placeholder="DKI Jakarta"
                className="w-full"
              />
            </div>

            {/* Postal Code */}
            <div className="space-y-2 w-full">
              <Label htmlFor="postalCode" className="text-sm font-medium">
                Kode Pos
              </Label>
              <Input
                id="postalCode"
                value={formData.postal_code}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                placeholder="12345"
                className="w-full"
              />
            </div>

            {/* KYC Status */}
            <div className="space-y-2 w-full">
              <Label className="text-sm font-medium">Status KYC</Label>
              <div className="flex items-center h-10">
                <Badge className={kycStatus.color}>{kycStatus.label}</Badge>
              </div>
            </div>
          </div>

          <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full sm:w-auto" size="lg">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
            Ubah Password
          </CardTitle>
          <CardDescription className="text-sm">Pastikan password Anda aman</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2 w-full md:col-span-2">
              <Label htmlFor="currentPassword" className="text-sm font-medium">
                Password Saat Ini
              </Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="newPassword" className="text-sm font-medium">
                Password Baru
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Konfirmasi Password Baru
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                className="w-full"
              />
            </div>
          </div>

          <Button
            onClick={handleChangePassword}
            disabled={isSaving || !passwordData.new}
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
            size="lg"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mengubah...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Ubah Password
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
