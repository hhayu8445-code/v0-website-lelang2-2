import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut, LayoutDashboard, Shield } from "lucide-react"
import { getCurrentUser, signOut } from "@/lib/actions/auth"
import { MobileNav } from "@/components/mobile-nav"
import Image from "next/image"

export async function Header() {
  const user = await getCurrentUser()
  const isAdmin = user && (user.is_admin === true || user.role === 'admin')

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/10">
      <div className="container flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold group">
          <div className="relative w-40 h-10 sm:w-52 sm:h-13 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="LELANGMOBIL"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 160px, 208px"
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {[
            { href: "/lelang", label: "Lelang Aktif" },
            { href: "/tentang", label: "Tentang Kami" },
            { href: "/faq", label: "FAQ" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              {isAdmin && (
                <Link href="/admin">
                  <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg h-9 sm:h-10">
                    <Shield className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Admin Panel</span>
                  </Button>
                </Link>
              )}
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="glass-button hidden sm:flex bg-transparent h-9 sm:h-10">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <form action={signOut}>
                <Button
                  variant="ghost"
                  size="sm"
                  type="submit"
                  className="text-muted-foreground hover:text-foreground h-9 sm:h-10"
                >
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Keluar</span>
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hidden sm:flex h-9 sm:h-10"
                >
                  <User className="h-4 w-4 mr-2" />
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-red-700 hover:from-primary/90 hover:to-red-700/90 shadow-lg glow-primary h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4"
                >
                  <span className="hidden xs:inline">Daftar Sekarang</span>
                  <span className="xs:hidden">Daftar</span>
                </Button>
              </Link>
            </>
          )}

          <MobileNav isLoggedIn={!!user} isAdmin={isAdmin || false} />
        </div>
      </div>
    </header>
  )
}
