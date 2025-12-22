"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBrowserClient } from "@/lib/supabase/client"
import { ArrowLeft, Upload, X, Loader2, AlertTriangle } from "lucide-react"
import Link from "next/link"

const BRANDS = [
  "Toyota",
  "Honda",
  "Suzuki",
  "Daihatsu",
  "Mitsubishi",
  "Nissan",
  "Mazda",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Tesla",
]
const TRANSMISSIONS = ["Manual", "Automatic", "CVT", "DCT"]
const FUEL_TYPES = ["Bensin", "Diesel", "Hybrid", "Electric"]
const CONDITIONS = ["Excellent", "Good", "Fair"]

export default function TambahLelangPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [dbError, setDbError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    transmission: "",
    fuel_type: "",
    color: "",
    starting_price: 0,
    buy_now_price: 0,
    condition: "",
    description: "",
    location: "",
    auction_start_time: "",
    auction_end_time: "",
  })

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 10) {
      alert("Maksimal 10 gambar")
      return
    }

    setImages([...images, ...files])

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      alert("Minimal 1 gambar kendaraan")
      return
    }

    setLoading(true)
    setDbError(null)

    try {
      const supabase = createBrowserClient()

      const { error: checkError } = await supabase.from("vehicles").select("id").limit(1)

      if (checkError && checkError.message.includes("Could not find the table")) {
        setDbError("Tabel database belum dibuat. Silakan jalankan SQL script terlebih dahulu.")
        setLoading(false)
        return
      }

      // Upload images
      const imageUrls: string[] = []
      for (const image of images) {
        const fileName = `vehicles/${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${image.name}`
        const { error: uploadError } = await supabase.storage.from("vehicles").upload(fileName, image)

        if (uploadError) {
          // If storage bucket doesn't exist, use placeholder
          imageUrls.push("/placeholder.svg?height=400&width=600")
          continue
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("vehicles").getPublicUrl(fileName)
        imageUrls.push(publicUrl)
      }

      // If no images uploaded successfully, use placeholders
      if (imageUrls.length === 0) {
        imageUrls.push("/placeholder.svg?height=400&width=600")
      }

      // Create vehicle
      const { error } = await supabase.from("vehicles").insert({
        ...formData,
        images: imageUrls,
        auction_status: new Date(formData.auction_start_time) <= new Date() ? "live" : "upcoming",
        current_bid: formData.starting_price,
        view_count: 0,
        bid_count: 0,
      })

      if (error) throw error

      alert("Lelang berhasil ditambahkan!")
      router.push("/admin/lelang")
    } catch (error: any) {
      if (error.message?.includes("Could not find the table")) {
        setDbError("Tabel database belum dibuat. Silakan jalankan SQL script terlebih dahulu.")
      } else {
        alert(error.message || "Terjadi kesalahan")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/lelang">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Tambah Lelang Baru</h1>
          <p className="text-muted-foreground">Tambahkan kendaraan ke lelang</p>
        </div>
      </div>

      {dbError && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
            <div>
              <p className="font-medium text-orange-700">Database Belum Siap</p>
              <p className="text-sm text-orange-600 mt-1">{dbError}</p>
              <p className="text-sm text-orange-600 mt-2">
                Jalankan file{" "}
                <code className="bg-orange-100 px-1 rounded">scripts/001_complete_database_setup.sql</code> di Supabase
                SQL Editor untuk membuat tabel.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kendaraan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Brand</Label>
                    <Select value={formData.brand} onValueChange={(val) => setFormData({ ...formData, brand: val })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANDS.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input
                      placeholder="Avanza, Civic, dll"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Tahun</Label>
                    <Input
                      type="number"
                      min={1980}
                      max={new Date().getFullYear() + 1}
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Kilometer</Label>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Warna</Label>
                    <Input
                      placeholder="Putih, Hitam, dll"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Transmisi</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(val) => setFormData({ ...formData, transmission: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih transmisi" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRANSMISSIONS.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bahan Bakar</Label>
                    <Select
                      value={formData.fuel_type}
                      onValueChange={(val) => setFormData({ ...formData, fuel_type: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih bahan bakar" />
                      </SelectTrigger>
                      <SelectContent>
                        {FUEL_TYPES.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Kondisi</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(val) => setFormData({ ...formData, condition: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kondisi" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONDITIONS.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Lokasi</Label>
                  <Input
                    placeholder="Jakarta, Surabaya, dll"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Textarea
                    rows={5}
                    placeholder="Deskripsikan kondisi, kelengkapan, dan detail kendaraan..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Foto Kendaraan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden group">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 10 && (
                    <label className="aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Upload</span>
                      <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
                    </label>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Upload minimal 1 foto, maksimal 10 foto</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Harga</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Harga Awal Lelang</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                    <Input
                      type="number"
                      placeholder="50000000"
                      className="pl-10"
                      value={formData.starting_price}
                      onChange={(e) =>
                        setFormData({ ...formData, starting_price: Number.parseInt(e.target.value) || 0 })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Harga Buy Now (Opsional)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                    <Input
                      type="number"
                      placeholder="75000000"
                      className="pl-10"
                      value={formData.buy_now_price}
                      onChange={(e) =>
                        setFormData({ ...formData, buy_now_price: Number.parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Kosongkan jika tidak ada</p>
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Jadwal Lelang</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Mulai</Label>
                  <Input
                    type="datetime-local"
                    value={formData.auction_start_time}
                    onChange={(e) => setFormData({ ...formData, auction_start_time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Selesai</Label>
                  <Input
                    type="datetime-local"
                    value={formData.auction_end_time}
                    onChange={(e) => setFormData({ ...formData, auction_end_time: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Tambah Lelang
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
