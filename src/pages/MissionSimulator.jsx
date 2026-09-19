/**
 * WHAT-IF SIMULATOR — ARCTIC ICE DECISION-SUPPORT TOOL
 * ====================================================
 * Section 10:
 * Header: WHAT-IF SIMULATOR
 * Question: "What happens if the fuel shipment is delayed?"
 * Input: Delay [ 5 ] days
 * Button: RUN SIMULATION
 *
 * Before: 68 Mission Continuity
 * After: 51 Mission Continuity
 *
 * Impact:
 * Fuel shortage → Generator constraint → Power reduction → Research disruption
 *
 * Recommended Mitigations:
 * 1. Reduce non-critical consumption
 * 2. Prioritize fuel allocation
 * 3. Review alternate cargo routing
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Flame,
  RotateCcw,
  ShieldAlert,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function MissionSimulator({ goTo }) {
  const { approveRecommendation } = useData()

  const [delayDays, setDelayDays] = useState(5)
  const [isSimulating, setIsSimulating] = useState(false)
  const [hasRun, setHasRun] = useState(true)
  const [mitigationAuthorized, setMitigationAuthorized] = useState(false)

  const beforeScore = 68
  const afterScore = Math.max(20, Math.round(beforeScore - delayDays * 3.4))

  const handleRunSimulation = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
      setHasRun(true)
    }, 400)
  }

  const handleReset = () => {
    setDelayDays(0)
    setHasRun(false)
    setMitigationAuthorized(false)
  }

  const handleAuthorize = () => {
    approveRecommendation('REC-001', 'Operations Officer')
    setMitigationAuthorized(true)
  }

  const impactSteps = [
    { label: 'Fuel shortage', desc: '14,200L runs out on Day 12; deficit widens to 10 days' },
    { label: 'Generator constraint', desc: 'CAT 3512 unit trips offline; forced to backup unit' },
    { label: 'Power reduction', desc: 'Station microgrid restricted to essential circuits only' },
    { label: 'Research disruption', desc: 'Paleoclimate drill halted; ice-core sample degradation' },
  ]

  const mitigations = [
    {
      num: '1',
      title: 'Reduce non-critical consumption',
      desc: 'Shed auxiliary laboratory heaters and non-essential traverse recharge bays (+1.8 days runway).',
    },
    {
      num: '2',
      title: 'Prioritize fuel allocation',
      desc: 'Transfer 3,500L Arctic diesel from strategic bladder reserve 02 directly into primary generator (+3.0 days runway).',
    },
    {
      num: '3',
      title: 'Review alternate cargo routing',
      desc: 'Expedite maritime vessel transfer via Troll Station blue-ice corridor to compress ETA by 3 days.',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* ============================================================
          HEADER
          ============================================================ */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-[var(--ice)]" />
            <h1 className="text-2xl font-bold tracking-tight text-[var(--ink-hi)]">
              WHAT-IF SIMULATOR
            </h1>
          </div>
          <p className="mt-1 text-xs text-[var(--ink-mid)]">
            Aerospace-grade decision-support tool · Non-mutating in-memory resilience evaluation.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white hover:bg-[var(--surface-secondary)] px-3.5 py-2 text-xs font-semibold text-[var(--ink-mid)] transition shadow-xs"
        >
          <RotateCcw size={13} />
          <span>Reset Baseline</span>
        </button>
      </header>

      {/* ============================================================
          QUESTION & INPUT
          Question: "What happens if the fuel shipment is delayed?"
          Input: Delay [ 5 ] days  [ RUN SIMULATION ]
          ============================================================ */}
      <section className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-7 md:p-9 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)] block">
            SCENARIO QUESTION
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink-hi)] mt-1">
            "What happens if the fuel shipment is delayed?"
          </h2>
          <p className="text-xs text-[var(--ink-mid)] mt-1">
            Simulate the ripple effects of polar blizzards or transit delays on station life support.
          </p>
        </div>

        <div className="rounded-xl bg-[var(--surface-base)] border border-[var(--line)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-[var(--ink-hi)]">
              Delay:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="20"
                value={delayDays}
                onChange={(e) => {
                  setDelayDays(Math.max(0, Number(e.target.value)))
                  setHasRun(true)
                }}
                className="w-20 rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-center text-base font-bold font-mono text-[var(--ink-hi)] shadow-xs focus:border-[var(--ice)] focus:outline-none"
              />
              <span className="text-sm font-medium text-[var(--ink-mid)]">days</span>
            </div>
            <span className="text-xs text-[var(--ink-low)] font-mono hidden sm:inline">
              (Adjusted C-101 ETA: {17 + delayDays} days)
            </span>
          </div>

          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--ice)] hover:bg-[#3F96B2] text-white font-semibold px-6 py-2.5 text-xs shadow-xs transition active:scale-95 disabled:opacity-50"
          >
            <Sliders size={14} />
            <span>{isSimulating ? 'SIMULATING...' : 'RUN SIMULATION'}</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          PROGRESSIVE RESULTS: BEFORE & AFTER
          Before: 68 Mission Continuity
          After: 51 Mission Continuity
          ============================================================ */}
      {hasRun && (
        <section className="space-y-8 animate-fade-in">
          {/* Comparative Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Before: 68 */}
            <div className="rounded-2xl border border-[var(--line)] bg-white p-7 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
                  Before Simulation
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-[var(--ink-mid)] font-semibold">
                  Baseline
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[var(--ink-hi)]">
                  {beforeScore}
                </div>
                <div className="text-sm font-bold text-[var(--ink-hi)] mt-1">
                  Mission Continuity
                </div>
              </div>

              <p className="text-xs text-[var(--ink-mid)] leading-relaxed pt-1">
                Standard Antarctic operating baseline with emerging 5-day fuel resupply window gap.
              </p>
            </div>

            {/* After: 51 */}
            <div className="rounded-2xl border-2 border-rose-200 bg-white p-7 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700">
                  After (+{delayDays}d Delay)
                </span>
                <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-mono font-bold text-rose-700">
                  CRITICAL IMPACT
                </span>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-rose-600">
                  {afterScore}
                </div>
                <div className="text-sm font-bold text-[var(--ink-hi)] mt-1">
                  Mission Continuity
                </div>
              </div>

              <p className="text-xs text-rose-800 leading-relaxed pt-1">
                Unbuffered 10.0-day shortage gap: Generator shuts down on Day 12; sub-zero freeze exposure.
              </p>
            </div>
          </div>

          {/* ============================================================
              IMPACT CASCADE
              Fuel shortage → Generator constraint → Power reduction → Research disruption
              ============================================================ */}
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-7 md:p-9 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)] block">
                CASCADE CONSEQUENCES
              </span>
              <h3 className="text-lg font-bold text-[var(--ink-hi)] mt-0.5">
                Systemic Impact
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {impactSteps.map((step, idx) => (
                <div key={idx} className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-4 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[var(--ice)] uppercase">
                    Stage 0{idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-[var(--ink-hi)]">
                    {step.label}
                  </h4>
                  <p className="text-xs text-[var(--ink-mid)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================
              RECOMMENDED MITIGATIONS
              1. Reduce non-critical consumption
              2. Prioritize fuel allocation
              3. Review alternate cargo routing
              ============================================================ */}
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-7 md:p-9 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)] block">
                  ACTIONABLE DECISION SUPPORT
                </span>
                <h3 className="text-lg font-bold text-[var(--ink-hi)] mt-0.5">
                  Recommended Mitigations
                </h3>
              </div>
              <span className="text-xs text-[var(--ink-low)] font-mono hidden xs:inline">
                AI Telemetry Linked
              </span>
            </div>

            <div className="space-y-3">
              {mitigations.map((item) => (
                <div
                  key={item.num}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-4 flex items-start gap-3.5 hover:border-[var(--line-hover)] transition"
                >
                  <div className="h-7 w-7 rounded-lg bg-[var(--surface-ice)] border border-[var(--line)] text-[var(--ice)] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    0{item.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[var(--ink-hi)]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[var(--ink-mid)] mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Authorize action button */}
            <div className="pt-2 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-[var(--ink-mid)]">
                Authorizing applies circuit load shedding and reserve bladder release (+4.8 days).
              </span>

              <button
                type="button"
                onClick={handleAuthorize}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--ice)] hover:bg-[#3F96B2] text-white font-semibold px-4 py-2.5 text-xs shadow-xs transition active:scale-95 shrink-0"
              >
                <Sparkles size={13} />
                <span>Authorize Recommended Protocols</span>
              </button>
            </div>

            {mitigationAuthorized && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center justify-between text-xs text-emerald-800">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Mitigation authorized by Operations Officer. Station runway extended to 16.8 days.
                </span>
                <button
                  type="button"
                  onClick={() => goTo('copilot')}
                  className="font-bold underline hover:text-emerald-950"
                >
                  Ask AI Copilot →
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
