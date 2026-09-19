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

  const beforeScore = 63
  const afterScore = Math.max(20, Math.round(beforeScore - (delayDays > 0 ? (delayDays === 5 ? 12 : delayDays * 2.4) : 0)))

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
    <div className="max-w-4xl mx-auto pb-16">
      {/* ============================================================
          DESKTOP / TABLET SIMULATOR VIEW (LOCKED & UNTOUCHED for >= 768px)
          ============================================================ */}
      <div className="hidden md:block space-y-8">
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

      {/* ============================================================
          PURPOSE-BUILT MOBILE SIMULATOR (< 768px / md:hidden)
          WHAT IF? · Fuel shipment delayed · Delay [− 5 DAYS +] · RUN SIMULATION
          63% -> 51% Mission Continuity
          Fuel -> Generator -> Power -> Heating -> Research
          AI Recommendation: Review alternate resupply options before Day 12.
          ============================================================ */}
      <div className="block md:hidden space-y-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-[#DCE8F0] pb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <Sliders size={16} className="text-[#0284C7]" />
              <h1 className="text-xl font-bold tracking-tight text-[#0C1E30]">WHAT IF?</h1>
            </div>
            <p className="text-xs text-[#6E8294]">Fuel shipment delay contingency</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 active:scale-95 transition min-h-[36px]"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>

        {/* Input Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3.5">
          <div>
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#0284C7] font-bold block">
              Simulate Scenario
            </span>
            <h2 className="text-base font-bold text-[#0C1E30] mt-0.5">
              Fuel shipment delayed
            </h2>
            <p className="text-xs text-[#42586E] mt-0.5">
              Adjust expected transit slip to evaluate station continuity.
            </p>
          </div>

          {/* Stepper Control: - [ 5 DAYS ] + */}
          <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-3 flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-[#42586E]">Delay:</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDelayDays((d) => Math.max(0, d - 1))}
                className="h-11 w-11 rounded-xl border border-slate-200 bg-white text-lg font-bold text-[#0C1E30] flex items-center justify-center active:scale-95 shadow-2xs transition"
                aria-label="Decrease days"
              >
                −
              </button>

              <div className="text-center min-w-[80px]">
                <span className="font-mono text-lg font-bold text-[#0C1E30] block">
                  {delayDays} DAYS
                </span>
              </div>

              <button
                type="button"
                onClick={() => setDelayDays((d) => Math.min(20, d + 1))}
                className="h-11 w-11 rounded-xl border border-slate-200 bg-white text-lg font-bold text-[#0C1E30] flex items-center justify-center active:scale-95 shadow-2xs transition"
                aria-label="Increase days"
              >
                +
              </button>
            </div>
          </div>

          {/* Run Simulation Button */}
          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold py-3 text-xs shadow-xs transition active:scale-98 flex items-center justify-center gap-2 min-h-[48px]"
          >
            {isSimulating ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Simulating Scenario...</span>
              </>
            ) : (
              <>
                <Sliders size={14} />
                <span>RUN SIMULATION</span>
              </>
            )}
          </button>
        </div>

        {/* Results Card */}
        {hasRun && (
          <div className="rounded-2xl border border-[#DCE8F0] bg-white p-4 shadow-xs space-y-4 animate-in fade-in duration-200">
            {/* Score Transition */}
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E8F0F5] p-3 text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6E8294] block">
                Mission Continuity
              </span>
              <div className="flex items-center justify-center gap-3 mt-1 font-mono">
                <span className="text-2xl font-bold text-slate-400 line-through">
                  {beforeScore}%
                </span>
                <span className="text-lg text-rose-600 font-bold">→</span>
                <span className="text-3xl font-bold text-rose-700">
                  {afterScore}%
                </span>
              </div>
              <span className="inline-block mt-1 text-[11px] font-mono font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                −{beforeScore - afterScore}% Continuity Drop
              </span>
            </div>

            {/* Impact Chain: Fuel -> Generator -> Power -> Heating -> Research */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 block px-1">
                Systemic Impact Cascade
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {['Fuel', 'Generator', 'Power', 'Heating', 'Research'].map((node, idx) => (
                  <React.Fragment key={node}>
                    <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-1 font-semibold text-[#0C1E30]">
                      {node}
                    </span>
                    {idx < 4 && <span className="text-[#0284C7] font-bold">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="rounded-xl border border-[#BAE6FD] bg-[#F0F9FF] p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0284C7]">
                <Sparkles size={13} />
                <span>AI Recommendation</span>
              </div>
              <p className="text-xs font-medium text-[#0C1E30] leading-normal">
                Review alternate resupply options before Day 12.
              </p>
              <p className="text-[11px] text-[#42586E] leading-relaxed">
                Execute tactical reserve transfer protocol REC-001 to extend runway by +4.8 days and shed auxiliary lab heating.
              </p>

              {!mitigationAuthorized ? (
                <button
                  type="button"
                  onClick={handleAuthorize}
                  className="w-full mt-2 rounded-lg bg-[#0284C7] text-white py-2.5 text-xs font-semibold shadow-2xs active:scale-95 transition min-h-[44px]"
                >
                  Authorize Mitigation REC-001
                </button>
              ) : (
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>Mitigation REC-001 Authorized (+4.8d)</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
