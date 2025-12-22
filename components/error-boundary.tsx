"use client"

import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("[v0] ErrorBoundary caught:", error, errorInfo)

    // Send error to monitoring system
    if (typeof window !== "undefined") {
      fetch("/api/monitor-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
        }),
      }).catch(() => {
        // Silently fail if monitoring endpoint is unavailable
      })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex items-center justify-center min-h-[400px] p-6">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold">Terjadi Kesalahan</h2>
            <p className="text-muted-foreground">
              Maaf, terjadi kesalahan saat memuat konten. Tim kami telah diberitahu dan sedang memperbaikinya.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => this.setState({ hasError: false })} variant="outline">
                Coba Lagi
              </Button>
              <Button onClick={() => window.location.reload()}>Muat Ulang Halaman</Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
