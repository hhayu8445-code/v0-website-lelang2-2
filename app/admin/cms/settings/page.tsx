import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsForm } from "@/components/admin/settings-form"
import { AlertCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function SettingsPage() {
  const supabase = await createServerClient()

  if (!supabase) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Pengaturan Website</h1>
          <p className="text-muted-foreground">Kelola konten dan konfigurasi website</p>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Database tidak tersedia. Periksa konfigurasi Supabase.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { data: settings } = await supabase.from("site_settings").select("*").order("category", { ascending: true })

  const groupedSettings = settings?.reduce((acc: any, setting: any) => {
    if (!acc[setting.category]) {
      acc[setting.category] = []
    }
    acc[setting.category].push(setting)
    return acc
  }, {})

  const categories = [
    { key: "footer", label: "Footer" },
    { key: "contact", label: "Kontak" },
    { key: "social", label: "Social Media" },
    { key: "general", label: "Umum" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan Website</h1>
        <p className="text-muted-foreground">Kelola konten dan konfigurasi website</p>
      </div>

      <div className="grid gap-6">
        {categories.map((category) => (
          <Card key={category.key}>
            <CardHeader>
              <CardTitle>{category.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <SettingsForm settings={groupedSettings?.[category.key] || []} category={category.key} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
