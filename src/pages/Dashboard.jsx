/**
 * DASHBOARD — PREMIUM ARCTIC WHITE SPECIFICATION
 * ===============================================
 * Sections 4 & 5:
 *
 * Structure:
 * POLAR-AI                    ONLINE   RUN DEMO
 * Current Expedition: Antarctic Research Expedition 2027
 *
 *       68
 * MISSION CONTINUITY
 * Stable with emerging resupply risk
 *
 * Critical Risk:
 * Fuel Resupply Risk · 12 days remaining · Cargo ETA: 17 days
 *
 * Cargo (03 In Transit, 01 At Risk)
 * Inventory (Fuel: 12 days / 16.7d buffer, Food: 21 days)
 * Assets (14 Active, 1 Maintenance)
 *
 * Recent Mission Event:
 * Fuel shipment delay detected · 2 minutes ago
 */

import React from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Clock,
  Compass,
  Cpu,
  Flame,
  Package,
  Play,
  Radio,
  ShieldAlert,
  Sliders,
  Sparkles,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function Dashboard({ goTo, onStartGuidedDemo }) {
  const { continuityMetrics, stats, cargo } = useData()

  const score = continuityMetrics?.score ?? 68

  // Calculate SVG circular ring metrics for clean circular indicator
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* ============================================================
          TOP HEADER
          POLAR-AI · ONLINE · RUN DEMO
          Current Expedition: Antarctic Research Expedition 2027
          ============================================================ */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight text-[var(--ink-hi)]">
              POLAR-AI
            </h1>
            <span className="text-xs text-[var(--ink-low)] font-mono">·</span>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--ink-mid)] font-medium">
              Mission Continuity Intelligence
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-ice)] border border-[var(--line)] px-2.5 py-0.5 text-[10px] font-mono font-semibold text-[var(--ink-hi)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ice)] animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--ink-mid)] pt-0.5">
            <span className="font-mono text-[11px] text-[var(--ink-low)] uppercase">Current Expedition:</span>
            <span className="font-medium text-[var(--ink-hi)]">Antarctic Research Expedition 2027</span>
            <span className="text-[var(--ink-low)]">·</span>
            <span>Maitri Station</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--ice)] hover:bg-[#3F96B2] text-white font-semibold px-4 py-2 text-xs shadow-xs transition active:scale-95"
            title="Start step-by-step guided demonstration"
          >
            <Play size={13} className="fill-white" />
            <span>RUN DEMO</span>
          </button>
        </div>
      </header>

      {/* ============================================================
          DOMINANT VISUAL ELEMENT: MISSION CONTINUITY SCORE (68)
          Clean circular ring indicator with refined ice-blue treatment
          ============================================================ */}
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] p-5 sm:p-8 md:p-10 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Left: Circular indicator & Score */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 text-center sm:text-left w-full sm:w-auto">
            <div className="relative flex items-center justify-center shrink-0">
              <svg width="128" height="128" className="transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="#EEF7FA"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Score Ring (Ice Blue) */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="#4BA7C5"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Centered Score */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold tracking-tight text-[var(--ink-hi)] font-mono">
                  {score}
                </span>
                <span className="text-[10px] font-mono text-[var(--ink-low)] uppercase">
                  / 100
                </span>
              </div>
            </div>

            <div className="space-y-1.5 max-w-md">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ice)]">
                  MISSION CONTINUITY
                </span>
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  Emerging Risk
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-[var(--ink-hi)]">
                Stable with emerging resupply risk
              </h2>
              <p className="text-xs text-[var(--ink-mid)] leading-relaxed">
                Fuel inventory is projected to exhaust on Day 12 while scheduled replenishment consignment C-101 reaches port on Day 17.
              </p>
            </div>
          </div>

          {/* Right: Quick actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto pt-2 md:pt-0">
            <button
              type="button"
              onClick={() => goTo('risks')}
              className="flex-1 md:flex-none inline-flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface-base)] hover:bg-[var(--surface-secondary)] hover:border-[var(--line-hover)] px-3.5 py-2.5 text-xs font-semibold text-[var(--ink-hi)] transition"
            >
              <span>Inspect Risk Flow</span>
              <ArrowRight size={13} className="text-[var(--ice)]" />
            </button>
            <button
              type="button"
              onClick={() => goTo('simulator')}
              className="flex-1 md:flex-none inline-flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface-base)] hover:bg-[var(--surface-secondary)] hover:border-[var(--line-hover)] px-3.5 py-2.5 text-xs font-semibold text-[var(--ink-hi)] transition"
            >
              <span>What-If Sandbox</span>
              <Sliders size={13} className="text-[var(--ice)]" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          CRITICAL RISK HERO CARD
          Fuel Resupply Risk · 12 days remaining · Cargo ETA: 17 days
          ============================================================ */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
            Primary Vulnerability
          </span>
          <span className="text-xs font-mono text-rose-600 font-semibold">
            Potential supply gap: 5.0 days
          </span>
        </div>

        <div
          onClick={() => goTo('risks')}
          className="cursor-pointer rounded-2xl border border-rose-200/80 bg-white p-6 shadow-xs transition hover:border-rose-300 hover:shadow-sm space-y-4 group"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
                <AlertTriangle size={16} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-rose-700 tracking-wider">
                  Critical Risk
                </span>
                <h3 className="text-base font-bold text-[var(--ink-hi)] group-hover:text-rose-600 transition">
                  Fuel Resupply Risk
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-rose-600 font-bold">12 days remaining</span>
              <span className="text-[var(--ink-low)]">vs</span>
              <span className="text-[var(--ink-hi)] font-semibold">Cargo ETA: 17 days</span>
            </div>
          </div>

          <div className="rounded-xl bg-[var(--surface-ice)] border border-[var(--line)] p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[var(--ink-mid)]">
              <span className="font-semibold text-[var(--ink-hi)]">Dependency Chain:</span>
              <span className="font-mono text-[11px] text-[var(--ink-hi)]">
                FUEL → GENERATOR → POWER → HEATING → RESEARCH
              </span>
            </div>
            <span className="text-[var(--ice)] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition">
              View Dependency Flow <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          SUMMARY TRIO: CARGO · INVENTORY · ASSETS
          Per Section 5 & 8 specifications
          ============================================================ */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
            Operational Pillars
          </span>
          <span className="text-xs text-[var(--ink-low)]">Real-time station telemetry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Cargo */}
          <div
            onClick={() => goTo('cargo')}
            className="cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-6 shadow-xs transition hover:border-[var(--line-hover)] hover:shadow-sm space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
                Cargo
              </span>
              <div className="h-7 w-7 rounded-lg bg-[var(--surface-ice)] text-[var(--ice)] flex items-center justify-center">
                <Package size={14} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[var(--ink-hi)]">03</span>
                <span className="text-xs text-[var(--ink-mid)]">In Transit</span>
              </div>
              <div className="flex items-baseline gap-2 text-xs">
                <span className="font-mono font-bold text-amber-600">01</span>
                <span className="text-[var(--ink-low)]">At Risk (Consignment C-101)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-low)] group-hover:text-[var(--ice)] transition font-medium">
              <span>Cape Town corridor</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* 2. Inventory (Formatted per Section 8 example) */}
          <div
            onClick={() => goTo('inventory')}
            className="cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-6 shadow-xs transition hover:border-[var(--line-hover)] hover:shadow-sm space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
                Inventory
              </span>
              <div className="h-7 w-7 rounded-lg bg-[var(--surface-ice)] text-[var(--ice)] flex items-center justify-center">
                <Boxes size={14} />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--ink-mid)] font-medium">Fuel Runway:</span>
                <span className="font-mono font-bold text-rose-600">12.0 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--ink-mid)]">Safe Window Buffer:</span>
                <span className="font-mono text-[var(--ink-hi)] font-semibold">16.7 days target</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--ink-mid)]">Ration Packs (Food):</span>
                <span className="font-mono text-[var(--ink-hi)]">21.0 days</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-low)] group-hover:text-[var(--ice)] transition font-medium">
              <span>300 L / day burn rate</span>
              <ArrowRight size={12} />
            </div>
          </div>

          {/* 3. Assets */}
          <div
            onClick={() => goTo('assets')}
            className="cursor-pointer rounded-2xl border border-[var(--line)] bg-white p-6 shadow-xs transition hover:border-[var(--line-hover)] hover:shadow-sm space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
                Assets
              </span>
              <div className="h-7 w-7 rounded-lg bg-[var(--surface-ice)] text-[var(--ice)] flex items-center justify-center">
                <Cpu size={14} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[var(--ink-hi)]">14</span>
                <span className="text-xs text-[var(--ink-mid)]">Active Machinery</span>
              </div>
              <div className="flex items-baseline gap-2 text-xs">
                <span className="font-mono font-bold text-amber-600">1</span>
                <span className="text-[var(--ink-low)]">Maintenance (G-021 Service)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-low)] group-hover:text-[var(--ice)] transition font-medium">
              <span>CAT 3512 Primary Gen</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          RECENT MISSION EVENT STRIP
          Section 5: "Fuel shipment delay detected · 2 minutes ago"
          ============================================================ */}
      <section className="rounded-xl border border-[var(--line)] bg-[var(--surface-base)] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--ink-low)]">
            Recent Mission Event
          </span>
          <span className="text-[var(--ink-hi)] font-medium">
            Fuel shipment delay detected (Novo Runway transfer corridor)
          </span>
        </div>

        <div className="flex items-center gap-3 text-[var(--ink-low)] font-mono text-[11px]">
          <span className="flex items-center gap-1">
            <Clock size={11} /> 2 minutes ago
          </span>
          <span>·</span>
          <button
            type="button"
            onClick={() => goTo('copilot')}
            className="text-[var(--ice)] hover:underline font-semibold"
          >
            Review Copilot Mitigation →
          </button>
        </div>
      </section>
    </div>
  )
}
