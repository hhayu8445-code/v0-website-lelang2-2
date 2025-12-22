"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { approveKyc, rejectKyc } from "@/lib/actions/admin"

interface KycApprovalFormProps {
  kycId: string
  userId: string
}

export function KycApprovalForm({ kycId, userId }: KycApprovalFormProps) {
  const router = useRouter()
  const [notes, setNotes] = useState("")
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  const handleApprove = async () => {
    setIsApproving(true)
    try {
      const result = await approveKyc(kycId, userId, notes)
      if (result.success) {
        router.refresh()
        router.push("/admin/kyc")
      }
    } catch (error) {
      console.error("Error approving KYC:", error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    if (!notes.trim()) {
      alert("Harap masukkan alasan penolakan")
      return
    }
    setIsRejecting(true)
    try {
      const result = await rejectKyc(kycId, userId, notes)
      if (result.success) {
        router.refresh()
        router.push("/admin/kyc")
      }
    } catch (error) {
      console.error("Error rejecting KYC:", error)
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <div className="border-t pt-6 space-y-4">
      <div>
        <Label htmlFor="notes">Catatan Admin (wajib untuk penolakan)</Label>
        <Textarea
          id="notes"
          placeholder="Masukkan catatan atau alasan penolakan..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2"
          rows={3}
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleApprove}
          disabled={isApproving || isRejecting}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {isApproving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
          Setujui & Berikan Bonus Rp 2.500.000
        </Button>
        <Button onClick={handleReject} disabled={isApproving || isRejecting} variant="destructive" className="flex-1">
          {isRejecting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
          Tolak
        </Button>
      </div>
    </div>
  )
}
