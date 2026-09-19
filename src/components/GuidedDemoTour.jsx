/**
 * GUIDED SCENARIO CONTROLLER (THE GUIDED DEMO MODE)
 * =================================================
 * Section 5: The most important feature of POLAR-AI.
 *
 * 6-step guided walkthrough:
 * Step 1: Normal operations
 * Step 2: Fuel resupply mismatch detected
 * Step 3: Risk & potential gap (5 days)
 * Step 4: Dependency chain
 * Step 5: What-if simulation
 * Step 6: AI recommendation & officer approval
 *
 * Clean, lightweight controller with Next, Back, Exit Demo.
 */

import React, { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  X,
  Play,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'Normal Operations',
    headline: 'Maitri Station Operations Overview',
    summary:
      'Maitri Station is operating under standard polar routines. Baseline mission continuity sits at 68% ("Attention Required") as autonomous logistics engines monitor incoming flights and vessel corridors.',
    targetView: 'dashboard',
    actionLabel: 'Detect Resupply Window →',
  },
  {
    step: 2,
    title: 'Fuel Resupply Mismatch Detected',
    headline: 'Schedule & Runway Disparity Identified',
    summary:
      'The engine automatically detects a timeline mismatch: Station diesel fuel tank has 12 days remaining, but incoming resupply cargo C-101 has an arrival ETA of 17 days.',
    targetView: 'dashboard',
    actionLabel: 'Inspect Risk Gap →',
  },
  {
    step: 3,
    title: 'Risk & Potential Gap (5 Days)',
    headline: '5-Day Operating Deficit Flagged',
    summary:
      'Risk RSK-001 is triggered: A critical 5-day shortage gap will occur before resupply arrives. Station safe operating buffer (14 days) is officially breached.',
    targetView: 'risks',
    actionLabel: 'Trace Dependency Chain →',
  },
  {
    step: 4,
    title: 'Dependency Chain',
    headline: 'Causal Chain Reaction Analysis',
    summary:
      'Trace the cascade: Cargo delayed → Inventory runs out → Generator stops → Heating lost → Science mission at risk. A logistics delay threatens station life support.',
    targetView: 'impact',
    actionLabel: 'Run What-If Simulation →',
  },
  {
    step: 5,
    title: 'What-If Simulation',
    headline: 'Simulate +5 Days Blizzard Delay',
    summary:
      'Testing hypothetical severe weather in the non-mutating sandbox: Adding +5 days cargo delay drops mission continuity score from 68% down to 51%, widening the gap to 10 days.',
    targetView: 'simulator',
    actionLabel: 'Review AI Mitigation →',
  },
  {
    step: 6,
    title: 'AI Recommendation & Officer Approval',
    headline: 'Human-in-the-Loop Decision Authorisation',
    summary:
      'ASK POLAR recommends REC-001: Activate strategic fuel reserves and shed Level-1 non-critical laboratory circuits, regaining +4.8 days of runway. Officer authorizes action.',
    targetView: 'copilot',
    actionLabel: 'Finish Walkthrough',
    autoApprove: true,
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
      goTo(nextStep.targetView)
    } else {
      onClose()
      setCurrentStepIndex(0)
      goTo('dashboard')
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevStep = DEMO_STEPS[currentStepIndex - 1]
      setCurrentStepIndex(currentStepIndex - 1)
      goTo(prevStep.targetView)
    }
  }

  const handleExit = () => {
    onClose()
    setCurrentStepIndex(0)
  }

  return (
    <aside
      aria-label="Guided Demo Walkthrough"
      className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 sm:w-[500px] z-50 animate-fade-in"
    >
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-2xl shadow-slate-900/10 space-y-4">
        {/* Header bar with step pill and Exit */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 text-xs font-semibold text-[var(--ice)] flex items-center gap-1.5">
              <Sparkles size={13} />
              Step {activeStep.step} of 6: {activeStep.title}
            </span>
          </div>

          <button
            type="button"
            onClick={handleExit}
            className="text-xs font-medium text-slate-400 hover:text-slate-800 transition"
          >
            Exit Demo
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <h2 className="text-base font-bold text-slate-900 leading-snug">
            {activeStep.headline}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {activeStep.summary}
          </p>
        </div>

        {/* Step progress pills */}
        <div className="flex items-center gap-1.5 pt-1">
          {DEMO_STEPS.map((s, idx) => (
            <button
              key={s.step}
              type="button"
              onClick={() => {
                setCurrentStepIndex(idx)
                goTo(s.targetView)
              }}
              title={`Jump to Step ${s.step}: ${s.title}`}
              className={`h-1.5 flex-1 rounded-full transition ${
                idx === currentStepIndex
                  ? 'bg-[var(--ice)]'
                  : idx < currentStepIndex
                  ? 'bg-emerald-500'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Action Controls: Back, Next, Exit */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg ${
              currentStepIndex === 0
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft size={13} />
            Back
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExit}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg"
            >
              Exit
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--ice)] hover:bg-indigo-700 text-white font-semibold px-4 py-2 text-xs shadow-sm transition active:scale-95"
            >
              <span>{activeStep.actionLabel}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
