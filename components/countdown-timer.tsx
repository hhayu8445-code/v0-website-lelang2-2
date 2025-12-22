"use client"

import { useEffect, useState } from "react"
import { getTimeRemaining } from "@/lib/utils/format"

interface CountdownTimerProps {
  endTime: string
  onComplete?: () => void
  size?: "sm" | "md" | "lg"
}

export function CountdownTimer({ endTime, onComplete, size = "md" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(endTime)
      setTimeLeft(remaining)

      if (remaining.total <= 0) {
        clearInterval(timer)
        onComplete?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onComplete])

  if (timeLeft.total <= 0) {
    return <div className="text-red-500 font-bold animate-pulse">Lelang Berakhir</div>
  }

  const isUrgent = timeLeft.total < 60 * 60 * 1000 // Less than 1 hour

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  }

  const boxClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
  }

  return (
    <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
      <span className="text-white/80 mr-1">Berakhir dalam:</span>
      <div className="flex gap-1">
        {timeLeft.days > 0 && (
          <>
            <div
              className={`${boxClasses[size]} bg-white/20 backdrop-blur rounded flex flex-col items-center justify-center ${isUrgent ? "animate-countdown" : ""}`}
            >
              <span className="font-bold text-white">{timeLeft.days}</span>
              <span className="text-[8px] text-white/70">Hari</span>
            </div>
            <span className="text-white font-bold">:</span>
          </>
        )}
        <div
          className={`${boxClasses[size]} bg-white/20 backdrop-blur rounded flex flex-col items-center justify-center ${isUrgent ? "bg-red-600/80 animate-countdown" : ""}`}
        >
          <span className="font-bold text-white">{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="text-[8px] text-white/70">Jam</span>
        </div>
        <span className="text-white font-bold">:</span>
        <div
          className={`${boxClasses[size]} bg-white/20 backdrop-blur rounded flex flex-col items-center justify-center ${isUrgent ? "bg-red-600/80 animate-countdown" : ""}`}
        >
          <span className="font-bold text-white">{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="text-[8px] text-white/70">Menit</span>
        </div>
        <span className="text-white font-bold">:</span>
        <div
          className={`${boxClasses[size]} bg-white/20 backdrop-blur rounded flex flex-col items-center justify-center ${isUrgent ? "bg-red-600/80 animate-pulse" : ""}`}
        >
          <span className="font-bold text-white">{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="text-[8px] text-white/70">Detik</span>
        </div>
      </div>
    </div>
  )
}
