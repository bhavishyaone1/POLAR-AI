/**
 * MISSION RISK ENGINE — FOCUSED VIEW
 * ==================================
 * Section 6:
 * Replaces the giant risk matrix with a focused view.
 * Hero: Fuel Resupply Risk
 * Below it:
 * Visual dependency flow:
 * Cargo delayed
 * ↓
 * Inventory runs out
 * ↓
 * Generator stops
 * ↓
 * Heating lost
 * ↓
 * Mission at risk
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
  Wind,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function Risks({ goTo }) {
  const { risks } = useData()

  const fuelRisk = risks?.find((r) => r.id === 'RSK-001') || {
    id: 'RSK-001',
    title: 'Fuel Resupply Window Breach',
    severity: 'CRITICAL',
    station: 'Maitri Station',
    evidence: 'Diesel fuel reserve at 12.0 days runway; resupply cargo C-101 ETA is 17.0 days.',
    impact: 'Station generator fuel starvation, hydronic heating loop freeze, and paleoclimate drill stoppage.',
    urgency: 'Immediate (Within 48h to avoid unrecoverable deficit)',
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <h1 className="text-xl font-bold text-[var(--ink-hi)]">Mission Risk Engine</h1>
            <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-700">
              1 Critical Risk Active
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--ink-mid)]">
            Continuous vulnerability evaluation linking root logistics causes directly to habitat life support.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => goTo('impact')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-[var(--ink-hi)] shadow-sm transition"
          >
            <GitFork size={13} className="text-[var(--ice)]" />
            <span>Impact Analysis</span>
          </button>
          <button
            type="button"
            onClick={() => goTo('simulator')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--ice)] hover:bg-indigo-700 text-white font-semibold px-3.5 py-2 text-xs shadow-sm transition"
          >
            <Sliders size={13} />
            <span>Test In Simulator</span>
          </button>
        </div>
      </header>

      {/* ============================================================
          1. HERO: FUEL RESUPPLY RISK (RSK-001)
          ============================================================ */}
      <section className="rounded-2xl border border-rose-200/80 bg-white p-7 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-rose-600">
                {fuelRisk.id} · {fuelRisk.station}
              </span>
              <h2 className="text-lg font-bold text-[var(--ink-hi)]">
                {fuelRisk.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-700">
              SEVERITY: CRITICAL
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
              Telemetry Evidence
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {fuelRisk.evidence}
            </p>
          </div>

          <div className="rounded-xl bg-rose-50/60 border border-rose-200/70 p-4 space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-700 font-bold block">
              Direct Station Impact
            </span>
            <p className="text-rose-900 leading-relaxed font-medium">
              {fuelRisk.impact}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <span className="font-mono text-slate-500">
            Urgency Level: <strong className="text-rose-600 font-bold">{fuelRisk.urgency}</strong>
          </span>
          <button
            type="button"
            onClick={() => goTo('copilot')}
            className="inline-flex items-center gap-1.5 font-bold text-[var(--ice)] hover:underline"
          >
            <span>Review AI Mitigation Options</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* ============================================================
          2. VISUAL DEPENDENCY FLOW
          Cargo delayed -> Inventory runs out -> Generator stops -> Heating lost -> Mission at risk
          ============================================================ */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-mid)]">
            Visual Dependency Flow
          </h2>
          <p className="text-xs text-[var(--ink-mid)] mt-0.5">
            How a logistics shipping delay cascades into full mission failure:
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-white p-7 sm:p-9 shadow-sm">
          <div className="max-w-md mx-auto space-y-3">
            {/* Step 1 */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 flex items-center gap-3.5 shadow-sm">
              <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Package size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-700">Root Cause</span>
                <h3 className="text-sm font-bold text-slate-900">Cargo Delayed</h3>
                <p className="text-xs text-slate-600">Consignment C-101 resupply ETA pushed to 17 days</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center text-slate-400">
              <ArrowDown size={18} className="text-amber-500" />
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 flex items-center gap-3.5 shadow-sm">
              <div className="h-9 w-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Flame size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-rose-700">Depletion</span>
                <h3 className="text-sm font-bold text-slate-900">Inventory Runs Out</h3>
                <p className="text-xs text-slate-600">Only 12 days remaining fuel creating a 5.0-day shortage gap</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center text-slate-400">
              <ArrowDown size={18} className="text-rose-500" />
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 flex items-center gap-3.5 shadow-sm">
              <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Cpu size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-blue-700">Hardware Failure</span>
                <h3 className="text-sm font-bold text-slate-900">Generator Stops</h3>
                <p className="text-xs text-slate-600">CAT 3512 Generator starved of fuel; microgrid trips</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center text-slate-400">
              <ArrowDown size={18} className="text-blue-500" />
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4 flex items-center gap-3.5 shadow-sm">
              <div className="h-9 w-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <ThermometerSnowflake size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-purple-700">Habitat Impact</span>
                <h3 className="text-sm font-bold text-slate-900">Heating Lost</h3>
                <p className="text-xs text-slate-600">Hydronic glycol heating loop drops below critical freezing limit</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center text-slate-400">
              <ArrowDown size={18} className="text-purple-500" />
            </div>

            {/* Step 5 */}
            <div className="rounded-xl border-2 border-rose-400 bg-rose-50 p-4 flex items-center gap-3.5 shadow-sm">
              <div className="h-9 w-9 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                <ShieldAlert size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-rose-700">Outcome</span>
                <h3 className="text-sm font-bold text-rose-900">Mission At Risk</h3>
                <p className="text-xs text-rose-800">Paleoclimate ice-core drill halt; evacuation protocol triggered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Operational Risks */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-mid)]">
          Monitored Secondary Risks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--line)] bg-white p-5 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-600">RSK-002</span>
              <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                HIGH
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Generator G-021 Service Overdue</h4>
            <p className="text-xs text-slate-600">Operating hours at 4,820h vs 5,000h overhaul cycle.</p>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-white p-5 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-sky-600">RSK-003</span>
              <span className="rounded-full bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-bold text-sky-700">
                MEDIUM
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Novo Runway Blizzard Window</h4>
            <p className="text-xs text-slate-600">Forecast indicates high surface wind gusting to 52 knots.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
