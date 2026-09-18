/**
 * WHAT-IF MISSION SIMULATOR
 * =========================
 * Non-mutating operational sandbox.
 * Clones current production records in-memory to test hypothetical cargo delays,
 * generator outages, and blizzard shutdowns without altering live data.
 * Displays Before vs After score deltas, shortage gaps, and mitigation proposals.
 */

import React, { useState, useMemo } from 'react'
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  Flame,
  Gauge,
  HelpCircle,
  Package,
  RotateCcw,
  Sliders,
  Sparkles,
  TrendingDown,
  Wind,
  Zap,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function MissionSimulator({ goTo }) {
  const { runSimulation, continuityMetrics, approveRecommendation } = useData()

  // Simulation Parameters
  const [cargoDelayDays, setCargoDelayDays] = useState(5)
  const [consumptionMultiplier, setConsumptionMultiplier] = useState(1.0)
  const [generatorTripped, setGeneratorTripped] = useState(false)
  const [blizzardSeverity, setBlizzardSeverity] = useState('NORMAL')

  // Run simulation dynamically as parameters change
  const simResult = useMemo(() => {
    return runSimulation({
      cargoDelayDays,
      cargoId: 'C-101',
      consumptionMultiplier,
      generatorTripped,
      blizzardSeverity,
    })
  }, [runSimulation, cargoDelayDays, consumptionMultiplier, generatorTripped, blizzardSeverity])

  const handleReset = () => {
    setCargoDelayDays(0)
    setConsumptionMultiplier(1.0)
    setGeneratorTripped(false)
    setBlizzardSeverity('NORMAL')
  }

  const handleApplyPresetDemo = () => {
    // Exact Magic Moment demo preset
    setCargoDelayDays(5)
    setConsumptionMultiplier(1.0)
    setGeneratorTripped(false)
    setBlizzardSeverity('NORMAL')
  }

  const isDegraded = simResult.scoreDelta < 0

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-purple-500/30 bg-gradient-to-r from-[#120a24] to-[#0a0717] p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-purple-400 mb-1">
              <Sliders size={14} />
              Sandboxed What-If Resilience Simulator
            </div>
            <h2 className="text-xl font-bold text-white">
              Simulate Operational Disruptions (Zero-Production Mutation)
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Test hypothetical delays and hardware outages to evaluate systemic resilience. All calculations use temporary memory clones; live production records remain untouched.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyPresetDemo}
              className="rounded-lg bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 text-xs font-mono font-bold text-amber-300 transition hover:bg-amber-500/30"
            >
              Load Hackathon Scenario (+5d Fuel Delay)
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <RotateCcw size={13} />
              Reset Baseline
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls on Left, Live Comparative Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Parameter Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4 rounded-xl border border-slate-800 bg-[#091122] p-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders size={15} className="text-cyan-400" />
              Hypothetical Perturbation Controls
            </h3>
            <span className="text-[10px] font-mono uppercase text-slate-400">Sandbox Armed</span>
          </div>

          {/* 1. Cargo Delay Slider */}
          <div className="space-y-2 rounded-lg bg-slate-900/70 p-3.5 border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Package size={14} className="text-amber-400" />
                Resupply Cargo C-101 Delay
              </span>
              <span className="font-mono text-amber-300 font-bold">
                +{cargoDelayDays} Days ({simResult.scenarioEtaDays}d ETA)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={cargoDelayDays}
              onChange={(e) => setCargoDelayDays(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>+0d (Nominal)</span>
              <span>+5d (Antarctic Gap)</span>
              <span>+15d (Total Breach)</span>
            </div>
          </div>

          {/* 2. Fuel Burn Rate Surge */}
          <div className="space-y-2 rounded-lg bg-slate-900/70 p-3.5 border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Flame size={14} className="text-rose-400" />
                Station Thermal Load Surge
              </span>
              <span className="font-mono text-rose-300 font-bold">
                {Math.round((consumptionMultiplier - 1) * 100)}% Extra Burn
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="1.5"
              step="0.05"
              value={consumptionMultiplier}
              onChange={(e) => setConsumptionMultiplier(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>1.0x (1,180 L/d)</span>
              <span>1.25x (+25% sub-zero)</span>
              <span>1.5x (Peak Cryo)</span>
            </div>
          </div>

          {/* 3. Generator Failure Toggle */}
          <div className="flex items-center justify-between rounded-lg bg-slate-900/70 p-3.5 border border-slate-800">
            <div className="flex items-center gap-2 text-xs">
              <Cpu size={15} className="text-blue-400" />
              <div>
                <p className="font-semibold text-slate-200">Trip Primary CAT 3512 Generator</p>
                <p className="text-[11px] text-slate-400">Forces station onto secondary G-02 unit</p>
              </div>
            </div>
            <button
              onClick={() => setGeneratorTripped(!generatorTripped)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-bold transition ${
                generatorTripped
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {generatorTripped ? 'GEN OFFLINE' : 'NOMINAL'}
            </button>
          </div>

          {/* 4. Blizzard Weather Intensity */}
          <div className="space-y-2 rounded-lg bg-slate-900/70 p-3.5 border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Wind size={14} className="text-sky-400" />
                Polar Climate Hazard Level
              </span>
              <span className="font-mono text-sky-300 font-bold">{blizzardSeverity}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {['NORMAL', 'BLIZZARD', 'EXTREME'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setBlizzardSeverity(lvl)}
                  className={`rounded py-1 text-[11px] font-mono font-semibold transition ${
                    blizzardSeverity === lvl
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Before vs After Telemetry (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Continuity Score Comparison Card */}
          <div className="rounded-xl border border-slate-800 bg-[#0a1224] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Mission Continuity Delta Analysis
              </span>
              <span className="text-xs font-mono text-cyan-400">Deterministic Engine</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Baseline */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Baseline Continuity</span>
                <p className="text-3xl font-extrabold text-sky-400 mt-1">{simResult.baselineScore}%</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 mt-2 inline-block">
                  {simResult.baselineStatus}
                </span>
              </div>

              {/* Delta */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center flex flex-col justify-center items-center">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Projected Impact</span>
                <p
                  className={`text-3xl font-extrabold mt-1 ${
                    simResult.scoreDelta < 0
                      ? 'text-rose-400'
                      : simResult.scoreDelta > 0
                      ? 'text-emerald-400'
                      : 'text-slate-300'
                  }`}
                >
                  {simResult.scoreDelta > 0 ? `+${simResult.scoreDelta}` : simResult.scoreDelta}%
                </p>
                <span className="text-xs text-slate-400 mt-1">
                  {simResult.scoreDelta < 0 ? 'Resilience Deterioration' : 'No Net Loss'}
                </span>
              </div>

              {/* Scenario Result */}
              <div
                className={`rounded-xl border p-4 text-center ${
                  simResult.scenarioScore < 60
                    ? 'border-rose-500/50 bg-rose-950/20'
                    : 'border-amber-500/50 bg-amber-950/20'
                }`}
              >
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Simulated Score</span>
                <p
                  className={`text-3xl font-extrabold mt-1 ${
                    simResult.scenarioScore < 60 ? 'text-rose-400' : 'text-amber-400'
                  }`}
                >
                  {simResult.scenarioScore}%
                </p>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded mt-2 inline-block ${
                    simResult.scenarioScore < 60
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {simResult.scenarioStatus}
                </span>
              </div>
            </div>

            {/* Fuel Runway & Deficit Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg bg-slate-900/80 p-3 border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Maitri Fuel Runway</span>
                  <span className="font-mono text-white font-bold">
                    {simResult.scenarioDaysRemaining} Days Available
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                  <span>Baseline was {simResult.baselineDaysRemaining} days</span>
                  <span className="text-rose-400 font-mono">
                    ({simResult.scenarioDaysRemaining - simResult.baselineDaysRemaining}d delta)
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-slate-900/80 p-3 border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Resupply Shortage Gap</span>
                  <span className="font-mono text-rose-400 font-bold">
                    {simResult.projectedShortageGap} Days Deficit
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  Resupply ETA: {simResult.scenarioEtaDays} days vs {simResult.scenarioDaysRemaining}d fuel
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Event Logs */}
          <div className="rounded-xl border border-slate-800 bg-[#0a1224] p-5 space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold">
              Downstream Cascading Events
            </h4>
            {simResult.deltaLogs.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No perturbations applied. System running nominal baseline.</p>
            ) : (
              <div className="space-y-2">
                {simResult.deltaLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-lg border border-slate-800 bg-slate-900/50 p-2.5 text-xs"
                  >
                    <AlertTriangle size={14} className="shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">{log.title}</span>
                      <span className="text-slate-400 text-[11px] mt-0.5 block">{log.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tactical Mitigation Proposals */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles size={14} />
                Calculated Mitigation Options
              </h4>
              <span className="text-[10px] font-mono text-slate-400">Human Approval Required</span>
            </div>

            <div className="space-y-2">
              {simResult.mitigationOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="rounded-lg border border-cyan-500/20 bg-slate-900/70 p-3 flex flex-wrap items-center justify-between gap-3 text-xs"
                >
                  <div className="max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{opt.title}</span>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        {opt.estimatedRecovery}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] mt-1">{opt.action}</p>
                  </div>

                  <button
                    onClick={() => {
                      approveRecommendation('REC-001', 'Operations Officer')
                      goTo('audit')
                    }}
                    className="rounded bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-500 shadow-sm"
                  >
                    Authorize Action →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
