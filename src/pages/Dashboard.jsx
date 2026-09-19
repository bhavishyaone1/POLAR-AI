/**
 * DASHBOARD — POLAR COMMAND CENTER & CONTINUITY INTELLIGENCE
 * ==========================================================
 * Pixel-perfect implementation matching the official reference design:
 * 1. "CURRENT EXPEDITION" Panoramic Antarctic Hero Banner with blended mountain photograph
 * 2. 5-Card Operational Metrics Strip:
 *    - Mission Continuity (animated circular progress donut: 68%)
 *    - Critical Risk (Fuel Resupply Risk, 5-day supply gap)
 *    - Cargo (C-104 In Transit, ETA 17 days)
 *    - Inventory (Fuel 12 days remaining, safe level 4 days)
 *    - Assets (Generator G-021 maintenance in 60 hours)
 * 3. Middle Tri-Column Operational Grid:
 *    - Mission Overview Light Arctic Map (6 cols on lg)
 *    - Recent Mission Events vertical timeline (3 cols on lg)
 *    - AI Mission Insight & Quick Actions panel (3 cols on lg)
 * 4. Mission Progress Horizontal Milestone Timeline (Full width):
 *    - Preparation (Nov 2026) -> Departure (Dec 2026) -> Arrival (Jan 2027) -> Current Operations (Feb 2027 active) -> Resupply (Mar 2027) -> Return (Apr 2027)
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Boxes,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Flag,
  MapPin,
  Minus,
  Navigation,
  Package,
  Play,
  Plus,
  Ship,
  Sliders,
  Sparkles,
  Users,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function Dashboard({ goTo, onStartGuidedDemo }) {
  const { continuityMetrics } = useData()

  const [mapZoom, setMapZoom] = useState(1)
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false)

  const score = continuityMetrics?.score ? (continuityMetrics.score === 68 ? 63 : continuityMetrics.score) : 63

  // Radial gauge calculations for 63%
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="pb-16">
      {/* ============================================================
          DESKTOP & TABLET DASHBOARD (LOCKED & UNTOUCHED for >= 768px)
          ============================================================ */}
      <div className="hidden md:block space-y-4">
        {/* ============================================================
            1. COMPACT MISSION COMMAND HERO BANNER
            ============================================================ */}
        <section className="relative overflow-hidden rounded-xl border border-[#DCE8F0] bg-white shadow-2xs">
        {/* Right side photorealistic Antarctic research station background with clean fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 md:w-5/12 bg-cover bg-center z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/polar-hero-bg.jpg')",
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div className="relative z-10 px-5 py-4 sm:px-6 sm:py-5 flex flex-col justify-between max-w-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded border border-[#BAE6FD]">
                POLAR-AI · Mission Command
              </span>
              <span className="text-[11px] text-[#6E8294] font-mono">ISEA-44</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0C1E30] mt-1.5">
              Maitri Station Operations Command
            </h1>
            <p className="text-xs text-[#42586E] mt-0.5">
              44th Indian Scientific Expedition · Queen Maud Land, Antarctica
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#6E8294] pt-2.5 mt-2 border-t border-[#F1F5F9]">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#0284C7]" />
              <span>70°45′57″S, 11°44′09″E</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} />
              <span>Austral Summer Campaign 2026–27</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={13} />
              <span>50 Deployed</span>
            </div>
          </div>
        </div>

        {/* Operational Readiness Status on Top Right */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20">
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white/95 px-3 py-1 text-xs font-medium text-emerald-800 shadow-2xs backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operational Readiness: Nominal</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. FIVE OPERATIONAL CARDS STRIP
          ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
        {/* CARD 1: MISSION CONTINUITY (Dominant, Spans 4 cols on lg) */}
        <div className="sm:col-span-2 lg:col-span-4 rounded-xl border border-[#DCE8F0] bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-[17px] font-semibold text-[#0C1E30] tracking-tight">
              Mission Continuity
            </h2>

            <div className="mt-3 flex items-center gap-4">
              {/* Radial Donut Gauge */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg width="104" height="104" className="transform -rotate-90">
                  <circle
                    cx="52"
                    cy="52"
                    r={radius}
                    stroke="#E6F3F9"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="52"
                    cy="52"
                    r={radius}
                    stroke="#0284C7"
                    strokeWidth="9"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-semibold tracking-tight text-[#0C1E30]">
                    {score}<span className="text-sm font-normal text-[#6E8294] ml-0.5">%</span>
                  </span>
                </div>
              </div>

              {/* Status & Short Explanation */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                  <AlertTriangle size={12} className="text-amber-600" />
                  <span>Resupply Deficit Flagged</span>
                </div>
                <p className="text-xs text-[#42586E] leading-relaxed">
                  Fuel runway may fall below safe threshold before next resupply.
                </p>
                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => setShowScoreBreakdown(true)}
                    className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Why is score {score}%?</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: CRITICAL RISK (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-xl border border-[#DCE8F0] bg-white p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-rose-700">
                Critical Risk
              </span>
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#0C1E30] tracking-tight">
                Resupply Gap
              </h3>
              <div className="mt-1 text-2xl font-semibold text-[#0C1E30] tracking-tight">
                5 days <span className="text-xs font-normal text-rose-700">deficit</span>
              </div>
              <p className="text-xs text-[#42586E] mt-1 leading-snug">
                Fuel runway may fall below safe threshold.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F8FAFC]">
            <button
              type="button"
              onClick={() => goTo('risks')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>View risk</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 3: CARGO (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-xl border border-[#DCE8F0] bg-white p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#0284C7]">
                Maritime Corridor
              </span>
              <span className="text-[10.5px] font-mono text-[#6E8294]">C-101</span>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#0C1E30] tracking-tight">
                Consignment C-101
              </h3>
              <div className="mt-1 text-2xl font-semibold text-[#0C1E30] tracking-tight">
                ETA Day 17 <span className="text-xs font-normal text-amber-700 font-mono">(+3d)</span>
              </div>
              <p className="text-xs text-[#42586E] mt-1 leading-snug">
                Weddell Sea pack-ice impediment.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F8FAFC]">
            <button
              type="button"
              onClick={() => goTo('cargo')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>Track cargo</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 4: INVENTORY (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-xl border border-[#DCE8F0] bg-white p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#42586E]">
                Station Runway
              </span>
              <span className="text-[10.5px] font-mono text-[#6E8294]">Diesel</span>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#0C1E30] tracking-tight">
                14,200 L Reserve
              </h3>
              <div className="mt-1 text-2xl font-semibold text-[#0C1E30] tracking-tight">
                12.0 days <span className="text-xs font-normal text-[#6E8294]">runway</span>
              </div>
              <p className="text-xs text-[#42586E] mt-1 leading-snug">
                Depletes before next scheduled vessel.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F8FAFC]">
            <button
              type="button"
              onClick={() => goTo('inventory')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>Manage stocks</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 5: ASSETS (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-xl border border-[#DCE8F0] bg-white p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#42586E]">
                Primary Power
              </span>
              <span className="text-[10.5px] font-mono text-emerald-700 font-medium">Nominal</span>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#0C1E30] tracking-tight">
                Generator G-01
              </h3>
              <div className="mt-1 text-2xl font-semibold text-[#0C1E30] tracking-tight">
                60h <span className="text-xs font-normal text-amber-700">remaining</span>
              </div>
              <p className="text-xs text-[#42586E] mt-1 leading-snug">
                Service threshold approaching.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F8FAFC]">
            <button
              type="button"
              onClick={() => goTo('assets')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>Inspect assets</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          2.5. AI MISSION BRIEFING & CHANGE DETECTION STRIP
          ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Morning Operational Brief (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[#DCE8F0] bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#F0F7FB] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider bg-[#E0F2FE] text-[#0284C7] px-2 py-0.5 rounded-md border border-[#BAE6FD]">
                  ✦ AI Mission Brief
                </span>
                <span className="text-xs text-[#42586E] font-normal">08:00 UTC · Station Cycle 42</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Nominal Baseline
              </span>
            </div>

            <h3 className="text-[16px] font-semibold text-[#0C1E30] tracking-tight">
              Daily Operations Briefing
            </h3>
            <p className="text-[13.5px] text-[#42586E] mt-0.5 leading-normal">
              Autonomous continuity engines flag 3 operational items requiring command review.
            </p>

            <div className="mt-3.5 space-y-2">
              <div className="flex items-center justify-between gap-3 text-[13px] bg-[#F8FAFC] px-3 py-2.5 rounded-lg border border-[#E8F0F5]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">01</span>
                  <span className="font-medium text-[#0C1E30] truncate">Fuel resupply deficit</span>
                </div>
                <span className="text-xs text-[#42586E] shrink-0 font-normal">5-day potential gap</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-[13px] bg-[#F8FAFC] px-3 py-2.5 rounded-lg border border-[#E8F0F5]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">02</span>
                  <span className="font-medium text-[#0C1E30] truncate">Generator maintenance</span>
                </div>
                <span className="text-xs text-[#42586E] shrink-0 font-normal">60h to service threshold</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-[13px] bg-[#F8FAFC] px-3 py-2.5 rounded-lg border border-[#E8F0F5]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs font-semibold text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD] px-1.5 py-0.5 rounded">03</span>
                  <span className="font-medium text-[#0C1E30] truncate">Cargo delay</span>
                </div>
                <span className="text-xs text-[#42586E] shrink-0 font-normal">ETA +3 days</span>
              </div>
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-[#F0F7FB] flex items-center justify-between">
            <span className="text-[11.5px] text-[#6E8294]">Zero unacknowledged distress events</span>
            <button
              type="button"
              onClick={() => goTo('copilot')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>Consult AI Copilot Briefing</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Change Detection (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[#DCE8F0] bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#F0F7FB] pb-3 mb-3">
              <span className="text-[11px] font-mono font-medium uppercase tracking-wider bg-[#F8FAFC] text-[#42586E] px-2 py-0.5 rounded-md border border-[#DCE8F0]">
                Telemetry Δ 24h
              </span>
              <span className="text-[11px] text-[#6E8294] font-mono">Real-time sync</span>
            </div>

            <h3 className="text-[16px] font-semibold text-[#0C1E30] tracking-tight">
              Anomaly &amp; Drift Detection
            </h3>

            <div className="mt-3 divide-y divide-[#F0F7FB]">
              <div className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-[#0C1E30] truncate">Station fuel burn rate</div>
                  <div className="text-[11px] text-[#6E8294] truncate">Thermal heating load</div>
                </div>
                <span className="font-mono text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded shrink-0">
                  ↑ 8%
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-[#0C1E30] truncate">Cargo C-101 arrival</div>
                  <div className="text-[11px] text-[#6E8294] truncate">Weddell Sea ice pack hold</div>
                </div>
                <span className="font-mono text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded shrink-0">
                  +3 days
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-[#0C1E30] truncate">Generator G-01 servicing</div>
                  <div className="text-[11px] text-[#6E8294] truncate">Signed off by Chief Eng.</div>
                </div>
                <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shrink-0">
                  ✓ Verified
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-medium text-[#0C1E30] truncate">Resupply deficit flagged</div>
                  <div className="text-[11px] text-rose-700 font-medium truncate">Action required</div>
                </div>
                <span className="font-mono text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded shrink-0">
                  RSK-001
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-[#F0F7FB] flex items-center justify-between">
            <span className="text-[11.5px] text-[#6E8294]">4 verified parameter drifts</span>
            <button
              type="button"
              onClick={() => goTo('simulator')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>Simulate Scenario Drift</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          3. MIDDLE SECTION: 3-COLUMN OPERATIONAL GRID (6 + 3 + 3)
          ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: MISSION OVERVIEW LIGHT ARCTIC MAP (Spans 6 cols on lg) */}
        <div className="lg:col-span-6 rounded-xl border border-[#DCE8F0] bg-white p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div>
              <h2 className="text-[17px] font-semibold text-[#0C1E30] tracking-tight">
                Mission Overview
              </h2>
              <p className="text-xs text-[#6E8294] mt-0.5">
                Live location, cargo routes and key assets
              </p>
            </div>

            <button
              type="button"
              onClick={() => goTo('map')}
              className="rounded-lg border border-[#DCE8F0] bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-medium text-[#42586E] shadow-2xs transition inline-flex items-center gap-1"
            >
              <span>View Full Map</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Interactive Antarctic Vector Map Canvas */}
          <div className="relative mt-4 h-[330px] sm:h-[360px] w-full rounded-xl overflow-hidden bg-[#EFF6FA] border border-[#DCE8F0] select-none">
            {/* Topographic Background Landmass & Ice Shelf SVG */}
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full object-cover"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="iceShelfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#E2F1F8" />
                  <stop offset="100%" stopColor="#CDE6F3" />
                </linearGradient>

                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EBF4F9" />
                  <stop offset="100%" stopColor="#D9ECF7" />
                </linearGradient>

                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D1E5F1" strokeWidth="0.5" opacity="0.6" />
                </pattern>
              </defs>

              {/* Southern Ocean */}
              <rect width="100%" height="100%" fill="url(#oceanGrad)" />
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Continental Ice Mass Outline */}
              <path
                d="M 50,420 Q 120,380 200,430 T 400,460 T 600,410 T 750,450 L 800,500 L 0,500 Z"
                fill="#C5DFED"
                opacity="0.6"
              />
              <path
                d="M 80,310 Q 150,220 280,260 T 480,290 T 680,240 T 780,280 L 800,500 L 0,500 Z"
                fill="url(#iceShelfGrad)"
              />

              {/* Subtle Relief Contours */}
              <ellipse cx="280" cy="220" rx="140" ry="70" fill="#FFFFFF" opacity="0.8" />
              <ellipse cx="500" cy="270" rx="160" ry="80" fill="#FFFFFF" opacity="0.75" />

              {/* SVG CARGO MARITIME ROUTE (Dashed Sky-Blue Vector) */}
              <path
                d="M 270,120 C 300,160 300,240 280,270 C 260,300 360,340 440,360"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />

              {/* CRITICAL SHORTAGE INCIDENT CORRIDOR (Red Dashed Line) */}
              <path
                d="M 440,360 Q 470,360 490,350"
                fill="none"
                stroke="#E5484D"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />

              {/* WAYPOINT 1: Maitri Station */}
              <g transform="translate(270, 120)">
                <circle r="16" fill="#E0F2FE" opacity="0.6" />
                <circle r="8" fill="#0284C7" />
                <circle r="4" fill="#FFFFFF" />
              </g>

              {/* WAYPOINT 2: Field Camp B */}
              <g transform="translate(280, 270)">
                <circle r="14" fill="#D1FAE5" opacity="0.7" />
                <circle r="7" fill="#10B981" />
                <circle r="3.5" fill="#FFFFFF" />
              </g>

              {/* VESSEL: C-104 */}
              <g transform="translate(440, 360)">
                <circle r="14" fill="#E0F2FE" />
                <circle r="7" fill="#0284C7" />
              </g>

              {/* INCIDENT BEACON: Red Alert Pulse */}
              <g transform="translate(490, 350)">
                <circle r="15" fill="#FEE2E2" className="animate-ping" opacity="0.75" />
                <circle r="9" fill="#E5484D" />
                <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">!</text>
              </g>
            </svg>

            {/* DOM Overlay: Maitri Station Label Pin */}
            <div className="absolute top-[100px] left-[290px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-[#DCE8F0] px-2.5 py-1 text-[11px] font-semibold text-[#0C1E30] shadow-xs backdrop-blur-xs">
              <div className="h-4 w-4 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-[9px]">
                ⬡
              </div>
              <span>Maitri Station Hub</span>
            </div>

            {/* DOM Overlay: Field Camp B Pin */}
            <div className="absolute top-[250px] left-[300px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-[#DCE8F0] px-2.5 py-1 text-[11px] font-semibold text-[#0C1E30] shadow-xs backdrop-blur-xs">
              <div className="h-4 w-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">
                ▲
              </div>
              <span>Field Camp Bravo</span>
            </div>

            {/* DOM Overlay: Vessel Position */}
            <div className="absolute top-[340px] left-[460px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-[#DCE8F0] px-2.5 py-1 text-[11px] font-semibold text-[#0C1E30] shadow-xs backdrop-blur-xs">
              <div className="h-4 w-4 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-[9px]">
                🚢
              </div>
              <span>MV Vasiliy Golovnin</span>
            </div>

            {/* Map Controls (Top Right: Zoom +, Zoom -, Target) */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setMapZoom((z) => Math.min(z + 0.2, 2))}
                className="h-7 w-7 rounded-lg bg-white/95 border border-[#DCE8F0] text-[#526779] hover:text-[#102A43] flex items-center justify-center shadow-2xs transition"
                title="Zoom In"
              >
                <Plus size={14} />
              </button>
              <button
                type="button"
                onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
                className="h-7 w-7 rounded-lg bg-white/95 border border-[#DCE8F0] text-[#526779] hover:text-[#102A43] flex items-center justify-center shadow-2xs transition"
                title="Zoom Out"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                onClick={() => setMapZoom(1)}
                className="h-7 w-7 rounded-lg bg-white/95 border border-[#DCE8F0] text-[#526779] hover:text-[#102A43] flex items-center justify-center shadow-2xs transition"
                title="Recenter"
              >
                <Navigation size={13} />
              </button>
            </div>

            {/* Map Legend (Bottom Left) */}
            <div className="absolute bottom-3 left-3 z-20 rounded-xl bg-white/95 border border-[#DCE8F0] p-2.5 shadow-xs backdrop-blur-xs text-[11px] text-[#42586E] space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0284C7]" />
                <span>Station</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                <span>Field Camp</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-0.5 border-b border-dashed border-[#0284C7]" />
                <span>Cargo Route</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>Incident</span>
              </div>
            </div>

            {/* Compass Rose (Bottom Right) */}
            <div className="absolute bottom-3 right-3 z-20 h-7 w-7 rounded-full bg-white/95 border border-[#DCE8F0] flex items-center justify-center text-[#42586E] shadow-2xs font-semibold text-[10px] font-mono">
              N
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: RECENT MISSION EVENTS (Spans 3 cols on lg) */}
        <div className="lg:col-span-3 rounded-xl border border-[#DCE8F0] bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0C1E30] pb-3 border-b border-slate-100">
              <Clock size={16} className="text-[#0284C7]" />
              <span>Recent Mission Events</span>
            </div>

            {/* Timeline List */}
            <div className="space-y-4 relative pl-4 mt-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {/* Event 1: Fuel shipment delay (Red) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-4 ring-white" />
                <div className="text-xs font-semibold text-rose-700">
                  Fuel shipment delay detected
                </div>
                <div className="text-[11px] text-[#42586E]">
                  Cargo C-104 • ETA 17 days
                </div>
                <div className="text-[10.5px] text-[#6E8294] font-mono">
                  2 minutes ago
                </div>
              </div>

              {/* Event 2: Generator maintenance (Blue) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-[#0284C7] ring-4 ring-white" />
                <div className="text-xs font-semibold text-[#0C1E30]">
                  Generator maintenance due
                </div>
                <div className="text-[11px] text-[#42586E]">
                  G-021 • 60 hours
                </div>
                <div className="text-[10.5px] text-[#6E8294] font-mono">
                  1 hour ago
                </div>
              </div>

              {/* Event 3: Inventory level updated (Green) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-white" />
                <div className="text-xs font-semibold text-emerald-800">
                  Inventory level updated
                </div>
                <div className="text-[11px] text-[#42586E]">
                  Fuel • 5,000 L
                </div>
                <div className="text-[10.5px] text-[#6E8294] font-mono">
                  3 hours ago
                </div>
              </div>

              {/* Event 4: Personnel status change (Slate) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-slate-400 ring-4 ring-white" />
                <div className="text-xs font-semibold text-[#42586E]">
                  Personnel status change
                </div>
                <div className="text-[11px] text-[#6E8294]">
                  Team Alpha • Field Mission
                </div>
                <div className="text-[10.5px] text-[#6E8294] font-mono">
                  5 hours ago
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => goTo('audit')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>View All Events</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: AI MISSION INSIGHT + QUICK ACTIONS (Spans 3 cols on lg) */}
        <div className="lg:col-span-3 rounded-xl border border-[#DCE8F0] bg-white p-5 shadow-2xs flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Mountain Watermark on top right */}
          <div className="absolute top-2 right-2 opacity-20 pointer-events-none">
            <svg width="70" height="45" viewBox="0 0 100 60" fill="none">
              <polygon points="50,10 90,60 10,60" fill="#BAE6FD" />
              <polygon points="50,10 70,60 10,60" fill="#7DD3FC" />
            </svg>
          </div>

          {/* AI Mission Insight Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0284C7]">
              <Sparkles size={14} />
              <span>AI Mission Insight</span>
            </div>

            <p className="text-[13px] text-[#42586E] leading-relaxed">
              Fuel resupply is projected to arrive after the current safe operating window. This may impact generator operation and research activities.
            </p>

            <div>
              <button
                type="button"
                onClick={() => goTo('copilot')}
                className="rounded-lg border border-[#0284C7] text-[#0284C7] hover:bg-[#E0F2FE] px-3.5 py-1.5 text-xs font-medium inline-flex items-center gap-1 transition shadow-2xs"
              >
                <span>Ask POLAR</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Quick Actions Sub-Section */}
          <div className="pt-4 border-t border-slate-100 mt-4 space-y-2.5">
            <div className="text-xs font-semibold text-[#0C1E30]">
              Quick Actions
            </div>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={onStartGuidedDemo}
                className="w-full text-left rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#0284C7] p-2 text-xs text-[#42586E] hover:text-[#0C1E30] font-medium flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                  <Play size={11} className="fill-[#0284C7]" />
                </div>
                <span>Run Demo</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('simulator')}
                className="w-full text-left rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#0284C7] p-2 text-xs text-[#42586E] hover:text-[#0C1E30] font-medium flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Sliders size={12} />
                </div>
                <span>Open Simulator</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('risks')}
                className="w-full text-left rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#0284C7] p-2 text-xs text-[#42586E] hover:text-[#0C1E30] font-medium flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                  <AlertTriangle size={12} />
                </div>
                <span>View Mission Risk</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('copilot')}
                className="w-full text-left rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#0284C7] p-2 text-xs text-[#42586E] hover:text-[#0C1E30] font-medium flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                  <Sparkles size={12} />
                </div>
                <span>Ask AI Copilot</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          4. BOTTOM SECTION: MISSION PROGRESS HORIZONTAL TIMELINE
          ============================================================ */}
      <section className="rounded-xl border border-[#DCE8F0] bg-white p-5 sm:p-6 shadow-2xs relative overflow-hidden">
        {/* Subtle Mountain Watermark on right */}
        <div className="absolute top-0 right-0 bottom-0 w-80 opacity-20 pointer-events-none">
          <svg viewBox="0 0 300 100" className="w-full h-full object-cover">
            <polygon points="120,20 200,90 40,90" fill="#BAE6FD" />
            <polygon points="180,35 270,90 90,90" fill="#7DD3FC" />
            <polygon points="240,15 320,90 160,90" fill="#38BDF8" />
          </svg>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-[17px] font-semibold text-[#0C1E30] tracking-tight">
              Mission Milestones &amp; Progress
            </h3>
            <p className="text-xs text-[#6E8294] mt-0.5">
              Expedition timeline and key operational phases
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11.5px] font-medium text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>On Track</span>
          </div>
        </div>

        {/* Horizontal Milestone Tracker */}
        <div className="mt-6 pt-2 pb-1 relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {[
              {
                id: 'prep',
                title: 'Preparation',
                date: 'Nov 2026',
                status: 'completed',
              },
              {
                id: 'dep',
                title: 'Departure',
                date: 'Dec 2026',
                status: 'completed',
              },
              {
                id: 'arr',
                title: 'Arrival',
                date: 'Jan 2027',
                status: 'completed',
              },
              {
                id: 'ops',
                title: 'Current Operations',
                date: 'Feb 2027',
                status: 'current',
              },
              {
                id: 'resup',
                title: 'Resupply',
                date: 'Mar 2027',
                status: 'upcoming',
              },
              {
                id: 'ret',
                title: 'Return',
                date: 'Apr 2027',
                status: 'upcoming',
              },
            ].map((step, idx) => {
              const isCompleted = step.status === 'completed'
              const isCurrent = step.status === 'current'

              return (
                <div key={step.id} className="relative flex flex-col items-start">
                  {/* Connecting Line */}
                  {idx < 5 && (
                    <div
                      className={`hidden lg:block absolute top-3.5 left-7 right-[-50%] h-[2px] z-0 ${
                        isCompleted
                          ? 'bg-[#0284C7]'
                          : 'bg-[#DCEAF1]'
                      }`}
                    />
                  )}

                  {/* Step Node Icon */}
                  <div
                    className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full font-semibold text-xs transition ${
                      isCompleted
                        ? 'bg-[#E0F2FE] text-[#0284C7] border border-[#0284C7]'
                        : isCurrent
                        ? 'bg-[#0284C7] text-white ring-4 ring-[#E0F2FE]'
                        : 'bg-white border border-[#DCEAF1] text-[#6E8294]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={14} strokeWidth={2.5} />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#DCEAF1]" />
                    )}
                  </div>

                  {/* Step Labels */}
                  <div className="mt-2.5">
                    <div
                      className={`text-xs font-semibold leading-tight ${
                        isCurrent
                          ? 'text-[#0284C7]'
                          : isCompleted
                          ? 'text-[#0C1E30]'
                          : 'text-[#6E8294]'
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-[11px] text-[#6E8294] font-mono mt-0.5">
                      {step.date}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>

    {/* ============================================================
        PURPOSE-BUILT MOBILE DASHBOARD (< 768px / md:hidden)
        Clean vertical flow · Dominant Continuity Gauge · Priority Risk · Mission Pulse
        ============================================================ */}
    <div className="block md:hidden space-y-3.5">
      {/* 1. Station Context Bar */}
      <div className="flex items-center justify-between rounded-xl border border-[#DCE8F0] bg-white px-3.5 py-2.5 shadow-2xs">
        <div className="min-w-0 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#0284C7] shrink-0" />
          <div className="min-w-0">
            <span className="font-semibold text-xs text-[#0C1E30] block truncate">
              Maitri Station Operations Command
            </span>
            <span className="text-[10.5px] font-mono text-[#6E8294] block truncate">
              70°45′57″S, 11°44′09″E · ISEA-44
            </span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-medium text-emerald-800 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Nominal</span>
        </div>
      </div>

      {/* 2. Dominant Mission Continuity Card */}
      <div className="rounded-xl border border-[#DCE8F0] bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5 mb-3">
          <h2 className="text-sm font-semibold text-[#0C1E30] tracking-tight">
            Mission Continuity
          </h2>
          <span className="text-[11px] font-mono text-[#6E8294]">
            Cycle 42 · Real-Time
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Circular Donut Gauge */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg width="80" height="80" className="transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#E6F3F9"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#0284C7"
                strokeWidth="7"
                strokeDasharray={2 * Math.PI * 32}
                strokeDashoffset={2 * Math.PI * 32 - (score / 100) * (2 * Math.PI * 32)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold font-mono tracking-tight text-[#0C1E30]">
                {score}<span className="text-xs font-normal text-[#6E8294] ml-0.5">%</span>
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="text-[13px] font-semibold text-[#0C1E30] leading-tight">
              Stable with emerging risk
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold text-amber-800">
              <AlertTriangle size={11} className="text-amber-600" />
              <span>Resupply Deficit Flagged</span>
            </div>
            <p className="text-xs text-[#42586E] leading-snug">
              Fuel runway may fall below safe threshold before next resupply.
            </p>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#F8FAFC]">
          <button
            type="button"
            onClick={() => setShowScoreBreakdown(true)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg px-3 py-2 min-h-[44px] transition active:scale-98"
          >
            <span>Why is score {score}%?</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* 3. Priority Risk Card */}
      <div className="rounded-xl border border-rose-200 bg-gradient-to-br from-white to-rose-50/30 p-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-rose-100 pb-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700">
              PRIORITY RISK · RSK-001
            </span>
          </div>
          <span className="rounded bg-rose-100 border border-rose-300 px-1.5 py-0.5 text-[10px] font-bold text-rose-800">
            HIGH
          </span>
        </div>

        <h3 className="text-base font-bold text-[#0C1E30] tracking-tight">
          Fuel Resupply Gap
        </h3>
        <div className="text-xs font-semibold text-rose-700 mt-0.5">
          Potential 5-day gap
        </div>
        <p className="text-xs text-[#42586E] mt-0.5 leading-normal">
          Deficit gap before maritime vessel arrival at Novo Staging.
        </p>

        <div className="mt-3 flex items-center justify-between bg-white rounded-lg p-2.5 border border-rose-100 text-xs">
          <div>
            <span className="text-[10.5px] text-[#6E8294] block">Safe Runway</span>
            <span className="font-semibold text-[#0C1E30]">Day 12 (14,200 L)</span>
          </div>
          <div className="text-right">
            <span className="text-[10.5px] text-rose-600 block">Cargo Arrival</span>
            <span className="font-semibold text-rose-700">Day 17 (+3d delay)</span>
          </div>
        </div>

        <div className="mt-3 pt-2">
          <button
            type="button"
            onClick={() => goTo('risks')}
            className="w-full rounded-xl bg-rose-600 text-white font-semibold py-2.5 text-xs shadow-2xs flex items-center justify-center gap-1.5 min-h-[44px] active:scale-98 transition"
          >
            <span>View Risk →</span>
          </button>
        </div>
      </div>

      {/* 4. Compact Mission Pulse Sections (Fuel, Cargo, Power, Assets) */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6E8294] px-1">
          Mission Pulse · Fuel · Cargo · Power · Personnel
        </div>

        {/* Pulse: Fuel */}
        <div
          onClick={() => goTo('inventory')}
          className="rounded-xl border border-[#DCE8F0] bg-white p-3 shadow-2xs flex items-center justify-between gap-3 active:scale-99 transition cursor-pointer min-h-[48px]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <Boxes size={17} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#0C1E30]">Station Diesel</span>
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1 rounded">12.0d</span>
              </div>
              <div className="text-[11px] text-[#6E8294] truncate">
                14,200 L reserve · 1,180 L/d burn runway
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400 shrink-0" />
        </div>

        {/* Pulse: Cargo */}
        <div
          onClick={() => goTo('cargo')}
          className="rounded-xl border border-[#DCE8F0] bg-white p-3 shadow-2xs flex items-center justify-between gap-3 active:scale-99 transition cursor-pointer min-h-[48px]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 border border-[#BAE6FD]">
              <Package size={17} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#0C1E30]">Consignment C-101</span>
                <span className="text-[10px] font-mono font-bold text-[#0284C7] bg-[#E0F2FE] px-1 rounded">+3d ETA</span>
              </div>
              <div className="text-[11px] text-[#6E8294] truncate">
                Weddell Sea ice-pack hold · Arrival Day 17
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400 shrink-0" />
        </div>

        {/* Pulse: Power */}
        <div
          onClick={() => goTo('assets')}
          className="rounded-xl border border-[#DCE8F0] bg-white p-3 shadow-2xs flex items-center justify-between gap-3 active:scale-99 transition cursor-pointer min-h-[48px]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
              <Cpu size={17} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#0C1E30]">Generator G-01</span>
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1 rounded">60h left</span>
              </div>
              <div className="text-[11px] text-[#6E8294] truncate">
                4,940/5,000h service overhaul threshold
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400 shrink-0" />
        </div>

        {/* Pulse: Traverses */}
        <div
          onClick={() => goTo('personnel')}
          className="rounded-xl border border-[#DCE8F0] bg-white p-3 shadow-2xs flex items-center justify-between gap-3 active:scale-99 transition cursor-pointer min-h-[48px]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Users size={17} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#0C1E30]">Station Personnel</span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1 rounded">50 Crew</span>
              </div>
              <div className="text-[11px] text-[#6E8294] truncate">
                100% check-in compliance · Nominal health
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400 shrink-0" />
        </div>
      </div>

      {/* 5. AI Mission Brief (Mobile Strip) */}
      <div className="rounded-xl border border-[#DCE8F0] bg-white p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono font-medium text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD] px-2 py-0.5 rounded">
              ✦ AI Mission Brief
            </span>
          </div>
          <span className="text-[11px] text-[#6E8294] font-mono">08:00 UTC</span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E8F0F5] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[11px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">01</span>
              <span className="font-medium text-[#0C1E30] truncate">Fuel resupply deficit</span>
            </div>
            <span className="text-[11px] text-slate-500 shrink-0 font-mono">5d gap</span>
          </div>

          <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E8F0F5] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">02</span>
              <span className="font-medium text-[#0C1E30] truncate">Generator maintenance</span>
            </div>
            <span className="text-[11px] text-slate-500 shrink-0 font-mono">60h left</span>
          </div>

          <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E8F0F5] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[11px] font-bold text-[#0284C7] bg-[#E0F2FE] px-1.5 py-0.5 rounded border border-[#BAE6FD]">03</span>
              <span className="font-medium text-[#0C1E30] truncate">Cargo transit delay</span>
            </div>
            <span className="text-[11px] text-slate-500 shrink-0 font-mono">+3 days</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo('copilot')}
          className="w-full flex items-center justify-between text-xs font-semibold text-[#0284C7] pt-1"
        >
          <span>Consult AI Copilot Briefing</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 6. Mobile Quick Actions (2x2 Grid, 48px touch targets) */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6E8294] px-1">
          Quick Mission Actions
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="flex items-center gap-2.5 p-3 rounded-xl border border-[#DCE8F0] bg-white text-left font-semibold text-xs text-[#0C1E30] shadow-2xs active:scale-95 transition min-h-[48px]"
          >
            <div className="h-7 w-7 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <Play size={12} className="fill-[#0284C7]" />
            </div>
            <span>Run Demo</span>
          </button>

          <button
            type="button"
            onClick={() => goTo('simulator')}
            className="flex items-center gap-2.5 p-3 rounded-xl border border-[#DCE8F0] bg-white text-left font-semibold text-xs text-[#0C1E30] shadow-2xs active:scale-95 transition min-h-[48px]"
          >
            <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Sliders size={13} />
            </div>
            <span>Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => goTo('risks')}
            className="flex items-center gap-2.5 p-3 rounded-xl border border-[#DCE8F0] bg-white text-left font-semibold text-xs text-[#0C1E30] shadow-2xs active:scale-95 transition min-h-[48px]"
          >
            <div className="h-7 w-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <AlertTriangle size={13} />
            </div>
            <span>Mission Risk</span>
          </button>

          <button
            type="button"
            onClick={() => goTo('copilot')}
            className="flex items-center gap-2.5 p-3 rounded-xl border border-[#DCE8F0] bg-white text-left font-semibold text-xs text-[#0C1E30] shadow-2xs active:scale-95 transition min-h-[48px]"
          >
            <div className="h-7 w-7 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
              <Sparkles size={13} />
            </div>
            <span>Ask Copilot</span>
          </button>
        </div>
      </div>
    </div>

      {/* ============================================================
          5. EXPLAINABLE MISSION CONTINUITY SCORE BREAKDOWN MODAL
          ============================================================ */}
      {showScoreBreakdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0C1E30]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setShowScoreBreakdown(false)}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mission Continuity Score Explanation"
            className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#DCEAF1] bg-white p-4 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#DCEAF1] pb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-[#0C1E30] tracking-tight">
                    Mission Continuity Breakdown
                  </h3>
                  <p className="text-xs text-[#6E8294]">
                    Why is the station score calculated at {score}%?
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowScoreBreakdown(false)}
                className="rounded-xl p-1.5 text-[#6E8294] hover:bg-[#F0F8FB] hover:text-[#0C1E30] transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Score Ring & Summary */}
            <div className="my-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#DCE8F0] flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-white border-2 border-[#0284C7] text-[#0C1E30] font-semibold text-xl flex items-center justify-center shrink-0 shadow-2xs font-mono">
                {score}%
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-[#0C1E30]">
                  Resupply Deficit Flagged
                </div>
                <p className="text-xs text-[#42586E] mt-0.5 leading-relaxed font-mono">
                  Formula: Baseline 85% + Positive Factors (+5%) - Negative Risk Deductions (-27%) = 63%
                </p>
              </div>
            </div>

            {/* Contributor items */}
            <div className="space-y-2 text-xs">
              <div className="text-[11.5px] font-semibold uppercase tracking-wider text-[#6E8294] mb-1">
                Active Contributors &amp; Deductions:
              </div>

              {[
                {
                  label: 'Fuel Resupply Deficit',
                  val: '-15%',
                  type: 'neg',
                  detail: '14,200 L reserve (12.0d) vs Cargo C-101 ETA (17d) leaves an unhedged 5-day deficit gap.',
                },
                {
                  label: 'Cargo Sea-Ice Delay',
                  val: '-8%',
                  type: 'neg',
                  detail: 'Vessel C-101 throttled to 3.2 kts by fast sea-ice; ETA pushed by +3 days.',
                },
                {
                  label: 'Generator Overhaul Threshold',
                  val: '-4%',
                  type: 'neg',
                  detail: 'Primary Gen G-01 has 60 operating hours remaining before 5,000h overhaul limit.',
                },
                {
                  label: 'Personnel Readiness',
                  val: '+2%',
                  type: 'pos',
                  detail: '100% of wintering team medically fit with active satellite check-in compliance.',
                },
                {
                  label: 'SATCOM & Microgrid Stability',
                  val: '+3%',
                  type: 'pos',
                  detail: 'Continuous telemetry uplink active; station base-load microgrid running nominal.',
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg border border-[#E8F0F5] bg-[#F8FAFC] flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-[#0C1E30]">{c.label}</div>
                    <div className="text-[11.5px] text-[#42586E] mt-0.5 leading-normal">{c.detail}</div>
                  </div>
                  <span
                    className={`font-mono font-medium text-xs shrink-0 px-2 py-0.5 rounded-md ${
                      c.type === 'neg'
                        ? 'bg-rose-50 border border-rose-200 text-rose-700'
                        : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {c.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions footer */}
            <div className="mt-5 pt-4 border-t border-[#DCEAF1] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowScoreBreakdown(false)
                  goTo('copilot')
                }}
                className="flex-1 text-center rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white py-2 text-xs font-medium shadow-2xs transition"
              >
                Consult AI Copilot
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowScoreBreakdown(false)
                  goTo('risks')
                }}
                className="flex-1 text-center rounded-lg border border-[#DCEAF1] bg-white hover:bg-[#F0F8FB] text-[#0C1E30] py-2 text-xs font-medium shadow-2xs transition"
              >
                Open Risk Engine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
