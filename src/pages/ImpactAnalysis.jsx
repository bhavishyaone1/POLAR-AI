/**
 * IMPACT ANALYSIS — CRYSTAL CLEAR CASCADE
 * ========================================
 * Section 6:
 * Make the cascading impact crystal clear:
 * Direct Impact → Secondary Impact → Downstream Impact → Mission Impact
 */

import React, { useState } from 'react'
import {
  AlertOctagon,
  ArrowRight,
  Boxes,
  Cpu,
  Flame,
  GitFork,
  Package,
  ShieldAlert,
  Sliders,
  ThermometerSnowflake,
  Zap,
} from 'lucide-react'

export default function ImpactAnalysis({ goTo }) {
  const [activeStage, setActiveStage] = useState(1)

  const stages = [
    {
      id: 1,
      step: 'Direct Impact',
      title: 'Fuel Reserve Depletion',
      icon: Flame,
      color: 'rose',
      summary: 'Station central tank reservoir reaches empty on Day 12.',
      detail:
        'With current burn rate at 1,180 L/day, Maitri Station has 14,200 Liters available (12.0 days). Consignment C-101 is 17.0 days away, generating an unbuffered 5.0-day shortage gap.',
      telemetry: 'Deficit Window: Day 12 to Day 17 (5.0 Days)',
    },
    {
      id: 2,
      step: 'Secondary Impact',
      title: 'Power Generation Failure',
      icon: Cpu,
      color: 'blue',
      summary: 'Primary CAT 3512 Generator trips off due to fuel starvation.',
      detail:
        'Station microgrid drops from 280 kW baseline down to emergency battery power (9 kW capacity). Backup generator G-02 cannot sustain habitat heating and science lab simultaneously.',
      telemetry: 'Station Microgrid: 96% Capacity Drop',
    },
    {
      id: 3,
      step: 'Downstream Impact',
      title: 'Hydronic Heating Loss',
      icon: ThermometerSnowflake,
      color: 'purple',
      summary: 'Glycol heating loops freeze; station habitat ambient falls.',
      detail:
        'Thermal distribution ceases across living quarters and laboratory modules. Internal temperatures project to drop below -15°C within 18 hours of generator shutdown.',
      telemetry: 'Habitat Thermal Decay: ~1.8°C per hour',
    },
    {
      id: 4,
      step: 'Mission Impact',
      title: 'Science Mission Termination',
      icon: ShieldAlert,
      color: 'amber',
      summary: 'Paleoclimate ice-core drill halt; sample cryogenic loss.',
      detail:
        'Drill motors lose 3-phase power; cryogenic freezer vaults containing 400m Antarctic ice-core samples suffer unrecoverable thermal degradation. Emergency evacuation required.',
      telemetry: 'Scientific Loss: 3 Seasons of Field Data',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <GitFork size={18} className="text-sky-600" />
            <h1 className="text-xl font-bold text-slate-900">Cascading Impact Analysis</h1>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Causal propagation from root logistics deficit to science mission viability.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => goTo('simulator')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 text-xs shadow-xs transition active:scale-95"
          >
            <Sliders size={13} />
            <span>Simulate In What-If Sandbox</span>
          </button>
        </div>
      </header>

      {/* ============================================================
          THE 4-STAGE CASCADE BANNER
          Direct Impact → Secondary Impact → Downstream Impact → Mission Impact
          ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            4-Stage Cascading Propagation
          </h2>
          <span className="text-xs text-slate-400">Click any stage to inspect details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((st) => {
            const Icon = st.icon
            const isSelected = activeStage === st.id

            return (
              <div
                key={st.id}
                onClick={() => setActiveStage(st.id)}
                className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition space-y-3 ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-500/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                    <Icon size={16} />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    0{st.id}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    {st.step}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                    {st.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.summary}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Active Stage Detail Breakdown */}
      {(() => {
        const current = stages.find((s) => s.id === activeStage) || stages[0]
        const CurrentIcon = current.icon

        return (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 md:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center">
                  <CurrentIcon size={20} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-sky-600">
                    Stage {current.id}: {current.step}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">{current.title}</h2>
                </div>
              </div>

              <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                {current.telemetry}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-400">
                Detailed Transmission Analysis
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
                {current.detail}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs">
              <span className="text-slate-600">
                Actionable Next Step: Test mitigation protocols in What-If Sandbox.
              </span>
              <button
                type="button"
                onClick={() => goTo('simulator')}
                className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:text-sky-700 hover:underline"
              >
                <span>Open What-If Simulator</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </section>
        )
      })()}
    </div>
  )
}
