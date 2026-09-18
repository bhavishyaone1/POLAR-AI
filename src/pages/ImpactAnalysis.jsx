/**
 * DEPENDENCY GRAPH & CHAIN REACTION ANALYSIS
 * ==========================================
 * Visualizes how single-point operational failures cascade across
 * Cargo → Inventory → Power Generation → Life Support → Science Missions.
 * Core differentiator: EVENT → IMPACT → DEPENDENCY → FORECAST → MITIGATION.
 */

import React, { useState } from 'react'
import {
  AlertOctagon,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Boxes,
  Cpu,
  Flame,
  GitFork,
  Package,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react'
import { DEPENDENCY_EDGES, DEPENDENCY_NODES, traceImpactCascade } from '../services/dependencyGraph'

export default function ImpactAnalysis({ goTo }) {
  const [selectedNodeId, setSelectedNodeId] = useState('NODE-CARGO-C101')
  const cascade = traceImpactCascade(selectedNodeId)

  const getNodeColor = (cat) => {
    switch (cat) {
      case 'CARGO':
        return 'border-amber-500/40 bg-amber-950/30 text-amber-300'
      case 'RESOURCE':
        return 'border-rose-500/40 bg-rose-950/30 text-rose-300'
      case 'ASSET':
        return 'border-blue-500/40 bg-blue-950/30 text-blue-300'
      case 'UTILITY':
        return 'border-purple-500/40 bg-purple-950/30 text-purple-300'
      case 'MISSION':
        return 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
      default:
        return 'border-slate-700 bg-slate-800 text-slate-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Banner explaining the USP */}
      <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-[#0a1628] to-[#08101e] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              <GitFork size={14} />
              Mission Continuity Core USP: Causal Propagation
            </div>
            <h2 className="text-lg font-bold text-white">
              Chain Reaction & Operational Dependency Graph
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Click any node in the Antarctic logistics chain below to calculate how a disruption cascades through power, heating, and scientific field missions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedNodeId('NODE-CARGO-C101')}
              className="rounded-lg bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-mono font-semibold text-amber-300 transition hover:bg-amber-500/30"
            >
              Demo: Fuel Resupply Delay (C-101)
            </button>
            <button
              onClick={() => goTo('simulator')}
              className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-500 shadow-md shadow-cyan-600/20"
            >
              Run In Simulator →
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Graph & Impact Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Node Layout */}
        <div className="lg:col-span-2 space-y-5 rounded-xl border border-slate-800 bg-[#070e1c] p-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Interactive System Topology
            </span>
            <span className="text-xs text-cyan-400 font-mono">
              Active Focus: {cascade.sourceNode?.label}
            </span>
          </div>

          {/* Layer 1: Logistics & Inbound Cargo */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
              Layer 1: External Cargo Corridors
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEPENDENCY_NODES.filter((n) => n.category === 'CARGO').map((node) => {
                const isSelected = selectedNodeId === node.id
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-amber-400 flex items-center gap-1">
                        <Package size={12} />
                        {node.id}
                      </span>
                      <span className="rounded bg-amber-950 px-1.5 py-0.5 text-[10px] font-mono text-amber-400">
                        {node.status}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-white mt-1.5">{node.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{node.notes}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Cascade Connector Arrow */}
          <div className="flex justify-center text-slate-600">
            <ArrowDown size={18} className="animate-bounce text-cyan-400" />
          </div>

          {/* Layer 2: Station Inventory & Physical Resources */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
              Layer 2: Station Storage & Fuel Depots
            </span>
            <div className="grid grid-cols-1 gap-3">
              {DEPENDENCY_NODES.filter((n) => n.category === 'RESOURCE').map((node) => {
                const isSelected = selectedNodeId === node.id
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition ${
                      isSelected
                        ? 'border-rose-400 bg-rose-950/40 ring-2 ring-rose-400/40 shadow-lg shadow-rose-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-rose-400 flex items-center gap-1">
                        <Flame size={12} />
                        {node.id}
                      </span>
                      <span className="rounded bg-rose-950 px-1.5 py-0.5 text-[10px] font-mono text-rose-400">
                        {node.status}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-white mt-1.5">{node.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{node.notes}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Cascade Connector Arrow */}
          <div className="flex justify-center text-slate-600">
            <ArrowDown size={18} className="text-blue-400" />
          </div>

          {/* Layer 3: Power Generation & Assets */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
              Layer 3: Generation & Infrastructure Machinery
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEPENDENCY_NODES.filter((n) => n.category === 'ASSET').map((node) => {
                const isSelected = selectedNodeId === node.id
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition ${
                      isSelected
                        ? 'border-blue-400 bg-blue-950/40 ring-2 ring-blue-400/40 shadow-lg shadow-blue-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-blue-400 flex items-center gap-1">
                        <Cpu size={12} />
                        {node.id}
                      </span>
                      <span className="rounded bg-blue-950 px-1.5 py-0.5 text-[10px] font-mono text-blue-400">
                        {node.status}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-white mt-1.5">{node.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{node.notes}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Cascade Connector Arrow */}
          <div className="flex justify-center text-slate-600">
            <ArrowDown size={18} className="text-purple-400" />
          </div>

          {/* Layer 4: Microgrid & Scientific Programs */}
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
              Layer 4: Utilities & Science Missions
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DEPENDENCY_NODES.filter((n) => n.category === 'UTILITY' || n.category === 'MISSION').map((node) => {
                const isSelected = selectedNodeId === node.id
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition ${
                      isSelected
                        ? 'border-purple-400 bg-purple-950/40 ring-2 ring-purple-400/40 shadow-lg shadow-purple-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-purple-400 flex items-center gap-1">
                        <Zap size={12} />
                        {node.id}
                      </span>
                      <span className="rounded bg-purple-950 px-1.5 py-0.5 text-[10px] font-mono text-purple-400">
                        {node.status}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-white mt-1.5">{node.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{node.notes}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Cascade Consequences & Downstream Impact */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-[#091224] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <AlertOctagon size={16} className="text-amber-400" />
                Chain Reaction Breakdown
              </h3>
              <span className="rounded-full bg-amber-950 border border-amber-500/40 px-2 py-0.5 text-[10px] font-mono text-amber-300">
                {cascade.totalAffectedCount} Cascading Nodes
              </span>
            </div>

            {/* Focal Node */}
            <div className="rounded-lg bg-slate-900/80 p-3 border border-slate-700/80">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Root Disruption Node</span>
              <p className="font-bold text-white text-sm mt-0.5">{cascade.sourceNode?.label}</p>
              <p className="text-xs text-slate-300 mt-1">{cascade.sourceNode?.notes}</p>
            </div>

            {/* Direct Impacts */}
            {cascade.directImpacts.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-rose-400 font-semibold block">
                  1. Direct Downstream Impact
                </span>
                <div className="space-y-1.5">
                  {cascade.directImpacts.map((d) => (
                    <div key={d.id} className="rounded border border-rose-500/30 bg-rose-950/20 p-2.5 text-xs text-rose-200">
                      <span className="font-semibold block">{d.label}</span>
                      <span className="text-slate-400 text-[11px] mt-0.5 block">{d.notes}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Secondary Impacts */}
            {cascade.secondaryImpacts.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-amber-400 font-semibold block">
                  2. Secondary Transmission (Power / Grid)
                </span>
                <div className="space-y-1.5">
                  {cascade.secondaryImpacts.map((s) => (
                    <div key={s.id} className="rounded border border-amber-500/30 bg-amber-950/20 p-2.5 text-xs text-amber-200">
                      <span className="font-semibold block">{s.label}</span>
                      <span className="text-slate-400 text-[11px] mt-0.5 block">{s.notes}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Downstream Impacts */}
            {cascade.downstreamImpacts.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-cyan-400 font-semibold block">
                  3. Critical Mission & Habitat Impact
                </span>
                <div className="space-y-1.5">
                  {cascade.downstreamImpacts.map((ds) => (
                    <div key={ds.id} className="rounded border border-cyan-500/30 bg-cyan-950/20 p-2.5 text-xs text-cyan-200">
                      <span className="font-semibold block">{ds.label}</span>
                      <span className="text-slate-400 text-[11px] mt-0.5 block">{ds.notes}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mitigation CTA */}
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/40 p-4 space-y-2">
              <span className="text-xs font-mono text-cyan-300 uppercase font-semibold flex items-center gap-1.5">
                <Sparkles size={13} />
                Continuity Engine Recommendation
              </span>
              <p className="text-xs text-slate-200">
                To prevent this cascade from forcing an emergency shutdown of the Paleoclimate drill, approve Level-1 non-critical circuit load shedding now.
              </p>
              <button
                onClick={() => goTo('copilot')}
                className="w-full mt-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 py-2 text-xs font-bold text-white transition shadow-md shadow-cyan-600/20"
              >
                Open Copilot Recommendation →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
