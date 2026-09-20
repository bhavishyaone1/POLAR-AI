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
  Users,
  Zap,
} from 'lucide-react'

export default function LandingPage({ goTo, onStartGuidedDemo }) {
  const processSteps = [
    { step: '01', title: 'TRACK', desc: 'Continuous observation of consumables, fuel burn & cargo manifests' },
    { step: '02', title: 'DETECT', desc: 'Identify emerging anomalies & schedule disparities before they escalate' },
    { step: '03', title: 'PREDICT', desc: 'Calculate depletion horizons, supply gaps & last safe resupply dates' },
    { step: '04', title: 'UNDERSTAND', desc: 'Connect cascading dependencies: Fuel → Generator → Power → Heating' },
    { step: '05', title: 'SIMULATE', desc: 'Explore what-if scenarios in a non-mutating sandbox before deciding' },
    { step: '06', title: 'DECIDE', desc: 'Human-in-the-loop decision authorization recorded in audit ledger' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* ============================================================
          HERO SECTION — MISSION CONTINUITY INTELLIGENCE
          ============================================================ */}
      <section className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-10 md:p-14 shadow-xs space-y-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] px-3.5 py-1 text-xs font-mono font-medium text-[#0284C7]">
          <Sparkles size={13} />
          <span>POLAR-AI · Mission Continuity Operating System</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#0C1E30] leading-[1.12]">
            Mission continuity intelligence
            <br />
            <span className="text-[#0284C7]">for extreme polar environments.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#42586E] max-w-3xl leading-relaxed font-normal">
            See the risk. Understand the impact. Simulate the future. Make the decision.
          </p>

          <p className="text-xs sm:text-[14px] text-[#6E8294] max-w-2xl leading-relaxed">
            Centralized digital platform unifying <strong>expedition planning</strong>, <strong>cargo tracking</strong>, <strong>inventory management</strong>, <strong>personnel movement</strong>, and <strong>emergency response</strong> across extreme research facilities.
          </p>
        </div>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3.5 pt-3">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-medium px-7 py-3 text-xs shadow-xs transition active:scale-95"
          >
            <Play size={13} className="fill-white" />
            <span>Run Guided Demo</span>
          </button>

          <button
            type="button"
            onClick={() => goTo('dashboard')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE8F0] bg-white hover:bg-[#F0F7FB] text-[#0C1E30] font-medium px-6 py-3 text-xs shadow-xs transition"
          >
            <span>Enter Command Center</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* ============================================================
          THE FIVE CORE OPERATIONAL PILLARS
          ============================================================ */}
      <section className="space-y-4">
        <div>
          <span className="text-[11.5px] font-semibold uppercase tracking-wider text-[#0284C7] block">
            Centralized Architecture
          </span>
          <h2 className="text-[22px] font-semibold text-[#0C1E30] tracking-tight mt-0.5">
            Five Core Operational Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            onClick={() => goTo('expeditions')}
            className="rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs hover:border-[#0284C7] hover:bg-[#F0F7FB] transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                <Compass size={17} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#0C1E30] tracking-tight">1. Expedition Planning</h3>
              <p className="text-xs text-[#42586E] leading-relaxed">
                Scientific mission planning, traverse route schedules, milestone verification, and team assignments.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1">
              <span>View Expeditions</span>
              <ArrowRight size={11} />
            </div>
          </div>

          <div
            onClick={() => goTo('cargo')}
            className="rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs hover:border-[#0284C7] hover:bg-[#F0F7FB] transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                <Package size={17} />
              </div>
              <h3 className="text-sm font-bold text-[#0C1E30]">2. Cargo Tracking</h3>
              <p className="text-xs text-[#42586E] leading-relaxed">
                Consignment manifest tracking, maritime vessel corridors, blue-ice runway arrivals, and delay management.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1">
              <span>Track Manifests</span>
              <ArrowRight size={11} />
            </div>
          </div>

          <div
            onClick={() => goTo('inventory')}
            className="rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs hover:border-[#0284C7] hover:bg-[#F0F7FB] transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                <Boxes size={17} />
              </div>
              <h3 className="text-sm font-bold text-[#0C1E30]">3. Inventory Reserves</h3>
              <p className="text-xs text-[#42586E] leading-relaxed">
                Continuous fuel burn rates, safe buffer thresholds, life-support reserves, and deficit forecasting.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1">
              <span>Manage Stock</span>
              <ArrowRight size={11} />
            </div>
          </div>

          <div
            onClick={() => goTo('personnel')}
            className="rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs hover:border-[#0284C7] hover:bg-[#F0F7FB] transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                <Users size={17} />
              </div>
              <h3 className="text-sm font-bold text-[#0C1E30]">4. Personnel Movement</h3>
              <p className="text-xs text-[#42586E] leading-relaxed">
                Field camp deployments, active personnel rosters, satellite phone check-in times, and medical status.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1">
              <span>Track Roster</span>
              <ArrowRight size={11} />
            </div>
          </div>

          <div
            onClick={() => goTo('emergency')}
            className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 shadow-xs hover:border-rose-300 hover:bg-rose-50 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle size={17} />
              </div>
              <h3 className="text-sm font-bold text-[#0C1E30]">5. Emergency Response</h3>
              <p className="text-xs text-[#42586E] leading-relaxed">
                Autonomous spatial triage, armed SOS broadcasts, response team dispatch, and tactical field radio.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-rose-700 inline-flex items-center gap-1">
              <span>Response Command</span>
              <ArrowRight size={11} />
            </div>
          </div>
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
          <span className="text-[11.5px] font-semibold uppercase tracking-wider text-[#0284C7] block">
            Operational Methodology
          </span>
          <h2 className="text-[22px] font-semibold text-[#0C1E30] tracking-tight mt-0.5">
            The Continuous Resilience Loop
          </h2>
        </div>

        {/* Desktop 6-step horizontal flow */}
        <div className="hidden lg:grid grid-cols-6 gap-2.5">
          {processSteps.map((step, idx) => {
            const isLast = idx === processSteps.length - 1
            return (
              <div key={step.step} className="relative">
                <div className="rounded-xl border border-[#DCE8F0] bg-white p-4 space-y-2 h-full shadow-2xs">
                  <span className="text-[10.5px] font-mono font-medium text-[#0284C7] block">
                    {step.step}
                  </span>
                  <h3 className="text-[14px] font-semibold text-[#0C1E30] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[11.5px] text-[#42586E] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {!isLast && (
                  <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex text-[#0284C7]">
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile vertical flow */}
        <div className="lg:hidden space-y-2.5">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-xl border border-[#DCE8F0] bg-white p-4 flex items-start gap-3 shadow-2xs"
            >
              <div className="h-7 w-7 rounded-lg bg-[#E0F2FE] text-[#0284C7] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {step.step}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0C1E30]">{step.title}</h3>
                <p className="text-xs text-[#42586E] mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          USP SECTION — FROM DATA TO DECISION
          ============================================================ */}
      <section className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-10 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7] block">
            CENTRAL ARCHITECTURAL USP
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1E30]">
            From Isolated Silos to Mission Continuity Intelligence
          </h2>
          <p className="text-sm text-[#42586E] leading-relaxed">
            Legacy expedition dashboards display data in isolation. POLAR-AI connects all variables into a causal resilience model: predict operational deficits, simulate cascading impacts across microgrids, and empower commanders with actionable decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Traditional Systems Silo */}
          <div className="rounded-xl border border-slate-200 bg-[#F4F8FA] p-5 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6E8294] block">
              Traditional Systems: Disconnected Silos
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#42586E]">
                📦 Cargo Manifest
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#42586E]">
                🛢️ Fuel Tanks
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#42586E]">
                ⚙️ Generator Hours
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#42586E]">
                👥 Personnel Roster
              </div>
            </div>
            <p className="text-xs text-[#6E8294] italic leading-relaxed pt-1">
              "Fuel tank shows low, but no system calculates that incoming resupply arrives 5 days too late to avoid life-support heating failure."
            </p>
          </div>

          {/* POLAR-AI Intelligence Engine */}
          <div className="rounded-xl border border-[#BAE6FD] bg-[#E0F2FE]/30 p-5 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7] block">
              POLAR-AI: Connected Mission Continuity
            </span>
            <div className="rounded-lg bg-white p-3.5 border border-[#DCE8F0] space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="font-bold text-[#0284C7]">Cargo + Inventory + Assets + Telemetry</span>
              </div>
              <div className="text-center font-bold text-[#0284C7] text-xs">↓</div>
              <div className="font-semibold text-[#0C1E30] text-[11.5px] bg-[#E0F2FE] p-1.5 rounded text-center">
                Mission Continuity Intelligence Engine
              </div>
              <div className="text-center font-bold text-[#0284C7] text-xs">↓</div>
              <div className="text-[#42586E] text-[11px] leading-tight text-center font-mono">
                Predict Deficit (5d) → Trace Cascade → Simulate Sandbox → Commander Authorization
              </div>
            </div>
            <p className="text-xs text-[#0284C7] font-semibold leading-relaxed pt-1">
              "Detects the disparity 12 days in advance, projects downstream impacts, and prepares tactical load-shedding protocols with cryptographic audit sign-off."
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          POLAR-AI LEARNS — MISSION MEMORY USP SECTION
          ============================================================ */}
      <section className="rounded-2xl border border-[#BAE6FD] bg-gradient-to-br from-[#E0F2FE] to-[#F0F9FF] p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0284C7] px-3.5 py-1 text-xs font-mono font-bold text-white">
              <Sparkles size={12} />
              <span>NEW USP · Adaptive Historical Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C1E30] tracking-tight">
              POLAR-AI remembers. <br />
              <span className="text-[#0284C7]">Every past expedition makes your current mission safer.</span>
            </h2>
            <p className="text-sm text-[#42586E] leading-relaxed">
              Unlike static dashboards, POLAR-AI studies every Antarctic and Arctic expedition since 2018.
              When it sees your current fuel level, cargo delay, and temperature — it already knows what tends to happen next.
              Because it happened before.
            </p>
          </div>

          <button
            type="button"
            onClick={() => goTo('memory')}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold px-5 py-2.5 text-xs shadow-xs transition active:scale-95 self-start"
          >
            <span>Explore Mission Memory</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* How it works — 3-step visual */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-white border border-[#DCE8F0] p-4 space-y-2">
            <div className="h-7 w-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold">01</div>
            <h3 className="text-sm font-bold text-[#0C1E30]">Study Past Expeditions</h3>
            <p className="text-xs text-[#42586E] leading-relaxed">
              6 documented expeditions (2018–2024) with full incident logs: fuel crises, generator failures, medical emergencies, cargo delays.
            </p>
          </div>
          <div className="rounded-xl bg-white border border-[#DCE8F0] p-4 space-y-2">
            <div className="h-7 w-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold">02</div>
            <h3 className="text-sm font-bold text-[#0C1E30]">Match Current Conditions</h3>
            <p className="text-xs text-[#42586E] leading-relaxed">
              Real-time pattern matching against preconditions that historically preceded each incident — fuel runway, delay days, season, temperature.
            </p>
          </div>
          <div className="rounded-xl bg-white border border-[#DCE8F0] p-4 space-y-2">
            <div className="h-7 w-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold">03</div>
            <h3 className="text-sm font-bold text-[#0C1E30]">Predict &amp; Guide</h3>
            <p className="text-xs text-[#42586E] leading-relaxed">
              Surfaces ranked risk predictions with confidence %, historical evidence, and proven resolutions — before the commander needs to ask.
            </p>
          </div>
        </div>

        {/* Example alert preview */}
        <div className="rounded-xl bg-white border border-rose-200 p-4 sm:p-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">PATTERN MATCH · 78% CONFIDENCE</span>
          </div>
          <p className="text-sm font-semibold text-[#0C1E30]">
            "Fuel at 12-day runway with a 5-day cargo delay matches conditions in 4 past expeditions — 3 of which led to a critical shortage."
          </p>
          <p className="text-xs text-[#42586E]">
            Most similar: <strong>Maitri-8 (2022)</strong> — Continuity score fell to 34%. Generator failure cascaded into cryogenic vault loss and cold-stress medical incidents.
            <strong className="text-[#0284C7]"> Recommended: Execute Protocol REC-001 within 48 hours.</strong>
          </p>
        </div>
      </section>

      {/* ============================================================
          FINAL TAGLINE
          ============================================================ */}
      <footer className="rounded-2xl border border-[#DCE8F0] bg-[#F4F8FA] p-8 text-center space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7] block">
          POLAR-AI OPERATING MOTTO
        </span>
        <blockquote className="text-lg sm:text-xl font-bold tracking-tight text-[#0C1E30] max-w-2xl mx-auto">
          "See the risk. Understand the impact. Simulate the future. Make the decision."
        </blockquote>
        <div className="pt-2">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold px-6 py-2.5 text-xs shadow-xs transition active:scale-95"
          >
            <Play size={12} className="fill-white" />
            <span>START GUIDED DEMO</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
