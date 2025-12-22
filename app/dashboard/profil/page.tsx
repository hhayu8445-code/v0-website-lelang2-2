"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { User, Lock, Save, Loader2, CheckCircle2 } from "lucide-react"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  // Mock user data
  const user = {
    full_name: "John Doe",
    email: "john@example.com",
    phone: "081234567890",
    kyc_status: "verified",
  }

  async function handleSave() {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 py-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Profil Saya</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Kelola informasi pribadi Anda</p>
      </div>

      {saved && (
        <Alert className="border-emerald-200 bg-emerald-50">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800">Profil berhasil disimpan!</AlertDescription>
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
            <div className="space-y-2 w-full">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Nama Lengkap
              </Label>
              <Input id="fullName" defaultValue={user.full_name} className="w-full" />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                Email
                <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-600">
                  Verified
                </Badge>
              </Label>
              <Input id="email" type="email" defaultValue={user.email} disabled className="w-full" />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="phone" className="text-sm font-medium">
                Nomor HP
              </Label>
              <Input id="phone" type="tel" defaultValue={user.phone} className="w-full" />
            </div>

            <div className="space-y-2 w-full">
              <Label className="text-sm font-medium">Status KYC</Label>
              <div className="flex items-center h-10">
                <Badge variant={user.kyc_status === "verified" ? "default" : "secondary"} className="text-sm">
                  {user.kyc_status === "verified" ? "Verified" : "Unverified"}
                </Badge>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto" size="lg">
            {isLoading ? (
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
              <Input id="currentPassword" type="password" className="w-full" />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="newPassword" className="text-sm font-medium">
                Password Baru
              </Label>
              <Input id="newPassword" type="password" className="w-full" />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Konfirmasi Password Baru
              </Label>
              <Input id="confirmPassword" type="password" className="w-full" />
            </div>
          </div>

          <Button variant="outline" className="w-full sm:w-auto bg-transparent" size="lg">
            <Lock className="w-4 h-4 mr-2" />
            Ubah Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
