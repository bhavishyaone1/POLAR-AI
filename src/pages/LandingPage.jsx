/**
 * LANDING PAGE — ARCTIC WHITE SPECIFICATION
 * ==========================================
 * Section 18:
 *
 * Hero:
 * POLAR-AI
 * Mission continuity intelligence for extreme environments.
 *
 * Supporting text:
 * Track mission resources, detect emerging risks, understand cascading impacts, simulate scenarios and support better operational decisions.
 *
 * Buttons:
 * RUN DEMO · EXPLORE PLATFORM
 *
 * Interactive dashboard preview.
 *
 * Process flow:
 * TRACK → DETECT → UNDERSTAND → SIMULATE → DECIDE
 *
 * Final Tagline:
 * "POLAR-AI: See the risk. Understand the impact. Simulate the future. Make the decision."
 */

import React from 'react'
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Boxes,
  Compass,
  Cpu,
  Flame,
  GitFork,
  Package,
  Play,
  ShieldCheck,
  Sliders,
  Sparkles,
} from 'lucide-react'

export default function LandingPage({ goTo, onStartGuidedDemo }) {
  const processSteps = [
    { step: '01', title: 'TRACK', desc: 'Consumables, fuel burn & cargo schedules' },
    { step: '02', title: 'DETECT', desc: 'Supply window gaps & safe buffer breaches' },
    { step: '03', title: 'UNDERSTAND', desc: 'Cascading chain: Fuel → Gen → Power → Science' },
    { step: '04', title: 'SIMULATE', desc: 'Non-mutating what-if disruption scenarios' },
    { step: '05', title: 'DECIDE', desc: 'Actionable mitigations with officer sign-off' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-8 md:p-12 shadow-xs space-y-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-ice)] border border-[var(--line)] px-3 py-1 text-xs font-mono font-semibold text-[var(--ice)]">
          <Sparkles size={13} />
          <span>POLAR-AI · Mission Continuity Intelligence</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink-hi)] leading-tight">
            Mission continuity intelligence
            <br />
            <span className="text-[var(--ice)]">for extreme environments.</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--ink-mid)] max-w-2xl leading-relaxed">
            Track mission resources, detect emerging risks, understand cascading impacts, simulate scenarios and support better operational decisions.
          </p>
        </div>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 pt-2">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--ice)] hover:bg-[#3F96B2] text-white font-semibold px-6 py-3 sm:py-2.5 text-xs shadow-xs transition active:scale-95"
          >
            <Play size={13} className="fill-white" />
            <span>RUN DEMO</span>
          </button>

          <button
            type="button"
            onClick={() => goTo('dashboard')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-white hover:bg-[var(--surface-secondary)] text-[var(--ink-hi)] font-semibold px-5 py-3 sm:py-2.5 text-xs shadow-xs transition"
          >
            <span>EXPLORE PLATFORM</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* ============================================================
          INTERACTIVE DASHBOARD PREVIEW
          ============================================================ */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono uppercase tracking-wider text-[var(--ink-low)] font-semibold">
            Interactive System Console Preview
          </span>
          <span className="text-[var(--ice)] font-mono font-semibold">
            Maitri Station · Antarctic Telemetry Active
          </span>
        </div>

        <div
          onClick={() => goTo('dashboard')}
          className="cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-7 md:p-8 shadow-xs transition hover:border-[var(--line-hover)] hover:shadow-sm space-y-6 group"
        >
          {/* Top Preview Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--ice)]" />
              <span className="text-xs font-bold text-[var(--ink-hi)]">Antarctic Research Expedition 2027</span>
            </div>
            <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-700">
              Score: 68% · Attention Required
            </span>
          </div>

          {/* Preview Hero Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Score Ring */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-5 flex items-center gap-4">
              <div className="h-14 w-14 rounded-full border-4 border-[var(--ice)] flex items-center justify-center font-bold text-xl font-mono text-[var(--ink-hi)] shrink-0">
                68
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[var(--ice)] font-bold block">
                  Continuity Index
                </span>
                <span className="text-xs font-semibold text-[var(--ink-hi)] block">
                  Emerging supply gap
                </span>
              </div>
            </div>

            {/* Critical Risk */}
            <div className="rounded-xl border border-rose-200/80 bg-rose-50/30 p-5 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-rose-700 block">
                Primary Disparity
              </span>
              <div className="text-sm font-bold text-[var(--ink-hi)]">
                Fuel Resupply Risk
              </div>
              <p className="text-xs text-[var(--ink-mid)]">
                12d fuel remaining vs 17d cargo arrival.
              </p>
            </div>

            {/* Pillar Metrics */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-5 flex flex-col justify-between text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[var(--ink-low)]">Cargo in transit:</span>
                <span className="font-mono font-bold text-[var(--ink-hi)]">03 Consignments</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--ink-low)]">Generator status:</span>
                <span className="font-mono text-amber-700 font-semibold">Service Nearing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--ink-low)]">Click to enter:</span>
                <span className="text-[var(--ice)] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition">
                  Open Console <ArrowRight size={11} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PROCESS FLOW
          TRACK → DETECT → UNDERSTAND → SIMULATE → DECIDE
          ============================================================ */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)] block">
            HOW IT WORKS
          </span>
          <h2 className="text-xl font-bold text-[var(--ink-hi)] mt-0.5">
            The Continuous Resilience Loop
          </h2>
        </div>

        {/* Desktop 5-step horizontal flow */}
        <div className="hidden lg:grid grid-cols-5 gap-3">
          {processSteps.map((step, idx) => {
            const isLast = idx === processSteps.length - 1
            return (
              <div key={step.step} className="relative">
                <div className="rounded-xl border border-[var(--line)] bg-white p-5 space-y-2 h-full shadow-2xs">
                  <span className="text-[10px] font-mono font-bold text-[var(--ice)] block">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-[var(--ink-hi)] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--ink-mid)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {!isLast && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:flex text-[var(--ice)]">
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile vertical flow */}
        <div className="lg:hidden space-y-2.5">
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              className="rounded-xl border border-[var(--line)] bg-white p-4 flex items-start gap-3 shadow-2xs"
            >
              <div className="h-7 w-7 rounded-lg bg-[var(--surface-ice)] text-[var(--ice)] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {step.step}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--ink-hi)]">{step.title}</h3>
                <p className="text-xs text-[var(--ink-mid)] mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          FINAL TAGLINE
          ============================================================ */}
      <footer className="rounded-2xl border border-[var(--line)] bg-[var(--surface-base)] p-8 text-center space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)] block">
          POLAR-AI
        </span>
        <blockquote className="text-lg sm:text-xl font-bold tracking-tight text-[var(--ink-hi)] max-w-2xl mx-auto">
          "See the risk. Understand the impact. Simulate the future. Make the decision."
        </blockquote>
        <div className="pt-2">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--ice)] hover:bg-[#3F96B2] text-white font-semibold px-5 py-2 text-xs shadow-xs transition active:scale-95"
          >
            <Play size={12} className="fill-white" />
            <span>START GUIDED DEMO</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
