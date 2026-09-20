/**
 * AI MISSION COPILOT — OFFICER DECISION-SUPPORT ASSISTANT
 * ========================================================
 * Section 11:
 * Clean white panel (not ChatGPT chat bubbles).
 * Header: AI MISSION COPILOT
 * Context: Analyzing: Fuel Resupply Risk
 * Suggested questions:
 * - Why is this a risk?
 * - What happens if the shipment is delayed?
 * - What should the officer review?
 *
 * Structured AI response:
 * ANALYSIS
 * IMPACT
 * RECOMMENDATION
 * ACTION: [ Review Simulation ]
 */

import React, { useState } from 'react'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Send,
  ShieldAlert,
  Sliders,
  Sparkles,
} from 'lucide-react'
import { useData } from '../store/DataContext'

const COPILOT_KNOWLEDGE = {
  'Why is this a risk?': {
    analysis:
      'Current station fuel reserves stand at 14,200 L (12.0 days runway at 1,180 L/day burn rate). Inbound maritime consignment C-101 has an updated arrival ETA of 17.0 days due to pack-ice holds in Prydz Bay, creating an unhedged 5.0-day shortage gap.',
    impact:
      'Station generators will starve on Day 12. Microgrid generation drops by 96%, disabling habitat hydronic heating loops and cutting power to cryogenic science sample vaults.',
    prediction:
      'Mission continuity score decays from 63% down to 38% if unhedged by Day 8.',
    options:
      'Option A: Authorize tactical transfer of 3,500 L from strategic bladder reserve 02. Option B: Shed Level-1 auxiliary laboratory heating circuits immediately.',
    recommendation:
      'Execute Mitigation Protocol REC-001 (Bladder transfer + selective circuit shedding) to extend runway to Day 17.',
    actionLabel: 'Review Simulation',
    actionTarget: 'simulator',
  },
  'What changed?': {
    analysis:
      'Station thermal heating load increased daily burn rate by +8% under -38°C ambient conditions. Consignment C-101 maritime transit delayed +3 days due to fast sea-ice pack holds.',
    impact:
      'Projected shortage gap expanded from 2.0 days to 5.0 days between reserve depletion (Day 12) and vessel berth (Day 17).',
    prediction:
      'Buffer holding will reach zero 120 hours before vessel arrival at Novo Staging.',
    options:
      'Option A: Expedite snowcat traverse from Novo Runway supply depot. Option B: Stage air-drop via Troll Station blue-ice corridor.',
    recommendation:
      'Authorize snowcat ground traverse transfer before weather window closes on Day 10.',
    actionLabel: 'Inspect Risk Flow',
    actionTarget: 'risks',
  },
  'What happens if the shipment is delayed?': {
    analysis:
      'Simulating an additional +5-day maritime slip pushes vessel arrival from Day 17 to Day 22, widening the station deficit gap to 10.0 days.',
    impact:
      'Mission continuity score drops sharply from 63% down to 51%. Deep ice-core drilling must be halted to prevent specimen thermal decay.',
    prediction:
      'Critical life-support heating risk triggers on Day 15 if auxiliary generator redundancy is lost.',
    options:
      'Option A: Shed all non-essential scientific circuits (+3.2 days). Option B: Arm emergency polar evacuation protocol.',
    recommendation:
      'Pre-authorize emergency load shedding now and verify backup generator G-02 service readiness.',
    actionLabel: 'Open What-If Simulator',
    actionTarget: 'simulator',
  },
  'What should I review?': {
    analysis:
      'Command officer review should focus on three critical telemetry variables: primary generator G-01 run hours (4,940/5,000h), station fuel burn runway (12.0 days), and satellite pack-ice drift vectors.',
    impact:
      'Delaying authorization past Day 8 eliminates the thermal buffer required for safe habitat maintenance.',
    prediction:
      'Without mitigation sign-off within 48 hours, deficit mitigation options drop from 3 viable pathways to 1.',
    options:
      'Option A: Authorize Protocol REC-001 immediately. Option B: Request emergency NCPOR command override.',
    recommendation:
      'Approve Protocol REC-001 to lock in the +4.8-day runway extension and record the cryptographic ledger audit entry.',
    actionLabel: 'Inspect Risk Flow',
    actionTarget: 'risks',
  },
  'Explain the impact': {
    analysis:
      'The 5-day fuel deficit propagates a 4-stage systemic failure cascade across the station infrastructure.',
    impact:
      'Fuel depletion (Day 12) → Generator trip & microgrid drop → Hydronic glycol freeze within 18h → Cryogenic sample loss and habitat evacuation.',
    prediction:
      'Without generator redundancy, indoor habitat ambient falls from 19°C to -15°C within 36 hours of generator shutdown.',
    options:
      'Option A: Stage-gated electrical load shedding. Option B: Auxiliary space heater deployment in central dome.',
    recommendation:
      'Trace the full cascading chain in the Risk Analysis module and verify generator redundancy.',
    actionLabel: 'Trace Cascade Flow',
    actionTarget: 'risks',
  },
  'Compare REC-001 vs REC-002': {
    analysis:
      'Comparative evaluation: Protocol REC-001 proposes Strategic Reserve Transfer (3,500 L) combined with Level-1 circuit shedding. Protocol REC-002 proposes Emergency C-130 Air-drop staging from Cape Town via Troll Station.',
    impact:
      'REC-001 carries 0% personnel hazard, 94% execution confidence, and extends runway from 12.0d to 16.8d. REC-002 costs 4.2x more fuel logistics and has a 42% abort risk due to Weddell Sea katabatic gusts.',
    prediction:
      'REC-001 stabilizes mission continuity at 72%. REC-002 risks total air-drop scattering in high crosswinds.',
    options:
      'Option A: Authorize REC-001 immediately as primary mitigation. Option B: Keep REC-002 on warm standby.',
    recommendation:
      'Authorize REC-001 immediately as primary mitigation. Keep REC-002 on warm standby only if Weddell Sea weather degrades past Day 14.',
    actionLabel: 'Open What-If Simulator',
    actionTarget: 'simulator',
  },
}

export default function AiCopilot({ goTo }) {
  const { approveRecommendation } = useData()

  const [activeQuestion, setActiveQuestion] = useState('Why is this a risk?')
  const [customQuery, setCustomQuery] = useState('')
  const [authorized, setAuthorized] = useState(false)

  const activeResponse = COPILOT_KNOWLEDGE[activeQuestion] || {
    analysis: `Operational assessment for "${activeQuestion}": Station telemetry confirms fuel runway is 12 days against 17-day arrival.`,
    impact: 'Generator availability and thermal stability are at emerging risk.',
    recommendation: 'Review consumption reduction and alternate resupply options.',
    actionLabel: 'Review Simulation',
    actionTarget: 'simulator',
  }

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q)
  }

  const handleSubmitCustom = (e) => {
    e.preventDefault()
    if (!customQuery.trim()) return
    setActiveQuestion(customQuery.trim())
    setCustomQuery('')
  }

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* ============================================================
          DESKTOP / TABLET COPILOT VIEW (LOCKED & UNTOUCHED for >= 768px)
          ============================================================ */}
      <div className="hidden md:block space-y-8">
        {/* ============================================================
            HEADER
            AI MISSION COPILOT
            Context: Analyzing: Fuel Resupply Risk
            ============================================================ */}
        <header className="border-b border-slate-200 pb-5 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  AI MISSION COPILOT
                </h1>
                <span className="text-xs text-slate-500 font-medium">
                  Decision-Support Assistant · Grounded Station Telemetry
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono uppercase text-[10px]">Context:</span>
              <span className="font-semibold text-slate-900">Analyzing: Fuel Resupply Risk</span>
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
            </div>
          </div>
        </header>

        {/* ============================================================
            SUGGESTED QUESTIONS
            Why is this a risk?
            What happens if the shipment is delayed?
            What should the officer review?
            ============================================================ */}
        <section className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Suggested Questions
          </span>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-2.5">
            {[
              'Why is this a risk?',
              'What changed?',
              'What happens if the shipment is delayed?',
              'What should I review?',
              'Explain the impact',
              'Compare REC-001 vs REC-002',
            ].map((q) => {
              const isSelected = activeQuestion === q
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSelectQuestion(q)}
                  className={`rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-2 text-xs font-semibold transition text-left shadow-2xs ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {q}
                </button>
              )
            })}
          </div>
        </section>

        {/* ============================================================
            STRUCTURED AI RESPONSE PANEL
            ANALYSIS · IMPACT · RECOMMENDATION · ACTION
            ============================================================ */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 md:p-9 shadow-xs space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-sky-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600">
                Structured Officer Briefing
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">Confidence: 94%</span>
          </div>

          {/* 1. ANALYSIS */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              ANALYSIS
            </span>
            <p className="text-sm text-slate-900 leading-relaxed font-medium">
              {activeResponse.analysis}
            </p>
          </div>

          {/* 2. IMPACT */}
          <div className="space-y-1.5 rounded-xl bg-amber-50/50 border border-amber-200/80 p-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              IMPACT
            </span>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              {activeResponse.impact}
            </p>
          </div>

          {/* 3. PREDICTION */}
          {activeResponse.prediction && (
            <div className="space-y-1.5 rounded-xl bg-amber-50/70 border border-amber-200 p-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                PREDICTION
              </span>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                {activeResponse.prediction}
              </p>
            </div>
          )}

          {/* 4. OPTIONS */}
          {activeResponse.options && (
            <div className="space-y-1.5 rounded-xl bg-slate-50 border border-slate-200 p-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                OPTIONS
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {activeResponse.options}
              </p>
            </div>
          )}

          {/* 5. RECOMMENDED REVIEW */}
          <div className="space-y-1.5 rounded-xl bg-sky-50/60 border border-sky-200 p-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700">
              RECOMMENDED REVIEW
            </span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {activeResponse.recommendation}
            </p>
          </div>

          {/* 4. ACTION */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goTo(activeResponse.actionTarget || 'simulator')}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 text-xs shadow-xs transition active:scale-95"
            >
              <span>{activeResponse.actionLabel || 'Review Simulation'}</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              onClick={() => {
                approveRecommendation('REC-001', 'Operations Officer')
                setAuthorized(true)
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-3.5 py-2 text-xs shadow-xs transition"
            >
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>Authorize Mitigation REC-001</span>
            </button>
          </div>

          {authorized && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center justify-between gap-2 text-xs text-emerald-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Protocol REC-001 authorized by Operations Officer. Stamped in cryptographic audit log.</span>
              </div>
              <button
                type="button"
                onClick={() => goTo('audit')}
                className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-900 underline"
              >
                <span>View Audit Ledger</span>
                <ArrowRight size={12} />
              </button>
            </div>
          )}
        </section>

        {/* Query Bar */}
        <form onSubmit={handleSubmitCustom} className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase text-slate-400 block">
            Ask Mission Question
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Type your operational question about fuel buffers, cargo ETAs, or generator health..."
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-20 text-xs text-slate-900 shadow-xs focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!customQuery.trim()}
              className="absolute right-1.5 inline-flex items-center gap-1 rounded-md bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white px-3 py-1.5 text-xs font-semibold shadow-xs transition"
            >
              <Send size={13} />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>

      {/* ============================================================
          PURPOSE-BUILT MOBILE AI COPILOT (< 768px / md:hidden)
          Mission Copilot · Context · Quick Action Chips · Concise Structured Answer
          ============================================================ */}
      <div className="block md:hidden space-y-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-[#DCE8F0] pb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
              <Bot size={17} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#0C1E30]">Mission Copilot</h1>
              <p className="text-xs text-[#6E8294]">Autonomous station advisory</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] px-2.5 py-1 text-[11px] font-medium text-[#0284C7]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7] animate-pulse" />
            <span>Online</span>
          </div>
        </div>

        {/* Context Pill */}
        <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 flex items-center justify-between text-xs">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Active Context:</span>
          <span className="font-semibold text-[#0C1E30] truncate">Fuel Resupply Risk (12d runway)</span>
        </div>

        {/* Quick Action Chips (44px min tap area) */}
        <div className="space-y-1.5">
          <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400 block px-1">
            Suggested Mission Inquiries
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Why is this a risk?',
              'What changed?',
              'What happens if the shipment is delayed?',
              'What should I review?',
              'Explain the impact',
              'Compare REC-001 vs REC-002',
            ].map((q) => {
              const isSelected = activeQuestion === q
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSelectQuestion(q)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold min-h-[44px] transition active:scale-95 flex items-center ${
                    isSelected
                      ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-2xs'
                      : 'bg-white border-slate-200 text-[#0C1E30] hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{q}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Structured AI Response Card */}
        <div className="rounded-2xl border border-[#BAE6FD] bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#0284C7] font-bold">
              ✦ Copilot Advisory
            </span>
            <span className="text-[11px] font-mono text-slate-400">Grounded in Live Telemetry</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* 1. Analysis */}
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
              <span className="font-bold text-[10.5px] uppercase font-mono text-[#0284C7] block mb-1">
                Analysis
              </span>
              <p className="text-[#0C1E30] leading-relaxed">
                {activeResponse.analysis}
              </p>
            </div>

            {/* 2. Impact */}
            <div className="p-2.5 rounded-xl bg-[#FFFBEB] border border-amber-200">
              <span className="font-bold text-[10.5px] uppercase font-mono text-amber-800 block mb-1">
                Impact
              </span>
              <p className="text-[#78350F] leading-relaxed">
                {activeResponse.impact}
              </p>
            </div>

            {/* 3. Prediction */}
            {activeResponse.prediction && (
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="font-bold text-[10.5px] uppercase font-mono text-amber-900 block mb-1">
                  Prediction
                </span>
                <p className="text-amber-950 leading-relaxed font-medium">
                  {activeResponse.prediction}
                </p>
              </div>
            )}

            {/* 4. Options */}
            {activeResponse.options && (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-[10.5px] uppercase font-mono text-slate-700 block mb-1">
                  Options
                </span>
                <p className="text-[#0C1E30] leading-relaxed">
                  {activeResponse.options}
                </p>
              </div>
            )}

            {/* 5. Recommended Review */}
            <div className="p-2.5 rounded-xl bg-[#F0FDF4] border border-emerald-200">
              <span className="font-bold text-[10.5px] uppercase font-mono text-emerald-800 block mb-1">
                Recommended Review
              </span>
              <p className="text-[#14532D] leading-relaxed">
                {activeResponse.recommendation}
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          {activeResponse.actionLabel && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => goTo(activeResponse.actionTarget)}
                className="w-full rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold py-2.5 text-xs shadow-xs transition active:scale-98 flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>{activeResponse.actionLabel}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Input */}
        <form onSubmit={handleSubmitCustom} className="rounded-xl border border-slate-200 bg-white p-2.5 flex items-center gap-2 shadow-2xs">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Ask Copilot about fuel, cargo, power..."
            className="flex-1 bg-transparent px-2 text-xs text-[#0C1E30] placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!customQuery.trim()}
            className="rounded-lg bg-[#0284C7] text-white px-3 py-2 text-xs font-semibold disabled:opacity-40 active:scale-95 transition min-h-[36px] shrink-0"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  )
}
