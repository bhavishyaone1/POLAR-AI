/**
 * ASSET DETAIL SLIDE-OVER DRAWER
 * ==============================
 * Mission-critical machinery & microgrid inspection drawer.
 * Displays:
 *  - Real-time Telemetry (Run hours, threshold gauge, oil pressure, temp)
 *  - Microgrid & Energy Chain Dependencies (Fuel supply, power loops, life support)
 *  - Maintenance Schedule & Overhaul Windows
 *  - Sandbox Failure Simulation & AI Diagnostic Actions
 */

import React, { useEffect } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BatteryCharging,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Flame,
  Gauge,
  Layers,
  MapPin,
  Radio,
  RotateCcw,
  ShieldAlert,
  Sliders,
  Sparkles,
  ThermometerSnowflake,
  Truck,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import { formatNumber } from '../lib/format'

export default function AssetDetailDrawer({
  isOpen,
  onClose,
  asset,
  goTo,
  updateAsset,
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

  if (!isOpen || !asset) return null

  const hours = Number(asset.operating_hours) || 0
  const threshold = Number(asset.threshold_hours) || 10000
  const hoursPct = Math.min(100, Math.round((hours / threshold) * 100))
  const isHighWear = hoursPct >= 85
  const isGenerator = asset.type === 'GENERATOR' || asset.name?.toLowerCase().includes('generator')

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
        aria-label={`Asset Telemetry - ${asset.name}`}
        className="relative z-10 flex h-full w-full sm:w-[480px] md:w-[520px] flex-col bg-white border-l border-[#DCEAF1] shadow-2xl animate-in slide-in-from-right duration-250 ease-out"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#DCEAF1] bg-[#F7FBFD] px-6 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#1597D4] bg-[#EAF6FA] px-2 py-0.5 rounded border border-[#BFDDE7]">
                {asset.id}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#526779]">
                {asset.type || 'MACHINERY'}
              </span>
            </div>
            <h2 className="text-base font-bold text-[#102A43] truncate" title={asset.name}>
              {asset.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-[#526779] hover:bg-[#EAF6FA] hover:text-[#102A43] transition"
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status & Risk Banner */}
          <div className="flex items-center justify-between rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] p-3.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#526779]">Status:</span>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold ${
                asset.status === 'OPERATIONAL'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  asset.status === 'OPERATIONAL' ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
                {asset.status || 'OPERATIONAL'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#526779]">Failure Risk:</span>
              <span className={`rounded-md px-2 py-0.5 text-[11px] font-mono font-bold ${
                asset.failure_risk === 'CRITICAL'
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : asset.failure_risk === 'HIGH'
                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                  : 'bg-sky-100 text-sky-700 border border-sky-200'
              }`}>
                {asset.failure_risk || 'LOW'}
              </span>
            </div>
          </div>

          {/* Operating Run-Hours & Overhaul Limit */}
          <div className="rounded-xl border border-[#DCEAF1] bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#526779] block">
                  Cumulative Run-Hours
                </span>
                <span className="font-mono text-xl font-bold text-[#102A43]">
                  {formatNumber(hours)} <span className="text-xs text-[#526779] font-normal">/ {formatNumber(threshold)} hrs</span>
                </span>
              </div>
              <span className={`font-mono text-sm font-bold ${isHighWear ? 'text-amber-600' : 'text-emerald-600'}`}>
                {hoursPct}% Wear
              </span>
            </div>

            <div className="h-2 w-full rounded-full bg-[#E5EEF3] overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  hoursPct >= 90 ? 'bg-[#E5484D]' : hoursPct >= 75 ? 'bg-[#E7A51A]' : 'bg-[#18A878]'
                }`}
                style={{ width: `${hoursPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#526779]">
              <span>Remaining until major overhaul:</span>
              <span className="font-mono font-semibold text-[#102A43]">
                {formatNumber(Math.max(0, threshold - hours))} hrs
              </span>
            </div>
          </div>

          {/* Microgrid / System Dependencies */}
          {isGenerator && (
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#526779] mb-2.5">
                Microgrid & Fuel Dependency
              </h3>
              <div className="rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] p-4 space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="font-bold text-[#1597D4]">FUEL INV-001</span>
                  <ArrowRight size={12} className="text-[#8495A3]" />
                  <span className="font-bold text-[#102A43]">GEN G-01</span>
                  <ArrowRight size={12} className="text-[#8495A3]" />
                  <span className="font-bold text-[#18A878]">280kW GRID</span>
                  <ArrowRight size={12} className="text-[#8495A3]" />
                  <span className="font-bold text-[#E5484D]">HABITAT HEATING</span>
                </div>
                <div className="text-[11.5px] text-[#526779] space-y-1 pt-2 border-t border-[#DCEAF1]">
                  <p>• Consumes: <strong className="text-[#102A43]">1,180 L/day</strong> of Arctic Diesel from Maitri Fuel Farm.</p>
                  <p>• Powers: Life-support heating loop, SATCOM terminal, and cryo-preservation science units.</p>
                  <p>• Redundancy: Secondary Gen G-02 (Cold standby, requires 45m preheating).</p>
                </div>
              </div>
            </div>
          )}

          {/* Telemetry Snapshot */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#526779] mb-2.5">
              Live Sensor Telemetry
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="rounded-xl border border-[#DCEAF1] bg-white p-3">
                <span className="text-[#8495A3] block text-[10px] font-mono uppercase">Lube Oil Pressure</span>
                <span className="font-mono font-bold text-[#102A43]">4.2 bar</span>
                <span className="text-[10.5px] text-[#18A878] block">● Nominal range</span>
              </div>
              <div className="rounded-xl border border-[#DCEAF1] bg-white p-3">
                <span className="text-[#8495A3] block text-[10px] font-mono uppercase">Coolant Temp</span>
                <span className="font-mono font-bold text-[#102A43]">84.6°C</span>
                <span className="text-[10.5px] text-[#18A878] block">● Thermally stable</span>
              </div>
              <div className="rounded-xl border border-[#DCEAF1] bg-white p-3">
                <span className="text-[#8495A3] block text-[10px] font-mono uppercase">Vibration Level</span>
                <span className="font-mono font-bold text-[#102A43]">1.8 mm/s</span>
                <span className="text-[10.5px] text-[#18A878] block">● ISO Class 1 OK</span>
              </div>
              <div className="rounded-xl border border-[#DCEAF1] bg-white p-3">
                <span className="text-[#8495A3] block text-[10px] font-mono uppercase">Station Hub</span>
                <span className="font-bold text-[#102A43] flex items-center gap-1">
                  <MapPin size={11} className="text-[#1597D4]" />
                  {asset.station || 'Maitri Station'}
                </span>
                <span className="text-[10.5px] text-[#526779] block">Primary Power House</span>
              </div>
            </div>
          </div>

          {/* Maintenance Records & Technician */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#526779] mb-2.5">
              Service Schedule
            </h3>
            <div className="divide-y divide-[#F1F7FA] rounded-xl border border-[#DCEAF1] bg-white text-xs">
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Assigned Engineer</span>
                <span className="font-semibold text-[#102A43]">{asset.assigned_technician || 'Vikram Rao (Chief Eng)'}</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Last Filter & Oil Service</span>
                <span className="font-mono text-[#526779]">{asset.last_maintenance || '14 days ago'}</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#526779]">Scheduled Next Inspection</span>
                <span className="font-mono font-bold text-[#1597D4]">{asset.next_maintenance_due || 'In 60 operating hours'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="border-t border-[#DCEAF1] bg-[#F7FBFD] p-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose()
              goTo('risks')
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCEAF1] bg-white px-3.5 py-2 text-xs font-semibold text-[#102A43] hover:bg-[#EAF6FA] transition shadow-xs"
          >
            <ShieldAlert size={13} className="text-[#1597D4]" />
            <span>Trace Cascade</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose()
              goTo('simulator')
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white px-4 py-2 text-xs font-semibold shadow-xs transition"
          >
            <Sliders size={13} />
            <span>Simulate Outage</span>
          </button>
        </div>
      </aside>
    </div>
  )
}
