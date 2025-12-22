"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SettingsForm({ settings, category }: { settings: any[]; category: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(
    settings.reduce(
      (acc, s) => {
        acc[s.key] = JSON.parse(s.value)
        return acc
      },
      {} as Record<string, string>,
    ),
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createBrowserClient()

    for (const setting of settings) {
      await supabase
        .from("site_settings")
        .update({
          value: JSON.stringify(values[setting.key]),
          updated_at: new Date().toISOString(),
        })
        .eq("key", setting.key)
    }

    setLoading(false)
    router.refresh()
    alert("Pengaturan berhasil disimpan!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {settings.map((setting) => (
        <div key={setting.key} className="space-y-2">
          <Label htmlFor={setting.key}>
            {setting.key.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
          </Label>
          {setting.key.includes("description") ? (
            <Textarea
              id={setting.key}
              value={values[setting.key] || ""}
              onChange={(e) => setValues({ ...values, [setting.key]: e.target.value })}
              rows={3}
            />
          ) : (
            <Input
              id={setting.key}
              value={values[setting.key] || ""}
              onChange={(e) => setValues({ ...values, [setting.key]: e.target.value })}
            />
          )}
          {setting.description && <p className="text-xs text-muted-foreground">{setting.description}</p>}
        </div>
      ))}
      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  )
}
