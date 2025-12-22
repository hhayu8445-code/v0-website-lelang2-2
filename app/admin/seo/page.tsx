import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, ExternalLink, TrendingUp } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function SEOAdminPage() {
  const supabase = await createServerClient()

  if (!supabase) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Database tidak tersedia</p>
      </div>
    )
  }

  // Fetch SEO metadata
  const { data: seoPages, error } = await supabase
    .from("seo_metadata")
    .select("*")
    .order("last_updated", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manajemen SEO</h1>
          <p className="text-muted-foreground mt-1">
            Kelola metadata SEO dan integrasi Semrush untuk optimasi pencarian
          </p>
        </div>
        <form action="/api/seo/sync" method="POST">
          <Button type="submit" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync Semrush Data
          </Button>
        </form>
      </div>

      {/* Semrush Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status Integrasi Semrush</CardTitle>
          <CardDescription>API Key: 3101ad656913045c87a8ea83e1b19698</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Aktif
            </Badge>
            <span className="text-sm text-muted-foreground">Domain: lelangmobil.com</span>
            <Link
              href="https://www.semrush.com/analytics/overview/?searchType=domain&q=lelangmobil.com&db=id"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto"
            >
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <ExternalLink className="h-4 w-4" />
                Lihat di Semrush
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* SEO Pages */}
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Halaman SEO</h2>
          <Badge variant="secondary">{seoPages?.length || 0} Halaman</Badge>
        </div>

        {error ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Tabel SEO belum dibuat. Jalankan script 018_create_seo_metadata_table.sql
              </p>
            </CardContent>
          </Card>
        ) : (
          seoPages?.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{page.page_path}</span>
                      {page.robots === "index,follow" && (
                        <Badge variant="outline" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Indexed
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {new Date(page.last_updated).toLocaleDateString("id-ID")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Deskripsi:</p>
                  <p className="text-sm">{page.description}</p>
                </div>
                {page.keywords && page.keywords.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {page.keywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {page.semrush_data && (
                  <div>
                    <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
                      Semrush Data Available
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* SEO Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Tips Optimasi SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">1</span>
            </div>
            <div>
              <p className="font-medium">Update Konten Berkala</p>
              <p className="text-sm text-muted-foreground">
                Perbarui metadata SEO setiap bulan berdasarkan data Semrush untuk meningkatkan ranking
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">2</span>
            </div>
            <div>
              <p className="font-medium">Monitor Keyword Performance</p>
              <p className="text-sm text-muted-foreground">
                Gunakan data Semrush untuk mengidentifikasi keyword dengan traffic tinggi
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">3</span>
            </div>
            <div>
              <p className="font-medium">Structured Data</p>
              <p className="text-sm text-muted-foreground">
                Semua halaman otomatis memiliki structured data untuk Google Rich Results
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
