"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, CheckCircle2 } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  vehicle: string
  avatar: string
}

interface TestimonialSliderProps {
  testimonials: readonly Testimonial[] | Testimonial[]
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const goToPrevious = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlay(false)
    setCurrentIndex(index)
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Tidak ada testimoni tersedia saat ini.</p>
      </div>
    )
  }

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <div className="relative">
      {/* Desktop: Show 3 cards in a row */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {visibleTestimonials.map((testimonial, idx) => (
          <TestimonialCard key={`${testimonial.id}-${idx}`} testimonial={testimonial} />
        ))}
      </div>

      {/* Mobile: Show 1 card */}
      <div className="md:hidden">
        <TestimonialCard testimonial={visibleTestimonials[0]} />
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          onClick={goToPrevious}
          size="icon"
          variant="outline"
          className="rounded-full bg-white hover:bg-gray-100 text-black border-gray-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Dots indicator - show first 10 only */}
        <div className="flex gap-2">
          {testimonials.slice(0, Math.min(10, testimonials.length)).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex % testimonials.length ? "w-8 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          {testimonials.length > 10 && (
            <span className="text-xs text-muted-foreground self-center ml-2">+{testimonials.length - 10}</span>
          )}
        </div>

        <Button
          onClick={goToNext}
          size="icon"
          variant="outline"
          className="rounded-full bg-white hover:bg-gray-100 text-black border-gray-300"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Counter */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        {currentIndex + 1} / {testimonials.length} Testimoni
      </p>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full bg-white hover:shadow-xl transition-all duration-300 border border-gray-200">
      <CardContent className="p-6 space-y-4">
        {/* Quote icon - Midtrans style */}
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Comment */}
        <p className="text-gray-700 leading-relaxed text-sm min-h-[4rem]">"{testimonial.comment}"</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>

        {/* User info */}
        <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 flex-shrink-0">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900 text-sm truncate">{testimonial.name}</p>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            </div>
            <p className="text-xs text-gray-500 truncate">{testimonial.location}</p>
            <p className="text-xs text-gray-600 mt-1 truncate">Membeli: {testimonial.vehicle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
