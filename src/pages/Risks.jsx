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

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* ============================================================
          HEADLINE
          ============================================================ */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--ink-hi)]">
              Mission Risk
            </h1>
            <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-mono font-bold text-rose-700">
              1 Active Risk
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--ink-mid)]">
            Continuous systemic vulnerability detection linking logistics delays to habitat life-support.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => goTo('simulator')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--ice)] hover:bg-[#3F96B2] text-white font-semibold px-4 py-2 text-xs shadow-xs transition"
          >
            <Sliders size={13} />
            <span>Launch What-If Sandbox</span>
          </button>
        </div>
      </header>

      {/* ============================================================
          HERO: FUEL RESUPPLY RISK
          HIGH · 12 days remaining · 17 day cargo ETA · Potential supply gap: 5 days
          ============================================================ */}
      <section className="rounded-2xl border border-[var(--line)] bg-white p-7 sm:p-9 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
                Vulnerability Reference: RSK-001
              </span>
              <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-bold text-rose-700">
                HIGH
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--ink-hi)]">
              FUEL RESUPPLY RISK
            </h2>
            <p className="text-xs text-[var(--ink-mid)] max-w-xl">
              Antarctic winter logistics gap detected between station consumption burn and vessel Novo Runway staging.
            </p>
          </div>

          <div className="rounded-xl bg-[var(--surface-base)] border border-[var(--line)] p-4 text-center sm:text-right shrink-0">
            <span className="text-[10px] font-mono uppercase text-[var(--ink-low)] block">
              Calculated Disparity
            </span>
            <div className="text-2xl font-extrabold font-mono text-rose-600 mt-0.5">
              5.0 Days
            </div>
            <span className="text-[11px] text-[var(--ink-mid)] font-medium block">
              Potential supply gap
            </span>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-low)] font-semibold block">
              Station Runway
            </span>
            <div className="text-base font-bold font-mono text-rose-600">
              12 days remaining
            </div>
            <p className="text-[11px] text-[var(--ink-mid)]">Current stock: 14,200 Liters</p>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-low)] font-semibold block">
              Scheduled Replenishment
            </span>
            <div className="text-base font-bold font-mono text-[var(--ink-hi)]">
              17 day cargo ETA
            </div>
            <p className="text-[11px] text-[var(--ink-mid)]">Consignment C-101 / C-104</p>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-low)] font-semibold block">
              Target Safety Threshold
            </span>
            <div className="text-base font-bold font-mono text-[var(--ink-hi)]">
              14.0 days safe buffer
            </div>
            <p className="text-[11px] text-amber-700 font-medium">Breached by -2.0 days</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SCIENTIFIC DEPENDENCY SYSTEM DIAGRAM
          FUEL → GENERATOR → POWER → HEATING → RESEARCH OPERATIONS
          ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)] block">
              CAUSAL PROPAGATION DIAGRAM
            </span>
            <h3 className="text-lg font-bold text-[var(--ink-hi)] mt-0.5">
              Operational Failure Cascade
            </h3>
          </div>
          <span className="text-xs text-[var(--ink-low)] font-mono">
            Scientific System Diagram · ISO 31000 Standard
          </span>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-white p-7 sm:p-9 shadow-xs space-y-4">
          {/* Horizontal flow on desktop / vertical on small */}
          <div className="hidden lg:grid grid-cols-5 gap-3 relative">
            {chainNodes.map((node, idx) => {
              const Icon = node.icon
              const isLast = idx === chainNodes.length - 1

              return (
                <div key={node.id} className="relative flex flex-col justify-between">
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-4 space-y-3 h-full hover:border-[var(--ice)] transition">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-[var(--ink-low)]">
                        {node.step}
                      </span>
                      <div className="h-7 w-7 rounded-lg bg-[var(--surface-ice)] text-[var(--ice)] flex items-center justify-center">
                        <Icon size={14} />
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-bold tracking-tight text-[var(--ink-hi)]">
                        {node.label}
                      </div>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded mt-1 inline-block ${
                          node.statusType === 'critical'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-[var(--ink-mid)] leading-relaxed pt-1">
                      {node.detail}
                    </p>
                  </div>

                  {/* Connector Arrow for desktop */}
                  {!isLast && (
                    <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center text-[var(--ice)]">
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Vertical flow on tablet/mobile */}
          <div className="lg:hidden space-y-3">
            {chainNodes.map((node, idx) => {
              const Icon = node.icon
              const isLast = idx === chainNodes.length - 1

              return (
                <div key={node.id} className="space-y-3">
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-4 flex items-start gap-3.5">
                    <div className="h-8 w-8 rounded-lg bg-[var(--surface-ice)] text-[var(--ice)] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-[var(--ink-hi)]">{node.label}</div>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                            node.statusType === 'critical'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {node.status}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--ink-mid)] mt-1">{node.detail}</p>
                    </div>
                  </div>

                  {!isLast && (
                    <div className="flex justify-center text-[var(--ice)]">
                      <ArrowDown size={14} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer Navigation Strip */}
      <footer className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <span className="text-[var(--ink-mid)]">
          Causal link confirmed: A logistics shipping delay directly impacts life support & science missions.
        </span>
        <button
          type="button"
          onClick={() => goTo('simulator')}
          className="inline-flex items-center gap-1 font-bold text-[var(--ice)] hover:underline"
        >
          <span>Test In What-If Simulator</span>
          <ArrowRight size={13} />
        </button>
      </footer>
    </div>
  )
}
