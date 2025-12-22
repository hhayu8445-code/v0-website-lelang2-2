"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatCurrency, formatDateTime } from "@/lib/utils/format"
import { BANKS } from "@/lib/constants"
import { createBrowserClient } from "@/lib/supabase/client"
import { createDepositRequest, createWithdrawalRequest } from "@/lib/actions/wallet"
import { useRouter } from "next/navigation"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  Upload,
  Loader2,
} from "lucide-react"

export default function WalletPage() {
  const router = useRouter()
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [walletBalance, setWalletBalance] = useState(0)
  const [bonusBalance, setBonusBalance] = useState(0)
  const [auctionCount, setAuctionCount] = useState(0)
  const [transactions, setTransactions] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadWalletData()
  }, [])

  async function loadWalletData() {
    const supabase = createBrowserClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data: profile } = await supabase
      .from("users")
      .select("wallet_balance, bonus_balance, auction_participation_count")
      .eq("id", user.id)
      .single()

    if (profile) {
      setWalletBalance(profile.wallet_balance || 0)
      setBonusBalance(profile.bonus_balance || 0)
      setAuctionCount(profile.auction_participation_count || 0)
    }

    const { data: txData } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    setTransactions(txData || [])
  }

  async function handleDepositSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!depositAmount || !selectedBank || !accountName || !accountNumber || !paymentProof) {
      alert("Mohon lengkapi semua data deposit")
      return
    }

    setSubmitting(true)

    try {
      // Upload payment proof
      const supabase = createBrowserClient()
      const fileName = `deposit-proof/${Date.now()}-${paymentProof.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("transactions")
        .upload(fileName, paymentProof)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("transactions").getPublicUrl(fileName)

      // Create deposit request
      const result = await createDepositRequest({
        amount: Number.parseInt(depositAmount),
        payment_method: selectedBank,
        payment_proof_url: publicUrl,
        bank_account_name: accountName,
        bank_account_number: accountNumber,
      })

      if (result.success) {
        alert(result.message)
        setDepositAmount("")
        setSelectedBank("")
        setAccountName("")
        setAccountNumber("")
        setPaymentProof(null)
        loadWalletData()
      } else {
        alert(result.error)
      }
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleWithdrawSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!withdrawAmount || !selectedBank || !accountName || !accountNumber) {
      alert("Mohon lengkapi semua data penarikan")
      return
    }

    setSubmitting(true)

    try {
      const result = await createWithdrawalRequest({
        amount: Number.parseInt(withdrawAmount),
        bank_name: selectedBank,
        bank_account_name: accountName,
        bank_account_number: accountNumber,
      })

      if (result.success) {
        alert(result.message)
        setWithdrawAmount("")
        setSelectedBank("")
        setAccountName("")
        setAccountNumber("")
        loadWalletData()
      } else {
        alert(result.error)
      }
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan")
    } finally {
      setSubmitting(false)
    }
  }

  const quickAmounts = [500000, 1000000, 2000000, 5000000]

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Kelola saldo dan transaksi Anda</p>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary to-red-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <Wallet className="w-5 h-5" />
              <span className="text-sm">Total Saldo</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(walletBalance + bonusBalance)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Saldo Utama</span>
            </div>
            <p className="text-2xl font-bold text-primary">{formatCurrency(walletBalance)}</p>
            <p className="text-xs text-muted-foreground mt-1">Dapat ditarik kapan saja</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <Badge className="bg-secondary text-secondary-foreground">Bonus</Badge>
            </div>
            <p className="text-2xl font-bold text-secondary">{formatCurrency(bonusBalance)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {auctionCount === 0 ? "Ikuti 1x lelang untuk withdraw" : "Dapat ditarik"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Deposit / Withdrawal Tabs */}
      <Card>
        <Tabs defaultValue="deposit">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deposit" className="gap-2">
                <ArrowDownLeft className="w-4 h-4" />
                Isi Saldo
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="gap-2">
                <ArrowUpRight className="w-4 h-4" />
                Tarik Saldo
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="deposit" className="space-y-6 mt-0">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Deposit akan diproses setelah admin memverifikasi bukti pembayaran Anda (maksimal 1x24 jam)
                </AlertDescription>
              </Alert>

              <form onSubmit={handleDepositSubmit} className="space-y-6">
                {/* Amount Input */}
                <div className="space-y-3">
                  <Label>Jumlah Deposit</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                    <Input
                      type="number"
                      placeholder="0"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="pl-10 text-lg h-12"
                      required
                      min={50000}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setDepositAmount(amount.toString())}
                      >
                        {formatCurrency(amount)}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Minimal deposit: Rp 50.000</p>
                </div>

                {/* Bank Selection */}
                <div className="space-y-3">
                  <Label>Pilih Bank Tujuan Transfer</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {BANKS.slice(0, 8).map((bank) => (
                      <Button
                        key={bank.id}
                        type="button"
                        variant={selectedBank === bank.id ? "default" : "outline"}
                        className="h-auto py-3 flex flex-col gap-1"
                        onClick={() => setSelectedBank(bank.id)}
                      >
                        <span className="text-xs font-semibold">{bank.name}</span>
                      </Button>
                    ))}
                  </div>
                  {selectedBank && (
                    <Alert>
                      <AlertDescription className="text-sm">
                        Transfer ke: <strong>{selectedBank.toUpperCase()}</strong>
                        <br />
                        No. Rek: <strong>1234567890</strong>
                        <br />
                        a.n. <strong>PT BALAI LELANG MOBIL</strong>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Account Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nama Rekening Pengirim</Label>
                    <Input
                      placeholder="Nama sesuai rekening"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nomor Rekening Pengirim</Label>
                    <Input
                      placeholder="1234567890"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Payment Proof */}
                <div className="space-y-2">
                  <Label>Upload Bukti Transfer</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                      className="max-w-xs mx-auto"
                      required
                    />
                    {paymentProof && (
                      <p className="text-sm text-muted-foreground mt-2">File terpilih: {paymentProof.name}</p>
                    )}
                  </div>
                </div>

                <Button className="w-full h-12" type="submit" disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Kirim Permintaan Deposit
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="withdraw" className="space-y-6 mt-0">
              {auctionCount === 0 && bonusBalance > 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Bonus KYC ({formatCurrency(bonusBalance)}) belum bisa ditarik. Ikuti minimal 1 lelang terlebih
                    dahulu.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleWithdrawSubmit} className="space-y-6">
                {/* Amount Input */}
                <div className="space-y-3">
                  <Label>Jumlah Penarikan</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                    <Input
                      type="number"
                      placeholder="0"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="pl-10 text-lg h-12"
                      required
                      min={50000}
                      max={auctionCount > 0 ? walletBalance + bonusBalance : walletBalance}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Maksimum: {formatCurrency(auctionCount > 0 ? walletBalance + bonusBalance : walletBalance)}
                  </p>
                </div>

                {/* Bank Selection */}
                <div className="space-y-3">
                  <Label>Pilih Bank Tujuan</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {BANKS.slice(0, 8).map((bank) => (
                      <Button
                        key={bank.id}
                        type="button"
                        variant={selectedBank === bank.id ? "default" : "outline"}
                        className="h-auto py-3 flex flex-col gap-1"
                        onClick={() => setSelectedBank(bank.id)}
                      >
                        <span className="text-xs font-semibold">{bank.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Account Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nama Pemilik Rekening</Label>
                    <Input
                      placeholder="Nama sesuai rekening"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nomor Rekening</Label>
                    <Input
                      placeholder="1234567890"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button className="w-full h-12" type="submit" disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Ajukan Penarikan
                </Button>
              </form>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>Semua aktivitas transaksi Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">Belum ada transaksi</p>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        tx.type === "deposit" || tx.type === "kyc_bonus"
                          ? "bg-emerald-100 text-emerald-600"
                          : tx.type === "withdrawal"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {tx.type === "deposit" || tx.type === "kyc_bonus" ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {tx.type === "deposit"
                          ? "Deposit"
                          : tx.type === "kyc_bonus"
                            ? "Bonus KYC"
                            : tx.type === "withdrawal"
                              ? "Penarikan"
                              : "Bid Hold"}
                      </p>
                      <p className="text-sm text-muted-foreground">{tx.payment_method || "-"}</p>
                      <p className="text-xs text-muted-foreground">{tx.reference_number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${tx.type === "deposit" || tx.type === "kyc_bonus" ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {tx.type === "deposit" || tx.type === "kyc_bonus" ? "+" : "-"}
                      {formatCurrency(Math.abs(tx.amount))}
                    </p>
                    <div className="flex items-center gap-1 text-xs">
                      {tx.status === "completed" ? (
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Selesai
                        </Badge>
                      ) : tx.status === "pending" ? (
                        <Badge className="bg-amber-100 text-amber-700 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          <XCircle className="w-3 h-3 mr-1" />
                          Ditolak
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{formatDateTime(tx.created_at)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
