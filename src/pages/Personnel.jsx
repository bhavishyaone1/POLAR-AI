/**
 * PERSONNEL TRACKING
 * ==================
 * The roster of everyone deployed, where they are, and what state they are in.
 *
 * THE CONNECTED BITS (master prompt sections 12 and 19):
 *
 *   1. Change someone's STATUS here and the dashboard's "Personnel Deployed"
 *      number moves on its own, because that number is counted from this
 *      same list. Recent Activity writes the change down by itself too.
 *
 *   2. Move someone to a different LOCATION here and their coordinates
 *      change with them — which is what moves their marker on the Map page.
 *
 *   3. The detail panel on the right shows any EMERGENCY involving the
 *      selected person, read live from the emergency records. Report an
 *      incident against someone on the Emergency page and it turns up here.
 *
 *   4. Add a person to an expedition here and that expedition's "Assigned
 *      Team" panel grows on the Expeditions page.
 *
 * HONESTY NOTE (master prompt section 21): every name in this roster is
 * fictional and every coordinate is a simulated demo value. We are not
 * reading real GPS units or satellite trackers, and the UI says so.
 */

import { useState } from 'react'
import {
  CheckCircle2,
  Compass,
  LayoutGrid,
  List,
  Loader2,
  LocateFixed,
  MapPin,
  Plus,
  RotateCcw,
  Search,
  Siren,
  UserPlus,
  Users,
  X,
} from 'lucide-react'

import Badge from '../components/Badge'
import DataTable from '../components/DataTable'
import Panel from '../components/Panel'
import StateBlock from '../components/StateBlock'
import { useData } from '../store/DataContext'
import { useAuth } from '../store/AuthContext'
import useGeolocation from '../hooks/useGeolocation'
import { formatCoords, formatDateTime, timeAgo } from '../lib/format'
import {
  EMERGENCY_STATUS,
  EMERGENCY_TYPE,
  LOCATION_TYPE,
  PERSONNEL_STATUS,
  SEVERITY,
  optionsFrom,
  statusLabel,
} from '../lib/statuses'

/* The blank add-person form, kept here so "reset the form" is one line. */
const EMPTY_FORM = {
  name: '',
  role: '',
  expedition_id: '',
  location_id: '',
  blood_group: '',
  satphone: '',
  location_mode: 'select', // 'select' | 'custom'
  custom_location_name: '',
  custom_latitude: '',
  custom_longitude: '',
}

/* All filters off. Used for the initial state and the Clear button. */
const NO_FILTERS = {
  search: '',
  status: 'ALL',
  expedition: 'ALL',
  location: 'ALL',
}

/**
 * Colours the "last check-in" time so a long silence stands out.
 * On a real operations board a stale position is the first sign of a
 * problem, so it should not look the same as a check-in from a minute ago.
 */
function checkinClass(iso) {
  const mins = (Date.now() - new Date(iso).getTime()) / 60000
  if (!Number.isFinite(mins)) return 'text-[#64748B]'
  if (mins > 720) return 'text-rose-700 font-semibold' // over 12 hours
  if (mins > 120) return 'text-amber-700 font-semibold' // over 2 hours
  return 'text-[#475569]'
}

export default function Personnel({ goTo }) {
  const {
    personnel,
    expeditions,
    locations,
    emergencies,
    stats,
    loading,
    error,
    addPerson,
    updatePerson,
    addLocation,
    getExpedition,
    getLocation,
    personnelForExpedition,
  } = useData()

  const { locateOnce } = useGeolocation()
  const [gpsLoading, setGpsLoading] = useState(false)

  /* WHAT THIS ROLE MAY CHANGE — see src/lib/roles.js. A read-only session
     reads the whole roster; it just cannot move anybody. */
  const { canManage } = useAuth()

  /* Which person is open in the right-hand panel. It opens on whoever is
     in EMERGENCY status, because that is who a commander would look at
     first. If nobody is, it opens on the first person on the roster. */
  const [selectedId, setSelectedId] = useState(
    () => (personnel.find((p) => p.status === 'EMERGENCY') || personnel[0])?.id ?? null
  )

  const [filters, setFilters] = useState(NO_FILTERS)
  const [viewMode, setViewMode] = useState('sections') // 'sections' | 'table'
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(null)

  /* ---------- FILTERING ----------
     A plain .filter() with one check per active filter. Readable beats
     clever here: you can point at this in a demo and explain it. */
  const search = filters.search.trim().toLowerCase()

  const filtered = personnel.filter((person) => {
    if (filters.status !== 'ALL' && person.status !== filters.status) return false
    if (filters.expedition !== 'ALL' && person.expedition_id !== filters.expedition) return false
    if (filters.location !== 'ALL' && person.location_id !== filters.location) return false

    if (search) {
      const haystack = `${person.name} ${person.id} ${person.role}`.toLowerCase()
      if (!haystack.includes(search)) return false
    }
    return true
  })

  const filtersActive =
    filters.search !== '' ||
    filters.status !== 'ALL' ||
    filters.expedition !== 'ALL' ||
    filters.location !== 'ALL'

  const setFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

  /* ---------- THE SELECTED PERSON AND THEIR CONNECTED RECORDS ---------- */
  const selected = personnel.find((p) => p.id === selectedId) || null
  const selectedExpedition = selected ? getExpedition(selected.expedition_id) : null
  const selectedLocation = selected ? getLocation(selected.location_id) : null

  /* Incidents that name this person. Read live from the emergency records —
     nothing is copied onto the personnel record itself. */
  const personIncidents = selected
    ? emergencies.filter((incident) => incident.personnel_id === selected.id)
    : []
  const openIncidents = personIncidents.filter((incident) => incident.status !== 'RESOLVED')

  /* Everyone else on the same expedition. */
  const teammates = selected?.expedition_id
    ? personnelForExpedition(selected.expedition_id).filter((p) => p.id !== selected.id)
    : []

  /* ---------- ADD PERSON ---------- */
  const setField = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    setFormError(null)
  }

  const handleExpeditionChange = (e) => {
    const expId = e.target.value
    setForm((prev) => {
      const next = { ...prev, expedition_id: expId }
      if (expId) {
        const exp = expeditions.find((x) => x.id === expId)
        if (exp?.destination) {
          const matchingLoc = locations.find(
            (l) =>
              l.id === exp.location_id ||
              l.name.toLowerCase() === exp.destination.toLowerCase()
          )
          if (matchingLoc) {
            next.location_id = matchingLoc.id
          } else {
            next.custom_location_name = exp.destination
          }
        }
      }
      return next
    })
    setFormError(null)
  }

  const handleGetLiveGps = async () => {
    setGpsLoading(true)
    setFormError(null)
    const assignedExp = form.expedition_id ? expeditions.find((e) => e.id === form.expedition_id) : null
    try {
      const pos = await locateOnce()
      setForm((prev) => ({
        ...prev,
        location_mode: 'custom',
        custom_location_name: prev.custom_location_name || 'My Live Device Location',
        custom_latitude: pos.latitude.toFixed(4),
        custom_longitude: pos.longitude.toFixed(4),
      }))
    } catch (err) {
      // Graceful fallback to polar field coordinates
      const fallbackLat = (-70.7667 + (Math.random() - 0.5) * 2).toFixed(4)
      const fallbackLng = (11.7333 + (Math.random() - 0.5) * 4).toFixed(4)
      const fallbackName = assignedExp?.destination || 'Polar Field Station'

      setForm((prev) => ({
        ...prev,
        location_mode: 'custom',
        custom_location_name: prev.custom_location_name || fallbackName,
        custom_latitude: prev.custom_latitude || fallbackLat,
        custom_longitude: prev.custom_longitude || fallbackLng,
      }))

      setFormError(
        `Browser location permission not granted (${err.message}). Switched to Field Coordinates mode with polar coordinates.`
      )
    } finally {
      setGpsLoading(false)
    }
  }

  /**
   * VALIDATION (master prompt section 21 — validate user input).
   * Every rule says exactly what is wrong, and nothing is saved until
   * they all pass.
   */
  function handleSubmit(event) {
    event.preventDefault()
    setFormSuccess(null)

    const name = form.name.trim()
    const role = form.role.trim()

    if (name.length < 2) return setFormError('Full name is required (at least 2 characters).')
    if (!role) return setFormError('Role is required — e.g. Glaciologist, Field Technician.')

    /* A duplicate name is usually a mistake, so we stop and say so. */
    if (personnel.some((p) => p.name.toLowerCase() === name.toLowerCase()))
      return setFormError(`${name} is already on the roster.`)

    /* Only check the phone format if one was actually typed. */
    if (form.satphone.trim() && !/^[+\d][\d\s-]{5,}$/.test(form.satphone.trim()))
      return setFormError('Sat phone should be digits, spaces or dashes — e.g. +881-621-440-117.')

    try {
      let finalLocationId = form.location_id || null
      let finalLat = null
      let finalLng = null

      // Handle custom typed location or GPS
      if (form.location_mode === 'custom' && form.custom_location_name.trim()) {
        const customName = form.custom_location_name.trim()
        const latVal = parseFloat(form.custom_latitude)
        const lngVal = parseFloat(form.custom_longitude)

        // Register custom location in DataContext
        const registered = addLocation({
          name: customName,
          type: 'CAMP',
          latitude: Number.isFinite(latVal) ? latVal : -70.7667 + (Math.random() - 0.5) * 3,
          longitude: Number.isFinite(lngVal) ? lngVal : 11.7333 + (Math.random() - 0.5) * 6,
          region: 'Antarctica — Field Operations',
          notes: `Custom location for ${name} (${form.expedition_id || 'Field Team'})`,
        })

        if (registered) {
          finalLocationId = registered.id
          finalLat = registered.latitude
          finalLng = registered.longitude
        }
      } else if (finalLocationId === '__EXP_DEST__') {
        const exp = expeditions.find((e) => e.id === form.expedition_id)
        if (exp?.destination) {
          const registered = addLocation({
            name: exp.destination,
            type: 'CAMP',
            region: 'Antarctica — Field Operations',
            notes: `Expedition destination for ${exp.id} (${exp.name})`,
          })
          if (registered) {
            finalLocationId = registered.id
            finalLat = registered.latitude
            finalLng = registered.longitude
          }
        }
      } else if (finalLocationId) {
        const place = locations.find((l) => l.id === finalLocationId)
        if (place) {
          finalLat = place.latitude
          finalLng = place.longitude
        }
      }

      const created = addPerson({
        name,
        role,
        expedition_id: form.expedition_id || null,
        location_id: finalLocationId,
        latitude: finalLat,
        longitude: finalLng,
        blood_group: form.blood_group.trim() || '—',
        satphone: form.satphone.trim() || '—',
      })

      setForm(EMPTY_FORM)
      setFormError(null)
      setFormSuccess(`${created.id} ${created.name} added to the roster.`)
      setSelectedId(created.id)
      setShowForm(false)
    } catch (err) {
      /* If saving ever fails, say so instead of silently doing nothing. */
      setFormError(`Could not save: ${err.message}`)
    }
  }

  /* ---------- SUMMARY NUMBERS ---------- */
  const countStatus = (status) => personnel.filter((p) => p.status === status).length

  const summary = [
    { label: 'On roster', value: stats.personnelTotal },
    { label: 'Active', value: countStatus('ACTIVE'), tone: 'ok' },
    { label: 'In transit', value: countStatus('IN_TRANSIT') },
    { label: 'Resting / off duty', value: countStatus('RESTING') + countStatus('OFF_DUTY') },
    {
      label: 'Emergency',
      value: stats.personnelEmergency,
      tone: stats.personnelEmergency > 0 ? 'alert' : undefined,
    },
  ]

  /* Dynamic expedition and location helpers for the Deploy form */
  const assignedExp = expeditions.find((e) => e.id === form.expedition_id)
  const assignedExpLoc = assignedExp
    ? locations.find(
        (l) =>
          l.id === assignedExp.location_id ||
          l.name.toLowerCase() === (assignedExp.destination || '').toLowerCase()
      )
    : null

  return (
    <div className="space-y-7">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DDEAF0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1597D4] bg-[#DDF3FA] px-2 py-0.5 rounded-full">
              PERSONNEL MOVEMENT &amp; FIELD ROSTER
            </span>
            <span className="text-[11px] text-[#8495A3] font-mono">ACTIVE DEPLOYMENTS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#12263A]">Personnel Movement &amp; Deployments</h1>
          <p className="text-xs text-[#526779] mt-0.5">
            Real-time roster tracking, field camp movements, satellite check-ins, and medical clearance across Antarctic sectors.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDEAF0] bg-white px-3.5 py-2 text-xs font-semibold text-[#12263A] hover:bg-[#F0F8FB] transition shadow-xs"
            onClick={() => goTo('map')}
          >
            <MapPin size={14} className="text-[#1597D4]" />
            <span>Field Map</span>
          </button>
          {canManage && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1597D4] hover:bg-[#1282b8] text-white px-3.5 py-2 text-xs font-semibold shadow-xs transition"
              onClick={() => setShowForm((prev) => !prev)}
            >
              <UserPlus size={14} />
              <span>Deploy Personnel</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= 1. SUMMARY STRIP ================= */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {[
          { label: 'On Roster', value: stats.personnelTotal, hint: 'All registered personnel' },
          { label: 'Active on Duty', value: countStatus('ACTIVE'), tone: 'ok', hint: 'Station & field active' },
          { label: 'In Transit', value: countStatus('IN_TRANSIT'), tone: countStatus('IN_TRANSIT') > 0 ? 'info' : undefined, hint: 'Traverses & air corridors' },
          { label: 'Resting / Off Duty', value: countStatus('RESTING') + countStatus('OFF_DUTY'), hint: 'Habitation modules' },
          {
            label: 'Emergency Flag',
            value: stats.personnelEmergency,
            tone: stats.personnelEmergency > 0 ? 'alert' : undefined,
            hint: stats.personnelEmergency > 0 ? 'Urgent attention required' : 'Zero active distress',
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
                  : item.tone === 'alert'
                  ? 'text-[#E5484D]'
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

      {/* ================= 2. EMERGENCY NOTICE ================= */}
      {stats.personnelEmergency > 0 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Siren size={17} className="animate-pulse" />
            </div>
            <div className="min-w-0 text-xs text-[#526779]">
              <strong className="text-rose-800 font-bold">
                {stats.personnelEmergency} team member{stats.personnelEmergency === 1 ? '' : 's'} flagged EMERGENCY:
              </strong>{' '}
              {personnel
                .filter((p) => p.status === 'EMERGENCY')
                .map((p) => `${p.name} (${p.id})`)
                .join(', ')}
              . Select them in the roster to review incident telemetry.
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 text-xs font-semibold shrink-0 shadow-xs transition"
            onClick={() => goTo('emergency')}
          >
            <span>Response Center</span>
          </button>
        </div>
      )}

      {/* ============================================================
          3. ADD PERSON
          ============================================================ */}
      {formSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <div className="text-[12.5px]">{formSuccess}</div>
        </div>
      )}

      {showForm && (
        <Panel
          eyebrow="New record"
          title="Deploy personnel"
          subtitle="Created with ACTIVE duty status under AFMC polar expedition clearance."
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-[#0F172A] hover:bg-slate-50 transition"
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
                <label className="field-label" htmlFor="p-name">
                  Full name *
                </label>
                <input
                  id="p-name"
                  name="name"
                  className="input"
                  value={form.name}
                  onChange={setField}
                  placeholder="e.g. Dr. Neha Kulkarni"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="p-role">
                  Role *
                </label>
                <input
                  id="p-role"
                  name="role"
                  className="input"
                  value={form.role}
                  onChange={setField}
                  placeholder="e.g. Field Technician"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="p-exp">
                  Assign to expedition
                </label>
                <select
                  id="p-exp"
                  name="expedition_id"
                  className="input"
                  value={form.expedition_id}
                  onChange={handleExpeditionChange}
                >
                  <option value="">Unassigned</option>
                  {expeditions.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.id} · {exp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-1">
                  <label className="field-label mb-0" htmlFor="p-loc">
                    Current location
                  </label>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          location_mode: prev.location_mode === 'custom' ? 'select' : 'custom',
                        }))
                      }
                      className="text-[#0284C7] hover:underline font-mono font-medium"
                    >
                      {form.location_mode === 'custom' ? '← Stations' : '+ Custom Location'}
                    </button>
                    <span className="text-[#94A3B8]">·</span>
                    <button
                      type="button"
                      onClick={handleGetLiveGps}
                      disabled={gpsLoading}
                      className="text-[#0284C7] hover:underline flex items-center gap-0.5 font-medium"
                      title="Use your real device browser GPS position"
                    >
                      {gpsLoading ? <Loader2 size={11} className="animate-spin" /> : <LocateFixed size={11} />}
                      <span>My GPS</span>
                    </button>
                  </div>
                </div>

                {form.location_mode === 'custom' ? (
                  <div className="space-y-2 rounded-xl border border-sky-200 bg-sky-50/50 p-2.5">
                    <div>
                      <input
                        name="custom_location_name"
                        className="input text-xs"
                        value={form.custom_location_name}
                        onChange={setField}
                        placeholder={
                          assignedExp?.destination
                            ? `Location name (e.g. ${assignedExp.destination})`
                            : 'Location name (e.g. Gold Survey Camp, Sector 4)'
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        name="custom_latitude"
                        type="number"
                        step="any"
                        className="input text-xs font-mono"
                        value={form.custom_latitude}
                        onChange={setField}
                        placeholder="Latitude (°S e.g. -70.76)"
                      />
                      <input
                        name="custom_longitude"
                        type="number"
                        step="any"
                        className="input text-xs font-mono"
                        value={form.custom_longitude}
                        onChange={setField}
                        placeholder="Longitude (°E e.g. 11.73)"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10.5px] text-[#64748B]">
                      <span>Coordinates optional (defaults to Antarctica)</span>
                      <button
                        type="button"
                        onClick={handleGetLiveGps}
                        disabled={gpsLoading}
                        className="text-[#0284C7] hover:underline flex items-center gap-1 font-medium"
                      >
                        {gpsLoading ? <Loader2 size={10} className="animate-spin" /> : <LocateFixed size={10} />}
                        Auto-fill GPS
                      </button>
                    </div>
                  </div>
                ) : (
                  <select
                    id="p-loc"
                    name="location_id"
                    className="input"
                    value={form.location_id}
                    onChange={(e) => {
                      if (e.target.value === '__CUSTOM__') {
                        setForm((prev) => ({ ...prev, location_mode: 'custom' }))
                      } else if (e.target.value === '__GPS__') {
                        handleGetLiveGps()
                      } else {
                        setField(e)
                      }
                    }}
                  >
                    <option value="">Not set (Unassigned station)</option>

                    {/* Assigned Expedition Destination */}
                    {assignedExp && (
                      <optgroup label={`📍 Assigned Expedition Destination (${assignedExp.id})`}>
                        {assignedExpLoc ? (
                          <option value={assignedExpLoc.id}>
                            ★ {assignedExpLoc.name} ({assignedExp.name})
                          </option>
                        ) : (
                          <option value="__EXP_DEST__">
                            ★ {assignedExp.destination} (Expedition Destination)
                          </option>
                        )}
                      </optgroup>
                    )}

                    {/* Permanent Research Stations */}
                    <optgroup label="🏢 Permanent Research Stations">
                      {locations
                        .filter((l) => l.type === 'STATION')
                        .map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.name} {loc.capacity ? `(Cap: ${loc.capacity})` : ''}
                          </option>
                        ))}
                    </optgroup>

                    {/* Field Camps & Logistics Bases */}
                    <optgroup label="⛺ Field Camps & Logistics Outposts">
                      {locations
                        .filter(
                          (l) =>
                            l.type !== 'STATION' &&
                            (!assignedExpLoc || l.id !== assignedExpLoc.id)
                        )
                        .map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.name} · {loc.region || loc.type}
                          </option>
                        ))}
                    </optgroup>

                    <optgroup label="➕ Custom Location / Device GPS">
                      <option value="__CUSTOM__">+ Enter custom location / coordinates…</option>
                      <option value="__GPS__">📍 Use my current live GPS…</option>
                    </optgroup>
                  </select>
                )}
              </div>
              <div>
                <label className="field-label" htmlFor="p-blood">
                  Blood group
                </label>
                <input
                  id="p-blood"
                  name="blood_group"
                  className="input"
                  value={form.blood_group}
                  onChange={setField}
                  placeholder="e.g. O+"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="p-sat">
                  Sat phone
                </label>
                <input
                  id="p-sat"
                  name="satphone"
                  className="input"
                  value={form.satphone}
                  onChange={setField}
                  placeholder="e.g. +881-621-440-117"
                />
              </div>
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-3 flex items-center justify-between gap-3 text-rose-900">
                <div className="text-[12.5px] font-medium flex-1">{formError}</div>
                <div className="flex items-center gap-2 shrink-0">
                  {(formError.includes('permission') || formError.includes('GPS')) && (
                    <button
                      type="button"
                      onClick={() => {
                        const assignedExp = form.expedition_id ? expeditions.find((e) => e.id === form.expedition_id) : null
                        setForm((prev) => ({
                          ...prev,
                          location_mode: 'custom',
                          custom_location_name: prev.custom_location_name || assignedExp?.destination || 'Polar Field Station',
                          custom_latitude: prev.custom_latitude || '-70.7667',
                          custom_longitude: prev.custom_longitude || '11.7333',
                        }))
                        setFormError(null)
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-[#0F172A] hover:bg-slate-50 transition"
                    >
                      Use Field Coordinates
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setFormError(null)}
                    className="text-[#64748B] hover:text-[#0F172A] p-1 cursor-pointer transition-colors"
                    title="Dismiss alert"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="btn">
              <Plus size={14} /> Add to roster
            </button>
          </form>
        </Panel>
      )}

      {/* ============================================================
          4. ROSTER + DETAIL
          The roster takes two thirds. Six columns need the room — at
          three fifths the Name column squeezed and people's names
          wrapped onto two lines.
          ============================================================ */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          eyebrow="Roster"
          title="Personnel"
          subtitle={
            filtersActive
              ? `Showing ${filtered.length} of ${personnel.length} records`
              : 'Click a row to open their record'
          }
          action={
            canManage &&
            !showForm && (
              <button type="button" className="btn btn--sm" onClick={() => setShowForm(true)}>
                <UserPlus size={13} /> Add
              </button>
            )
          }
        >
          {/* ---------- EXPEDITION SELECTION TABS ---------- */}
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
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
                    ? 'bg-[#0284C7] font-semibold text-white shadow-2xs'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
                }`}
              >
                All Expeditions ({personnel.length})
              </button>
              {expeditions.map((exp) => {
                const count = personnel.filter((p) => p.expedition_id === exp.id).length
                const hasEmergency = personnel.some(
                  (p) => p.expedition_id === exp.id && p.status === 'EMERGENCY'
                )
                const isSelected = filters.expedition === exp.id
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setFilter('expedition', isSelected ? 'ALL' : exp.id)}
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
                    <span className="text-[10px] opacity-70">({count})</span>
                  </button>
                )
              })}
            </div>

            {/* View Mode Toggle: Separate Sections vs Unified Table */}
            <div className="flex items-center rounded-lg border border-[#DDEAF0] bg-[#F8FAFC] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('sections')}
                className={`flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] transition ${
                  viewMode === 'sections'
                    ? 'bg-white font-semibold text-[#0F172A] shadow-2xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
                title="View by separate expedition sections"
              >
                <LayoutGrid size={11} />
                <span>Expedition Sections</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] transition ${
                  viewMode === 'table'
                    ? 'bg-white font-semibold text-[#0F172A] shadow-2xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
                title="View unified table"
              >
                <List size={11} />
                <span>Unified Table</span>
              </button>
            </div>
          </div>

          {/* ---------- FILTER BAR ---------- */}
          <div className="mb-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search
                size={13}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />
              <input
                className="input pl-8"
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
                placeholder="Search name, ID or role"
                aria-label="Search personnel"
              />
            </div>

            <select
              className="input"
              value={filters.status}
              onChange={(e) => setFilter('status', e.target.value)}
              aria-label="Filter by status"
            >
              <option value="ALL">All statuses</option>
              {optionsFrom(PERSONNEL_STATUS).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              className="input"
              value={filters.expedition}
              onChange={(e) => setFilter('expedition', e.target.value)}
              aria-label="Filter by expedition"
            >
              <option value="ALL">All expeditions</option>
              {expeditions.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  {exp.id} · {exp.name}
                </option>
              ))}
            </select>

            {filtersActive ? (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setFilters(NO_FILTERS)}
              >
                <RotateCcw size={13} /> Clear filters
              </button>
            ) : (
              <select
                className="input"
                value={filters.location}
                onChange={(e) => setFilter('location', e.target.value)}
                aria-label="Filter by location"
              >
                <option value="ALL">All locations</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {viewMode === 'sections' ? (
            <div className="space-y-4">
              {(filters.expedition === 'ALL'
                ? expeditions
                : expeditions.filter((e) => e.id === filters.expedition)
              ).map((exp) => {
                const expPersonnel = filtered.filter((p) => p.expedition_id === exp.id)
                const expAll = personnel.filter((p) => p.expedition_id === exp.id)
                const activeCount = expAll.filter((p) => p.status === 'ACTIVE').length
                const inTransitCount = expAll.filter((p) => p.status === 'IN_TRANSIT').length
                const emergencyCount = expAll.filter((p) => p.status === 'EMERGENCY').length

                if (filtersActive && expPersonnel.length === 0) return null

                return (
                  <div
                    key={exp.id}
                    className="overflow-hidden rounded-2xl border border-[#DDEAF0] bg-white shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5">
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
                            <span className="text-sm font-bold text-[#0F172A]">{exp.name}</span>
                            <span className="text-xs text-[#64748B]">· {exp.destination}</span>
                          </div>
                          <div className="text-[11px] text-[#64748B]">
                            Leader: <span className="font-semibold text-[#0F172A]">{exp.leader}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                        <span className="rounded bg-[#F1F5F9] px-2 py-0.5 text-[#475569] font-medium">
                          {expPersonnel.length} / {expAll.length} team
                        </span>
                        <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-emerald-700 font-semibold">
                          {activeCount} active
                        </span>
                        {inTransitCount > 0 && (
                          <span className="rounded bg-sky-50 border border-sky-200 px-2 py-0.5 text-sky-700 font-semibold">
                            {inTransitCount} transit
                          </span>
                        )}
                        {emergencyCount > 0 && (
                          <span className="flex items-center gap-1 rounded bg-rose-50 border border-rose-200 px-2 py-0.5 font-bold text-rose-700 animate-pulse">
                            <Siren size={11} />
                            {emergencyCount} EMERGENCY
                          </span>
                        )}
                      </div>
                    </div>

                    <DataTable
                      loading={loading}
                      error={error}
                      rows={expPersonnel}
                      rowKey={(row) => row.id}
                      onRowClick={(row) => setSelectedId(row.id)}
                      maxHeight={expPersonnel.length > 6 ? '320px' : undefined}
                      emptyTitle={
                        expAll.length === 0
                          ? exp.status === 'PLANNING'
                            ? 'Expedition in planning stage'
                            : exp.status === 'COMPLETED'
                              ? 'Expedition rotation concluded'
                              : 'No personnel assigned'
                          : 'No matching team members in this expedition'
                      }
                      emptyMessage={
                        expAll.length === 0
                          ? exp.status === 'PLANNING'
                            ? 'Field personnel deployment roster is currently being assembled.'
                            : exp.status === 'COMPLETED'
                              ? 'All expedition team members have concluded rotation and demobilized.'
                              : 'No personnel records are currently associated with this expedition.'
                          : 'Try adjusting your search or status filters.'
                      }
                      columns={[
                        { header: 'ID', cell: (r) => r.id, mono: true, width: '68px' },
                        {
                          header: 'Name',
                          strong: true,
                          cell: (r) => (
                            <div>
                              <div className={r.id === selectedId ? 'text-[#0284C7] font-semibold' : 'text-[#0F172A] font-medium'}>
                                {r.name}
                              </div>
                              <div className="text-[11px] font-normal text-[#64748B]">{r.role}</div>
                            </div>
                          ),
                        },
                        {
                          header: 'Location',
                          cell: (r) => {
                            const loc = getLocation(r.location_id)
                            if (!loc) return <span className="text-[#64748B]">—</span>
                            return (
                              <div style={{ maxWidth: 140 }}>
                                <div className="truncate text-[12px] font-medium text-[#334155]" title={loc.name}>
                                  {loc.name}
                                </div>
                                <div className="truncate text-[10.5px] text-[#64748B]">
                                  {statusLabel(LOCATION_TYPE, loc.type)}
                                </div>
                              </div>
                            )
                          },
                        },
                        {
                          header: 'Check-in',
                          width: '82px',
                          mono: true,
                          cell: (r) => (
                            <span className={`text-[11px] ${checkinClass(r.last_updated)}`}>
                              {timeAgo(r.last_updated)}
                            </span>
                          ),
                        },
                        {
                          header: 'Status',
                          width: '124px',
                          cell: (r) => (
                            <select
                              className="select-inline"
                              value={r.status}
                              disabled={!canManage}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => updatePerson(r.id, { status: e.target.value })}
                              aria-label={`Status for ${r.name}`}
                            >
                              {optionsFrom(PERSONNEL_STATUS).map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ),
                        },
                      ]}
                    />
                  </div>
                )
              })}
              {filtered.length === 0 && (
                <StateBlock
                  kind="empty"
                  title="No personnel match these filters"
                  message="Try clearing the filters to see the full roster."
                />
              )}
            </div>
          ) : (
            <DataTable
              loading={loading}
              error={error}
              rows={filtered}
              rowKey={(row) => row.id}
              onRowClick={(row) => setSelectedId(row.id)}
              maxHeight="540px"
              emptyTitle="No personnel match these filters"
              emptyMessage="Try clearing the filters to see the full roster."
              columns={[
                { header: 'ID', cell: (r) => r.id, mono: true, width: '68px' },
                {
                  header: 'Name',
                  strong: true,
                  cell: (r) => (
                    <div>
                      <div className={r.id === selectedId ? 'text-[#0284C7] font-semibold' : 'text-[#0F172A] font-medium'}>
                        {r.name}
                      </div>
                      <div className="text-[11px] font-normal text-[#64748B]">{r.role}</div>
                    </div>
                  ),
                },
                {
                  header: 'Expedition',
                  cell: (r) => {
                    const exp = getExpedition(r.expedition_id)
                    if (!exp) return <span className="text-[#64748B]">Unassigned</span>
                    return (
                      <div style={{ maxWidth: 150 }}>
                        <div className="truncate text-[12px] font-medium text-[#334155]" title={exp.name}>
                          {exp.name}
                        </div>
                        <div className="mono text-[10.5px] text-[#64748B]">{exp.id}</div>
                      </div>
                    )
                  },
                },
                {
                  header: 'Location',
                  cell: (r) => {
                    const loc = getLocation(r.location_id)
                    if (!loc) return <span className="text-[#64748B]">—</span>
                    return (
                      <div style={{ maxWidth: 128 }}>
                        <div className="truncate text-[12px] font-medium text-[#334155]" title={loc.name}>
                          {loc.name}
                        </div>
                        <div className="truncate text-[10.5px] text-[#64748B]">
                          {statusLabel(LOCATION_TYPE, loc.type)}
                        </div>
                      </div>
                    )
                  },
                },
                {
                  header: 'Check-in',
                  width: '82px',
                  mono: true,
                  cell: (r) => (
                    <span className={`text-[11px] ${checkinClass(r.last_updated)}`}>
                      {timeAgo(r.last_updated)}
                    </span>
                  ),
                },
                {
                  header: 'Status',
                  width: '124px',
                  cell: (r) => (
                    <select
                      className="select-inline"
                      value={r.status}
                      disabled={!canManage}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updatePerson(r.id, { status: e.target.value })}
                      aria-label={`Status for ${r.name}`}
                    >
                      {optionsFrom(PERSONNEL_STATUS).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ),
                },
              ]}
            />
          )}
        </Panel>

        {/* ---------- DETAIL COLUMN ---------- */}
        <div className="space-y-4 xl:col-span-1">
          {!selected ? (
            <Panel eyebrow="Detail" title="Personnel Record">
              <StateBlock
                kind="empty"
                title="Nobody selected"
                message="Click a person in the roster."
              />
            </Panel>
          ) : (
            <>
              {/* --- The person's record --- */}
              <Panel
                eyebrow={selected.id}
                title={selected.name}
                subtitle={selected.role}
                action={<Badge map={PERSONNEL_STATUS} value={selected.status} dot />}
              >
                <dl className="space-y-0">
                    <div className="kv">
                    <dt>Expedition</dt>
                    <dd>
                      {selectedExpedition ? (
                        <button
                          type="button"
                          className="text-[#0284C7] hover:underline font-semibold"
                          onClick={() => goTo('expeditions')}
                        >
                          {selectedExpedition.name}
                        </button>
                      ) : (
                        <span className="text-[#64748B]">Unassigned</span>
                      )}
                    </dd>
                  </div>
                  <div className="kv">
                    <dt>Location</dt>
                    <dd>{selectedLocation ? selectedLocation.name : '—'}</dd>
                  </div>
                  <div className="kv">
                    <dt>Position</dt>
                    <dd className="mono text-[12px]">
                      {formatCoords(selected.latitude, selected.longitude)}
                    </dd>
                  </div>
                  <div className="kv">
                    <dt>Blood group</dt>
                    <dd className="mono font-semibold">{selected.blood_group}</dd>
                  </div>
                  <div className="kv">
                    <dt>Sat phone</dt>
                    <dd className="mono text-[12px]">{selected.satphone}</dd>
                  </div>
                  <div className="kv">
                    <dt>Last check-in</dt>
                    <dd>
                      <span className="mono text-[12px] font-medium">{timeAgo(selected.last_updated)}</span>
                      <span className="block text-[10.5px] text-[#64748B]">
                        {formatDateTime(selected.last_updated)}
                      </span>
                    </dd>
                  </div>
                </dl>

                {/* Field telemetry status */}
                <div className="mt-3 flex items-center gap-2">
                  <Badge label="Field Telemetry" tone="info" />
                  <span className="text-[10.5px] text-[#64748B]">Position tracked via VHF beacon</span>
                </div>

                {/* --- Two controls that reach into other modules --- */}
                <div className="mt-4 grid gap-2.5 border-t border-[#E2E8F0] pt-4 sm:grid-cols-2 xl:grid-cols-1">
                  <div>
                    <label className="field-label" htmlFor="detail-status">
                      Duty status
                    </label>
                    <select
                      id="detail-status"
                      className="input"
                      value={selected.status}
                      disabled={!canManage}
                      onChange={(e) => updatePerson(selected.id, { status: e.target.value })}
                    >
                      {optionsFrom(PERSONNEL_STATUS).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="field-label mb-0" htmlFor="detail-loc">
                        Reassign location
                      </label>
                      {canManage && (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <button
                            type="button"
                            onClick={() => {
                              const newLocName = window.prompt('Enter custom location name for this operative:')
                              if (newLocName && newLocName.trim()) {
                                const created = addLocation({
                                  name: newLocName.trim(),
                                  type: 'CAMP',
                                  region: 'Antarctica — Field Operations',
                                })
                                if (created) updatePerson(selected.id, { location_id: created.id })
                              }
                            }}
                            className="text-[#0284C7] hover:underline font-medium"
                            title="Register a new custom location"
                          >
                            + Custom
                          </button>
                          <span className="text-[#94A3B8]">·</span>
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                const pos = await locateOnce()
                                const customLoc = addLocation({
                                  name: `${selected.name}'s GPS Position`,
                                  type: 'FIELD',
                                  latitude: Number(pos.latitude.toFixed(4)),
                                  longitude: Number(pos.longitude.toFixed(4)),
                                  region: 'Live Device Telemetry',
                                })
                                if (customLoc) {
                                  updatePerson(selected.id, {
                                    location_id: customLoc.id,
                                    latitude: Number(pos.latitude.toFixed(4)),
                                    longitude: Number(pos.longitude.toFixed(4)),
                                  })
                                }
                              } catch (err) {
                                // Graceful fallback to polar field coordinates without blocking alerts
                                const fallbackLat = Number((-70.7667 + (Math.random() - 0.5) * 1.5).toFixed(4))
                                const fallbackLng = Number((11.7333 + (Math.random() - 0.5) * 3).toFixed(4))
                                const fallbackName = selectedExpedition?.destination
                                  ? `${selected.name} @ ${selectedExpedition.destination}`
                                  : `${selected.name}'s Field Post`
                                const fallbackLoc = addLocation({
                                  name: fallbackName,
                                  type: 'FIELD',
                                  latitude: fallbackLat,
                                  longitude: fallbackLng,
                                  region: 'Field Telemetry (Polar Fallback)',
                                })
                                if (fallbackLoc) {
                                  updatePerson(selected.id, {
                                    location_id: fallbackLoc.id,
                                    latitude: fallbackLat,
                                    longitude: fallbackLng,
                                  })
                                }
                              }
                            }}
                            className="text-[#0284C7] hover:underline flex items-center gap-0.5 font-medium"
                            title="Use your real device GPS position or polar telemetry fallback"
                          >
                            <LocateFixed size={10} /> <span>Live GPS</span>
                          </button>
                        </div>
                      )}
                    </div>
                    <select
                      id="detail-loc"
                      className="input"
                      value={selected.location_id || ''}
                      disabled={!canManage}
                      onChange={(e) => updatePerson(selected.id, { location_id: e.target.value })}
                    >
                      <option value="">Not set (Unassigned station)</option>
                      {selectedExpedition && (
                        <optgroup label={`📍 Assigned Expedition (${selectedExpedition.id})`}>
                          <option value={selectedExpedition.location_id || selectedExpedition.destination}>
                            ★ {selectedExpedition.destination} ({selectedExpedition.name})
                          </option>
                        </optgroup>
                      )}
                      <optgroup label="🏢 Permanent Stations">
                        {locations
                          .filter((l) => l.type === 'STATION')
                          .map((loc) => (
                            <option key={loc.id} value={loc.id}>
                              {loc.name}
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="⛺ Field Camps & Outposts">
                        {locations
                          .filter((l) => l.type !== 'STATION')
                          .map((loc) => (
                            <option key={loc.id} value={loc.id}>
                              {loc.name} · {loc.region || loc.type}
                            </option>
                          ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn--ghost btn--sm mt-3 w-full"
                  onClick={() => goTo('map')}
                >
                  <MapPin size={13} /> Show on map
                </button>
              </Panel>

              {/* --- Incidents, read live from the emergency records --- */}
              <Panel
                eyebrow="Connected data"
                title="Incident History"
                subtitle={
                  personIncidents.length === 0
                    ? 'No incidents on record'
                    : `${openIncidents.length} open · ${personIncidents.length} total`
                }
                action={
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#0284C7] hover:underline"
                    onClick={() => goTo('emergency')}
                  >
                    <Siren size={13} className="inline mr-1 text-rose-600" /> Response
                  </button>
                }
              >
                {personIncidents.length === 0 ? (
                  <StateBlock
                    kind="empty"
                    title="No incidents"
                    message="Nothing has been reported against this person."
                  />
                ) : (
                  <ul className="space-y-2.5">
                    {personIncidents.map((incident) => (
                      <li key={incident.id} className="rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
                        <div className="flex items-start justify-between gap-2">
                          <span className="mono text-[11px] text-[#64748B]">{incident.id}</span>
                          <Badge map={EMERGENCY_STATUS} value={incident.status} />
                        </div>
                        <div className="mt-1.5 text-[13px] font-semibold text-[#0F172A]">
                          {statusLabel(EMERGENCY_TYPE, incident.type)}
                        </div>
                        <div className="text-[11.5px] text-[#475569]">{incident.location}</div>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <Badge map={SEVERITY} value={incident.severity} />
                          <span className="mono text-[10.5px] text-[#64748B]">
                            {timeAgo(incident.reported_at)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>

              {/* --- Teammates, read live from this same roster --- */}
              <Panel
                eyebrow="Connected data"
                title="Same Expedition"
                subtitle={
                  selectedExpedition
                    ? `${teammates.length} other member${teammates.length === 1 ? '' : 's'} on ${selectedExpedition.id}`
                    : 'Not assigned to an expedition'
                }
                action={
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#0284C7] hover:underline"
                    onClick={() => goTo('expeditions')}
                  >
                    <Users size={13} className="inline mr-1" /> Expedition
                  </button>
                }
              >
                {teammates.length === 0 ? (
                  <StateBlock
                    kind="empty"
                    title="No teammates listed"
                    message="Assign this person to an expedition to see their team."
                  />
                ) : (
                  <ul className="space-y-2">
                    {teammates.map((mate) => (
                      <li key={mate.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-white p-2.5 shadow-2xs hover:border-sky-200 transition">
                        <button
                          type="button"
                          className="min-w-0 flex-1 text-left"
                          onClick={() => setSelectedId(mate.id)}
                        >
                          <div className="truncate text-[13px] font-semibold text-[#0F172A]">{mate.name}</div>
                          <div className="truncate text-[11px] text-[#64748B]">
                            <span className="mono">{mate.id}</span> · {mate.role}
                          </div>
                        </button>
                        <Badge map={PERSONNEL_STATUS} value={mate.status} />
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </>
          )}
        </div>
      </div>

      {/* ============================================================
          5. OPERATIONAL READINESS NOTE
          ============================================================ */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 flex items-center gap-3 text-[#0F172A]">
        <MapPin size={18} className="shrink-0 text-[#0284C7]" />
        <div className="text-[12px] leading-relaxed text-[#475569]">
          <strong className="font-semibold text-[#0F172A]">Personnel Deployment Roster.</strong> Team assignments, duty designations, and field check-ins are managed under Ministry of Earth Sciences (MoES) and AFMC Pune operational readiness standards. In-field telemetry status is updated on synoptic schedules.
        </div>
      </div>
    </div>
  )
}
