/**
 * OPERATIONAL RISK ENGINE & RISK MATRIX
 * =====================================
 * Formal 5x5 Probability × Impact Risk Matrix.
 * Categorizes vulnerabilities across Logistics, Inventory, Machinery,
 * Climate, and Safety with evidence and actionable recommendations.
 */

import React, { useState } from 'react'
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock,
  Cpu,
  Filter,
  Flame,
  Layers,
  Package,
  Search,
  ShieldAlert,
  Wind,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function Risks({ goTo }) {
  const { risks, recommendations } = useData()
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedSeverity, setSelectedSeverity] = useState('ALL')

  const filteredRisks = (risks || []).filter((r) => {
    if (selectedCategory !== 'ALL' && r.category !== selectedCategory) return false
    if (selectedSeverity !== 'ALL' && r.severity !== selectedSeverity) return false
    return true
  })

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="rounded bg-rose-950 border border-rose-500/50 px-2 py-0.5 text-[11px] font-mono font-bold text-rose-300">CRITICAL</span>
      case 'HIGH':
        return <span className="rounded bg-orange-950 border border-orange-500/50 px-2 py-0.5 text-[11px] font-mono font-bold text-orange-300">HIGH</span>
      case 'MEDIUM':
        return <span className="rounded bg-amber-950 border border-amber-500/50 px-2 py-0.5 text-[11px] font-mono text-amber-300">MEDIUM</span>
      default:
        return <span className="rounded bg-emerald-950 border border-emerald-500/50 px-2 py-0.5 text-[11px] font-mono text-emerald-300">LOW</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="rounded-xl border border-slate-800 bg-[#081020] p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-400" />
            Operational Risk Engine & Matrix
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Systematic vulnerability detection linking root causes directly to downstream mission schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo('impact')}
            className="rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-900/40"
          >
            Trace Impact Cascade →
          </button>
        </div>
      </div>

      {/* 5x5 Probability x Impact Visual Grid & Active Risk Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Risk Matrix (1 col) */}
        <div className="rounded-xl border border-slate-800 bg-[#070e1c] p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-300">
              5×5 Risk Matrix (Likelihood × Impact)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">ISO 31000 Standard</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px] pt-1">
            <div className="rounded bg-amber-950/40 border border-amber-500/20 p-2 text-amber-300">
              <span>Low Prob · High</span>
              <span className="block font-bold text-sm mt-0.5">1</span>
            </div>
            <div className="rounded bg-orange-950/60 border border-orange-500/30 p-2 text-orange-300">
              <span>Med Prob · High</span>
              <span className="block font-bold text-sm mt-0.5">2</span>
            </div>
            <div className="rounded bg-rose-950/80 border border-rose-500/50 p-2 text-rose-300 shadow-md shadow-rose-900/30">
              <span>High Prob · Crit</span>
              <span className="block font-bold text-sm mt-0.5">2</span>
            </div>

            <div className="rounded bg-emerald-950/30 border border-emerald-500/20 p-2 text-emerald-300">
              <span>Low Prob · Med</span>
              <span className="block font-bold text-sm mt-0.5">0</span>
            </div>
            <div className="rounded bg-amber-950/40 border border-amber-500/20 p-2 text-amber-300">
              <span>Med Prob · Med</span>
              <span className="block font-bold text-sm mt-0.5">1</span>
            </div>
            <div className="rounded bg-orange-950/60 border border-orange-500/30 p-2 text-orange-300">
              <span>High Prob · Med</span>
              <span className="block font-bold text-sm mt-0.5">1</span>
            </div>

            <div className="rounded bg-emerald-950/20 border border-emerald-500/10 p-2 text-emerald-400">
              <span>Low Prob · Low</span>
              <span className="block font-bold text-sm mt-0.5">0</span>
            </div>
            <div className="rounded bg-emerald-950/30 border border-emerald-500/20 p-2 text-emerald-300">
              <span>Med Prob · Low</span>
              <span className="block font-bold text-sm mt-0.5">0</span>
            </div>
            <div className="rounded bg-amber-950/40 border border-amber-500/20 p-2 text-amber-300">
              <span>High Prob · Low</span>
              <span className="block font-bold text-sm mt-0.5">0</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-2">
            <strong>RSK-001</strong> (Fuel Resupply Window Breach) occupies the Critical/High quadrant, requiring immediate human officer intervention.
          </p>
        </div>

        {/* Risk Registry List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-[#091222] p-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-200 focus:border-cyan-400 focus:outline-none"
              >
                <option value="ALL">All Categories</option>
                <option value="LOGISTICS_INVENTORY">Logistics & Inventory</option>
                <option value="LOGISTICS">Logistics Only</option>
                <option value="ASSET">Machinery & Assets</option>
                <option value="ENVIRONMENT">Severe Climate</option>
                <option value="INVENTORY">Inventory Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Severity:</span>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="rounded border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-200 focus:border-cyan-400 focus:outline-none"
              >
                <option value="ALL">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
              </select>
            </div>
          </div>

          {/* Risks Cards */}
          <div className="space-y-3">
            {filteredRisks.map((risk) => (
              <div
                key={risk.id}
                className="rounded-xl border border-slate-800 bg-[#0a1326] p-4 transition hover:border-slate-700 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{risk.id}</span>
                      <span className="text-xs font-mono text-slate-400">· {risk.station}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm mt-0.5">{risk.title}</h4>
                  </div>
                  {getSeverityBadge(risk.severity)}
                </div>

                {/* Evidence & Impact */}
                <div className="rounded-lg bg-slate-900/80 p-3 border border-slate-800/80 space-y-2 text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-cyan-400 block font-semibold">
                      Telemetry Evidence
                    </span>
                    <p className="text-slate-300 mt-0.5">{risk.evidence}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase text-rose-400 block font-semibold">
                      Potential Mission Impact
                    </span>
                    <p className="text-slate-300 mt-0.5">{risk.impact}</p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="font-mono text-[11px] text-slate-400">
                    Urgency: <strong className="text-amber-300">{risk.urgency}</strong>
                  </span>

                  <button
                    onClick={() => goTo('copilot')}
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    View AI Mitigation
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
