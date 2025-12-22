"use client"

import type React from "react"
import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBrowserClient } from "@/lib/supabase/client"
import { ArrowLeft, Upload, X, Loader2, AlertCircle, ImageIcon } from "lucide-react"
import Link from "next/link"
import { SAMPLE_VEHICLES } from "@/lib/constants"
import { validateImageFile } from "@/lib/utils/file-validation"

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
const STATUSES = ["upcoming", "live", "ended", "sold", "cancelled"]

export default function EditLelangPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])
  const [usingSampleData, setUsingSampleData] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>("")

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
    auction_status: "",
  })

  useEffect(() => {
    loadVehicle()
  }, [id])

  async function loadVehicle() {
    try {
      const supabase = createBrowserClient()
      if (!supabase) {
        loadFromSampleData()
        return
      }

      const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).single()

      if (error || !data) {
        loadFromSampleData()
        return
      }

      setFormData({
        brand: data.brand,
        model: data.model,
        year: data.year,
        mileage: data.mileage,
        transmission: data.transmission,
        fuel_type: data.fuel_type,
        color: data.color,
        starting_price: data.starting_price,
        buy_now_price: data.buy_now_price || 0,
        condition: data.condition,
        description: data.description || "",
        location: data.location,
        auction_start_time: data.auction_start_time?.replace("Z", "").slice(0, 16) || "",
        auction_end_time: data.auction_end_time?.replace("Z", "").slice(0, 16) || "",
        auction_status: data.auction_status,
      })
      setExistingImages(data.images || [])
    } catch {
      loadFromSampleData()
    } finally {
      setLoading(false)
    }
  }

  function loadFromSampleData() {
    const sampleVehicle = SAMPLE_VEHICLES.find((v) => v.id === id)
    if (sampleVehicle) {
      setFormData({
        brand: sampleVehicle.brand,
        model: sampleVehicle.model,
        year: sampleVehicle.year,
        mileage: sampleVehicle.mileage,
        transmission: sampleVehicle.transmission,
        fuel_type: sampleVehicle.fuel_type,
        color: sampleVehicle.color,
        starting_price: sampleVehicle.starting_price,
        buy_now_price: 0,
        condition: sampleVehicle.condition,
        description: `${sampleVehicle.brand} ${sampleVehicle.model} tahun ${sampleVehicle.year} kondisi ${sampleVehicle.condition}`,
        location: sampleVehicle.location,
        auction_start_time: new Date().toISOString().slice(0, 16),
        auction_end_time: sampleVehicle.auction_end_time?.replace("Z", "").slice(0, 16) || "",
        auction_status: sampleVehicle.auction_status,
      })
      setExistingImages([...(sampleVehicle.images || [])])
      setUsingSampleData(true)
    } else {
      setError("Kendaraan tidak ditemukan")
    }
    setLoading(false)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    // Check total image count
    if (existingImages.length + newImages.length + files.length > 10) {
      alert("Maksimal 10 gambar")
      return
    }

    // Validate each file
    const validFiles: File[] = []
    for (const file of files) {
      const validation = validateImageFile(file)
      if (!validation.valid) {
        alert(validation.error)
        continue
      }
      validFiles.push(file)
    }

    if (validFiles.length === 0) return

    setNewImages([...newImages, ...validFiles])

    // Generate previews
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImagePreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index))
  }

  const removeNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index))
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (existingImages.length + newImages.length === 0) {
      alert("Minimal 1 gambar kendaraan")
      return
    }

    if (usingSampleData) {
      alert(
        "Data sample tidak dapat diedit. Silakan buat tabel database terlebih dahulu dengan menjalankan SQL script.",
      )
      return
    }

    setSaving(true)
    setUploadProgress("")

    try {
      const supabase = createBrowserClient()
      if (!supabase) {
        throw new Error("Database tidak tersedia")
      }

      // Upload new images with progress tracking
      const newImageUrls: string[] = []
      for (let i = 0; i < newImages.length; i++) {
        const image = newImages[i]
        setUploadProgress(`Uploading image ${i + 1} of ${newImages.length}...`)

        const fileName = `vehicles/${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${image.name}`
        const { error: uploadError } = await supabase.storage.from("vehicles").upload(fileName, image, {
          cacheControl: "3600",
          upsert: false,
        })

        if (uploadError) {
          console.error("Upload error:", uploadError)
          throw new Error(`Gagal upload gambar ${i + 1}: ${uploadError.message}`)
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("vehicles").getPublicUrl(fileName)
        newImageUrls.push(publicUrl)
      }

      const allImages = [...existingImages, ...newImageUrls]

      setUploadProgress("Updating vehicle data...")

      // Update vehicle with all data
      const { error } = await supabase
        .from("vehicles")
        .update({
          brand: formData.brand,
          model: formData.model,
          year: formData.year,
          mileage: formData.mileage,
          transmission: formData.transmission,
          fuel_type: formData.fuel_type,
          color: formData.color,
          starting_price: formData.starting_price,
          buy_now_price: formData.buy_now_price || null,
          condition: formData.condition,
          description: formData.description,
          location: formData.location,
          auction_start_time: formData.auction_start_time,
          auction_end_time: formData.auction_end_time,
          auction_status: formData.auction_status,
          images: allImages,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      alert("Lelang berhasil diupdate!")
      router.push("/admin/lelang")
      router.refresh()
    } catch (error: any) {
      console.error("Submit error:", error)
      alert(error.message || "Terjadi kesalahan")
    } finally {
      setSaving(false)
      setUploadProgress("")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/lelang">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Edit Lelang</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
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
          <h1 className="text-2xl font-bold">Edit Lelang</h1>
          <p className="text-muted-foreground">
            Edit {formData.brand} {formData.model}
            {usingSampleData && <span className="text-orange-500 ml-2">(Data Sample - Read Only)</span>}
          </p>
        </div>
      </div>

      {usingSampleData && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <p className="text-sm text-orange-700">
              <strong>Perhatian:</strong> Ini adalah data sample. Untuk mengedit data secara nyata, jalankan SQL script{" "}
              <code className="bg-orange-100 px-1 rounded">scripts/001_complete_database_setup.sql</code> di Supabase
              SQL Editor.
            </p>
          </CardContent>
        </Card>
      )}

      {uploadProgress && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <p className="text-sm text-blue-700">{uploadProgress}</p>
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
                    <Label>Brand *</Label>
                    <Select
                      value={formData.brand}
                      onValueChange={(val) => setFormData({ ...formData, brand: val })}
                      disabled={usingSampleData}
                    >
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
                    <Label>Model *</Label>
                    <Input
                      placeholder="Avanza, Civic, dll"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      required
                      disabled={usingSampleData}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Tahun *</Label>
                    <Input
                      type="number"
                      min={1980}
                      max={new Date().getFullYear() + 1}
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                      required
                      disabled={usingSampleData}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Kilometer *</Label>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: Number.parseInt(e.target.value) })}
                      required
                      disabled={usingSampleData}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Warna *</Label>
                    <Input
                      placeholder="Putih, Hitam, dll"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      required
                      disabled={usingSampleData}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Transmisi *</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(val) => setFormData({ ...formData, transmission: val })}
                      disabled={usingSampleData}
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
                    <Label>Bahan Bakar *</Label>
                    <Select
                      value={formData.fuel_type}
                      onValueChange={(val) => setFormData({ ...formData, fuel_type: val })}
                      disabled={usingSampleData}
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
                    <Label>Kondisi *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(val) => setFormData({ ...formData, condition: val })}
                      disabled={usingSampleData}
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
                  <Label>Lokasi *</Label>
                  <Input
                    placeholder="Jakarta, Surabaya, dll"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    disabled={usingSampleData}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Deskripsi *</Label>
                  <Textarea
                    rows={5}
                    placeholder="Deskripsikan kondisi, kelengkapan, dan detail kendaraan..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    disabled={usingSampleData}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Foto Kendaraan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((url, index) => (
                    <div
                      key={`existing-${index}`}
                      className="relative aspect-video bg-muted rounded-lg overflow-hidden group border-2 border-transparent hover:border-primary transition-colors"
                    >
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {!usingSampleData && (
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {newImagePreviews.map((preview, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative aspect-video bg-muted rounded-lg overflow-hidden group border-2 border-green-500"
                    >
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`New ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        Baru
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {!usingSampleData && existingImages.length + newImages.length < 10 && (
                    <label className="aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground font-medium">Upload</span>
                      <span className="text-xs text-muted-foreground mt-1">Max 5MB</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {existingImages.length + newImages.length} / 10 gambar • Format: JPG, PNG, WebP • Max 5MB per file
                </p>
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
                  <Label>Harga Awal Lelang *</Label>
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
                      disabled={usingSampleData}
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
                      disabled={usingSampleData}
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
                  <Label>Mulai *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.auction_start_time}
                    onChange={(e) => setFormData({ ...formData, auction_start_time: e.target.value })}
                    required
                    disabled={usingSampleData}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Selesai *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.auction_end_time}
                    onChange={(e) => setFormData({ ...formData, auction_end_time: e.target.value })}
                    required
                    disabled={usingSampleData}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status Lelang</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.auction_status}
                  onValueChange={(val) => setFormData({ ...formData, auction_status: val })}
                  disabled={usingSampleData}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "upcoming" && "Akan Datang"}
                        {status === "live" && "Berlangsung"}
                        {status === "ended" && "Selesai"}
                        {status === "sold" && "Terjual"}
                        {status === "cancelled" && "Dibatalkan"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg" disabled={loading || saving || usingSampleData}>
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
