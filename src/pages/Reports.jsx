/**
 * OPERATIONAL REPORTS & PITCH PRESENTATION MODE
 * =============================================
 * Generates structured mission continuity reports, logistics forecasts,
 * and includes the executive PPT Presentation Deck directly inside the platform.
 */

import React, { useState } from 'react'
import {
  CheckCircle2,
  Download,
  FileText,
  Layers,
  Printer,
  Share2,
  Sparkles,
  TrendingUp,
  XCircle,
} from 'lucide-react'
import { SYSTEM_USP } from '../data/polarIntelligenceData'
import { useData } from '../store/DataContext'

export default function Reports({ goTo }) {
  const { continuityMetrics, stats, inventory, cargo, risks, auditLogs } = useData()
  const [activeTab, setActiveTab] = useState('PRESENTATION') // 'PRESENTATION' | 'CONTINUITY' | 'LOGISTICS'

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="rounded-xl border border-slate-800 bg-[#081020] p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText size={20} className="text-cyan-400" />
            Executive Reports & Presentation Mode
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Real-time audit summaries, forward logistics forecasts, and the formal PPT comparative briefing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            <Printer size={13} />
            Print / Export PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('PRESENTATION')}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
            activeTab === 'PRESENTATION'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          PPT Presentation Comparison Mode
        </button>

        <button
          onClick={() => setActiveTab('CONTINUITY')}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
            activeTab === 'CONTINUITY'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Daily Mission Continuity Audit
        </button>

        <button
          onClick={() => setActiveTab('LOGISTICS')}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
            activeTab === 'LOGISTICS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Resupply & Cargo Window Audit
        </button>
      </div>

      {/* TAB 1: PPT PRESENTATION COMPARISON (FROM YOUR SLIDE) */}
      {activeTab === 'PRESENTATION' && (
        <div className="space-y-6">
          {/* Executive Slide Banner */}
          <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-[#0b162b] via-[#070e1d] to-[#040810] p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/50 px-3 py-1 text-xs font-mono uppercase tracking-wider text-cyan-300">
              <Sparkles size={13} />
              Pitch Deck · Slide 4: System Comparison & Core USP
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Traditional Polar Systems vs. POLAR-AI
            </h3>

            <blockquote className="rounded-xl border-l-4 border-cyan-400 bg-cyan-950/40 p-4 text-base sm:text-lg italic text-slate-100 font-medium">
              "{SYSTEM_USP.tagline}"
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              In polar research stations, finding out that fuel has run dry after the fact is a catastrophe. POLAR-AI replaces passive recording with forward causal intelligence.
            </p>
          </div>

          {/* Clean 2-Column Comparison Table for Slide */}
          <div className="overflow-hidden rounded-xl border border-slate-700/80 bg-[#080f1d] shadow-xl">
            <div className="grid grid-cols-2 divide-x divide-slate-800 bg-slate-900/90 text-xs font-mono uppercase font-bold tracking-wider">
              <div className="p-4 text-rose-400 flex items-center gap-2">
                <XCircle size={16} />
                Traditional System
              </div>
              <div className="p-4 text-cyan-300 flex items-center gap-2 bg-cyan-950/30">
                <CheckCircle2 size={16} />
                Our System (POLAR-AI)
              </div>
            </div>

            <div className="divide-y divide-slate-800/80 text-sm">
              {SYSTEM_USP.traditionalVsPolarAi.map((row) => (
                <div key={row.id} className="grid grid-cols-2 divide-x divide-slate-800/80 hover:bg-slate-800/30 transition">
                  <div className="p-4 text-slate-400 font-medium">
                    {row.traditional}
                  </div>
                  <div className="p-4 text-cyan-200 font-semibold bg-cyan-950/10 flex items-center justify-between">
                    <span>{row.polarAi}</span>
                    <span className="text-[10px] font-mono rounded bg-cyan-950 px-2 py-0.5 border border-cyan-500/30 text-cyan-300">
                      {row.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DAILY MISSION CONTINUITY AUDIT */}
      {activeTab === 'CONTINUITY' && (
        <div className="space-y-5 rounded-xl border border-slate-800 bg-[#0a1224] p-6 text-slate-200">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                Official Operational Report
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Antarctic Expedition Continuity Audit</h3>
              <p className="text-xs text-slate-400 mt-0.5">Station Maitri & Schirmacher Forward Sector</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-amber-400">{continuityMetrics?.score ?? 68}%</span>
              <span className="text-[10px] font-mono text-slate-400 block">Mission Continuity Index</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">Continuity Contributors</h4>
            <div className="space-y-2">
              {continuityMetrics?.contributors?.map((c) => (
                <div
                  key={c.id}
                  className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-semibold text-white block">{c.label}</span>
                    <span className="text-slate-400 text-[11px] mt-0.5 block">{c.evidence}</span>
                  </div>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded text-xs shrink-0 ${
                      c.delta < 0 ? 'bg-rose-950 text-rose-300 border border-rose-500/30' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {c.delta > 0 ? `+${c.delta}` : c.delta} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RESUPPLY & CARGO AUDIT */}
      {activeTab === 'LOGISTICS' && (
        <div className="space-y-5 rounded-xl border border-slate-800 bg-[#0a1224] p-6 text-slate-200">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Critical Resource Resupply Schedule</h3>
            <span className="text-xs font-mono text-cyan-400">Novo Corridor Telemetry</span>
          </div>

          <div className="divide-y divide-slate-800/80 text-xs">
            {(inventory || []).filter((i) => i.resupply_cargo_id).map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white">{item.item_name}</span>
                  <span className="text-slate-400 block text-[11px]">
                    Current: {item.quantity} {item.unit} · Burn: {item.daily_burn_rate} {item.unit}/day
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-300">
                    Linked Cargo: {item.resupply_cargo_id}
                  </span>
                  <span className="text-slate-400 block text-[11px]">Buffer: {item.safety_buffer_days} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
