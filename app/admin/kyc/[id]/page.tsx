import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, User, Mail, Phone, Calendar, CreditCard } from "lucide-react"
import { formatDate, formatRupiah } from "@/lib/utils/format"
import { KycApprovalForm } from "@/components/kyc-approval-form"

export const dynamic = "force-dynamic"

async function getKycDetail(id: string) {
  const supabase = await createServerClient()

  if (!supabase) {
    return null
  }

  const { data } = await supabase
    .from("kyc_verifications")
    .select(`
      *,
      users (
        id,
        full_name,
        email,
        phone,
        id_card_number,
        wallet_balance,
        bonus_balance,
        auction_participation_count,
        created_at
      )
    `)
    .eq("id", id)
    .single()

  return data
}

export default async function AdminKycDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const kyc = await getKycDetail(id)

  if (!kyc) {
    notFound()
  }

  const statusConfig = {
    pending: { label: "Menunggu Review", color: "bg-amber-100 text-amber-700" },
    approved: { label: "Disetujui", color: "bg-green-100 text-green-700" },
    rejected: { label: "Ditolak", color: "bg-red-100 text-red-700" },
  }

  const status = statusConfig[kyc.verification_status as keyof typeof statusConfig]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/kyc">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Review KYC</h1>
          <p className="text-muted-foreground">Detail verifikasi identitas pengguna</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informasi Pengguna</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                <p className="font-medium">{kyc.users?.full_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{kyc.users?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telepon</p>
                <p className="font-medium">{kyc.users?.phone || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nomor KTP</p>
                <p className="font-medium">{kyc.users?.id_card_number || "-"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bergabung</p>
                <p className="font-medium">{formatDate(kyc.users?.created_at)}</p>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saldo Wallet</span>
                <span className="font-medium">{formatRupiah(kyc.users?.wallet_balance || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saldo Bonus</span>
                <span className="font-medium">{formatRupiah(kyc.users?.bonus_balance || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Partisipasi Lelang</span>
                <span className="font-medium">{kyc.users?.auction_participation_count || 0}x</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Documents */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Dokumen KYC</CardTitle>
            <Badge className={status.color}>{status.label}</Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID Card Photo */}
            <div>
              <h3 className="font-medium mb-2">Foto KTP</h3>
              {kyc.id_card_photo ? (
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image src={kyc.id_card_photo || "/placeholder.svg"} alt="Foto KTP" fill className="object-contain" />
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                  Tidak ada foto KTP
                </div>
              )}
            </div>

            {/* Selfie Photo */}
            <div>
              <h3 className="font-medium mb-2">Foto Selfie dengan KTP</h3>
              {kyc.selfie_photo ? (
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={kyc.selfie_photo || "/placeholder.svg"}
                    alt="Foto Selfie"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                  Tidak ada foto selfie
                </div>
              )}
            </div>

            {/* NPWP */}
            {kyc.npwp_number && (
              <div>
                <h3 className="font-medium mb-2">Nomor NPWP</h3>
                <p className="text-lg font-mono bg-muted p-3 rounded-lg">{kyc.npwp_number}</p>
              </div>
            )}

            {/* Approval Form */}
            {kyc.verification_status === "pending" && <KycApprovalForm kycId={kyc.id} userId={kyc.user_id} />}

            {/* Admin Notes */}
            {kyc.admin_notes && kyc.verification_status !== "pending" && (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Catatan Admin</h3>
                <p>{kyc.admin_notes}</p>
                {kyc.verified_at && (
                  <p className="text-sm text-muted-foreground mt-2">Diproses pada: {formatDate(kyc.verified_at)}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
