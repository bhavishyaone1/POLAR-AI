/**
 * MISSION MEMORY PAGE — POLAR-AI ADAPTIVE LEARNING
 * ==================================================
 * Displays:
 *  1. Top historical match summary ("Your mission is most similar to Maitri-8")
 *  2. Pattern-matched risk predictions with confidence % and evidence
 *  3. Full historical expedition archive (collapsible)
 *  4. Lessons Learned Library (filterable by category)
 */

import React, { useState, useMemo } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BookMarked,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Flame,
  History,
  Package,
  ShieldCheck,
  Sliders,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { HISTORICAL_EXPEDITIONS, INCIDENT_FREQUENCY } from '../data/historicalExpeditions'
import {
  getPredictions,
  getSimilarMissions,
  getAllLessons,
  getCategoryIcon,
  getConfidenceLabel,
} from '../lib/missionMemory'

/* Current mission state — derived from the live demo data */
const CURRENT_STATE = {
  fuel_days_remaining: 12,
  cargo_delay_days: 5,
  season: 'Winter',
  ambient_temp_celsius: -38,
  personnel_count: 24,
  generator_service_overdue: false,
  station: 'Maitri',
}

const LESSON_FILTER_OPTIONS = ['all', 'fuel', 'cargo', 'equipment', 'medical', 'personnel', 'inventory']

const CATEGORY_COLORS = {
  fuel: 'bg-rose-50 border-rose-200 text-rose-800',
  cargo: 'bg-blue-50 border-blue-200 text-blue-800',
  equipment: 'bg-amber-50 border-amber-200 text-amber-800',
  medical: 'bg-green-50 border-green-200 text-green-800',
  personnel: 'bg-purple-50 border-purple-200 text-purple-800',
  inventory: 'bg-orange-50 border-orange-200 text-orange-800',
  emergency: 'bg-rose-50 border-rose-200 text-rose-900',
}

const OUTCOME_LABELS = {
  COMPLETED_SMOOTHLY: { label: 'Completed Smoothly', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  COMPLETED_WITH_INCIDENTS: { label: 'Incidents Recorded', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  ABORTED: { label: 'Aborted', color: 'text-rose-700 bg-rose-50 border-rose-200' },
}

export default function MissionMemory({ goTo }) {
  const [expandedExpedition, setExpandedExpedition] = useState(null)
  const [lessonFilter, setLessonFilter] = useState('all')
  const [lessonSearch, setLessonSearch] = useState('')

  const predictions = useMemo(() => getPredictions(CURRENT_STATE), [])
  const similarMissions = useMemo(() => getSimilarMissions(CURRENT_STATE), [])
  const allLessons = useMemo(() => getAllLessons(), [])

  const filteredLessons = useMemo(() => {
    return allLessons.filter((l) => {
      const matchesFilter = lessonFilter === 'all' || l.category === lessonFilter || (l.lesson_tags || []).includes(lessonFilter)
      const matchesSearch =
        !lessonSearch ||
        l.lesson.toLowerCase().includes(lessonSearch.toLowerCase()) ||
        l.incident_title.toLowerCase().includes(lessonSearch.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [allLessons, lessonFilter, lessonSearch])

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-8">

      {/* ============================================================
          PAGE HEADER
          ============================================================ */}
      <header className="border-b border-[#DCE8F0] pb-5 space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-7 w-7 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                <History size={15} />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7]">
                Mission Memory · Adaptive Intelligence
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0C1E30]">
              Mission Memory
            </h1>
            <p className="text-xs text-[#42586E] mt-1 max-w-xl leading-relaxed">
              POLAR-AI has studied <strong>6 past polar expeditions (2018–2024)</strong>. It recognizes patterns that
              match your current mission state and alerts you before history repeats itself.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo('risks')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE8F0] bg-white hover:bg-[#F0F7FB] text-[#0C1E30] font-semibold px-3.5 py-2 text-xs shadow-xs transition"
            >
              <AlertTriangle size={13} />
              <span>View Risks</span>
            </button>
            <button
              type="button"
              onClick={() => goTo('copilot')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold px-3.5 py-2 text-xs shadow-xs transition"
            >
              <Sparkles size={13} />
              <span>Ask AI Copilot</span>
            </button>
          </div>
        </div>

        {/* Current state summary strip */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] font-mono">
          <span className="text-[#6E8294]">Matching against:</span>
          <span className="bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 rounded-full font-bold">Fuel: 12d runway</span>
          <span className="bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-bold">Cargo: +5d delay</span>
          <span className="bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] px-2 py-0.5 rounded-full font-bold">Winter Season</span>
          <span className="bg-[#F4F8FA] border border-[#DCE8F0] text-[#42586E] px-2 py-0.5 rounded-full">−38°C ambient</span>
          <span className="bg-[#F4F8FA] border border-[#DCE8F0] text-[#42586E] px-2 py-0.5 rounded-full">24 personnel</span>
        </div>
      </header>

      {/* ============================================================
          SECTION 1 — SIMILAR PAST MISSIONS
          ============================================================ */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0284C7] block">Historical Benchmark</span>
          <h2 className="text-lg font-bold text-[#0C1E30] mt-0.5">Most Similar Past Expeditions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {similarMissions.length > 0 ? (
            similarMissions.map((exp) => {
              const outcomeInfo = OUTCOME_LABELS[exp.outcome] || OUTCOME_LABELS.COMPLETED_WITH_INCIDENTS
              return (
                <div key={exp.id} className="rounded-2xl border border-[#DCE8F0] bg-white p-5 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#0284C7] uppercase tracking-wider">{exp.year}</div>
                      <h3 className="text-sm font-bold text-[#0C1E30] mt-0.5 leading-snug">{exp.name}</h3>
                      <p className="text-[11px] text-[#6E8294] mt-0.5">{exp.station}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="flex items-center gap-1 text-[#0284C7]">
                        <TrendingUp size={13} />
                        <span className="text-base font-extrabold font-mono">{exp.similarity}%</span>
                      </div>
                      <span className="text-[10px] text-[#6E8294] font-mono">similarity</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className={`px-2 py-0.5 rounded-full border font-semibold ${outcomeInfo.color}`}>
                      {outcomeInfo.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-[#DCE8F0] bg-[#F4F8FA] text-[#42586E]">
                      {exp.season} · {exp.personnel_count} personnel
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-[#DCE8F0] bg-[#F4F8FA] text-[#42586E]">
                      {exp.duration_days}d duration
                    </span>
                  </div>

                  <p className="text-xs text-[#42586E] leading-relaxed border-t border-[#F1F5F9] pt-3">
                    {exp.summary}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-[#42586E]">
                    <span className="font-semibold">{exp.incidents.length} incident{exp.incidents.length !== 1 ? 's' : ''} recorded.</span>
                    <span>Commander: {exp.commander}</span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-2 rounded-2xl border border-[#DCE8F0] bg-[#F8FAFC] p-6 text-center text-xs text-[#6E8294]">
              No close historical matches found for current mission parameters.
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — PATTERN-MATCHED PREDICTIONS
          ============================================================ */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0284C7] block">Predictive Intelligence</span>
          <h2 className="text-lg font-bold text-[#0C1E30] mt-0.5">Pattern-Matched Risk Predictions</h2>
          <p className="text-xs text-[#42586E] mt-1">
            Based on matching your current mission state against historical incident preconditions from all 6 past expeditions.
          </p>
        </div>

        {predictions.length > 0 ? (
          <div className="space-y-4">
            {predictions.map((pred, i) => {
              const freqInfo = INCIDENT_FREQUENCY[pred.category]
              const isHighConf = pred.confidence >= 60
              const catColor = CATEGORY_COLORS[pred.category] || 'bg-slate-50 border-slate-200 text-slate-800'
              return (
                <div
                  key={pred.category}
                  className={`rounded-2xl border p-5 sm:p-6 shadow-xs space-y-4 ${
                    i === 0 ? 'border-rose-200 bg-white' : 'border-[#DCE8F0] bg-white'
                  }`}
                >
                  {/* Prediction Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xl">{getCategoryIcon(pred.category)}</span>
                        <span
                          className={`text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${catColor}`}
                        >
                          {pred.category.toUpperCase()} RISK
                        </span>
                        {i === 0 && (
                          <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                            TOP MATCH
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-[#0C1E30] capitalize">
                        {pred.incident.title}
                      </h3>
                    </div>

                    {/* Confidence Ring */}
                    <div className="text-right shrink-0">
                      <div className={`text-2xl font-extrabold font-mono ${isHighConf ? 'text-rose-600' : 'text-amber-600'}`}>
                        {pred.confidence}%
                      </div>
                      <div className="text-[10px] text-[#6E8294] font-mono">{getConfidenceLabel(pred.confidence)} confidence</div>
                    </div>
                  </div>

                  {/* Matched Conditions */}
                  <div className="space-y-2">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#6E8294]">
                      Matched Conditions ({pred.matchedConditions.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pred.matchedConditions.map((cond) => (
                        <span
                          key={cond}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] font-semibold"
                        >
                          ✓ {cond}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Historical Evidence */}
                  <div className="rounded-xl bg-[#F8FAFC] border border-[#DCE8F0] p-4 space-y-2">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#6E8294]">
                      Historical Evidence
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pred.expeditions.map((exp, ei) => (
                        <span
                          key={ei}
                          className="text-[11px] px-2 py-0.5 rounded-full border border-[#DCE8F0] bg-white text-[#42586E] font-mono"
                        >
                          {exp.name.split(' ').slice(0, 2).join(' ')} ({exp.year})
                        </span>
                      ))}
                    </div>
                    {freqInfo && (
                      <p className="text-xs text-[#42586E] font-semibold">
                        📖 {freqInfo.label} recorded this risk category.
                      </p>
                    )}
                  </div>

                  {/* What happened + Recommended action */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-700">What Happened Historically</span>
                      <p className="text-amber-900 leading-relaxed">{pred.incident.impact}</p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-emerald-700">Proven Resolution</span>
                      <p className="text-emerald-900 leading-relaxed">{pred.incident.resolution}</p>
                    </div>
                  </div>

                  {/* Lesson */}
                  <div className="rounded-xl bg-[#E0F2FE] border border-[#BAE6FD] p-3.5">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#0284C7] block mb-1">Lesson Learned</span>
                    <p className="text-xs text-[#0C1E30] leading-relaxed">"{pred.lessons[0]}"</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-[#F1F5F9]">
                    <button
                      type="button"
                      onClick={() => goTo('simulator')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] hover:underline"
                    >
                      <Sliders size={12} />
                      Simulate Scenario
                      <ArrowRight size={11} />
                    </button>
                    <span className="text-[#DCE8F0]">·</span>
                    <button
                      type="button"
                      onClick={() => goTo('copilot')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] hover:underline"
                    >
                      <Sparkles size={12} />
                      Ask AI Copilot
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-2">
            <ShieldCheck size={24} className="text-emerald-600 mx-auto" />
            <p className="text-sm font-semibold text-emerald-800">No pattern matches found</p>
            <p className="text-xs text-emerald-700">Current mission state does not match historical incident preconditions. Continue monitoring.</p>
          </div>
        )}
      </section>

      {/* ============================================================
          SECTION 3 — FULL EXPEDITION ARCHIVE
          ============================================================ */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0284C7] block">Expedition Archive</span>
          <h2 className="text-lg font-bold text-[#0C1E30] mt-0.5">6 Historical Expeditions</h2>
          <p className="text-xs text-[#42586E] mt-1">Full incident logs from all past Antarctic and Arctic missions. Click to expand.</p>
        </div>

        <div className="space-y-3">
          {HISTORICAL_EXPEDITIONS.map((exp) => {
            const isOpen = expandedExpedition === exp.id
            const outcomeInfo = OUTCOME_LABELS[exp.outcome] || OUTCOME_LABELS.COMPLETED_WITH_INCIDENTS
            return (
              <div key={exp.id} className="rounded-2xl border border-[#DCE8F0] bg-white shadow-xs overflow-hidden">
                {/* Expedition Header Row */}
                <button
                  type="button"
                  onClick={() => setExpandedExpedition(isOpen ? null : exp.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-[#F8FAFC] transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                      <BookOpen size={15} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-[#0C1E30] truncate">{exp.name}</span>
                        <span className="text-[10px] font-mono text-[#6E8294]">{exp.year}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${outcomeInfo.color}`}>
                          {outcomeInfo.label}
                        </span>
                        <span className="text-[11px] text-[#6E8294]">{exp.station}</span>
                        <span className="text-[11px] text-[#6E8294]">{exp.incidents.length} incidents</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#6E8294]">
                      <Users size={12} />
                      <span>{exp.personnel_count}</span>
                      <Clock size={12} />
                      <span>{exp.duration_days}d</span>
                    </div>
                    {isOpen ? <ChevronDown size={16} className="text-[#6E8294]" /> : <ChevronRight size={16} className="text-[#6E8294]" />}
                  </div>
                </button>

                {/* Expanded Incident Log */}
                {isOpen && (
                  <div className="border-t border-[#DCE8F0] p-4 sm:p-5 space-y-4">
                    <p className="text-xs text-[#42586E] leading-relaxed">{exp.summary}</p>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-[#6E8294] border-b border-[#F1F5F9] pb-3">
                      <span>Commander: {exp.commander}</span>
                      <span>·</span>
                      <span>Avg continuity score: {exp.continuity_score_avg}%</span>
                      <span>·</span>
                      <span>Lowest: {exp.continuity_score_min}%</span>
                    </div>

                    <div className="space-y-3">
                      {exp.incidents.map((inc) => {
                        const catColor = CATEGORY_COLORS[inc.category] || 'bg-slate-50 border-slate-200 text-slate-800'
                        return (
                          <div key={inc.id} className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-4 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${catColor}`}>
                                  {inc.category.toUpperCase()}
                                </span>
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                  inc.severity === 'CRITICAL' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                                  inc.severity === 'HIGH' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                  'bg-yellow-50 border-yellow-200 text-yellow-700'
                                }`}>
                                  {inc.severity}
                                </span>
                                <span className="text-sm font-bold text-[#0C1E30]">{inc.title}</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#6E8294]">Week {inc.week}</span>
                            </div>

                            <p className="text-xs text-[#42586E] leading-relaxed">{inc.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <div className="rounded-lg bg-amber-50 border border-amber-200 p-2.5">
                                <span className="text-[10px] font-bold text-amber-700 uppercase block">Impact</span>
                                <span className="text-amber-900">{inc.impact}</span>
                              </div>
                              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2.5">
                                <span className="text-[10px] font-bold text-emerald-700 uppercase block">Resolution ({inc.resolution_time_hours}h)</span>
                                <span className="text-emerald-900">{inc.resolution}</span>
                              </div>
                            </div>

                            <div className="rounded-lg bg-[#E0F2FE] border border-[#BAE6FD] p-2.5 text-xs">
                              <span className="text-[10px] font-bold text-[#0284C7] uppercase block mb-0.5">Lesson Learned</span>
                              <span className="text-[#0C1E30]">{inc.lesson}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — LESSONS LEARNED LIBRARY
          ============================================================ */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0284C7] block">Knowledge Base</span>
          <h2 className="text-lg font-bold text-[#0C1E30] mt-0.5">Lessons Learned Library</h2>
          <p className="text-xs text-[#42586E] mt-1">
            {allLessons.length} lessons extracted from 6 expeditions. Filter by category or search.
          </p>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-2">
          {LESSON_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setLessonFilter(opt)}
              className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition ${
                lessonFilter === opt
                  ? 'bg-[#0284C7] border-[#0284C7] text-white'
                  : 'bg-white border-[#DCE8F0] text-[#42586E] hover:bg-[#F0F7FB]'
              }`}
            >
              {opt === 'all' ? 'All Categories' : opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
          <input
            type="text"
            value={lessonSearch}
            onChange={(e) => setLessonSearch(e.target.value)}
            placeholder="Search lessons..."
            className="text-xs px-3 py-1.5 rounded-full border border-[#DCE8F0] bg-white text-[#0C1E30] placeholder-[#6E8294] focus:outline-none focus:border-[#0284C7] min-w-[180px]"
          />
        </div>

        {/* Lessons List */}
        <div className="space-y-3">
          {filteredLessons.length > 0 ? (
            filteredLessons.map((l, idx) => {
              const catColor = CATEGORY_COLORS[l.category] || 'bg-slate-50 border-slate-200 text-slate-800'
              return (
                <div key={idx} className="rounded-xl border border-[#DCE8F0] bg-white p-4 space-y-2 shadow-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${catColor}`}>
                      {l.category?.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-semibold text-[#0C1E30]">{l.incident_title}</span>
                    <span className="text-[10px] text-[#6E8294] font-mono ml-auto">
                      {l.expedition_name.split(' ').slice(0, 2).join(' ')} · {l.year}
                    </span>
                  </div>
                  <p className="text-xs text-[#42586E] leading-relaxed">"{l.lesson}"</p>
                  {l.lesson_tags && (
                    <div className="flex flex-wrap gap-1">
                      {l.lesson_tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[#F4F8FA] border border-[#DCE8F0] text-[#6E8294] font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="rounded-xl border border-[#DCE8F0] bg-[#F8FAFC] p-5 text-center text-xs text-[#6E8294]">
              No lessons match your filter.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
