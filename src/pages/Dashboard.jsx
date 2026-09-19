/**
 * DASHBOARD — POLAR COMMAND CENTER & CONTINUITY INTELLIGENCE
 * ==========================================================
 * Pixel-perfect match for the official Polar-AI design specification:
 * 1. "CURRENT EXPEDITION" Panoramic Antarctic Hero Banner
 * 2. 5-Card Real-time Metrics Grid (Mission Continuity donut, Critical Risk, Cargo, Inventory, Assets)
 * 3. Bottom Grid:
 *    - Left: Live Antarctic Topographic Map ("Mission Overview" with routes, stations, vessel C-104, incident)
 *    - Right: "Recent Mission Event" Timeline + "AI Mission Insight" with Quick Action Buttons
 */

import React, { useState } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Boxes,
  Calendar,
  Clock,
  Compass,
  Cpu,
  Crosshair,
  Flag,
  MapPin,
  Minus,
  Navigation,
  Package,
  Play,
  Plus,
  Radio,
  Ship,
  Sliders,
  Sparkles,
  Tent,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function Dashboard({ goTo, onStartGuidedDemo }) {
  const { continuityMetrics, stats, cargo, inventory, assets } = useData()

  const [mapZoom, setMapZoom] = useState(1)

  const score = continuityMetrics?.score ?? 68

  // Radial gauge calculations
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="space-y-6 pb-16">
      {/* ============================================================
          1. CURRENT EXPEDITION HERO BANNER
          ============================================================ */}
      <section className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xs">
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
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              CURRENT EXPEDITION
            </span>
          </div>

          {/* Heading */}
          <div className="my-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
              Antarctic Research Expedition 2027
            </h1>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#0284C7]" />
              <span>Maitri Station</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              <span>Nov 2026 – Mar 2027</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-slate-400" />
              <span>50 Personnel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flag size={14} className="text-slate-400" />
              <span>Priority: High</span>
            </div>
          </div>
        </div>

        {/* Operational Badge on Top Right */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operational</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. FIVE TOP METRIC CARDS ROW
          ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* CARD 1: MISSION CONTINUITY (Spans 4 cols on lg) */}
        <div className="sm:col-span-2 lg:col-span-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
              MISSION CONTINUITY
            </div>

            <div className="mt-4 flex items-center gap-4">
              {/* Radial Donut Gauge */}
              <div className="relative flex items-center justify-center shrink-0">
                <svg width="90" height="90" className="transform -rotate-90">
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke="#E0F2FE"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke="#0284C7"
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-extrabold font-mono text-[#0F172A]">
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
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong className="text-slate-800 font-semibold">Fuel resupply</strong> may arrive after the current safe operating window.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => goTo('simulator')}
                    className="text-xs font-semibold text-[#0284C7] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: CRITICAL RISK (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                CRITICAL RISK
              </span>
              <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">
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
              className="text-xs font-semibold text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>View Risk</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 3: CARGO (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
              <Package size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284C7] block">
                CARGO
              </span>
              <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">
                C-104
              </h3>
              <div className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-1">
                <span>In Transit</span>
                <ArrowUpRight size={13} className="text-slate-400" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                ETA 17 days
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('cargo')}
              className="text-xs font-semibold text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>View Cargo</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 4: INVENTORY (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Boxes size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                INVENTORY
              </span>
              <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">
                Fuel
              </h3>
              <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-1">
                <span>12 days remaining</span>
                <ArrowDownRight size={13} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Safe level: 4 days
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('inventory')}
              className="text-xs font-semibold text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>View Inventory</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* CARD 5: ASSETS (Spans 2 cols on lg) */}
        <div className="sm:col-span-1 lg:col-span-2 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Cpu size={16} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                ASSETS
              </span>
              <h3 className="text-sm font-bold text-[#0F172A] mt-0.5">
                Generator G-021
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Maintenance approaching
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                In 60 hours
              </p>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => goTo('assets')}
              className="text-xs font-semibold text-[#0284C7] hover:underline inline-flex items-center gap-1"
            >
              <span>View Assets</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          3. BOTTOM SECTION: LIVE MAP + TIMELINE & AI INSIGHT
          ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: MISSION OVERVIEW LIVE POLAR MAP (Spans 8 cols on lg) */}
        <div className="lg:col-span-8 rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                Mission Overview
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Live location, cargo routes and key assets
              </p>
            </div>

            <button
              type="button"
              onClick={() => goTo('map')}
              className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition inline-flex items-center gap-1"
            >
              <span>View Full Map</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Interactive Antarctic Vector Map Canvas */}
          <div className="relative mt-4 h-[340px] sm:h-[380px] w-full rounded-xl overflow-hidden bg-[#EFF6FA] border border-slate-200/60 select-none">
            {/* Topographic Background Landmass & Ice Shelf SVG */}
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full object-cover"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Antarctic Ice Gradient */}
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

              {/* Ocean Canvas with Grid */}
              <rect width="800" height="500" fill="url(#oceanGrad)" />
              <rect width="800" height="500" fill="url(#grid)" />

              {/* Antarctic Continental Ice Shelf Outline */}
              <path
                d="M -20,120 Q 80,80 180,100 T 320,70 T 480,120 T 620,90 T 780,140 L 820,520 L -20,520 Z"
                fill="url(#iceShelfGrad)"
                stroke="#BCD9E8"
                strokeWidth="1.5"
              />

              {/* Inner Glacier Plateau Relief */}
              <path
                d="M 50,220 Q 150,180 260,210 T 420,170 T 560,220 T 720,190 L 760,520 L 50,520 Z"
                fill="#FFFFFF"
                opacity="0.8"
                stroke="#D3E7F2"
                strokeWidth="1"
              />

              {/* Topographic elevation contours */}
              <path
                d="M 120,290 Q 220,260 340,280 T 520,250 T 680,270"
                fill="none"
                stroke="#C6E0EE"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Cargo Route (Curved Dashed Line from Ocean Vessel to Maitri Station) */}
              <path
                d="M 560,390 C 480,380 380,340 320,260 C 280,205 275,170 250,105"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />

              {/* Secondary Traverse Route from Maitri to Field Camp B */}
              <path
                d="M 250,105 L 260,260"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* WAYPOINT 1: Maitri Station */}
              <g transform="translate(250, 105)">
                <circle r="16" fill="#E0F2FE" opacity="0.6" />
                <circle r="8" fill="#0284C7" />
                <circle r="4" fill="#FFFFFF" />
              </g>

              {/* WAYPOINT 2: Field Camp B */}
              <g transform="translate(260, 260)">
                <circle r="14" fill="#D1FAE5" opacity="0.7" />
                <circle r="7" fill="#10B981" />
                <circle r="3.5" fill="#FFFFFF" />
              </g>

              {/* VESSEL: C-104 */}
              <g transform="translate(420, 350)">
                <circle r="14" fill="#E0F2FE" />
                <circle r="7" fill="#0284C7" />
              </g>

              {/* INCIDENT BEACON: Red Alert Pulse */}
              <g transform="translate(470, 340)">
                <circle r="15" fill="#FEE2E2" className="animate-ping" opacity="0.75" />
                <circle r="9" fill="#EF4444" />
                <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">!</text>
              </g>
            </svg>

            {/* DOM Overlay: Maitri Station Label Pin */}
            <div className="absolute top-[85px] left-[270px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-xs backdrop-blur-xs">
              <div className="h-4 w-4 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-[9px]">
                ⬡
              </div>
              <span>Maitri Station</span>
            </div>

            {/* DOM Overlay: Field Camp B Label Pin */}
            <div className="absolute top-[245px] left-[280px] z-10 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-xs backdrop-blur-xs">
              <div className="h-4 w-4 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[9px]">
                ▲
              </div>
              <span>Field Camp B</span>
            </div>

            {/* DOM Overlay: Vessel C-104 Card Tag */}
            <div className="absolute bottom-[80px] left-[350px] z-10 rounded-xl bg-white border border-slate-200/90 px-3 py-1.5 shadow-md flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                <Ship size={13} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">C-104</div>
                <div className="text-[10px] text-slate-500 leading-tight">ETA 17 days</div>
              </div>
            </div>

            {/* Map Controls (Top Right: Zoom +, Zoom -, Target) */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setMapZoom((z) => Math.min(z + 0.2, 2))}
                className="h-7 w-7 rounded-lg bg-white/95 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-2xs transition"
                title="Zoom In"
              >
                <Plus size={14} />
              </button>
              <button
                type="button"
                onClick={() => setMapZoom((z) => Math.max(z - 0.2, 0.8))}
                className="h-7 w-7 rounded-lg bg-white/95 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-2xs transition"
                title="Zoom Out"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                onClick={() => setMapZoom(1)}
                className="h-7 w-7 rounded-lg bg-white/95 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-2xs transition"
                title="Recenter"
              >
                <Navigation size={13} />
              </button>
            </div>

            {/* Map Legend (Bottom Left) */}
            <div className="absolute bottom-3 left-3 z-20 rounded-xl bg-white/95 border border-slate-200/80 p-2.5 shadow-xs backdrop-blur-xs text-[11px] text-slate-600 space-y-1">
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
            <div className="absolute bottom-3 right-3 z-20 h-7 w-7 rounded-full bg-white/95 border border-slate-200 flex items-center justify-center text-slate-500 shadow-2xs font-bold text-[10px] font-mono">
              N
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RECENT MISSION EVENT + AI MISSION INSIGHT (Spans 4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
          {/* Card 1: Recent Mission Event */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
              <Clock size={16} className="text-[#0284C7]" />
              <span>Recent Mission Event</span>
            </div>

            {/* Timeline List */}
            <div className="space-y-3.5 relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {/* Event 1: Fuel shipment delay (Red) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-4 ring-white" />
                <div className="text-xs font-bold text-rose-600">
                  Fuel shipment delay detected
                </div>
                <div className="text-[11px] text-slate-500">
                  Cargo C-104 • ETA 17 days
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  2 minutes ago
                </div>
              </div>

              {/* Event 2: Generator maintenance (Blue) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-[#0284C7] ring-4 ring-white" />
                <div className="text-xs font-bold text-[#0284C7]">
                  Generator maintenance due
                </div>
                <div className="text-[11px] text-slate-500">
                  G-021 • In 60 hours
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  1 hour ago
                </div>
              </div>

              {/* Event 3: Inventory level updated (Green) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-white" />
                <div className="text-xs font-bold text-emerald-600">
                  Inventory level updated
                </div>
                <div className="text-[11px] text-slate-500">
                  Fuel • 5,000 L
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  3 hours ago
                </div>
              </div>

              {/* Event 4: Personnel status change (Slate) */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-4 top-1 h-2.5 w-2.5 rounded-full bg-slate-400 ring-4 ring-white" />
                <div className="text-xs font-bold text-slate-700">
                  Personnel status change
                </div>
                <div className="text-[11px] text-slate-500">
                  Team Alpha • Field Mission
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  5 hours ago
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => goTo('audit')}
                className="text-xs font-semibold text-[#0284C7] hover:underline inline-flex items-center gap-1"
              >
                <span>View All Events</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Card 2: AI Mission Insight */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-xs relative overflow-hidden space-y-4">
            {/* Top Right Mountain Graphic Watermark */}
            <div className="absolute top-2 right-2 opacity-30 pointer-events-none">
              <svg width="60" height="40" viewBox="0 0 100 60" fill="none">
                <polygon points="50,10 90,60 10,60" fill="#BAE6FD" />
                <polygon points="50,10 70,60 10,60" fill="#7DD3FC" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284C7]">
                <Sparkles size={14} />
                <span>AI Mission Insight</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                Fuel resupply is projected to arrive after the current safe operating window. This may impact generator operation and research activities.
              </p>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => goTo('copilot')}
                  className="rounded-lg border border-[#0284C7] text-[#0284C7] hover:bg-sky-50 px-3.5 py-1.5 text-xs font-semibold inline-flex items-center gap-1 transition"
                >
                  <span>Ask POLAR</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* Quick Actions Sub-Section */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                Quick Actions
              </div>

              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={onStartGuidedDemo}
                  className="w-full text-left rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-sky-300 p-2 text-xs text-slate-700 font-medium flex items-center gap-2.5 transition shadow-2xs"
                >
                  <div className="h-6 w-6 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                    <Play size={12} className="fill-[#0284C7]" />
                  </div>
                  <span>Run Demo</span>
                </button>

                <button
                  type="button"
                  onClick={() => goTo('simulator')}
                  className="w-full text-left rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-sky-300 p-2 text-xs text-slate-700 font-medium flex items-center gap-2.5 transition shadow-2xs"
                >
                  <div className="h-6 w-6 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                    <Sliders size={12} />
                  </div>
                  <span>Open Simulator</span>
                </button>

                <button
                  type="button"
                  onClick={() => goTo('risks')}
                  className="w-full text-left rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-sky-300 p-2 text-xs text-slate-700 font-medium flex items-center gap-2.5 transition shadow-2xs"
                >
                  <div className="h-6 w-6 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                    <AlertTriangle size={12} />
                  </div>
                  <span>View Mission Risk</span>
                </button>

                <button
                  type="button"
                  onClick={() => goTo('copilot')}
                  className="w-full text-left rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-sky-300 p-2 text-xs text-slate-700 font-medium flex items-center gap-2.5 transition shadow-2xs"
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
      </div>
    </div>
  )
}
