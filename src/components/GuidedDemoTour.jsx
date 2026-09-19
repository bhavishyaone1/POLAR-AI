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
    stageLabel: '01 Mission',
    stepNumber: 1,
    title: 'Mission Operating Normally',
    headline: 'Standard Polar Station Operations',
    summary:
      'Maitri Station is operating under standard polar routines. Baseline mission continuity sits at 68% ("Stable with emerging resupply risk") as autonomous logistics engines monitor incoming flights and maritime corridors.',
    targetView: 'dashboard',
    actionText: 'Detect Resupply Window',
  },
  {
    stageId: '01',
    stageLabel: '01 Mission',
    stepNumber: 2,
    title: 'Fuel Resupply Mismatch Detected',
    headline: 'Schedule & Runway Disparity Identified',
    summary:
      'The engine flags an imminent schedule mismatch: Station diesel fuel tank has only 12.0 days remaining, but incoming resupply cargo C-101 ETA is 17.0 days. A 5-day unhedged gap is forming.',
    targetView: 'dashboard',
    actionText: 'Inspect Emerging Risk',
  },
  {
    stageId: '02',
    stageLabel: '02 Risk',
    stepNumber: 3,
    title: 'Show Risk',
    headline: '5-Day Operating Deficit Flagged',
    summary:
      'Risk RSK-001 is triggered: A critical 5-day shortage gap will occur before resupply arrives. Station safe operating buffer (14 days) is officially breached.',
    targetView: 'risks',
    actionText: 'Trace Dependency Chain',
  },
  {
    stageId: '03',
    stageLabel: '03 Impact',
    stepNumber: 4,
    title: 'Show Dependency Chain',
    headline: 'Causal Chain Reaction Analysis',
    summary:
      'Scientific system diagram traces the cascade: FUEL → GENERATOR → POWER → HEATING → RESEARCH OPERATIONS. A logistics shipping delay threatens station life support.',
    targetView: 'risks',
    actionText: 'Open What-If Simulator',
  },
  {
    stageId: '04',
    stageLabel: '04 Simulation',
    stepNumber: 5,
    title: 'Open Simulator',
    headline: 'Simulate +5 Days Blizzard Delay',
    summary:
      'Testing hypothetical severe weather in the non-mutating sandbox: Adding +5 days cargo delay drops mission continuity score from 68% down to 51%, doubling the deficit gap to 10 days.',
    targetView: 'simulator',
    actionText: 'Review AI Mitigations',
  },
  {
    stageId: '05',
    stageLabel: '05 Decision',
    stepNumber: 6,
    title: 'AI Copilot Explains Mitigation',
    headline: 'Human-in-the-Loop Decision Authorization',
    summary:
      'AI Copilot delivers structured decision-support: Protocol REC-001 transfers 3,500L from strategic reserves and sheds non-critical circuits, extending runway to 16.8 days. Officer reviews tradeoffs.',
    targetView: 'copilot',
    actionText: 'Authorize Action & View Audit',
    autoApprove: true,
  },
  {
    stageId: '05',
    stageLabel: '05 Decision',
    stepNumber: 7,
    title: 'Cryptographic Audit Trail',
    headline: 'Immutable Human Decision Logged',
    summary:
      'The approved mitigation is committed to the tamper-evident cryptographic ledger: Officer signature, protocol payload, and sha256 block hash recorded permanently for governance.',
    targetView: 'audit',
    actionText: 'Complete Guided Demo',
  },
]

const PROGRESS_PILLARS = [
  { id: '01', label: '01 Mission', steps: [1, 2] },
  { id: '02', label: '02 Risk', steps: [3] },
  { id: '03', label: '03 Impact', steps: [4] },
  { id: '04', label: '04 Simulation', steps: [5] },
  { id: '05', label: '05 Decision', steps: [6, 7] },
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
            Step 0{activeStep.stepNumber} of 06 · {activeStep.title}
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
