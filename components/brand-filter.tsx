import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { CAR_BRANDS } from "@/lib/constants"

export function BrandFilter() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto relative max-w-7xl">
        <h3 className="text-xl font-semibold mb-8 text-center text-foreground">Cari Berdasarkan Merek</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {CAR_BRANDS.slice(0, 12).map((brand) => (
            <Link key={brand} href={`/lelang?brand=${brand}`}>
              <Badge
                variant="outline"
                className="px-5 py-2.5 text-sm glass-button border-white/10 hover:border-primary hover:text-primary cursor-pointer transition-all duration-300"
              >
                {brand}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
