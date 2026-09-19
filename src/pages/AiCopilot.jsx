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
      'The current fuel reserve is projected to fall below the safe operating threshold before the expected cargo arrival. Maitri Station holds 14,200 L of diesel fuel (12.0 days remaining), while inbound resupply consignment C-101 has an arrival ETA of 17.0 days, creating an unhedged 5.0-day deficit window.',
    impact:
      'Station generators will starve on Day 12. Generator availability becomes constrained, triggering an automatic 96% output reduction across the microgrid and freezing the hydronic heating loop.',
    recommendation:
      'Execute tactical reserve transfer protocol REC-001: Transfer 3,500 L from strategic bladder 02 and shed Level-1 non-critical laboratory circuits.',
    actionLabel: 'Review Simulation',
    actionTarget: 'simulator',
  },
  'What happens if the shipment is delayed?': {
    analysis:
      'If extreme Antarctic climate conditions delay C-101 by +5 days, cargo ETA pushes from Day 17 to Day 22, widening the station deficit gap from 5.0 days to 10.0 days.',
    impact:
      'Mission continuity score drops sharply from 68% down to 51%. Deep ice-core drilling must be abandoned to avoid cryogenic sample destruction, and station evacuation protocols are armed.',
    recommendation:
      'Pre-authorize emergency load shedding now and establish alternate aircraft staging via Troll Station blue-ice runway to compress shipping timeline.',
    actionLabel: 'Open What-If Simulator',
    actionTarget: 'simulator',
  },
  'What should the officer review?': {
    analysis:
      'Officer review should prioritize three key parameters: generator runtime limits on G-021 (4,820h vs 5,000h overhaul cycle), current fuel burn rate (1,180 L/day vs target 920 L/day under load-shedding), and maritime pack-ice satellite telemetry.',
    impact:
      'Delaying authorization by more than 48 hours eliminates the buffer needed to stabilize habitat temperatures during the transition period.',
    recommendation:
      'Approve Protocol REC-001 to lock in the +4.8-day runway extension and sign off on the immutable cryptographic audit entry.',
    actionLabel: 'Inspect Risk Flow',
    actionTarget: 'risks',
  },
  'Compare REC-001 vs REC-002': {
    analysis:
      'Comparative evaluation: Protocol REC-001 proposes Strategic Reserve Transfer (3,500 L) combined with Level-1 circuit shedding. Protocol REC-002 proposes Emergency C-130 Air-drop staging from Cape Town via Troll Station.',
    impact:
      'REC-001 carries 0% personnel hazard, 94% execution confidence, and extends runway from 12.0d to 16.8d. REC-002 costs 4.2x more fuel logistics and has a 42% abort risk due to Weddell Sea katabatic gusts.',
    recommendation:
      'Authorize REC-001 immediately as primary mitigation. Keep REC-002 on warm standby only if Weddell Sea weather degrades past Day 14.',
    actionLabel: 'Open What-If Simulator',
    actionTarget: 'simulator',
  },
  'What changed?': {
    analysis:
      'Station fuel burn accelerated by +8% due to thermal sub-zero load. Consignment C-101 ETA delayed +3 days due to Weddell Sea ice-pack hold. Generator G-01 servicing signed off by Chief Engineer.',
    impact:
      'An unhedged 5-day deficit gap now exists between fuel exhaustion on Day 12 and cargo arrival on Day 17.',
    recommendation:
      'Execute tactical reserve transfer protocol REC-001 to extend runway by +4.8 days.',
    actionLabel: 'Inspect Risk Flow',
    actionTarget: 'risks',
  },
  'Simulate 5-day delay': {
    analysis:
      'Simulating a 5-day delay pushes consignment C-101 arrival from Day 17 to Day 22.',
    impact:
      'Mission continuity drops from 63% to 51%. Auxiliary laboratory circuits must be shed.',
    recommendation:
      'Review alternate resupply options and test load shedding in the Simulator sandbox.',
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
        <header className="border-b border-[var(--line)] pb-5 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[var(--surface-ice)] border border-[var(--line)] text-[var(--ice)] flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--ink-hi)]">
                AI MISSION COPILOT
              </h1>
              <span className="text-xs text-[var(--ink-mid)] font-medium">
                Decision-Support Assistant · Grounded Station Telemetry
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] px-3 py-1.5 flex items-center gap-2 text-xs">
            <span className="text-[var(--ink-low)] font-mono uppercase text-[10px]">Context:</span>
            <span className="font-semibold text-[var(--ink-hi)]">Analyzing: Fuel Resupply Risk</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ice)] animate-pulse" />
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
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
          Suggested Questions
        </span>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-2.5">
          {[
            'Why is this a risk?',
            'What happens if the shipment is delayed?',
            'What should the officer review?',
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
                    ? 'bg-[var(--ice)] text-white shadow-xs'
                    : 'bg-white border border-[var(--line)] text-[var(--ink-hi)] hover:border-[var(--line-hover)] hover:bg-[var(--surface-secondary)]'
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
      <section className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-8 md:p-9 shadow-xs space-y-5 sm:space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[var(--ice)]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)]">
              Structured Officer Briefing
            </span>
          </div>
          <span className="text-xs font-mono text-[var(--ink-low)]">Confidence: 94%</span>
        </div>

        {/* 1. ANALYSIS */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
            ANALYSIS
          </span>
          <p className="text-sm text-[var(--ink-hi)] leading-relaxed font-medium">
            {activeResponse.analysis}
          </p>
        </div>

        {/* 2. IMPACT */}
        <div className="space-y-1.5 rounded-xl bg-[var(--surface-base)] border border-[var(--line)] p-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700">
            IMPACT
          </span>
          <p className="text-xs sm:text-sm text-[var(--ink-hi)] leading-relaxed">
            {activeResponse.impact}
          </p>
        </div>

        {/* 3. RECOMMENDATION */}
        <div className="space-y-1.5 rounded-xl bg-[var(--surface-ice)] border border-[var(--line)] p-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)]">
            RECOMMENDATION
          </span>
          <p className="text-xs sm:text-sm text-[var(--ink-hi)] leading-relaxed">
            {activeResponse.recommendation}
          </p>
        </div>

        {/* 4. ACTION */}
        <div className="pt-2 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(activeResponse.actionTarget || 'simulator')}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--ice)] hover:bg-[#3F96B2] text-white font-semibold px-4 py-2 text-xs shadow-xs transition active:scale-95"
          >
            <span>[{activeResponse.actionLabel || 'Review Simulation'}]</span>
            <ArrowRight size={13} />
          </button>

          <button
            type="button"
            onClick={() => {
              approveRecommendation('REC-001', 'Operations Officer')
              setAuthorized(true)
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-white hover:bg-[var(--surface-secondary)] text-[var(--ink-hi)] font-semibold px-3.5 py-2 text-xs shadow-xs transition"
          >
            <CheckCircle2 size={13} className="text-[var(--green)]" />
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
        <label className="text-xs font-mono font-bold uppercase text-[var(--ink-low)] block">
          Ask Mission Question
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Type your operational question about fuel buffers, cargo ETAs, or generator health..."
            className="w-full rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 pr-20 text-xs text-[var(--ink-hi)] shadow-xs focus:border-[var(--ice)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!customQuery.trim()}
            className="absolute right-1.5 inline-flex items-center gap-1 rounded-md bg-[var(--ice)] hover:bg-[#3F96B2] disabled:opacity-40 text-white px-3 py-1.5 text-xs font-semibold shadow-xs transition"
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
              'Simulate 5-day delay',
              'What should I review?',
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
            {/* Analysis */}
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
              <span className="font-bold text-[10.5px] uppercase font-mono text-[#0284C7] block mb-1">
                Analysis
              </span>
              <p className="text-[#0C1E30] leading-relaxed">
                {activeResponse.analysis}
              </p>
            </div>

            {/* Impact */}
            <div className="p-2.5 rounded-xl bg-[#FFFBEB] border border-amber-200">
              <span className="font-bold text-[10.5px] uppercase font-mono text-amber-800 block mb-1">
                Impact
              </span>
              <p className="text-[#78350F] leading-relaxed">
                {activeResponse.impact}
              </p>
            </div>

            {/* Recommendation */}
            <div className="p-2.5 rounded-xl bg-[#F0FDF4] border border-emerald-200">
              <span className="font-bold text-[10.5px] uppercase font-mono text-emerald-800 block mb-1">
                Recommendation
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
