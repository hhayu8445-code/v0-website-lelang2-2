// Automatic Semrush SEO data sync service
import { updateSEOWithSemrush } from "./seo-service"

const SYNC_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours

let syncTimer: NodeJS.Timeout | null = null

export function startSemrushAutoSync() {
  if (syncTimer) {
    clearInterval(syncTimer)
  }

  // Initial sync
  updateSEOWithSemrush("lelangmobil.com")

  // Schedule periodic sync
  syncTimer = setInterval(() => {
    updateSEOWithSemrush("lelangmobil.com")
  }, SYNC_INTERVAL)

  console.log("[SEO] Semrush auto-sync started (every 24 hours)")
}

export function stopSemrushAutoSync() {
  if (syncTimer) {
    clearInterval(syncTimer)
    syncTimer = null
    console.log("[SEO] Semrush auto-sync stopped")
  }
}
