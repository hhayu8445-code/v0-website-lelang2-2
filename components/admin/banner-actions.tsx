"use client"

import { Button } from "@/components/ui/button"
import { Trash2, Eye, EyeOff } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function BannerActions({ bannerId, isActive }: { bannerId: string; isActive: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function toggleActive() {
    setLoading(true)
    const supabase = createBrowserClient()
    await supabase
      .from("site_banners")
      .update({ is_active: !isActive, updated_at: new Date().toISOString() })
      .eq("id", bannerId)
    setLoading(false)
    router.refresh()
  }

  async function deleteBanner() {
    if (!confirm("Yakin ingin menghapus banner ini?")) return

    setLoading(true)
    const supabase = createBrowserClient()
    await supabase.from("site_banners").delete().eq("id", bannerId)
    setLoading(false)
    router.refresh()
  }

  return (
    <>
      <Button size="sm" variant="outline" onClick={toggleActive} disabled={loading}>
        {isActive ? (
          <>
            <EyeOff className="h-3 w-3 mr-1" /> Nonaktifkan
          </>
        ) : (
          <>
            <Eye className="h-3 w-3 mr-1" /> Aktifkan
          </>
        )}
      </Button>
      <Button size="sm" variant="destructive" onClick={deleteBanner} disabled={loading}>
        <Trash2 className="h-3 w-3 mr-1" />
        Hapus
      </Button>
    </>
  )
}
