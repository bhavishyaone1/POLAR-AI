/**
 * GUIDED DEMO TOUR (THE MAGIC MOMENT WALKTHROUGH)
 * ===============================================
 * Designed specifically for presentations to judges and reviewers.
 * Guides the user step-by-step through the 5-step Antarctic Fuel Resupply Gap:
 * Dashboard (68%) → Dependency Graph → What-If Simulator (51%) → AI Recommendation → Immutable Audit.
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  GitFork,
  HelpCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  Sliders,
  Sparkles,
  X,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export const DEMO_STEPS = [
  {
    step: 1,
    view: 'dashboard',
    badge: 'Step 1: Predictive Detection',
    title: 'Command Center & Mission Continuity Score (68%)',
    summary:
      'Notice that the Mission Continuity Score is at 68% ("ATTENTION REQUIRED"). The engine does NOT wait for tanks to run empty; it immediately calculates that Maitri Station has 12.0 days of fuel remaining while Resupply Cargo C-101 has a 17-day ETA, triggering RSK-001 (5-day resupply deficit window).',
    actionText: 'Inspect Dependency Cascade →',
    targetView: 'impact',
  },
  {
    step: 2,
    view: 'impact',
    badge: 'Step 2: Causal Propagation',
    title: 'Dependency Graph & Chain Reaction Analysis',
    summary:
      'Trace the causal propagation: Cargo C-101 → Fuel Reserve → Primary CAT 3512 Generator → Station Power Grid → Hydronic Heating Loop & Deep Ice-Core Science Mission. A logistics delay at Novo Runway directly threatens science operations.',
    actionText: 'Launch What-If Simulator →',
    targetView: 'simulator',
  },
  {
    step: 3,
    view: 'simulator',
    badge: 'Step 3: What-If Sandboxing',
    title: 'Simulate +5 Days Delay Without Mutating Data',
    summary:
      'In this non-mutating sandbox, test what happens if severe blizzards delay C-101 by another +5 days. Watch the Mission Continuity Score drop from 68% down to 51%, and the shortage gap widen to 10 days.',
    actionText: 'Review AI Mitigations →',
    targetView: 'copilot',
  },
  {
    step: 4,
    view: 'copilot',
    badge: 'Step 4: Explainable AI Recommendation',
    title: 'Human-in-the-Loop Decision Gate',
    summary:
      'POLAR-AI Copilot delivers grounded recommendation REC-001: "Activate Strategic Fuel Reserve & Initiate Level-1 Circuit Shedding" with 94% confidence, extending runway by +4.8 days without compromising life support.',
    actionText: 'Approve & Verify Audit Trail →',
    targetView: 'audit',
    autoApprove: true,
  },
  {
    step: 5,
    view: 'audit',
    badge: 'Step 5: Governance Verification',
    title: 'Immutable Cryptographic Audit Trail',
    summary:
      'The officer approval has been permanently stamped in the immutable audit log with timestamp, operator role, and verification hash. Mission continuity restored to safe margins!',
    actionText: 'Finish Guided Tour',
    targetView: 'dashboard',
  },
]

export default function GuidedDemoTour({ isOpen, onClose, goTo, currentView }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const { approveRecommendation } = useData()

  if (!isOpen) return null

  const activeStep = DEMO_STEPS[currentStepIndex]

  const handleNext = () => {
    if (activeStep.autoApprove) {
      approveRecommendation('REC-001', 'Operations Officer')
    }

    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextStep = DEMO_STEPS[currentStepIndex + 1]
      setCurrentStepIndex(currentStepIndex + 1)
      goTo(nextStep.view)
    } else {
      onClose()
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevStep = DEMO_STEPS[currentStepIndex - 1]
      setCurrentStepIndex(currentStepIndex - 1)
      goTo(prevStep.view)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-lg w-full px-4 sm:px-0">
      <div className="overflow-hidden rounded-2xl border-2 border-cyan-400 bg-[#071124] p-5 shadow-2xl shadow-cyan-900/50 backdrop-blur-xl animate-fade-in space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-950 border border-cyan-400 px-2.5 py-0.5 text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles size={13} className="text-cyan-400" />
              {activeStep.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({currentStepIndex + 1} of {DEMO_STEPS.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-white transition"
            title="Close Walkthrough"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h4 className="text-base font-bold text-white leading-snug">
            {activeStep.title}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeStep.summary}
          </p>
        </div>

        {/* Step Progress Dots */}
        <div className="flex items-center gap-1.5 py-1">
          {DEMO_STEPS.map((s, idx) => (
            <div
              key={s.step}
              onClick={() => {
                setCurrentStepIndex(idx)
                goTo(s.view)
              }}
              className={`h-1.5 flex-1 rounded-full cursor-pointer transition ${
                idx === currentStepIndex
                  ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                  : idx < currentStepIndex
                  ? 'bg-emerald-400'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`inline-flex items-center gap-1 text-xs font-medium ${
              currentStepIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowLeft size={13} />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/30 transition hover:from-cyan-400 hover:to-blue-500"
          >
            {activeStep.actionText}
          </button>
        </div>
      </div>
    </div>
  )
}
