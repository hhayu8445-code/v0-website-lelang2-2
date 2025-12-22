"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const CLIENT_LOGOS = [
  {
    name: "Tiket.com",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/f1dad0570f17f35e6f87c178f7c05685_7ecc36226bcc9d4db5097f27058146be.png",
  },
  {
    name: "Traveloka",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/9bdc9d8107c2fe8926a1b3df4f03511d_7ecc36226bcc9d4db5097f27058146be.png",
  },
  {
    name: "Pluang",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/21ab907179ac0ee90bff2b9f70f208af_b510f00da2d2a96c9eff946549d7bbdf.png",
  },
  {
    name: "TikTok",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/2cd53ad2f1d8fb223e270f0c85850697_b510f00da2d2a96c9eff946549d7bbdf.png",
  },
  {
    name: "Ciputra",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/44e0d4f55bb6089a01e7e65430812bcc_1a65563dadffb681558aa17535c05a0f.png",
  },
  {
    name: "Astro",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/0f3ada1ddfef290fe6121ecc1d22377d_1a65563dadffb681558aa17535c05a0f.png",
  },
  {
    name: "Flip",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/542ad2b8419af4dafc9e39cc99693ae0_b510f00da2d2a96c9eff946549d7bbdf.png",
  },
  {
    name: "Pintu",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/b121222f7444a1b7ada1e7fc6501d9de_b510f00da2d2a96c9eff946549d7bbdf.png",
  },
  {
    name: "Ruang Guru",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/1553c055508779e6aadf2255b8bd99e6_1a65563dadffb681558aa17535c05a0f.png",
  },
  {
    name: "Bukalapak",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/c19bc96bd03bb5bc3e34689afe406a54_1a65563dadffb681558aa17535c05a0f.png",
  },
  {
    name: "Tokopedia",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/37bbacee2e93747e150f74b22e0de9d7_508160f1e6b2f34cd8d325c4b9904808.png",
  },
  {
    name: "Sociolla",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/b7b6f7feeec8186c1fdfe16fd6ce39e4_cb1519c0f6d688dabc42789c547e4df4.png",
  },
  {
    name: "SIRCLO",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/bae9617058615323d31c840e311686b7_32c7c8cde8c78133184f9b48f6dcbe48.png",
  },
  {
    name: "Bibit",
    src: "https://midtrans-website.al-mp-id-p.cdn.gtflabs.io/uploads/2024/07/999b42b3ea10e4af12341566aa08251a_ca65820af5e5c898e79c98fe302ca069.png",
  },
]

export function ClientLogosSlider() {
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

    // Clone items for infinite scroll using DOM methods
    const originalItems = Array.from(scrollContent.children)
    originalItems.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement
      scrollContent.appendChild(clone)
    })

    let scrollPos = 0
    let animationId: number

    const scroll = () => {
      scrollPos += 0.5
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
      <section className="py-8 md:py-12 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h3 className="text-center text-xs md:text-sm font-semibold text-muted-foreground mb-6 md:mb-8 uppercase tracking-wider">
            Dipercaya oleh perusahaan terkemuka
          </h3>
          <div className="h-12 flex items-center justify-center">
            <div className="text-muted-foreground text-sm">Loading...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <h3 className="text-center text-xs md:text-sm font-semibold text-muted-foreground mb-6 md:mb-8 uppercase tracking-wider">
          Dipercaya oleh perusahaan terkemuka
        </h3>

        <div ref={scrollRef} className="overflow-hidden" style={{ scrollBehavior: "auto" }}>
          <div className="scroll-content flex gap-8 md:gap-12 items-center">
            {CLIENT_LOGOS.map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 h-8 w-28 md:h-12 md:w-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.name}
                  width={160}
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
