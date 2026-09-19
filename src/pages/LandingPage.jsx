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
      <section className="rounded-2xl border border-[#DCEAF1] bg-white p-6 sm:p-10 md:p-14 shadow-xs space-y-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF6FA] border border-[#BFDDE7] px-3.5 py-1 text-xs font-mono font-semibold text-[#1597D4]">
          <Sparkles size={13} />
          <span>POLAR-AI · MISSION CONTINUITY OPERATING SYSTEM</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#102A43] leading-[1.1]">
            Mission continuity intelligence
            <br />
            <span className="text-[#1597D4]">for extreme environments.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#526779] max-w-3xl leading-relaxed font-medium">
            See the risk. Understand the impact. Simulate the future. Make the decision.
          </p>

          <p className="text-xs sm:text-sm text-[#8295A5] max-w-2xl leading-relaxed">
            A centralized digital platform for <strong>expedition planning</strong>, <strong>cargo tracking</strong>, <strong>inventory management</strong>, <strong>personnel movement</strong>, and <strong>emergency response</strong> in extreme Antarctic environments.
          </p>
        </div>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3.5 pt-3">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white font-semibold px-7 py-3 text-xs shadow-xs transition active:scale-95"
          >
            <Play size={13} className="fill-white" />
            <span>RUN DEMO</span>
          </button>

          <button
            type="button"
            onClick={() => goTo('dashboard')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCEAF1] bg-white hover:bg-[#F0F8FB] text-[#102A43] font-semibold px-6 py-3 text-xs shadow-xs transition"
          >
            <span>EXPLORE PLATFORM</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* ============================================================
          THE FIVE CORE OPERATIONAL PILLARS
          ============================================================ */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1597D4] block">
            CENTRALIZED ARCHITECTURE
          </span>
          <h2 className="text-xl font-bold text-[#12263A] mt-0.5">
            Five Core Operational Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            onClick={() => goTo('expeditions')}
            className="rounded-2xl border border-[#DDEAF0] bg-white p-5 shadow-xs hover:border-[#1597D4] hover:bg-[#F0F8FB] transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#DDF3FA] text-[#1597D4] flex items-center justify-center">
                <Compass size={17} />
              </div>
              <h3 className="text-sm font-bold text-[#12263A]">1. Expedition Planning</h3>
              <p className="text-xs text-[#526779] leading-relaxed">
                Scientific mission planning, traverse route schedules, milestone verification, and team assignments.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-[#1597D4] inline-flex items-center gap-1">
              <span>View Expeditions</span>
              <ArrowRight size={11} />
            </div>
          </div>

          <div
            onClick={() => goTo('cargo')}
            className="rounded-2xl border border-[#DDEAF0] bg-white p-5 shadow-xs hover:border-[#1597D4] hover:bg-[#F0F8FB] transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#DDF3FA] text-[#1597D4] flex items-center justify-center">
                <Package size={17} />
              </div>
              <h3 className="text-sm font-bold text-[#12263A]">2. Cargo Tracking</h3>
              <p className="text-xs text-[#526779] leading-relaxed">
                Consignments manifest tracking, maritime vessel corridors, blue-ice runway arrivals, and delay management.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-[#1597D4] inline-flex items-center gap-1">
              <span>Track Manifests</span>
              <ArrowRight size={11} />
            </div>
          </div>

          <div
            onClick={() => goTo('inventory')}
            className="rounded-2xl border border-[#DDEAF0] bg-white p-5 shadow-xs hover:border-[#1597D4] hover:bg-[#F0F8FB] transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#DDF3FA] text-[#1597D4] flex items-center justify-center">
                <Boxes size={17} />
              </div>
              <h3 className="text-sm font-bold text-[#12263A]">3. Inventory Reserves</h3>
              <p className="text-xs text-[#526779] leading-relaxed">
                Continuous fuel burn rates, safe buffer thresholds, life-support reserves, and deficit forecasting.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-[#1597D4] inline-flex items-center gap-1">
              <span>Manage Stock</span>
              <ArrowRight size={11} />
            </div>
          </div>

          <div
            onClick={() => goTo('personnel')}
            className="rounded-2xl border border-[#DDEAF0] bg-white p-5 shadow-xs hover:border-[#1597D4] hover:bg-[#F0F8FB] transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-[#DDF3FA] text-[#1597D4] flex items-center justify-center">
                <Users size={17} />
              </div>
              <h3 className="text-sm font-bold text-[#12263A]">4. Personnel Movement</h3>
              <p className="text-xs text-[#526779] leading-relaxed">
                Field camp deployments, active personnel rosters, satellite phone check-in times, and medical status.
              </p>
            </div>
            <div className="pt-3 text-xs font-semibold text-[#1597D4] inline-flex items-center gap-1">
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
              <h3 className="text-sm font-bold text-[#12263A]">5. Emergency Response</h3>
              <p className="text-xs text-[#526779] leading-relaxed">
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
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)] block">
            HOW IT WORKS
          </span>
          <h2 className="text-xl font-bold text-[var(--ink-hi)] mt-0.5">
            The Continuous Resilience Loop
          </h2>
        </div>

        {/* Desktop 6-step horizontal flow */}
        <div className="hidden lg:grid grid-cols-6 gap-2.5">
          {processSteps.map((step, idx) => {
            const isLast = idx === processSteps.length - 1
            return (
              <div key={step.step} className="relative">
                <div className="rounded-xl border border-[#DCEAF1] bg-white p-4 space-y-2 h-full shadow-2xs">
                  <span className="text-[10px] font-mono font-bold text-[#1597D4] block">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-[#102A43] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-[#526779] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {!isLast && (
                  <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 hidden lg:flex text-[#1597D4]">
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
              className="rounded-xl border border-[#DCEAF1] bg-white p-4 flex items-start gap-3 shadow-2xs"
            >
              <div className="h-7 w-7 rounded-lg bg-[#EAF6FA] text-[#1597D4] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {step.step}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">{step.title}</h3>
                <p className="text-xs text-[#526779] mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          USP SECTION — FROM DATA TO DECISION
          ============================================================ */}
      <section className="rounded-2xl border border-[#DCEAF1] bg-white p-6 sm:p-10 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1597D4] block">
            CENTRAL ARCHITECTURAL USP
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43]">
            From Isolated Data to Mission Continuity Intelligence
          </h2>
          <p className="text-sm text-[#526779] leading-relaxed">
            Traditional expedition systems tell you what is happening in isolated dashboards. POLAR-AI helps you understand what it means, predict what could happen next, see what it could affect, simulate possible futures, and decide what to do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Traditional Systems Silo */}
          <div className="rounded-xl border border-slate-200 bg-[#F7FBFD] p-5 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8295A5] block">
              Traditional Systems: Disconnected Silos
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#526779]">
                📦 Cargo Manifest
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#526779]">
                🛢️ Fuel Tanks
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#526779]">
                ⚙️ Generator Hours
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#526779]">
                👥 Personnel Roster
              </div>
            </div>
            <p className="text-xs text-[#8295A5] italic leading-relaxed pt-1">
              "Fuel is low, but no system calculates that incoming cargo is 5 days too late to prevent a generator microgrid blackout."
            </p>
          </div>

          {/* POLAR-AI Intelligence Engine */}
          <div className="rounded-xl border border-[#BFDDE7] bg-[#EAF6FA]/40 p-5 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1597D4] block">
              POLAR-AI: Mission Continuity Intelligence
            </span>
            <div className="rounded-lg bg-white p-3.5 border border-[#DCEAF1] space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="font-bold text-[#1597D4]">Cargo + Inventory + Assets + Schedule</span>
              </div>
              <div className="text-center font-bold text-[#1597D4] text-xs">↓</div>
              <div className="font-semibold text-[#102A43] text-[11.5px] bg-[#EAF6FA] p-1.5 rounded text-center">
                Mission Continuity Intelligence Engine
              </div>
              <div className="text-center font-bold text-[#1597D4] text-xs">↓</div>
              <div className="text-[#526779] text-[11px] leading-tight text-center font-mono">
                Prediction (5d gap) → Cascading Impact → Simulation → Human Sign-off
              </div>
            </div>
            <p className="text-xs text-[#1597D4] font-semibold leading-relaxed pt-1">
              "Detects the mismatch 12 days early, simulates the cascade, and prepares fuel-shedding protocols with officer sign-off."
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL TAGLINE
          ============================================================ */}
      <footer className="rounded-2xl border border-[#DCEAF1] bg-[#F7FBFD] p-8 text-center space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1597D4] block">
          POLAR-AI MISSION MOTTO
        </span>
        <blockquote className="text-lg sm:text-xl font-bold tracking-tight text-[#102A43] max-w-2xl mx-auto">
          "See the risk. Understand the impact. Simulate the future. Make the decision."
        </blockquote>
        <div className="pt-2">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white font-semibold px-6 py-2.5 text-xs shadow-xs transition active:scale-95"
          >
            <Play size={12} className="fill-white" />
            <span>START GUIDED DEMO</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
