/**
 * GLOBAL EMERGENCY BANNER
 * =======================
 * Appears across all pages whenever an active, unresolved emergency exists.
 * - Desktop (>= 768px): Preserved 100% UNTOUCHED with minimized / expanded tactical ribbon.
 * - Mobile (< 768px): Un-squeezed clean incident card:
 *     🔴 Medical Incident · INC-001
 *     Dr. Rohan Desai · P-007 · Maitri Sector B
 *     +2 additional incidents
 *     [ View Details ] [ Open Room ]
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  MapPin,
  X,
} from 'lucide-react'
import { playAcknowledgeChirp } from '../services/audioAlert'
import { timeAgo } from '../lib/format'

export default function EmergencyBanner({
  emergencies = [],
  personnel = [],
  onOpenEmergencyRoom,
  onAcknowledge,
  canRespond = false,
}) {
  // Start in minimized mode by default on desktop
  const [minimized, setMinimized] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  // Filter for unresolved emergencies (OPEN or IN_PROGRESS or not RESOLVED)
  const activeEmergencies = emergencies.filter(
    (e) => e.status !== 'RESOLVED' && e.status !== 'Resolved'
  )

  if (dismissed || activeEmergencies.length === 0) return null

  // Top incident (highest severity or most recent)
  const topIncident = activeEmergencies[0]

  const affectedPerson = personnel?.find(
    (p) => p.id === topIncident?.personnel_id
  )
  const affectedName =
    topIncident?.personnel_name || affectedPerson?.name
  const affectedLabel = affectedName
    ? `${affectedName} (${topIncident.personnel_id})`
    : topIncident?.personnel_id

  const handleAcknowledge = () => {
    playAcknowledgeChirp()
    if (onAcknowledge) {
      onAcknowledge(topIncident.id)
    }
  }

  return (
    <>
      {/* ============================================================
          MOBILE-ONLY EMERGENCY CARD (< 768px / md:hidden)
          Clean · Un-squeezed · 44px+ touch targets
          ============================================================ */}
      <div className="block md:hidden border-b border-rose-200 bg-rose-50/95 px-3.5 py-3 shadow-xs">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-rose-600 font-bold text-xs">🔴</span>
              <span className="text-xs font-bold text-rose-950">
                {topIncident.type || 'Medical Incident'}
              </span>
              <span className="rounded border border-rose-300 bg-white px-1.5 py-0.2 font-mono text-[10px] font-bold text-rose-700">
                {topIncident.id}
              </span>
            </div>

            <div className="text-xs font-semibold text-[#0C1E30] mt-1 truncate">
              {affectedLabel || 'Dr. Rohan Desai · P-007'}
            </div>

            <div className="text-[11px] text-rose-800 flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-rose-600 shrink-0" />
              <span className="truncate">{topIncident.location || topIncident.detail || 'Maitri Sector B'}</span>
              {activeEmergencies.length > 1 && (
                <span className="text-rose-600 font-semibold shrink-0">
                  · +{activeEmergencies.length - 1} additional
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="text-rose-400 hover:text-rose-700 p-1 shrink-0"
            aria-label="Dismiss alert"
          >
            <X size={15} />
          </button>
        </div>

        <div className="mt-2.5 pt-2 border-t border-rose-200/80 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenEmergencyRoom?.(topIncident.id)}
            className="flex-1 rounded-lg bg-white border border-rose-300 py-2 text-center text-xs font-semibold text-rose-800 min-h-[44px] flex items-center justify-center active:scale-95 transition"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => onOpenEmergencyRoom?.(topIncident.id)}
            className="flex-1 rounded-lg bg-rose-600 py-2 text-center text-xs font-semibold text-white shadow-2xs min-h-[44px] flex items-center justify-center active:scale-95 transition"
          >
            Open Room →
          </button>
        </div>
      </div>

      {/* ============================================================
          DESKTOP / TABLET EMERGENCY BANNER (LOCKED & UNTOUCHED for >= 768px)
          ============================================================ */}
      <div className="hidden md:block">
        {minimized ? (
          <div
            id="global-emergency-banner-min"
            className="flex items-center justify-between border-b border-rose-200 bg-rose-50 px-3 py-1.5 text-xs text-rose-900 shadow-2xs backdrop-blur-md transition-all sm:px-5"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-600" />
              </span>

              <span className="shrink-0 rounded border border-rose-300 bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-rose-700 shadow-2xs">
                {topIncident.id}
              </span>

              <span className="truncate text-[11px] font-bold text-rose-950">
                {topIncident.type || 'POLAR DISTRESS'}:
              </span>

              <span className="hidden truncate text-[11px] text-rose-800 sm:inline">
                {affectedLabel ? `${affectedLabel} · ` : ''}
                {topIncident.location || topIncident.detail || 'Field Outpost'}
              </span>

              {activeEmergencies.length > 1 && (
                <span className="hidden rounded-full bg-rose-100 px-1.5 py-0.2 text-[9.5px] font-bold text-rose-700 border border-rose-200 md:inline">
                  +{activeEmergencies.length - 1} more
                </span>
              )}
            </div>

            <div className="ml-2 flex shrink-0 items-center gap-1.5">
              {canRespond && !topIncident.acknowledged_at && topIncident.status !== 'RESOLVED' && (
                <button
                  type="button"
                  id={`ack-banner-btn-${topIncident.id}`}
                  onClick={handleAcknowledge}
                  className="rounded border border-rose-300 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 transition hover:bg-rose-100 shadow-2xs"
                >
                  Ack
                </button>
              )}

              <button
                type="button"
                id="open-emergency-room-btn"
                onClick={() => onOpenEmergencyRoom?.(topIncident.id)}
                className="flex items-center gap-1 rounded bg-rose-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-2xs transition hover:bg-rose-700"
              >
                <span>Open Room</span>
                <ChevronRight size={11} />
              </button>

              <button
                type="button"
                onClick={() => setMinimized(false)}
                className="rounded p-0.5 text-rose-500 transition hover:bg-rose-100 hover:text-rose-800"
                title="Expand alert details"
                aria-label="Expand alert details"
              >
                <ChevronDown size={13} />
              </button>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="ml-0.5 rounded p-0.5 text-rose-500 transition hover:bg-rose-100 hover:text-rose-800"
                title="Dismiss alert banner"
                aria-label="Dismiss alert banner"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        ) : (
          <div
            id="global-emergency-banner"
            className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-900 shadow-2xs backdrop-blur-md transition-all sm:px-5"
          >
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 rounded border border-rose-300 bg-white px-2 py-0.5 font-bold uppercase tracking-wider text-rose-700 shadow-2xs">
                <AlertTriangle size={12} className="animate-pulse text-rose-600" />
                <span>EMERGENCY ALERT · {topIncident.id}</span>
              </div>

              <span className="font-bold text-rose-950">{topIncident.type || 'POLAR DISTRESS'}</span>
              <span className="text-rose-300">·</span>

              {topIncident.personnel_id && (
                <>
                  <span className="inline-flex items-center gap-1 text-rose-900">
                    <span className="text-rose-600">Affected:</span>
                    <strong className="rounded bg-white px-1.5 py-0.5 font-bold text-rose-950 border border-rose-200 shadow-2xs">
                      {affectedLabel}
                    </strong>
                  </span>
                  <span className="text-rose-300">·</span>
                </>
              )}

              <span className="flex items-center gap-1 text-rose-800">
                <MapPin size={11} className="shrink-0 text-rose-600" />
                <span>{topIncident.detail || topIncident.location_name || 'Field Outpost'}</span>
              </span>

              {topIncident.description && (
                <>
                  <span className="text-rose-300">·</span>
                  <span className="max-w-[260px] truncate italic text-rose-700 sm:max-w-[360px]">
                    "{topIncident.description}"
                  </span>
                </>
              )}

              <span className="rounded bg-rose-100 border border-rose-200 px-1.5 py-0.5 text-[10px] text-rose-700">
                {timeAgo(topIncident.reported_at || topIncident.created_at || topIncident.timestamp)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {canRespond && !topIncident.acknowledged_at && topIncident.status !== 'RESOLVED' && (
                <button
                  type="button"
                  id={`ack-banner-btn-${topIncident.id}`}
                  onClick={handleAcknowledge}
                  className="flex items-center gap-1 rounded border border-rose-300 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 transition hover:bg-rose-100 shadow-2xs"
                >
                  <CheckCircle2 size={11} />
                  <span>Acknowledge</span>
                </button>
              )}

              <button
                type="button"
                id="open-emergency-room-btn"
                onClick={() => onOpenEmergencyRoom?.(topIncident.id)}
                className="flex items-center gap-1 rounded bg-rose-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-2xs transition hover:bg-rose-700"
              >
                <span>Emergency Room</span>
                <ChevronRight size={11} />
              </button>

              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="rounded p-0.5 text-rose-500 transition hover:bg-rose-100 hover:text-rose-800"
                title="Minimize alert banner"
                aria-label="Minimize alert banner"
              >
                <ChevronUp size={13} />
              </button>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="ml-0.5 rounded p-0.5 text-rose-500 transition hover:bg-rose-100 hover:text-rose-800"
                title="Dismiss alert banner"
                aria-label="Dismiss alert banner"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
