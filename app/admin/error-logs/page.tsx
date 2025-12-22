import { getErrorLogs, clearErrorLogs } from "@/lib/ai/error-monitor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

export default async function ErrorLogsPage() {
  const logs = await getErrorLogs(50)

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Error Monitoring</h1>
          <p className="text-muted-foreground">
            Sistem monitoring otomatis dengan AI-powered auto-fix menggunakan Grok
          </p>
        </div>
        <form action={clearErrorLogs}>
          <Button variant="outline" type="submit">
            Hapus Log
          </Button>
        </form>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Statistik Error</CardTitle>
            <CardDescription>Ringkasan error yang terdeteksi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Error</p>
                <p className="text-3xl font-bold">{logs.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Auto-Fixed</p>
                <p className="text-3xl font-bold text-success">{logs.filter((l) => l.fixed).length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Butuh Perhatian</p>
                <p className="text-3xl font-bold text-destructive">{logs.filter((l) => !l.fixed).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {logs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CheckCircle2 className="w-12 h-12 text-success mb-4" />
              <p className="text-lg font-semibold mb-2">Tidak Ada Error</p>
              <p className="text-muted-foreground text-center">
                Sistem berjalan dengan baik. Semua error telah diperbaiki secara otomatis.
              </p>
            </CardContent>
          </Card>
        ) : (
          logs.map((log, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {log.fixed ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      <CardTitle className="text-lg">
                        {typeof log.error === "string" ? log.error : log.error.message}
                      </CardTitle>
                    </div>
                    <CardDescription>{new Date(log.timestamp).toLocaleString("id-ID")}</CardDescription>
                  </div>
                  <Badge variant={log.fixed ? "default" : "destructive"}>
                    {log.fixed ? "Auto-Fixed" : "Perlu Perhatian"}
                  </Badge>
                </div>
              </CardHeader>
              {log.suggestion && (
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      AI Suggestion:
                    </div>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">{log.suggestion}</pre>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
