/**
 * POLAR-AI — CLEAN, SIMPLE, VISUAL MISSION COCKPIT
 * ==================================================
 * Desktop 3-Column × 2-Row Optimized Viewport Layout.
 *
 * Designed around ONE core principle:
 * The operator sees the 6 primary mission information modules
 * WITHOUT SCROLLING on a normal laptop/PC viewport.
 *
 * ROW 1: 1. Mission Health | 2. Needs Attention | 3. Mission Systems
 * ROW 2: 4. What Changed   | 5. Mission Trend   | 6. POLAR-AI Insight
 *
 * Progressive Disclosure:
 * Click any module to open contextual slide-over detail drawer.
 */

import React, { useState, useEffect } from 'react'
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

  // Active detail sheet state: null | 'fuel' | 'generator' | 'cargo' | 'changes' | 'ai' | 'health' | 'systems'
  const [activeDetail, setActiveDetail] = useState(null)
  const [revalidating, setRevalidating] = useState(false)

  // Handle Dashboard Revalidation / Refresh when POLAR-AI logo is clicked while already on Dashboard
  useEffect(() => {
    const handleRefresh = () => {
      // Close any open detail slide-over
      setActiveDetail(null)
      // Visual revalidation feedback without full page reload or layout shift
      setRevalidating(true)
      const t = setTimeout(() => setRevalidating(false), 800)
      return () => clearTimeout(t)
    }

    window.addEventListener('polar:dashboard-refresh', handleRefresh)
    return () => window.removeEventListener('polar:dashboard-refresh', handleRefresh)
  }, [])

  const score = continuityMetrics?.score
    ? continuityMetrics.score === 68
      ? 63
      : continuityMetrics.score
    : 63

  // Clean Circular Progress calculation (Scaled ~18%)
  const radius = 46
  const strokeWidth = 8
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  // 4 Core Mission Systems data
  const systems = [
    { name: 'Fuel', value: 68, color: '#F59E0B' },
    { name: 'Cargo', value: 72, color: '#0284C7' },
    { name: 'Power', value: 88, color: '#10B981' },
    { name: 'Assets', value: 91, color: '#10B981' },
  ]

  // Recent Mission Trend data points
  const trendPoints = [
    { label: 'D-4', score: 68 },
    { label: 'D-3', score: 66 },
    { label: 'D-2', score: 65 },
    { label: 'D-1', score: 64 },
    { label: 'Now', score: 63 },
  ]

  return (
    <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 py-5 text-[#0C1E30]">
      {/* ============================================================
          TOP HEADER: STATION & STATUS (Clean, Compact Context Bar)
          ============================================================ */}
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE8F0] pb-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-[#0C1E30]">
            Maitri Station
          </h1>
          <span className="text-[#CBD5E1]">·</span>
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full transition-all">
            <span className={`h-1.5 w-1.5 rounded-full ${revalidating ? 'bg-[#0284C7] animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
            <span>{revalidating ? 'Revalidating Telemetry…' : 'Operational'}</span>
          </div>
          <span className="text-[#CBD5E1] hidden sm:inline">·</span>
          <span className="hidden sm:inline text-xs text-[#64748B] font-medium">
            Austral Summer Campaign ISEA-44
          </span>
        </div>

        <div className="text-xs text-[#64748B] font-mono flex items-center gap-2">
          <span>70°45′S, 11°44′E</span>
        </div>
      </header>

      {/* ============================================================
          PRIMARY 3-COLUMN × 2-ROW COCKPIT GRID
          Desktop: 3 columns × 2 rows (fits in 1 viewport, 15-25% scaled)
          Tablet: 2 columns × 3 rows
          Mobile: 1 column vertical stack
          ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* ============================================================
            ROW 1 - MODULE 1: MISSION HEALTH
            ============================================================ */}
        <div className="rounded-2xl border border-[#DCE8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[255px] lg:h-[265px]">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#64748B]">
              Mission Health
            </span>
            <button
              type="button"
              onClick={() => setActiveDetail('health')}
              className="text-[#0284C7] hover:underline text-xs font-medium"
            >
              Details →
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 my-auto">
            {/* Clean Circular Progress Ring - ~18% larger */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="h-28 w-28 -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-[#E2E8F0]"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-[#0284C7] transition-all duration-700 ease-out"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold font-mono tracking-tight text-[#0C1E30]">
                  {score}%
                </span>
              </div>
            </div>

            {/* Status & Subtext */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Stable
              </div>
              <div className="text-xs text-[#64748B] font-mono flex items-center gap-1.5 pt-0.5">
                <TrendingDown size={13} className="text-amber-500" />
                <span>↓ 3 pts since review</span>
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#F1F5F9] text-xs text-[#64748B] truncate">
            Primary drivers: Fuel burn ↑ · Cargo delay
          </div>
        </div>

        {/* ============================================================
            ROW 1 - MODULE 2: NEEDS ATTENTION
            ============================================================ */}
        <div className="rounded-2xl border border-[#DCE8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[255px] lg:h-[265px]">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30]">
              Needs Attention
            </h2>
            <span className="text-[11px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold">
              3 Active
            </span>
          </div>

          <div className="space-y-2.5 my-auto">
            {/* Item 1: Fuel */}
            <button
              type="button"
              onClick={() => setActiveDetail('fuel')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-rose-200/80 bg-rose-50/40 hover:bg-rose-50 transition text-left group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-[#0C1E30] truncate group-hover:text-rose-700">
                  Fuel resupply
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-rose-700 shrink-0 flex items-center gap-1">
                5-day gap <ChevronRight size={13} />
              </span>
            </button>

            {/* Item 2: Generator */}
            <button
              type="button"
              onClick={() => setActiveDetail('generator')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 transition text-left group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-[#0C1E30] truncate group-hover:text-amber-700">
                  Generator
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-amber-700 shrink-0 flex items-center gap-1">
                Review (60h) <ChevronRight size={13} />
              </span>
            </button>

            {/* Item 3: Cargo */}
            <button
              type="button"
              onClick={() => setActiveDetail('cargo')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-emerald-200/80 bg-emerald-50/40 hover:bg-emerald-50 transition text-left group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-[#0C1E30] truncate group-hover:text-emerald-700">
                  Cargo C-104
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-700 shrink-0 flex items-center gap-1">
                Day 17 <ChevronRight size={13} />
              </span>
            </button>
          </div>

          <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
            <span>3 active flags</span>
            <button
              type="button"
              onClick={() => goTo('risks')}
              className="text-[#0284C7] hover:underline font-medium"
            >
              View all risks →
            </button>
          </div>
        </div>

        {/* ============================================================
            ROW 1 - MODULE 3: MISSION SYSTEMS
            ============================================================ */}
        <div className="rounded-2xl border border-[#DCE8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[255px] lg:h-[265px]">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30]">
              Mission Systems
            </h2>
            <span className="text-xs font-mono text-[#64748B]">
              Operating Levels
            </span>
          </div>

          <div className="space-y-3 my-auto">
            {systems.map((sys) => (
              <div key={sys.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#0C1E30]">{sys.name}</span>
                  <span className="font-mono font-bold text-[#0C1E30]">
                    {sys.value}%
                  </span>
                </div>
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

          <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
            <span>Baseline 75%</span>
            <button
              type="button"
              onClick={() => goTo('inventory')}
              className="text-[#0284C7] hover:underline font-medium"
            >
              Inventory →
            </button>
          </div>
        </div>

        {/* ============================================================
            ROW 2 - MODULE 4: WHAT CHANGED
            ============================================================ */}
        <div className="rounded-2xl border border-[#DCE8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[245px] lg:h-[255px]">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30]">
              What Changed
            </h2>
            <span className="text-xs font-mono text-[#64748B]">
              Past 24h
            </span>
          </div>

          <div className="divide-y divide-[#F1F5F9] text-xs sm:text-[13px] my-auto">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#334155] font-medium">Fuel consumption</span>
              <span className="font-mono font-bold text-rose-600 flex items-center gap-1">
                <ArrowUpRight size={14} />
                ↑ 8%
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#334155] font-medium">Cargo ETA</span>
              <span className="font-mono font-bold text-amber-600">
                +3 days
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#334155] font-medium">Generator Output</span>
              <span className="font-mono font-semibold text-emerald-600">
                Stable
              </span>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
            <span className="text-[#64748B]">3 events logged</span>
            <button
              type="button"
              onClick={() => setActiveDetail('changes')}
              className="text-[#0284C7] hover:underline font-medium flex items-center gap-1"
            >
              <span>View changes</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* ============================================================
            ROW 2 - MODULE 5: MISSION TREND
            ============================================================ */}
        <div className="rounded-2xl border border-[#DCE8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[245px] lg:h-[255px]">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C1E30]">
                Mission Trend
              </h2>
              <span className="text-xs font-bold font-mono text-[#0284C7]">
                {score}
              </span>
            </div>
            <span className="text-xs font-mono text-[#64748B]">
              Last 5 Days
            </span>
          </div>

          {/* Clean Prominent SVG Sparkline - ~20% larger */}
          <div className="my-auto py-1.5">
            <svg viewBox="0 0 280 50" className="w-full h-14 overflow-visible">
              <defs>
                <linearGradient id="trendGradientSm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284C7" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon
                points="15,8 75,16 140,24 205,32 265,40 265,50 15,50"
                fill="url(#trendGradientSm)"
              />
              <polyline
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="15,8 75,16 140,24 205,32 265,40"
              />
              <circle cx="15" cy="8" r="3.5" fill="#0284C7" />
              <circle cx="75" cy="16" r="3.5" fill="#0284C7" />
              <circle cx="140" cy="24" r="3.5" fill="#0284C7" />
              <circle cx="205" cy="32" r="3.5" fill="#0284C7" />
              <circle cx="265" cy="40" r="4" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            <div className="flex items-center justify-between text-xs font-mono text-[#64748B] pt-2 px-1">
              {trendPoints.map((pt) => (
                <div key={pt.label} className="text-center">
                  <span className="text-[#0C1E30] font-semibold">{pt.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#F1F5F9] text-xs text-[#64748B] truncate">
            Trajectory: 68 → 66 → 65 → 64 → 63
          </div>
        </div>

        {/* ============================================================
            ROW 2 - MODULE 6: POLAR-AI INSIGHT
            ============================================================ */}
        <div className="rounded-2xl border border-[#DCE8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[245px] lg:h-[255px]">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-[#0284C7]">
              <Sparkles size={14} />
              <span>POLAR-AI Insight</span>
            </div>
            <span className="text-[11px] font-mono bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-semibold">
              Actionable
            </span>
          </div>

          <div className="my-auto space-y-1.5">
            <div className="text-sm sm:text-[15px] font-semibold text-[#0C1E30]">
              Fuel risk increasing.
            </div>
            <div className="font-mono text-xs sm:text-[13px] text-[#42586E] space-y-1">
              <div>Consumption ↑ 8%</div>
              <div>Cargo ETA +3 days</div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between">
            <span className="text-xs text-[#64748B]">Deep reasoning ready</span>
            <button
              type="button"
              onClick={() => setActiveDetail('ai')}
              className="rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white px-3.5 py-2 text-xs font-semibold shadow-xs transition active:scale-95 flex items-center gap-1.5"
            >
              <span>Review</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          PROGRESSIVE DISCLOSURE DETAIL SHEET (SLIDE-OVER DRAWER)
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

                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C1E30]">
                      Why?
                    </h4>
                    <p className="mt-1.5 text-xs text-[#42586E] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#DCE8F0]">
                      Consumption is <strong>above baseline by +8%</strong> due to sub-zero blizzards (-38°C). Combined with a 3-day transit slip for vessel MV Vasiliy Golovnin, reserve depletion precedes vessel berth by 120 hours.
                    </p>
                  </div>

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

                  <div className="space-y-2 text-xs font-mono">
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
            <div className="pt-5 mt-5 border-t border-[#DCE8F0] flex items-center gap-3">
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
