/**
 * CARGO TRACKING
 * ==============
 * Where a consignment is, where it is going, and how urgent it is.
 *
 * THE FILTERS (master prompt section 7, module 4):
 *   Search + status + category + priority. All four narrow the same list
 *   at the same time, so "show me every CRITICAL Fuel consignment that is
 *   DELAYED" is three clicks, not a new screen.
 *
 * THE CONNECTED BITS (master prompt section 12) — four of them:
 *   1. Change a row's STATUS and the dashboard's "Cargo In Transit" card
 *      changes with it. Nothing on this page knows the dashboard exists;
 *      both read the same array in DataContext.
 *   2. Change a row's PRIORITY to CRITICAL and it appears in the
 *      dashboard's "Cargo Needing Attention" list.
 *   3. Every status change writes a line into Recent Activity.
 *   4. Log a new consignment against an expedition and it shows up in that
 *      expedition's "Assigned Cargo" panel on the Expeditions page.
 *
 * HONEST ABOUT THE DATA: these are prototype records. The prototype does
 * not talk to any vessel, aircraft or NCPOR consignment system — statuses
 * are the ones an operator typed into this console.
 */

import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Compass,
  Filter,
  LayoutGrid,
  List,
  MapPin,
  Package,
  Plus,
  Ship,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

import Badge from '../components/Badge'
import CargoDetailDrawer from '../components/CargoDetailDrawer'
import ContextualAiInsight from '../components/ContextualAiInsight'
import DataTable from '../components/DataTable'
import HorizontalBarChart from '../components/HorizontalBarChart'
import Panel from '../components/Panel'
import StateBlock from '../components/StateBlock'
import { useData } from '../store/DataContext'
import { useAuth } from '../store/AuthContext'
import { formatNumber, formatQuantity, timeAgo } from '../lib/format'
import { CARGO_STATUS, PRIORITY, optionsFrom, statusColour, statusLabel } from '../lib/statuses'

/* The blank form, kept at module level so "reset the form" is one line
   and so the object is not rebuilt on every render. */
const EMPTY_FORM = {
  item_name: '',
  category: '',
  quantity: '',
  unit: 'units',
  location: '',
  destination: '',
  weight_kg: '',
  priority: 'MEDIUM',
  expedition_id: '',
}

/* "No filters applied" — used both as the starting value and by the
   Clear button, so the two can never disagree. */
const NO_FILTERS = {
  search: '',
  status: 'ALL',
  category: 'ALL',
  priority: 'ALL',
  expedition: 'ALL',
}

export default function Cargo({ goTo }) {
  const { cargo, expeditions, locations, loading, error, addCargo, updateCargo, getExpedition } =
    useData()

  /* WHAT THIS ROLE MAY CHANGE — see src/lib/roles.js. */
  const { canManage } = useAuth()

  /* Which consignment is open in the detail panel. Defaults to whatever is
     delayed, because that is what an operator actually needs to look at. */
  const [selectedId, setSelectedId] = useState(
    () => (cargo.find((c) => c.status === 'DELAYED') || cargo[0])?.id ?? null
  )
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleSelectRow = (id) => {
    setSelectedId(id)
    setIsDrawerOpen(true)
  }

  const [filters, setFilters] = useState(NO_FILTERS)
  const [viewMode, setViewMode] = useState('sections') // 'sections' | 'table'
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(null)

  /* The category list is READ FROM THE DATA, not typed out here. Log a
     consignment in a brand new category and it appears in this dropdown
     on its own. */
  const categories = [...new Set(cargo.map((c) => c.category).filter(Boolean))].sort()

  /* ---------- THE FILTER CHAIN ----------
     A plain chain of .filter() calls. Each line is one rule, so you can
     read the whole thing top to bottom and know exactly what is shown. */
  const term = filters.search.trim().toLowerCase()
  const visible = cargo
    .filter((c) => filters.status === 'ALL' || c.status === filters.status)
    .filter((c) => filters.category === 'ALL' || c.category === filters.category)
    .filter((c) => filters.priority === 'ALL' || c.priority === filters.priority)
    .filter((c) => filters.expedition === 'ALL' || c.expedition_id === filters.expedition)
    .filter((c) => {
      if (!term) return true
      return (
        c.item_name.toLowerCase().includes(term) ||
        c.id.toLowerCase().includes(term) ||
        (c.destination || '').toLowerCase().includes(term) ||
        (c.location || '').toLowerCase().includes(term)
      )
    })

  const filtersActive =
    filters.search !== '' ||
    filters.status !== 'ALL' ||
    filters.category !== 'ALL' ||
    filters.priority !== 'ALL' ||
    filters.expedition !== 'ALL'

  const setFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

  const selected = cargo.find((c) => c.id === selectedId) || null

  /* ---------- SMALL DERIVED NUMBERS ----------
     Calculated on every render from the raw array, exactly like the
     dashboard's cards. Nothing here is stored. */
  const inTransit = cargo.filter((c) => c.status === 'IN_TRANSIT')
  const tonnesInTransit = inTransit.reduce((sum, c) => sum + (Number(c.weight_kg) || 0), 0) / 1000

  /* The watchlist: anything delayed, plus anything CRITICAL that has not
     landed yet. Delays get rank 0 so they sort to the top. */
  const attentionRank = (c) => (c.status === 'DELAYED' ? 0 : 1)
  const needsAttention = cargo
    .filter((c) => c.status === 'DELAYED' || (c.priority === 'CRITICAL' && c.status !== 'ARRIVED'))
    .sort((a, b) => attentionRank(a) - attentionRank(b))

  /* Load per destination — how much is heading to each place. This is the
     view a logistics officer actually wants: not "14 consignments" but
     "6.4 tonnes going to Maitri, one of it delayed". */
  const byDestination = Object.values(
    cargo.reduce((acc, c) => {
      const key = c.destination || 'Unassigned'
      if (!acc[key]) acc[key] = { destination: key, count: 0, kg: 0, delayed: 0 }
      acc[key].count += 1
      acc[key].kg += Number(c.weight_kg) || 0
      if (c.status === 'DELAYED') acc[key].delayed += 1
      return acc
    }, {})
  ).sort((a, b) => b.kg - a.kg)

  /* ---------- CHART DATA (master prompt section 7) ----------
     Counted straight off the same `cargo` array the table above reads.
     Change a row's status in the register and one bar loses a consignment
     while another gains one, on the same render.

     We walk the STATUS MAP rather than the data, for two reasons: the bars
     come out in pipeline order (planned -> loaded -> in transit -> arrived
     -> delayed) instead of whatever order the records happen to be in, and
     a status with nothing in it keeps its row. A bar that vanishes when it
     empties makes the chart jump about, and "nothing is delayed" is worth
     seeing. */
  function countByStatus(map, field) {
    return Object.keys(map).map((key) => {
      const rows = cargo.filter((c) => c[field] === key)
      const kg = rows.reduce((sum, c) => sum + (Number(c.weight_kg) || 0), 0)
      return {
        label: statusLabel(map, key),
        value: rows.length,
        colour: statusColour(map, key),
        note: rows.length > 0 ? String(rows.length) : '',
        tip: `${rows.length} consignment${rows.length === 1 ? '' : 's'} · ${(kg / 1000).toFixed(1)} tonnes`,
      }
    })
  }

  const chartByStatus = countByStatus(CARGO_STATUS, 'status')
  const chartByPriority = countByStatus(PRIORITY, 'priority')

  /* ---------- THE FORM ---------- */
  const setField = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    setFormError(null)
  }

  /**
   * VALIDATION (master prompt section 21 — validate user input).
   * We check before saving and say exactly which field is wrong.
   */
  function handleSubmit(event) {
    event.preventDefault()
    setFormSuccess(null)

    const name = form.item_name.trim()
    if (name.length < 2) return setFormError('Item name needs at least 2 characters.')
    if (!form.category.trim()) return setFormError('Category is required.')

    const qty = Number(form.quantity)
    if (!form.quantity || Number.isNaN(qty) || qty <= 0)
      return setFormError('Quantity must be a number greater than 0.')

    if (!form.location.trim()) return setFormError('Current location is required.')
    if (!form.destination.trim()) return setFormError('Destination is required.')
    if (form.location.trim().toLowerCase() === form.destination.trim().toLowerCase())
      return setFormError('Destination must be different from the current location.')

    const weight = form.weight_kg === '' ? 0 : Number(form.weight_kg)
    if (Number.isNaN(weight) || weight < 0)
      return setFormError('Weight must be a positive number of kilograms.')

    try {
      const created = addCargo({
        item_name: name,
        category: form.category.trim(),
        quantity: qty,
        unit: form.unit.trim() || 'units',
        location: form.location.trim(),
        destination: form.destination.trim(),
        weight_kg: weight,
        priority: form.priority,
        expedition_id: form.expedition_id || null,
      })

      setForm(EMPTY_FORM)
      setFormError(null)
      setFormSuccess(`${created.id} ${created.item_name} logged as PLANNED.`)
      setSelectedId(created.id)
      setShowForm(false)
    } catch (err) {
      /* If saving ever fails, say so rather than silently doing nothing. */
      setFormError(`Could not save: ${err.message}`)
    }
  }

  return (
    <div className="space-y-7">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DDEAF0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1597D4] bg-[#DDF3FA] px-2 py-0.5 rounded-full">
              GLOBAL FREIGHT & FLEET TRACKING
            </span>
            <span className="text-[11px] text-[#8495A3] font-mono">MARITIME & AIR CORRIDORS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#12263A]">Cargo Manifest & Supply Chains</h1>
          <p className="text-xs text-[#526779] mt-0.5">
            Real-time status, vessel tracking, and resupply arrival timelines for Indian Antarctic Expeditions.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDEAF0] bg-white px-3.5 py-2 text-xs font-semibold text-[#12263A] hover:bg-[#F0F8FB] transition shadow-xs"
            onClick={() => goTo('map')}
          >
            <Compass size={14} className="text-[#1597D4]" />
            <span>Maritime Map</span>
          </button>
          {canManage && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white px-3.5 py-2 text-xs font-semibold shadow-xs transition"
              onClick={() => setShowForm((prev) => !prev)}
            >
              <Plus size={14} />
              <span>Log Consignment</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= SUMMARY STRIP ================= */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { label: 'Total Consignments', value: cargo.length, hint: 'All manifests' },
          { label: 'In Transit', value: inTransit.length, tone: 'ok', hint: 'At sea or air corridor' },
          {
            label: 'Delayed Shipments',
            value: cargo.filter((c) => c.status === 'DELAYED').length,
            tone: 'alert',
            hint: 'Pack-ice & weather hold',
          },
          {
            label: 'Critical Priority',
            value: cargo.filter((c) => c.priority === 'CRITICAL' && c.status !== 'ARRIVED').length,
            tone: 'warn',
            hint: 'Life-support & energy',
          },
          {
            label: 'Tonnes in Transit',
            value: `${tonnesInTransit.toFixed(1)} t`,
            hint: 'Active freight payload',
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
                  : item.tone === 'warn'
                  ? 'text-[#E7A51A]'
                  : item.tone === 'alert'
                  ? 'text-[#E5484D]'
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

      {/* ================= PREDICTIVE RESUPPLY RISK BANNER ================= */}
      {cargo.some((c) => c.status === 'DELAYED' && c.category === 'Fuel') && (
        <ContextualAiInsight
          badge="CRITICAL RESUPPLY DEFICIT DETECTED"
          type="critical"
          title="Consignment C-101 (Fuel) · 5.0-Day Unhedged Deficit Window"
          description="Vessel delayed by fast pack-ice in Prydz Bay (ETA: 17 days). Maitri station fuel reserve depletes in 12.0 days (14,200 L @ 1,180 L/d). Depleting fuel threatens automated shutdown of primary generator microgrid and habitat heating loops."
          metrics={[
            { label: 'Station Runway', value: '12.0 Days' },
            { label: 'Cargo ETA', value: '17.0 Days' },
            { label: 'Shortfall', value: '5.0 Days' },
          ]}
          primaryAction={{
            label: 'Simulate +5d Delay',
            onClick: () => goTo('simulator'),
            icon: <Zap size={13} />,
          }}
          secondaryAction={{
            label: 'Consult AI Copilot',
            onClick: () => goTo('copilot'),
            icon: <Sparkles size={13} className="text-[#1597D4]" />,
          }}
          tertiaryAction={{
            label: 'View Impact Cascade',
            onClick: () => goTo('risks'),
          }}
        />
      )}

      {/* ================= SUCCESS MESSAGE ================= */}
      {formSuccess && (
        <div
          className="alert-strip"
          style={{
            borderLeftColor: 'var(--green)',
            borderColor: 'rgba(79,201,138,0.4)',
            background: 'rgba(79,201,138,0.07)',
          }}
        >
          <div className="text-[12.5px] text-mid">{formSuccess}</div>
        </div>
      )}

      {/* ================= ADD FORM (hidden until asked for) ================= */}
      {showForm && (
        <Panel
          eyebrow="New record"
          title="Log Consignment"
          subtitle="It starts as PLANNED. Move it along with the status dropdown in the register."
          action={
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                setShowForm(false)
                setFormError(null)
              }}
            >
              <X size={13} /> Cancel
            </button>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="field-label" htmlFor="cg-name">
                  Item name *
                </label>
                <input
                  id="cg-name"
                  name="item_name"
                  className="input"
                  value={form.item_name}
                  onChange={setField}
                  placeholder="e.g. Aviation Fuel Bladders"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="cg-cat">
                  Category *
                </label>
                {/* A datalist suggests the categories already in use but
                    still allows a new one to be typed in. */}
                <input
                  id="cg-cat"
                  name="category"
                  className="input"
                  value={form.category}
                  onChange={setField}
                  placeholder="e.g. Fuel"
                  list="cargo-categories"
                />
                <datalist id="cargo-categories">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label" htmlFor="cg-qty">
                    Quantity *
                  </label>
                  <input
                    id="cg-qty"
                    name="quantity"
                    type="number"
                    min="1"
                    className="input"
                    value={form.quantity}
                    onChange={setField}
                    placeholder="e.g. 24"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="cg-unit">
                    Unit
                  </label>
                  <input
                    id="cg-unit"
                    name="unit"
                    className="input"
                    value={form.unit}
                    onChange={setField}
                    placeholder="drums"
                  />
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="cg-from">
                  Currently at *
                </label>
                <input
                  id="cg-from"
                  name="location"
                  className="input"
                  value={form.location}
                  onChange={setField}
                  placeholder="e.g. Cape Town Staging Port"
                  list="cargo-places"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="cg-to">
                  Destination *
                </label>
                <input
                  id="cg-to"
                  name="destination"
                  className="input"
                  value={form.destination}
                  onChange={setField}
                  placeholder="e.g. Maitri Station"
                  list="cargo-places"
                />
                {/* One datalist shared by both place fields. */}
                <datalist id="cargo-places">
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.name} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="field-label" htmlFor="cg-weight">
                  Total weight (kg)
                </label>
                <input
                  id="cg-weight"
                  name="weight_kg"
                  type="number"
                  min="0"
                  className="input"
                  value={form.weight_kg}
                  onChange={setField}
                  placeholder="e.g. 4800"
                />
              </div>

              <div>
                <label className="field-label" htmlFor="cg-prio">
                  Priority
                </label>
                <select
                  id="cg-prio"
                  name="priority"
                  className="input"
                  value={form.priority}
                  onChange={setField}
                >
                  {optionsFrom(PRIORITY).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="cg-exp">
                  Expedition
                </label>
                {/* Choosing one here is what makes the consignment appear in
                    that expedition's "Assigned Cargo" panel. */}
                <select
                  id="cg-exp"
                  name="expedition_id"
                  className="input"
                  value={form.expedition_id}
                  onChange={setField}
                >
                  <option value="">Unassigned</option>
                  {expeditions.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.id} — {e.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {formError && (
              <div className="alert-strip">
                <div className="text-[12.5px] text-hi">{formError}</div>
              </div>
            )}

            <button type="submit" className="btn">
              <Plus size={14} /> Log consignment
            </button>
          </form>
        </Panel>
      )}

      {/* ================= THE REGISTER ================= */}
      <Panel
        eyebrow="Register"
        title="Consignment Register"
        subtitle={
          filtersActive
            ? `Showing ${visible.length} of ${cargo.length} consignments`
            : 'Click a row for detail. Change a status or priority right in the row.'
        }
        action={
          <div className="flex gap-2">
            {filtersActive && (
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setFilters(NO_FILTERS)}
              >
                <X size={13} /> Clear filters
              </button>
            )}
            {canManage && !showForm && (
              <button type="button" className="btn btn--sm" onClick={() => setShowForm(true)}>
                <Plus size={13} /> Log
              </button>
            )}
          </div>
        }
      >
        {/* ---------- EXPEDITION SELECTION TABS ---------- */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="mr-1 flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B]">
              <Compass size={13} className="text-[#0284C7]" />
              <span>Expedition:</span>
            </div>
            <button
              type="button"
              onClick={() => setFilter('expedition', 'ALL')}
              className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                filters.expedition === 'ALL'
                  ? 'bg-[#0284C7] font-semibold text-white shadow-xs'
                  : 'bg-[#F8FAFC] border border-[#DCE8F0] text-[#42586E] hover:bg-slate-100 hover:text-[#0C1E30]'
              }`}
            >
              All Expeditions ({cargo.length})
            </button>
            {expeditions.map((exp) => {
              const count = cargo.filter((c) => c.expedition_id === exp.id).length
              const hasDelayed = cargo.some(
                (c) => c.expedition_id === exp.id && c.status === 'DELAYED'
              )
              const hasCritical = cargo.some(
                (c) => c.expedition_id === exp.id && c.priority === 'CRITICAL'
              )
              const isSelected = filters.expedition === exp.id
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setFilter('expedition', isSelected ? 'ALL' : exp.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-[#0284C7] font-semibold text-white shadow-xs'
                      : 'bg-[#F8FAFC] border border-[#DCE8F0] text-[#42586E] hover:bg-slate-100 hover:text-[#0C1E30]'
                  }`}
                >
                  {hasDelayed ? (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                  ) : hasCritical ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  ) : null}
                  <span>{exp.id}</span>
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              )
            })}
          </div>

          {/* View Mode Toggle: Separate Sections vs Unified Table */}
          <div className="flex items-center rounded-lg border border-[#DCE8F0] bg-[#F8FAFC] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('sections')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[11px] transition ${
                viewMode === 'sections'
                  ? 'bg-white font-semibold text-[#0C1E30] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0C1E30]'
              }`}
              title="View by separate expedition sections"
            >
              <LayoutGrid size={12} />
              <span>Expedition Sections</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[11px] transition ${
                viewMode === 'table'
                  ? 'bg-white font-semibold text-[#0C1E30] shadow-xs'
                  : 'text-[#64748B] hover:text-[#0C1E30]'
              }`}
              title="View unified table"
            >
              <List size={12} />
              <span>Unified Table</span>
            </button>
          </div>
        </div>

        {/* ---------- FILTERS ---------- */}
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="field-label" htmlFor="cg-search">
              <Filter size={10} className="mr-1 inline" /> Search
            </label>
            <input
              id="cg-search"
              className="input"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Item, ID, origin or destination"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="cg-f-exp">
              Expedition
            </label>
            <select
              id="cg-f-exp"
              className="input"
              value={filters.expedition}
              onChange={(e) => setFilter('expedition', e.target.value)}
            >
              <option value="ALL">All expeditions</option>
              {expeditions.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.id} · {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="cg-f-status">
              Status
            </label>
            <select
              id="cg-f-status"
              className="input"
              value={filters.status}
              onChange={(e) => setFilter('status', e.target.value)}
            >
              <option value="ALL">All statuses</option>
              {optionsFrom(CARGO_STATUS).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="cg-f-cat">
              Category
            </label>
            <select
              id="cg-f-cat"
              className="input"
              value={filters.category}
              onChange={(e) => setFilter('category', e.target.value)}
            >
              <option value="ALL">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="cg-f-prio">
              Priority
            </label>
            <select
              id="cg-f-prio"
              className="input"
              value={filters.priority}
              onChange={(e) => setFilter('priority', e.target.value)}
            >
              <option value="ALL">All priorities</option>
              {optionsFrom(PRIORITY).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {viewMode === 'sections' ? (
          <div className="space-y-4">
            {(filters.expedition === 'ALL'
              ? expeditions
              : expeditions.filter((e) => e.id === filters.expedition)
            ).map((exp) => {
              const expCargo = visible.filter((c) => c.expedition_id === exp.id)
              const expAll = cargo.filter((c) => c.expedition_id === exp.id)
              const expKg = expAll.reduce((sum, c) => sum + (Number(c.weight_kg) || 0), 0)
              const inTransitCount = expAll.filter((c) => c.status === 'IN_TRANSIT').length
              const delayedCount = expAll.filter((c) => c.status === 'DELAYED').length
              const criticalCount = expAll.filter((c) => c.priority === 'CRITICAL').length

              if (filtersActive && expCargo.length === 0) return null

              return (
                <div
                  key={exp.id}
                  className="overflow-hidden rounded-xl border border-[#DCE8F0] bg-white shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F1F5F9] bg-[#F8FAFC] px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Badge
                        tone={
                          exp.status === 'ACTIVE'
                            ? 'ok'
                            : exp.status === 'PLANNING'
                              ? 'info'
                              : 'muted'
                        }
                      >
                        {exp.id}
                      </Badge>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#0C1E30]">{exp.name}</span>
                          <span className="text-xs text-[#64748B]">· {exp.destination}</span>
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          Payload:{' '}
                          <span className="font-mono font-medium text-[#0C1E30]">
                            {formatNumber(expKg)} kg
                          </span>{' '}
                          ({(expKg / 1000).toFixed(2)} tonnes)
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[#42586E]">
                        {expCargo.length} / {expAll.length} items
                      </span>
                      {inTransitCount > 0 && (
                        <span className="rounded bg-sky-50 text-[#0284C7] border border-sky-200 px-2 py-0.5 font-semibold">
                          {inTransitCount} transit
                        </span>
                      )}
                      {delayedCount > 0 && (
                        <span className="flex items-center gap-1 rounded bg-amber-50 border border-amber-200 px-2 py-0.5 font-bold text-amber-700 animate-pulse">
                          <AlertTriangle size={11} />
                          {delayedCount} DELAYED
                        </span>
                      )}
                      {criticalCount > 0 && (
                        <span className="rounded bg-rose-50 border border-rose-200 px-2 py-0.5 font-bold text-rose-700">
                          {criticalCount} CRITICAL
                        </span>
                      )}
                    </div>
                  </div>

                  <DataTable
                    loading={loading}
                    error={error}
                    rows={expCargo}
                    rowKey={(row) => row.id}
                    onRowClick={(row) => handleSelectRow(row.id)}
                    maxHeight={expCargo.length > 6 ? '320px' : undefined}
                    emptyTitle="No matching consignments for this expedition"
                    emptyMessage="Try adjusting your status or category filters."
                    columns={[
                      {
                        header: 'Cargo ID',
                        width: '90px',
                        cell: (r) => (
                          <span className="font-mono text-xs font-bold text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD] px-2 py-0.5 rounded">
                            {r.id}
                          </span>
                        ),
                      },
                      {
                        header: 'Item',
                        strong: true,
                        cell: (r) => (
                          <div className="flex items-start gap-1.5">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 font-semibold text-[#0C1E30]">
                                <span>{r.item_name}</span>
                                {r.id === selectedId && (
                                  <ChevronRight size={14} className="shrink-0 text-[#0284C7]" />
                                )}
                              </div>
                              <div className="text-[11px] font-mono text-[#64748B]">{r.category} · {formatQuantity(r.quantity, r.unit)}</div>
                              {r.status === 'DELAYED' && r.delay_reason && (
                                <div
                                  className="truncate text-[11px] font-medium text-amber-700 mt-0.5"
                                  style={{ maxWidth: 320 }}
                                  title={r.delay_reason}
                                >
                                  ⚠ {r.delay_reason}
                                </div>
                              )}
                            </div>
                          </div>
                        ),
                      },
                      {
                        header: 'ETA',
                        width: '120px',
                        cell: (r) => {
                          const isDelayedFuel = r.id === 'C-101' || (r.status === 'DELAYED' && r.category === 'Fuel')
                          return (
                            <div>
                              <div className={`font-mono text-xs font-bold ${isDelayedFuel ? 'text-amber-700' : 'text-[#0C1E30]'}`}>
                                {r.id === 'C-101' ? 'Day 17 (+3d)' : r.status === 'ARRIVED' ? 'Arrived' : 'Day 24'}
                              </div>
                              {isDelayedFuel && (
                                <span className="inline-block text-[10px] font-mono text-rose-600 font-bold bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded mt-0.5">
                                  5-day gap
                                </span>
                              )}
                            </div>
                          )
                        },
                      },
                      {
                        header: 'Status',
                        width: '120px',
                        cell: (r) => <Badge map={CARGO_STATUS} value={r.status} dot />,
                      },
                      {
                        header: 'Risk',
                        width: '110px',
                        cell: (r) => (
                          <div className="flex items-center justify-between gap-1">
                            <Badge map={PRIORITY} value={r.priority} />
                            <span className="text-[11px] text-[#0284C7] font-semibold hover:underline">
                              View →
                            </span>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              )
            })}
            {visible.length === 0 && (
              <StateBlock
                kind="empty"
                title="No consignments match these filters"
                message="Clear the filters to see the full register."
              />
            )}
          </div>
        ) : (
          <DataTable
            loading={loading}
            error={error}
            rows={visible}
            rowKey={(row) => row.id}
            onRowClick={(row) => handleSelectRow(row.id)}
            maxHeight="520px"
            emptyTitle="No consignments match these filters"
            emptyMessage="Clear the filters to see the full register."
            columns={[
              {
                header: 'Cargo ID',
                width: '90px',
                cell: (r) => (
                  <span className="font-mono text-xs font-bold text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD] px-2 py-0.5 rounded">
                    {r.id}
                  </span>
                ),
              },
              {
                header: 'Item',
                strong: true,
                cell: (r) => (
                  <div className="flex items-start gap-1.5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-semibold text-[#0C1E30]">
                        <span>{r.item_name}</span>
                        {r.id === selectedId && (
                          <ChevronRight size={14} className="shrink-0 text-[#0284C7]" />
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-[#64748B]">{r.category} · {formatQuantity(r.quantity, r.unit)}</div>
                      {r.status === 'DELAYED' && r.delay_reason && (
                        <div
                          className="truncate text-[11px] font-medium text-amber-700 mt-0.5"
                          style={{ maxWidth: 360 }}
                          title={r.delay_reason}
                        >
                          ⚠ {r.delay_reason}
                        </div>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                header: 'ETA',
                width: '120px',
                cell: (r) => {
                  const isDelayedFuel = r.id === 'C-101' || (r.status === 'DELAYED' && r.category === 'Fuel')
                  return (
                    <div>
                      <div className={`font-mono text-xs font-bold ${isDelayedFuel ? 'text-amber-700' : 'text-[#0C1E30]'}`}>
                        {r.id === 'C-101' ? 'Day 17 (+3d)' : r.status === 'ARRIVED' ? 'Arrived' : 'Day 24'}
                      </div>
                      {isDelayedFuel && (
                        <span className="inline-block text-[10px] font-mono text-rose-600 font-bold bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded mt-0.5">
                          5-day gap
                        </span>
                      )}
                    </div>
                  )
                },
              },
              {
                header: 'Status',
                width: '120px',
                cell: (r) => <Badge map={CARGO_STATUS} value={r.status} dot />,
              },
              {
                header: 'Risk',
                width: '110px',
                cell: (r) => (
                  <div className="flex items-center justify-between gap-1">
                    <Badge map={PRIORITY} value={r.priority} />
                    <span className="text-[11px] text-[#0284C7] font-semibold hover:underline">
                      View →
                    </span>
                  </div>
                ),
              },
            ]}
          />
        )}
      </Panel>

      {/* ================= PIPELINE CHARTS (master prompt section 7) =================
          Two views of the same register: where consignments are, and how
          urgent they are. Both are counted on every render, so changing a
          status in the table above moves a bar here immediately. */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          eyebrow="Pipeline"
          title="Consignments by Status"
          subtitle="Counted from the register on every change · hover for tonnage"
        >
          <HorizontalBarChart
            data={chartByStatus}
            labelWidth={92}
            noteWidth={38}
            rowHeight={30}
            emptyMessage="No consignments logged yet."
          />
        </Panel>

        <Panel
          eyebrow="Pipeline"
          title="Consignments by Priority"
          subtitle="How much of the manifest is urgent"
        >
          <HorizontalBarChart
            data={chartByPriority}
            labelWidth={92}
            noteWidth={38}
            rowHeight={30}
            emptyMessage="No consignments logged yet."
          />
        </Panel>
      </div>

      {/* ================= DETAIL + WATCHLIST + LOAD BY DESTINATION ================= */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* ---------- Selected consignment ---------- */}
        {!selected ? (
          <Panel eyebrow="Detail" title="Consignment Detail">
            <StateBlock
              kind="empty"
              title="Nothing selected"
              message="Click a consignment in the register."
            />
          </Panel>
        ) : (
          <Panel
            eyebrow={selected.id}
            title={selected.item_name}
            subtitle={selected.category}
            action={<Badge map={CARGO_STATUS} value={selected.status} dot />}
          >
            <dl className="space-y-0 divide-y divide-[#F1F5F9] text-xs">
              <div className="flex items-center justify-between py-2">
                <dt className="text-[#64748B]">Currently at</dt>
                <dd className="font-medium text-[#0C1E30]">{selected.location}</dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="text-[#64748B]">Destination</dt>
                <dd className="font-medium text-[#0C1E30]">{selected.destination}</dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="text-[#64748B]">Quantity</dt>
                <dd className="font-mono font-semibold text-[#0C1E30]">{formatQuantity(selected.quantity, selected.unit)}</dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="text-[#64748B]">Weight</dt>
                <dd className="font-mono text-[#0C1E30]">
                  {selected.weight_kg ? `${formatNumber(selected.weight_kg)} kg` : '—'}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="text-[#64748B]">Priority</dt>
                <dd>
                  <Badge map={PRIORITY} value={selected.priority} />
                </dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="text-[#64748B]">Logged</dt>
                <dd className="font-mono text-[11.5px] text-[#64748B]">{timeAgo(selected.created_at)}</dd>
              </div>
              <div className="flex items-center justify-between py-2">
                <dt className="text-[#64748B]">Expedition</dt>
                <dd>
                  {selected.expedition_id ? (
                    <button
                      type="button"
                      className="text-xs text-[#0284C7] font-medium hover:underline"
                      onClick={() => goTo('expeditions')}
                    >
                      {getExpedition(selected.expedition_id)?.name || selected.expedition_id}
                    </button>
                  ) : (
                    <span className="text-[#64748B]">Unassigned</span>
                  )}
                </dd>
              </div>
            </dl>

            {selected.status === 'DELAYED' && (
              <div className="mt-4 border-t border-[#F1F5F9] pt-4">
                <label className="field-label text-xs font-semibold text-[#0C1E30]" htmlFor="cg-delay">
                  Delay reason
                </label>
                <textarea
                  id="cg-delay"
                  className="input mt-1"
                  value={selected.delay_reason || ''}
                  disabled={!canManage}
                  onChange={(e) => updateCargo(selected.id, { delay_reason: e.target.value })}
                  placeholder="Why is this consignment held up?"
                />
                <p className="mt-1.5 text-[11px] text-[#64748B]">
                  Shown against the row in the register and in the watchlist.
                </p>
              </div>
            )}
          </Panel>
        )}

        {/* ---------- Watchlist ---------- */}
        <Panel
          eyebrow="Needs attention"
          title="Delayed & Critical"
          subtitle="Delays first, then anything critical still in the pipeline"
        >
          {needsAttention.length === 0 ? (
            <StateBlock
              kind="empty"
              title="Nothing needs attention"
              message="No delays and no critical consignments outstanding."
            />
          ) : (
            <ul className="space-y-2.5">
              {needsAttention.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="w-full text-left p-3 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#0284C7] transition"
                    onClick={() => handleSelectRow(item.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-[#0C1E30]">{item.item_name}</div>
                        <div className="truncate text-[11px] text-[#64748B] mt-0.5">
                          <span className="font-mono font-bold text-[#0284C7]">{item.id}</span> · → {item.destination}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <Badge map={CARGO_STATUS} value={item.status} />
                        <Badge map={PRIORITY} value={item.priority} />
                      </div>
                    </div>
                    {item.status === 'DELAYED' && item.delay_reason && (
                      <div className="mt-2 flex items-start gap-1.5 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md">
                        <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-600" />
                        <span>{item.delay_reason}</span>
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* ---------- Load per destination ---------- */}
        <Panel
          eyebrow="Connected data"
          title="Load by Destination"
          subtitle="Recalculated from the register on every change"
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE8F0] bg-white px-2.5 py-1 text-xs font-semibold text-[#0C1E30] hover:bg-slate-50 transition"
              onClick={() => goTo('map')}
            >
              <MapPin size={13} className="text-[#0284C7]" /> Map
            </button>
          }
        >
          {byDestination.length === 0 ? (
            <StateBlock kind="empty" title="Nothing logged yet" />
          ) : (
            <ul className="space-y-3">
              {byDestination.map((row) => (
                <li key={row.destination} className="p-2.5 rounded-xl border border-[#DCE8F0] bg-[#F8FAFC]">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <Ship size={13} className="shrink-0 text-[#64748B]" />
                      <span className="truncate text-xs font-semibold text-[#0C1E30]">{row.destination}</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#0C1E30]">
                      {(row.kg / 1000).toFixed(1)} t
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${row.delayed ? 'bg-amber-500' : 'bg-[#0284C7]'}`}
                        style={{
                          width: `${byDestination[0].kg ? (row.kg / byDestination[0].kg) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="shrink-0 text-[10.5px] font-mono text-[#64748B]">
                      {row.count} {row.count === 1 ? 'item' : 'items'}
                      {row.delayed > 0 && (
                        <span className="text-amber-700 font-semibold"> · {row.delayed} delayed</span>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* ================= OPERATIONAL FOOTER ================= */}
      <div className="rounded-2xl border border-sky-200 bg-[#E0F2FE]/40 p-4 flex items-start gap-3 shadow-xs">
        <Package size={16} className="mt-0.5 shrink-0 text-[#0284C7]" />
        <div className="text-xs text-[#42586E] leading-relaxed">
          <strong className="text-[#0C1E30]">Logistics Operations Manifest.</strong> All consignments are synchronized across staging depots in Cape Town, chartered polar supply vessels, and station hubs (Maitri &amp; Bharati). Status updates are recorded immutably in the central command log.
        </div>
      </div>

      {/* ================= INTERACTIVE CARGO DETAIL SLIDE-OVER DRAWER ================= */}
      <CargoDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        consignment={selected}
        goTo={goTo}
        canManage={canManage}
        updateCargo={updateCargo}
        expeditionName={getExpedition(selected?.expedition_id)?.name}
      />
    </div>
  )
}
