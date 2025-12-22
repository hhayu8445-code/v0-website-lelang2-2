import { getBanners } from "@/lib/actions/banners"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export async function DynamicBanner({ position }: { position: string }) {
  const banners = await getBanners(position)

  if (!banners || banners.length === 0) return null

  return (
    <div className="space-y-6">
      {banners.map((banner) => (
        <div key={banner.id} className="relative rounded-3xl overflow-hidden glass-card border-primary/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent z-10" />

          <div className="relative h-[200px] sm:h-[300px] md:h-[400px]">
            <Image
              src={banner.image_url || "/placeholder.svg?height=400&width=1200"}
              alt={banner.title}
              fill
              className="object-cover"
              loading="lazy"
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-8 md:px-16">
            <div className="max-w-2xl space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl">
                {banner.title}
              </h2>
              {banner.description && (
                <p className="text-sm sm:text-lg md:text-xl text-white/90 drop-shadow-lg">{banner.description}</p>
              )}
              {banner.link_url && (
                <Link href={banner.link_url}>
                  <Button size="lg" className="mt-2 sm:mt-4 h-10 sm:h-12 text-sm sm:text-base">
                    Lihat Selengkapnya
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
