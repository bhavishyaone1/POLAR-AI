/**
 * OFFLINE BANNER — POLAR-AI Field Mode Indicator
 * ================================================
 * Shown at the very top of the screen when the operator
 * loses network connectivity. This is expected and normal
 * when researchers are deployed in the field.
 *
 * The banner is dismissible and tells them the app is
 * fully functional offline from the pre-cached data.
 */
import React, { useState } from 'react'
import { WifiOff, X, Download, CheckCircle2 } from 'lucide-react'
import { usePWAInstall } from '../hooks/useOffline'

export default function OfflineBanner({ isOffline }) {
  const [dismissed, setDismissed] = useState(false)
  const { installPrompt, isInstalled, install } = usePWAInstall()

  // Online: show "install app" prompt once if not yet installed
  if (!isOffline) {
    if (isInstalled || !installPrompt || dismissed) return null
    return (
      <div className="relative z-50 bg-[#0284C7] text-white px-4 py-2 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Download size={14} />
          <span className="font-semibold">Install POLAR-AI for offline field use</span>
          <span className="text-blue-200 hidden sm:inline">— works without internet in the field</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={install}
            className="bg-white text-[#0284C7] font-bold px-3 py-1 rounded-lg hover:bg-blue-50 transition text-xs"
          >
            Install App
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-blue-600 rounded transition"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    )
  }

  if (dismissed) return null

  return (
    <div className="relative z-50 bg-amber-600 text-white px-4 py-2 flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 flex-wrap">
        <WifiOff size={14} className="shrink-0" />
        <span className="font-bold">FIELD MODE — No Network</span>
        <span className="text-amber-100 hidden sm:inline">
          All mission data, maps, and AI tools available offline. Changes sync automatically when connection restores.
        </span>
        <span className="text-amber-100 sm:hidden">All data available offline.</span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="p-1 hover:bg-amber-700 rounded transition shrink-0"
        aria-label="Dismiss offline notice"
      >
        <X size={14} />
      </button>
    </div>
  )
}
