/**
 * WHAT-IF SIMULATOR — CLEAN & SIMPLE
 * ===================================
 * Section 6:
 * Question:
 * "What would happen if fuel is delayed?"
 * Input:
 * Delay: [ 5 ] days
 * [ Run Simulation ]
 * Output:
 * Before: 68%
 * After: 51%
 * Mitigation options
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Package,
  RotateCcw,
  Sliders,
  Sparkles,
  TrendingDown,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function MissionSimulator({ goTo }) {
  const { approveRecommendation } = useData()

  const [delayDays, setDelayDays] = useState(5)
  const [hasRun, setHasRun] = useState(true)
  const [actionAuthorized, setActionAuthorized] = useState(false)

  // Baseline is 68%. Adding delayDays drops score deterministically:
  // For 5 days delay: drops to 51% exactly as specified in the prompt.
  const beforeScore = 68
  const afterScore = Math.max(20, Math.round(beforeScore - delayDays * 3.4))
  const shortageDays = 5.0 + delayDays

  const handleRunSimulation = () => {
    setHasRun(true)
  }

  const handleReset = () => {
    setDelayDays(0)
    setHasRun(false)
  }

  const handleAuthorize = (title) => {
    approveRecommendation('REC-001', 'Operations Officer')
    setActionAuthorized(true)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-[var(--ice)]" />
            <h1 className="text-xl font-bold text-[var(--ink-hi)]">What-If Continuity Simulator</h1>
          </div>
          <p className="mt-1 text-xs text-[var(--ink-mid)]">
            Non-mutating resilience sandbox · Test hypothetical logistics delays without altering live data.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition"
        >
          <RotateCcw size={13} />
          <span>Reset Baseline</span>
        </button>
      </header>

      {/* ============================================================
          QUESTION & INPUT CARD
          ============================================================ */}
      <section className="rounded-2xl border border-[var(--line)] bg-white p-7 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)] block">
            RESILIENCE QUERY
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            "What would happen if fuel is delayed?"
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate downstream mission continuity score and resource shortage windows.
          </p>
        </div>

        {/* Input: Delay [ 5 ] days + Run Simulation */}
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-800">
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
                className="w-20 rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-base font-bold text-slate-900 shadow-sm focus:border-[var(--ice)] focus:outline-none"
              />
              <span className="text-sm font-semibold text-slate-700">days</span>
            </div>
            <span className="text-xs text-slate-500 hidden md:inline">
              (Consignment C-101 ETA: {17 + delayDays} days)
            </span>
          </div>

          <button
            type="button"
            onClick={handleRunSimulation}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--ice)] hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 text-sm shadow-sm transition active:scale-95"
          >
            <Sliders size={15} />
            <span>Run Simulation</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          OUTPUT: BEFORE (68%) VS AFTER (51%)
          ============================================================ */}
      {hasRun && (
        <section className="rounded-2xl border border-[var(--line)] bg-white p-7 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Simulation Telemetry Output
            </span>
            <span className="text-xs font-mono text-rose-600 font-bold">
              Projected Shortage Gap: {shortageDays.toFixed(1)} Days Deficit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Before: 68% */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-500 block">
                Before Perturbation
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-800">
                  {beforeScore}%
                </span>
                <span className="text-xs text-slate-500 font-medium">Attention Required</span>
              </div>
              <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                Nominal 5-day fuel resupply shortage gap before adding blizzard perturbations.
              </p>
            </div>

            {/* After: 51% */}
            <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/40 p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-rose-700 block">
                  After (+{delayDays}d Delay)
                </span>
                <span className="rounded-full bg-rose-100 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-800">
                  CRITICAL DEFICIT
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-rose-600">
                  {afterScore}%
                </span>
                <span className="text-xs text-rose-700 font-semibold">
                  (-{beforeScore - afterScore}% Delta)
                </span>
              </div>
              <p className="text-xs text-rose-800 pt-1 leading-relaxed">
                Severe depletion risk: Generator starves on Day 12; {shortageDays.toFixed(1)} days of unbuffered sub-zero habitat exposure.
              </p>
            </div>
          </div>

          {/* ============================================================
              MITIGATION OPTIONS
              ============================================================ */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)] flex items-center gap-1.5">
                <Sparkles size={14} />
                Calculated Mitigation Options
              </span>
              <span className="text-xs text-slate-500">Human Approval Required</span>
            </div>

            <div className="space-y-2.5">
              {/* Option 1 */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      Activate Strategic Fuel Reserves
                    </h3>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      +3.0 Days Runway
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Transfer 3,500 L arctic diesel from reserve bladder 02 into main generator tank.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAuthorize('Strategic Reserves')}
                  className="shrink-0 rounded-xl bg-[var(--ice)] hover:bg-indigo-700 text-white font-semibold px-4 py-2 text-xs shadow-sm transition"
                >
                  Authorize Action
                </button>
              </div>

              {/* Option 2 */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      Level-1 Circuit Load Shedding
                    </h3>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      +1.8 Days Runway
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Shed non-critical core sample drill heaters; preserve living habitat thermal loop.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleAuthorize('Load Shedding')}
                  className="shrink-0 rounded-xl bg-[var(--ice)] hover:bg-indigo-700 text-white font-semibold px-4 py-2 text-xs shadow-sm transition"
                >
                  Authorize Action
                </button>
              </div>
            </div>

            {actionAuthorized && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center justify-between text-xs text-emerald-800">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Mitigation authorized by Operations Officer. Stamped in cryptographic audit log.
                </span>
                <button
                  type="button"
                  onClick={() => goTo('copilot')}
                  className="font-bold underline hover:text-emerald-950"
                >
                  View in AI Copilot →
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
