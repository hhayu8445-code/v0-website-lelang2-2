import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Save } from "lucide-react"

export const dynamic = "force-dynamic"

async function getSettings() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return []

  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .order("key", { ascending: true })

  return data || []
}

export default async function AdminSettingsPage() {
  const settings = await getSettings()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pengaturan Admin</h1>
          <p className="text-muted-foreground">Kelola pengaturan sistem dan konfigurasi</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Simpan Perubahan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Pengaturan Umum
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.slice(0, Math.ceil(settings.length / 2)).map((setting) => (
              <div key={setting.id} className="space-y-2">
                <label className="text-sm font-medium">{setting.key}</label>
                <input
                  type="text"
                  defaultValue={setting.value}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled
                />
                {setting.description && (
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Pengaturan Lanjutan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.slice(Math.ceil(settings.length / 2)).map((setting) => (
              <div key={setting.id} className="space-y-2">
                <label className="text-sm font-medium">{setting.key}</label>
                <input
                  type="text"
                  defaultValue={setting.value}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled
                />
                {setting.description && (
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Sistem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Pengaturan</p>
              <p className="text-2xl font-bold">{settings.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-2xl font-bold text-green-600">Aktif</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
