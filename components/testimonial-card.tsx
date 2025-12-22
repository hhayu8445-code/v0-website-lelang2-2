"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, CheckCircle2 } from "lucide-react"

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    location: string
    rating: number
    comment: string
    vehicle: string
    avatar: string
  }
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full glass-card card-3d hover:glow-primary transition-all duration-500 border-white/10 overflow-hidden group">
      <CardContent className="p-6 space-y-5">
        {/* Quote icon */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Comment */}
        <p className="text-muted-foreground leading-relaxed text-sm">"{testimonial.comment}"</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? "fill-secondary text-secondary" : "text-muted"}`}
            />
          ))}
        </div>

        {/* User info */}
        <div className="pt-5 border-t border-white/10 flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur opacity-50" />
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20">
              <Image
                src={testimonial.avatar || "/placeholder.svg?height=48&width=48&query=person avatar"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
          </div>
        </div>

        {/* Vehicle purchased */}
        <div className="glass rounded-xl px-4 py-3">
          <p className="text-xs text-muted-foreground mb-1">Membeli:</p>
          <p className="text-sm font-medium text-foreground">{testimonial.vehicle}</p>
        </div>
      </CardContent>
    </Card>
  )
}
