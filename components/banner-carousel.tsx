"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BannerSlide {
  id: number
  image: string
  link: string
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    image:
      "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=60,width=1920/Consumer/Web_Banner_Pilihan_Cuan_9bd5a3fc11.png",
    link: "https://lelangmobil.com",
  },
  {
    id: 2,
    image:
      "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=60,width=1920/Consumer/Homepage_Go_To_a3b663f01c.jpg",
    link: "https://lelangmobil.com",
  },
  {
    id: 3,
    image:
      "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=60,width=1920/Consumer/Homepage_Trade_in_2025_f0d811486d.jpg",
    link: "https://lelangmobil.com",
  },
  {
    id: 4,
    image:
      "https://b2c-cdn.carsome.id/cdn-cgi/image/format=auto,quality=60,width=1920/Consumer/Homepage_New_Stock_30661da3b5.jpg",
    link: "https://lelangmobil.com",
  },
]

export function BannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isAutoPlay || !mounted) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNER_SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay, mounted])

  const next = () => {
    setIsAutoPlay(false)
    setCurrent((prev) => (prev + 1) % BANNER_SLIDES.length)
  }

  const prev = () => {
    setIsAutoPlay(false)
    setCurrent((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlay(false)
    setCurrent(index)
  }

  const handleImageError = (id: number) => {
    setImageError((prev) => ({ ...prev, [id]: true }))
  }

  if (!mounted) {
    return (
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] bg-muted rounded-xl md:rounded-2xl animate-pulse" />
    )
  }

  const currentImage = imageError[BANNER_SLIDES[current].id]
    ? "/placeholder.svg?height=500&width=1920"
    : BANNER_SLIDES[current].image

  return (
    <div className="relative group w-full">
      <div className="relative h-[200px] sm:h-[250px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl md:rounded-2xl shadow-2xl">
        <Link
          href={BANNER_SLIDES[current].link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={`Banner ${current + 1}`}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority={current === 0}
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1920px"
            onError={() => handleImageError(BANNER_SLIDES[current].id)}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
          />
        </Link>
      </div>

      <Button
        size="icon"
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 hover:bg-white text-black shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 h-8 w-8 md:h-10 md:w-10"
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
      </Button>

      <Button
        size="icon"
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 hover:bg-white text-black shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 h-8 w-8 md:h-10 md:w-10"
      >
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
      </Button>

      <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2 bg-black/30 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full">
        {BANNER_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              idx === current ? "w-6 md:w-8 bg-white shadow-lg" : "w-1.5 md:w-2 bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
