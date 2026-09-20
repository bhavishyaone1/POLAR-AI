/**
 * TOP BAR — POLAR-AI MISSION CONTROL
 * ===================================
 * Arctic White + Polar Ice header with fully interactive controls:
 * 1. Location Selector (Left):
 *    - Clickable station/theatre selector (Maitri, Bharati, Himadri, Goa HQ, Cape Town)
 *    - Displays coordinates, temperature, personnel count, and direct shortcuts to Map, Weather, and Personnel
 * 2. Search Bar (Center):
 *    - ⌘K Command Palette launcher
 * 3. Notifications & Alarms (Right):
 *    - Active incident counter with link to Emergency Room
 * 4. Authenticated Operator Profile (Right):
 *    - Displays real user name, initials, and role
 *    - Dropdown with 1-click Operator Switching, Audit Log link, and Sign Out to Welcome Login
 * 5. Guided Demo Launcher:
 *    - RUN DEMO trigger
 */

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Bell,
  Check,
  ChevronDown,
  CloudSun,
  Compass,
  FileText,
  LogOut,
  Map as MapIcon,
  MapPin,
  Menu,
  Play,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  WifiOff,
  X,
} from 'lucide-react'
import { useAuth } from '../store/AuthContext'
import { useData } from '../store/DataContext'
import { USERS } from '../lib/credentials'
import { useOffline } from '../hooks/useOffline'

export { POLAR_STATIONS } from '../data/stationProfiles'
import { POLAR_STATIONS } from '../data/stationProfiles'

export default function TopBar({
  onMenuClick,
  onAlertClick,
  onOpenSearch,
  onStartGuidedDemo,
  goTo,
}) {
  const { user, signIn, signOut, roleLabel } = useAuth()
  const { emergencies, activeStationId, activeStation, selectStation } = useData()
  const { isOffline } = useOffline()
  const hasAlert = (emergencies || []).some(
    (e) => e.status !== 'RESOLVED' && e.status !== 'Resolved'
  )

  // Location Dropdown State
  const selectedStationId = activeStationId || 'maitri'
  const selectedStation = activeStation || POLAR_STATIONS[0]
  const [locationOpen, setLocationOpen] = useState(false)
  const locationRef = useRef(null)

  // Profile Dropdown State
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  // AI Monitoring Center Popover State
  const [aiMonitoringOpen, setAiMonitoringOpen] = useState(false)
  const aiMonitoringRef = useRef(null)

  // Compute initials from user name
  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
    : 'OP'

  // Mobile-specific interactive states (< 768px)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileSearchQuery, setMobileSearchQuery] = useState('')
  const [mobileStationOpen, setMobileStationOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)
  const [mobileAiOpen, setMobileAiOpen] = useState(false)

  // Persist selected station
  const handleSelectStation = (stationId) => {
    if (selectStation) {
      selectStation(stationId)
    }
    setLocationOpen(false)
    setMobileStationOpen(false)
  }

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
      if (aiMonitoringRef.current && !aiMonitoringRef.current.contains(event.target)) {
        setAiMonitoringOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close all mobile sheets on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMobileSearchOpen(false)
        setMobileStationOpen(false)
        setMobileAiOpen(false)
        setMobileProfileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when any mobile modal sheet is open
  useEffect(() => {
    const anyOpen = mobileSearchOpen || mobileStationOpen || mobileAiOpen || mobileProfileOpen
    if (anyOpen && typeof document !== 'undefined') {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [mobileSearchOpen, mobileStationOpen, mobileAiOpen, mobileProfileOpen])

  // Quick switch to a demo role
  const handleQuickSwitchRole = (userId, password) => {
    setProfileOpen(false)
    setMobileProfileOpen(false)
    signIn({ userId, password })
  }

  // Safe Portal renderer for mobile overlay drawers
  const renderInPortal = (content) => {
    if (typeof document !== 'undefined' && document.body) {
      return createPortal(content, document.body)
    }
    return content
  }

  return (
    <>
      {/* DESKTOP / TABLET HEADER (LOCKED & UNTOUCHED for >= 768px) */}
      <header className="sticky top-0 z-30 hidden md:flex h-16 items-center justify-between border-b border-[#E5EDF2] bg-white/95 px-4 sm:px-8 backdrop-blur-md">
      {/* ============================================================
          LEFT: Mobile Menu Toggle + Interactive Location Dropdown
          ============================================================ */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden transition shrink-0 active:scale-95"
          aria-label="Open navigation menu"
        >
          <Menu size={19} />
          {hasAlert && (
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-600" />
            </span>
          )}
        </button>

        {/* Tablet (< lg) Home / Dashboard Button */}
        <button
          type="button"
          onClick={() => {
            if (goTo) goTo('dashboard')
          }}
          className="lg:hidden flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100/80 transition cursor-pointer text-left shrink-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40"
          aria-label="Go to Dashboard"
          title="Go to Dashboard"
        >
          <div className="shrink-0 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <polygon points="20,4 32,32 8,32" fill="#0284C7" />
              <polygon points="20,4 26,32 8,32" fill="#38BDF8" opacity="0.85" />
              <polygon points="28,14 38,32 18,32" fill="#0EA5E9" opacity="0.65" />
              <polygon points="12,18 22,32 2,32" fill="#7DD3FC" opacity="0.75" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-[#0C1E30] tracking-tight hidden sm:inline">
            POLAR-AI
          </span>
        </button>

        {/* Interactive Location Switcher */}
        <div className="relative" ref={locationRef}>
          <button
            type="button"
            onClick={() => {
              setLocationOpen(!locationOpen)
              setProfileOpen(false)
            }}
            className="flex items-center gap-2.5 rounded-xl p-1 sm:p-1.5 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition text-left group"
            title="Click to switch active polar station or view theatre details"
          >
            <div className="h-9 w-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 group-hover:bg-[#BAE6FD] transition">
              <MapPin size={17} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#0F172A] truncate">
                <span>{selectedStation.name}</span>
                <ChevronDown
                  size={13}
                  className={`text-slate-400 group-hover:text-slate-700 transition-transform ${
                    locationOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div className="text-[11px] text-slate-500 truncate hidden xs:block flex items-center gap-1.5">
                {isOffline ? (
                  <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                    <WifiOff size={10} />
                    Field Mode · Offline
                  </span>
                ) : (
                  selectedStation.sub
                )}
              </div>
            </div>
          </button>

          {/* Location / Station Selector Dropdown */}
          {locationOpen && (
            <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl border border-[#DDEAF0] bg-white p-3 shadow-2xl z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-[#DDEAF0] pb-2.5 px-1.5">
                <div className="flex items-center gap-2">
                  <Compass size={15} className="text-[#0284C7]" />
                  <span className="text-[12px] font-semibold text-[#0C1E30] tracking-tight">
                    Operational Theatres &amp; Bases
                  </span>
                </div>
                <span className="rounded-md bg-[#E0F2FE] px-2 py-0.5 font-mono text-[10px] font-medium text-[#0284C7]">
                  5 Stations
                </span>
              </div>

              {/* Station List */}
              <div className="mt-2 space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                {POLAR_STATIONS.map((station) => {
                  const isSelected = station.id === selectedStationId
                  return (
                    <div
                      key={station.id}
                      onClick={() => handleSelectStation(station.id)}
                      className={`group cursor-pointer rounded-xl border p-2.5 transition ${
                        isSelected
                          ? 'border-[#1597D4] bg-[#F0F8FD]'
                          : 'border-transparent hover:border-[#DDEAF0] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-[#12263A]">
                            <span className="truncate">{station.name}</span>
                            {isSelected && (
                              <Check size={13} className="text-[#1597D4] shrink-0" />
                            )}
                          </div>
                          <div className="text-[10px] text-[#4A6572] truncate">
                            {station.region}
                          </div>
                        </div>
                        <span className="rounded bg-white border border-[#DDEAF0] px-1.5 py-0.5 text-[9.5px] font-mono text-[#1597D4] shrink-0">
                          {station.temp}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#8FA6B2]">
                        <span>{station.coords}</span>
                        <span className="text-[#4A6572] font-semibold">{station.crew} Deployed</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Station Quick Navigation Actions */}
              <div className="mt-3 border-t border-[#DDEAF0] pt-2.5 grid grid-cols-3 gap-1.5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setLocationOpen(false)
                    if (goTo) goTo('map')
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EBF5FA] hover:text-[#1597D4] p-2 text-[11px] font-semibold text-[#4A6572] transition"
                >
                  <MapIcon size={13} />
                  <span>Map</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocationOpen(false)
                    if (goTo) goTo('weather')
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EBF5FA] hover:text-[#1597D4] p-2 text-[11px] font-semibold text-[#4A6572] transition"
                >
                  <CloudSun size={13} />
                  <span>Weather</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocationOpen(false)
                    if (goTo) goTo('personnel')
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EBF5FA] hover:text-[#1597D4] p-2 text-[11px] font-semibold text-[#4A6572] transition"
                >
                  <Users size={13} />
                  <span>Roster</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          CENTER: Command Search Bar (⌘ K)
          ============================================================ */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-[#F8FAFC] px-3.5 py-2 text-xs text-slate-400 hover:border-slate-300 hover:bg-white transition cursor-pointer shadow-2xs"
          title="Open global tactical command palette"
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

      {/* ============================================================
          RIGHT: Notifications, Profile Dropdown, RUN DEMO
          ============================================================ */}
      <div className="flex items-center gap-3 shrink-0">
        {/* AI Monitoring Center Popover (Matching Master Prompt) */}
        <div className="relative" ref={aiMonitoringRef}>
          <button
            type="button"
            onClick={() => {
              setAiMonitoringOpen(!aiMonitoringOpen)
              setLocationOpen(false)
              setProfileOpen(false)
            }}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#BAE6FD] bg-[#E0F2FE]/90 hover:bg-[#BAE6FD]/60 px-2.5 py-1 text-xs font-medium text-[#0284C7] transition shadow-2xs"
            title="Click to view AI Mission Monitoring Subsystem Telemetry"
          >
            <Sparkles size={13} className="text-[#0284C7]" />
            <span>AI Monitoring Active</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7] animate-pulse" />
          </button>

          {aiMonitoringOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-[#DCE8F0] bg-white p-4 shadow-2xl z-50 animate-fade-in text-left">
              <div className="border-b border-[#DCE8F0] pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0C1E30] tracking-tight">
                      AI Mission Monitoring
                    </h4>
                    <span className="text-[11px] text-[#42586E]">
                      Continuous Real-Time Telemetry
                    </span>
                  </div>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Subsystem checks */}
              <div className="py-2.5 space-y-1.5 text-xs divide-y divide-[#F0F7FB]">
                {[
                  { name: 'Cargo Pipeline', status: 'Tracking 3 in-transit, 1 ice pack hold', ok: true },
                  { name: 'Station Inventory', status: '12.0d fuel runway vs 17.0d ETA', warn: true },
                  { name: 'Primary Assets', status: 'Generator G-01 nominal (92% wear)', ok: true },
                  { name: 'Mission Traversal', status: 'Sorties on track (Milestone 4/6)', ok: true },
                  { name: 'Continuity Risks', status: '1 critical supply deficit flagged', alert: true },
                  { name: 'Life Support / SOS', status: '0 active distress emergencies', ok: true },
                ].map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between pt-1.5">
                    <div>
                      <span className="font-medium text-[#0C1E30]">{sub.name}</span>
                      <p className="text-[10.5px] text-[#42586E]">{sub.status}</p>
                    </div>
                    <span className={`font-mono text-xs font-semibold ${
                      sub.alert ? 'text-rose-700' : sub.warn ? 'text-amber-700' : 'text-emerald-700'
                    }`}>
                      {sub.alert ? '⚠' : '✓'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Operational Activity Metadata */}
              <div className="rounded-xl bg-[#F4F8FA] border border-[#DCE8F0] p-2.5 text-[11.5px] text-[#42586E] space-y-1 my-2">
                <div className="flex justify-between">
                  <span>Last analysis:</span>
                  <span className="font-mono font-medium text-[#0C1E30]">2 minutes ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Active insights:</span>
                  <span className="font-mono font-medium text-[#0284C7]">4 operational</span>
                </div>
                <div className="flex justify-between">
                  <span>Emerging risks:</span>
                  <span className="font-mono font-medium text-rose-700">2 flagged</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DCE8F0] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAiMonitoringOpen(false)
                    goTo && goTo('copilot')
                  }}
                  className="flex-1 text-center rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white py-1.5 text-xs font-medium shadow-2xs transition"
                >
                  Ask Copilot
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAiMonitoringOpen(false)
                    goTo && goTo('risks')
                  }}
                  className="flex-1 text-center rounded-lg border border-[#DCE8F0] bg-white hover:bg-[#F0F7FB] text-[#0C1E30] py-1.5 text-xs font-medium shadow-2xs transition"
                >
                  View Risks
                </button>
              </div>
            </div>
          )}
        </div>

        {/* System Online Status Pill (Matching Screenshot) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-slate-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Online</span>
        </div>

        {/* Incident Alerts Bell */}
        <button
          type="button"
          onClick={onAlertClick}
          className="relative rounded-xl border border-slate-200/80 bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition shadow-2xs"
          title="Active emergency incidents"
        >
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-2xs">
            3
          </span>
        </button>

        {/* User Profile Avatar & Role with Interactive Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => {
              setProfileOpen(!profileOpen)
              setLocationOpen(false)
            }}
            className="flex items-center gap-2.5 rounded-xl p-1 sm:p-1.5 hover:bg-slate-50 transition border border-transparent hover:border-slate-200 text-left group"
            title="Click to switch operator profile or sign out"
          >
            {/* Circular Avatar */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#0284C7] to-[#1597D4] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-white shadow-2xs group-hover:scale-105 transition-transform">
              {initials}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[140px]">
                {user?.name || 'Cdr. Anjali Kulkarni'}
              </div>
              <div className="text-[11px] text-slate-500 leading-tight flex items-center gap-1">
                <span className="truncate max-w-[120px]">
                  {roleLabel || user?.role || 'Expedition Commander'}
                </span>
                <ChevronDown
                  size={11}
                  className={`text-slate-400 group-hover:text-slate-700 transition-transform ${
                    profileOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          </button>

          {/* User Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-[#DDEAF0] bg-white p-3.5 shadow-2xl z-50 animate-fade-in">
              {/* Active Operator Banner */}
              <div className="border-b border-[#DDEAF0] pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#1597D4]" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1597D4]">
                      Authenticated Operator
                    </span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="font-bold text-sm text-[#12263A] mt-1 truncate">
                  {user?.name || 'Cdr. Anjali Kulkarni'}
                </div>
                <div className="text-[11px] text-[#4A6572] flex items-center gap-1.5 mt-0.5">
                  <span className="rounded bg-[#EBF5FA] px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-[#1597D4]">
                    {user?.role || 'COMMANDER'}
                  </span>
                  <span className="text-[#8FA6B2]">·</span>
                  <span className="truncate">{selectedStation.name}</span>
                </div>
              </div>

              {/* 1-Click Demo Operator Switcher */}
              <div className="mt-3">
                <div className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#8FA6B2] mb-2">
                  Switch Operator Profile
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    {
                      id: 'commander',
                      label: 'Commander',
                      name: 'Cdr. Anjali',
                      icon: '⭐',
                      pass: 'expedition@cmd',
                    },
                    {
                      id: 'logistics',
                      label: 'Logistics',
                      name: 'D. Joshi',
                      icon: '📦',
                      pass: 'cargo@supply',
                    },
                    {
                      id: 'scientist',
                      label: 'Scientist',
                      name: 'Dr. Farah',
                      icon: '🔬',
                      pass: 'research@field',
                    },
                    {
                      id: 'admin',
                      label: 'Admin',
                      name: 'Nikhil Raut',
                      icon: '⚙️',
                      pass: 'polar@2025',
                    },
                  ].map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => handleQuickSwitchRole(op.id, op.pass)}
                      className="flex items-center gap-2 rounded-xl border border-[#DDEAF0] bg-[#F8FAFC] hover:bg-[#EBF5FA] hover:border-[#1597D4]/50 p-2 text-left transition group"
                    >
                      <span className="text-sm">{op.icon}</span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-[#12263A] group-hover:text-[#1597D4] truncate">
                          {op.label}
                        </div>
                        <div className="text-[9.5px] text-[#8FA6B2] truncate">
                          {op.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Shortcuts */}
              <div className="mt-3 border-t border-[#DDEAF0] pt-2 space-y-1">
                {goTo && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false)
                        goTo('audit')
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#4A6572] hover:bg-[#F8FAFC] hover:text-[#12263A] transition"
                    >
                      <FileText size={13} className="text-[#8FA6B2]" />
                      <span>Cryptographic Audit Ledger</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false)
                        goTo('sources')
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[#4A6572] hover:bg-[#F8FAFC] hover:text-[#12263A] transition"
                    >
                      <Shield size={13} className="text-[#8FA6B2]" />
                      <span>Role Permissions &amp; Data Provenance</span>
                    </button>
                  </>
                )}
              </div>

              {/* Sign Out to Welcome Login */}
              <div className="mt-2 border-t border-[#DDEAF0] pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false)
                    signOut()
                  }}
                  className="flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                >
                  <span className="flex items-center gap-2">
                    <LogOut size={14} />
                    <span>Sign Out to Welcome Login</span>
                  </span>
                  <span className="font-mono text-[10px] text-rose-400">Exit</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Prominent Run Demo Button */}
        {onStartGuidedDemo && (
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-medium px-3.5 py-2 text-xs shadow-xs transition active:scale-95"
            title="Start step-by-step guided demonstration"
          >
            <Play size={12} className="fill-white" />
            <span>Run Demo</span>
          </button>
        )}
      </div>
    </header>

    {/* ============================================================
        PURPOSE-BUILT MOBILE HEADER (< 768px / md:hidden)
        Clean · Compact · Non-squeezed · 44px+ touch targets
        ============================================================ */}
    <header className="sticky top-0 z-30 flex md:hidden h-14 items-center justify-between border-b border-[#DCE8F0] bg-white/95 px-3 backdrop-blur-md">
      {/* Left: POLAR-AI Logo/Brand (Home/Dashboard) + Current Station */}
      <div className="flex items-center gap-1 min-w-0">
        {/* POLAR-AI Home / Dashboard Button */}
        <button
          type="button"
          onClick={() => {
            if (goTo) goTo('dashboard')
          }}
          className="flex items-center gap-1.5 rounded-lg py-1 px-1.5 hover:bg-slate-100/80 transition text-left shrink-0 min-h-[44px] active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40"
          aria-label="Go to Dashboard"
          title="Go to Dashboard"
        >
          <div className="shrink-0 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <polygon points="20,4 32,32 8,32" fill="#0284C7" />
              <polygon points="20,4 26,32 8,32" fill="#38BDF8" opacity="0.85" />
              <polygon points="28,14 38,32 18,32" fill="#0EA5E9" opacity="0.65" />
              <polygon points="12,18 22,32 2,32" fill="#7DD3FC" opacity="0.75" />
            </svg>
          </div>
          <span className="font-semibold text-[13.5px] text-[#0C1E30] tracking-tight">
            POLAR-AI
          </span>
        </button>

        <span className="text-slate-300 text-xs select-none">·</span>

        {/* Current Station Selector (opens station switch modal) */}
        <button
          type="button"
          onClick={() => setMobileStationOpen(true)}
          className="flex items-center gap-1 rounded-lg py-1 px-1.5 hover:bg-slate-100/80 transition text-left min-w-0 min-h-[44px] active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40"
          aria-label="Switch active polar station"
          title="Switch active polar station"
        >
          <span className="text-xs font-medium text-[#42586E] truncate max-w-[85px] xs:max-w-[110px]">
            {selectedStation.name.replace(' Station', '').replace(' Operations Room', '')}
          </span>
          <ChevronDown size={12} className="text-slate-400 shrink-0" />
        </button>
      </div>

      {/* Right: Search, AI Status, Notifications, Profile */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Mobile Search Button */}
        <button
          type="button"
          onClick={() => setMobileSearchOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#42586E] hover:bg-slate-100 hover:text-[#0C1E30] transition active:scale-95"
          aria-label="Search cargo, inventory, people, assets"
        >
          <Search size={18} />
        </button>

        {/* AI Status Badge */}
        <button
          type="button"
          onClick={() => setMobileAiOpen(true)}
          className="inline-flex items-center gap-1 rounded-lg border border-[#BAE6FD] bg-[#E0F2FE] px-2 py-1.5 text-[11px] font-medium text-[#0284C7] active:scale-95 transition min-h-[36px]"
          title="AI Mission Monitoring"
        >
          <Sparkles size={13} />
          <span>AI</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={onAlertClick}
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[#42586E] hover:bg-slate-100 hover:text-[#0C1E30] transition active:scale-95"
          aria-label="Active emergency incidents"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9.5px] font-bold text-white">
            3
          </span>
        </button>

        {/* Profile Avatar */}
        <button
          type="button"
          onClick={() => setMobileProfileOpen(true)}
          className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#0284C7] to-[#1597D4] text-white flex items-center justify-center font-bold text-xs ring-1 ring-slate-200 active:scale-95 transition shrink-0 ml-0.5"
          aria-label="Operator profile and switcher"
        >
          {initials}
        </button>
      </div>
    </header>

    {/* ============================================================
        FULL-SCREEN EXPANDABLE MOBILE SEARCH (< 768px)
        "Search cargo, inventory, people, assets…"
        ============================================================ */}
    {mobileSearchOpen && renderInPortal(
      <div className="fixed inset-0 z-[90] md:hidden bg-white flex flex-col animate-in fade-in duration-200">
        {/* Search Header Bar */}
        <div className="flex items-center gap-2 border-b border-[#DCE8F0] p-3 pt-4">
          <div className="relative flex-1 flex items-center">
            <Search size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="search"
              autoFocus
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              placeholder="Search cargo, inventory, people, assets…"
              className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-2.5 pl-9 pr-8 text-sm text-[#0C1E30] placeholder-slate-400 focus:border-[#0284C7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
            />
            {mobileSearchQuery && (
              <button
                type="button"
                onClick={() => setMobileSearchQuery('')}
                className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen(false)
              setMobileSearchQuery('')
            }}
            className="text-xs font-semibold text-[#0284C7] px-2 py-2 min-h-[44px] flex items-center"
          >
            Cancel
          </button>
        </div>

        {/* Search Content / Quick Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
          {/* Quick Shortcuts */}
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Fast Navigation
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Mission Continuity', view: 'dashboard', icon: '✦' },
                { label: 'Cargo Pipeline', view: 'cargo', icon: '📦' },
                { label: 'Station Inventory', view: 'inventory', icon: '🛢️' },
                { label: 'What-If Simulator', view: 'simulator', icon: '⚡' },
                { label: 'Risk Matrix', view: 'risks', icon: '⚠️' },
                { label: 'AI Copilot', view: 'copilot', icon: '🤖' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setMobileSearchOpen(false)
                    goTo(item.view)
                  }}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-left text-xs font-medium text-[#0C1E30] hover:bg-white active:scale-95 transition min-h-[44px]"
                >
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Items */}
          <div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Key Telemetry Items
            </span>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
              {[
                { title: 'Consignment C-101', cat: 'Cargo · 12,000L Arctic Diesel', view: 'cargo' },
                { title: 'Diesel Reserve (14,200 L)', cat: 'Inventory · 12.0d Safe Runway', view: 'inventory' },
                { title: 'Primary Generator G-01', cat: 'Assets · 60h Overhaul Threshold', view: 'assets' },
                { title: 'Dr. Rohan Desai (P-007)', cat: 'Personnel · Medical Distress (INC-001)', view: 'emergency' },
              ]
                .filter((item) =>
                  mobileSearchQuery
                    ? item.title.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
                      item.cat.toLowerCase().includes(mobileSearchQuery.toLowerCase())
                    : true
                )
                .map((result) => (
                  <button
                    key={result.title}
                    type="button"
                    onClick={() => {
                      setMobileSearchOpen(false)
                      goTo(result.view)
                    }}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-50 transition min-h-[48px]"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#0C1E30]">{result.title}</div>
                      <div className="text-[11px] text-slate-500">{result.cat}</div>
                    </div>
                    <span className="text-xs font-medium text-[#0284C7]">Jump →</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ============================================================
        MOBILE STATION SELECTOR BOTTOM SHEET (< 768px)
        ============================================================ */}
    {mobileStationOpen && renderInPortal(
      <div className="fixed inset-0 z-[90] md:hidden flex flex-col justify-end animate-in fade-in duration-150">
        <div
          className="fixed inset-0 bg-[#0A1926]/50 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileStationOpen(false)}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-[#DCE8F0] bg-white p-5 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom duration-250">
          <div className="mx-auto -mt-1 mb-4 h-1.5 w-12 rounded-full bg-slate-300" />
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                <MapPin size={18} strokeWidth={2.2} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0C1E30]">Select Polar Station</h3>
                <p className="text-xs text-[#6E8294]">Operational Theatres &amp; Field Bases</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileStationOpen(false)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close station menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-2">
            {POLAR_STATIONS.map((station) => {
              const isSelected = station.id === selectedStationId
              return (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => handleSelectStation(station.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition text-left min-h-[52px] ${
                    isSelected
                      ? 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7] ring-1 ring-[#0284C7]/30 shadow-xs'
                      : 'bg-[#F8FAFC] border-[#E8F0F5] text-[#0C1E30] hover:bg-white'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold truncate">{station.name}</span>
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-white/70 text-slate-600 border border-slate-200 shrink-0">
                        {station.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">{station.region}</div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mt-1">
                      <span>{station.coords}</span>
                      <span>·</span>
                      <span className="text-sky-700 font-semibold">{station.temp}</span>
                      <span>·</span>
                      <span>{station.crew} crew</span>
                    </div>
                  </div>
                  {isSelected ? (
                    <div className="h-6 w-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0">
                      <Check size={14} strokeWidth={2.5} />
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 shrink-0">Switch →</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )}

    {/* ============================================================
        MOBILE AI MONITORING BOTTOM SHEET (< 768px)
        ============================================================ */}
    {mobileAiOpen && renderInPortal(
      <div className="fixed inset-0 z-[90] md:hidden flex flex-col justify-end animate-in fade-in duration-150">
        <div
          className="fixed inset-0 bg-[#0A1926]/50 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileAiOpen(false)}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-[#DCE8F0] bg-white p-5 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom duration-250">
          <div className="mx-auto -mt-1 mb-4 h-1.5 w-12 rounded-full bg-slate-300" />
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#38BDF8] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#0C1E30]">POLAR-AI Mission Engine</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <p className="text-xs text-[#6E8294]">Real-time autonomous subsystem monitoring</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileAiOpen(false)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close AI panel"
            >
              <X size={18} />
            </button>
          </div>

          {/* Subsystem status */}
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Subsystem Telemetry
          </div>
          <div className="space-y-2 divide-y divide-slate-100 text-xs">
            {[
              { name: 'Cargo Pipeline', desc: '1 maritime delay flagged (MV Vasiliy Golovnin)', warn: true, badge: '⚡ WARN' },
              { name: 'Station Diesel Reserve', desc: '12.0d runway vs 17.0d ETA (5.0d gap)', alert: true, badge: '⚠ CRITICAL' },
              { name: 'Primary Power Grid', desc: 'Gen G-01 at 60h overhaul threshold', warn: true, badge: '⚡ OVERDUE' },
              { name: 'Life Support & SOS Hub', desc: '0 unacknowledged distress events', ok: true, badge: '✓ NOMINAL' },
            ].map((sub) => (
              <div key={sub.name} className="pt-2.5 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="font-semibold text-[#0C1E30]">{sub.name}</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{sub.desc}</p>
                </div>
                <span
                  className={`font-mono text-[10.5px] font-bold px-2 py-0.5 rounded shrink-0 ${
                    sub.alert
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : sub.warn
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {sub.badge}
                </span>
              </div>
            ))}
          </div>

          {/* Active AI Recommendation Preview */}
          <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50/70 p-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284C7]">
              <Sparkles size={13} />
              <span>Top AI Recommendation · REC-001</span>
            </div>
            <p className="text-[11.5px] text-[#0C1E30] mt-1 leading-relaxed">
              Transfer 6,200L Arctic Diesel from Reserve Tank B to Day Tank 1 and engage Level-1 non-critical load shedding. Extends runway to +16.8 days.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileAiOpen(false)
                goTo('copilot')
              }}
              className="flex-1 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white py-3 text-xs font-bold shadow-xs min-h-[46px] flex items-center justify-center gap-1.5 active:scale-95 transition"
            >
              <Sparkles size={14} />
              <span>Ask AI Copilot</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileAiOpen(false)
                goTo('risks')
              }}
              className="flex-1 rounded-xl border border-slate-200 bg-white text-[#0C1E30] hover:bg-slate-50 py-3 text-xs font-semibold min-h-[46px] flex items-center justify-center gap-1.5 active:scale-95 transition"
            >
              <span>Risk Matrix →</span>
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ============================================================
        MOBILE PROFILE & OPERATOR SWITCHER BOTTOM SHEET (< 768px)
        ============================================================ */}
    {mobileProfileOpen && renderInPortal(
      <div className="fixed inset-0 z-[90] md:hidden flex flex-col justify-end animate-in fade-in duration-150">
        <div
          className="fixed inset-0 bg-[#0A1926]/50 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileProfileOpen(false)}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-[#DCE8F0] bg-white p-5 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-2xl animate-in slide-in-from-bottom duration-250">
          <div className="mx-auto -mt-1 mb-4 h-1.5 w-12 rounded-full bg-slate-300" />
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#1597D4] text-white flex items-center justify-center font-bold text-sm shrink-0">
                {initials}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0C1E30]">Operator Profile</h3>
                <p className="text-xs text-[#6E8294]">Identity, role &amp; authorization</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileProfileOpen(false)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close profile drawer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Active Profile Summary Card */}
          <div className="rounded-2xl border border-[#DCE8F0] bg-[#F8FAFC] p-3.5 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-[#0C1E30]">{user?.name || 'Cdr. Anjali Kulkarni'}</div>
                <div className="text-xs text-slate-500 mt-0.5">{selectedStation.name}</div>
              </div>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                {user?.role || roleLabel || 'COMMANDER'}
              </span>
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                Active Polar Session
              </span>
              <span className="font-mono text-slate-400">Authenticated</span>
            </div>
          </div>

          {/* 1-Click Role Switcher */}
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Quick Switch Operator
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                id: 'commander',
                label: 'Commander',
                name: 'Cdr. Anjali',
                icon: '⭐',
                pass: 'expedition@cmd',
                roleName: 'COMMANDER',
              },
              {
                id: 'logistics',
                label: 'Logistics',
                name: 'Devendra Joshi',
                icon: '📦',
                pass: 'cargo@supply',
                roleName: 'LOGISTICS',
              },
              {
                id: 'scientist',
                label: 'Scientist',
                name: 'Dr. Farah',
                icon: '🔬',
                pass: 'research@field',
                roleName: 'SCIENTIST',
              },
              {
                id: 'admin',
                label: 'Admin',
                name: 'Nikhil Raut',
                icon: '⚙️',
                pass: 'polar@2025',
                roleName: 'ADMIN',
              },
            ].map((op) => {
              const isActive = user?.role === op.roleName
              return (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => handleQuickSwitchRole(op.id, op.pass)}
                  className={`p-3 rounded-xl border text-left active:scale-95 transition min-h-[50px] relative ${
                    isActive
                      ? 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7] ring-1 ring-[#0284C7]/30'
                      : 'bg-[#F8FAFC] border-slate-200 hover:bg-white text-[#0C1E30]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span>{op.icon}</span>
                      <span>{op.label}</span>
                    </span>
                    {isActive && <Check size={13} className="text-[#0284C7]" />}
                  </div>
                  <div className="text-[10.5px] text-slate-500 mt-0.5 truncate">{op.name}</div>
                </button>
              )
            })}
          </div>

          {/* Quick Navigation Shortcuts */}
          <div className="mt-4 border-t border-slate-100 pt-3 space-y-1">
            {goTo && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMobileProfileOpen(false)
                    goTo('audit')
                  }}
                  className="flex w-full items-center justify-between rounded-xl p-2.5 text-xs font-medium text-[#42586E] hover:bg-slate-50 hover:text-[#0C1E30] transition min-h-[44px]"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={15} className="text-slate-400" />
                    <span>Cryptographic Audit Ledger</span>
                  </span>
                  <span className="text-xs text-[#0284C7]">View →</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileProfileOpen(false)
                    goTo('sources')
                  }}
                  className="flex w-full items-center justify-between rounded-xl p-2.5 text-xs font-medium text-[#42586E] hover:bg-slate-50 hover:text-[#0C1E30] transition min-h-[44px]"
                >
                  <span className="flex items-center gap-2">
                    <Shield size={15} className="text-slate-400" />
                    <span>Role Permissions &amp; Provenance</span>
                  </span>
                  <span className="text-xs text-[#0284C7]">View →</span>
                </button>
              </>
            )}
          </div>

          {/* Sign Out Button */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileProfileOpen(false)
                signOut()
              }}
              className="w-full rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100/80 p-3 text-xs font-bold text-rose-700 flex items-center justify-center gap-2 min-h-[46px] active:scale-95 transition"
            >
              <LogOut size={15} />
              <span>Sign Out to Welcome Login</span>
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

