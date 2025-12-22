"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function VehicleBrands() {
  const brands = [
    {
      name: "Toyota",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota.svg",
    },
    {
      name: "Honda",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg",
    },
    {
      name: "Suzuki",
      logo: "https://images.seeklogo.com/logo-png/13/2/suzuki-logo-png_seeklogo-134277.png",
    },
    {
      name: "Daihatsu",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Daihatsu_motor_co_logo.png",
    },
    {
      name: "Mitsubishi",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcUtsgsKUhPEyUN8nE1jcqmw0qK69f8Qsjkg&s",
    },
    {
      name: "Nissan",
      logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_r7DgDjkX-oZvqk-zUzkEt7LiJFZOVJ5sOyu86D3AjHU3hhoeS6Td_zYtwSVrCkzEU2xgcfypymchzPdcLpb69mFghDsT38i_quDPPTgj8rbxM4GyWJ5KQmhDNjEnM-BMgnRcdRAgrn0oDnng1ADtAQvUufRlmnIKrImY4xby5hPUEggPZtrf7w/w320-h297/NISSAN-(Koleksilogo.com)%20(1).png",
    },
    {
      name: "Mazda",
      logo: "https://images.seeklogo.com/logo-png/8/2/mazda-logo-png_seeklogo-89735.png",
    },
    {
      name: "Isuzu",
      logo: "https://cdn.worldvectorlogo.com/logos/isuzu-2.svg",
    },
    {
      name: "Wuling",
      logo: "https://images.seeklogo.com/logo-png/38/2/wuling-logo-png_seeklogo-383139.png",
    },
    {
      name: "Hyundai",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png",
    },
    {
      name: "KIA",
      logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrrwKuFOKztwl5Jl8YVL-kwmtbdEeH_JQp0aI-zcsm_YWefXhc3pokTrVJaAXy5hknNICjd9Bs2IOt3Rg3W7xv6CYe5F3NZ5eUVoZWlSC6OPtuVBXgW9GMZdyF_WVz2d5b4YCFhC72_j19RKJrZawmSfOuYHRkKPerirw3oAnTKyTPHNVOY-kSSw/w320-h161/KIA-(Koleksilogo.com).png",
    },
    {
      name: "BMW",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    },
    {
      name: "Mercedes-Benz",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    },
    {
      name: "Audi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg",
    },
    {
      name: "Volkswagen",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg",
    },
    {
      name: "Ford",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
    },
    {
      name: "Chevrolet",
      logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdmqV7qMbLG4fvM23TAkgsdXrcru6cjn6A1nndN2G8fbdcqAmr-Axk-R27niHXuxelpFVYOtyubaa-WEEI_Nhy4x0wSb4ciO8UYcP04PEJ3Yj0j91Jf-yO63ZXopv2AHmCraSs6YiVCycXS0-42utGgWJGQwOW8TuUQeyVLCi5O9IAfm67lDr_cQ/w320-h196/CHEVROLET-(Koleksilogo.com)%20(1).png",
    },
    {
      name: "Lexus",
      logo: "https://pngimg.com/d/lexus_PNG61.png",
    },
    {
      name: "Volvo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Volvo_logo.svg/2560px-Volvo_logo.svg.png",
    },
    {
      name: "Land Rover",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/LandRover.svg/2560px-LandRover.svg.png",
    },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto relative space-y-8 max-w-7xl">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">
            Semua Merek <span className="text-primary">Kendaraan</span>
          </h3>
          <p className="text-muted-foreground">Lelang mobil dari berbagai brand ternama</p>
        </div>

        <div className="relative">
          {/* Scrolling animation */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 py-4"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 glass-card p-4 rounded-xl grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer hover:glow-primary"
                >
                  <div className="relative h-12 w-24">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
