/**
 * EXPEDITION MANAGEMENT
 * =====================
 * The first real module, and the template every other page follows:
 *
 *   1. read data with useData()
 *   2. show it with <DataTable> and <Badge>
 *   3. change it by calling an action from the store
 *
 * THE CONNECTED BIT (master prompt sections 12 and 19):
 *   Click any expedition and the right-hand panel loads its assigned team
 *   from the PERSONNEL data and its consignments from the CARGO data.
 *   Nothing is duplicated — the expedition record only stores an id, and
 *   the people and cargo are looked up live. Change someone's expedition
 *   and this panel changes with it.
 *
 *   Change an expedition's status in the dropdown and the dashboard's
 *   "Active Expeditions" count updates immediately, because that count is
 *   calculated from this same data.
 */

import { useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Compass,
  LayoutGrid,
  List,
  Package,
  Plus,
  Siren,
  Users,
  X,
} from 'lucide-react'

import Badge from '../components/Badge'
import DataTable from '../components/DataTable'
import Panel from '../components/Panel'
import StateBlock from '../components/StateBlock'
import NaturalExpeditionPlanner from '../components/NaturalExpeditionPlanner'
import { useData } from '../store/DataContext'
import { useAuth } from '../store/AuthContext'
import { clampPercent, formatDate, formatNumber } from '../lib/format'
import {
  CARGO_STATUS,
  EXPEDITION_STATUS,
  EMERGENCY_STATUS,
  EMERGENCY_TYPE,
  PERSONNEL_STATUS,
  PRIORITY,
  optionsFrom,
  statusLabel,
} from '../lib/statuses'



export default function Expeditions({ goTo }) {
  const {
    expeditions,
    loading,
    error,
    updateExpedition,
    addExpedition,
    personnelForExpedition,
    cargoForExpedition,
    locations,
    emergencies,
  } = useData()

  /* WHAT THIS ROLE MAY CHANGE. A read-only session still sees every record
     and every number on this page — it just cannot edit them. See
     src/lib/roles.js. */
  const { canManage } = useAuth()

  /* Which expedition's details are open on the right. Defaults to the
     first one so the panel is never empty when the page loads. */
  const [selectedId, setSelectedId] = useState(expeditions[0]?.id ?? null)
  const [viewMode, setViewMode] = useState('sections') // 'sections' | 'detail'
  const [filterExpedition, setFilterExpedition] = useState('ALL')

  /* Form state for adding a new expedition. */
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(null)

  const selected = expeditions.find((e) => e.id === selectedId) || null
  const team = selected ? personnelForExpedition(selected.id) : []
  const consignments = selected ? cargoForExpedition(selected.id) : []

  return (
    <div className="space-y-7">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DDEAF0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1597D4] bg-[#DDF3FA] px-2 py-0.5 rounded-full">
              EXPEDITION PLANNING &amp; MISSION CONTROL
            </span>
            <span className="text-[11px] text-[#8495A3] font-mono">INDIAN ANTARCTIC PROGRAM</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#12263A]">Expedition Planning &amp; Operations</h1>
          <p className="text-xs text-[#526779] mt-0.5">
            Active scientific expeditions, traverse schedules, milestone tracking, and assigned teams across Antarctica.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDEAF0] bg-white px-3.5 py-2 text-xs font-semibold text-[#12263A] hover:bg-[#F0F8FB] transition shadow-xs"
            onClick={() => goTo('map')}
          >
            <Compass size={14} className="text-[#1597D4]" />
            <span>Tactical Map</span>
          </button>
          {canManage && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white px-3.5 py-2 text-xs font-semibold shadow-xs transition"
              onClick={() => setShowForm((prev) => !prev)}
            >
              <Plus size={14} />
              <span>Plan Expedition</span>
            </button>
          )}
        </div>
      </div>

      {/* ---------- Summary strip ---------- */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-4">
        {[
          { label: 'Total Expeditions', value: expeditions.length, hint: 'All registered missions' },
          {
            label: 'Active Missions',
            value: expeditions.filter((e) => e.status === 'ACTIVE').length,
            tone: 'ok',
            hint: 'Field & station active',
          },
          {
            label: 'Planning Phase',
            value: expeditions.filter((e) => e.status === 'PLANNING').length,
            tone: 'info',
            hint: 'Route & logistics review',
          },
          {
            label: 'Completed Expeditions',
            value: expeditions.filter((e) => e.status === 'COMPLETED').length,
            hint: 'Successfully demobilized',
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#DDEAF0] bg-white p-4 sm:p-5 shadow-xs transition hover:border-[#BFDDE7]"
          >
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8495A3] mb-1">
              {item.label}
            </div>
            <div
              className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${
                item.tone === 'ok'
                  ? 'text-[#18A878]'
                  : item.tone === 'info'
                  ? 'text-[#1597D4]'
                  : 'text-[#12263A]'
              }`}
            >
              {item.value}
            </div>
            <div className="text-[11px] text-[#526779] mt-1 truncate">
              {item.hint}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Add form (hidden until asked for) ---------- */}
      {formSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <div>{formSuccess}</div>
        </div>
      )}

      {showForm && (
        <NaturalExpeditionPlanner
          onExpeditionCreated={(expData) => {
            try {
              const created = addExpedition(expData)
              setFormSuccess(`${created.id} (${created.name}) created and registered into mission active tracking.`)
              setSelectedId(created.id)
              setShowForm(false)
              setFormError(null)
            } catch (err) {
              setFormError(`Could not save expedition: ${err.message}`)
            }
          }}
          onCancel={() => {
            setShowForm(false)
            setFormError(null)
          }}
        />
      )}

      {/* ---------- EXPEDITION SELECTION TABS & VIEW SWITCHER ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#DDEAF0] bg-white p-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="mr-1 flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
            <Compass size={13} className="text-[#0284C7]" />
            <span>Expedition:</span>
          </div>
          <button
            type="button"
            onClick={() => setFilterExpedition('ALL')}
            className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
              filterExpedition === 'ALL'
                ? 'bg-[#0284C7] font-semibold text-white shadow-2xs'
                : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
            }`}
          >
            All Expeditions ({expeditions.length})
          </button>
          {expeditions.map((exp) => {
            const expTeam = personnelForExpedition(exp.id)
            const hasEmergency = emergencies.some(
              (e) => e.expedition_id === exp.id && e.status !== 'RESOLVED'
            )
            const isSelected = filterExpedition === exp.id
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => {
                  setFilterExpedition(isSelected ? 'ALL' : exp.id)
                  setSelectedId(exp.id)
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-[#0284C7] font-semibold text-white shadow-2xs'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
                }`}
              >
                {hasEmergency && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
                )}
                <span>{exp.id}</span>
                <span className="text-[10px] opacity-70">({expTeam.length})</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          {canManage && !showForm && (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg bg-[#0284C7] text-white px-2.5 py-1 text-xs font-semibold hover:bg-[#0369a1] transition shadow-2xs"
              onClick={() => setShowForm(true)}
            >
              <Plus size={13} /> New Expedition
            </button>
          )}
          <div className="flex items-center rounded-lg border border-[#DDEAF0] bg-[#F8FAFC] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('sections')}
              className={`flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] transition ${
                viewMode === 'sections'
                  ? 'bg-white font-semibold text-[#0F172A] shadow-2xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
              title="View separate sections for each expedition"
            >
              <LayoutGrid size={11} />
              <span>Expedition Sections</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('detail')}
              className={`flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] transition ${
                viewMode === 'detail'
                  ? 'bg-white font-semibold text-[#0F172A] shadow-2xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
              title="View register and detail inspection panel"
            >
              <List size={11} />
              <span>Register &amp; Detail</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'sections' ? (
        /* ================= SEPARATE EXPEDITION SECTIONS ================= */
        <div className="space-y-6">
          {(filterExpedition === 'ALL'
            ? expeditions
            : expeditions.filter((e) => e.id === filterExpedition)
          ).map((exp) => {
            const expTeam = personnelForExpedition(exp.id)
            const expCargo = cargoForExpedition(exp.id)
            const expEmergencies = emergencies.filter(
              (em) => em.expedition_id === exp.id && em.status !== 'RESOLVED'
            )
            const totalCargoWeight = expCargo.reduce(
              (sum, c) => sum + (Number(c.weight_kg) || 0),
              0
            )

            return (
              <div
                key={exp.id}
                className="overflow-hidden rounded-2xl border border-[#DDEAF0] bg-white shadow-xs"
              >
                {/* Expedition Section Header */}
                <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-[#DDEAF0] text-[#0284C7] shadow-2xs">
                        <Compass size={22} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="mono text-xs font-bold text-[#0284C7]">{exp.id}</span>
                          <span className="text-[#94A3B8]">·</span>
                          <Badge map={EXPEDITION_STATUS} value={exp.status} dot />
                          <span className="text-xs text-[#64748B]">· {exp.destination}</span>
                        </div>
                        <h3 className="mt-0.5 text-lg font-bold text-[#0F172A]">{exp.name}</h3>
                        <p className="mt-1 text-xs text-[#475569] max-w-3xl leading-relaxed">
                          {exp.objective}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right">
                      {canManage ? (
                        <select
                          className="select-inline text-xs font-mono"
                          value={exp.status}
                          onChange={(e) => updateExpedition(exp.id, { status: e.target.value })}
                          aria-label={`Status for ${exp.name}`}
                        >
                          {optionsFrom(EXPEDITION_STATUS).map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-[#475569] font-mono">Leader: {exp.leader}</span>
                      )}
                      <div className="text-[11.5px] font-mono text-[#64748B]">
                        {formatDate(exp.start_date)} → {formatDate(exp.end_date)}
                      </div>
                    </div>
                  </div>

                  {/* Progress & Quick Stats Bar */}
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#E2E8F0] pt-3.5 sm:grid-cols-4">
                    <div>
                      <div className="text-[10.5px] font-mono uppercase tracking-wider text-[#64748B]">
                        Mission Progress
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E2E8F0]">
                          <div
                            className="h-full bg-[#0284C7] transition-all"
                            style={{ width: `${clampPercent(exp.progress)}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs font-bold text-[#0F172A]">
                          {clampPercent(exp.progress)}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10.5px] font-mono uppercase tracking-wider text-[#64748B]">
                        Personnel Assigned
                      </div>
                      <div className="mt-0.5 font-mono text-sm font-bold text-[#0F172A]">
                        {expTeam.length} <span className="text-xs font-normal text-[#64748B]">/ {exp.team_size} planned</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10.5px] font-mono uppercase tracking-wider text-[#64748B]">
                        Cargo Consignments
                      </div>
                      <div className="mt-0.5 font-mono text-sm font-bold text-[#0F172A]">
                        {expCargo.length} items{' '}
                        <span className="text-xs font-normal text-[#64748B]">
                          ({formatNumber(totalCargoWeight)} kg)
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10.5px] font-mono uppercase tracking-wider text-[#64748B]">
                        Incident Status
                      </div>
                      <div className="mt-0.5">
                        {expEmergencies.length > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded bg-rose-50 border border-rose-200 px-2 py-0.5 font-mono text-xs font-bold text-rose-700 animate-pulse">
                            <Siren size={11} /> {expEmergencies.length} Open Alert
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-mono text-xs font-bold text-emerald-700">
                            <CheckCircle2 size={11} /> All Clear
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Notice if open incident */}
                {expEmergencies.length > 0 && (
                  <div className="m-4 flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs text-rose-900">
                    <div className="flex items-center gap-2">
                      <Siren size={16} className="animate-pulse text-rose-600 shrink-0" />
                      <div>
                        <strong className="text-rose-700 font-semibold">
                          Emergency in {exp.name}:
                        </strong>{' '}
                        {expEmergencies.map((em) => `${em.id} (${statusLabel(EMERGENCY_TYPE, em.type)}) - ${em.description}`).join('; ')}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg bg-rose-600 text-white px-3 py-1.5 font-semibold hover:bg-rose-700 transition shrink-0"
                      onClick={() => goTo('emergency')}
                    >
                      Respond
                    </button>
                  </div>
                )}

                {/* Sub-sections: Assigned Team & Assigned Cargo */}
                <div className="grid gap-4 p-5 lg:grid-cols-2">
                  {/* Sub-section 1: Assigned Team */}
                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                      <div className="flex items-center gap-2">
                        <Users size={15} className="text-[#0284C7]" />
                        <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
                          Assigned Team ({expTeam.length})
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-xs font-semibold text-[#0284C7] hover:underline"
                        onClick={() => goTo('personnel')}
                      >
                        Open Roster
                      </button>
                    </div>

                    {expTeam.length === 0 ? (
                      <div className="py-4 text-center text-xs text-[#64748B]">
                        No team members currently assigned to {exp.id}.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {expTeam.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs shadow-2xs"
                          >
                            <div>
                              <div className="font-semibold text-[#0F172A]">{member.name}</div>
                              <div className="text-[11px] text-[#64748B]">
                                <span className="mono">{member.id}</span> · {member.role}
                              </div>
                            </div>
                            <Badge map={PERSONNEL_STATUS} value={member.status} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Sub-section 2: Assigned Cargo */}
                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                      <div className="flex items-center gap-2">
                        <Package size={15} className="text-[#0284C7]" />
                        <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
                          Assigned Cargo ({expCargo.length})
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-xs font-semibold text-[#0284C7] hover:underline"
                        onClick={() => goTo('cargo')}
                      >
                        Open Cargo
                      </button>
                    </div>

                    {expCargo.length === 0 ? (
                      <div className="py-4 text-center text-xs text-[#64748B]">
                        No consignments assigned to {exp.id}.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {expCargo.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs shadow-2xs"
                          >
                            <div className="min-w-0 flex-1 pr-2">
                              <div className="truncate font-semibold text-[#0F172A]">{item.item_name}</div>
                              <div className="text-[11px] text-[#64748B]">
                                <span className="mono">{item.id}</span> · {item.quantity} {item.unit} · {item.weight_kg ? `${formatNumber(item.weight_kg)} kg` : ''} · {statusLabel(CARGO_STATUS, item.status)}
                              </div>
                            </div>
                            <Badge map={PRIORITY} value={item.priority} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* ================= REGISTER & DETAIL INSPECTION VIEW ================= */
        <div className="grid gap-4 xl:grid-cols-5">
          <Panel
            className="xl:col-span-3"
            eyebrow="Register"
            title="All Expeditions"
            subtitle="Click a row to load its team and cargo"
            action={
              canManage &&
              !showForm && (
                <button type="button" className="btn btn--sm" onClick={() => setShowForm(true)}>
                  <Plus size={13} /> New
                </button>
              )
            }
          >
            <DataTable
              loading={loading}
              error={error}
              rows={expeditions}
              rowKey={(row) => row.id}
              onRowClick={(row) => setSelectedId(row.id)}
              maxHeight="520px"
              emptyTitle="No expeditions registered"
              emptyMessage="Use the New button to add the first one."
              columns={[
                { header: 'ID', cell: (r) => r.id, mono: true, width: '78px' },
                {
                  header: 'Expedition',
                  strong: true,
                  cell: (r) => (
                    <div className="flex items-center gap-1.5">
                      <div>
                        <div className="font-semibold text-[#0F172A]">{r.name}</div>
                        <div className="text-[11px] font-normal text-[#64748B]">{r.destination}</div>
                      </div>
                      {r.id === selectedId && (
                        <ChevronRight size={14} className="shrink-0 text-[#0284C7]" />
                      )}
                    </div>
                  ),
                },
                {
                  header: 'Dates',
                  width: '116px',
                  mono: true,
                  cell: (r) => (
                    <span className="text-[11px] text-[#475569]">
                      {formatDate(r.start_date)}
                      <br />
                      {formatDate(r.end_date)}
                    </span>
                  ),
                },
                {
                  header: 'Progress',
                  width: '110px',
                  cell: (r) => (
                    <div>
                      <div className="mono mb-1 text-right text-[11px] font-semibold text-[#0F172A]">
                        {clampPercent(r.progress)}%
                      </div>
                      <div
                        className={`progress ${
                          r.status === 'COMPLETED'
                            ? 'progress--muted'
                            : r.progress < 30
                              ? 'progress--warn'
                              : ''
                        }`}
                      >
                        <span style={{ width: `${clampPercent(r.progress)}%` }} />
                      </div>
                    </div>
                  ),
                },
                {
                  header: 'Status',
                  width: '132px',
                  cell: (r) => (
                    <select
                      className="select-inline"
                      value={r.status}
                      disabled={!canManage}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateExpedition(r.id, { status: e.target.value })}
                      aria-label={`Status for ${r.name}`}
                    >
                      {optionsFrom(EXPEDITION_STATUS).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ),
                },
              ]}
            />
          </Panel>

          {/* ---------- DETAIL: team and cargo, looked up live ---------- */}
          <div className="space-y-4 xl:col-span-2">
            {!selected ? (
              <Panel eyebrow="Detail" title="Expedition Detail">
                <StateBlock
                  kind="empty"
                  title="Nothing selected"
                  message="Click an expedition in the register."
                />
              </Panel>
            ) : (
              <>
                <Panel
                  eyebrow={selected.id}
                  title={selected.name}
                  subtitle={selected.objective}
                  action={<Badge map={EXPEDITION_STATUS} value={selected.status} dot />}
                >
                  <dl className="space-y-0">
                    <div className="kv">
                      <dt>Destination</dt>
                      <dd>{selected.destination}</dd>
                    </div>
                    <div className="kv">
                      <dt>Leader</dt>
                      <dd>{selected.leader}</dd>
                    </div>
                    <div className="kv">
                      <dt>Window</dt>
                      <dd className="mono text-[12px]">
                        {formatDate(selected.start_date)} → {formatDate(selected.end_date)}
                      </dd>
                    </div>
                    <div className="kv">
                      <dt>Planned team size</dt>
                      <dd className="mono">{selected.team_size}</dd>
                    </div>
                    <div className="kv">
                      <dt>Assigned on roster</dt>
                      <dd className="mono">{team.length}</dd>
                    </div>
                    <div className="kv">
                      <dt>Consignments</dt>
                      <dd className="mono">{consignments.length}</dd>
                    </div>
                  </dl>
                </Panel>

                {/* Team roster */}
                <Panel
                  eyebrow="Connected data"
                  title="Assigned Team"
                  subtitle="Read live from Personnel Tracking"
                  action={
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#0284C7] hover:underline"
                      onClick={() => goTo('personnel')}
                    >
                      <Users size={13} className="inline mr-1" /> Open
                    </button>
                  }
                >
                  {team.length === 0 ? (
                    <StateBlock
                      kind="empty"
                      title="Nobody assigned yet"
                      message="Add team members from the Personnel module."
                    />
                  ) : (
                    <ul className="space-y-2.5">
                      {team.map((person) => (
                        <li key={person.id} className="flex items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-white p-2.5 shadow-2xs">
                          <div className="min-w-0">
                            <div className="truncate text-[13px] font-semibold text-[#0F172A]">{person.name}</div>
                            <div className="truncate text-[11px] text-[#64748B]">
                              <span className="mono">{person.id}</span> · {person.role}
                            </div>
                          </div>
                          <Badge map={PERSONNEL_STATUS} value={person.status} />
                        </li>
                      ))}
                    </ul>
                  )}
                </Panel>

                {/* Cargo */}
                <Panel
                  eyebrow="Connected data"
                  title="Assigned Cargo"
                  subtitle="Read live from Cargo Tracking"
                  action={
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#0284C7] hover:underline"
                      onClick={() => goTo('cargo')}
                    >
                      <Package size={13} className="inline mr-1" /> Open
                    </button>
                  }
                >
                  {consignments.length === 0 ? (
                    <StateBlock
                      kind="empty"
                      title="No cargo assigned yet"
                      message="Log consignments from the Cargo module."
                    />
                  ) : (
                    <ul className="space-y-2.5">
                      {consignments.map((item) => (
                        <li key={item.id} className="flex items-start justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-white p-2.5 shadow-2xs">
                          <div className="min-w-0">
                            <div className="truncate text-[13px] font-semibold text-[#0F172A]">{item.item_name}</div>
                            <div className="truncate text-[11px] text-[#64748B]">
                              <span className="mono">{item.id}</span> · {item.quantity} {item.unit} ·{' '}
                              {statusLabel(CARGO_STATUS, item.status)}
                            </div>
                          </div>
                          <Badge map={PRIORITY} value={item.priority} />
                        </li>
                      ))}
                    </ul>
                  )}
                </Panel>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
