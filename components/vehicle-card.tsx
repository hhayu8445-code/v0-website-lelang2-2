"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Gauge, Users, Eye } from "lucide-react"
import { formatCurrency, formatNumber } from "@/lib/utils/format"
import { CountdownTimer } from "@/components/countdown-timer"
import { useState } from "react"

interface VehicleCardProps {
  vehicle: {
    id: string
    brand: string
    model: string
    year: number
    mileage?: number
    transmission?: string
    fuel_type?: string
    color?: string
    starting_price: number
    current_bid?: number
    condition?: string
    location: string
    auction_status: string
    auction_end_time?: string
    auction_start_time?: string
    bid_count: number
    view_count: number
    images?: readonly string[] | string[]
    image_urls?: readonly string[] | string[]
  }
  priority?: boolean
}

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const isLive = vehicle.auction_status === "live"
  const isUpcoming = vehicle.auction_status === "upcoming"
  const displayPrice = vehicle.current_bid || vehicle.starting_price
  const [imageError, setImageError] = useState(false)

  const vehicleImages = vehicle.image_urls || vehicle.images || []
  const firstImage = Array.isArray(vehicleImages) && vehicleImages.length > 0 ? vehicleImages[0] : null
  const placeholderImage = `/placeholder.svg?height=300&width=400`
  const vehicleImage = imageError || !firstImage ? placeholderImage : firstImage

  return (
    <Card className="group overflow-hidden glass-card card-3d hover:glow-primary transition-all duration-500 border-white/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={vehicleImage || "/placeholder.svg"}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImageError(true)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

        {/* Status Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1.5">
          {isLive && (
            <Badge className="bg-primary text-white animate-pulse-glow border-0 text-[10px] sm:text-xs px-2 py-0.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-ping" />
              LIVE
            </Badge>
          )}
          {isUpcoming && (
            <Badge className="bg-secondary text-secondary-foreground border-0 text-[10px] sm:text-xs px-2 py-0.5">
              <Clock className="w-3 h-3 mr-1" />
              Segera
            </Badge>
          )}
          {vehicle.condition === "Excellent" && (
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-0 text-[10px] sm:text-xs px-2 py-0.5">
              Premium
            </Badge>
          )}
        </div>

        {/* View Count */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 glass px-2 py-1 rounded-full flex items-center gap-1 text-[10px] sm:text-xs text-white">
          <Eye className="w-3 h-3" />
          {formatNumber(vehicle.view_count)}
        </div>

        {/* Countdown Timer */}
        {isLive && vehicle.auction_end_time && (
          <div className="absolute bottom-0 left-0 right-0 glass p-2">
            <CountdownTimer endTime={vehicle.auction_end_time} size="sm" />
          </div>
        )}
      </div>

      <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Title */}
        <div>
          <h3 className="font-bold text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-xs text-muted-foreground">{vehicle.year}</p>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-1">
          {vehicle.mileage && (
            <span className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground glass px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              <Gauge className="w-3 h-3" />
              {formatNumber(vehicle.mileage)} km
            </span>
          )}
          {vehicle.transmission && (
            <span className="text-[10px] sm:text-xs glass px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-muted-foreground">
              {vehicle.transmission}
            </span>
          )}
          {vehicle.fuel_type && (
            <span className="text-[10px] sm:text-xs glass px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-muted-foreground">
              {vehicle.fuel_type}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 text-primary shrink-0" />
          <span className="truncate">{vehicle.location}</span>
        </div>

        {/* Price & Bids */}
        <div className="pt-2 sm:pt-3 border-t border-white/10">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">
                {vehicle.current_bid ? "Bid Tertinggi" : "Harga Awal"}
              </p>
              <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
                {formatCurrency(displayPrice)}
              </p>
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground glass px-2 py-1 rounded-full">
                <Users className="w-3 h-3" />
                {vehicle.bid_count} bid
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/lelang/${vehicle.id}`} className="block">
          <Button
            className={`w-full h-9 sm:h-10 text-xs sm:text-sm ${
              isLive
                ? "bg-gradient-to-r from-primary to-red-700 hover:from-primary/90 hover:to-red-700/90 shadow-lg"
                : "glass-button"
            }`}
          >
            {isLive ? "Ikuti Lelang" : isUpcoming ? "Lihat Detail" : "Detail"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
