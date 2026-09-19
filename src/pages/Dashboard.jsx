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

  const score = continuityMetrics?.score ?? 68

  // Radial gauge calculations for 68%
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="space-y-5 pb-16">
      {/* ============================================================
          1. CURRENT EXPEDITION HERO BANNER
          ============================================================ */}
      <section className="relative overflow-hidden rounded-2xl border border-[#DCEAF1] bg-white shadow-xs">
        {/* Right side background image with smooth fade to white on left */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 md:w-1/2 bg-cover bg-right z-0"
          style={{
            backgroundImage: "url('/polar-hero-bg.jpg')",
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div className="relative z-10 p-5 sm:p-7 flex flex-col justify-between min-h-[140px] max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0284C7] animate-pulse" />
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#6E8294]">
              44th Indian Scientific Expedition to Antarctica (ISEA-44)
            </span>
          </div>

          {/* Heading */}
          <div className="my-2">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#0C1E30] leading-tight">
              Maitri Station Operations Command &amp; Life Support
            </h1>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#42586E] font-normal pt-1">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#0284C7]" />
              <span>Maitri Station (70°45′57″S, 11°44′09″E)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#6E8294]" />
              <span>Current Austral Summer Campaign · 2026–2027</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-[#6E8294]" />
              <span>50 Winter-Over &amp; Summer Crew</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flag size={14} className="text-[#6E8294]" />
              <span>Priority: Life-Support &amp; Cryo Science</span>
            </div>
          </div>
        </div>

        {/* Operational Badge on Top Right */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/95 px-3 py-1 text-xs font-medium text-emerald-800 shadow-2xs backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operational Readiness: Nominal</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. FIVE OPERATIONAL CARDS STRIP
          ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* CARD 1: MISSION CONTINUITY (Spans 4 cols on lg) */}
        <div className="sm:col-span-2 lg:col-span-4 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6E8294]">
              Mission Continuity Index
            </div>

            <div className="mt-4 flex items-center gap-4">
              {/* Radial Donut Gauge */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg width="92" height="92" className="transform -rotate-90">
                  <circle
                    cx="46"
                    cy="46"
                    r={radius}
                    stroke="#E6F3F9"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="46"
                    cy="46"
                    r={radius}
                    stroke="#0284C7"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-semibold tracking-tight text-[#0C1E30]">
                    {score}<span className="text-sm font-normal text-[#6E8294] ml-0.5">%</span>
                  </span>
                </div>
              </div>

              {/* Attention text */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                  <AlertTriangle size={12} className="text-amber-600" />
                  <span>Resupply Deficit Flagged</span>
                </div>
                <p className="text-xs text-[#42586E] leading-relaxed">
                  Station fuel runway is projected to breach critical buffer 5.0 days before maritime arrival.
                </p>
                <div className="flex items-center gap-3 pt-0.5">
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
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700 block">
                Critical Risk
              </span>
              <h3 className="text-[15px] font-semibold text-[#0C1E30] tracking-tight mt-0.5">
                RSK-001 · Resupply Gap
              </h3>
              <p className="text-xs font-medium text-rose-700 mt-1">
                5.0-day deficit window
              </p>
              <p className="text-[11px] text-[#6E8294] mt-0.5">
                Microgrid heating loop at risk
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('risks')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>Inspect Risk Flow</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 3: CARGO (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
              <Package size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0284C7] block">
                Maritime Corridor
              </span>
              <h3 className="text-[15px] font-semibold text-[#0C1E30] tracking-tight mt-0.5">
                Consignment C-101
              </h3>
              <div className="text-xs text-[#42586E] font-medium flex items-center gap-1 mt-1">
                <span>MV Vasiliy Golovnin</span>
                <ArrowUpRight size={13} className="text-[#6E8294]" />
              </div>
              <p className="text-xs text-amber-700 mt-0.5 font-mono font-medium">
                ETA Day 17 (+3d hold)
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('cargo')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>Track Corridor</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 4: INVENTORY (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Boxes size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block">
                Station Runway &amp; Buffer
              </span>
              <h3 className="text-[15px] font-semibold text-[#0C1E30] tracking-tight mt-0.5">
                14,200 L Diesel Stock
              </h3>
              <div className="text-xs font-medium text-emerald-800 flex items-center gap-1 mt-1">
                <span>12.0d burn runway</span>
                <ArrowDownRight size={13} />
              </div>
              <div className="text-[11.5px] text-[#42586E] mt-1 space-y-0.5">
                <p>Last Safe Resupply: <strong className="text-[#0C1E30] font-mono font-medium">Day 8</strong></p>
                <p className="text-[11px] text-rose-700 font-medium">5 days remaining to critical buffer</p>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('inventory')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>Manage Stocks</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 5: ASSETS (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Cpu size={16} />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-800 block">
                Primary Power
              </span>
              <h3 className="text-[15px] font-semibold text-[#0C1E30] tracking-tight mt-0.5">
                Generator G-01 · 280 kW
              </h3>
              <p className="text-xs text-[#42586E] mt-1">
                Active Nominal · Microgrid Primary
              </p>
              <p className="text-xs text-amber-800 mt-0.5 font-mono font-medium">
                Overhaul due in 60h
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('assets')}
              className="text-xs font-medium text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>Inspect Assets</span>
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
        <div className="lg:col-span-7 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
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
              Daily Operations Briefing — 3 Operational Items Require Review
            </h3>
            <p className="text-[13.5px] text-[#42586E] mt-1 leading-relaxed">
              Zero unacknowledged distress events. Autonomous continuity engines flag an unhedged 5.0-day fuel gap prior to Consignment C-101 arrival.
            </p>

            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2 text-[13px] bg-[#F4F8FA] p-2.5 rounded-xl border border-[#E8F0F5]">
                <span className="font-mono font-semibold text-rose-700 shrink-0">01.</span>
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[#0C1E30]">Fuel Resupply Risk:</span>
                  <span className="text-[#42586E] ml-1">Station maintains 12.0d burn runway; Last Safe Resupply Date is Day 8. Maritime arrival is Day 17.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[13px] bg-[#F4F8FA] p-2.5 rounded-xl border border-[#E8F0F5]">
                <span className="font-mono font-semibold text-amber-700 shrink-0">02.</span>
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[#0C1E30]">Primary Generator G-01 Overhaul:</span>
                  <span className="text-[#42586E] ml-1">Cumulative run-hours approaching 5,000h service threshold (60 operating hours remaining).</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[13px] bg-[#F4F8FA] p-2.5 rounded-xl border border-[#E8F0F5]">
                <span className="font-mono font-semibold text-[#0284C7] shrink-0">03.</span>
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[#0C1E30]">Consignment C-101 Pack-Ice Navigation:</span>
                  <span className="text-[#42586E] ml-1">Vessel throttled to 3.2 kts through Weddell Sea leads; ETA pushed by +3 days.</span>
                </div>
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
        <div className="lg:col-span-5 rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#F0F7FB] pb-3 mb-3">
              <span className="text-[11px] font-mono font-medium uppercase tracking-wider bg-[#F4F8FA] text-[#42586E] px-2 py-0.5 rounded-md border border-[#DCE8F0]">
                Since Last 24h Review
              </span>
              <span className="text-[11px] text-[#6E8294] font-mono">Telemetry Δ 24h</span>
            </div>

            <h3 className="text-[16px] font-semibold text-[#0C1E30] tracking-tight">
              Autonomous Anomaly &amp; Drift Detection
            </h3>

            <div className="mt-3 divide-y divide-[#F0F7FB] text-xs">
              <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-rose-700 font-medium font-mono">↑ +8%</span>
                  <span className="text-[#0C1E30] font-medium">Station Fuel Burn Rate</span>
                </div>
                <span className="text-[11px] text-[#42586E]">Thermal heating load</span>
              </div>

              <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-amber-700 font-medium font-mono">↑ +3d</span>
                  <span className="text-[#0C1E30] font-medium">Consignment C-101 ETA</span>
                </div>
                <span className="text-[11px] text-[#42586E]">Weddell Sea ice pack hold</span>
              </div>

              <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-medium font-mono">✓ Verified</span>
                  <span className="text-[#0C1E30] font-medium">Generator G-01 Filter Servicing</span>
                </div>
                <span className="text-[11px] text-[#42586E]">Signed off by Chief Eng.</span>
              </div>

              <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-rose-700 font-medium font-mono">⚠ RSK-001</span>
                  <span className="text-[#0C1E30] font-medium">Resupply Deficit Flagged</span>
                </div>
                <span className="text-[11px] text-rose-700 font-medium">Action Required</span>
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
        <div className="lg:col-span-6 rounded-2xl border border-[#DCEAF1] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
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
              className="rounded-lg border border-[#DCEAF1] bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-medium text-[#42586E] shadow-2xs transition inline-flex items-center gap-1"
            >
              <span>View Full Map</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Interactive Antarctic Vector Map Canvas */}
          <div className="relative mt-4 h-[330px] sm:h-[360px] w-full rounded-xl overflow-hidden bg-[#EFF6FA] border border-[#DCEAF1] select-none">
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
            <div className="absolute top-[100px] left-[290px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-[#DCEAF1] px-2.5 py-1 text-[11px] font-semibold text-[#0C1E30] shadow-xs backdrop-blur-xs">
              <div className="h-4 w-4 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-[9px]">
                ⬡
              </div>
              <span>Maitri Station Hub</span>
            </div>

            {/* DOM Overlay: Field Camp B Pin */}
            <div className="absolute top-[250px] left-[300px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-[#DCEAF1] px-2.5 py-1 text-[11px] font-semibold text-[#0C1E30] shadow-xs backdrop-blur-xs">
              <div className="h-4 w-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px]">
                ▲
              </div>
              <span>Field Camp Bravo</span>
            </div>

            {/* DOM Overlay: Vessel Position */}
            <div className="absolute top-[340px] left-[460px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-[#DCEAF1] px-2.5 py-1 text-[11px] font-semibold text-[#0C1E30] shadow-xs backdrop-blur-xs">
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
                className="h-7 w-7 rounded-lg bg-white/95 border border-[#DCEAF1] text-[#526779] hover:text-[#102A43] flex items-center justify-center shadow-2xs transition"
                title="Zoom In"
              >
                <Plus size={14} />
              </button>
              <button
                type="button"
                onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
                className="h-7 w-7 rounded-lg bg-white/95 border border-[#DCEAF1] text-[#526779] hover:text-[#102A43] flex items-center justify-center shadow-2xs transition"
                title="Zoom Out"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                onClick={() => setMapZoom(1)}
                className="h-7 w-7 rounded-lg bg-white/95 border border-[#DCEAF1] text-[#526779] hover:text-[#102A43] flex items-center justify-center shadow-2xs transition"
                title="Recenter"
              >
                <Navigation size={13} />
              </button>
            </div>

            {/* Map Legend (Bottom Left) */}
            <div className="absolute bottom-3 left-3 z-20 rounded-xl bg-white/95 border border-[#DCEAF1] p-2.5 shadow-xs backdrop-blur-xs text-[11px] text-[#42586E] space-y-1">
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
            <div className="absolute bottom-3 right-3 z-20 h-7 w-7 rounded-full bg-white/95 border border-[#DCEAF1] flex items-center justify-center text-[#42586E] shadow-2xs font-semibold text-[10px] font-mono">
              N
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: RECENT MISSION EVENTS (Spans 3 cols on lg) */}
        <div className="lg:col-span-3 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
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
        <div className="lg:col-span-3 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
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
                className="w-full text-left rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] hover:bg-white hover:border-[#0284C7] p-2 text-xs text-[#42586E] hover:text-[#0C1E30] font-medium flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                  <Play size={11} className="fill-[#0284C7]" />
                </div>
                <span>Run Demo</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('simulator')}
                className="w-full text-left rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] hover:bg-white hover:border-[#0284C7] p-2 text-xs text-[#42586E] hover:text-[#0C1E30] font-medium flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Sliders size={12} />
                </div>
                <span>Open Simulator</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('risks')}
                className="w-full text-left rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] hover:bg-white hover:border-[#0284C7] p-2 text-xs text-[#42586E] hover:text-[#0C1E30] font-medium flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                  <AlertTriangle size={12} />
                </div>
                <span>View Mission Risk</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('copilot')}
                className="w-full text-left rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] hover:bg-white hover:border-[#0284C7] p-2 text-xs text-[#42586E] hover:text-[#0C1E30] font-medium flex items-center gap-2.5 transition shadow-2xs group"
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
      <section className="rounded-2xl border border-[#DCEAF1] bg-white p-5 sm:p-6 shadow-xs relative overflow-hidden">
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
            className="relative z-10 w-full max-w-xl rounded-2xl border border-[#DCEAF1] bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200"
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
            <div className="my-4 p-4 rounded-xl bg-[#F7FBFD] border border-[#DCEAF1] flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-white border-2 border-[#0284C7] text-[#0C1E30] font-semibold text-xl flex items-center justify-center shrink-0 shadow-2xs font-mono">
                {score}%
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-[#0C1E30]">
                  Stable with Emerging Resupply Risk
                </div>
                <p className="text-xs text-[#42586E] mt-0.5 leading-relaxed">
                  Formula: Baseline 85% + Positive Factors (+5%) - Negative Risk Deductions (-22%) = 68%
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
                  label: 'Fuel Resupply Risk',
                  val: '-12%',
                  type: 'neg',
                  detail: '14,200 L reserve (12.0d) vs Cargo C-101 ETA (17d) leaves an unhedged 5-day blackout gap.',
                },
                {
                  label: 'Cargo Sea-Ice Delay',
                  val: '-6%',
                  type: 'neg',
                  detail: 'Vessel C-101 throttled to 3.2 kts by fast sea-ice in Prydz Bay lead.',
                },
                {
                  label: 'Asset Maintenance Threshold',
                  val: '-4%',
                  type: 'neg',
                  detail: 'Secondary Gen G-021 has 60 operating hours remaining before overhaul limit.',
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
                  className="p-2.5 rounded-xl border border-[#EEF7FA] bg-[#F7FBFD] flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-[#0C1E30]">{c.label}</div>
                    <div className="text-[11.5px] text-[#42586E] mt-0.5 leading-tight">{c.detail}</div>
                  </div>
                  <span
                    className={`font-mono font-medium text-xs shrink-0 px-2 py-0.5 rounded-md ${
                      c.type === 'neg'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-100 text-emerald-700'
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
