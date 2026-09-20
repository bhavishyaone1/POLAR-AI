/**
 * POLAR-AI — CLEAN WHAT-IF SIMULATOR
 * ====================================
 * Kept extremely simple as per user specifications:
 *
 * Question: WHAT IF CARGO IS DELAYED?
 * Delay: [ 5 days ]
 * [Run Simulation]
 *
 * Then show only:
 * Mission Health: 63 → 51
 * Affected: Fuel, Power, Heating, Research
 * Possible actions: [Review options]
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  RotateCcw,
  Sliders,
  Sparkles,
  TrendingDown,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function MissionSimulator({ goTo }) {
  const { approveRecommendation } = useData()

  const [delayDays, setDelayDays] = useState(5)
  const [isSimulating, setIsSimulating] = useState(false)
  const [hasRun, setHasRun] = useState(true)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [mitigationAuthorized, setMitigationAuthorized] = useState(false)

  const beforeScore = 63
  const afterScore = Math.max(
    20,
    Math.round(beforeScore - (delayDays > 0 ? (delayDays === 5 ? 12 : delayDays * 2.4) : 0))
  )

  const handleRun = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
      setHasRun(true)
    }, 300)
  }

  const handleAuthorize = () => {
    approveRecommendation('REC-001', 'Operations Officer')
    setMitigationAuthorized(true)
  }

  const affectedSystems = [
    { name: 'Fuel', severity: 'Critical', detail: 'Runs out on Day 12' },
    { name: 'Power', severity: 'Critical', detail: 'Microgrid load reduced 60%' },
    { name: 'Heating', severity: 'Critical', detail: 'Non-vital circuits shed' },
    { name: 'Research', severity: 'Warning', detail: 'Ice-core drilling paused' },
  ]

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 text-[#0C1E30]">
      {/* Header */}
      <header className="mb-8 border-b border-[#DCE8F0] pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0C1E30]">
            What-If Simulator
          </h1>
          <p className="mt-1 text-xs text-[#42586E]">
            Rapid resilience analysis for polar logistics and life support.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setDelayDays(5)
            setHasRun(true)
            setOptionsOpen(false)
            setMitigationAuthorized(false)
          }}
          className="text-xs font-medium text-[#64748B] hover:text-[#0C1E30] flex items-center gap-1.5 transition"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </header>

      {/* Simulator Card */}
      <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-8 shadow-xs space-y-7">
        {/* Question */}
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] block">
            Scenario Question
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0C1E30] mt-1">
            What if cargo is delayed?
          </h2>
        </div>

        {/* Stepper Input & Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#0C1E30]">Delay:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDelayDays((d) => Math.max(1, d - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE8F0] bg-white text-[#42586E] hover:bg-slate-50 transition active:scale-95"
                aria-label="Decrease delay"
              >
                <Minus size={15} />
              </button>

              <div className="w-20 text-center font-mono font-bold text-lg text-[#0C1E30]">
                {delayDays} {delayDays === 1 ? 'day' : 'days'}
              </div>

              <button
                type="button"
                onClick={() => setDelayDays((d) => Math.min(20, d + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE8F0] bg-white text-[#42586E] hover:bg-slate-50 transition active:scale-95"
                aria-label="Increase delay"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRun}
            disabled={isSimulating}
            className="w-full sm:w-auto rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 py-2.5 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Sliders size={14} />
            <span>{isSimulating ? 'Simulating…' : 'Run Simulation'}</span>
          </button>
        </div>

        {/* Results */}
        {hasRun && (
          <div className="space-y-6 pt-4 border-t border-[#F1F5F9] animate-fade-in">
            {/* Mission Health Transition */}
            <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-5">
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#64748B]">
                Mission Health
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-bold font-mono text-[#0C1E30]">
                  {beforeScore}
                </span>
                <span className="text-2xl text-[#64748B]">→</span>
                <span className="text-4xl sm:text-5xl font-bold font-mono text-rose-600">
                  {afterScore}
                </span>
                <span className="ml-2 font-mono text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  ↓ {beforeScore - afterScore} points
                </span>
              </div>
            </div>

            {/* Affected Systems */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30] mb-3">
                Affected Systems
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {affectedSystems.map((item) => (
                  <div
                    key={item.name}
                    className="p-3 rounded-xl border border-[#DCE8F0] bg-white text-center space-y-1"
                  >
                    <span className="h-2 w-2 rounded-full bg-rose-600 inline-block" />
                    <div className="font-semibold text-sm text-[#0C1E30]">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-[#64748B] font-mono">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Possible Actions */}
            <div className="pt-2">
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30] mb-3">
                Possible Actions
              </div>

              {!optionsOpen ? (
                <button
                  type="button"
                  onClick={() => setOptionsOpen(true)}
                  className="rounded-xl border border-[#0284C7] bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] px-5 py-2.5 text-xs font-semibold transition active:scale-95 flex items-center gap-2"
                >
                  <span>Review options</span>
                  <ArrowRight size={13} />
                </button>
              ) : (
                <div className="space-y-3 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#0C1E30]">
                      Recommended Mitigation REC-001
                    </span>
                    {mitigationAuthorized && (
                      <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        Authorized
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#42586E] leading-relaxed">
                    Transfer 3,500 L from strategic bladder reserve 02 into main generator circuit and shed auxiliary lab heating. Extends runway to Day 17.
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      disabled={mitigationAuthorized}
                      onClick={handleAuthorize}
                      className="rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2 text-xs font-semibold shadow-xs transition active:scale-95 disabled:opacity-50"
                    >
                      {mitigationAuthorized ? 'Mitigation Active' : 'Authorize Mitigation'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOptionsOpen(false)}
                      className="rounded-lg border border-[#DCE8F0] bg-white px-3 py-2 text-xs font-medium text-[#64748B] hover:text-[#0C1E30] transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
