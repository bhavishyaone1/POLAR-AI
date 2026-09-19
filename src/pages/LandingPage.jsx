/**
 * PLATFORM MISSION BRIEFING (LANDING PAGE)
 * =========================================
 * Clean, executive briefing on Mission Continuity Intelligence:
 * Cargo + Inventory + Consumption + Assets + Dependencies -> Risk -> Impact -> Action.
 */

import React from 'react'
import {
  ArrowRight,
  Boxes,
  Cpu,
  GitFork,
  Package,
  Play,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { SYSTEM_USP } from '../data/polarIntelligenceData'

export default function LandingPage({ goTo, onStartGuidedDemo }) {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Hero Section */}
      <section className="rounded-2xl border border-[var(--line)] bg-white p-8 sm:p-12 shadow-sm space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200/80 px-3 py-1 text-xs font-semibold text-[var(--ice)]">
          <Sparkles size={13} />
          POLAR-AI · Mission Continuity Intelligence
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink-hi)] leading-tight">
          Mission continuity intelligence for extreme polar environments.
        </h1>

        <blockquote className="rounded-xl border-l-4 border-[var(--ice)] bg-slate-50 p-4 sm:p-5 text-base sm:text-lg font-medium italic text-slate-800">
          "{SYSTEM_USP.tagline}"
        </blockquote>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Extreme polar operations afford zero margin for surprise. Traditional systems merely report what broke after stocks run empty. POLAR-AI connects cargo arrivals, fuel burn rates, power microgrids, and asset health into a continuous forecasting engine that detects risks before they trigger station shutdowns.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--ice)] hover:bg-indigo-700 text-white font-semibold px-6 py-3 text-sm shadow-sm transition active:scale-95"
          >
            <Play size={15} className="fill-white" />
            <span>RUN GUIDED DEMO</span>
          </button>

          <button
            type="button"
            onClick={() => goTo('dashboard')}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 py-3 text-sm shadow-sm transition"
          >
            <span>Explore Dashboard</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* The Core Intelligence Chain */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)]">
            ARCHITECTURAL PHILOSOPHY
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            How Mission Continuity Intelligence Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 space-y-2 shadow-xs">
            <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package size={16} />
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block">1. Inputs</span>
            <h3 className="text-sm font-bold text-slate-900">Cargo & Reserves</h3>
            <p className="text-xs text-slate-600">Tracks consumable runway against scheduled arrival ETAs.</p>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 space-y-2 shadow-xs">
            <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Boxes size={16} />
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block">2. Detection</span>
            <h3 className="text-sm font-bold text-slate-900">Risk & Deficit Gap</h3>
            <p className="text-xs text-slate-600">Calculates when resupply arrives after safe operating limits.</p>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 space-y-2 shadow-xs">
            <div className="h-8 w-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <GitFork size={16} />
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block">3. Propagation</span>
            <h3 className="text-sm font-bold text-slate-900">Causal Impact</h3>
            <p className="text-xs text-slate-600">Traces failure cascade: Fuel → Generator → Power → Science.</p>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-white p-5 space-y-2 shadow-xs">
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block">4. Action</span>
            <h3 className="text-sm font-bold text-slate-900">Human Approval</h3>
            <p className="text-xs text-slate-600">AI delivers grounded mitigations for officer authorization.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
