"use client"

import { useState } from "react"
import { formatCurrency, formatDateTime } from "@/lib/utils/format"
import { Badge } from "@/components/ui/badge"
import { User, Crown, Clock } from "lucide-react"

interface BidHistoryProps {
  vehicleId: string
}

interface Bid {
  id: string
  user_name: string
  amount: number
  time: string
  is_winning: boolean
}

export function BidHistory({ vehicleId }: BidHistoryProps) {
  // Sample bid history - in production this would come from Supabase real-time
  const [bids, setBids] = useState<Bid[]>([
    {
      id: "1",
      user_name: "B***i S.",
      amount: 168000000,
      time: new Date(Date.now() - 5 * 60000).toISOString(),
      is_winning: true,
    },
    {
      id: "2",
      user_name: "A***d H.",
      amount: 165000000,
      time: new Date(Date.now() - 12 * 60000).toISOString(),
      is_winning: false,
    },
    {
      id: "3",
      user_name: "S***i R.",
      amount: 162000000,
      time: new Date(Date.now() - 25 * 60000).toISOString(),
      is_winning: false,
    },
    {
      id: "4",
      user_name: "D***i L.",
      amount: 160000000,
      time: new Date(Date.now() - 45 * 60000).toISOString(),
      is_winning: false,
    },
    {
      id: "5",
      user_name: "E***o P.",
      amount: 158000000,
      time: new Date(Date.now() - 60 * 60000).toISOString(),
      is_winning: false,
    },
    {
      id: "6",
      user_name: "R***a W.",
      amount: 155000000,
      time: new Date(Date.now() - 90 * 60000).toISOString(),
      is_winning: false,
    },
    {
      id: "7",
      user_name: "J***o K.",
      amount: 153000000,
      time: new Date(Date.now() - 120 * 60000).toISOString(),
      is_winning: false,
    },
    {
      id: "8",
      user_name: "M***a S.",
      amount: 152000000,
      time: new Date(Date.now() - 150 * 60000).toISOString(),
      is_winning: false,
    },
  ])

  return (
    <div className="space-y-3">
      {bids.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Belum ada penawaran</p>
      ) : (
        bids.map((bid, index) => (
          <div
            key={bid.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              bid.is_winning ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  bid.is_winning ? "bg-primary text-white" : "bg-muted-foreground/20"
                }`}
              >
                {bid.is_winning ? <Crown className="w-5 h-5" /> : <User className="w-5 h-5 text-muted-foreground" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{bid.user_name}</span>
                  {bid.is_winning && <Badge className="bg-primary text-white text-xs">Tertinggi</Badge>}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatDateTime(bid.time)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${bid.is_winning ? "text-primary" : ""}`}>{formatCurrency(bid.amount)}</p>
              <p className="text-xs text-muted-foreground">#{bids.length - index}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
