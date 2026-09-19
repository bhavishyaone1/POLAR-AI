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
          {/* Eyebrow and Operational Pill */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8295A5]">
              CURRENT EXPEDITION
            </span>
          </div>

          {/* Heading */}
          <div className="my-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#102A43]">
              Antarctic Research Expedition 2027
            </h1>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#526779] font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#1597D4]" />
              <span>Maitri Station</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#8295A5]" />
              <span>Nov 2026 – Mar 2027</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-[#8295A5]" />
              <span>50 Personnel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flag size={14} className="text-[#8295A5]" />
              <span>Priority: High</span>
            </div>
          </div>
        </div>

        {/* Operational Badge on Top Right */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-2xs backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operational</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. FIVE OPERATIONAL CARDS STRIP
          ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* CARD 1: MISSION CONTINUITY (Spans 4 cols on lg) */}
        <div className="sm:col-span-2 lg:col-span-4 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#102A43]">
              Mission Continuity
            </div>

            <div className="mt-4 flex items-center gap-4">
              {/* Radial Donut Gauge */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg width="92" height="92" className="transform -rotate-90">
                  <circle
                    cx="46"
                    cy="46"
                    r={radius}
                    stroke="#EAF6FA"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="46"
                    cy="46"
                    r={radius}
                    stroke="#1597D4"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-extrabold font-mono text-[#102A43]">
                    {score}%
                  </span>
                </div>
              </div>

              {/* Attention text */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600">
                  <AlertTriangle size={12} />
                  <span>Attention Required</span>
                </div>
                <p className="text-xs text-[#526779] leading-relaxed">
                  Fuel resupply may arrive after the current safe operating window.
                </p>
                <div className="flex items-center gap-3 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setShowScoreBreakdown(true)}
                    className="text-xs font-semibold text-[#1597D4] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Why is my score {score}%?</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: CRITICAL RISK (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                Critical Risk
              </span>
              <h3 className="text-sm font-bold text-[#102A43] mt-0.5">
                Fuel Resupply Risk
              </h3>
              <p className="text-xs font-semibold text-rose-500 mt-1">
                Potential supply gap: 5 days
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('risks')}
              className="text-xs font-semibold text-[#1597D4] hover:underline inline-flex items-center gap-1"
            >
              <span>View Risk</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 3: CARGO (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-sky-50 text-[#1597D4] flex items-center justify-center">
              <Package size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1597D4] block">
                Cargo
              </span>
              <h3 className="text-sm font-bold text-[#102A43] mt-0.5">
                C-104
              </h3>
              <div className="text-xs text-[#526779] font-medium flex items-center gap-1 mt-1">
                <span>In Transit</span>
                <ArrowUpRight size={13} className="text-[#8295A5]" />
              </div>
              <p className="text-xs text-[#8295A5] mt-0.5 font-mono">
                ETA 17 days
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('cargo')}
              className="text-xs font-semibold text-[#1597D4] hover:underline inline-flex items-center gap-1"
            >
              <span>View Cargo</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 4: INVENTORY (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Boxes size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                Inventory
              </span>
              <h3 className="text-sm font-bold text-[#102A43] mt-0.5">
                Fuel Reserves
              </h3>
              <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <span>12.0 days remaining</span>
                <ArrowDownRight size={13} />
              </div>
              <div className="text-[11px] text-[#526779] mt-1 space-y-0.5">
                <p>Last Safe Resupply: <strong className="text-[#102A43] font-mono">Day 8</strong></p>
                <p className="text-[10.5px] text-rose-500 font-semibold">Gap: 5.0d vs Cargo ETA (17d)</p>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('inventory')}
              className="text-xs font-semibold text-[#1597D4] hover:underline inline-flex items-center gap-1"
            >
              <span>View Inventory</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 5: ASSETS (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cpu size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                Assets
              </span>
              <h3 className="text-sm font-bold text-[#102A43] mt-0.5">
                Generator G-021
              </h3>
              <p className="text-xs text-[#526779] mt-1">
                Maintenance approaching
              </p>
              <p className="text-xs text-[#8295A5] mt-0.5 font-mono">
                In 60 hours
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('assets')}
              className="text-xs font-semibold text-[#1597D4] hover:underline inline-flex items-center gap-1"
            >
              <span>View Assets</span>
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
        <div className="lg:col-span-7 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#F1F7FA] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EAF6FA] text-[#1597D4] px-2 py-0.5 rounded border border-[#BFDDE7]">
                  ✦ AI MISSION BRIEF
                </span>
                <span className="text-xs text-[#526779] font-medium">08:00 UTC · Station Cycle 42</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Nominal Baseline
              </span>
            </div>

            <h3 className="text-sm font-bold text-[#102A43]">
              Daily Operations Briefing — 3 Items Require Review
            </h3>
            <p className="text-xs text-[#526779] mt-1 leading-relaxed">
              No immediate distress signals active. Autonomous continuity monitoring has flagged an unhedged 5-day fuel window before Cargo C-104 arrival.
            </p>

            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2 text-xs bg-[#F7FBFD] p-2.5 rounded-xl border border-[#EEF7FA]">
                <span className="font-mono font-bold text-rose-600 shrink-0">01.</span>
                <div className="min-w-0 flex-1">
                  <strong className="text-[#102A43]">Fuel Resupply Deficit Window:</strong>
                  <span className="text-[#526779] ml-1">Station holds 12.0d runway; Last Safe Resupply Date is Day 8. Cargo ETA is Day 17.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs bg-[#F7FBFD] p-2.5 rounded-xl border border-[#EEF7FA]">
                <span className="font-mono font-bold text-amber-600 shrink-0">02.</span>
                <div className="min-w-0 flex-1">
                  <strong className="text-[#102A43]">Primary Generator G-021 Service:</strong>
                  <span className="text-[#526779] ml-1">Run hours approaching 5,000h overhaul limit (60 operating hours remaining).</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs bg-[#F7FBFD] p-2.5 rounded-xl border border-[#EEF7FA]">
                <span className="font-mono font-bold text-[#1597D4] shrink-0">03.</span>
                <div className="min-w-0 flex-1">
                  <strong className="text-[#102A43]">Cargo C-104 Pack-Ice Hold:</strong>
                  <span className="text-[#526779] ml-1">Vessel throttled to 3.2 kts through Prydz Bay leads; ETA pushed by +3 days.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3.5 mt-3 border-t border-[#F1F7FA] flex items-center justify-between">
            <span className="text-[11px] text-[#8295A5]">Zero unacknowledged distress events</span>
            <button
              type="button"
              onClick={() => goTo('copilot')}
              className="text-xs font-semibold text-[#1597D4] hover:underline inline-flex items-center gap-1"
            >
              <span>Ask AI Copilot for Full Review</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Change Detection (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#F1F7FA] pb-3 mb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F1F7FA] text-[#526779] px-2 py-0.5 rounded border border-[#DCEAF1]">
                SINCE LAST REVIEW
              </span>
              <span className="text-[11px] text-[#8295A5] font-mono">Telemetry Δ 24h</span>
            </div>

            <h3 className="text-sm font-bold text-[#102A43]">
              Autonomous Anomaly & Drift Tracking
            </h3>

            <div className="mt-3 divide-y divide-[#F1F7FA] text-xs">
              <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-rose-600 font-bold font-mono">↑ +8%</span>
                  <span className="text-[#102A43] font-medium">Station Fuel Consumption</span>
                </div>
                <span className="text-[11px] text-[#526779]">Sub-zero blizzard heating</span>
              </div>

              <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold font-mono">↑ +3d</span>
                  <span className="text-[#102A43] font-medium">Cargo C-104 Vessel ETA</span>
                </div>
                <span className="text-[11px] text-[#526779]">Prydz Bay sea-ice hold</span>
              </div>

              <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold font-mono">✓ Done</span>
                  <span className="text-[#102A43] font-medium">Gen G-01 Filter Servicing</span>
                </div>
                <span className="text-[11px] text-[#526779]">Logged by Eng. Rao</span>
              </div>

              <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-rose-600 font-bold font-mono">⚠ RSK-001</span>
                  <span className="text-[#102A43] font-medium">Resupply Deficit Flagged</span>
                </div>
                <span className="text-[11px] text-rose-600 font-semibold">Action Required</span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-[#F1F7FA] flex items-center justify-between">
            <span className="text-[11px] text-[#8295A5]">4 verified parameter shifts</span>
            <button
              type="button"
              onClick={() => goTo('simulator')}
              className="text-xs font-semibold text-[#1597D4] hover:underline inline-flex items-center gap-1"
            >
              <span>Simulate Scenario Impact</span>
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
              <h2 className="text-base font-bold text-[#102A43]">
                Mission Overview
              </h2>
              <p className="text-xs text-[#8295A5] mt-0.5">
                Live location, cargo routes and key assets
              </p>
            </div>

            <button
              type="button"
              onClick={() => goTo('map')}
              className="rounded-lg border border-[#DCEAF1] bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[#526779] shadow-2xs transition inline-flex items-center gap-1"
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
                stroke="#1597D4"
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
                <circle r="8" fill="#1597D4" />
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
                <circle r="7" fill="#1597D4" />
              </g>

              {/* INCIDENT BEACON: Red Alert Pulse */}
              <g transform="translate(490, 350)">
                <circle r="15" fill="#FEE2E2" className="animate-ping" opacity="0.75" />
                <circle r="9" fill="#E5484D" />
                <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">!</text>
              </g>
            </svg>

            {/* DOM Overlay: Maitri Station Label Pin */}
            <div className="absolute top-[100px] left-[290px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-[#DCEAF1] px-2.5 py-1 text-[11px] font-semibold text-[#102A43] shadow-xs backdrop-blur-xs">
              <div className="h-4 w-4 rounded-full bg-[#1597D4] text-white flex items-center justify-center text-[9px]">
                ⬡
              </div>
              <span>Maitri Station</span>
            </div>

            {/* DOM Overlay: Field Camp B Label Pin */}
            <div className="absolute top-[255px] left-[300px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-[#DCEAF1] px-2.5 py-1 text-[11px] font-semibold text-[#102A43] shadow-xs backdrop-blur-xs">
              <div className="h-4 w-4 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[9px]">
                ▲
              </div>
              <span>Field Camp B</span>
            </div>

            {/* DOM Overlay: Vessel C-104 Card Tag */}
            <div className="absolute bottom-[75px] left-[370px] z-10 rounded-xl bg-white border border-[#DCEAF1] px-3 py-1.5 shadow-md flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-[#EAF6FA] text-[#1597D4] flex items-center justify-center shrink-0">
                <Ship size={13} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#102A43] leading-tight">C-104</div>
                <div className="text-[10px] text-[#8295A5] leading-tight">ETA 17 days</div>
              </div>
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
            <div className="absolute bottom-3 left-3 z-20 rounded-xl bg-white/95 border border-[#DCEAF1] p-2.5 shadow-xs backdrop-blur-xs text-[11px] text-[#526779] space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1597D4]" />
                <span>Station</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                <span>Field Camp</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-0.5 border-b border-dashed border-[#1597D4]" />
                <span>Cargo Route</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>Incident</span>
              </div>
            </div>

            {/* Compass Rose (Bottom Right) */}
            <div className="absolute bottom-3 right-3 z-20 h-7 w-7 rounded-full bg-white/95 border border-[#DCEAF1] flex items-center justify-center text-[#526779] shadow-2xs font-bold text-[10px] font-mono">
              N
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: RECENT MISSION EVENTS (Spans 3 cols on lg) */}
        <div className="lg:col-span-3 rounded-2xl border border-[#DCEAF1] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#102A43] pb-3 border-b border-slate-100">
              <Clock size={16} className="text-[#1597D4]" />
              <span>Recent Mission Events</span>
            </div>

            {/* Timeline List */}
            <div className="space-y-4 relative pl-4 mt-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {/* Event 1: Fuel shipment delay (Red) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-4 ring-white" />
                <div className="text-xs font-bold text-rose-600">
                  Fuel shipment delay detected
                </div>
                <div className="text-[11px] text-[#526779]">
                  Cargo C-104 • ETA 17 days
                </div>
                <div className="text-[10px] text-[#8295A5] font-mono">
                  2 minutes ago
                </div>
              </div>

              {/* Event 2: Generator maintenance (Blue) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-[#1597D4] ring-4 ring-white" />
                <div className="text-xs font-bold text-[#102A43]">
                  Generator maintenance due
                </div>
                <div className="text-[11px] text-[#526779]">
                  G-021 • 60 hours
                </div>
                <div className="text-[10px] text-[#8295A5] font-mono">
                  1 hour ago
                </div>
              </div>

              {/* Event 3: Inventory level updated (Green) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-white" />
                <div className="text-xs font-bold text-emerald-700">
                  Inventory level updated
                </div>
                <div className="text-[11px] text-[#526779]">
                  Fuel • 5,000 L
                </div>
                <div className="text-[10px] text-[#8295A5] font-mono">
                  3 hours ago
                </div>
              </div>

              {/* Event 4: Personnel status change (Slate) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-slate-400 ring-4 ring-white" />
                <div className="text-xs font-bold text-[#526779]">
                  Personnel status change
                </div>
                <div className="text-[11px] text-[#8295A5]">
                  Team Alpha • Field Mission
                </div>
                <div className="text-[10px] text-[#8295A5] font-mono">
                  5 hours ago
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => goTo('audit')}
              className="text-xs font-semibold text-[#1597D4] hover:underline inline-flex items-center gap-1"
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
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1597D4]">
              <Sparkles size={14} />
              <span>AI Mission Insight</span>
            </div>

            <p className="text-xs text-[#526779] leading-relaxed">
              Fuel resupply is projected to arrive after the current safe operating window. This may impact generator operation and research activities.
            </p>

            <div>
              <button
                type="button"
                onClick={() => goTo('copilot')}
                className="rounded-lg border border-[#1597D4] text-[#1597D4] hover:bg-[#EAF6FA] px-3.5 py-1.5 text-xs font-semibold inline-flex items-center gap-1 transition shadow-2xs"
              >
                <span>Ask POLAR</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Quick Actions Sub-Section */}
          <div className="pt-4 border-t border-slate-100 mt-4 space-y-2.5">
            <div className="text-xs font-bold text-[#102A43]">
              Quick Actions
            </div>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={onStartGuidedDemo}
                className="w-full text-left rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] hover:bg-white hover:border-[#1597D4] p-2 text-xs text-[#526779] hover:text-[#102A43] font-semibold flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-[#EAF6FA] text-[#1597D4] flex items-center justify-center shrink-0">
                  <Play size={11} className="fill-[#1597D4]" />
                </div>
                <span>Run Demo</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('simulator')}
                className="w-full text-left rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] hover:bg-white hover:border-[#1597D4] p-2 text-xs text-[#526779] hover:text-[#102A43] font-semibold flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Sliders size={12} />
                </div>
                <span>Open Simulator</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('risks')}
                className="w-full text-left rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] hover:bg-white hover:border-[#1597D4] p-2 text-xs text-[#526779] hover:text-[#102A43] font-semibold flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <AlertTriangle size={12} />
                </div>
                <span>View Mission Risk</span>
              </button>

              <button
                type="button"
                onClick={() => goTo('copilot')}
                className="w-full text-left rounded-xl border border-[#DCEAF1] bg-[#F7FBFD] hover:bg-white hover:border-[#1597D4] p-2 text-xs text-[#526779] hover:text-[#102A43] font-semibold flex items-center gap-2.5 transition shadow-2xs group"
              >
                <div className="h-6 w-6 rounded-lg bg-[#EAF6FA] text-[#1597D4] flex items-center justify-center shrink-0">
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
            <h3 className="text-base font-bold text-[#102A43]">
              Mission Progress
            </h3>
            <p className="text-xs text-[#8295A5] mt-0.5">
              Expedition timeline and key milestones
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
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
                          ? 'bg-[#1597D4]'
                          : 'bg-[#DCEAF1]'
                      }`}
                    />
                  )}

                  {/* Step Node Icon */}
                  <div
                    className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full font-bold text-xs transition ${
                      isCompleted
                        ? 'bg-[#EAF6FA] text-[#1597D4] border border-[#1597D4]'
                        : isCurrent
                        ? 'bg-[#1597D4] text-white ring-4 ring-[#EAF6FA]'
                        : 'bg-white border border-[#DCEAF1] text-[#8295A5]'
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
                      className={`text-xs font-bold leading-tight ${
                        isCurrent
                          ? 'text-[#1597D4]'
                          : isCompleted
                          ? 'text-[#102A43]'
                          : 'text-[#8295A5]'
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-[11px] text-[#8295A5] font-mono mt-0.5">
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
            className="fixed inset-0 bg-[#0A1926]/35 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
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
                <div className="h-8 w-8 rounded-xl bg-[#EAF6FA] text-[#1597D4] flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#102A43]">
                    Mission Continuity Breakdown
                  </h3>
                  <p className="text-xs text-[#526779]">
                    Why is the station score calculated at {score}%?
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowScoreBreakdown(false)}
                className="rounded-xl p-1.5 text-[#526779] hover:bg-[#F0F8FB] hover:text-[#102A43] transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Score Ring & Summary */}
            <div className="my-4 p-4 rounded-xl bg-[#F7FBFD] border border-[#DCEAF1] flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-white border-2 border-[#1597D4] text-[#102A43] font-mono font-extrabold text-xl flex items-center justify-center shrink-0 shadow-2xs">
                {score}%
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
                  Stable with Emerging Resupply Risk
                </div>
                <p className="text-xs text-[#526779] mt-0.5 leading-relaxed">
                  Formula: Baseline 85% + Positive Factors (+5%) - Negative Risk Deductions (-22%) = 68%
                </p>
              </div>
            </div>

            {/* Contributor items */}
            <div className="space-y-2 text-xs">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8295A5] mb-1">
                Active Contributors & Deductions:
              </div>

              {[
                {
                  label: 'Fuel Resupply Risk',
                  val: '-12%',
                  type: 'neg',
                  detail: '14,200 L reserve (12.0d) vs Cargo C-104 ETA (17d) leaves an unhedged 5-day blackout gap.',
                },
                {
                  label: 'Cargo Sea-Ice Delay',
                  val: '-6%',
                  type: 'neg',
                  detail: 'Vessel C-104 throttled to 3.2 kts by fast sea-ice in Prydz Bay lead.',
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
                  detail: 'Continuous telemetry telemetry uplink active; station base-load microgrid running nominal.',
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl border border-[#EEF7FA] bg-[#F7FBFD] flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-[#102A43]">{c.label}</div>
                    <div className="text-[11px] text-[#526779] mt-0.5 leading-tight">{c.detail}</div>
                  </div>
                  <span
                    className={`font-mono font-bold text-xs shrink-0 px-2 py-0.5 rounded-md ${
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
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCEAF1] bg-white px-3.5 py-2 text-xs font-semibold text-[#102A43] hover:bg-[#F0F8FB] transition shadow-xs"
              >
                <Sparkles size={13} className="text-[#1597D4]" />
                <span>Ask AI for Mitigation</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowScoreBreakdown(false)
                  goTo('simulator')
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white px-4 py-2 text-xs font-semibold shadow-xs transition"
              >
                <Sliders size={13} />
                <span>Simulate Delay (+5d)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
