"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface CategoryCardProps {
  name: string
  type: "sedan" | "suv" | "mpv" | "hatchback" | "wagon" | "coupe" | "van" | "pickup"
  count: number
  color?: string
  imageUrl?: string
}

const categoryImages = {
  sedan: undefined,
  suv: undefined,
  mpv: undefined,
  hatchback: undefined,
  wagon: undefined,
  coupe: undefined,
  van: undefined,
  pickup: undefined,
}

export function CategoryCard({ name, type, count, color = "#ef4444", imageUrl }: CategoryCardProps) {
  return (
    <Link href={`/lelang?category=${name.toLowerCase()}`}>
      <Card className="glass-card hover:scale-105 transition-all duration-300 border-white/10 overflow-hidden group cursor-pointer relative h-40">
        {imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={`${name} category`}
              width={120}
              height={120}
              className="object-contain w-28 h-28"
              loading="lazy"
              quality={90}
              sizes="120px"
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}
        <CardContent className="relative p-6 text-center h-full flex flex-col items-center justify-end">
          <h3 className="font-bold text-foreground mb-1 text-xl drop-shadow-lg">{name}</h3>
          <p className="text-sm text-gray-100 drop-shadow-lg font-semibold">{count} unit</p>
        </CardContent>
      </Card>
    </Link>
  )
}
