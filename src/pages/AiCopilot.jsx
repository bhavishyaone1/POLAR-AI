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
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
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

        <div className="flex flex-wrap gap-2.5">
          {[
            'Why is this a risk?',
            'What happens if the shipment is delayed?',
            'What should the officer review?',
          ].map((q) => {
            const isSelected = activeQuestion === q
            return (
              <button
                key={q}
                type="button"
                onClick={() => handleSelectQuestion(q)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition text-left shadow-2xs ${
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
      <section className="rounded-2xl border border-[var(--line)] bg-white p-7 sm:p-9 shadow-xs space-y-6">
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
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Protocol REC-001 authorized by Operations Officer. Stamped in cryptographic audit log.</span>
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
            <span>Query</span>
            <Send size={11} />
          </button>
        </div>
      </form>
    </div>
  )
}
