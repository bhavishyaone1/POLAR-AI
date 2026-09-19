/**
 * GUIDED DEMO EXPERIENCE — ARCTIC ICE SCENARIO CONTROLLER
 * ========================================================
 * Section 19:
 * RUN DEMO is one of the strongest interactions in the product.
 *
 * Steps:
 * Step 1: Mission operating normally.
 * Step 2: Fuel resupply mismatch detected.
 * Step 3: Show risk.
 * Step 4: Show dependency chain.
 * Step 5: Open simulator.
 * Step 6: AI Copilot explains mitigation.
 *
 * Clean top progress indicator:
 * 01 Mission · 02 Risk · 03 Impact · 04 Simulation · 05 Decision
 *
 * Buttons:
 * BACK · NEXT · EXIT DEMO
 */

import React, { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  X,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export const DEMO_STAGES = [
  {
    stageId: '01',
    stageLabel: '01 Monitor',
    stepNumber: 1,
    title: 'Mission Healthy',
    headline: 'Standard Polar Station Operations',
    summary:
      'Maitri Station is operating under standard polar routines. Baseline mission continuity sits at 68% ("Stable with emerging resupply risk") as autonomous logistics engines monitor incoming flights and maritime corridors.',
    targetView: 'dashboard',
    actionText: 'Track Resupply Fleet',
  },
  {
    stageId: '01',
    stageLabel: '01 Monitor',
    stepNumber: 2,
    title: 'Fuel Delay Detected',
    headline: 'Cargo Vessel C-101 Schedule Slip',
    summary:
      'Maritime corridor telemetry detects pack-ice thickening in the Weddell Sea. Inbound vessel C-101 schedule slips by +3 days. Station diesel tank holds 14,200L (12.0d runway at 1,180 L/d burn).',
    targetView: 'cargo',
    actionText: 'Detect Emerging Risk',
  },
  {
    stageId: '02',
    stageLabel: '02 Detect',
    stepNumber: 3,
    title: 'AI Detects Emerging Risk',
    headline: 'Autonomous Risk RSK-001 Flagged',
    summary:
      'Global AI monitoring detects that incoming cargo ETA has slipped to Day 17 while station reserves are burning down. Risk RSK-001 is automatically raised with HIGH priority.',
    targetView: 'risks',
    actionText: 'Calculate Supply Gap',
  },
  {
    stageId: '02',
    stageLabel: '02 Detect',
    stepNumber: 4,
    title: 'System Predicts Supply Gap',
    headline: '5-Day Unhedged Deficit Window',
    summary:
      'Mathematical depletion analysis calculates the Last Safe Resupply Date as Day 8 (reserves minus 4-day critical safety buffer). With arrival on Day 17, an unhedged 5.0-day blackout gap is confirmed.',
    targetView: 'inventory',
    actionText: 'Trace Cascading Impact',
  },
  {
    stageId: '03',
    stageLabel: '03 Cascade',
    stepNumber: 5,
    title: 'Causal Impact Cascade',
    headline: 'Fuel → Generator → Power → Heating → Research',
    summary:
      'Scientific system diagram traces the cross-system failure cascade: Fuel starvation forces primary Generator G-01 offline, cutting microgrid power, collapsing habitat heating, and threatening cryogenic ice-core samples.',
    targetView: 'risks',
    actionText: 'Open What-If Simulator',
  },
  {
    stageId: '04',
    stageLabel: '04 Simulate',
    stepNumber: 6,
    title: 'What-If Simulation (+5d Delay)',
    headline: 'Non-Mutating Sandbox Stress Test',
    summary:
      'Hypothetical +5 day blizzard delay is injected into the sandbox: Mission Continuity Score plummets from 68% down to 51%, doubling the life-support deficit to 10 days without altering live telemetry.',
    targetView: 'simulator',
    actionText: 'Compare AI Mitigations',
  },
  {
    stageId: '05',
    stageLabel: '05 Decide',
    stepNumber: 7,
    title: 'AI Mitigation Comparison',
    headline: 'REC-001 vs REC-002 Trade-Off Analysis',
    summary:
      'AI Copilot presents structured decision-support: Protocol REC-001 (Reserve Transfer + Level-1 load shedding) extends runway to 16.8 days with zero human risk; REC-002 (Air-drop) entails 42% abort probability.',
    targetView: 'copilot',
    actionText: 'Human Officer Review',
  },
  {
    stageId: '05',
    stageLabel: '05 Decide',
    stepNumber: 8,
    title: 'Human Review & Sign-Off',
    headline: 'Human-in-the-Loop Mission Governance',
    summary:
      'AI provides rationale and predictive confidence (94%), but the mission commander retains exclusive execution authority. Officer authorizes Protocol REC-001 with full accountability.',
    targetView: 'copilot',
    actionText: 'Authorize & Stamp Ledger',
    autoApprove: true,
  },
  {
    stageId: '05',
    stageLabel: '05 Decide',
    stepNumber: 9,
    title: 'Decision Stamped in Audit Ledger',
    headline: 'Immutable Cryptographic Record',
    summary:
      'The mitigation order is cryptographically signed and stamped into the SHA-256 tamper-evident ledger with timestamp, officer identity, and state delta. Microgrid and logistics systems synchronize.',
    targetView: 'audit',
    actionText: 'Complete Guided Tour',
  },
]

const PROGRESS_PILLARS = [
  { id: '01', label: '01 Monitor', steps: [1, 2] },
  { id: '02', label: '02 Detect', steps: [3, 4] },
  { id: '03', label: '03 Cascade', steps: [5] },
  { id: '04', label: '04 Simulate', steps: [6] },
  { id: '05', label: '05 Decide', steps: [7, 8, 9] },
]

export default function GuidedDemoTour({ isOpen, onClose, goTo }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { approveRecommendation } = useData()

  if (!isOpen) return null

  const activeStep = DEMO_STAGES[currentIndex]

  const handleNext = () => {
    if (activeStep.autoApprove) {
      approveRecommendation('REC-001', 'Operations Officer')
    }

    if (currentIndex < DEMO_STAGES.length - 1) {
      const nextStep = DEMO_STAGES[currentIndex + 1]
      setCurrentIndex(currentIndex + 1)
      goTo(nextStep.targetView)
    } else {
      onClose()
      setCurrentIndex(0)
      goTo('dashboard')
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevStep = DEMO_STAGES[currentIndex - 1]
      setCurrentIndex(currentIndex - 1)
      goTo(prevStep.targetView)
    }
  }

  const handleExit = () => {
    onClose()
    setCurrentIndex(0)
  }

  return (
    <aside
      aria-label="Guided Demo Walkthrough"
      className="fixed bottom-20 sm:bottom-6 inset-x-3 sm:inset-x-auto sm:right-6 sm:w-[520px] max-w-[calc(100vw-24px)] z-50 animate-fade-in"
    >
      <div className="rounded-2xl border border-[var(--line)] bg-white p-4 sm:p-6 shadow-xl space-y-3.5 sm:space-y-4">
        {/* Top Progress Indicator: 01 Mission · 02 Risk · 03 Impact · 04 Simulation · 05 Decision */}
        <div className="border-b border-[var(--line)] pb-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold">
            <span className="text-[var(--ice)] flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles size={13} />
              GUIDED DEMO MODE
            </span>
            <button
              type="button"
              onClick={handleExit}
              className="text-[var(--ink-low)] hover:text-[var(--ink-hi)] text-xs font-medium transition"
            >
              EXIT DEMO
            </button>
          </div>

          {/* 5 Progress Pillars */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {PROGRESS_PILLARS.map((p) => {
              const isCurrent = p.steps.includes(activeStep.stepNumber)
              const isPast = Math.max(...p.steps) < activeStep.stepNumber

              return (
                <div key={p.id} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition ${
                      isCurrent
                        ? 'bg-[var(--ice)]'
                        : isPast
                        ? 'bg-[var(--green)]'
                        : 'bg-[var(--line)]'
                    }`}
                  />
                  <span
                    className={`text-[9px] font-mono block truncate ${
                      isCurrent
                        ? 'text-[var(--ink-hi)] font-bold'
                        : 'text-[var(--ink-low)]'
                    }`}
                  >
                    {p.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-low)]">
            Step 0{activeStep.stepNumber} of 09 · {activeStep.title}
          </div>
          <h3 className="text-base font-bold text-[var(--ink-hi)] leading-snug">
            {activeStep.headline}
          </h3>
          <p className="text-xs text-[var(--ink-mid)] leading-relaxed">
            {activeStep.summary}
          </p>
        </div>

        {/* Action Controls: BACK · NEXT · EXIT DEMO */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
              currentIndex === 0
                ? 'text-[var(--ink-low)] opacity-40 cursor-not-allowed'
                : 'text-[var(--ink-mid)] hover:bg-[var(--surface-secondary)] hover:text-[var(--ink-hi)]'
            }`}
          >
            <ArrowLeft size={13} />
            <span>BACK</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExit}
              className="text-xs font-medium text-[var(--ink-low)] hover:text-[var(--ink-hi)] px-2.5 py-1.5 rounded-lg transition"
            >
              EXIT DEMO
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--ice)] hover:bg-[#3F96B2] text-white font-semibold px-4 py-2 text-xs shadow-xs transition active:scale-95"
            >
              <span>{activeStep.actionText}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
