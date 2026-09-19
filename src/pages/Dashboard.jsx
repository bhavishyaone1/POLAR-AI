/**
 * MAIN DASHBOARD — REDESIGNED & SIMPLIFIED
 * ========================================
 * POLAR-AI MISSION CONTINUITY INTELLIGENCE
 *
 * Core Concept:
 * Cargo + Inventory + Consumption + Assets + Mission dependencies
 * -> Detects: Risk -> Impact -> Chain Reaction -> Mission Effect -> Recommended Action.
 *
 * Designed for immediate executive clarity:
 * - Top header with station status and prominent [ ▶ RUN DEMO ]
 * - Dominant Mission Continuity hero (Score: 68%, "Attention Required: Fuel resupply may arrive after current safe operating window")
 * - Exactly the 4 key operational cards:
 *   1. Critical Risk (Fuel Resupply Gap)
 *   2. Cargo (C-104 / C-101 in transit, ETA 17d)
 *   3. Inventory (Diesel Fuel 12d remaining, safe window 14d)
 *   4. Asset (Generator G-021 maintenance approaching, run-time high)
 */

import React from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Cpu,
  Flame,
  GitFork,
  Package,
  Play,
  ShieldAlert,
  Sliders,
  Sparkles,
  Bot,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function Dashboard({ goTo, onStartGuidedDemo }) {
  const { continuityMetrics, stats } = useData()

  const continuityScore = continuityMetrics?.score ?? 68

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* ============================================================
          1. TOP HEADER
          ============================================================ */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-display text-2xl font-bold tracking-tight text-[var(--ink-hi)]">
              POLAR-AI
            </span>
            <span className="text-xs font-mono text-mid">·</span>
            <span className="text-sm font-semibold text-[var(--ink-mid)]">
              Maitri Station (Antarctica)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Status: Attention Required
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--ink-mid)]">
            Mission Continuity Intelligence · Continuous resupply & operational dependency forecasting
          </p>
        </div>

        {/* Prominent RUN DEMO Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--ice)] hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 text-sm shadow-sm transition active:scale-[0.98]"
            title="Start step-by-step guided demonstration"
          >
            <Play size={15} className="fill-white" />
            <span>RUN DEMO</span>
          </button>
        </div>
      </header>

      {/* ============================================================
          2. DOMINANT ELEMENT: MISSION CONTINUITY HERO
          ============================================================ */}
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] p-7 sm:p-9 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--line)] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-mid)]">
                Mission Continuity
              </span>
              <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                Attention Required
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[var(--ink-hi)]">
                {continuityScore}%
              </span>
              <span className="text-xs font-mono text-[var(--ink-mid)]">
                Weighted Operational Runway Index
              </span>
            </div>

            <p className="text-base font-medium text-[var(--ink-hi)] max-w-2xl leading-relaxed">
              "Fuel resupply may arrive after current safe operating window."
            </p>
          </div>

          {/* Quick Flow Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => goTo('risks')}
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-base)] hover:bg-[var(--line)]/50 px-4 py-2.5 text-xs font-semibold text-[var(--ink-hi)] transition"
            >
              <span>1. View Risk Details</span>
              <ArrowRight size={13} className="text-[var(--ice)]" />
            </button>
            <button
              type="button"
              onClick={() => goTo('simulator')}
              className="inline-flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-base)] hover:bg-[var(--line)]/50 px-4 py-2.5 text-xs font-semibold text-[var(--ink-hi)] transition"
            >
              <span>2. What-If Simulator</span>
              <Sliders size={13} className="text-[var(--ice)]" />
            </button>
            <button
              type="button"
              onClick={() => goTo('copilot')}
              className="inline-flex items-center justify-between gap-3 rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/60 px-4 py-2.5 text-xs font-semibold text-[var(--ice)] transition"
            >
              <span>3. Ask AI Copilot</span>
              <Bot size={13} />
            </button>
          </div>
        </div>

        {/* Continuity Logic Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--ink-mid)] pt-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--ink-hi)]">Continuity Formula:</span>
            <span>Cargo ETA (17d) − Safe Fuel Window (12d) = 5.0d Projected Deficit</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--ice)]">
            Autonomous Telemetry Synchronization Active
          </span>
        </div>
      </section>

      {/* ============================================================
          3. BELOW IT: ONLY 4 CARDS (CRITICAL RISK, CARGO, INVENTORY, ASSET)
          ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-mid)]">
            Core Operational Drivers
          </h2>
          <span className="text-xs text-[var(--ink-mid)]">4 primary inputs driving 68% score</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Critical Risk */}
          <div
            onClick={() => goTo('risks')}
            className="cursor-pointer rounded-2xl border border-rose-200/80 bg-white p-6 shadow-sm transition hover:border-rose-400 hover:shadow-md space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
                  <AlertTriangle size={15} />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700">
                  1. Critical Risk
                </span>
              </div>
              <span className="rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                CRITICAL
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[var(--ink-hi)] group-hover:text-rose-600 transition">
                Fuel Resupply Gap
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-mid)] leading-relaxed">
                <strong className="text-[var(--ink-hi)]">Impact:</strong> Station generator shutdown
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block">
                Causal Dependency Chain:
              </span>
              <p className="text-xs font-mono text-[var(--ink-hi)] font-medium">
                Fuel → Generator → Power → Science
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-semibold text-rose-600">
              <span>Inspect Risk Dependency</span>
              <ArrowRight size={13} className="transition group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 2: Cargo */}
          <div
            onClick={() => goTo('cargo')}
            className="cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm transition hover:border-[var(--ice)] hover:shadow-md space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                  <Package size={15} />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                  2. Cargo
                </span>
              </div>
              <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                In Transit
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[var(--ink-hi)] group-hover:text-[var(--ice)] transition">
                Consignment C-104 / C-101
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-mid)] leading-relaxed">
                Primary station polar diesel replenishment shipment via Cape Town to Novo Runway.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 flex items-center justify-between text-xs">
              <span className="text-slate-600">Arrival Schedule:</span>
              <span className="font-mono font-bold text-[var(--ink-hi)]">
                ETA: 17 days
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-semibold text-[var(--ice)]">
              <span>View Cargo Pipeline</span>
              <ArrowRight size={13} className="transition group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 3: Inventory */}
          <div
            onClick={() => goTo('inventory')}
            className="cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm transition hover:border-[var(--ice)] hover:shadow-md space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                  <Boxes size={15} />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700">
                  3. Inventory
                </span>
              </div>
              <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                Runway Alert
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[var(--ink-hi)] group-hover:text-[var(--ice)] transition">
                Diesel Fuel Reserve
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-mid)] leading-relaxed">
                Maitri Station central tank farm (14,200 Liters currently stored).
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-600 block">Remaining Runway:</span>
                <span className="font-mono font-bold text-rose-600">12 days remaining</span>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-slate-600 block">Required Margin:</span>
                <span className="font-mono font-bold text-slate-800">Safe window: 14 days</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-semibold text-[var(--ice)]">
              <span>Check Fuel Inventory</span>
              <ArrowRight size={13} className="transition group-hover:translate-x-1" />
            </div>
          </div>

          {/* Card 4: Asset */}
          <div
            onClick={() => goTo('assets')}
            className="cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm transition hover:border-[var(--ice)] hover:shadow-md space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
                  <Cpu size={15} />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
                  4. Asset
                </span>
              </div>
              <span className="rounded-full bg-purple-50 border border-purple-200 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                Action Nearing
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[var(--ink-hi)] group-hover:text-[var(--ice)] transition">
                Generator G-021 (Primary Unit)
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-mid)] leading-relaxed">
                Main caterpillar diesel generator carrying station baseline thermal & microgrid load.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-600 block">Maintenance Status:</span>
                <span className="font-medium text-amber-700">Maintenance approaching</span>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-slate-600 block">Duty Cycle:</span>
                <span className="font-mono font-bold text-slate-800">Run-time: high (4,820h)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-semibold text-[var(--ice)]">
              <span>View Machinery Health</span>
              <ArrowRight size={13} className="transition group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. FAST CORE FLOW FOOTER
          ============================================================ */}
      <footer className="rounded-2xl border border-[var(--line)] bg-[var(--surface-base)] p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-[var(--ink-mid)]">
          <span className="font-bold text-[var(--ink-hi)]">Core Flow:</span>
          <span>DASHBOARD → RISK → IMPACT → SIMULATE → COPILOT</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="font-bold text-[var(--ice)] hover:underline inline-flex items-center gap-1"
          >
            Launch Interactive Guided Walkthrough <ArrowRight size={12} />
          </button>
        </div>
      </footer>
    </div>
  )
}
