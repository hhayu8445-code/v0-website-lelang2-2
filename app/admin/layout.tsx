"use client"

import type React from "react"
import { useState, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  Users,
  Car,
  CreditCard,
  FileCheck,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ImageIcon,
  FileText,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@/lib/supabase/client"

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/kyc", label: "Verifikasi KYC", icon: FileCheck },
  { href: "/admin/lelang", label: "Kelola Lelang", icon: Car },
  { href: "/admin/users", label: "Pengguna", icon: Users },
  { href: "/admin/transaksi", label: "Transaksi", icon: CreditCard },
  { href: "/admin/cms/banners", label: "Banner & Iklan", icon: ImageIcon },
  { href: "/admin/cms/settings", label: "Pengaturan Website", icon: FileText },
  { href: "/admin/seo", label: "SEO & Semrush", icon: TrendingUp },
  { href: "/admin/notifikasi", label: "Notifikasi", icon: Bell },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = useCallback(async () => {
    try {
      const supabase = createBrowserClient()
      await supabase.auth.signOut()
    } catch (error) {
      // Ignore logout errors
    }
    router.push("/login")
  }, [router])

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b z-50 flex items-center justify-between px-4">
        <Link href="/admin" className="flex items-center">
          <div className="relative w-28 h-7">
            <Image src="/logo.png" alt="LELANGMOBIL Admin" fill className="object-contain" sizes="112px" />
          </div>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-card border-r z-40 transform transition-transform duration-200
        lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-16 flex items-center px-6 border-b gap-2">
          <Link href="/admin" className="flex items-center">
            <div className="relative w-28 h-7">
              <Image src="/logo.png" alt="LELANGMOBIL" fill className="object-contain" sizes="112px" />
            </div>
          </Link>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Admin</span>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
