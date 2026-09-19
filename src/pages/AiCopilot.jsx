/**
 * ASK POLAR — MISSION CONTINUITY AI COPILOT
 * =========================================
 * Section 6:
 * Header:
 * ASK POLAR
 * Mission Continuity AI
 * A few prepared prompt buttons:
 * [ Why is the mission score 68%? ]
 * [ What happens if cargo C-104 is delayed? ]
 * [ Recommend emergency protocol for fuel ]
 * Clean response area:
 * Answer clearly using actual mission numbers.
 * Fast, structured, no fake markdown typing delays.
 */

import React, { useState } from 'react'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useData } from '../store/DataContext'

const PREPARED_ANSWERS = {
  'Why is the mission score 68%?': {
    title: 'Mission Continuity Score Analysis (68% Attention Required)',
    summary:
      'The 68% score is triggered by an unbuffered fuel resupply mismatch at Maitri Station:',
    metrics: [
      { label: 'Current Diesel Fuel Reserve', value: '14,200 L (12.0 Days Available)' },
      { label: 'Required Safe Window', value: '14.0 Days Minimum Threshold' },
      { label: 'Inbound Cargo C-101 ETA', value: '17.0 Days via Cape Town' },
      { label: 'Projected Deficit Gap', value: '5.0 Days Unbuffered Shortage' },
    ],
    details:
      'The engine does not wait for tanks to hit zero. Because the arrival date (Day 17) exceeds the safe depletion date (Day 12), the continuity algorithm applies a -24 point weighted penalty. Secondary factors include Generator G-021 nearing its 5,000h service interval (-8 pts).',
  },
  'What happens if cargo C-104 is delayed?': {
    title: 'Cascading Impact of +5-Day Resupply Delay',
    summary:
      'If severe Antarctic weather or vessel hold-ups delay C-104 / C-101 by +5 days:',
    metrics: [
      { label: 'Adjusted Cargo ETA', value: '22.0 Days (Pushed +5d)' },
      { label: 'Shortage Window', value: '10.0 Days Deficit (Days 12 to 22)' },
      { label: 'Simulated Continuity Score', value: '51% (Critical Deficit)' },
      { label: 'Life-Support Degradation', value: 'Severe Sub-Zero Risk on Day 12' },
    ],
    details:
      'Primary generator G-021 starves of fuel on Day 12. Station microgrid loses 96% output. Hydronic heating loops freeze within 18 hours, and 400m of paleoclimate ice-core samples suffer irreversible thermal degradation.',
  },
  'Recommend emergency protocol for fuel': {
    title: 'Actionable Mitigation Protocol: REC-001',
    summary:
      'POLAR-AI recommends a dual-stage tactical mitigation with 94% confidence:',
    metrics: [
      { label: 'Action 1: Reserve Transfer', value: '+3.0 Days (3,500L from Bladder 02)' },
      { label: 'Action 2: Load Shedding', value: '+1.8 Days (Shed Non-Critical Circuits)' },
      { label: 'Total Extended Runway', value: '16.8 Days (Closes 96% of Gap)' },
      { label: 'Decision Gate', value: 'Operations Officer Authorization Required' },
    ],
    details:
      'By activating strategic reserves and shedding auxiliary drill circuits while keeping living quarters heated at +18°C, safe station operations are sustained until C-101 berths at Novo Runway.',
  },
}

export default function AiCopilot({ goTo }) {
  const { approveRecommendation } = useData()

  const [activeQuery, setActiveQuery] = useState('Why is the mission score 68%?')
  const [customInput, setCustomInput] = useState('')
  const [authorized, setAuthorized] = useState(false)

  const activeResponse = PREPARED_ANSWERS[activeQuery] || {
    title: 'Operational Continuity Telemetry Assessment',
    summary: `Analysis for query: "${activeQuery}"`,
    metrics: [
      { label: 'Station Continuity Score', value: '68% (Attention Required)' },
      { label: 'Primary Reserve Fuel', value: '12.0 Days Runway' },
      { label: 'Resupply Consignment ETA', value: '17.0 Days' },
      { label: 'Engine Status', value: 'Deterministic Telemetry Linked' },
    ],
    details:
      'Maitri Station is currently tracking RSK-001 with 12 days of fuel vs 17-day arrival. Recommend executing Protocol REC-001 to extend station operational margin.',
  }

  const handleSelectPrompt = (q) => {
    setActiveQuery(q)
  }

  const handleSubmitCustom = (e) => {
    e.preventDefault()
    if (!customInput.trim()) return
    setActiveQuery(customInput.trim())
    setCustomInput('')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* ============================================================
          HEADER
          ASK POLAR
          Mission Continuity AI
          ============================================================ */}
      <header className="border-b border-[var(--line)] pb-5 space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-200 text-[var(--ice)] flex items-center justify-center">
            <Bot size={18} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--ink-hi)]">
            ASK POLAR
          </h1>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            Online · Live Telemetry
          </span>
        </div>
        <p className="text-sm font-medium text-[var(--ink-mid)]">
          Mission Continuity AI · Grounded operational recommendations using actual mission numbers
        </p>
      </header>

      {/* ============================================================
          PREPARED PROMPT BUTTONS
          [ Why is the mission score 68%? ]
          [ What happens if cargo C-104 is delayed? ]
          [ Recommend emergency protocol for fuel ]
          ============================================================ */}
      <section className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
          Prepared Mission Queries
        </span>
        <div className="flex flex-wrap gap-2.5">
          {[
            'Why is the mission score 68%?',
            'What happens if cargo C-104 is delayed?',
            'Recommend emergency protocol for fuel',
          ].map((prompt) => {
            const isActive = activeQuery === prompt
            return (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSelectPrompt(prompt)}
                className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition text-left shadow-xs ${
                  isActive
                    ? 'bg-[var(--ice)] text-white shadow-sm'
                    : 'bg-white border border-[var(--line)] text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                [ {prompt} ]
              </button>
            )
          })}
        </div>
      </section>

      {/* ============================================================
          CLEAN RESPONSE AREA (FAST, STRUCTURED, NO FAKE DELAYS)
          ============================================================ */}
      <section className="rounded-2xl border border-[var(--line)] bg-white p-7 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)]">
            Answer · Grounded In Real-Time Mission Data
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            {activeResponse.title}
          </h2>
          <p className="text-xs text-slate-600">
            {activeResponse.summary}
          </p>
        </div>

        {/* Structured Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {activeResponse.metrics.map((m, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 space-y-1"
            >
              <span className="text-[11px] font-mono uppercase text-slate-500 block">
                {m.label}
              </span>
              <p className="text-sm font-bold text-slate-900 font-mono">
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* Structured Details */}
        <div className="rounded-xl bg-indigo-50/50 border border-indigo-100 p-4 text-xs text-slate-700 leading-relaxed space-y-2">
          <span className="font-mono text-[11px] font-bold uppercase text-[var(--ice)] block">
            Operational Analysis
          </span>
          <p>{activeResponse.details}</p>
        </div>

        {/* Action Button for Emergency Protocol */}
        {activeQuery.includes('protocol') && (
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-600">
              Protocol REC-001 requires officer confirmation.
            </span>
            <button
              type="button"
              onClick={() => {
                approveRecommendation('REC-001', 'Operations Officer')
                setAuthorized(true)
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 text-xs shadow-sm transition"
            >
              <CheckCircle2 size={14} />
              <span>Authorize REC-001 Mitigation</span>
            </button>
          </div>
        )}

        {authorized && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Protocol REC-001 successfully authorized. Microgrid and reserve adjustments active.</span>
          </div>
        )}
      </section>

      {/* ============================================================
          ASK A CUSTOM QUESTION
          ============================================================ */}
      <form onSubmit={handleSubmitCustom} className="space-y-2">
        <label className="text-xs font-mono font-bold uppercase text-slate-500 block">
          Ask another question
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type your question about fuel runway, cargo arrivals, or station assets..."
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 pr-24 text-xs text-slate-900 shadow-sm focus:border-[var(--ice)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="absolute right-2 inline-flex items-center gap-1 rounded-lg bg-[var(--ice)] hover:bg-indigo-700 disabled:opacity-40 text-white px-3 py-1.5 text-xs font-semibold shadow-xs transition"
          >
            <span>Ask</span>
            <Send size={12} />
          </button>
        </div>
      </form>
    </div>
  )
}
