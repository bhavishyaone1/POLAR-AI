/**
 * INVENTORY MANAGEMENT
 * ====================
 * What is in stock, where it is stored, and what is running out.
 *
 * THE ONE IDEA TO UNDERSTAND HERE (master prompt section 5):
 *   "Low stock" is NEVER saved in the data. There is no `is_low` column.
 *   stockStatus() in src/lib/statuses.js compares quantity against
 *   minimum_quantity every single time the screen draws:
 *
 *       quantity === 0        -> OUT OF STOCK
 *       quantity <= minimum   -> LOW STOCK
 *       otherwise             -> AVAILABLE
 *
 *   Because it is calculated, the badge can never disagree with the
 *   numbers printed next to it. A saved flag could.
 *
 * THE CONNECTED BITS (master prompt section 12):
 *   1. Press the minus button until an item reaches its minimum. The badge
 *      flips to LOW STOCK by itself, the "Low stock" card above counts it,
 *      and the dashboard's "Low Stock Items" card counts it too — all from
 *      the same recalculation. No code links those three places.
 *   2. Crossing below the minimum writes one line into Recent Activity
 *      (once, at the crossing — not on every later edit).
 *   3. Press Restock and it all reverses.
 *   4. Running an item to zero adds to the dashboard's Critical Alerts,
 *      because that number is open incidents + items that have run out.
 */

import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Filter,
  Flame,
  Minus,
  Package,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  X,
  Zap,
} from 'lucide-react'

import Badge from '../components/Badge'
import ContextualAiInsight from '../components/ContextualAiInsight'
import DataTable from '../components/DataTable'
import HorizontalBarChart from '../components/HorizontalBarChart'
import InventoryDetailDrawer from '../components/InventoryDetailDrawer'
import Panel from '../components/Panel'
import StateBlock from '../components/StateBlock'
import { useData } from '../store/DataContext'
import { useAuth } from '../store/AuthContext'
import { calculateResupplyMetrics } from '../services/continuityEngine'
import { clampPercent, formatNumber, timeAgo } from '../lib/format'
import {
  CONDITION,
  STOCK_STATUS,
  isLowStock,
  optionsFrom,
  statusColour,
  statusLabel,
  stockStatus,
} from '../lib/statuses'

/* The blank form, at module level so "reset the form" is one line. */
const EMPTY_FORM = {
  item_name: '',
  category: '',
  location: '',
  quantity: '',
  minimum_quantity: '',
  unit: 'units',
  condition: 'GOOD',
}

/* "No filters applied" — the starting value AND what the Clear button
   restores, so the two can never drift apart. */
const NO_FILTERS = { search: '', category: 'ALL', location: 'ALL', stock: 'ALL' }

/**
 * HOW BIG SHOULD ONE PRESS OF +/- BE?
 * Based on the item's MINIMUM, not its current quantity, so the step never
 * changes underneath you mid-demo. 6000 litres of diesel moves in 100s;
 * 8 avalanche beacons move in 1s.
 */
function stepFor(item) {
  const min = Number(item?.minimum_quantity) || 0
  if (min >= 1000) return 100
  if (min >= 100) return 10
  return 1
}

/**
 * The little bar in the Stock column.
 * Drawn against TWICE the minimum, so an item sitting exactly on its
 * minimum shows a half-full bar. That makes "getting close to trouble"
 * visible before it crosses, not only after.
 */
function stockPercent(item) {
  const min = Number(item?.minimum_quantity) || 0
  const qty = Number(item?.quantity) || 0
  if (min <= 0) return qty > 0 ? 100 : 0
  return clampPercent((qty / (min * 2)) * 100)
}

export default function Inventory({ goTo }) {
  const {
    inventory,
    cargo,
    continuityMetrics,
    stats,
    loading,
    error,
    addInventoryItem,
    updateInventoryItem,
    adjustInventoryQuantity,
  } = useData()

  /* WHAT THIS ROLE MAY CHANGE — see src/lib/roles.js. The low-stock warnings
     are still fully visible to a read-only session; only the +/- buttons,
     the Restock shortcut and the Add form are withheld. */
  const { canManage } = useAuth()

  const [filters, setFilters] = useState(NO_FILTERS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(null)
  const [selectedId, setSelectedId] = useState(
    () => inventory.find((i) => (Number(i.daily_burn_rate) || 0) > 0)?.id || inventory[0]?.id || null
  )
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleSelectRow = (id) => {
    setSelectedId(id)
    setIsDrawerOpen(true)
  }

  const selected = inventory.find((i) => i.id === selectedId) || null

  /* Predictive consumption and runway calculations for critical consumables */
  const consumableMetrics = inventory
    .filter((i) => (Number(i.daily_burn_rate) || 0) > 0)
    .map((item) => {
      const metrics = calculateResupplyMetrics(item, cargo)
      return { item, ...metrics }
    })
    .sort((a, b) => a.daysRemaining - b.daysRemaining)

  /* Categories and locations are READ FROM THE DATA. Add an item in a new
     category and it appears in these dropdowns on its own. */
  const categories = [...new Set(inventory.map((i) => i.category).filter(Boolean))].sort()
  const places = [...new Set(inventory.map((i) => i.location).filter(Boolean))].sort()

  /* ---------- THE FILTER CHAIN ----------
     One .filter() per rule so the whole thing reads top to bottom. */
  const term = filters.search.trim().toLowerCase()
  const visible = inventory
    .filter((i) => filters.category === 'ALL' || i.category === filters.category)
    .filter((i) => filters.location === 'ALL' || i.location === filters.location)
    .filter((i) => filters.stock === 'ALL' || stockStatus(i) === filters.stock)
    .filter((i) => {
      if (!term) return true
      return (
        i.item_name.toLowerCase().includes(term) ||
        i.id.toLowerCase().includes(term) ||
        (i.location || '').toLowerCase().includes(term)
      )
    })

  const filtersActive =
    filters.search !== '' ||
    filters.category !== 'ALL' ||
    filters.location !== 'ALL' ||
    filters.stock !== 'ALL'

  const setFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

  /* ---------- RESTOCK LIST ----------
     Everything at or below minimum, worst shortfall first. `stats.lowStockItems`
     is the very same array the dashboard counts — one source, two screens. */
  const restockList = [...stats.lowStockItems]
    .map((item) => ({
      item,
      shortfall: (Number(item.minimum_quantity) || 0) - (Number(item.quantity) || 0),
    }))
    .sort((a, b) => b.shortfall - a.shortfall)

  /* ---------- GROUPED VIEWS ----------
     NOTE: we count ITEMS, never sum quantities. Adding 8600 litres of water
     to 18 medical kits would produce a number that means nothing. */
  function groupBy(field) {
    return Object.values(
      inventory.reduce((acc, item) => {
        const key = item[field] || 'Unspecified'
        if (!acc[key]) acc[key] = { key, count: 0, low: 0 }
        acc[key].count += 1
        if (isLowStock(item)) acc[key].low += 1
        return acc
      }, {})
    ).sort((a, b) => b.count - a.count)
  }
  const byLocation = groupBy('location')
  const byCategory = groupBy('category')

  /* ---------- THE STOCK CHART (master prompt section 7) ----------
     One bar per item, drawn against a FULL HOLDING, which we define as
     twice the minimum. That is the same rule as the little bars in the
     Stock column of the table, so the chart and the table can never
     disagree — see stockPercent() at the top of this file.

     Why "twice the minimum" and not "percent of the minimum": an item
     holding 14,200 litres against a 6,000 litre minimum is 237%, and one
     bar like that squashes every other bar into the left edge. Against a
     full holding the scale stops at 100%, everything stays readable, and
     the dashed line at 50% is exactly the minimum. Left of the line means
     trouble, and the bar's colour says the same thing again.

     Items with no minimum set are left out rather than quietly drawn at
     full: "stock against minimum" has no meaning without a minimum. The
     count of those is shown under the chart so nothing disappears
     silently. */
  const noMinimumCount = inventory.filter((i) => !(Number(i.minimum_quantity) > 0)).length

  /* Two stations may stock the same item, so an item name on its own is
     not guaranteed to be unique — and two bars with the same name would be
     drawn on top of each other as one. Where a name repeats we add the
     station to tell them apart. */
  const nameCounts = inventory.reduce((acc, i) => {
    acc[i.item_name] = (acc[i.item_name] || 0) + 1
    return acc
  }, {})

  const stockChartData = inventory
    .filter((i) => Number(i.minimum_quantity) > 0)
    .map((item) => ({
      label: nameCounts[item.item_name] > 1 ? `${item.item_name} · ${item.location}` : item.item_name,
      value: Math.round(stockPercent(item)),
      colour: statusColour(STOCK_STATUS, stockStatus(item)),
      note: `${formatNumber(item.quantity)}/${formatNumber(item.minimum_quantity)}`,
      tip: `${formatNumber(item.quantity)} of ${formatNumber(item.minimum_quantity)} ${item.unit} minimum · ${statusLabel(STOCK_STATUS, stockStatus(item))}`,
    }))
    /* Worst first, so whatever needs attention is at the top of the
       chart where the eye lands. */
    .sort((a, b) => a.value - b.value)

  /** Raise an item back to a full holding (twice its minimum). */
  function restock(item) {
    const min = Number(item.minimum_quantity) || 0
    if (min <= 0) return
    updateInventoryItem(item.id, { quantity: min * 2 })
  }

  /* ---------- THE FORM ---------- */
  const setField = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    setFormError(null)
  }

  /**
   * VALIDATION (master prompt section 21 — validate user input).
   */
  function handleSubmit(event) {
    event.preventDefault()
    setFormSuccess(null)

    const name = form.item_name.trim()
    const place = form.location.trim()

    if (name.length < 2) return setFormError('Item name needs at least 2 characters.')
    if (!form.category.trim()) return setFormError('Category is required.')
    if (!place) return setFormError('Storage location is required.')

    /* The same item can be stocked at two different stations, but not
       twice at the same one — otherwise the totals stop making sense. */
    const clash = inventory.find(
      (i) =>
        i.item_name.toLowerCase() === name.toLowerCase() &&
        (i.location || '').toLowerCase() === place.toLowerCase()
    )
    if (clash)
      return setFormError(
        `${clash.item_name} is already tracked at ${clash.location} (${clash.id}). Adjust its quantity instead of adding it twice.`
      )

    const qty = form.quantity === '' ? 0 : Number(form.quantity)
    if (Number.isNaN(qty) || qty < 0) return setFormError('Quantity must be 0 or more.')

    const min = form.minimum_quantity === '' ? 0 : Number(form.minimum_quantity)
    if (Number.isNaN(min) || min < 0) return setFormError('Minimum quantity must be 0 or more.')

    try {
      const created = addInventoryItem({
        item_name: name,
        category: form.category.trim(),
        location: place,
        quantity: qty,
        minimum_quantity: min,
        unit: form.unit.trim() || 'units',
        condition: form.condition,
      })

      setForm(EMPTY_FORM)
      setFormError(null)
      /* Say straight away whether the new item is already a problem. */
      setFormSuccess(
        isLowStock(created)
          ? `${created.id} ${created.item_name} added — and it is already at or below its minimum, so it is flagged immediately.`
          : `${created.id} ${created.item_name} added at ${created.location}.`
      )
      setShowForm(false)
    } catch (err) {
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
              LOGISTICS & BUFFER INTELLIGENCE
            </span>
            <span className="text-[11px] text-[#8495A3] font-mono">STATION LEVEL L4</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#12263A]">Inventory & Consumable Reserves</h1>
          <p className="text-xs text-[#526779] mt-0.5">
            Continuous real-time tracking of fuel, life-support, rations, and technical reserves across polar stations.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDEAF0] bg-white px-3.5 py-2 text-xs font-semibold text-[#12263A] hover:bg-[#F0F8FB] transition shadow-xs"
            onClick={() => goTo('simulator')}
          >
            <Zap size={14} className="text-[#1597D4]" />
            <span>Simulate Outage</span>
          </button>
          {canManage && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white px-3.5 py-2 text-xs font-semibold shadow-xs transition"
              onClick={() => setShowForm((prev) => !prev)}
            >
              <Plus size={14} />
              <span>Add Stock Item</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= SUMMARY STRIP ================= */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { label: 'Items Tracked', value: stats.inventoryTotal, hint: 'Active stock records' },
          {
            label: 'Available Stable',
            value: inventory.filter((i) => stockStatus(i) === 'AVAILABLE').length,
            tone: 'ok',
            hint: 'Above minimum threshold',
          },
          {
            label: 'At or Below Min',
            value: stats.lowStockCount,
            tone: 'warn',
            hint: 'Requires resupply priority',
          },
          {
            label: 'Out of Stock',
            value: stats.outOfStockCount,
            tone: 'alert',
            hint: 'Zero station holding',
          },
          {
            label: 'Storage Locations',
            value: stats.inventoryLocations,
            hint: 'Maitri, Bharati & shelters',
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

      {/* ================= LIVE LOW-STOCK WARNING ================= */}
      {stats.lowStockCount > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 flex items-start gap-3 shadow-xs">
          <div className="h-8 w-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Package size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[#12263A]">
              {stats.lowStockCount} {stats.lowStockCount === 1 ? 'item is' : 'items are'} at or below minimum stock threshold
              {stats.outOfStockCount > 0 && (
                <span className="text-[#E5484D] font-bold">
                  {' '}· {stats.outOfStockCount} completely depleted
                </span>
              )}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#526779]">
              {stats.lowStockItems.map((item) => (
                <span key={item.id} className="inline-flex items-center gap-1 bg-white border border-amber-200/80 px-2 py-0.5 rounded-md">
                  <span className="font-medium text-[#12263A]">{item.item_name}</span>
                  <span className="font-mono text-[#E7A51A] font-bold">
                    {formatNumber(item.quantity)}/{formatNumber(item.minimum_quantity)} {item.unit}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= AI CONTINUITY ADVISORY BANNER ================= */}
      <ContextualAiInsight
        badge="CRITICAL ENERGY RUNWAY GAP"
        type="critical"
        title="Station Diesel Fuel (INV-001) · 5.0-Day Blackout Risk Window"
        description="Maitri station diesel reserve will exhaust in 12.0 days at current baseline burn (1,180 L/d). Incoming polar resupply vessel cargo C-101 ETA is delayed to 17.0 days, leaving an unhedged 5.0-day blackout window. Authorizing AI load-shedding protocol extends runway to 16.8 days."
        metrics={[
          { label: 'Runway Remaining', value: '12.0 Days' },
          { label: 'Burn Rate', value: '1,180 L/d' },
          { label: 'Unhedged Deficit', value: '5.0 Days' },
        ]}
        primaryAction={{
          label: 'Model Fuel Rationing',
          onClick: () => goTo('simulator'),
          icon: <Zap size={13} />,
        }}
        secondaryAction={{
          label: 'Ask AI Copilot',
          onClick: () => goTo('copilot'),
          icon: <Sparkles size={13} className="text-[#1597D4]" />,
        }}
        tertiaryAction={{
          label: 'Track Consignment C-101',
          onClick: () => goTo('cargo'),
        }}
      />

      {/* ================= PREDICTIVE RUNWAY & RESOURCE DEPLETION HORIZON ================= */}
      <Panel
        eyebrow="Resource Depletion Intelligence"
        title="Predictive Consumption & Resource Runway"
        subtitle="Answers: What is running low? What will run out? When?"
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0C1E30] hover:bg-[#F0F8FB] transition shadow-xs"
              onClick={() => goTo('simulator')}
            >
              <Zap size={13} className="text-[#0284C7]" />
              <span>What-If Sandbox</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0C1E30] hover:bg-[#F0F8FB] transition shadow-xs"
              onClick={() => goTo('risks')}
            >
              <ArrowRight size={13} className="text-[#0284C7]" />
              <span>Risk Cascade</span>
            </button>
          </div>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {consumableMetrics.map(({ item, daysRemaining, etaDays, resupplyGapDays, isAtRisk, linkedCargo }) => {
            const isDeficit = resupplyGapDays > 0
            return (
              <div
                key={item.id}
                onClick={() => handleSelectRow(item.id)}
                className={`cursor-pointer rounded-2xl border p-5 flex flex-col justify-between transition bg-white shadow-xs hover:shadow-md hover:scale-[1.01] ${
                  isDeficit
                    ? 'border-rose-300 ring-1 ring-rose-200 hover:border-rose-400'
                    : 'border-[#DCE8F0] hover:border-[#0284C7]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10.5px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
                      {item.location?.split(' ')[0] || 'Station'} · {item.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wide ${
                        isDeficit
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : daysRemaining <= 15
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isDeficit && <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-ping" />}
                      {isDeficit ? 'Deficit Gap' : daysRemaining <= 15 ? 'Buffer Alert' : 'Stable'}
                    </span>
                  </div>

                  <div className="text-[14.5px] font-bold text-[#0C1E30] truncate" title={item.item_name}>
                    {item.item_name}
                  </div>

                  <div className="mt-3 flex items-baseline justify-between">
                    <div>
                      <div className={`text-2xl font-mono font-bold leading-none ${isDeficit ? 'text-rose-600' : 'text-[#0C1E30]'}`}>
                        {daysRemaining} <span className="text-xs font-normal text-[#42586E]">days runway</span>
                      </div>
                      <div className="text-[11px] text-[#64748B] mt-1">
                        Stock: <span className="font-mono text-[#0C1E30] font-semibold">{formatNumber(item.quantity)}</span> {item.unit}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-[#42586E] flex items-center gap-1 justify-end font-semibold">
                        <Flame size={13} className="text-amber-500" />
                        <span>{formatNumber(item.daily_burn_rate)}</span>
                      </div>
                      <div className="text-[10.5px] text-[#64748B]">{item.unit}/d burn</div>
                    </div>
                  </div>

                  {/* Visual Depletion Meter */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10.5px] font-mono text-[#64748B] mb-1">
                      <span>Depletion horizon</span>
                      <span className={isDeficit ? 'text-rose-600 font-bold' : 'text-[#0C1E30]'}>
                        {Math.round(Math.min(100, (daysRemaining / 30) * 100))}% safe capacity
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-[#DCE8F0]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, (daysRemaining / 30) * 100)}%`,
                          backgroundColor: isDeficit ? '#E11D48' : daysRemaining <= 15 ? '#D97706' : '#0284C7',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-xs">
                  {isDeficit ? (
                    <div className="text-rose-700 font-medium flex items-start gap-1.5">
                      <AlertTriangle size={14} className="shrink-0 mt-0.5 text-rose-600" />
                      <span>
                        Resupply gap: <strong className="font-mono text-rose-700">-{resupplyGapDays}d deficit</strong> before {linkedCargo?.id || 'resupply'} arrives (ETA Day {etaDays}).
                      </span>
                    </div>
                  ) : linkedCargo ? (
                    <div className="text-[#42586E] flex items-center justify-between">
                      <span className="text-[#64748B]">Inbound resupply: <strong className="text-[#0C1E30] font-mono">{linkedCargo.id}</strong></span>
                      <span className="font-mono font-semibold text-[#0284C7]">ETA Day {etaDays}</span>
                    </div>
                  ) : (
                    <div className="text-[#64748B] flex items-center justify-between">
                      <span>Safety buffer</span>
                      <span className="font-mono text-[#42586E] font-medium">{item.safety_buffer_days || 3}d reserved</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Panel>

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

      {/* ================= ADD FORM ================= */}
      {showForm && (
        <Panel
          eyebrow="New record"
          title="Add Stock Item"
          subtitle="Set a minimum quantity and the low-stock warning takes care of itself."
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
                <label className="field-label" htmlFor="inv-name">
                  Item name *
                </label>
                <input
                  id="inv-name"
                  name="item_name"
                  className="input"
                  value={form.item_name}
                  onChange={setField}
                  placeholder="e.g. Crampon Sets"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="inv-cat">
                  Category *
                </label>
                <input
                  id="inv-cat"
                  name="category"
                  className="input"
                  value={form.category}
                  onChange={setField}
                  placeholder="e.g. Safety"
                  list="inv-categories"
                />
                <datalist id="inv-categories">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="field-label" htmlFor="inv-loc">
                  Stored at *
                </label>
                <input
                  id="inv-loc"
                  name="location"
                  className="input"
                  value={form.location}
                  onChange={setField}
                  placeholder="e.g. Maitri Station"
                  list="inv-places"
                />
                <datalist id="inv-places">
                  {places.map((p) => (
                    <option key={p} value={p} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="field-label" htmlFor="inv-qty">
                  Quantity in stock
                </label>
                <input
                  id="inv-qty"
                  name="quantity"
                  type="number"
                  min="0"
                  className="input"
                  value={form.quantity}
                  onChange={setField}
                  placeholder="e.g. 40"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="inv-min">
                  Minimum before warning
                </label>
                <input
                  id="inv-min"
                  name="minimum_quantity"
                  type="number"
                  min="0"
                  className="input"
                  value={form.minimum_quantity}
                  onChange={setField}
                  placeholder="e.g. 15"
                />
                <p className="mt-1.5 text-[11px] text-low">
                  Reach this number and the item is flagged automatically.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label" htmlFor="inv-unit">
                    Unit
                  </label>
                  <input
                    id="inv-unit"
                    name="unit"
                    className="input"
                    value={form.unit}
                    onChange={setField}
                    placeholder="kits"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="inv-cond">
                    Condition
                  </label>
                  <select
                    id="inv-cond"
                    name="condition"
                    className="input"
                    value={form.condition}
                    onChange={setField}
                  >
                    {optionsFrom(CONDITION).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {formError && (
              <div className="alert-strip">
                <div className="text-[12.5px] text-hi">{formError}</div>
              </div>
            )}

            <button type="submit" className="btn">
              <Plus size={14} /> Add to inventory
            </button>
          </form>
        </Panel>
      )}

      {/* ================= THE STOCK REGISTER ================= */}
      <Panel
        eyebrow="Register"
        title="Stock Register"
        subtitle={
          filtersActive
            ? `Showing ${visible.length} of ${inventory.length} items`
            : 'Use the minus and plus buttons to change a quantity and watch the badge follow'
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
                <Plus size={13} /> Add
              </button>
            )}
          </div>
        }
      >
        {/* ---------- FILTERS ---------- */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="field-label" htmlFor="inv-search">
              <Filter size={10} className="mr-1 inline" /> Search
            </label>
            <input
              id="inv-search"
              className="input"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Item, ID or location"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="inv-f-stock">
              Stock status
            </label>
            <select
              id="inv-f-stock"
              className="input"
              value={filters.stock}
              onChange={(e) => setFilter('stock', e.target.value)}
            >
              <option value="ALL">All stock levels</option>
              {optionsFrom(STOCK_STATUS).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="inv-f-cat">
              Category
            </label>
            <select
              id="inv-f-cat"
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
            <label className="field-label" htmlFor="inv-f-loc">
              Location
            </label>
            <select
              id="inv-f-loc"
              className="input"
              value={filters.location}
              onChange={(e) => setFilter('location', e.target.value)}
            >
              <option value="ALL">All locations</option>
              {places.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DataTable
          loading={loading}
          error={error}
          rows={visible}
          rowKey={(row) => row.id}
          onRowClick={(row) => handleSelectRow(row.id)}
          maxHeight="520px"
          emptyTitle="No stock items match these filters"
          emptyMessage="Clear the filters to see the full register."
          columns={[
            { header: 'ID', cell: (r) => r.id, mono: true, width: '66px' },
            {
              header: 'Item',
              strong: true,
              cell: (r) => (
                <div>
                  <div className="font-semibold text-[#0F172A]">{r.item_name}</div>
                  <div className="text-[11px] font-normal text-[#64748B]">{r.category}</div>
                </div>
              ),
            },
            {
              /* Location names are long, so clip to one line — otherwise
                 every row grows and the table becomes a wall of text. */
              header: 'Stored at',
              cell: (r) => (
                <div style={{ maxWidth: 150 }}>
                  <div className="truncate text-[12px] font-medium text-[#334155]" title={r.location}>
                    {r.location}
                  </div>
                  <div className="text-[10.5px] text-[#64748B]">{timeAgo(r.updated_at)}</div>
                </div>
              ),
            },
            {
              header: 'Stock level',
              width: '146px',
              cell: (r) => {
                const status = stockStatus(r)
                return (
                  <div>
                    <div className="mono flex items-baseline justify-between gap-2 text-[12px]">
                      <span className="font-semibold text-[#0F172A]">{formatNumber(r.quantity)}</span>
                      <span className="text-[10.5px] text-[#64748B]">
                        min {formatNumber(r.minimum_quantity)} {r.unit}
                      </span>
                    </div>
                    <div
                      className={`progress mt-1 ${
                        status === 'AVAILABLE' ? '' : status === 'LOW_STOCK' ? 'progress--warn' : 'progress--muted'
                      }`}
                    >
                      <span style={{ width: `${stockPercent(r)}%` }} />
                    </div>
                  </div>
                )
              },
            },
            {
              header: 'Burn & Runway',
              width: '160px',
              cell: (r) => {
                const burn = Number(r.daily_burn_rate) || 0
                if (burn <= 0) {
                  return <span className="text-[11px] text-[#64748B]">Durable holding</span>
                }
                const metrics = calculateResupplyMetrics(r, cargo)
                const isDeficit = metrics.resupplyGapDays > 0
                return (
                  <div>
                    <div className="flex items-center justify-between gap-1 text-[11.5px]">
                      <span className="mono text-[#64748B] font-medium">
                        {formatNumber(burn)} {r.unit}/d
                      </span>
                      <span
                        className={`mono font-semibold ${
                          isDeficit
                            ? 'text-rose-700'
                            : metrics.daysRemaining <= (Number(r.safety_buffer_days) || 3)
                            ? 'text-amber-700'
                            : 'text-emerald-700'
                        }`}
                      >
                        {metrics.daysRemaining}d runway
                      </span>
                    </div>
                    {isDeficit && (
                      <div className="mt-0.5 text-[10px] font-semibold text-rose-700 flex items-center gap-1">
                        <span>Shortfall: -{metrics.resupplyGapDays}d gap</span>
                      </div>
                    )}
                  </div>
                )
              },
            },
            {
              /* THE CONNECTED CONTROL. Press minus until quantity reaches
                 the minimum: the badge in the next column flips to LOW
                 STOCK, the cards at the top of this page count it, and so
                 does the dashboard — all without any code joining them.
                 The step is printed on the button so there is no guessing. */
              header: 'Adjust',
              width: '118px',
              cell: (r) => {
                const step = stepFor(r)
                return (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md border border-[#DDEAF0] bg-white px-2 py-1 font-mono text-[11px] font-semibold text-[#12263A] hover:bg-[#F0F8FB] active:scale-95 transition disabled:opacity-30 disabled:pointer-events-none shadow-2xs"
                      disabled={!canManage || Number(r.quantity) <= 0}
                      onClick={() => adjustInventoryQuantity(r.id, -step)}
                      aria-label={`Reduce ${r.item_name} by ${step}`}
                    >
                      <Minus size={11} className="text-[#8495A3]" />
                      <span>{step}</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md bg-[#1597D4] hover:bg-[#1282b8] px-2 py-1 font-mono text-[11px] font-semibold text-white active:scale-95 transition disabled:opacity-30 disabled:pointer-events-none shadow-2xs"
                      disabled={!canManage}
                      onClick={() => adjustInventoryQuantity(r.id, step)}
                      aria-label={`Increase ${r.item_name} by ${step}`}
                    >
                      <Plus size={11} />
                      <span>{step}</span>
                    </button>
                  </div>
                )
              },
            },
            {
              header: 'Condition',
              width: '126px',
              cell: (r) => (
                <select
                  className="select-inline"
                  value={r.condition}
                  disabled={!canManage}
                  onChange={(e) => updateInventoryItem(r.id, { condition: e.target.value })}
                  aria-label={`Condition of ${r.item_name}`}
                >
                  {optionsFrom(CONDITION).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ),
            },
            {
              /* Calculated, not stored. This badge reads stockStatus(r)
                 fresh on every render. */
              header: 'Stock',
              width: '112px',
              cell: (r) => <Badge map={STOCK_STATUS} value={stockStatus(r)} dot />,
            },
          ]}
        />
      </Panel>

      {/* ================= STOCK CHART (master prompt section 7) =================
          The same three facts as the table above — quantity, minimum,
          status — drawn instead of listed. Nothing here is a separate
          copy of the data: press minus in the table and this bar shrinks
          and changes colour on the very same render. */}
      <Panel
        eyebrow="Stock levels"
        title="Stock Against Minimum"
        subtitle="Lowest first. A full holding is twice the minimum, so the dashed line is the minimum itself."
        action={
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => goTo('cargo')}>
            <Package size={13} /> Incoming cargo
          </button>
        }
      >
        <HorizontalBarChart
          data={stockChartData}
          maxValue={100}
          unitSuffix="%"
          reference={50}
          referenceLabel="Minimum"
          labelWidth={190}
          noteWidth={78}
          emptyTitle="Nothing to chart"
          emptyMessage="No items with a minimum quantity set."
        />

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#64748B]">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Available
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> At or below minimum
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Out of stock
          </span>
          <span className="text-[#64748B]">
            Bars stop at a full holding — figures beside each bar are real quantities.
          </span>
          {noMinimumCount > 0 && (
            <span className="text-amber-700 font-medium">
              {noMinimumCount} item{noMinimumCount === 1 ? '' : 's'} not charted — no minimum set.
            </span>
          )}
        </div>
      </Panel>

      {/* ================= RESTOCK LIST + GROUPED VIEWS ================= */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* ---------- Restock list ---------- */}
        <Panel
          eyebrow="Action required"
          title="Restock List"
          subtitle="Biggest shortfall first. Restock raises an item to twice its minimum."
        >
          {restockList.length === 0 ? (
            <StateBlock
              kind="empty"
              title="Everything is above minimum"
              message="Nothing needs reordering right now."
            />
          ) : (
            <ul className="space-y-3">
              {restockList.map(({ item, shortfall }) => (
                <li key={item.id} className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-white p-2.5 shadow-2xs hover:border-sky-200 transition">
                  <div
                    className="min-w-0 cursor-pointer hover:opacity-80 transition"
                    onClick={() => handleSelectRow(item.id)}
                    title="View item telemetry"
                  >
                    <div className="truncate text-[13px] font-semibold text-[#0F172A]">{item.item_name}</div>
                    <div className="truncate text-[11px] text-[#64748B]">
                      <span className="mono">{item.id}</span> · {item.location}
                    </div>
                    <div className="mono mt-0.5 text-[11px] font-semibold text-amber-700">
                      {formatNumber(item.quantity)} / {formatNumber(item.minimum_quantity)}{' '}
                      {item.unit}
                      {shortfall > 0 && ` · short by ${formatNumber(shortfall)}`}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <Badge map={STOCK_STATUS} value={stockStatus(item)} />
                    {canManage && Number(item.minimum_quantity) > 0 && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-[#0F172A] hover:bg-slate-50 transition"
                        onClick={() => restock(item)}
                        title={`Raise to ${formatNumber(Number(item.minimum_quantity) * 2)} ${item.unit}`}
                      >
                        <RotateCcw size={11} /> Restock
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* ---------- By location ---------- */}
        <Panel
          eyebrow="Connected data"
          title="Stock by Location"
          subtitle="Item counts, not quantities — litres and kits cannot be added together"
          action={
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => goTo('map')}>
              <Boxes size={13} /> Map
            </button>
          }
        >
          {byLocation.length === 0 ? (
            <StateBlock kind="empty" title="Nothing in stock yet" />
          ) : (
            <GroupList rows={byLocation} />
          )}
        </Panel>

        {/* ---------- By category ---------- */}
        <Panel
          eyebrow="Connected data"
          title="Stock by Category"
          subtitle="Where the shortages are concentrated"
        >
          {byCategory.length === 0 ? (
            <StateBlock kind="empty" title="Nothing in stock yet" />
          ) : (
            <GroupList rows={byCategory} />
          )}
        </Panel>
      </div>

      {/* ================= OPERATIONAL LOGISTICS FOOTER ================= */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 flex items-center gap-3 text-[#0F172A]">
        <PackageCheck size={18} className="shrink-0 text-sky-600" />
        <div className="text-[12px] text-[#475569] leading-relaxed">
          <strong className="font-semibold text-[#0F172A]">Station Logistics Directory.</strong> Consumable buffer thresholds, fuels, and critical spares calibrated to Antarctic wintering standards. Stock alerts recalculate dynamically across active field stations and remote shelters.
        </div>
      </div>

      {/* ================= INTERACTIVE INVENTORY DETAIL SLIDE-OVER DRAWER ================= */}
      <InventoryDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        item={selected}
        cargo={cargo}
        goTo={goTo}
        canManage={canManage}
        adjustInventoryQuantity={adjustInventoryQuantity}
        updateInventoryItem={updateInventoryItem}
      />
    </div>
  )
}

/**
 * The "by location" and "by category" lists are the same shape, so they
 * share one small component instead of the JSX being written twice.
 */
function GroupList({ rows }) {
  const biggest = rows[0]?.count || 1

  return (
    <ul className="space-y-2.5">
      {rows.map((row) => (
        <li key={row.key} className="rounded-lg border border-slate-100 bg-white p-2 shadow-2xs">
          <div className="flex items-baseline justify-between gap-3">
            <span className="truncate text-[12.5px] font-medium text-[#0F172A]">{row.key}</span>
            <span className="mono shrink-0 text-[12px] font-semibold text-[#475569]">{row.count}</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className={`progress flex-1 ${row.low ? 'progress--warn' : ''}`}>
              <span style={{ width: `${(row.count / biggest) * 100}%` }} />
            </div>
            <span className="shrink-0 text-[10.5px] text-[#64748B]">
              {row.low > 0 ? (
                <span className="font-semibold text-amber-700">{row.low} low</span>
              ) : (
                <span className="text-emerald-700 font-medium">all stocked</span>
              )}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
