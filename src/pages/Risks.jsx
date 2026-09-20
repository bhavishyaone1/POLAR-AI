/**
 * MISSION RISK PAGE — SCIENTIFIC SYSTEM DIAGRAM
 * ==============================================
 * Section 9:
 * Headline: Mission Risk
 * Then:
 * FUEL RESUPPLY RISK
 * HIGH
 * 12 days remaining
 * 17 day cargo ETA
 * Potential supply gap: 5 days
 *
 * Then a clean dependency visualization:
 * FUEL → GENERATOR → POWER → HEATING → RESEARCH OPERATIONS
 * Clean horizontal/vertical flow with ice-blue connectors.
 */

import React from 'react'
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Boxes,
  Cpu,
  Flame,
  GitFork,
  Package,
  ShieldAlert,
  Sliders,
  Sparkles,
  ThermometerSnowflake,
  Zap,
} from 'lucide-react'

export default function Risks({ goTo }) {
  const chainNodes = [
    {
      id: 'fuel',
      step: '01',
      label: 'FUEL',
      status: 'CRITICAL WINDOW',
      statusType: 'critical',
      detail: 'Station reserves at 12.0 days runway vs 17.0-day cargo ETA.',
      icon: Flame,
    },
    {
      id: 'gen',
      step: '02',
      label: 'GENERATOR',
      status: 'VULNERABLE',
      statusType: 'warn',
      detail: 'CAT 3512 primary generator unit starved of diesel on Day 12.',
      icon: Cpu,
    },
    {
      id: 'power',
      step: '03',
      label: 'POWER',
      status: 'GRID DROP',
      statusType: 'warn',
      detail: 'Station 280 kW microgrid output collapses by 96%.',
      icon: Zap,
    },
    {
      id: 'heat',
      step: '04',
      label: 'HEATING',
      status: 'THERMAL LOSS',
      statusType: 'warn',
      detail: 'Hydronic glycol heating loops freeze within 18 hours.',
      icon: ThermometerSnowflake,
    },
    {
      id: 'ops',
      step: '05',
      label: 'RESEARCH OPERATIONS',
      status: 'TERMINATION',
      statusType: 'critical',
      detail: 'Paleoclimate ice-core drill halted; specimen cryogenic failure.',
      icon: ShieldAlert,
    },
  ]

  const [mobileSection, setMobileSection] = React.useState(null)

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* ============================================================
          DESKTOP / TABLET RISK VIEW (>= 768px)
          ============================================================ */}
      <div className="hidden md:block space-y-7">
        {/* Headline & Sandbox Launcher */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE8F0] pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-[#0C1E30]">
                Mission Risk
              </h1>
              <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-mono font-bold text-rose-700">
                1 Active Risk
              </span>
            </div>
            <p className="mt-1 text-xs text-[#42586E]">
              Continuous systemic vulnerability detection linking logistics delays to habitat life-support.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => goTo('simulator')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold px-4 py-2.5 text-xs shadow-xs transition active:scale-95"
            >
              <Sliders size={14} />
              <span>Launch What-If Sandbox</span>
            </button>
            <button
              type="button"
              onClick={() => goTo('copilot')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#BAE6FD] bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] font-semibold px-4 py-2.5 text-xs shadow-xs transition active:scale-95"
            >
              <Sparkles size={14} />
              <span>Ask AI Copilot</span>
            </button>
          </div>
        </header>

        {/* Hero Card: Fuel Resupply Risk */}
        <section className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                  Vulnerability Reference: RSK-001
                </span>
                <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-bold text-rose-700">
                  HIGH
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#0C1E30] tracking-tight">
                FUEL RESUPPLY RISK
              </h2>
              <p className="text-xs text-[#42586E] max-w-xl leading-relaxed">
                Fast pack-ice in Prydz Bay delayed MV Vasiliy Golovnin departure; sub-zero ambient (-38°C) increased heating loop burn rate by +8%.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8FAFC] border border-[#DCE8F0] p-4 text-center sm:text-right shrink-0">
              <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">
                Calculated Disparity
              </span>
              <div className="text-3xl font-extrabold font-mono text-rose-600 mt-0.5">
                5.0 Days
              </div>
              <span className="text-xs text-[#42586E] font-medium block">
                Potential supply gap
              </span>
            </div>
          </div>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-4 space-y-1">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#64748B] font-semibold block">
                Station Runway (WHAT / WHEN)
              </span>
              <div className="text-base font-bold font-mono text-rose-600">
                12.0 days remaining
              </div>
              <p className="text-[11.5px] text-[#42586E]">Current reserve: 14,200 Litres</p>
            </div>

            <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-4 space-y-1">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#64748B] font-semibold block">
                Scheduled Replenishment (WHEN)
              </span>
              <div className="text-base font-bold font-mono text-[#0C1E30]">
                Day 17 cargo ETA
              </div>
              <p className="text-[11.5px] text-[#42586E]">Consignments C-101 &amp; C-104 (+3d slip)</p>
            </div>

            <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-4 space-y-1">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#64748B] font-semibold block">
                Target Safety Buffer (WHY)
              </span>
              <div className="text-base font-bold font-mono text-[#0C1E30]">
                14.0 days minimum buffer
              </div>
              <p className="text-[11.5px] text-amber-700 font-semibold">Breached by -2.0 days</p>
            </div>
          </div>
        </section>

        {/* Scientific Dependency System Diagram (IMPACT) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7] block">
                CAUSAL PROPAGATION DIAGRAM (IMPACT)
              </span>
              <h3 className="text-lg font-bold text-[#0C1E30] mt-0.5">
                Operational Failure Cascade
              </h3>
            </div>
            <span className="text-xs text-[#64748B] font-mono">
              Scientific System Diagram · ISO 31000 Standard
            </span>
          </div>

          <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-8 shadow-xs space-y-4">
            {/* Horizontal flow on desktop */}
            <div className="hidden lg:grid grid-cols-5 gap-3 relative">
              {chainNodes.map((node, idx) => {
                const Icon = node.icon
                const isLast = idx === chainNodes.length - 1

                return (
                  <div key={node.id} className="relative flex flex-col justify-between">
                    <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-4 space-y-3 h-full hover:border-[#0284C7] transition">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10.5px] font-bold text-[#64748B]">
                          {node.step}
                        </span>
                        <div className="h-7 w-7 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                          <Icon size={14} />
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-bold tracking-tight text-[#0C1E30]">
                          {node.label}
                        </div>
                        <span
                          className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded mt-1 inline-block ${
                            node.statusType === 'critical'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {node.status}
                        </span>
                      </div>

                      <p className="text-[11.5px] text-[#42586E] leading-relaxed pt-1">
                        {node.detail}
                      </p>
                    </div>

                    {/* Connector Arrow for desktop */}
                    {!isLast && (
                      <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center text-[#0284C7]">
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Vertical flow on tablet */}
            <div className="lg:hidden space-y-3">
              {chainNodes.map((node, idx) => {
                const Icon = node.icon
                const isLast = idx === chainNodes.length - 1

                return (
                  <div key={node.id} className="space-y-3">
                    <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-4 flex items-start gap-3.5">
                      <div className="h-8 w-8 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-bold text-[#0C1E30]">{node.label}</div>
                          <span
                            className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              node.statusType === 'critical'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {node.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#42586E] mt-1">{node.detail}</p>
                      </div>
                    </div>

                    {!isLast && (
                      <div className="flex justify-center text-[#0284C7]">
                        <ArrowDown size={14} strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Footer Navigation Strip (WHAT NEXT) */}
        <footer className="rounded-2xl border border-[#DCE8F0] bg-[#F8FAFC] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[#42586E]">
              Causal link confirmed: A logistics shipping delay directly impacts life support &amp; science missions.
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#0284C7]">
              <span className="text-[#6E8294]">📖 Mission Memory:</span>
              <span className="font-semibold">Fuel risk seen in 5 of 6 past expeditions · Cargo delay seen in 4 of 6</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo('memory')}
              className="inline-flex items-center gap-1.5 font-bold text-[#0284C7] hover:underline"
            >
              <span>View Historical Patterns</span>
              <ArrowRight size={13} />
            </button>
            <button
              type="button"
              onClick={() => goTo('simulator')}
              className="inline-flex items-center gap-1.5 font-bold text-[#0284C7] hover:underline"
            >
              <span>Test in What-If Simulator</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </footer>
      </div>

      {/* ============================================================
          PURPOSE-BUILT MOBILE RISK (< 768px / md:hidden)
          HIGH · Fuel Resupply Gap · Potential 5-day gap · Cargo ETA Day 17 · Safe runway Day 12
          Actions: Why? · Impact · Simulate · AI Analysis
          ============================================================ */}
      <div className="block md:hidden space-y-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-[#DCE8F0] pb-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#0C1E30]">Mission Risk</h1>
            <p className="text-xs text-[#6E8294]">Active Systemic Vulnerability</p>
          </div>
          <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-mono font-bold text-rose-700">
            1 Critical Risk
          </span>
        </div>

        {/* Primary Mobile Risk Card */}
        <div className="rounded-2xl border border-rose-200 bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="rounded bg-rose-100 border border-rose-300 px-2 py-0.5 text-xs font-bold text-rose-800 font-mono">
              HIGH
            </span>
            <span className="text-[11px] font-mono text-[#6E8294]">RSK-001</span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#0C1E30] leading-snug">
              Fuel Resupply Gap
            </h2>
            <div className="mt-1 inline-block text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
              Potential 5-day gap
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10.5px] text-[#6E8294] block uppercase">Cargo ETA</span>
              <span className="font-semibold text-[#0C1E30] text-sm mt-0.5 block">Day 17</span>
              <span className="text-[10.5px] text-amber-700">+3d sea ice hold</span>
            </div>
            <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10.5px] text-[#6E8294] block uppercase">Safe Runway</span>
              <span className="font-semibold text-[#0C1E30] text-sm mt-0.5 block">Day 12</span>
              <span className="text-[10.5px] text-rose-700">14,200 L reserve</span>
            </div>
          </div>

          {/* 4 Large Touch Action Buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 block px-1">
              Operational Actions
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'why' ? null : 'why')}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border font-semibold text-xs min-h-[44px] transition active:scale-95 ${
                  mobileSection === 'why'
                    ? 'bg-[#0284C7] text-white border-[#0284C7]'
                    : 'bg-[#F8FAFC] border-slate-200 text-[#0C1E30]'
                }`}
              >
                <span>Why?</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'impact' ? null : 'impact')}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border font-semibold text-xs min-h-[44px] transition active:scale-95 ${
                  mobileSection === 'impact'
                    ? 'bg-[#0284C7] text-white border-[#0284C7]'
                    : 'bg-[#F8FAFC] border-slate-200 text-[#0C1E30]'
                }`}
              >
                <span>Impact</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('simulator')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] font-semibold text-xs text-[#0C1E30] min-h-[44px] transition active:scale-95"
              >
                <Sliders size={13} />
                <span>Simulate</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('copilot')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-[#BAE6FD] bg-[#E0F2FE] font-semibold text-xs text-[#0284C7] min-h-[44px] transition active:scale-95"
              >
                <Sparkles size={13} />
                <span>AI Analysis</span>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable "Why?" Detail View */}
        {mobileSection === 'why' && (
          <div className="rounded-2xl border border-[#BAE6FD] bg-[#F0F9FF] p-4 text-xs space-y-2 animate-in fade-in duration-200">
            <div className="font-semibold text-[#0C1E30] flex items-center gap-1.5">
              <span className="text-[#0284C7]">✦</span>
              <span>Root Cause Analysis</span>
            </div>
            <p className="text-[#42586E] leading-relaxed">
              Maitri Station operates at an average burn of 1,180 L/day across primary diesel generators. Current stock is 14,200 L, yielding 12.0 days of safe runway. Incoming maritime consignment C-101 is throttled to 3.2 kts by Weddell Sea pack ice, pushing arrival to Day 17.
            </p>
            <div className="font-mono text-[11px] text-rose-700 font-semibold pt-1">
              Result: An unhedged 5.0-day power and heating deficit window.
            </div>
          </div>
        )}

        {/* Expandable "Impact" Vertical Cascade View */}
        {mobileSection === 'impact' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 animate-in fade-in duration-200">
            <div className="text-xs font-semibold text-[#0C1E30] border-b border-slate-100 pb-2">
              Downstream Dependency Cascade
            </div>
            <div className="space-y-2 text-xs">
              {[
                { step: '01', title: 'FUEL', desc: '14,200 L runs out on Day 12; 5-day gap.', color: 'text-rose-700' },
                { step: '02', title: 'GENERATOR', desc: 'CAT 3512 primary starved of diesel fuel.', color: 'text-amber-700' },
                { step: '03', title: 'POWER', desc: 'Microgrid output collapses by 96%.', color: 'text-amber-700' },
                { step: '04', title: 'HEATING', desc: 'Hydronic glycol loops freeze in 18 hours.', color: 'text-amber-700' },
                { step: '05', title: 'RESEARCH', desc: 'Paleoclimate drill halted; cryo loss.', color: 'text-rose-700' },
              ].map((item, idx) => (
                <div key={item.step} className="flex items-start gap-2.5 p-2 rounded-lg bg-[#F8FAFC] border border-slate-100">
                  <span className={`font-mono font-bold text-xs shrink-0 ${item.color}`}>{item.step}</span>
                  <div>
                    <span className="font-bold text-[#0C1E30]">{item.title}: </span>
                    <span className="text-[#42586E]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
