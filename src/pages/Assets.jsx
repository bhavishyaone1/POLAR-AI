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
        return <span className="rounded bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-mono text-emerald-400">EXCELLENT</span>
      case 'GOOD':
        return <span className="rounded bg-sky-950 border border-sky-500/30 px-2 py-0.5 text-[11px] font-mono text-sky-400">GOOD</span>
      case 'SERVICEABLE':
        return <span className="rounded bg-amber-950 border border-amber-500/30 px-2 py-0.5 text-[11px] font-mono text-amber-400">SERVICEABLE</span>
      default:
        return <span className="rounded bg-rose-950 border border-rose-500/30 px-2 py-0.5 text-[11px] font-mono text-rose-400">DEGRADED</span>
    }
  }

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'CRITICAL':
        return <span className="rounded bg-rose-950/80 border border-rose-500/50 px-2 py-0.5 text-[11px] font-mono font-bold text-rose-300">CRITICAL RISK</span>
      case 'HIGH':
        return <span className="rounded bg-orange-950/80 border border-orange-500/50 px-2 py-0.5 text-[11px] font-mono font-bold text-orange-300">HIGH RISK</span>
      case 'MEDIUM':
        return <span className="rounded bg-amber-950/80 border border-amber-500/50 px-2 py-0.5 text-[11px] font-mono text-amber-300">MEDIUM RISK</span>
      default:
        return <span className="rounded bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-mono text-emerald-300">LOW RISK</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Top summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-[#0a1222] p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Fleet Assets</span>
            <Cpu size={15} className="text-cyan-400" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-white">{totalAssets}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">100% telemetry tracked</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0a1222] p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Operational Active</span>
            <CheckCircle2 size={15} className="text-emerald-400" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-emerald-400">{operationalCount}</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">Power & traverse ready</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0a1222] p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Maintenance Overdue</span>
            <Wrench size={15} className="text-amber-400" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-amber-400">{maintenanceDueCount}</p>
          <span className="text-[11px] text-amber-300/80 mt-1 inline-block">Secondary Gen G-02</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#0a1222] p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Elevated Failure Risk</span>
            <AlertTriangle size={15} className="text-rose-400" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-rose-400">{highRiskCount}</p>
          <span className="text-[11px] text-rose-300/80 mt-1 inline-block">Spare parts bottleneck</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#080f1d] p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search machinery, generators, snowcats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900/90 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Type filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-300 focus:border-cyan-400 focus:outline-none"
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
            className="rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-300 focus:border-cyan-400 focus:outline-none"
          >
            <option value="ALL">All Stations / Hubs</option>
            <option value="Maitri">Maitri Station</option>
            <option value="Bharati">Bharati Station</option>
            <option value="Himadri">Himadri Station</option>
            <option value="Novo">Novo Runway</option>
          </select>
        </div>

        <button
          onClick={() => goTo('impact')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-900/50"
        >
          View Dependency Cascade
        </button>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => {
          const hoursPct = Math.min(100, Math.round((asset.operating_hours / (asset.threshold_hours || 10000)) * 100))
          const isNearThreshold = hoursPct >= 90

          return (
            <div
              key={asset.id}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0a1222] p-4 transition hover:border-slate-700"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-cyan-400">{asset.id}</span>
                    <h3 className="font-semibold text-white text-sm mt-0.5 leading-snug">{asset.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{asset.station} · {asset.category}</p>
                  </div>
                  {getRiskBadge(asset.failure_risk)}
                </div>

                {/* Operating hours meter */}
                <div className="mt-4 space-y-1.5 rounded-lg bg-slate-900/60 p-2.5 border border-slate-800/80">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock size={12} />
                      Operating Hours
                    </span>
                    <span className={`font-mono font-semibold ${isNearThreshold ? 'text-amber-400' : 'text-slate-200'}`}>
                      {asset.operating_hours.toLocaleString()} / {asset.threshold_hours?.toLocaleString()} hrs
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        hoursPct >= 95 ? 'bg-rose-500' : hoursPct >= 80 ? 'bg-amber-400' : 'bg-cyan-400'
                      }`}
                      style={{ width: `${hoursPct}%` }}
                    />
                  </div>
                </div>

                {/* Risk Factors */}
                {asset.risk_factors && asset.risk_factors.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-[10px] uppercase font-mono text-slate-400">Risk Assessment Evidence</p>
                    <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                      {asset.risk_factors.map((rf, idx) => (
                        <li key={idx} className="text-slate-300 leading-tight">{rf}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Condition</span>
                  {getConditionBadge(asset.condition)}
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[11px] block">Next Service</span>
                  <span className={`font-mono text-xs font-semibold ${asset.status === 'MAINTENANCE_DUE' ? 'text-rose-400' : 'text-slate-300'}`}>
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
