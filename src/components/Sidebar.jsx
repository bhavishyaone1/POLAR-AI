/**
 * SIDEBAR — CLEAN ARCTIC WHITE SPECIFICATION
 * ===========================================
 * Section 6:
 * Logo: POLAR-AI
 * 8 Navigation Items:
 * - Overview
 * - Expedition
 * - Cargo
 * - Inventory
 * - Assets
 * - Mission Risk
 * - Simulator
 * - AI Copilot
 *
 * Selected nav item:
 * Very light ice-blue background + ice-blue icon + dark text.
 * Clean, lightweight, professional.
 */

import React from 'react'
import {
  AlertTriangle,
  Boxes,
  Bot,
  Compass,
  Cpu,
  LayoutDashboard,
  LogOut,
  Package,
  Radio,
  Sliders,
  Sparkles,
  X,
} from 'lucide-react'
import { NAV_GROUPS, NAV_ITEMS } from '../lib/navigation'
import { useData } from '../store/DataContext'
import { useAuth } from '../store/AuthContext'
import PolarLogo from './PolarLogo'

export default function Sidebar({ view, onNavigate, open, onClose }) {
  const { stats } = useData()
  const { user, role, signOut } = useAuth()

  const counts = {
    inventory: stats.lowStockCount,
    cargo: stats.cargoDelayed,
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[260px] max-w-[85vw] flex-col border-r
          bg-[var(--surface-card)] transition-transform duration-250 ease-in-out
          lg:sticky lg:bottom-auto lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:w-[240px]
          ${open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
        style={{ borderColor: 'var(--line)' }}
      >
        {/* ---------- Logo & Brand ---------- */}
        <div
          className="flex items-center justify-between border-b px-5 py-4"
          style={{ borderColor: 'var(--line)' }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <PolarLogo size={24} withGlow={false} className="shrink-0 text-[var(--ice)]" />
            <div>
              <div className="font-display text-sm font-bold tracking-tight text-[var(--ink-hi)]">
                POLAR-AI
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--ink-low)]">
                Mission Intelligence
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--ink-mid)] hover:text-[var(--ink-hi)] lg:hidden"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* ---------- 8 Primary Navigation Items ---------- */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {NAV_GROUPS.map((group) => {
            const items = NAV_ITEMS.filter((item) => item.group === group && !item.hidden)
            if (items.length === 0) return null

            return (
              <div key={group} className="space-y-1">
                <div className="px-3 pb-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--ink-low)]">
                  {group}
                </div>

                {items.map((item) => {
                  const Icon = item.icon
                  const isActive = view === item.id || (item.id === 'dashboard' && view === 'landing')
                  const count = counts[item.id]

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onNavigate(item.id)
                        if (onClose) onClose()
                      }}
                      className={`
                        flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition
                        ${
                          isActive
                            ? 'bg-[var(--surface-ice)] text-[var(--ink-hi)] font-semibold border border-[var(--line)] shadow-2xs'
                            : 'text-[var(--ink-mid)] hover:bg-[var(--surface-secondary)] hover:text-[var(--ink-hi)]'
                        }
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.75}
                        className={isActive ? 'text-[var(--ice)]' : 'text-[var(--ink-low)]'}
                      />
                      <span className="flex-1 text-left truncate">{item.label}</span>

                      {count > 0 && (
                        <span className="rounded-full bg-amber-50 border border-amber-200 px-1.5 py-0.2 text-[9px] font-mono font-bold text-amber-700">
                          {count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </nav>

        {/* ---------- Footer Status Strip ---------- */}
        <div
          className="border-t p-3.5 space-y-2 bg-[var(--surface-base)]"
          style={{ borderColor: 'var(--line)' }}
        >
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-[var(--ink-low)] uppercase">Station Telemetry</span>
            <span className="inline-flex items-center gap-1 text-[var(--green)] font-semibold">
              <Radio size={10} className="animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--ink-mid)]">
            <span className="truncate">Maitri Station · MoES</span>
            <button
              type="button"
              onClick={signOut}
              className="p-1 text-[var(--ink-low)] hover:text-[var(--ink-hi)] transition rounded"
              title="Sign out"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
