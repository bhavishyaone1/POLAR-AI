/**
 * CARGO DETAIL SLIDE-OVER DRAWER
 * ==============================
 * Mission-grade operational inspection drawer for freight & maritime consignments.
 * Displays:
 *  - Consignment Telemetry & Route
 *  - Resupply Lifecycle Tracker (Planned -> Staged -> Maritime Transit -> Ice Approach -> Station Bunkered)
 *  - Downstream Dependency Cascade (Fuel -> Generators -> Microgrid -> Life Support)
 *  - Quick Simulator & AI Copilot Integrations
 */

import React, { useEffect } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  Anchor,
  ArrowRight,
  Boxes,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Flame,
  Layers,
  MapPin,
  Navigation,
  Package,
  ShieldAlert,
  Ship,
  Sliders,
  Sparkles,
  Truck,
  X,
  Zap,
} from 'lucide-react'
import Badge from './Badge'
import { CARGO_STATUS, PRIORITY, optionsFrom } from '../lib/statuses'
import { formatNumber, formatQuantity, timeAgo } from '../lib/format'

export default function CargoDetailDrawer({
  isOpen,
  onClose,
  consignment,
  goTo,
  canManage,
  updateCargo,
  expeditionName,
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !consignment) return null

  const isFuel = consignment.category?.toLowerCase() === 'fuel' || consignment.id === 'C-101'
  const isDelayed = consignment.status === 'DELAYED'

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#0A1926]/30 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Consignment Details - ${consignment.item_name}`}
        className="relative z-10 flex h-full w-full sm:w-[480px] md:w-[520px] flex-col bg-white border-l border-[#DCEAF1] shadow-2xl animate-in slide-in-from-right duration-250 ease-out"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#DCEAF1] bg-[#F7FBFD] px-6 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-medium text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-md border border-[#BAE6FD]">
                {consignment.id}
              </span>
              <span className="text-[11.5px] uppercase tracking-wider text-[#6E8294]">
                {consignment.category}
              </span>
            </div>
            <h2 className="text-[18px] font-semibold text-[#0C1E30] tracking-tight truncate" title={consignment.item_name}>
              {consignment.item_name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-[#6E8294] hover:bg-[#E0F2FE] hover:text-[#0C1E30] transition"
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status & Critical Flags */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#F7FBFD] border border-[#DCEAF1]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#42586E]">Status:</span>
              <Badge map={CARGO_STATUS} value={consignment.status} dot />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#42586E]">Priority:</span>
              <Badge map={PRIORITY} value={consignment.priority} />
            </div>
          </div>

          {/* Critical Resupply Alert (If delayed or Fuel) */}
          {isDelayed && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-800">
                <AlertTriangle size={15} className="text-rose-600 shrink-0" />
                <span>Maritime Transit Interruption · 5.0-Day Supply Gap</span>
              </div>
              <p className="text-xs text-[#42586E] leading-relaxed">
                Pack-ice obstruction in Prydz Bay has delayed vessel ETA to 17 days. Station fuel reserves deplete in 12 days, leaving a 5-day unhedged deficit window.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    goTo('simulator')
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 text-xs font-medium shadow-xs transition"
                >
                  <Sliders size={13} />
                  <span>Simulate Delay</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    goTo('risks')
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-white hover:bg-rose-50 text-rose-800 px-3 py-1.5 text-xs font-medium transition"
                >
                  <ShieldAlert size={13} />
                  <span>Trace Cascade</span>
                </button>
              </div>
            </div>
          )}

          {/* Route & Transit Telemetry */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E8294] mb-2.5">
              Corridor &amp; Transit Route
            </h3>
            <div className="rounded-xl border border-[#DCEAF1] bg-white p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-semibold text-[10px]">
                    A
                  </div>
                  <div>
                    <div className="font-semibold text-[#0C1E30]">{consignment.location || 'Staging Depot'}</div>
                    <div className="text-[11px] text-[#6E8294]">Origin / Loading Hub</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#6E8294]" />
                <div className="flex items-center gap-2 text-right">
                  <div>
                    <div className="font-semibold text-[#0C1E30]">{consignment.destination || 'Maitri Station'}</div>
                    <div className="text-[11px] text-[#6E8294]">Destination / Depot</div>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-semibold text-[10px]">
                    B
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F1F7FA] text-xs">
                <div>
                  <span className="text-[#6E8294] block text-[10.5px] uppercase font-mono">Carrier / Vessel</span>
                  <span className="font-medium text-[#0C1E30]">
                    {isFuel ? 'MV Vasiliy Golovnin' : 'Polar Air Corridor C-17'}
                  </span>
                </div>
                <div>
                  <span className="text-[#6E8294] block text-[10.5px] uppercase font-mono">Current Sector</span>
                  <span className="font-medium text-[#0C1E30]">
                    {isDelayed ? 'Prydz Bay Sea-Ice Shelf' : 'Southern Ocean 54°S'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resupply Lifecycle Timeline */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E8294] mb-2.5">
              Consignment Lifecycle Tracker
            </h3>
            <div className="rounded-xl border border-[#DCEAF1] bg-white p-4">
              <ol className="relative border-l border-[#DCEAF1] ml-2 space-y-4">
                <li className="ml-4">
                  <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-white bg-[#15803D]" />
                  <div className="text-xs font-semibold text-[#0C1E30]">Manifest Audited &amp; Loaded</div>
                  <div className="text-[11.5px] text-[#42586E]">Staged at Cape Town Maritime Depot · Verified Nov 2026</div>
                </li>

                <li className="ml-4">
                  <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-white bg-[#18A878]" />
                  <div className="text-xs font-semibold text-[#102A43]">Maritime Departure</div>
                  <div className="text-[11px] text-[#526779]">Departed port under ice-class charter escort</div>
                </li>

                <li className="ml-4">
                  <span
                    className={`absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-white ${
                      isDelayed ? 'bg-[#E5484D] animate-pulse' : 'bg-[#1597D4]'
                    }`}
                  />
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#102A43]">
                      Polar Fast-Ice Navigation
                    </span>
                    {isDelayed && (
                      <span className="rounded bg-rose-100 px-1.5 py-0.2 text-[9.5px] font-mono font-bold text-rose-700">
                        DELAYED
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#526779]">
                    {isDelayed
                      ? 'Pack-ice thickness > 2.4m; vessel awaiting icebreaker clearance.'
                      : 'Progressing at 9.4 knots through clear lead channels.'}
                  </div>
                </li>

                <li className="ml-4">
                  <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-white bg-[#CBD8E1]" />
                  <div className="text-xs font-semibold text-[#8495A3]">Over-Ice Sledge Transfer</div>
                  <div className="text-[11px] text-[#8495A3]">Piston-bully tracked traverse to station fuel farm</div>
                </li>

                <li className="ml-4">
                  <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-white bg-[#CBD8E1]" />
                  <div className="text-xs font-semibold text-[#8495A3]">Station Bunkering & Handover</div>
                  <div className="text-[11px] text-[#8495A3]">ETA: 17 days (Subject to weather window)</div>
                </li>
              </ol>
            </div>
          </div>

          {/* Downstream Dependency Cascade */}
          {isFuel && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#526779] mb-2.5">
                Downstream Microgrid Impact
              </h3>
              <div className="rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] p-4 space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="font-bold text-[#1597D4]">FUEL C-101</span>
                  <ArrowRight size={12} className="text-[#8495A3]" />
                  <span className="font-semibold text-[#102A43]">CAT 3512 GEN</span>
                  <ArrowRight size={12} className="text-[#8495A3]" />
                  <span className="font-semibold text-[#102A43]">280kW GRID</span>
                  <ArrowRight size={12} className="text-[#8495A3]" />
                  <span className="font-bold text-[#E5484D]">HABITAT HEATING</span>
                </div>
                <p className="text-[11.5px] text-[#526779] leading-relaxed">
                  Depleting fuel reserves without resupply triggers automated circuit-shedding, halting science drills and reducing habitat thermal loop to safe survival minimums.
                </p>
              </div>
            </div>
          )}

          {/* Physical Specifications & Expedition Link */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#526779] mb-2.5">
              Manifest Specifications
            </h3>
            <div className="divide-y divide-[#F1F7FA] rounded-xl border border-[#DCEAF1] bg-white text-xs">
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Quantity</span>
                <span className="font-mono font-semibold text-[#102A43]">
                  {formatQuantity(consignment.quantity, consignment.unit)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Gross Weight</span>
                <span className="font-mono font-semibold text-[#102A43]">
                  {consignment.weight_kg ? `${formatNumber(consignment.weight_kg)} kg` : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Assigned Mission</span>
                <span className="font-semibold text-[#1597D4]">
                  {expeditionName || consignment.expedition_id || 'Unassigned'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">First Logged</span>
                <span className="font-mono text-[#526779]">{timeAgo(consignment.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Delay Reason Management */}
          {isDelayed && (
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#526779] block mb-1.5">
                Delay Assessment Reason
              </label>
              <textarea
                className="w-full rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] p-3 text-xs text-[#102A43] focus:border-[#1597D4] focus:bg-white focus:outline-none transition"
                rows={2}
                disabled={!canManage}
                value={consignment.delay_reason || ''}
                onChange={(e) => updateCargo(consignment.id, { delay_reason: e.target.value })}
                placeholder="Specify weather or logistical obstruction..."
              />
            </div>
          )}

          {/* Direct Status Changer for Operators */}
          {canManage && (
            <div className="pt-2 border-t border-[#DCEAF1] space-y-2">
              <span className="text-xs font-semibold text-[#526779] block">Update Shipment Status:</span>
              <div className="grid grid-cols-2 gap-2">
                {optionsFrom(CARGO_STATUS).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateCargo(consignment.id, { status: opt.value })}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      consignment.status === opt.value
                        ? 'border-[#1597D4] bg-[#EAF6FA] text-[#1597D4] font-bold'
                        : 'border-[#DCEAF1] bg-white text-[#526779] hover:bg-[#F7FBFD]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="border-t border-[#DCEAF1] bg-[#F7FBFD] p-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose()
              goTo('copilot')
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCEAF1] bg-white px-3.5 py-2 text-xs font-semibold text-[#102A43] hover:bg-[#EAF6FA] transition shadow-xs"
          >
            <Sparkles size={13} className="text-[#1597D4]" />
            <span>Consult AI Copilot</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose()
              goTo('simulator')
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white px-4 py-2 text-xs font-semibold shadow-xs transition"
          >
            <Zap size={13} />
            <span>Run What-If Test</span>
          </button>
        </div>
      </aside>
    </div>
  )
}
