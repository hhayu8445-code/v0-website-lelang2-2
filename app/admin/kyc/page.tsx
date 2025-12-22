import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { formatDate } from "@/lib/utils/format"

export const dynamic = "force-dynamic"

async function getKycSubmissions(status?: string) {
  const supabase = await createServerClient()

  if (!supabase) {
    return []
  }

  let query = supabase
    .from("kyc_verifications")
    .select(`
      *,
      users (
        id,
        full_name,
        email,
        phone,
        created_at
      )
    `)
    .order("created_at", { ascending: false })

  if (status) {
    query = query.eq("verification_status", status)
  }

  const { data } = await query
  return data || []
}

export default async function AdminKycPage() {
  const [allKyc, pendingKyc, approvedKyc, rejectedKyc] = await Promise.all([
    getKycSubmissions(),
    getKycSubmissions("pending"),
    getKycSubmissions("approved"),
    getKycSubmissions("rejected"),
  ])

  const statusConfig = {
    pending: { label: "Menunggu", color: "bg-amber-100 text-amber-700", icon: Clock },
    approved: { label: "Disetujui", color: "bg-green-100 text-green-700", icon: CheckCircle },
    rejected: { label: "Ditolak", color: "bg-red-100 text-red-700", icon: XCircle },
  }

  const KycTable = ({ data }: { data: any[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telepon</TableHead>
          <TableHead>Tanggal Submit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              Tidak ada data KYC
            </TableCell>
          </TableRow>
        ) : (
          data.map((kyc) => {
            const status = statusConfig[kyc.verification_status as keyof typeof statusConfig]
            return (
              <TableRow key={kyc.id}>
                <TableCell className="font-medium">{kyc.users?.full_name || "-"}</TableCell>
                <TableCell>{kyc.users?.email || "-"}</TableCell>
                <TableCell>{kyc.users?.phone || "-"}</TableCell>
                <TableCell>{formatDate(kyc.created_at)}</TableCell>
                <TableCell>
                  <Badge className={status.color}>
                    <status.icon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/kyc/${kyc.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </Link>
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
        <h1 className="text-2xl font-bold">Verifikasi KYC</h1>
        <p className="text-muted-foreground">Kelola permohonan verifikasi KYC pengguna</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingKyc.length}</p>
              <p className="text-sm text-muted-foreground">Menunggu Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{approvedKyc.length}</p>
              <p className="text-sm text-muted-foreground">Disetujui</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{rejectedKyc.length}</p>
              <p className="text-sm text-muted-foreground">Ditolak</p>
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
                  Menunggu ({pendingKyc.length})
                </TabsTrigger>
                <TabsTrigger
                  value="approved"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Disetujui ({approvedKyc.length})
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Ditolak ({rejectedKyc.length})
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Semua ({allKyc.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="pending" className="mt-0">
              <KycTable data={pendingKyc} />
            </TabsContent>
            <TabsContent value="approved" className="mt-0">
              <KycTable data={approvedKyc} />
            </TabsContent>
            <TabsContent value="rejected" className="mt-0">
              <KycTable data={rejectedKyc} />
            </TabsContent>
            <TabsContent value="all" className="mt-0">
              <KycTable data={allKyc} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
