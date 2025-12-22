"use client"

import { useState, useEffect } from "react"
import { Car } from "lucide-react"

export function Hero3D() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!mounted) {
    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Background with gradient instead of missing image */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -10}px) scale(1.1)`,
        }}
      >
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <div
          className="relative transition-transform duration-500 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * -3}deg) rotateY(${mousePosition.x * 3}deg) scale(1.5)`,
          }}
        >
          <div className="w-[400px] h-[300px] flex items-center justify-center">
            <Car className="w-64 h-64 text-primary/50" strokeWidth={0.5} />
          </div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Shine effect */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute h-full w-1/4 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent blur-xl transition-transform duration-700"
          style={{
            transform: `translateX(${(mousePosition.x + 1) * 150}%)`,
          }}
        />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Corner glow accents with gold tint */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </div>
  )
}
