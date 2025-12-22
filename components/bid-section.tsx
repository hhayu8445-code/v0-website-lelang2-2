"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils/format"
import { MIN_BID_INCREMENT } from "@/lib/constants"
import { CountdownTimer } from "@/components/countdown-timer"
import { Gavel, Plus, AlertCircle, TrendingUp, Loader2 } from "lucide-react"

interface BidSectionProps {
  vehicle: {
    id: string
    brand: string
    model: string
    starting_price: number
    current_bid?: number
    buy_now_price?: number
    auction_status: string
    auction_end_time?: string
    bid_count: number
  }
}

export function BidSection({ vehicle }: BidSectionProps) {
  const router = useRouter()
  const [bidAmount, setBidAmount] = useState((vehicle.current_bid || vehicle.starting_price) + MIN_BID_INCREMENT)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const currentPrice = vehicle.current_bid || vehicle.starting_price
  const minBid = currentPrice + MIN_BID_INCREMENT
  const isLive = vehicle.auction_status === "live"

  const quickBidAmounts = [
    { label: "+100rb", amount: 100000 },
    { label: "+500rb", amount: 500000 },
    { label: "+1jt", amount: 1000000 },
    { label: "+5jt", amount: 5000000 },
  ]

  async function handlePlaceBid() {
    if (bidAmount < minBid) {
      setError(`Bid minimum adalah ${formatCurrency(minBid)}`)
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate bid placement - in production this would call a server action
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo, redirect to login if not authenticated
    router.push(`/login?redirect=/lelang/${vehicle.id}`)
    setIsLoading(false)
  }

  function handleQuickBid(amount: number) {
    setBidAmount(currentPrice + amount)
  }

  if (!isLive) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Badge variant="secondary" className="mb-4">
            {vehicle.auction_status === "upcoming" ? "Akan Datang" : "Lelang Berakhir"}
          </Badge>
          <p className="text-muted-foreground">
            {vehicle.auction_status === "upcoming"
              ? "Lelang akan segera dimulai. Pantau terus!"
              : "Lelang telah berakhir untuk kendaraan ini."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pasang Bid</CardTitle>
          <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Countdown */}
        {vehicle.auction_end_time && (
          <div className="bg-slate-900 rounded-lg p-4">
            <CountdownTimer endTime={vehicle.auction_end_time} size="md" />
          </div>
        )}

        {/* Current Bid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Bid Tertinggi Saat Ini</span>
            <span className="flex items-center gap-1 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              {vehicle.bid_count} penawaran
            </span>
          </div>
          <p className="text-3xl font-bold text-primary">{formatCurrency(currentPrice)}</p>
        </div>

        {/* Bid Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Jumlah Bid Anda</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
            <Input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="pl-10 text-lg font-semibold h-12"
              min={minBid}
              step={MIN_BID_INCREMENT}
            />
          </div>
          <p className="text-xs text-muted-foreground">Minimum bid: {formatCurrency(minBid)}</p>
        </div>

        {/* Quick Bid Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {quickBidAmounts.map((item) => (
            <Button
              key={item.label}
              variant="outline"
              size="sm"
              onClick={() => handleQuickBid(item.amount)}
              className="text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Place Bid Button */}
        <Button className="w-full h-12 text-lg" onClick={handlePlaceBid} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Gavel className="w-5 h-5 mr-2" />
              Pasang Bid {formatCurrency(bidAmount)}
            </>
          )}
        </Button>

        {/* Buy Now */}
        {vehicle.buy_now_price && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center mb-3">atau beli langsung</p>
            <Button variant="secondary" className="w-full h-12">
              Beli Sekarang {formatCurrency(vehicle.buy_now_price)}
            </Button>
          </div>
        )}

        {/* Info */}
        <div className="pt-4 border-t space-y-2 text-xs text-muted-foreground">
          <p>* Anda harus login dan verifikasi KYC untuk memasang bid</p>
          <p>* Bid yang sudah dipasang tidak dapat dibatalkan</p>
          <p>* Saldo akan di-hold sesuai jumlah bid</p>
        </div>
      </CardContent>
    </Card>
  )
}
