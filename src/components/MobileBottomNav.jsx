/**
 * MOBILE BOTTOM NAVIGATION BAR — 5 CORE OPERATIONAL PILLARS
 * ==========================================================
 * Native-grade mobile bottom bar strictly scoped to mobile screens (< 768px / md:hidden).
 * Provides instantaneous 48px+ touch navigation directly to the 5 Core Mobile Pillars:
 * 1. Home (Mission Continuity Dashboard)
 * 2. Operations (Cargo Freight & Logistics Hub)
 * 3. Risk (Systemic Vulnerability Matrix)
 * 4. Simulator (What-If Resilience Sandbox)
 * 5. AI (Mission Copilot)
 * + More Bottom Sheet: Expedition, Cargo, Inventory, Assets, Personnel, Emergency, Audit
 */

import React, { useState } from 'react'
import {
  AlertTriangle,
  Boxes,
  Compass,
  Cpu,
  FileText,
  LayoutDashboard,
  Menu,
  Package,
  Shield,
  ShieldAlert,
  Siren,
  Sliders,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { useData } from '../store/DataContext'

export default function MobileBottomNav({ currentView, onNavigate, onOpenMenu }) {
  const { emergencies } = useData()
  const activeEmergencies = (emergencies || []).filter((e) => e.status !== 'RESOLVED').length
  const [moreOpen, setMoreOpen] = useState(false)

  // Primary 5 Mobile Pillars
  const primaryNavItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'cargo', label: 'Operations', icon: Package },
    { id: 'risks', label: 'Risk', icon: AlertTriangle, badge: '!' },
    { id: 'simulator', label: 'Simulator', icon: Sliders },
    { id: 'copilot', label: 'AI', icon: Sparkles },
  ]

  // Secondary Sections inside More Bottom Sheet
  const secondaryItems = [
    {
      id: 'expeditions',
      label: 'Expedition Planning',
      desc: 'Field traverses and station logistics',
      icon: Compass,
    },
    {
      id: 'cargo',
      label: 'Cargo Freight',
      desc: 'Maritime and aviation consignment tracking',
      icon: Package,
    },
    {
      id: 'inventory',
      label: 'Station Inventory',
      desc: '12.0d diesel reserve and critical spares',
      icon: Boxes,
    },
    {
      id: 'assets',
      label: 'Station Assets',
      desc: 'CAT 3512 generators and life-support',
      icon: Cpu,
    },
    {
      id: 'personnel',
      label: 'Personnel Roster',
      desc: 'Wintering crew and biometric check-ins',
      icon: Users,
    },
    {
      id: 'emergency',
      label: 'Emergency / SOS',
      desc: 'Incident command and armed distress',
      icon: Siren,
      isAlert: activeEmergencies > 0,
      badge: activeEmergencies > 0 ? `${activeEmergencies} Active` : null,
    },
    {
      id: 'audit',
      label: 'Cryptographic Audit',
      desc: 'Tamper-evident SHA-256 event ledger',
      icon: FileText,
    },
    {
      id: 'sources',
      label: 'Settings & Sources',
      desc: 'Platform provenance and access roles',
      icon: Shield,
    },
  ]

  const handleSelect = (id) => {
    onNavigate(id)
    setMoreOpen(false)
  }

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 inset-x-0 z-40 border-t border-[#DCE8F0] bg-white/95 backdrop-blur-md md:hidden pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(12,30,48,0.06)]"
      >
        <div className="flex h-16 items-center justify-around px-1.5">
          {primaryNavItems.map((item) => {
            const Icon = item.icon
            const isActive =
              currentView === item.id || (item.id === 'dashboard' && currentView === 'landing')

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-1 flex-col items-center justify-center min-h-[48px] py-1 transition active:scale-95 ${
                  isActive
                    ? 'text-[#0284C7] font-semibold'
                    : 'text-[#42586E] hover:text-[#0C1E30]'
                }`}
              >
                <div
                  className={`relative p-1.5 rounded-xl transition ${
                    isActive ? 'bg-[#E0F2FE] text-[#0284C7]' : ''
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.2 : 1.75} />
                  {item.badge && !isActive && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight font-medium mt-0.5 truncate max-w-[54px]">
                  {item.label}
                </span>
              </button>
            )
          })}

          {/* More Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className={`relative flex flex-1 flex-col items-center justify-center min-h-[48px] py-1 transition active:scale-95 ${
              moreOpen ? 'text-[#0284C7] font-semibold' : 'text-[#42586E] hover:text-[#0C1E30]'
            }`}
            aria-label="Open More Menu"
          >
            <div
              className={`p-1.5 rounded-xl transition ${
                moreOpen ? 'bg-[#E0F2FE] text-[#0284C7]' : ''
              }`}
            >
              <Menu size={18} strokeWidth={1.75} />
            </div>
            <span className="text-[10px] tracking-tight font-medium mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* More Bottom Sheet Drawer */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0A1926]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMoreOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Content */}
          <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-[#DCE8F0] bg-white p-5 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-250">
            {/* Drag handle */}
            <div className="mx-auto -mt-1 mb-4 h-1.5 w-12 rounded-full bg-slate-300" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <h3 className="text-base font-semibold text-[#0C1E30]">Operational Modules</h3>
                <p className="text-xs text-[#6E8294]">Full mission management &amp; deep tools</p>
              </div>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Grid of Sections */}
            <div className="space-y-1.5">
              {secondaryItems.map((item) => {
                const Icon = item.icon
                const isCurrent = currentView === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition text-left min-h-[48px] ${
                      isCurrent
                        ? 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0284C7]'
                        : item.isAlert
                        ? 'bg-rose-50/70 border-rose-200 text-rose-800'
                        : 'bg-[#F8FAFC] border-[#E8F0F5] text-[#0C1E30] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? 'bg-white text-[#0284C7] shadow-2xs'
                            : item.isAlert
                            ? 'bg-rose-600 text-white'
                            : 'bg-white text-[#42586E] border border-slate-200'
                        }`}
                      >
                        <Icon size={17} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold truncate leading-tight">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-[#6E8294] truncate leading-tight mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    {item.badge && (
                      <span className="ml-2 shrink-0 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white font-mono">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
