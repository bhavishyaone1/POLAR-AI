/**
 * CONTEXTUAL AI MISSION INSIGHT COMPONENT
 * =======================================
 * High-trust, calm, scientific intelligence banner embedded contextually
 * on operational pages (Cargo, Inventory, Assets, Expeditions).
 * Highlights emerging risks and offers 1-click sandbox or Copilot mitigation paths.
 */

import React from 'react'
import {
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  FileSearch,
  Flame,
  ShieldAlert,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react'

export default function ContextualAiInsight({
  badge = 'AI MISSION CONTINUITY ADVISORY',
  title,
  description,
  metrics = [],
  primaryAction,
  secondaryAction,
  tertiaryAction,
  type = 'insight', // 'insight' | 'warning' | 'critical'
}) {
  const isCritical = type === 'critical'

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 shadow-xs transition-all ${
        isCritical
          ? 'border-rose-200 bg-rose-50/50 hover:border-rose-300'
          : 'border-[#BFDDE7] bg-white hover:border-[#1597D4]/40'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left icon & narrative */}
        <div className="flex items-start gap-3.5 min-w-0">
          <div
            className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              isCritical
                ? 'bg-rose-100 text-rose-700'
                : 'bg-[#EAF6FA] text-[#1597D4]'
            }`}
          >
            {isCritical ? <AlertTriangle size={18} /> : <Sparkles size={18} />}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`text-[10.5px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                  isCritical
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-[#EAF6FA] text-[#1597D4]'
                }`}
              >
                ✦ {badge}
              </span>
              {metrics.map((m, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-[#DCEAF1] bg-[#F7FBFD] px-2 py-0.5 text-[10.5px] font-mono font-semibold text-[#102A43]"
                >
                  {m.label}: <strong className="text-[#1597D4]">{m.value}</strong>
                </span>
              ))}
            </div>

            <h3 className="text-sm font-bold text-[#102A43] tracking-tight">{title}</h3>
            <p className="mt-0.5 text-xs text-[#526779] leading-relaxed max-w-4xl">{description}</p>
          </div>
        </div>

        {/* Right action buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start lg:self-center">
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold shadow-xs transition ${
                isCritical
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-[#1597D4] hover:bg-[#1282b8] text-white'
              }`}
            >
              {primaryAction.icon || <Zap size={13} />}
              <span>{primaryAction.label}</span>
            </button>
          )}

          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCEAF1] bg-white px-3.5 py-2 text-xs font-semibold text-[#102A43] hover:bg-[#F0F8FB] transition shadow-xs"
            >
              {secondaryAction.icon || <Sparkles size={13} className="text-[#1597D4]" />}
              <span>{secondaryAction.label}</span>
            </button>
          )}

          {tertiaryAction && (
            <button
              type="button"
              onClick={tertiaryAction.onClick}
              className="inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-semibold text-[#526779] hover:text-[#102A43] transition"
            >
              <span>{tertiaryAction.label}</span>
              <ChevronRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
