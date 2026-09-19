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
} from 'lucide-react'
import { useAuth } from '../store/AuthContext'
import { USERS } from '../lib/credentials'

/* Polar Stations & Operational Bases Directory */
export const POLAR_STATIONS = [
  {
    id: 'maitri',
    name: 'Maitri Station',
    sub: 'Antarctic Research Expedition 2027',
    region: 'Queen Maud Land · Antarctica',
    coords: '70°45′58″ S, 11°44′09″ E',
    lat: -70.7667,
    lng: 11.7333,
    temp: '-18°C',
    weatherCondition: 'Blizzard Alert (32 kts)',
    crew: 25,
    status: 'Nominal Operations',
    tag: 'Year-Round Base',
  },
  {
    id: 'bharati',
    name: 'Bharati Station',
    sub: 'Larsemann Hills Coastal Base',
    region: 'East Antarctica',
    coords: '69°24′28″ S, 76°11′14″ E',
    lat: -69.4067,
    lng: 76.1867,
    temp: '-12°C',
    weatherCondition: 'Partly Cloudy (14 kts)',
    crew: 23,
    status: 'Cargo Resupply En Route',
    tag: 'Coastal Base',
  },
  {
    id: 'himadri',
    name: 'Himadri Station',
    sub: 'Arctic Atmospheric Campaign',
    region: 'Ny-Ålesund, Svalbard · Arctic',
    coords: '78°55′00″ N, 11°56′00″ E',
    lat: 78.92,
    lng: 11.93,
    temp: '-6°C',
    weatherCondition: 'Overcast (8 kts)',
    crew: 2,
    status: 'Active Field Campaign',
    tag: 'Arctic Observatory',
  },
  {
    id: 'goa',
    name: 'NCPOR Goa Operations Room',
    sub: 'Strategic Mission Headquarters',
    region: 'Headland Sada, Vasco da Gama, India',
    coords: '15°24′32″ N, 73°48′18″ E',
    lat: 15.3833,
    lng: 73.8167,
    temp: '28°C',
    weatherCondition: 'Clear (6 kts)',
    crew: 42,
    status: 'HQ Command & Control',
    tag: 'Strategic HQ',
  },
  {
    id: 'capetown',
    name: 'Cape Town Staging Gateway',
    sub: 'Southern Ocean Logistics Corridor',
    region: 'Western Cape · South Africa',
    coords: '33°55′29″ S, 18°25′26″ E',
    lat: -33.9249,
    lng: 18.4241,
    temp: '19°C',
    weatherCondition: 'Maritime Fair (12 kts)',
    crew: 8,
    status: 'Vessel Staging & DROMLAN Link',
    tag: 'Aviation & Port',
  },
]

export default function TopBar({
  onMenuClick,
  onAlertClick,
  onOpenSearch,
  onStartGuidedDemo,
  goTo,
}) {
  const { user, signIn, signOut, roleLabel } = useAuth()

  // Location Dropdown State
  const [selectedStationId, setSelectedStationId] = useState(() => {
    try {
      return sessionStorage.getItem('polar.activeStation') || 'maitri'
    } catch {
      return 'maitri'
    }
  })
  const [locationOpen, setLocationOpen] = useState(false)
  const locationRef = useRef(null)

  // Profile Dropdown State
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  const selectedStation =
    POLAR_STATIONS.find((s) => s.id === selectedStationId) || POLAR_STATIONS[0]

  // Compute initials from user name
  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
    : 'OP'

  // Persist selected station
  const handleSelectStation = (stationId) => {
    setSelectedStationId(stationId)
    try {
      sessionStorage.setItem('polar.activeStation', stationId)
    } catch {
      // Storage unavailable
    }
    setLocationOpen(false)
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
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Quick switch to a demo role
  const handleQuickSwitchRole = (userId, password) => {
    setProfileOpen(false)
    signIn({ userId, password })
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5EDF2] bg-white/95 px-4 sm:px-8 backdrop-blur-md">
      {/* ============================================================
          LEFT: Mobile Menu Toggle + Interactive Location Dropdown
          ============================================================ */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden transition shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
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
              <div className="text-[11px] text-slate-500 truncate hidden xs:block">
                {selectedStation.sub}
              </div>
            </div>
          </button>

          {/* Location / Station Selector Dropdown */}
          {locationOpen && (
            <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl border border-[#DDEAF0] bg-white p-3 shadow-2xl z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-[#DDEAF0] pb-2.5 px-1.5">
                <div className="flex items-center gap-2">
                  <Compass size={15} className="text-[#1597D4]" />
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#12263A]">
                    Operational Theatre &amp; Stations
                  </span>
                </div>
                <span className="rounded-full bg-[#EBF5FA] px-2 py-0.5 font-mono text-[9.5px] font-bold text-[#1597D4]">
                  5 SITES
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

        {/* Prominent RUN DEMO Button */}
        {onStartGuidedDemo && (
          <button
            type="button"
            onClick={onStartGuidedDemo}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold px-3.5 py-2 text-xs shadow-xs transition active:scale-95"
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
