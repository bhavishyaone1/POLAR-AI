/**
 * PLATFORM PITCH & MISSION BRIEFING (LANDING PAGE)
 * ===============================================
 * Showcases the core USP, comparative matrix against traditional systems,
 * five core capability pillars, and 1-click entry to the Command Center & Guided Demo.
 */

import React from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Compass,
  Cpu,
  Gauge,
  GitFork,
  Hourglass,
  Layers,
  Play,
  Radio,
  Shield,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  WifiOff,
  XCircle,
} from 'lucide-react'
import { SYSTEM_USP } from '../data/polarIntelligenceData'
import { useData } from '../store/DataContext'

export default function LandingPage({ goTo, onStartGuidedDemo }) {
  const { continuityMetrics } = useData()

  return (
    <div className="space-y-8 pb-12">
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#0b162c] via-[#070e1c] to-[#040810] p-6 sm:p-10 shadow-2xl">
        {/* Subtle polar ambient glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono tracking-wider text-cyan-300 uppercase backdrop-blur-md">
            <Sparkles size={13} className="animate-pulse text-cyan-400" />
            National Centre for Polar & Ocean Research (NCPOR) · MoES
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-tight">
            POLAR-AI <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              Polar Operations, Logistics & Autonomous Resilience Intelligence
            </span>
          </h1>

          {/* THE CORE USP CALLOUT */}
          <div className="rounded-xl border-l-4 border-cyan-400 bg-cyan-950/30 p-4 sm:p-5 backdrop-blur-sm">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1">
              Core USP & Product Philosophy
            </p>
            <blockquote className="text-lg sm:text-xl font-medium italic text-slate-100">
              "{SYSTEM_USP.tagline}"
            </blockquote>
            <p className="mt-2 text-xs font-mono text-cyan-200/80">
              {SYSTEM_USP.philosophy}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Extreme polar environments afford zero margin for surprise. Traditional systems merely report what went wrong after stocks run dry. POLAR-AI connects cargo, fuel burn, power microgrids, asset health, and blizzards into a continuous <strong className="text-cyan-300">Mission Continuity Engine</strong> that forecasts risks before they trigger critical disruptions.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => goTo('dashboard')}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40"
            >
              Launch Command Center
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onStartGuidedDemo ? onStartGuidedDemo() : goTo('dashboard')}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20 hover:border-amber-400"
            >
              <Play size={15} className="fill-amber-300" />
              Start Guided Demo (Fuel Gap Magic Moment)
            </button>

            <button
              onClick={() => goTo('reports')}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700/60 hover:text-white"
            >
              View PPT Presentation Mode
            </button>
          </div>
        </div>
      </div>

      {/* ---------- THE COMPARISON MATRIX (FROM YOUR PRESENTATION SLIDE) ---------- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers size={20} className="text-cyan-400" />
              System Comparison — Put This In Your PPT
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Why traditional expedition ERPs fail in extreme environments, and how POLAR-AI transforms operations.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-950/50 px-2.5 py-1 text-xs font-mono text-cyan-300">
            USP Alignment Active
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#080f1d] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-sm">
            {/* Left Header */}
            <div className="bg-slate-900/80 px-5 py-3 text-xs font-bold font-mono tracking-wider uppercase text-rose-400 flex items-center gap-2">
              <XCircle size={15} />
              Traditional System (Legacy Logistics)
            </div>
            {/* Right Header */}
            <div className="bg-cyan-950/40 px-5 py-3 text-xs font-bold font-mono tracking-wider uppercase text-cyan-300 flex items-center gap-2">
              <CheckCircle2 size={15} />
              Our System — POLAR-AI (Predictive Intelligence)
            </div>
          </div>

          <div className="divide-y divide-slate-800/80 font-sans">
            {SYSTEM_USP.traditionalVsPolarAi.map((row, idx) => (
              <div
                key={row.id}
                className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 transition hover:bg-slate-800/30"
              >
                {/* Traditional Side */}
                <div className="p-4 flex items-start gap-3 bg-slate-900/20 text-slate-400">
                  <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-slate-600" />
                  <div>
                    <span className="text-slate-300 font-medium">{row.traditional}</span>
                    <p className="text-xs text-slate-500 mt-0.5">Focus: retrospective status capture</p>
                  </div>
                </div>

                {/* POLAR-AI Side */}
                <div className="p-4 flex items-start gap-3 bg-cyan-950/10 text-slate-200">
                  <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-cyan-200 font-semibold">{row.polarAi}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                        {row.highlight}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Focus: causal anticipation & mitigation</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 5 CORE CAPABILITIES (FROM YOUR HANDWRITTEN NOTES) ---------- */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Brain size={20} className="text-cyan-400" />
            The 5 Core Pillars of POLAR-AI
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Key capabilities written in the mission architecture notes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Pillar 1 */}
          <div
            onClick={() => goTo('dashboard')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-[#0a1222] p-5 transition hover:border-cyan-500/50 hover:bg-[#0c172d]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-cyan-500/10 p-2.5 text-cyan-400 group-hover:bg-cyan-500/20">
                <Gauge size={22} />
              </div>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                Score: {continuityMetrics?.score ?? 68}%
              </span>
            </div>
            <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">
              1. Mission Continuity Score
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Continuous 0–100 index calculating real-time resilience across fuel, generators, cargo ETAs, and blizzards with a transparent "Why is my score this way?" breakdown.
            </p>
          </div>

          {/* Pillar 2 */}
          <div
            onClick={() => goTo('assets')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-[#0a1222] p-5 transition hover:border-cyan-500/50 hover:bg-[#0c172d]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400 group-hover:bg-blue-500/20">
                <Cpu size={22} />
              </div>
              <span className="rounded-full border border-blue-500/30 bg-blue-950/60 px-2 py-0.5 text-[10px] font-mono text-blue-300">
                16 Fleet Units
              </span>
            </div>
            <h3 className="font-semibold text-white group-hover:text-blue-300 transition">
              2. Asset & Power Management
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Monitors CAT generators, PistenBully snowcats, hydronic heating loops, and satcom terminals with operating hours, service thresholds, and failure risk models.
            </p>
          </div>

          {/* Pillar 3 */}
          <div
            onClick={() => goTo('personnel')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-[#0a1222] p-5 transition hover:border-cyan-500/50 hover:bg-[#0c172d]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400 group-hover:bg-emerald-500/20">
                <Users size={22} />
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                24 Personnel Active
              </span>
            </div>
            <h3 className="font-semibold text-white group-hover:text-emerald-300 transition">
              3. Personnel & Team Allocation
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Roster management with shift schedules, duty status (Active, Field Mission, Resting), satphone links, blood groups, and field spatial coordinates.
            </p>
          </div>

          {/* Pillar 4 */}
          <div
            onClick={() => goTo('emergency')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-[#0a1222] p-5 transition hover:border-cyan-500/50 hover:bg-[#0c172d]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-rose-500/10 p-2.5 text-rose-400 group-hover:bg-rose-500/20">
                <ShieldAlert size={22} />
              </div>
              <span className="rounded-full border border-rose-500/30 bg-rose-950/60 px-2 py-0.5 text-[10px] font-mono text-rose-300">
                100% Offline Capable
              </span>
            </div>
            <h3 className="font-semibold text-white group-hover:text-rose-300 transition">
              4. Emergency Response (Zero-Connection)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Functions completely disconnected from the internet. Employs local spherical Haversine distance triage to find the closest team, snowcat, and trauma kits.
            </p>
          </div>

          {/* Pillar 5 */}
          <div
            onClick={() => goTo('simulator')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-[#0a1222] p-5 transition hover:border-cyan-500/50 hover:bg-[#0c172d]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-purple-500/10 p-2.5 text-purple-400 group-hover:bg-purple-500/20">
                <Sliders size={22} />
              </div>
              <span className="rounded-full border border-purple-500/30 bg-purple-950/60 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                Non-Mutating Sandbox
              </span>
            </div>
            <h3 className="font-semibold text-white group-hover:text-purple-300 transition">
              5. What-If Mission Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Test "What if fuel shipment C-101 is delayed by 5 days?" or "What if Generator G-01 trips?" without touching production data. Compares Before vs After deltas.
            </p>
          </div>

          {/* Pillar 6 - Dependency Graph */}
          <div
            onClick={() => goTo('impact')}
            className="group cursor-pointer rounded-xl border border-slate-800 bg-[#0a1222] p-5 transition hover:border-cyan-500/50 hover:bg-[#0c172d]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-400 group-hover:bg-amber-500/20">
                <GitFork size={22} />
              </div>
              <span className="rounded-full border border-amber-500/30 bg-amber-950/60 px-2 py-0.5 text-[10px] font-mono text-amber-300">
                Causal Propagation
              </span>
            </div>
            <h3 className="font-semibold text-white group-hover:text-amber-300 transition">
              Chain Reaction & Impact Analysis
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Visual directed graph mapping: Cargo Delay → Fuel Shortage → Generator Overload → Power Shedding → Science Mission Halt.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
