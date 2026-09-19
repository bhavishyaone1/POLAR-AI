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
    <div className="space-y-7">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DDEAF0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1597D4] bg-[#DDF3FA] px-2 py-0.5 rounded-full">
              MISSION INTELLIGENCE REPORTS
            </span>
            <span className="text-[11px] text-[#8495A3] font-mono">EXECUTIVE BRIEFING</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#12263A]">Operational Reports & Presentation Deck</h1>
          <p className="text-xs text-[#526779] mt-0.5">
            Real-time audit summaries, forward logistics forecasts, and the formal system comparative briefing.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDEAF0] bg-white px-3.5 py-2 text-xs font-semibold text-[#12263A] hover:bg-[#F0F8FB] transition shadow-xs"
          >
            <Printer size={13} className="text-[#1597D4]" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#DDEAF0] pb-2">
        <button
          onClick={() => setActiveTab('PRESENTATION')}
          className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
            activeTab === 'PRESENTATION'
              ? 'bg-[#1597D4] text-white shadow-xs'
              : 'text-[#526779] hover:text-[#12263A] hover:bg-white'
          }`}
        >
          PPT Presentation Comparison Mode
        </button>

        <button
          onClick={() => setActiveTab('CONTINUITY')}
          className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
            activeTab === 'CONTINUITY'
              ? 'bg-[#1597D4] text-white shadow-xs'
              : 'text-[#526779] hover:text-[#12263A] hover:bg-white'
          }`}
        >
          Daily Mission Continuity Audit
        </button>

        <button
          onClick={() => setActiveTab('LOGISTICS')}
          className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
            activeTab === 'LOGISTICS'
              ? 'bg-[#1597D4] text-white shadow-xs'
              : 'text-[#526779] hover:text-[#12263A] hover:bg-white'
          }`}
        >
          Resupply & Cargo Window Audit
        </button>
      </div>

      {/* TAB 1: PPT PRESENTATION COMPARISON */}
      {activeTab === 'PRESENTATION' && (
        <div className="space-y-6">
          {/* Executive Slide Banner */}
          <div className="rounded-2xl border border-[#DDEAF0] bg-gradient-to-br from-white via-[#F7FBFD] to-[#EEF9FC] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DDF3FA] bg-[#EEF9FC] px-3 py-1 text-xs font-mono uppercase tracking-wider text-[#1597D4] font-semibold">
              <Sparkles size={13} />
              Pitch Deck · Slide 4: System Comparison & Core USP
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#12263A] tracking-tight">
              Traditional Polar Systems vs. POLAR-AI
            </h3>

            <blockquote className="rounded-xl border-l-4 border-[#1597D4] bg-[#DDF3FA]/60 p-4 text-sm sm:text-base italic text-[#12263A] font-medium leading-relaxed">
              "{SYSTEM_USP.tagline}"
            </blockquote>

            <p className="text-xs sm:text-sm text-[#526779] max-w-3xl leading-relaxed">
              In polar research stations, finding out that fuel has run dry after the fact is a catastrophe. POLAR-AI replaces passive inventory records with continuous forward causal intelligence.
            </p>
          </div>

          {/* Clean 2-Column Comparison Table for Slide */}
          <div className="overflow-hidden rounded-2xl border border-[#DDEAF0] bg-white shadow-xs">
            <div className="grid grid-cols-2 divide-x divide-[#DDEAF0] bg-[#F7FBFD] text-xs font-mono uppercase font-bold tracking-wider border-b border-[#DDEAF0]">
              <div className="p-4 text-[#E5484D] flex items-center gap-2">
                <XCircle size={16} />
                <span>Traditional Systems</span>
              </div>
              <div className="p-4 text-[#1597D4] flex items-center gap-2 bg-[#EEF9FC]/60">
                <CheckCircle2 size={16} />
                <span>POLAR-AI (Mission Continuity)</span>
              </div>
            </div>

            <div className="divide-y divide-[#EEF7FA] text-sm">
              {SYSTEM_USP.traditionalVsPolarAi.map((row) => (
                <div key={row.id} className="grid grid-cols-2 divide-x divide-[#DDEAF0] hover:bg-[#F7FBFD] transition">
                  <div className="p-4 text-[#526779] font-medium text-xs sm:text-sm">
                    {row.traditional}
                  </div>
                  <div className="p-4 text-[#12263A] font-semibold bg-[#EEF9FC]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span>{row.polarAi}</span>
                    <span className="text-[10px] font-mono rounded-md bg-[#DDF3FA] px-2 py-0.5 border border-[#BFDDE7] text-[#1597D4] shrink-0 font-bold">
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
        <div className="space-y-5 rounded-2xl border border-[#DDEAF0] bg-white p-6 shadow-xs">
          <div className="border-b border-[#DDEAF0] pb-4 flex items-center justify-between">
            <div>
              <span className="text-[10.5px] font-mono font-bold text-[#1597D4] uppercase tracking-widest block">
                Official Operational Report
              </span>
              <h3 className="text-lg font-bold text-[#12263A] mt-1">Antarctic Expedition Continuity Audit</h3>
              <p className="text-xs text-[#526779] mt-0.5">Station Maitri & Schirmacher Forward Sector</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold font-mono text-[#E7A51A]">{continuityMetrics?.score ?? 68}%</span>
              <span className="text-[10.5px] font-mono text-[#8495A3] block">Mission Continuity Index</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#8495A3] font-bold">Continuity Contributors</h4>
            <div className="space-y-2.5">
              {continuityMetrics?.contributors?.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-[#DDEAF0] bg-[#F7FBFD] p-3.5 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-[#12263A] block">{c.label}</span>
                    <span className="text-[#526779] text-[11.5px] mt-0.5 block">{c.evidence}</span>
                  </div>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded-md text-xs shrink-0 ${
                      c.delta < 0 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
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
        <div className="space-y-5 rounded-2xl border border-[#DDEAF0] bg-white p-6 shadow-xs">
          <div className="border-b border-[#DDEAF0] pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-[#12263A]">Critical Resource Resupply Schedule</h3>
            <span className="text-xs font-mono text-[#1597D4] font-semibold">Novo Corridor Telemetry</span>
          </div>

          <div className="divide-y divide-[#EEF7FA] text-xs">
            {(inventory || []).filter((i) => i.resupply_cargo_id).map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#12263A] text-sm">{item.item_name}</span>
                  <span className="text-[#526779] block text-[11px] mt-0.5">
                    Current: <strong className="font-mono text-[#12263A]">{item.quantity}</strong> {item.unit} · Burn: <strong className="font-mono text-[#12263A]">{item.daily_burn_rate}</strong> {item.unit}/day
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-[#1597D4] bg-[#DDF3FA] px-2 py-0.5 rounded-md">
                    Linked Cargo: {item.resupply_cargo_id}
                  </span>
                  <span className="text-[#8495A3] block text-[11px] mt-1">Buffer: {item.safety_buffer_days} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
