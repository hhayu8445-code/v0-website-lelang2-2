"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Loader2, Eye } from "lucide-react"
import { approveTransaction, rejectTransaction } from "@/lib/actions/admin"
import { formatRupiah } from "@/lib/utils/format"
import Image from "next/image"

interface TransactionActionsProps {
  transactionId: string
  userId: string
  amount: number
  type: string
  paymentProof?: string
}

export function TransactionActions({ transactionId, userId, amount, type, paymentProof }: TransactionActionsProps) {
  const router = useRouter()
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [rejectNotes, setRejectNotes] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showProofDialog, setShowProofDialog] = useState(false)

  const handleApprove = async () => {
    if (!confirm(`Setujui transaksi ${type} sebesar ${formatRupiah(amount)}?`)) return

    setIsApproving(true)
    try {
      const result = await approveTransaction(transactionId, userId, amount, type)
      if (result.success) {
        alert("Transaksi berhasil disetujui")
        router.refresh()
      } else {
        alert(result.error)
      }
    } catch (error) {
      console.error("Error approving transaction:", error)
      alert("Terjadi kesalahan")
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    if (!rejectNotes.trim()) {
      alert("Harap masukkan alasan penolakan")
      return
    }
    setIsRejecting(true)
    try {
      const result = await rejectTransaction(transactionId, userId, rejectNotes)
      if (result.success) {
        alert("Transaksi berhasil ditolak")
        setShowRejectDialog(false)
        router.refresh()
      } else {
        alert(result.error)
      }
    } catch (error) {
      console.error("Error rejecting transaction:", error)
      alert("Terjadi kesalahan")
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <div className="flex justify-end gap-2">
      {paymentProof && (
        <Dialog open={showProofDialog} onOpenChange={setShowProofDialog}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Bukti Pembayaran</DialogTitle>
            </DialogHeader>
            <div className="py-4 relative aspect-video">
              <Image
                src={paymentProof || "/placeholder.svg"}
                alt="Bukti Pembayaran"
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Button
        size="sm"
        variant="outline"
        className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
        onClick={handleApprove}
        disabled={isApproving}
      >
        {isApproving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <CheckCircle className="h-4 w-4 mr-1" />
            Setujui
          </>
        )}
      </Button>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent">
            <XCircle className="h-4 w-4 mr-1" />
            Tolak
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Transaksi</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menolak transaksi ini? ({formatRupiah(amount)})
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Masukkan alasan penolakan..."
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={isRejecting}>
              {isRejecting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Tolak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
