/**
 * TOP BAR — POLAR-AI
 * ==================
 * Matches reference design:
 * Left: Location breadcrumb (Maitri Station > Antarctic Research Expedition 2027)
 * Center: Full search bar with shortcut badge
 * Right: Notification bell (3), User profile (Dr. Anjali Kumar), RUN DEMO button
 */

import React from 'react'
import {
  Bell,
  ChevronDown,
  MapPin,
  Menu,
  Play,
  Search,
} from 'lucide-react'
import { useAuth } from '../store/AuthContext'

export default function TopBar({
  onMenuClick,
  onAlertClick,
  onOpenSearch,
  onStartGuidedDemo,
}) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5EDF2] bg-white/95 px-4 sm:px-8 backdrop-blur-md">
      {/* LEFT: Mobile Toggle + Location Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden transition shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
            <MapPin size={17} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-sm font-bold text-[#0F172A] truncate">
              <span>Maitri Station</span>
              <span className="text-slate-400 font-normal">›</span>
            </div>
            <div className="text-[11px] text-slate-500 truncate hidden xs:block">
              Antarctic Research Expedition 2027
            </div>
          </div>
        </div>
      </div>

      {/* CENTER: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-[#F8FAFC] px-3.5 py-2 text-xs text-slate-400 hover:border-slate-300 hover:bg-white transition cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Search size={15} className="text-slate-400 shrink-0" />
            <span className="truncate text-slate-400">
              Search cargo, inventory, people, assets...
            </span>
          </div>
          <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 shrink-0 shadow-2xs">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* RIGHT: Notifications, Profile, RUN DEMO */}
      <div className="flex items-center gap-3.5 shrink-0">
        {/* Notifications / Incidents Alert (Badge: 3) */}
        <button
          type="button"
          onClick={onAlertClick}
          className="relative rounded-xl border border-slate-200/80 bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition shadow-2xs"
          title="3 Active alerts"
        >
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-2xs">
            3
          </span>
        </button>

        {/* User Profile Avatar & Role */}
        <div className="hidden sm:flex items-center gap-2.5 pl-1">
          {/* Circular Avatar */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-white shadow-2xs">
            AK
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-900 leading-tight">
              Dr. Anjali Kumar
            </div>
            <div className="text-[11px] text-slate-500 leading-tight flex items-center gap-1">
              <span>Expedition Officer</span>
              <ChevronDown size={11} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Prominent RUN DEMO Button */}
        {onStartGuidedDemo && (
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold px-4 py-2 text-xs shadow-xs transition active:scale-95"
            title="Start step-by-step guided demonstration"
          >
            <Play size={12} className="fill-white" />
            <span>RUN DEMO</span>
          </button>
        )}
      </div>
    </header>
  )
}
