import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Clock, CheckCircle, XCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { formatDate, formatRupiah } from "@/lib/utils/format"
import { TransactionActions } from "@/components/transaction-actions"

export const dynamic = "force-dynamic"

async function getTransactions(status?: string) {
  const supabase = await createServerClient()

  if (!supabase) {
    return []
  }

  let query = supabase
    .from("transactions")
    .select(`
      *,
      users (full_name, email)
    `)
    .order("created_at", { ascending: false })

  if (status) {
    query = query.eq("status", status)
  }

  const { data } = await query
  return data || []
}

export default async function AdminTransaksiPage() {
  const [allTx, pendingTx, completedTx, failedTx] = await Promise.all([
    getTransactions(),
    getTransactions("pending"),
    getTransactions("completed"),
    getTransactions("failed"),
  ])

  const statusConfig = {
    pending: { label: "Menunggu", color: "bg-amber-100 text-amber-700", icon: Clock },
    completed: { label: "Selesai", color: "bg-green-100 text-green-700", icon: CheckCircle },
    failed: { label: "Gagal", color: "bg-red-100 text-red-700", icon: XCircle },
    cancelled: { label: "Dibatalkan", color: "bg-gray-100 text-gray-700", icon: XCircle },
  }

  const typeConfig = {
    deposit: { label: "Deposit", icon: ArrowDownLeft, color: "text-green-600" },
    withdrawal: { label: "Withdrawal", icon: ArrowUpRight, color: "text-red-600" },
    kyc_bonus: { label: "Bonus KYC", icon: CheckCircle, color: "text-blue-600" },
    bid: { label: "Bid", icon: CreditCard, color: "text-purple-600" },
    purchase: { label: "Pembelian", icon: CreditCard, color: "text-primary" },
    refund: { label: "Refund", icon: ArrowDownLeft, color: "text-amber-600" },
  }

  const TransactionTable = ({ data }: { data: any[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Tipe</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Metode</TableHead>
          <TableHead>Referensi</TableHead>
          <TableHead>Rekening</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
              Tidak ada transaksi
            </TableCell>
          </TableRow>
        ) : (
          data.map((tx) => {
            const status = statusConfig[tx.status as keyof typeof statusConfig]
            const type = typeConfig[tx.type as keyof typeof typeConfig]
            return (
              <TableRow key={tx.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{tx.users?.full_name || "-"}</p>
                    <p className="text-sm text-muted-foreground">{tx.users?.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <type.icon className={`h-4 w-4 ${type.color}`} />
                    <span>{type.label}</span>
                  </div>
                </TableCell>
                <TableCell
                  className={`font-semibold ${
                    tx.type === "deposit" || tx.type === "kyc_bonus" || tx.type === "refund"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.type === "deposit" || tx.type === "kyc_bonus" || tx.type === "refund" ? "+" : "-"}
                  {formatRupiah(tx.amount)}
                </TableCell>
                <TableCell>{tx.payment_method || "-"}</TableCell>
                <TableCell className="font-mono text-sm">{tx.reference_number || "-"}</TableCell>
                <TableCell>
                  {tx.bank_account_name && (
                    <div className="text-sm">
                      <p className="font-medium">{tx.bank_account_name}</p>
                      <p className="text-muted-foreground">{tx.bank_account_number}</p>
                    </div>
                  )}
                </TableCell>
                <TableCell>{formatDate(tx.created_at)}</TableCell>
                <TableCell>
                  <Badge className={status.color}>
                    <status.icon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {tx.status === "pending" && (
                    <TransactionActions
                      transactionId={tx.id}
                      userId={tx.user_id}
                      amount={tx.amount}
                      type={tx.type}
                      paymentProof={tx.payment_proof_url}
                    />
                  )}
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kelola Transaksi</h1>
        <p className="text-muted-foreground">Kelola deposit, withdrawal, dan transaksi lainnya</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingTx.length}</p>
              <p className="text-sm text-muted-foreground">Menunggu</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedTx.length}</p>
              <p className="text-sm text-muted-foreground">Selesai</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{failedTx.length}</p>
              <p className="text-sm text-muted-foreground">Gagal</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{allTx.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="pending" className="w-full">
            <div className="border-b px-4">
              <TabsList className="h-12 bg-transparent">
                <TabsTrigger
                  value="pending"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Menunggu ({pendingTx.length})
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Selesai ({completedTx.length})
                </TabsTrigger>
                <TabsTrigger
                  value="failed"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Gagal ({failedTx.length})
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Semua ({allTx.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="pending" className="mt-0">
              <TransactionTable data={pendingTx} />
            </TabsContent>
            <TabsContent value="completed" className="mt-0">
              <TransactionTable data={completedTx} />
            </TabsContent>
            <TabsContent value="failed" className="mt-0">
              <TransactionTable data={failedTx} />
            </TabsContent>
            <TabsContent value="all" className="mt-0">
              <TransactionTable data={allTx} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
