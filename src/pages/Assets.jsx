/**
 * ASSET FLEET & MICROGRID RESILIENCE
 * ==================================
 * Tracks critical polar machinery across stations:
 * Generators, tracked snowcats, heating loops, satcom terminals,
 * and scientific drills with operating hours, service thresholds, and failure risks.
 */

import React, { useState } from 'react'
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  Clock,
  Cpu,
  Filter,
  Flame,
  Plus,
  Radio,
  Search,
  Sliders,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function Assets({ goTo }) {
  const { assets, maintenance, updateAsset } = useData()
  const [filterType, setFilterType] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStation, setSelectedStation] = useState('ALL')

  const filteredAssets = (assets || []).filter((asset) => {
    if (filterType !== 'ALL' && asset.type !== filterType) return false
    if (selectedStation !== 'ALL' && !asset.station?.toLowerCase().includes(selectedStation.toLowerCase())) return false
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      return (
        asset.name?.toLowerCase().includes(q) ||
        asset.id?.toLowerCase().includes(q) ||
        asset.category?.toLowerCase().includes(q)
      )
    }
    return true
  })

  // Group statistics
  const totalAssets = (assets || []).length
  const operationalCount = (assets || []).filter((a) => a.status === 'OPERATIONAL').length
  const maintenanceDueCount = (assets || []).filter((a) => a.status === 'MAINTENANCE_DUE').length
  const highRiskCount = (assets || []).filter((a) => a.failure_risk === 'HIGH' || a.failure_risk === 'CRITICAL').length

  const getConditionBadge = (cond) => {
    switch (cond) {
      case 'EXCELLENT':
        return (
          <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-mono font-semibold text-emerald-700">
            EXCELLENT
          </span>
        )
      case 'GOOD':
        return (
          <span className="rounded-md bg-sky-50 border border-sky-200 px-2 py-0.5 text-[11px] font-mono font-semibold text-sky-700">
            GOOD
          </span>
        )
      case 'SERVICEABLE':
        return (
          <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-mono font-semibold text-amber-700">
            SERVICEABLE
          </span>
        )
      default:
        return (
          <span className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[11px] font-mono font-semibold text-rose-700">
            DEGRADED
          </span>
        )
    }
  }

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'CRITICAL':
        return (
          <span className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10.5px] font-mono font-bold text-rose-700">
            CRITICAL RISK
          </span>
        )
      case 'HIGH':
        return (
          <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10.5px] font-mono font-bold text-amber-700">
            HIGH RISK
          </span>
        )
      case 'MEDIUM':
        return (
          <span className="rounded-md bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10.5px] font-mono font-semibold text-sky-700">
            MEDIUM RISK
          </span>
        )
      default:
        return (
          <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-mono font-semibold text-emerald-700">
            LOW RISK
          </span>
        )
    }
  }

  return (
    <div className="space-y-7">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DDEAF0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1597D4] bg-[#DDF3FA] px-2 py-0.5 rounded-full">
              STATION INFRASTRUCTURE & MICROGRID
            </span>
            <span className="text-[11px] text-[#8495A3] font-mono">TELEMETRY & PREDICTIVE HEALTH</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#12263A]">Critical Station Assets & Microgrids</h1>
          <p className="text-xs text-[#526779] mt-0.5">
            Continuous operating hours tracking, overhaul thresholds, and failure-cascade risk assessment for Antarctic machinery.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDEAF0] bg-white px-3.5 py-2 text-xs font-semibold text-[#12263A] hover:bg-[#F0F8FB] transition shadow-xs"
            onClick={() => goTo('simulator')}
          >
            <Sliders size={14} className="text-[#1597D4]" />
            <span>Simulate Failure</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white px-3.5 py-2 text-xs font-semibold shadow-xs transition"
            onClick={() => goTo('risks')}
          >
            <Activity size={14} />
            <span>Dependency Cascade</span>
          </button>
        </div>
      </div>

      {/* ================= TOP SUMMARY CARDS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
        <div className="rounded-2xl border border-[#DDEAF0] bg-white p-4 sm:p-5 shadow-xs transition hover:border-[#BFDDE7]">
          <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8495A3]">
            <span>Total Fleet Assets</span>
            <Cpu size={15} className="text-[#1597D4]" />
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-[#12263A]">{totalAssets}</p>
          <span className="text-[11px] text-[#526779] mt-1 inline-block">100% telemetry tracked</span>
        </div>

        <div className="rounded-2xl border border-[#DDEAF0] bg-white p-4 sm:p-5 shadow-xs transition hover:border-[#BFDDE7]">
          <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8495A3]">
            <span>Operational Active</span>
            <CheckCircle2 size={15} className="text-[#18A878]" />
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-[#18A878]">{operationalCount}</p>
          <span className="text-[11px] text-[#526779] mt-1 inline-block">Power & traverse ready</span>
        </div>

        <div className="rounded-2xl border border-[#DDEAF0] bg-white p-4 sm:p-5 shadow-xs transition hover:border-[#BFDDE7]">
          <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8495A3]">
            <span>Maintenance Overdue</span>
            <Wrench size={15} className="text-[#E7A51A]" />
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-[#E7A51A]">{maintenanceDueCount}</p>
          <span className="text-[11px] text-[#526779] mt-1 inline-block">Secondary Gen G-02</span>
        </div>

        <div className="rounded-2xl border border-[#DDEAF0] bg-white p-4 sm:p-5 shadow-xs transition hover:border-[#BFDDE7]">
          <div className="flex items-center justify-between text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8495A3]">
            <span>Elevated Risk</span>
            <AlertTriangle size={15} className="text-[#E5484D]" />
          </div>
          <p className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-[#E5484D]">{highRiskCount}</p>
          <span className="text-[11px] text-[#526779] mt-1 inline-block">Spare parts bottleneck</span>
        </div>
      </div>

      {/* ================= FILTER AND SEARCH BAR ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#DDEAF0] bg-white p-3.5 shadow-xs">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8495A3]" />
            <input
              type="text"
              placeholder="Search machinery, generators, snowcats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] pl-9 pr-3 py-1.5 text-xs text-[#12263A] placeholder-[#8495A3] focus:border-[#1597D4] focus:bg-white focus:outline-none transition"
            />
          </div>

          {/* Type filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] px-3 py-1.5 text-xs text-[#12263A] focus:border-[#1597D4] focus:bg-white focus:outline-none transition"
          >
            <option value="ALL">All Asset Types</option>
            <option value="GENERATOR">Generators & Microgrids</option>
            <option value="VEHICLE">Traverse Snowcats & Snowmobiles</option>
            <option value="HEATING">Hydronic Heating Loops</option>
            <option value="COMMUNICATIONS">Satcom & Radio Gateways</option>
            <option value="SCIENTIFIC">Scientific Drills & Radars</option>
            <option value="UTILITY">Desalination & Water Systems</option>
          </select>

          {/* Station filter */}
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] px-3 py-1.5 text-xs text-[#12263A] focus:border-[#1597D4] focus:bg-white focus:outline-none transition"
          >
            <option value="ALL">All Stations / Hubs</option>
            <option value="Maitri">Maitri Station</option>
            <option value="Bharati">Bharati Station</option>
            <option value="Himadri">Himadri Station</option>
            <option value="Novo">Novo Runway</option>
          </select>
        </div>

        <button
          onClick={() => goTo('risks')}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDEAF0] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1597D4] transition hover:bg-[#F0F8FB] shadow-2xs"
        >
          <span>View Dependency Flow</span>
        </button>
      </div>

      {/* ================= ASSETS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => {
          const hoursPct = Math.min(100, Math.round((asset.operating_hours / (asset.threshold_hours || 10000)) * 100))
          const isNearThreshold = hoursPct >= 90

          return (
            <div
              key={asset.id}
              className="flex flex-col justify-between rounded-2xl border border-[#DDEAF0] bg-white p-5 shadow-xs transition hover:border-[#BFDDE7] hover:shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10.5px] uppercase font-semibold text-[#1597D4] bg-[#DDF3FA] px-2 py-0.5 rounded-md inline-block mb-1">
                      {asset.id}
                    </span>
                    <h3 className="font-bold text-[#12263A] text-sm leading-snug">{asset.name}</h3>
                    <p className="text-xs text-[#526779] mt-0.5">{asset.station} · {asset.category}</p>
                  </div>
                  {getRiskBadge(asset.failure_risk)}
                </div>

                {/* Operating hours meter */}
                <div className="mt-4 space-y-1.5 rounded-xl bg-[#F7FBFD] p-3 border border-[#EEF7FA]">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#526779] flex items-center gap-1.5">
                      <Clock size={12} className="text-[#8495A3]" />
                      <span>Operating Hours</span>
                    </span>
                    <span className={`font-mono font-semibold ${isNearThreshold ? 'text-[#E7A51A]' : 'text-[#12263A]'}`}>
                      {asset.operating_hours.toLocaleString()} / {asset.threshold_hours?.toLocaleString()} hrs
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#EAF5F9] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        hoursPct >= 95 ? 'bg-[#E5484D]' : hoursPct >= 80 ? 'bg-[#E7A51A]' : 'bg-[#1597D4]'
                      }`}
                      style={{ width: `${hoursPct}%` }}
                    />
                  </div>
                </div>

                {/* Risk Factors */}
                {asset.risk_factors && asset.risk_factors.length > 0 && (
                  <div className="mt-3.5 space-y-1.5">
                    <p className="text-[10px] uppercase font-mono font-semibold text-[#8495A3]">Risk Assessment Evidence</p>
                    <ul className="text-xs text-[#526779] space-y-1 list-disc list-inside">
                      {asset.risk_factors.map((rf, idx) => (
                        <li key={idx} className="leading-tight">{rf}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom footer */}
              <div className="mt-4 pt-3.5 border-t border-[#EEF7FA] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#8495A3] text-[10.5px] block mb-0.5">Condition</span>
                  {getConditionBadge(asset.condition)}
                </div>
                <div className="text-right">
                  <span className="text-[#8495A3] text-[10.5px] block mb-0.5">Next Service</span>
                  <span className={`font-mono text-xs font-semibold ${asset.status === 'MAINTENANCE_DUE' ? 'text-[#E5484D]' : 'text-[#12263A]'}`}>
                    {asset.next_maintenance_due || 'Scheduled'}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
