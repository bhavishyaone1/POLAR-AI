/**
 * TOP BAR — PREMIUM MINIMAL ARCTIC AESTHETIC
 * ===========================================
 * Section 7:
 * Left: Current Expedition ("Antarctic Research Expedition 2027")
 * Center: System status ("● SYSTEM ONLINE")
 * Right: RUN DEMO, Notifications, Profile
 */

import React, { useState, useEffect } from 'react'
import {
  Bell,
  Compass,
  Menu,
  Play,
  Search,
  Shield,
  User,
} from 'lucide-react'
import { useData } from '../store/DataContext'
import { useAuth } from '../store/AuthContext'

export default function TopBar({
  onMenuClick,
  onAlertClick,
  onOpenSearch,
  onStartGuidedDemo,
}) {
  const { emergencies } = useData()
  const { user } = useAuth()

  const openIncidentsCount = (emergencies || []).filter((e) => e.status !== 'RESOLVED').length

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--line)] bg-[var(--surface-card)]/95 px-3 sm:px-8 backdrop-blur-md">
      {/* LEFT: Mobile Menu + Current Expedition */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-[var(--ink-mid)] hover:bg-[var(--surface-secondary)] hover:text-[var(--ink-hi)] lg:hidden transition shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <div className="hidden sm:flex h-7 w-7 rounded-lg bg-[var(--surface-ice)] border border-[var(--line)] text-[var(--ice)] items-center justify-center shrink-0">
            <Compass size={14} />
          </div>
          <div className="min-w-0">
            <div className="hidden xs:flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[var(--ink-low)]">
              <span>Expedition 2027</span>
            </div>
            <div className="truncate text-xs sm:text-sm font-semibold text-[var(--ink-hi)] max-w-[120px] xs:max-w-[170px] sm:max-w-none">
              Maitri Station
            </div>
          </div>
        </div>
      </div>

      {/* CENTER: System Status Indicator */}
      <div className="hidden md:flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-ice)] px-3 py-1 text-xs">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ice)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--ice)]" />
        </span>
        <span className="font-mono text-[11px] font-semibold text-[var(--ink-hi)] tracking-wide uppercase">
          SYSTEM ONLINE
        </span>
        <span className="text-[var(--ink-low)]">·</span>
        <span className="text-[11px] text-[var(--ink-mid)]">Maitri Telemetry Active</span>
      </div>

      {/* RIGHT: RUN DEMO, Search, Alert Bell, Profile */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Quick Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface-base)] px-2.5 py-1.5 text-xs text-[var(--ink-mid)] hover:border-[var(--line-hover)] hover:text-[var(--ink-hi)] transition"
          title="Command Palette (Ctrl+K)"
        >
          <Search size={13} className="text-[var(--ice)]" />
          <span className="text-[11px]">Search...</span>
          <kbd className="rounded border border-[var(--line)] bg-white px-1 py-0.2 text-[9px] font-mono text-[var(--ink-low)]">
            ⌘K
          </kbd>
        </button>

        {/* Prominent RUN DEMO Button */}
        {onStartGuidedDemo && (
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--ice)] hover:bg-[#3F96B2] text-white font-semibold px-3 py-1.5 text-xs shadow-xs transition active:scale-95"
            title="Start step-by-step guided demonstration"
          >
            <Play size={12} className="fill-white" />
            <span>RUN DEMO</span>
          </button>
        )}

        {/* Notifications / Incidents Alert */}
        <button
          type="button"
          onClick={onAlertClick}
          className="relative rounded-lg border border-[var(--line)] bg-white p-1.5 text-[var(--ink-mid)] hover:bg-[var(--surface-secondary)] hover:text-[var(--ink-hi)] transition"
          title={openIncidentsCount > 0 ? `${openIncidentsCount} active incidents` : 'Notifications'}
        >
          <Bell size={15} />
          {openIncidentsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--amber)] text-[9px] font-bold text-white">
              {openIncidentsCount}
            </span>
          )}
        </button>

        {/* Profile Pill */}
        <div className="flex items-center gap-2 pl-1">
          <div className="h-7 w-7 rounded-lg bg-[var(--surface-ice)] border border-[var(--line)] text-[var(--ink-hi)] flex items-center justify-center font-bold text-xs shrink-0">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'PO'}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-[var(--ink-hi)] leading-tight truncate max-w-[100px]">
              {user?.name || 'Operator'}
            </div>
            <div className="text-[10px] text-[var(--ink-low)] font-mono leading-tight">
              {user?.role || 'Mission Officer'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
