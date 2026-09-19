/**
 * INVENTORY DETAIL SLIDE-OVER DRAWER
 * ==================================
 * Operational inventory inspection drawer for station provisions & consumables.
 * Displays:
 *  - Stock Level Gauge & Safety Thresholds
 *  - Consumption Burn Rate & Days Runway
 *  - Resupply Linkage (Incoming Cargo & Deficit Calculation)
 *  - Downstream Dependent Machinery & Life-Support Loops
 *  - Fast Adjustments (+/- step, Restock to full)
 *  - Quick Simulator & AI Copilot Integrations
 */

import React, { useEffect } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Boxes,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Flame,
  Gauge,
  Layers,
  MapPin,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldAlert,
  Sliders,
  Sparkles,
  ThermometerSnowflake,
  TrendingDown,
  X,
  Zap,
} from 'lucide-react'
import Badge from './Badge'
import { STOCK_STATUS, CONDITION, stockStatus, isLowStock, optionsFrom } from '../lib/statuses'
import { calculateResupplyMetrics } from '../services/continuityEngine'
import { clampPercent, formatNumber, timeAgo } from '../lib/format'

export default function InventoryDetailDrawer({
  isOpen,
  onClose,
  item,
  cargo = [],
  goTo,
  canManage,
  adjustInventoryQuantity,
  updateInventoryItem,
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

  if (!isOpen || !item) return null

  const status = stockStatus(item)
  const isFuel = item.category?.toLowerCase() === 'fuel' || item.id === 'INV-001'
  const min = Number(item.minimum_quantity) || 0
  const qty = Number(item.quantity) || 0
  const burn = Number(item.daily_burn_rate) || 0
  const hasBurn = burn > 0

  // Calculate metrics if consumable
  const resupplyMetrics = hasBurn ? calculateResupplyMetrics(item, cargo) : null
  const isDeficit = resupplyMetrics && resupplyMetrics.resupplyGapDays > 0

  // Percent of full holding (twice minimum)
  const stockBarPercent = min > 0 ? clampPercent((qty / (min * 2)) * 100) : qty > 0 ? 100 : 0

  // Adjustment step
  const step = min >= 1000 ? 100 : min >= 100 ? 10 : 1

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
        aria-label={`Inventory Item - ${item.item_name}`}
        className="relative z-10 flex h-full w-full sm:w-[480px] md:w-[520px] flex-col bg-white border-l border-[#DCEAF1] shadow-2xl animate-in slide-in-from-right duration-250 ease-out"
      >
        {/* Mobile Drag/Grab Indicator */}
        <div className="mx-auto mt-2 -mb-1 h-1.5 w-12 rounded-full bg-slate-300 sm:hidden shrink-0" aria-hidden="true" />

        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#DCEAF1] bg-[#F7FBFD] px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#1597D4] bg-[#EAF6FA] px-2 py-0.5 rounded border border-[#BFDDE7]">
                {item.id}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#526779]">
                {item.category}
              </span>
            </div>
            <h2 className="text-base sm:text-base font-bold text-[#102A43] truncate" title={item.item_name}>
              {item.item_name}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-xl p-2 text-[#526779] hover:bg-[#EAF6FA] hover:text-[#102A43] transition touch-manipulation"
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Stock Level & Status Strip */}
          <div className="rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#526779]">Stock Health:</span>
                <Badge map={STOCK_STATUS} value={status} dot />
              </div>
              <div className="text-right">
                <span className="font-mono text-xl font-bold text-[#102A43]">
                  {formatNumber(qty)}
                </span>{' '}
                <span className="text-xs text-[#526779] font-medium">{item.unit}</span>
              </div>
            </div>

            {/* Gauge progress bar */}
            <div>
              <div className="flex items-center justify-between text-[10.5px] text-[#526779] mb-1">
                <span>Critical Min: {formatNumber(min)} {item.unit}</span>
                <span>Full Capacity: {formatNumber(min * 2)} {item.unit}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#E5EEF3] overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    status === 'AVAILABLE'
                      ? 'bg-[#18A878]'
                      : status === 'LOW_STOCK'
                      ? 'bg-[#E7A51A]'
                      : 'bg-[#E5484D]'
                  }`}
                  style={{ width: `${stockBarPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Consumable Burn Rate & Runway Analysis */}
          {hasBurn && resupplyMetrics && (
            <div className={`rounded-xl border p-4 space-y-3.5 ${
              isDeficit
                ? 'border-rose-200 bg-rose-50/60'
                : 'border-[#DCEAF1] bg-white'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                    isDeficit ? 'bg-rose-100 text-rose-700' : 'bg-[#EAF6FA] text-[#1597D4]'
                  }`}>
                    {isFuel ? <Flame size={15} /> : <TrendingDown size={15} />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#102A43] block">
                      Consumption & Runway Telemetry
                    </span>
                    <span className="text-[11px] text-[#526779]">
                      Burn: {formatNumber(burn)} {item.unit}/day
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono text-lg font-bold ${
                    isDeficit
                      ? 'text-rose-700'
                      : resupplyMetrics.daysRemaining <= 5
                      ? 'text-amber-700'
                      : 'text-[#18A878]'
                  }`}>
                    {resupplyMetrics.daysRemaining} Days
                  </span>
                  <span className="block text-[10px] text-[#526779] font-mono">Runway Buffer</span>
                </div>
              </div>

              {isDeficit && (
                <div className="rounded-lg bg-rose-100/70 border border-rose-200 p-3 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-rose-800">
                    <AlertTriangle size={13} className="shrink-0" />
                    <span>Unhedged {resupplyMetrics.resupplyGapDays}-Day Blackout Window Detected</span>
                  </div>
                  <p className="text-[#526779] text-[11px] leading-relaxed">
                    Station runway is 12.0 days while incoming resupply cargo C-101 ETA is 17.0 days. Fuel will exhaust 5.0 days before arrival unless power-shedding is authorized.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        goTo('simulator')
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 text-xs font-semibold shadow-xs transition"
                    >
                      <Zap size={11} />
                      <span>Model Shedding</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose()
                        goTo('cargo')
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-300 bg-white px-2.5 py-1 text-xs font-semibold text-rose-800 transition"
                    >
                      <span>Inspect C-101</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Connected Station Assets / Dependencies */}
          {isFuel && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#526779] mb-2.5">
                Downstream Dependent Machinery
              </h3>
              <div className="divide-y divide-[#F1F7FA] rounded-xl border border-[#DCEAF1] bg-white text-xs">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-[#1597D4]" />
                    <div>
                      <div className="font-semibold text-[#102A43]">Primary Generator G-01 (CAT 3512)</div>
                      <div className="text-[10.5px] text-[#526779]">Baseload Station Microgrid (220 kW)</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-rose-600">Day 12 Starvation</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <ThermometerSnowflake size={14} className="text-[#1597D4]" />
                    <div>
                      <div className="font-semibold text-[#102A43]">Habitat Hydronic Glycol Heating Loop</div>
                      <div className="text-[10.5px] text-[#526779]">Living quarters & medical ward</div>
                    </div>
                  </div>
                  <span className="font-mono text-amber-600 font-semibold">18hr Freeze Risk</span>
                </div>
              </div>
            </div>
          )}

          {/* Storage Details & Physical Specs */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#526779] mb-2.5">
              Storage Telemetry & Location
            </h3>
            <div className="divide-y divide-[#F1F7FA] rounded-xl border border-[#DCEAF1] bg-white text-xs">
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Stored At</span>
                <span className="font-semibold text-[#102A43] flex items-center gap-1">
                  <MapPin size={12} className="text-[#1597D4]" />
                  {item.location || 'Maitri Station'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Physical Condition</span>
                <Badge map={CONDITION} value={item.condition || 'GOOD'} />
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Safety Buffer Days</span>
                <span className="font-mono font-semibold text-[#102A43]">
                  {item.safety_buffer_days || 4} days
                </span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Last Audited</span>
                <span className="font-mono text-[#526779]">{timeAgo(item.updated_at)}</span>
              </div>
            </div>
          </div>

          {/* Direct Adjustment Controls */}
          {canManage && (
            <div className="pt-2 border-t border-[#DCEAF1] space-y-3">
              <span className="text-xs font-semibold text-[#526779] block">
                Manual Quantity Adjustments ({step} {item.unit}/step):
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={qty <= 0}
                  onClick={() => adjustInventoryQuantity(item.id, -step)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DCEAF1] bg-white hover:bg-[#F7FBFD] py-2 text-xs font-bold text-[#102A43] disabled:opacity-40 transition shadow-2xs"
                >
                  <Minus size={13} />
                  <span>Deduct {step} {item.unit}</span>
                </button>
                <button
                  type="button"
                  onClick={() => adjustInventoryQuantity(item.id, step)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white py-2 text-xs font-bold transition shadow-2xs"
                >
                  <Plus size={13} />
                  <span>Add {step} {item.unit}</span>
                </button>
              </div>

              {min > 0 && (
                <button
                  type="button"
                  onClick={() => updateInventoryItem(item.id, { quantity: min * 2 })}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] hover:bg-[#EAF6FA] py-2 text-xs font-semibold text-[#1597D4] transition"
                >
                  <RotateCcw size={12} />
                  <span>Restock to Full Holding ({formatNumber(min * 2)} {item.unit})</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="border-t border-[#DCEAF1] bg-[#F7FBFD] p-3.5 sm:p-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              onClose()
              goTo('copilot')
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DCEAF1] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#102A43] hover:bg-[#EAF6FA] transition shadow-xs min-h-[44px] touch-manipulation"
          >
            <Sparkles size={14} className="text-[#1597D4] shrink-0" />
            <span className="truncate">Ask Copilot</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose()
              goTo('simulator')
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white px-4 py-2.5 text-xs font-semibold shadow-xs transition min-h-[44px] touch-manipulation"
          >
            <Zap size={14} className="shrink-0" />
            <span className="truncate">Simulate Burn</span>
          </button>
        </div>
      </aside>
    </div>
  )
}
