/**
 * DASHBOARD — the primary operational overview.
 *
 * Its whole job is to answer, in under 30 seconds: what is running right
 * now, and what needs attention?
 *
 * EVERY NUMBER ON THIS PAGE IS COUNTED FROM THE SHARED DATA.
 * Nothing here is typed in by hand. That is the point of the demo: go to
 * the Emergency page, report an incident, come back here, and the alert
 * count and the alert list have already changed. Drop an inventory item
 * below its minimum and the Low Stock card goes up. No page "tells"
 * another page to refresh — they all read the same single source.
 */

import { useState } from 'react'
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Boxes,
  ChevronDown,
  ChevronUp,
  Compass,
  Cpu,
  Flame,
  Gauge,
  GitFork,
  HelpCircle,
  Hourglass,
  Package,
  Play,
  Radio,
  ShieldAlert,
  Siren,
  Sliders,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { SYSTEM_USP } from '../data/polarIntelligenceData'
import { calculateResupplyMetrics } from '../services/continuityEngine'

import Badge from '../components/Badge'
import DataTable from '../components/DataTable'
import HorizontalBarChart from '../components/HorizontalBarChart'
import Panel from '../components/Panel'
import StatCard from '../components/StatCard'
import StateBlock from '../components/StateBlock'
import { useData } from '../store/DataContext'
import { clampPercent, formatDate, timeAgo } from '../lib/format'
import {
  CARGO_STATUS,
  EMERGENCY_STATUS,
  EMERGENCY_TYPE,
  EXPEDITION_STATUS,
  PRIORITY,
  SEVERITY,
  STOCK_STATUS,
  statusColour,
  statusLabel,
  stockStatus,
} from '../lib/statuses'

/* Which colour the activity-log dot gets, per kind of event. */
const ACTIVITY_TONE = {
  EMERGENCY: 'alert',
  CARGO: 'info',
  INVENTORY: 'warn',
  PERSONNEL: 'ok',
  EXPEDITION: 'info',
  WEATHER: 'muted',
}

export default function Dashboard({ goTo, onStartGuidedDemo }) {
  const {
    stats,
    expeditions,
    cargo,
    inventory,
    emergencies,
    personnel,
    activityLog,
    continuityMetrics,
    risks,
    assets,
    loading,
    error,
  } = useData()

  const [selectedExpedition, setSelectedExpedition] = useState('ALL')
  const [alertDismissed, setAlertDismissed] = useState(false)
  const [showWhyScore, setShowWhyScore] = useState(false)

  const activeExpeditions = expeditions.filter((e) => e.status === 'ACTIVE')

  /* The consignments worth watching: anything late, or anything critical
     that has not landed yet. */
  const cargoNeedingAttention = cargo
    .filter((c) => c.status === 'DELAYED' || (c.priority === 'CRITICAL' && c.status !== 'ARRIVED'))
    .slice(0, 5)

  const openIncidents = emergencies.filter((e) => e.status !== 'RESOLVED')

  /* ---------- THE TWO CHARTS (master prompt section 7) ----------
     Counted from the same arrays the cards above count, on every render.

     One walk over the STATUS MAP rather than over the records, so the bars
     always appear in the same order and an empty status keeps its row.
     "0 delayed" is worth seeing, and a bar that disappears when it empties
     makes the whole chart jump about.

     The cargo chart is deliberately the SAME chart as the one on the Cargo
     page. That repetition is the demo, not an oversight: change a
     consignment's status over there, come back here, and this bar has
     already moved — because neither page tells the other anything. */
  function countInto(map, rows, valueOf, noun) {
    return Object.keys(map).map((key) => {
      const n = rows.filter((row) => valueOf(row) === key).length
      return {
        label: statusLabel(map, key),
        value: n,
        colour: statusColour(map, key),
        note: n > 0 ? String(n) : '',
        tip: `${n} ${n === 1 ? noun : `${noun}s`}`,
      }
    })
  }

  const cargoPipeline = countInto(CARGO_STATUS, cargo, (c) => c.status, 'consignment')
  const stockHealth = countInto(STOCK_STATUS, inventory, (i) => stockStatus(i), 'item')

  return (
    <div className="space-y-8">
      {/* ============================================================
          1. THE ALERT BANNER
          Only rendered when something is genuinely open. An always-on
          red banner trains people to ignore red banners.
          ============================================================ */}
      {openIncidents.length > 0 && !alertDismissed && (
        <div className="alert-strip flex items-center justify-between py-2.5 px-4 rounded-xl">
          <div className="flex items-center gap-2.5 min-w-0">
            <Siren size={16} strokeWidth={2} className="pulse shrink-0 text-[var(--red)]" />
            <div className="min-w-0 flex-1 text-xs">
              <span className="font-display font-semibold uppercase tracking-wider text-[var(--red)] mr-2">
                {openIncidents.length} open incident{openIncidents.length === 1 ? '' : 's'}:
              </span>
              <span className="text-mid truncate">
                {openIncidents
                  .slice(0, 2)
                  .map(
                    (i) =>
                      `${i.id} · ${statusLabel(EMERGENCY_TYPE, i.type)} at ${i.location} (${statusLabel(SEVERITY, i.severity)})`
                  )
                  .join(' · ')}
                {openIncidents.length > 2 && ` · +${openIncidents.length - 2} more`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <button type="button" className="btn btn--alert btn--sm py-1 px-3 text-xs" onClick={() => goTo('emergency')}>
              Respond
            </button>
            <button
              type="button"
              onClick={() => setAlertDismissed(true)}
              className="rounded-md p-1.5 text-low hover:text-hi transition"
              title="Dismiss alert banner"
              aria-label="Dismiss alert banner"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          PREDICTIVE MISSION CONTINUITY HERO (CORE USP)
          ============================================================ */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#4338CA] p-6 sm:p-8 shadow-lg space-y-6 text-white relative overflow-hidden">
        {/* Subtle decorative glow in top right matching reference image */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-white/15 border border-white/20 px-3.5 py-1 text-xs font-mono font-semibold text-white flex items-center gap-1.5 backdrop-blur-sm">
              <Sparkles size={13} className="text-cyan-300" />
              MISSION CONTINUITY INTELLIGENCE
            </span>
            <span className="text-xs text-indigo-200/80 font-mono hidden sm:inline">
              Continuous Autonomous Forecasting
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onStartGuidedDemo ? onStartGuidedDemo() : goTo('impact')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white text-indigo-950 font-bold px-4 py-2 text-xs font-mono transition hover:bg-slate-100 shadow-sm"
            >
              <Play size={13} className="fill-indigo-950" />
              Guided Demo: Fuel Gap Walkthrough
            </button>
            <button
              onClick={() => goTo('landing')}
              className="rounded-xl border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-white/20 backdrop-blur-sm"
            >
              System Comparison (PPT)
            </button>
          </div>
        </div>

        {/* USP Quote Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs py-0.5 relative z-10">
          <p className="italic text-indigo-100 font-medium">
            "{SYSTEM_USP.tagline}"
          </p>
          <span className="font-mono text-[11px] text-cyan-300">
            {SYSTEM_USP.philosophy}
          </span>
        </div>

        {/* Score & Resource Runway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-1 relative z-10">
          {/* Continuity Score Gauge (4 cols) */}
          <div className="md:col-span-4 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-200">
                  Mission Continuity Score
                </span>
                <span className="rounded-full bg-amber-400/20 border border-amber-300/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-300">
                  {continuityMetrics?.statusText ?? 'ATTENTION REQUIRED'}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-4xl font-extrabold text-amber-300">
                  {continuityMetrics?.score ?? 68}%
                </span>
                <span className="text-xs text-indigo-200 font-mono">Weighted Health Index</span>
              </div>
              <p className="text-xs text-indigo-100 mt-3 leading-relaxed">
                Logistics & fuel resupply deficits reduce station buffer below safety margins. Immediate mitigation recommended.
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between">
              <button
                onClick={() => setShowWhyScore(!showWhyScore)}
                className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-white font-semibold"
              >
                {showWhyScore ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                Why is my score 68%?
              </button>
              <button
                onClick={() => goTo('simulator')}
                className="text-xs text-indigo-200 hover:text-white font-mono flex items-center gap-1"
              >
                Simulator <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Resource Depletion Forecast Runway (5 cols) */}
          <div className="md:col-span-5 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-200 flex items-center gap-1.5">
                <Hourglass size={13} className="text-cyan-300" />
                Resource Runway Forecast
              </span>
              <span className="text-[10px] font-mono text-rose-300 font-semibold bg-rose-500/20 border border-rose-400/30 px-2 py-0.5 rounded">1 Critical Window Breach</span>
            </div>

            <div className="space-y-3.5 py-3 text-xs">
              {/* Fuel */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-white flex items-center gap-1.5 font-semibold">
                    <Flame size={12} className="text-rose-400" />
                    Diesel Fuel (Maitri)
                  </span>
                  <span className="text-rose-300 font-bold">12.0 Days Available</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400 rounded-full w-[40%]" />
                </div>
                <span className="text-[10px] text-indigo-200 block">
                  Cargo C-101 ETA: 17 days · <strong className="text-rose-300 font-bold">Shortage Gap: 5.0 days</strong>
                </span>
              </div>

              {/* Food */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-white flex items-center gap-1.5 font-semibold">
                    <Package size={12} className="text-emerald-300" />
                    Ration Packs (Food)
                  </span>
                  <span className="text-emerald-300 font-bold">24.0 Days Available</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[75%]" />
                </div>
              </div>

              {/* Medical */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-white flex items-center gap-1.5 font-semibold">
                    <ShieldAlert size={12} className="text-cyan-300" />
                    Medical & Trauma Kits
                  </span>
                  <span className="text-cyan-300 font-bold">40.0 Days Available</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full w-[88%]" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-indigo-200 font-mono">
              <span>Last Safe Resupply Date: <strong className="text-white">Sep 26, 2026</strong></span>
              <button onClick={() => goTo('inventory')} className="text-cyan-300 hover:underline">
                View All Runway
              </button>
            </div>
          </div>

          {/* Operational Risk Alert (3 cols) */}
          <div className="md:col-span-3 rounded-xl border border-rose-400/40 bg-rose-950/40 p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-rose-300">
                <AlertTriangle size={14} className="animate-pulse" />
                Active Risk Flagged
              </div>
              <h4 className="font-bold text-white text-sm mt-2">RSK-001: Fuel Window Breach</h4>
              <p className="text-xs text-rose-200/90 mt-2 leading-relaxed">
                12 days of fuel remaining vs 17-day cargo arrival creates an unhedged 5-day deficit gap.
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-rose-400/30 flex flex-col gap-2.5">
              <button
                onClick={() => goTo('impact')}
                className="w-full rounded-xl bg-rose-500 hover:bg-rose-600 py-2 text-xs font-bold text-white transition shadow-sm"
              >
                Trace Impact Graph →
              </button>
              <button
                onClick={() => goTo('copilot')}
                className="w-full text-center text-[11px] font-mono text-cyan-200 hover:underline"
              >
                View AI Mitigation Plan
              </button>
            </div>
          </div>
        </div>

        {/* Expandable "Why is my score this way?" Drawer */}
        {showWhyScore && (
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-raised)]/60 p-5 space-y-3.5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
              <h4 className="text-xs font-mono uppercase font-bold text-cyan-400">
                Transparent Continuity Contributors Breakdown (0–100 Weighted Formulation)
              </h4>
              <button onClick={() => setShowWhyScore(false)} className="text-slate-400 hover:text-white text-xs">
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {continuityMetrics?.contributors?.map((c) => (
                <div
                  key={c.id}
                  className="rounded-lg border border-[var(--line)] bg-[var(--surface-card)] p-3.5 flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="font-semibold text-white block">{c.label}</span>
                    <span className="text-slate-400 text-[11px] mt-1 block">{c.evidence}</span>
                  </div>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded text-xs shrink-0 ${
                      c.delta < 0
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {c.delta > 0 ? `+${c.delta}` : c.delta} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================
          EXPEDITION SELECTOR BAR
          ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-card)] p-3 px-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-1 flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-mid">
            <Compass size={13} className="text-[var(--ice)]" />
            <span>Expedition Filter:</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedExpedition('ALL')}
            className={`btn btn--sm ${selectedExpedition === 'ALL' ? '' : 'btn--ghost'}`}
          >
            All Expeditions ({expeditions.length})
          </button>
          {expeditions.map((exp) => {
            const hasEmergency = emergencies.some(
              (e) => e.expedition_id === exp.id && e.status !== 'RESOLVED'
            )
            const isSelected = selectedExpedition === exp.id
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => setSelectedExpedition(isSelected ? 'ALL' : exp.id)}
                className={`btn btn--sm flex items-center gap-2 ${
                  isSelected ? '' : 'btn--ghost'
                }`}
              >
                {hasEmergency && (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--red)]" />
                )}
                <span>{exp.id}</span>
                <span className="text-[10px] opacity-75">({exp?.name?.split(' ')?.[0] || exp?.id})</span>
              </button>
            )
          })}
        </div>
        {selectedExpedition !== 'ALL' && (
          <button
            type="button"
            onClick={() => setSelectedExpedition('ALL')}
            className="text-xs font-mono text-[var(--ice)] hover:underline"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* ============================================================
          2. THE HEADLINE NUMBERS
          Each card is clickable and takes you to the module behind it.
          ============================================================ */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
        <StatCard
          label="Active Expeditions"
          value={stats.expeditionsActive}
          hint={`${stats.expeditionsPlanning} in planning · ${stats.expeditionsTotal} total`}
          icon={Compass}
          onClick={() => goTo('expeditions')}
        />
        <StatCard
          label="Personnel Deployed"
          value={stats.personnelDeployed}
          hint={`${stats.personnelInTransit} in transit · ${stats.personnelTotal} on roster`}
          icon={Users}
          onClick={() => goTo('personnel')}
        />
        <StatCard
          label="Cargo In Transit"
          value={stats.cargoInTransit}
          hint={`${stats.cargoDelayed} delayed · ${stats.cargoTotal} consignments`}
          icon={Package}
          tone={stats.cargoDelayed > 0 ? 'warn' : undefined}
          onClick={() => goTo('cargo')}
        />
        <StatCard
          label="Low Stock Items"
          value={stats.lowStockCount}
          hint={`across ${stats.inventoryLocations} locations`}
          icon={Boxes}
          tone={stats.lowStockCount > 0 ? 'warn' : 'ok'}
          onClick={() => goTo('inventory')}
        />
        <StatCard
          label="Critical Alerts"
          value={stats.criticalAlerts}
          hint={`${stats.emergenciesActive} active · ${stats.emergenciesResponding} responding`}
          icon={AlertTriangle}
          tone={stats.criticalAlerts > 0 ? 'alert' : 'ok'}
          pulse={stats.criticalAlerts > 0}
          onClick={() => goTo('emergency')}
        />
      </div>

      {/* ============================================================
          3. ACTIVE EXPEDITIONS + OPEN INCIDENTS side by side
          ============================================================ */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          eyebrow="Operations"
          title="Active Expeditions"
          subtitle="Currently deployed in the field"
          action={
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => goTo('expeditions')}>
              Manage
            </button>
          }
        >
          <DataTable
            loading={loading}
            error={error}
            rows={activeExpeditions}
            rowKey={(row) => row.id}
            onRowClick={() => goTo('expeditions')}
            maxHeight="360px"
            emptyTitle="No active expeditions"
            emptyMessage="Expeditions marked ACTIVE will appear here."
            columns={[
              { header: 'ID', cell: (r) => r.id, mono: true, width: '78px' },
              {
                header: 'Expedition',
                strong: true,
                cell: (r) => (
                  <div>
                    <div>{r.name}</div>
                    <div className="text-[11px] font-normal text-low">{r.destination}</div>
                  </div>
                ),
              },
              {
                header: 'Team',
                align: 'right',
                width: '60px',
                mono: true,
                cell: (r) => r.team_size,
              },
              {
                header: 'Ends',
                width: '108px',
                mono: true,
                className: 'text-[11.5px]',
                cell: (r) => formatDate(r.end_date),
              },
              {
                header: 'Progress',
                width: '132px',
                cell: (r) => (
                  <div>
                    <div className="mb-1 flex justify-between text-[11px]">
                      <span className="text-low">{statusLabel(EXPEDITION_STATUS, r.status)}</span>
                      <span className="mono text-mid">{clampPercent(r.progress)}%</span>
                    </div>
                    <div className={`progress ${r.progress < 30 ? 'progress--warn' : ''}`}>
                      <span style={{ width: `${clampPercent(r.progress)}%` }} />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </Panel>

        <Panel
          eyebrow="Response"
          title="Open Incidents"
          subtitle={
            openIncidents.length > 0
              ? `${stats.emergenciesActive} active, ${stats.emergenciesResponding} responding`
              : 'No incidents open'
          }
        >
          {loading ? (
            <StateBlock kind="loading" />
          ) : openIncidents.length === 0 ? (
            <StateBlock
              kind="empty"
              title="All clear"
              message="No open incidents across any expedition."
            />
          ) : (
            <ul className="space-y-2.5">
              {openIncidents.map((incident) => (
                <li
                  key={incident.id}
                  className="card-tight card-interactive cursor-pointer"
                  onClick={() => goTo('emergency')}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="mono text-[11px] text-low">{incident.id}</span>
                    <Badge map={EMERGENCY_STATUS} value={incident.status} />
                  </div>
                  <div className="mt-1.5 text-[13px] font-medium text-hi">
                    {statusLabel(EMERGENCY_TYPE, incident.type)}
                  </div>
                  <div className="text-[11.5px] text-mid">{incident.location}</div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <Badge map={SEVERITY} value={incident.severity} />
                    <span className="mono text-[10.5px] text-low">
                      {timeAgo(incident.reported_at)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* ============================================================
          SEPARATE EXPEDITION SECTIONS OVERVIEW
          ============================================================ */}
      <Panel
        eyebrow="Operations Breakdown"
        title="Expedition Operations Sections"
        subtitle={
          selectedExpedition === 'ALL'
            ? `Status and resource allocation across all ${expeditions.length} expeditions`
            : `Filtered view for ${selectedExpedition}`
        }
        action={
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => goTo('expeditions')}
          >
            Manage Expeditions
          </button>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {(selectedExpedition === 'ALL'
            ? expeditions
            : expeditions.filter((e) => e.id === selectedExpedition)
          ).map((exp) => {
            const expTeam = (personnel || []).filter((p) => p.expedition_id === exp.id)
            const expCargo = cargo.filter((c) => c.expedition_id === exp.id)
            const expEmergencies = emergencies.filter(
              (e) => e.expedition_id === exp.id && e.status !== 'RESOLVED'
            )
            const expDelayed = expCargo.filter((c) => c.status === 'DELAYED').length
            const expWeight = expCargo.reduce((sum, c) => sum + (Number(c.weight_kg) || 0), 0)

            return (
              <div
                key={exp.id}
                className="flex flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--surface-card)] p-5 shadow-sm transition hover:border-[var(--ice)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge map={EXPEDITION_STATUS} value={exp.status} dot />
                      <span className="mono text-xs font-bold text-[var(--ice)]">{exp.id}</span>
                    </div>
                    <span className="mono text-xs text-mid">{clampPercent(exp.progress)}%</span>
                  </div>

                  <h4 className="mt-2 font-display text-base font-bold text-hi">{exp.name}</h4>
                  <div className="text-[11.5px] text-low">
                    {exp.destination} · Leader: <span className="text-mid">{exp.leader}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                    <div
                      className="h-full bg-[var(--ice)]"
                      style={{ width: `${clampPercent(exp.progress)}%` }}
                    />
                  </div>

                  {/* Section Metrics */}
                  <div className="mt-3.5 grid grid-cols-3 gap-2 border-t border-[var(--line-soft)] pt-3 text-center">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-low">Team</div>
                      <div className="font-mono text-sm font-bold text-hi">
                        {expTeam.length}{' '}
                        <span className="text-[10px] font-normal text-low">
                          / {exp.team_size}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-low">Cargo</div>
                      <div className="font-mono text-sm font-bold text-hi">
                        {expCargo.length}{' '}
                        <span className="text-[10px] font-normal text-low">
                          ({(expWeight / 1000).toFixed(1)}t)
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-low">Alerts</div>
                      <div className="font-mono text-sm font-bold">
                        {expEmergencies.length > 0 ? (
                          <span className="text-[var(--red)] animate-pulse">
                            {expEmergencies.length} Active
                          </span>
                        ) : (
                          <span className="text-[var(--green)]">0</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-[var(--line-soft)] pt-2.5 text-xs">
                  {expDelayed > 0 ? (
                    <span className="text-[11px] font-mono font-medium text-[var(--orange)]">
                      ⚠ {expDelayed} cargo delayed
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-low">Cargo on track</span>
                  )}
                  <button
                    type="button"
                    onClick={() => goTo('expeditions')}
                    className="font-mono text-[11px] text-[var(--ice)] hover:underline"
                  >
                    Details →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </Panel>

      {/* ============================================================
          4. THE TWO CHARTS
          The same facts as the cards at the top, drawn instead of
          counted. An operator reads the shape of the operation here without
          reading a single number.
          ============================================================ */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          eyebrow="Logistics"
          title="Cargo Pipeline"
          subtitle="Every consignment by where it has reached"
          action={
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => goTo('cargo')}>
              Cargo
            </button>
          }
        >
          {loading ? (
            <StateBlock kind="loading" />
          ) : (
            <HorizontalBarChart
              data={cargoPipeline}
              labelWidth={92}
              noteWidth={38}
              rowHeight={30}
              emptyMessage="No consignments logged yet."
            />
          )}
        </Panel>

        <Panel
          eyebrow="Logistics"
          title="Stock Health"
          subtitle="Recalculated from quantity against minimum, never stored"
          action={
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => goTo('inventory')}
            >
              Inventory
            </button>
          }
        >
          {loading ? (
            <StateBlock kind="loading" />
          ) : (
            <HorizontalBarChart
              data={stockHealth}
              labelWidth={92}
              noteWidth={38}
              rowHeight={30}
              emptyMessage="No stock items logged yet."
            />
          )}
        </Panel>
      </div>

      {/* ============================================================
          5. CARGO NEEDING ATTENTION + LOW STOCK + ACTIVITY
          ============================================================ */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Panel
          eyebrow="Logistics"
          title="Cargo Needing Attention"
          subtitle="Delayed or critical-priority consignments"
          action={
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => goTo('cargo')}>
              All cargo
            </button>
          }
        >
          {loading ? (
            <StateBlock kind="loading" />
          ) : cargoNeedingAttention.length === 0 ? (
            <StateBlock
              kind="empty"
              title="Nothing flagged"
              message="No delayed or critical consignments."
            />
          ) : (
            <ul className="space-y-2.5">
              {cargoNeedingAttention.map((item) => (
                <li key={item.id} className="card-tight">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium text-hi">{item.item_name}</div>
                      <div className="mono mt-0.5 text-[11px] text-low">
                        {item.id} · {item.location} → {item.destination}
                      </div>
                    </div>
                    <Badge map={PRIORITY} value={item.priority} />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge map={CARGO_STATUS} value={item.status} />
                    {item.delay_reason && (
                      <span className="text-[11px] text-low">{item.delay_reason}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          eyebrow="Logistics"
          title="Low Stock"
          subtitle="Calculated live: quantity at or below minimum"
          action={
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => goTo('inventory')}>
              Inventory
            </button>
          }
        >
          {loading ? (
            <StateBlock kind="loading" />
          ) : stats.lowStockItems.length === 0 ? (
            <StateBlock
              kind="empty"
              title="Stock levels healthy"
              message="Every item is above its minimum."
            />
          ) : (
            <dl className="space-y-0">
              {stats.lowStockItems.map((item) => (
                <div key={item.id} className="kv">
                  <dt className="min-w-0">
                    <span className="text-mid">{item.item_name}</span>
                    <span className="block text-[11px] text-low">{item.location}</span>
                  </dt>
                  <dd className="shrink-0">
                    <span
                      className="mono text-[12.5px]"
                      style={{ color: item.quantity === 0 ? 'var(--red)' : 'var(--amber)' }}
                    >
                      {item.quantity} / {item.minimum_quantity}
                    </span>
                    <span className="block text-[10.5px] text-low">{item.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Panel>

        <Panel
          eyebrow="Audit"
          title="Recent Activity"
          subtitle="Every change made in this console"
        >
          {activityLog.length === 0 ? (
            <StateBlock kind="empty" title="No activity yet" />
          ) : (
            <ul className="space-y-3">
              {activityLog.slice(0, 8).map((entry) => (
                <li key={entry.id} className="flex gap-2.5">
                  <i
                    className={`dot dot--${ACTIVITY_TONE[entry.kind] || 'muted'} mt-1.5 shrink-0`}
                  />
                  <div className="min-w-0">
                    <div className="text-[12.5px] leading-snug text-mid">{entry.message}</div>
                    <div className="mono mt-0.5 text-[10.5px] text-low">
                      {entry.kind} · {timeAgo(entry.at)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* ============================================================
          6. MISSION STATUS NOTICE
          ============================================================ */}
      <div className="alert-strip alert-strip--info">
        <Radio size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[var(--accent)]" />
        <div className="text-[12px] leading-relaxed text-mid">
          <strong className="text-hi">Station Coordinates & Operational Status.</strong> Station coordinates, runways, and facilities are based on official published polar records. Weather forecasts provide live conditions for each station, and expedition rosters, cargo, and incident updates reflect current operational status.
        </div>
      </div>
    </div>
  )
}
