"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const PRESS_LOGOS = [
  {
    name: "Antara News",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2023/02/96821a0116949892d6ec9375777bf1e2_7f4d35bf44506db84b2eb74b969f03b6_compressed.png",
  },
  {
    name: "Berita Satu",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2023/02/07aa42431927fd1d416ea49ea3fc1dd9_6e09e043800716752d1cf06fefd1e848_compressed.png",
  },
  {
    name: "Bisnis.com",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2023/02/f1ac03c0d4c8cf0d7a46e5837e9ad098_a7daff3477459ab5ba3bbe244b098fd2_compressed.png",
  },
  {
    name: "CNBC Indonesia",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2023/02/4f819684efcc7992d99c7ff6fbc7ea23_84eb02428c75cc13f8f61d07f0c755ed_compressed.png",
  },
  {
    name: "Daily Social",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2023/02/560b5c3b7287d81363a7ff0a5735f844_c0397afe194cb54bb63a480618001028_compressed.png",
  },
  {
    name: "Detik",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2023/02/de2985a044ca3394f36d3926bee19232_2d7db41939853144f69f46f4023982a3_compressed.png",
  },
  {
    name: "Fortune Indonesia",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2023/02/5cc265a5ba776f141dadf9cdac8bfc48_3b088b689c45bdbeb8af2ecabc254d0c_compressed.png",
  },
]

export function PressMediaSlider() {
  const [mounted, setMounted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollContent = scrollContainer.querySelector(".scroll-content") as HTMLElement
    if (!scrollContent) return

    // Clone items for seamless infinite scroll using DOM methods
    const originalItems = Array.from(scrollContent.children)
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement
      scrollContent.appendChild(clone)
    })

    let scrollPos = 0
    let animationId: number

    const scroll = () => {
      scrollPos += 0.4
      if (scrollPos >= scrollContent.scrollWidth / 2) {
        scrollPos = 0
      }
      scrollContainer.scrollLeft = scrollPos
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [mounted])

  if (!mounted) {
    return (
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto max-w-7xl">
          <h3 className="text-center text-xs md:text-sm font-semibold text-muted-foreground mb-6 md:mb-8 uppercase tracking-wider">
            Diliput oleh media terkemuka
          </h3>
          <div className="h-12 flex items-center justify-center">
            <div className="text-muted-foreground text-sm">Loading...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h3 className="text-center text-xs md:text-sm font-semibold text-muted-foreground mb-6 md:mb-8 uppercase tracking-wider">
          Diliput oleh media terkemuka
        </h3>

        <div ref={scrollRef} className="overflow-hidden" style={{ scrollBehavior: "auto" }}>
          <div className="scroll-content flex gap-10 md:gap-16 items-center">
            {PRESS_LOGOS.map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 h-8 w-32 md:h-12 md:w-48 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.name}
                  width={192}
                  height={48}
                  className="object-contain w-full h-full"
                  quality={75}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
