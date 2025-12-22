import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye, EyeOff, AlertCircle } from "lucide-react"
import { BannerActions } from "@/components/admin/banner-actions"

export const dynamic = "force-dynamic"

export default async function BannersPage() {
  const supabase = await createServerClient()

  if (!supabase) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kelola Banner</h1>
            <p className="text-muted-foreground">Atur banner promosi di berbagai halaman</p>
          </div>
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

  const { data: banners } = await supabase.from("site_banners").select("*").order("display_order", { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kelola Banner</h1>
          <p className="text-muted-foreground">Atur banner promosi di berbagai halaman</p>
        </div>
        <Link href="/admin/cms/banners/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Banner
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {banners?.map((banner: any) => (
          <Card key={banner.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative w-48 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={banner.image_url || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{banner.title}</h3>
                      {banner.subtitle && <p className="text-sm text-muted-foreground">{banner.subtitle}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={banner.is_active ? "default" : "secondary"}>
                        {banner.is_active ? (
                          <>
                            <Eye className="h-3 w-3 mr-1" /> Aktif
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" /> Nonaktif
                          </>
                        )}
                      </Badge>
                      <Badge variant="outline">{banner.position}</Badge>
                    </div>
                  </div>

                  {banner.link_url && (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Link:</span>{" "}
                      <a
                        href={banner.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {banner.link_url}
                      </a>
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <Link href={`/admin/cms/banners/${banner.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <BannerActions bannerId={banner.id} isActive={banner.is_active} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {(!banners || banners.length === 0) && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Belum ada banner. Tambahkan banner pertama Anda!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
