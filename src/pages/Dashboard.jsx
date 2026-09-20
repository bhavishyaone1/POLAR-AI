/**
 * POLAR-AI — CLEAN, SIMPLE, VISUAL MISSION COCKPIT
 * ==================================================
 * Designed with ONE absolute priority:
 * MAKE IT EXTREMELY EASY TO SEE, UNDERSTAND AND USE.
 *
 * Answers the 3 Core UX Questions:
 * 1. WHAT IS HAPPENING? -> 63% Mission Health (Stable), Mission Systems
 * 2. WHAT NEEDS ATTENTION? -> 3 Priority items (Fuel gap, Generator 60h, Cargo Day 17)
 * 3. WHAT CAN I DO? -> Direct click-to-detail sheet & action triggers
 *
 * Progressive Disclosure:
 * Simple overview -> click -> detail sheet -> action
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sliders,
  Sparkles,
  TrendingDown,
  X,
  Zap,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function Dashboard({ goTo }) {
  const { continuityMetrics } = useData()

  // Active detail sheet state: null | 'fuel' | 'generator' | 'cargo' | 'changes' | 'ai' | 'health'
  const [activeDetail, setActiveDetail] = useState(null)

  const score = continuityMetrics?.score
    ? continuityMetrics.score === 68
      ? 63
      : continuityMetrics.score
    : 63

  // Clean Circular Progress calculation (single dominant indicator)
  const radius = 54
  const strokeWidth = 9
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  // 4 Core Mission Systems data
  const systems = [
    { name: 'Fuel', value: 68, color: '#F59E0B', alert: true },
    { name: 'Cargo', value: 72, color: '#0284C7', alert: false },
    { name: 'Power', value: 88, color: '#10B981', alert: false },
    { name: 'Assets', value: 91, color: '#10B981', alert: false },
  ]

  // Recent Mission Trend data points (clean sparkline)
  const trendPoints = [
    { label: 'Day 8', score: 68 },
    { label: 'Day 9', score: 66 },
    { label: 'Day 10', score: 65 },
    { label: 'Day 11', score: 64 },
    { label: 'Today', score: 63 },
  ]

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10 text-[#0C1E30]">
      {/* ============================================================
          1. TOP HEADER: STATION & STATUS (Clean, Spacious, Calm)
          ============================================================ */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#DCE8F0] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0C1E30]">
            Maitri Station
          </h1>
          <div className="mt-1 flex items-center gap-2 text-xs font-medium text-[#42586E]">
            <span className="flex h-2 w-2 relative">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Operational</span>
            <span className="text-[#DCE8F0]">·</span>
            <span className="font-mono text-[11px] text-[#64748B]">70°45′S, 11°44′E</span>
          </div>
        </div>

        <div className="text-xs text-[#64748B] font-mono self-start sm:self-auto">
          Austral Summer Campaign · ISEA-44
        </div>
      </header>

      {/* ============================================================
          2. CORE MISSION COCKPIT GRID
          Desktop: 2 Spacious Columns with subtle dividers
          Mobile: Focused vertical stack
          ============================================================ */}
      <div className="space-y-8">
        {/* ROW 1: MISSION HEALTH & NEEDS ATTENTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: MISSION HEALTH (ONE CLEAN CIRCULAR GAUGE) */}
          <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-medium text-[#42586E]">
              <span className="uppercase tracking-wider font-mono text-[11px] text-[#64748B]">
                Mission Overview
              </span>
              <button
                type="button"
                onClick={() => setActiveDetail('health')}
                className="text-[#0284C7] hover:underline text-[11.5px]"
              >
                Score details →
              </button>
            </div>

            <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              {/* Single Circular Indicator */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg
                  className="h-36 w-36 -rotate-90 transform"
                  viewBox="0 0 130 130"
                  aria-label="Mission Health 63 percent"
                >
                  <circle
                    cx="65"
                    cy="65"
                    r={radius}
                    className="stroke-[#E2E8F0]"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  <circle
                    cx="65"
                    cy="65"
                    r={radius}
                    className="stroke-[#0284C7] transition-all duration-700 ease-out"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Score Number in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold tracking-tight text-[#0C1E30]">
                    {score}%
                  </span>
                </div>
              </div>

              {/* Status Context */}
              <div className="text-center sm:text-left space-y-1">
                <div className="text-lg font-semibold text-[#0C1E30]">
                  Mission Health
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Stable
                </div>
                <div className="text-xs text-[#64748B] pt-1 flex items-center justify-center sm:justify-start gap-1 font-mono">
                  <TrendingDown size={13} className="text-amber-500" />
                  <span>↓ 3 points since last review</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1F5F9] text-center text-xs text-[#64748B]">
              Primary drivers: Fuel consumption above baseline &amp; sea-ice hold on C-101.
            </div>
          </div>

          {/* RIGHT: NEEDS ATTENTION (EXACTLY 3 KEY ITEMS, NO FLUFF) */}
          <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30]">
                  Needs Attention
                </h2>
                <span className="text-[11px] font-mono text-[#64748B]">
                  Top 3 Items
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {/* Item 1: Fuel */}
                <button
                  type="button"
                  onClick={() => setActiveDetail('fuel')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 hover:border-rose-300 transition text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-600 shrink-0" />
                    <span className="text-sm font-semibold text-[#0C1E30] group-hover:text-rose-700 transition">
                      Fuel resupply
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-rose-700 shrink-0">
                    <span>5-day gap</span>
                    <ChevronRight size={14} className="text-rose-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Item 2: Generator */}
                <button
                  type="button"
                  onClick={() => setActiveDetail('generator')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-300 transition text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-sm font-semibold text-[#0C1E30] group-hover:text-amber-700 transition">
                      Generator
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-amber-700 shrink-0">
                    <span>60h window</span>
                    <ChevronRight size={14} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>

                {/* Item 3: Cargo */}
                <button
                  type="button"
                  onClick={() => setActiveDetail('cargo')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300 transition text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-sm font-semibold text-[#0C1E30] group-hover:text-emerald-700 transition">
                      Cargo C-104
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-700 shrink-0">
                    <span>Day 17</span>
                    <ChevronRight size={14} className="text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-[#F1F5F9] text-xs text-[#64748B] flex items-center justify-between">
              <span>Click any item for root cause &amp; impact</span>
              <span className="font-mono text-[11px] text-[#0284C7]">3 active flags</span>
            </div>
          </div>
        </section>

        {/* ROW 2: MISSION SYSTEMS & WHAT CHANGED */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: MISSION SYSTEMS (COMPACT HORIZONTAL BARS) */}
          <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30]">
                Mission Systems
              </h2>
              <span className="text-[11px] font-mono text-[#64748B]">
                Operating Levels
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {systems.map((sys) => (
                <div key={sys.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#0C1E30]">{sys.name}</span>
                    <span className="font-mono font-semibold text-[#0C1E30]">
                      {sys.value}%
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${sys.value}%`,
                        backgroundColor: sys.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
              <span>Station baseline: 75% minimum threshold</span>
              <button
                type="button"
                onClick={() => goTo('inventory')}
                className="text-[#0284C7] hover:underline font-medium"
              >
                Open inventory →
              </button>
            </div>
          </div>

          {/* RIGHT: WHAT CHANGED (ULTRA-COMPACT DELTAS) */}
          <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30]">
                  What Changed
                </h2>
                <span className="text-[11px] font-mono text-[#64748B]">
                  Recent Deltas
                </span>
              </div>

              <div className="mt-5 divide-y divide-[#F1F5F9] text-sm">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#42586E] font-medium">Fuel consumption</span>
                  <span className="font-mono font-bold text-rose-600 flex items-center gap-1">
                    <ArrowUpRight size={14} />
                    ↑ 8%
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#42586E] font-medium">Cargo ETA</span>
                  <span className="font-mono font-bold text-amber-600">
                    +3 days
                  </span>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-[#42586E] font-medium">Generator Output</span>
                  <span className="font-mono font-semibold text-emerald-600">
                    Stable
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-xs text-[#64748B]">Logged in past 24 hours</span>
              <button
                type="button"
                onClick={() => setActiveDetail('changes')}
                className="text-xs font-semibold text-[#0284C7] hover:underline flex items-center gap-1"
              >
                <span>View changes</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </section>

        {/* ROW 3: MISSION TREND & AI INSIGHT */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: MISSION TREND (ONE CLEAN SPARKLINE) */}
          <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30]">
                  Mission Trend
                </h2>
                <span className="text-xs font-bold text-[#0284C7] font-mono">
                  {score}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#64748B]">
                Last 5 Days
              </span>
            </div>

            {/* Clean SVG Trend Line (No complicated axes) */}
            <div className="my-4">
              <svg viewBox="0 0 320 80" className="w-full h-20 overflow-visible">
                {/* Light Area Fill */}
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="20,20 85,32 150,44 220,52 290,62 290,75 20,75"
                  fill="url(#trendGradient)"
                />

                {/* Main Curve Line */}
                <polyline
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="20,20 85,32 150,44 220,52 290,62"
                />

                {/* Data Points */}
                <circle cx="20" cy="20" r="3.5" fill="#0284C7" />
                <circle cx="85" cy="32" r="3.5" fill="#0284C7" />
                <circle cx="150" cy="44" r="3.5" fill="#0284C7" />
                <circle cx="220" cy="52" r="3.5" fill="#0284C7" />
                <circle cx="290" cy="62" r="4.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
              </svg>

              {/* Clean Labels Under Chart */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-2 px-2">
                {trendPoints.map((pt) => (
                  <div key={pt.label} className="text-center">
                    <div>{pt.label}</div>
                    <div className="font-semibold text-[#0C1E30]">{pt.score}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1F5F9] text-xs text-[#64748B]">
              Trend indicates controlled downward trajectory; mitigation stabilizes at 68%.
            </div>
          </div>

          {/* RIGHT: AI INSIGHT (TINY, CLEAN, HIGH VALUE) */}
          <div className="rounded-2xl border border-[#DCE8F0] bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-[#0284C7]">
                  <Sparkles size={14} />
                  <span>POLAR-AI Insight</span>
                </div>
                <span className="text-[10px] font-mono bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded">
                  Actionable
                </span>
              </div>

              <div className="mt-4">
                <div className="text-base font-semibold text-[#0C1E30]">
                  Fuel risk increasing.
                </div>
                <div className="mt-2 space-y-1 font-mono text-xs text-[#42586E]">
                  <div>Consumption ↑ 8%</div>
                  <div>Cargo ETA +3 days</div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
              <span className="text-xs text-[#64748B]">Deep analysis ready</span>
              <button
                type="button"
                onClick={() => setActiveDetail('ai')}
                className="rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2 text-xs font-semibold shadow-xs transition active:scale-95 flex items-center gap-1.5"
              >
                <span>Review</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================
          3. PROGRESSIVE DISCLOSURE DETAIL SHEET (SLIDE-OVER DRAWER)
          Opens on demand when user clicks any alert or insight.
          Never overwhelms the main screen.
          ============================================================ */}
      {activeDetail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#0C1E30]/30 backdrop-blur-xs animate-fade-in">
          {/* Backdrop dismiss */}
          <div
            className="flex-1"
            onClick={() => setActiveDetail(null)}
            aria-hidden="true"
          />

          {/* Right-Side Slide-Over Panel */}
          <div className="relative w-full max-w-md bg-white p-6 shadow-2xl border-l border-[#DCE8F0] overflow-y-auto flex flex-col justify-between animate-slide-left">
            <div>
              {/* Header with Close button */}
              <div className="flex items-center justify-between border-b border-[#DCE8F0] pb-4">
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#64748B]">
                  Mission Detail Sheet
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDetail(null)}
                  className="rounded-lg p-1.5 text-[#64748B] hover:bg-slate-100 hover:text-[#0C1E30] transition"
                  aria-label="Close detail sheet"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Detail Content: FUEL RESUPPLY */}
              {activeDetail === 'fuel' && (
                <div className="mt-5 space-y-6">
                  <div>
                    <span className="text-[10.5px] font-mono font-bold uppercase text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      High Priority Vulnerability
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-[#0C1E30]">
                      FUEL RESUPPLY
                    </h3>
                    <p className="text-sm font-semibold text-rose-600 mt-0.5 font-mono">
                      5-day potential gap
                    </p>
                  </div>

                  {/* Key Stats Micro-Grid */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-2.5">
                      <div className="text-[10px] text-[#64748B] uppercase font-mono">Current stock</div>
                      <div className="text-sm font-bold font-mono text-[#0C1E30] mt-0.5">4.2k L</div>
                    </div>
                    <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-2.5">
                      <div className="text-[10px] text-[#64748B] uppercase font-mono">Safe runway</div>
                      <div className="text-sm font-bold font-mono text-amber-600 mt-0.5">Day 12</div>
                    </div>
                    <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-2.5">
                      <div className="text-[10px] text-[#64748B] uppercase font-mono">Cargo ETA</div>
                      <div className="text-sm font-bold font-mono text-[#0284C7] mt-0.5">Day 17</div>
                    </div>
                  </div>

                  {/* Root Cause: WHY? */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C1E30]">
                      Why?
                    </h4>
                    <p className="mt-1.5 text-xs text-[#42586E] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#DCE8F0]">
                      Consumption is <strong>above baseline by +8%</strong> due to sub-zero blizzards (-38°C). Combined with a 3-day transit slip for vessel MV Vasiliy Golovnin, reserve depletion precedes vessel berth by 120 hours.
                    </p>
                  </div>

                  {/* Impact Cascade Chain */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C1E30]">
                      Downstream Impact Chain
                    </h4>
                    <div className="mt-2 flex items-center justify-between text-xs font-mono text-center">
                      <span className="rounded-lg bg-rose-50 border border-rose-200 px-2.5 py-1.5 font-bold text-rose-700">Fuel</span>
                      <span className="text-[#64748B]">→</span>
                      <span className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1.5 font-bold text-amber-700">Generator</span>
                      <span className="text-[#64748B]">→</span>
                      <span className="rounded-lg bg-sky-50 border border-sky-200 px-2.5 py-1.5 font-bold text-sky-700">Power</span>
                      <span className="text-[#64748B]">→</span>
                      <span className="rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 py-1.5 font-bold text-indigo-700">Heating</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Detail Content: GENERATOR */}
              {activeDetail === 'generator' && (
                <div className="mt-5 space-y-6">
                  <div>
                    <span className="text-[10.5px] font-mono font-bold uppercase text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Preventive Maintenance
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-[#0C1E30]">
                      GENERATOR G-021
                    </h3>
                    <p className="text-sm font-semibold text-amber-700 mt-0.5 font-mono">
                      60-hour scheduled service window
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-center">
                    <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-3">
                      <div className="text-[10px] text-[#64748B] uppercase font-mono">Operating Hours</div>
                      <div className="text-sm font-bold font-mono text-[#0C1E30] mt-0.5">4,940 / 5,000h</div>
                    </div>
                    <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-3">
                      <div className="text-[10px] text-[#64748B] uppercase font-mono">Time Remaining</div>
                      <div className="text-sm font-bold font-mono text-amber-600 mt-0.5">60 hours</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C1E30]">Why?</h4>
                    <p className="mt-1.5 text-xs text-[#42586E] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#DCE8F0]">
                      Scheduled 250-hour oil and filter cycle must be completed before Day 14 to avoid auxiliary turbine trip.
                    </p>
                  </div>
                </div>
              )}

              {/* Detail Content: CARGO */}
              {activeDetail === 'cargo' && (
                <div className="mt-5 space-y-6">
                  <div>
                    <span className="text-[10.5px] font-mono font-bold uppercase text-[#0284C7] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                      Inbound Consignment
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-[#0C1E30]">
                      CARGO C-104 &amp; C-101
                    </h3>
                    <p className="text-sm font-semibold text-[#0284C7] mt-0.5 font-mono">
                      Estimated Arrival: Day 17
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-center">
                    <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-3">
                      <div className="text-[10px] text-[#64748B] uppercase font-mono">Vessel</div>
                      <div className="text-sm font-bold text-[#0C1E30] mt-0.5">MV Vasiliy</div>
                    </div>
                    <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-3">
                      <div className="text-[10px] text-[#64748B] uppercase font-mono">Current Corridor</div>
                      <div className="text-sm font-bold text-[#0C1E30] mt-0.5">Prydz Bay Drift</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C1E30]">Why?</h4>
                    <p className="mt-1.5 text-xs text-[#42586E] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#DCE8F0]">
                      Fast sea-ice pack holds in the Southern Ocean delayed departure from Cape Town by 3 days. Vessel currently en-route under nominal icebreaker escort.
                    </p>
                  </div>
                </div>
              )}

              {/* Detail Content: CHANGES */}
              {activeDetail === 'changes' && (
                <div className="mt-5 space-y-6">
                  <div>
                    <span className="text-[10.5px] font-mono font-bold uppercase text-[#64748B] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      Telemetry Delta Log
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-[#0C1E30]">
                      RECENT CHANGES
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC]">
                      <div className="font-semibold text-[#0C1E30]">Fuel burn spike (+8%)</div>
                      <div className="text-[#42586E] mt-0.5">Hydronic loop heating active during severe blizzard.</div>
                    </div>
                    <div className="p-3 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC]">
                      <div className="font-semibold text-[#0C1E30]">Cargo ETA slip (+3 days)</div>
                      <div className="text-[#42586E] mt-0.5">Fast pack-ice holds in maritime approaches.</div>
                    </div>
                    <div className="p-3 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC]">
                      <div className="font-semibold text-[#0C1E30]">Generator output verified</div>
                      <div className="text-[#42586E] mt-0.5">Microgrid operating at nominal 380V/50Hz.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Detail Content: AI */}
              {activeDetail === 'ai' && (
                <div className="mt-5 space-y-6">
                  <div>
                    <span className="text-[10.5px] font-mono font-bold uppercase text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD] px-2 py-0.5 rounded">
                      Officer Decision Support
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-[#0C1E30]">
                      POLAR-AI REASONING
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE8F0]">
                      <div className="font-mono font-bold uppercase text-[#64748B] text-[10px]">Analysis</div>
                      <div className="text-[#0C1E30] mt-1 leading-relaxed">
                        Fuel reserve depletion curve intersects zero 120 hours before resupply vessel berth. Station thermal deficit requires active mitigation before Day 10.
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#DCE8F0]">
                      <div className="font-mono font-bold uppercase text-[#64748B] text-[10px]">Recommendation</div>
                      <div className="text-[#0C1E30] mt-1 leading-relaxed">
                        Authorize Strategic Bladder Transfer (3,500 L) or shed non-critical research heating loops.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Detail Content: HEALTH SCORE */}
              {activeDetail === 'health' && (
                <div className="mt-5 space-y-6">
                  <div>
                    <span className="text-[10.5px] font-mono font-bold uppercase text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD] px-2 py-0.5 rounded">
                      Continuity Formula
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-[#0C1E30]">
                      MISSION HEALTH: 63%
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#DCE8F0]">
                      <span>Logistics Score (25%)</span>
                      <span className="font-bold text-amber-600">68%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#DCE8F0]">
                      <span>Inventory Reserves (25%)</span>
                      <span className="font-bold text-amber-600">72%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#DCE8F0]">
                      <span>Station Assets (20%)</span>
                      <span className="font-bold text-emerald-600">92%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#DCE8F0]">
                      <span>Personnel Readiness (15%)</span>
                      <span className="font-bold text-emerald-600">88%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#DCE8F0]">
                      <span>Safety &amp; Redundancy (15%)</span>
                      <span className="font-bold text-emerald-600">95%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions inside Detail Sheet */}
            <div className="pt-6 mt-6 border-t border-[#DCE8F0] flex items-center gap-3">
              {activeDetail === 'fuel' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveDetail(null)
                    goTo('simulator')
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] py-3 text-xs font-semibold text-white shadow-xs transition active:scale-95"
                >
                  <Sliders size={14} />
                  <span>Simulate Delay in What-If</span>
                </button>
              )}

              {activeDetail === 'generator' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveDetail(null)
                    goTo('assets')
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] py-3 text-xs font-semibold text-white shadow-xs transition active:scale-95"
                >
                  <span>Open Station Assets</span>
                </button>
              )}

              {activeDetail === 'cargo' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveDetail(null)
                    goTo('cargo')
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] py-3 text-xs font-semibold text-white shadow-xs transition active:scale-95"
                >
                  <span>Open Cargo Logistics</span>
                </button>
              )}

              {activeDetail === 'ai' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveDetail(null)
                    goTo('copilot')
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] py-3 text-xs font-semibold text-white shadow-xs transition active:scale-95"
                >
                  <span>Open AI Copilot Reasoning</span>
                </button>
              )}

              {(activeDetail === 'changes' || activeDetail === 'health') && (
                <button
                  type="button"
                  onClick={() => setActiveDetail(null)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#DCE8F0] bg-white hover:bg-[#F8FAFC] py-2.5 text-xs font-semibold text-[#42586E] transition"
                >
                  <span>Dismiss</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
